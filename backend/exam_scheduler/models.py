from mongoengine import (
    Document,
    StringField,
    IntField,
    DateField,
    DateTimeField,
    ListField
)
from datetime import datetime


class Course(Document):

    course_code = StringField(
        required=True,
        unique=True,
        regex=r'^[A-Z]{2,4}[0-9]{3}$'
    )

    course_name = StringField(required=True)

    faculty = StringField(required=True)

    students = ListField(
        StringField()
    )

   
    student_count = IntField(
        default=0
    )

    meta = {
        "collection": "courses"
    }


class Room(Document):

    room_id = StringField(
        required=True,
        unique=True,
        regex=r'^[A-Z][0-9]{3}$'
    )

    capacity = IntField(required=True)

    meta = {
        "collection": "rooms"
    }


class Faculty(Document):

    faculty_id = StringField(
        required=True,
        unique=True
    )

    faculty_name = StringField(required=True)

    department = StringField(required=True)

    available_days = ListField(
        StringField()
    )

    unavailable_dates = ListField(
        DateField()
    )

    meta = {
        "collection": "faculties"
    }


class Student(Document):

    student_id = StringField(
        required=True,
        unique=True
    )

    student_name = StringField(required=True)

    department = StringField(required=True)

    enrolled_courses = ListField(
        StringField()
    )

    meta = {
        "collection": "students"
    }


class Timetable(Document):

    course_code = StringField(required=True)

    faculty = StringField(required=True)

    room_id = StringField(required=True)

    exam_date = DateField(required=True)

    exam_time = StringField(required=True)

    created_at = DateTimeField(
        default=datetime.utcnow
    )

    meta = {
        "collection": "timetable"
    }