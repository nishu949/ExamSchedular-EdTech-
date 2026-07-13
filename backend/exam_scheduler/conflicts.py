# CASE 3.3:Requirement: Multithreaded conflict checker
#The project uses object-oriented programming by separating Course, Room, Faculty, Student, and ScheduleEngine 
# into different classes. Course and Room models include regular expression validation to ensure only correctly formatted
# course codes and room IDs are stored. Conflict detection is implemented using Python multithreading, where separate 
# threads simultaneously check room conflicts, faculty conflicts, and student conflicts. 
# After all threads complete execution using join(), the combined conflict report is returned through the API. 
# This improves scalability and demonstrates concurrent programming in Python.

from threading import Thread

from .models import Timetable, Student

# Room Conflict

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
                f"Room conflict: {exam.room_id}"
            )

        else:

            occupied[key] = True

    return conflicts



# Faculty Conflict


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
                f"Faculty conflict: {exam.faculty}"
            )

        else:

            occupied[key] = True

    return conflicts



# Student Conflict


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
                        f"Student conflict: {student.student_name}"
                    )

                else:

                    occupied[key] = True

    return conflicts


# CASE 3.3:Requirement: Multithreaded conflict checker

# Multithreaded Conflict Checker


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