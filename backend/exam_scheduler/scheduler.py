# Case 1 : Dicts for course-timeslot mapping; lists for room allocations; conditionals for conflict detection
# Case 2:datetime for date-time slot generation; exception for room/faculty conflict; custom scheduler module
from datetime import datetime, timedelta

from .models import (
    Course,
    Room,
    Faculty,
    Student,
    Timetable
)
# Exception for room/faculty conflict
from .exceptions import ScheduleConflictException

# CASE 2.3 :Requirement: Custom scheduler module
#I designed a custom scheduling module named ScheduleEngine that encapsulates all timetable generation logic. 
# It retrieves data from MongoDB, checks scheduling constraints, allocates rooms and faculty, generates examination dates,
#  and stores the final timetable.
class ScheduleEngine:

    def __init__(self):

        self.rooms = sorted(

 # Case 1.2 lists for room allocations

#Rooms are stored inside a Python list after retrieving them from MongoDB.
# During timetable generation, the scheduler traverses this list and allocates 
# the first room having sufficient capacity.
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


    # Faculty Availability Check


    def is_faculty_available(
        self,
        faculty_name,
        exam_date
    ):

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


    # Find Suitable Room


    def get_room(self, student_count):

        for room in self.rooms:

            if room.capacity >= student_count:

                return room

        return None

  
# Generate Timetable


    def generate(self):

        Timetable.objects.delete()

#Case 1.1: Dicts for course-timeslot mapping,These dictionaries are used to map scheduled entities to a specific timeslot

#I used Python dictionaries to maintain mappings between rooms, faculties and students 
# with their allocated exam date and timeslot. Before assigning a slot, the scheduler 
# checks these dictionaries to ensure that no duplicate allocation exists
        room_schedule = {}
        faculty_schedule = {}
        student_schedule = {}

        current_date = datetime.today()
        slot_index = 0
        max_attempts = 100

        if not self.rooms:
            raise ScheduleConflictException("No rooms available")

        if not self.courses:
            raise ScheduleConflictException("No courses available")

        for course in self.courses:

            assigned_room = None
            attempts = 0

            while assigned_room is None:

                attempts += 1

                if attempts > max_attempts:
                    raise ScheduleConflictException(
                        f"Unable to schedule {course.course_code}. "
                        f"Check faculty availability or room capacity."
                    )

                exam_date = current_date.date()
                exam_time = self.time_slots[slot_index]
                print("\n----------------------------")
                print("Course:", course.course_code)
                print("Faculty:", course.faculty)
                print("Date:", exam_date)
                print("Time:", exam_time)

                room = self.get_room(course.student_count)
                print("Room:", room.room_id if room else "NO ROOM")

                if room is None:
                    raise ScheduleConflictException(
                        f"No room available for {course.course_code}"
                    )
#   Case 1.3 conditionals for conflict detection

#The scheduler uses Python conditional statements to verify every scheduling constraint such as room availability,
#  faculty availability, faculty conflicts, room conflicts and student clashes. 
# Only when every condition evaluates to true is the timetable entry created

          # Faculty Availability
                faculty_available = self.is_faculty_available(course.faculty, exam_date)
                print("Faculty Available:", faculty_available)
               #Case 2.1: datetime for date-time slot generation
                if not faculty_available:

                    slot_index += 1

                    if slot_index >= len(self.time_slots):
                        slot_index = 0
                        current_date += timedelta(days=1)

                    continue

                room_key = (room.room_id, exam_date, exam_time)
                faculty_key = (course.faculty,exam_date,exam_time)

            # Room Conflict
                if room_key in room_schedule:

                    slot_index += 1

                    if slot_index >= len(self.time_slots):
                        slot_index = 0
                        current_date += timedelta(days=1)

                    continue

            # Faculty Conflict
                if faculty_key in faculty_schedule:

                    slot_index += 1

                    if slot_index >= len(self.time_slots):
                        slot_index = 0
                        current_date += timedelta(days=1)

                    continue

            # Student Conflict
                clash = False

                for student in course.students:

                    student_key = (student,
                        exam_date,
                        exam_time
                    )

                    if student_key in student_schedule:
                        clash = True
                        break

                if clash:

                    slot_index += 1

                    if slot_index >= len(self.time_slots):
                        slot_index = 0
                        current_date += timedelta(days=1)

                    continue

            # Assign
                print(">>> ASSIGNED <<<")
                assigned_room = room

                room_schedule[room_key] = course.course_code
                faculty_schedule[faculty_key] = course.course_code

                for student in course.students:

                    student_schedule[
                        ( student, exam_date,exam_time )
                    ] = course.course_code

        # Save timetable entry
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

        return {"message": "Timetable generated successfully"}