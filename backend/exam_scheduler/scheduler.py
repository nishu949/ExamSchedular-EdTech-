from datetime import datetime, timedelta

from .exceptions import ConflictException
from .models import Course, Room, Timetable


class ScheduleConflictException(Exception):
    pass


class ScheduleEngine:

    def __init__(self):

        self.rooms = list(Room.objects)

        self.courses = list(Course.objects)

        self.time_slots = [
            "10:00",
            "14:00"
        ]

    def generate(self):

        # Clear old timetable
        Timetable.objects.delete()

        room_schedule = {}

        current_date = datetime.today()

        room_index = 0
        slot_index = 0

        if len(self.rooms) == 0:
            raise ScheduleConflictException(
                "No rooms available"
            )

        if len(self.courses) == 0:
            raise ScheduleConflictException(
                "No courses available"
            )

        for course in self.courses:

            room = self.rooms[room_index]

            exam_date = current_date.date()

            exam_time = self.time_slots[slot_index]

            key = (
                room.room_id,
                exam_date,
                exam_time
            )

            if key in room_schedule:

                raise ScheduleConflictException(
                    f"Conflict in room {room.room_id}"
                )

            room_schedule[key] = course.course_code

            Timetable(
                course_code=course.course_code,
                room_id=room.room_id,
                exam_date=exam_date,
                exam_time=exam_time
            ).save()

            slot_index += 1

            if slot_index >= len(self.time_slots):

                slot_index = 0

                room_index += 1

                if room_index >= len(self.rooms):

                    room_index = 0

                    current_date += timedelta(days=1)


def check_conflicts(timetable):

    room_slots = {}

    faculty_slots = {}

    for exam in timetable:

        slot = f"{exam.exam_date}_{exam.exam_time}"

        if (exam.room_id, slot) in room_slots:

            raise ConflictException(
                f"Room conflict: {exam.room_id}"
            )

        room_slots[(exam.room_id, slot)] = exam.course_code

        faculty = getattr(exam, "faculty", None)

        if faculty:

            if (faculty, slot) in faculty_slots:

                raise ConflictException(
                    f"Faculty conflict: {faculty}"
                )

            faculty_slots[(faculty, slot)] = exam.course_code

    return True