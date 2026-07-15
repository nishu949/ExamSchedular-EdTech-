#The backend exposes RESTful APIs using Django REST Framework (DRF) for mobile integration. 
# APIs such as Student Schedule, Timetable, Search, Dashboard, and Reports return JSON responses, 
# enabling future Android or iOS applications to access examination data securely and efficiently

from django.http import HttpResponse
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from .scheduler import ScheduleEngine
from .conflicts import check_conflicts
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import AdminSerializer, StudentSerializer
from mongoengine.errors import DoesNotExist

from .models import (
    Course,
    Room,
    Faculty,
    Student,
    Timetable,
    Admin
)

from .serializers import (
    CourseSerializer,
    RoomSerializer,
    FacultySerializer,
    StudentSerializer,
    TimetableSerializer
)
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response



@api_view(["POST"])
def admin_register(request):

    serializer = AdminSerializer(data=request.data)

    if serializer.is_valid():

        serializer.save()

        return Response(
            {
                "success": True,
                "message": "Admin registered successfully"
            },
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

@api_view(["POST"])
def student_register(request):

    serializer = StudentSerializer(data=request.data)

    if serializer.is_valid():

        serializer.save()

        return Response(
            {
                "success": True,
                "message": "Student registered successfully"
            },
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["POST"])
def admin_login(request):

    username = request.data.get("username")
    password = request.data.get("password")

    admin = Admin.objects(
        username=username,
        password=password
    ).first()

    if admin:

        return Response({
            "success": True,
            "role": "admin",
            "username": admin.username,
            "email": admin.email
        })

    return Response(
        {
            "success": False,
            "message": "Invalid username or password"
        },
        status=status.HTTP_401_UNAUTHORIZED
    )

@api_view(["POST"])
def student_login(request):

    student_id = request.data.get("student_id")
    password = request.data.get("password")

    student = Student.objects(
        student_id=student_id,
        password=password
    ).first()

    if student:

        return Response({
            "success": True,
            "role": "student",
            "student_id": student.student_id,
            "student_name": student.student_name,
            "department": student.department
        })

    return Response(
        {
            "success": False,
            "message": "Invalid Student ID or Password"
        },
        status=status.HTTP_401_UNAUTHORIZED
    )

@api_view(["GET"])
def search(request):

    q = request.GET.get("q", "").strip()

    if not q:
        return Response([])

    results = []

    # Courses
    for course in Course.objects(
        __raw__={
            "$or": [
                {"course_code": {"$regex": q, "$options": "i"}},
                {"course_name": {"$regex": q, "$options": "i"}},
            ]
        }
    ):
        results.append({
            "type": "Course",
            "title": course.course_code,
            "subtitle": course.course_name,
            "page": "/courses"
        })

    # Rooms
    for room in Room.objects(
        room_id__icontains=q
    ):
        results.append({
            "type": "Room",
            "title": room.room_id,
            "subtitle": f"Capacity: {room.capacity}",
            "page": "/rooms"
        })

    # Faculty
    for faculty in Faculty.objects(
        __raw__={
            "$or": [
                {"faculty_name": {"$regex": q, "$options": "i"}},
                {"faculty_id": {"$regex": q, "$options": "i"}},
            ]
        }
    ):
        results.append({
            "type": "Faculty",
            "title": faculty.faculty_name,
            "subtitle": faculty.department,
            "page": "/faculty"
        })

    # Students
    for student in Student.objects(
        __raw__={
            "$or": [
                {"student_name": {"$regex": q, "$options": "i"}},
                {"student_id": {"$regex": q, "$options": "i"}},
            ]
        }
    ):
        results.append({
            "type": "Student",
            "title": student.student_name,
            "subtitle": student.student_id,
            "page": "/students"
        })

    # Timetable
    for exam in Timetable.objects(
        __raw__={
            "$or": [
                {"course_code": {"$regex": q, "$options": "i"}},
                {"room_id": {"$regex": q, "$options": "i"}},
                {"faculty": {"$regex": q, "$options": "i"}},
            ]
        }
    ):
        results.append({
            "type": "Timetable",
            "title": exam.course_code,
            "subtitle": f"{exam.exam_date} • {exam.exam_time}",
            "page": "/timetable"
        })

    return Response(results)


# COURSE CRUD


@api_view(["GET", "POST"])
def courses(request):

    if request.method == "GET":

        serializer = CourseSerializer(
            Course.objects(),
            many=True
        )

        return Response(serializer.data)

    serializer = CourseSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["DELETE"])
def delete_course(request, id):

    try:

        course = Course.objects.get(id=id)

        course.delete()

        return Response({
            "message": "Course deleted"
        })

    except DoesNotExist:

        return Response(
            {
                "error": "Course not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )



# ROOM CRUD


@api_view(["GET", "POST"])
def rooms(request):

    if request.method == "GET":

        serializer = RoomSerializer(
            Room.objects(),
            many=True
        )

        return Response(serializer.data)

    serializer = RoomSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["GET", "PUT", "DELETE"])
def room_detail(request, id):

    try:

        room = Room.objects.get(id=id)

    except DoesNotExist:

        return Response(
            {"error": "Room not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "GET":

        serializer = RoomSerializer(room)

        return Response(serializer.data)

    elif request.method == "PUT":

        serializer = RoomSerializer(
            room,
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    elif request.method == "DELETE":

        room.delete()

        return Response({
            "message": "Room deleted"
        })


# FACULTY CRUD


@api_view(["GET", "POST"])
def faculties(request):

    if request.method == "GET":

        serializer = FacultySerializer(
            Faculty.objects(),
            many=True
        )

        return Response(serializer.data)

    serializer = FacultySerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["GET", "PUT", "DELETE"])
def faculty_detail(request, id):

    try:
        faculty = Faculty.objects.get(id=id)

    except DoesNotExist:
        return Response(
            {"error": "Faculty not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "GET":

        serializer = FacultySerializer(faculty)
        return Response(serializer.data)

    elif request.method == "PUT":

        serializer = FacultySerializer(
            faculty,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    elif request.method == "DELETE":

        faculty.delete()

        return Response({
            "message": "Faculty deleted"
        })
    
# STUDENT CRUD


@api_view(["GET", "POST"])
def students(request):

    if request.method == "GET":

        serializer = StudentSerializer(
            Student.objects(),
            many=True
        )

        return Response(serializer.data)

    serializer = StudentSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["GET", "PUT", "DELETE"])
def student_detail(request, id):

    try:

        student = Student.objects.get(id=id)

    except DoesNotExist:

        return Response(
            {"error": "Student not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "GET":

        serializer = StudentSerializer(student)

        return Response(serializer.data)

    elif request.method == "PUT":

        serializer = StudentSerializer(
            student,
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    student.delete()

    return Response({
        "message": "Student deleted"
    })



# TIMETABLE CRUD


@api_view(["GET", "POST"])
def timetable(request):

    if request.method == "GET":

        serializer = TimetableSerializer(
            Timetable.objects(),
            many=True
        )

        return Response(serializer.data)

    serializer = TimetableSerializer(
        data=request.data
    )

    if serializer.is_valid():

        exam_date = serializer.validated_data["exam_date"]

        exam_time = serializer.validated_data["exam_time"]

        room_id = serializer.validated_data["room_id"]

        conflict = Timetable.objects(

            exam_date=exam_date,

            exam_time=exam_time,

            room_id=room_id

        ).first()

        if conflict:

            return Response(
                {
                    "error": "Room already booked"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )



# GENERATE TIMETABLE


@api_view(["POST"])
def generate_timetable(request):

    try:

        engine = ScheduleEngine()

        result = engine.generate()

        conflicts = check_conflicts()

        return Response({

            "message": result["message"],

            "conflicts": conflicts,

            "total_conflicts": len(conflicts)

        })

    except Exception as e:

        return Response(

            {

                "error": str(e)

            },

            status=status.HTTP_400_BAD_REQUEST

        )



# STUDENT SCHEDULE


@api_view(["GET"])
def student_schedule(request):

    student_id = request.GET.get("student_id")

    if not student_id:
        return Response(
            {"error": "student_id is required"},
            status=400
        )

    student = Student.objects(
        student_id=student_id
    ).first()

    if student is None:
        return Response(
            {"error": "Student not found"},
            status=404
        )

    exams = Timetable.objects(
        course_code__in=student.enrolled_courses
    )

    serializer = TimetableSerializer(
        exams,
        many=True
    )

    return Response(serializer.data)


# SEARCH TIMETABLE


@api_view(["GET"])
def search_timetable(request):

    exam_date = request.GET.get("date")
    room_id = request.GET.get("room")

    timetable = Timetable.objects()

    if exam_date:
        timetable = timetable.filter(
            exam_date=exam_date
        )

    if room_id:
        timetable = timetable.filter(
            room_id=room_id
        )

    serializer = TimetableSerializer(
        timetable,
        many=True
    )

    return Response(serializer.data)



# DASHBOARD


@api_view(["GET"])
def dashboard(request):

    return Response({

        "courses": Course.objects.count(),

        "rooms": Room.objects.count(),

        "faculties": Faculty.objects.count(),

        "students": Student.objects.count(),

        "timetable": Timetable.objects.count()

    })



# CONFLICT DETECTION

@api_view(["GET"])
def detect_conflicts(request):

    conflicts = check_conflicts()

    if len(conflicts) == 0:

        return Response({

            "status": "No conflicts found"

        })

    return Response({

        "status": "Conflict Detected",

        "conflicts": conflicts

    })



# DOWNLOAD PDF REPORT

@api_view(["GET"])
def download_report(request):

    response = HttpResponse(
        content_type="application/pdf"
    )

    response["Content-Disposition"] = (
        'attachment; filename="ExamTimetable.pdf"'
    )

    pdf = SimpleDocTemplate(response)

    data = [[
        "Course",
        "Faculty",
        "Room",
        "Date",
        "Time"
    ]]

    # Get all timetable records
    exams = Timetable.objects()

    # If no timetable exists
    if exams.count() == 0:
        return Response(
            {"message": "No timetable available"},
            status=404
        )

    # Add timetable rows
    for exam in exams:

        data.append([

            exam.course_code,

            exam.faculty,

            exam.room_id,

            str(exam.exam_date),

            exam.exam_time

        ])

    table = Table(data)

    table.setStyle(TableStyle([

        ("BACKGROUND", (0, 0), (-1, 0), colors.darkblue),

        ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),

        ("GRID", (0, 0), (-1, -1), 1, colors.black),

        ("BACKGROUND", (0, 1), (-1, -1), colors.beige),

        ("ALIGN", (0, 0), (-1, -1), "CENTER"),

        ("BOTTOMPADDING", (0, 0), (-1, 0), 10),

    ]))

    pdf.build([table])

    return response


# ROOM REPORT
@api_view(["GET"])
def room_report(request):

    room = request.GET.get("room")

    if room:
        exams = Timetable.objects(
            room_id=room
        )
    else:
        exams = Timetable.objects().order_by(
            "room_id",
            "exam_date",
            "exam_time"
        )

    serializer = TimetableSerializer(
        exams,
        many=True
    )

    return Response(serializer.data)


# DATE REPORT
@api_view(["GET"])
def date_report(request):

    date = request.GET.get("date")

    if date:
        exams = Timetable.objects(
            exam_date=date
        )
    else:
        exams = Timetable.objects().order_by(
            "exam_date",
            "exam_time"
        )

    serializer = TimetableSerializer(
        exams,
        many=True
    )

    return Response(serializer.data)