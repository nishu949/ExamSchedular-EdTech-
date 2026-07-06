from mongoengine import (
    Document,
    StringField,
    IntField,
    DateField,
    DateTimeField
)
from datetime import datetime



class Course(Document):

    course_code = StringField(
        required=True,
        unique=True,
        regex=r'^[A-Z]{2,4}[0-9]{3}$'
    )

    course_name = StringField(
        required=True,
        max_length=100
    )

    faculty = StringField(
        required=True,
        max_length=100
    )

    meta = {
        "collection": "courses"
    }

    def __str__(self):
        return self.course_name


class Room(Document):

    room_id = StringField(
        required=True,
        unique=True,
        regex=r'^[A-Z][0-9]{3}$'
    )

    capacity = IntField(
        required=True
    )

    meta = {
        "collection": "rooms"
    }

    def __str__(self):
        return self.room_id



class Timetable(Document):

    course_code = StringField(required=True)

    room_id = StringField(required=True)

    exam_date = DateField(required=True)

    exam_time = StringField(required=True)

    created_at = DateTimeField(
        default=datetime.utcnow
    )

    meta = {
        "collection": "timetable"
    }



class Faculty(Document):

    faculty_id = StringField(
        required=True,
        unique=True
    )

    faculty_name = StringField(
        required=True,
        max_length=100
    )

    department = StringField(
        required=True,
        max_length=100
    )

    meta = {
        "collection": "faculties"
    }

    def __str__(self):
        return self.faculty_name