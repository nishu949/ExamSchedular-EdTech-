# CASE 3: Course, Room, ScheduleEngine classes; regex for course code/room ID; threading for conflict check

#The project follows object-oriented programming principles. I created separate Course and Room classes for data
#  modelling and a dedicated ScheduleEngine class that contains all scheduling logic


# CASE 4: MongoDB for courses, rooms, timetable; CRUD; query by date and room

#The project uses MongoDB with MongoEngine to store Courses, Rooms, Faculties, Students, and Timetable data. 
# CRUD operations are implemented through Django REST APIs, and MongoDB queries are used to generate room-wise 
# and date-wise timetable reports.
from mongoengine import (
    Document,
    StringField,
    IntField,
    DateField,
    DateTimeField,
    ListField
)
from datetime import datetime
from mongoengine import Document, StringField, EmailField

# CASE 3.1:Requirement: Course, Room, ScheduleEngine classes
class Course(Document):

    course_code = StringField(
        required=True,
        unique=True,
        # cASE 3.2:Requirement: Regex for course code
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
        #CASE 3.2 :Requirement: Regex for room ID
        regex=r'^[A-Z][0-9]{3}$'
    )

    capacity = IntField(required=True)

    meta = {
        "collection": "rooms"
    }
    

class Faculty(Document):

    faculty_id = StringField(
    required=True,
    unique=True,
    regex=r"^FAC[0-9]{3}$"
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
    unique=True,
    regex=r"^S[0-9]{3}$"
   )

    student_name = StringField(required=True)

    department = StringField(required=True)
    password = StringField(required=True)
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

    meta = {
        "collection": "timetable"
    }


class Admin(Document):
    username = StringField(required=True, unique=True)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)

    meta = {
        "collection": "admins"
    }