from datetime import datetime
from django.http import HttpResponse
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from mongoengine.errors import DoesNotExist
from .models import ( Course, Room,Faculty,Timetable)
from .serializers import (CourseSerializer,RoomSerializer,FacultySerializer,TimetableSerializer)
from .scheduler import (ScheduleEngine,check_conflicts)

@api_view(["GET"])
def download_report(request):

    response = HttpResponse(content_type="application/pdf")
    response["Content-Disposition"] = 'attachment; filename="timetable.pdf"'

    pdf = SimpleDocTemplate(response)

    data = [["Course", "Room", "Date", "Time"]]

    timetable = Timetable.objects

    for exam in timetable:
        data.append([
            exam.course_code,
            exam.room_id,
            str(exam.exam_date),
            str(exam.exam_time)
        ])

    table = Table(data)

    table.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), colors.grey),
        ("TEXTCOLOR", (0,0), (-1,0), colors.whitesmoke),

        ("GRID", (0,0), (-1,-1), 1, colors.black),

        ("BACKGROUND", (0,1), (-1,-1), colors.beige),

        ("ALIGN", (0,0), (-1,-1), "CENTER"),

        ("BOTTOMPADDING", (0,0), (-1,0), 10),
    ]))

    pdf.build([table])

    return response

@api_view(["POST"])
def generate_timetable(request):

    try:

        engine = ScheduleEngine()

        engine.generate()

        return Response({
            "message": "Timetable Generated Successfully"
        })

    except Exception as e:

        return Response(
            {"error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["GET", "POST"])
def timetable(request):

    if request.method == "GET":
        data = Timetable.objects
        return Response(TimetableSerializer(data, many=True).data)

    
    serializer = TimetableSerializer(data=request.data)

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
                {"error": "Room already booked at this time"},
                status=400
            )

        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)

@api_view(["GET", "POST"])
def courses(request):

    if request.method == "GET":

        serializer = CourseSerializer(
            Course.objects,
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
            {"error": "Course not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    
    
@api_view(["GET", "POST"])
def rooms(request):

    if request.method == "GET":

        data = Room.objects()

        serializer = RoomSerializer(data, many=True)

        return Response(serializer.data)

    serializer = RoomSerializer(data=request.data)

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data, status=201)

    return Response(serializer.errors, status=400)


@api_view(["DELETE"])
def delete_room(request, id):

    try:

        room = Room.objects.get(id=id)

        room.delete()

        return Response({
            "message": "Room deleted"
        })

    except DoesNotExist:

        return Response({
            "error": "Room not found"
        }, status=404)

@api_view(["GET"])
def detect_conflicts(request):

    timetable = Timetable.objects

    try:
        check_conflicts(timetable)

        return Response({
            "status": "No conflicts found"
        })

    except Exception as e:

        return Response({
            "status": str(e)
        }, status=400)
    

@api_view(["GET"])
def student_schedule(request):

    course_code = request.GET.get("course_code")

    if course_code:
        exams = Timetable.objects(
            course_code=course_code
        )
    else:
        exams = Timetable.objects

    serializer = TimetableSerializer(exams, many=True)

    return Response(serializer.data)   


@api_view(["GET"])
def search_timetable(request):

    exam_date = request.GET.get("date")
    room_id = request.GET.get("room")

    timetable = Timetable.objects

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


    
@api_view(["GET", "POST"])
def faculties(request):

    if request.method == "GET":

        data = Faculty.objects()

        serializer = FacultySerializer(data, many=True)

        return Response(serializer.data)

    serializer = FacultySerializer(data=request.data)

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data, status=201)

    return Response(serializer.errors, status=400)


@api_view(["DELETE"])
def delete_faculty(request, id):

    try:

        faculty = Faculty.objects.get(id=id)

        faculty.delete()

        return Response({
            "message": "Faculty deleted"
        })

    except DoesNotExist:

        return Response({
            "error": "Faculty not found"
        }, status=404)

@api_view(["GET"])
def dashboard(request):

    return Response({

        "courses": Course.objects.count(),

        "rooms": Room.objects.count(),

        "timetable": Timetable.objects.count(),

        "faculties": Faculty.objects.count()

    })