from datetime import datetime, timedelta
from threading import Thread

from .models import (
    Course,
    Room,
    Faculty,
    Student,
    Timetable
)


class ScheduleConflictException(Exception):
    pass


class ScheduleEngine:

    def __init__(self):

        self.rooms = sorted(
            list(Room.objects()),
            key=lambda room: room.capacity
        )

        self.courses = list(Course.objects())
        self.faculties = list(Faculty.objects())
        self.students = list(Student.objects())

        self.time_slots = [
            "10:00",
            "14:00"
        ]

    # -------------------------------------------------
    # Faculty Availability
    # -------------------------------------------------

    def is_faculty_available(self, faculty_name, exam_date):

        faculty = Faculty.objects(
            faculty_name=faculty_name
        ).first()

        if faculty is None:
            return False

        weekday = exam_date.strftime("%A")

        if weekday not in faculty.available_days:
            return False

        if exam_date in faculty.unavailable_dates:
            return False

        return True

    # -------------------------------------------------
    # Generate Timetable
    # -------------------------------------------------

    def generate(self):

        Timetable.objects().delete()

        room_schedule = {}
        faculty_schedule = {}
        student_schedule = {}

        current_date = datetime.today()

        slot_index = 0

        if not self.rooms:
            raise ScheduleConflictException(
                "No rooms available"
            )

        if not self.courses:
            raise ScheduleConflictException(
                "No courses available"
            )

        for course in self.courses:

            assigned_room = None

            while assigned_room is None:

                exam_date = current_date.date()

                exam_time = self.time_slots[slot_index]

                for room in self.rooms:

                    # Capacity Check
                    if room.capacity < course.student_count:
                        continue

                    # Faculty Availability
                    if not self.is_faculty_available(
                        course.faculty,
                        exam_date
                    ):
                        continue

                    room_key = (
                        room.room_id,
                        exam_date,
                        exam_time
                    )

                    faculty_key = (
                        course.faculty,
                        exam_date,
                        exam_time
                    )

                    # Room Conflict
                    if room_key in room_schedule:
                        continue

                    # Faculty Conflict
                    if faculty_key in faculty_schedule:
                        continue

                    # Student Conflict
                    clash = False

                    for student in course.students:

                        student_key = (
                            student,
                            exam_date,
                            exam_time
                        )

                        if student_key in student_schedule:
                            clash = True
                            break

                    if clash:
                        continue

                    assigned_room = room

                    room_schedule[room_key] = course.course_code

                    faculty_schedule[faculty_key] = course.course_code

                    for student in course.students:

                        student_schedule[
                            (
                                student,
                                exam_date,
                                exam_time
                            )
                        ] = course.course_code

                    break

                # No room found → Try next slot/day
                if assigned_room is None:

                    slot_index += 1

                    if slot_index >= len(self.time_slots):

                        slot_index = 0

                        current_date += timedelta(days=1)

            Timetable(

                course_code=course.course_code,

                faculty=course.faculty,

                room_id=assigned_room.room_id,

                exam_date=exam_date,

                exam_time=exam_time

            ).save()

            slot_index += 1

            if slot_index >= len(self.time_slots):

                slot_index = 0

                current_date += timedelta(days=1)
# ====================================================
# ROOM CONFLICT
# ====================================================

def room_conflict():

    conflicts = []

    occupied = {}

    for exam in Timetable.objects():

        key = (
            exam.room_id,
            exam.exam_date,
            exam.exam_time
        )

        if key in occupied:

            conflicts.append(
                f"Room conflict : {exam.room_id}"
            )

        else:

            occupied[key] = True

    return conflicts


# ====================================================
# FACULTY CONFLICT
# ====================================================

def faculty_conflict():

    conflicts = []

    occupied = {}

    for exam in Timetable.objects():

        key = (
            exam.faculty,
            exam.exam_date,
            exam.exam_time
        )

        if key in occupied:

            conflicts.append(
                f"Faculty conflict : {exam.faculty}"
            )

        else:

            occupied[key] = True

    return conflicts


# ====================================================
# STUDENT CONFLICT
# ====================================================

def student_conflict():

    conflicts = []

    occupied = {}

    students = Student.objects()
    timetable = Timetable.objects()

    for student in students:

        for exam in timetable:

            if exam.course_code in student.enrolled_courses:

                key = (
                    student.student_id,
                    exam.exam_date,
                    exam.exam_time
                )

                if key in occupied:

                    conflicts.append(
                        f"Student conflict : {student.student_name}"
                    )

                else:

                    occupied[key] = True

    return conflicts


# ====================================================
# MULTITHREADED CONFLICT CHECK
# ====================================================

def check_conflicts():

    conflicts = []

    t1 = Thread(
        target=lambda: conflicts.extend(room_conflict())
    )

    t2 = Thread(
        target=lambda: conflicts.extend(faculty_conflict())
    )

    t3 = Thread(
        target=lambda: conflicts.extend(student_conflict())
    )

    t1.start()
    t2.start()
    t3.start()

    t1.join()
    t2.join()
    t3.join()

    return conflicts