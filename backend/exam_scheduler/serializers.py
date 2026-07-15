from rest_framework import serializers

from .models import (
    Course,
    Room,
    Faculty,
    Student,
    Timetable,
    Admin
)

class AdminSerializer(serializers.Serializer):

    id = serializers.CharField(read_only=True)

    username = serializers.CharField()

    email = serializers.EmailField()

    password = serializers.CharField()

    def create(self, validated_data):

        return Admin(**validated_data).save()
    

class CourseSerializer(serializers.Serializer):

    id = serializers.CharField(read_only=True)

    course_code = serializers.RegexField(regex=r'^[A-Z]{2,4}[0-9]{3}$')

    course_name = serializers.CharField()

    faculty = serializers.CharField()

    students = serializers.ListField(
        child=serializers.CharField(),
        required=False
    )

    student_count = serializers.IntegerField(
    required=False,
    default=0,
    min_value=0
    )

    def create(self, validated_data):
        return Course(**validated_data).save()

    def update(self, instance, validated_data):

        instance.course_code = validated_data.get(
            "course_code",
            instance.course_code
        )

        instance.course_name = validated_data.get(
            "course_name",
            instance.course_name
        )

        instance.faculty = validated_data.get(
            "faculty",
            instance.faculty
        )

        instance.students = validated_data.get(
            "students",
            instance.students
        )

        instance.student_count = validated_data.get(
            "student_count",
            instance.student_count
        )

        instance.save()

        return instance

class RoomSerializer(serializers.Serializer):

    id = serializers.CharField(read_only=True)

    room_id = serializers.RegexField( regex=r'^[A-Z][0-9]{3}$')

    capacity = serializers.IntegerField(
    min_value=1
    )

    def create(self, validated_data):
        return Room(**validated_data).save()

    def update(self, instance, validated_data):

        instance.room_id = validated_data.get(
            "room_id",
            instance.room_id
        )

        instance.capacity = validated_data.get(
            "capacity",
            instance.capacity
        )

        instance.save()

        return instance


class FacultySerializer(serializers.Serializer):

    id = serializers.CharField(read_only=True)

    faculty_id = serializers.CharField()

    faculty_name = serializers.CharField()

    department = serializers.CharField()

    available_days = serializers.ListField(
        child=serializers.CharField(),
        required=False
    )

    unavailable_dates = serializers.ListField(
        child=serializers.DateField(),
        required=False
    )

    def create(self, validated_data):
        return Faculty(**validated_data).save()

    def update(self, instance, validated_data):

        instance.faculty_id = validated_data.get(
            "faculty_id",
            instance.faculty_id
        )

        instance.faculty_name = validated_data.get(
            "faculty_name",
            instance.faculty_name
        )

        instance.department = validated_data.get(
            "department",
            instance.department
        )

        instance.available_days = validated_data.get(
            "available_days",
            instance.available_days
        )

        instance.unavailable_dates = validated_data.get(
            "unavailable_dates",
            instance.unavailable_dates
        )

        instance.save()

        return instance


class StudentSerializer(serializers.Serializer):

    id = serializers.CharField(read_only=True)

    student_id = serializers.CharField()

    student_name = serializers.CharField()

    department = serializers.CharField()
    password = serializers.CharField(write_only=True)
    enrolled_courses = serializers.ListField(
        child=serializers.CharField()
    )

    def create(self, validated_data):
        return Student(**validated_data).save()

    def update(self, instance, validated_data):

        instance.student_id = validated_data.get(
            "student_id",
            instance.student_id
        )

        instance.student_name = validated_data.get(
            "student_name",
            instance.student_name
        )

        instance.department = validated_data.get(
            "department",
            instance.department
        )

        instance.enrolled_courses = validated_data.get(
            "enrolled_courses",
            instance.enrolled_courses
        )

        instance.save()

        return instance


class TimetableSerializer(serializers.Serializer):

    id = serializers.CharField(read_only=True)

    course_code = serializers.CharField()

    room_id = serializers.CharField()

    faculty = serializers.CharField()

    exam_date = serializers.DateField()

    exam_time = serializers.ChoiceField(
    choices=[
        "10:00",
        "14:00"
    ]
    )

    created_at = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return Timetable(**validated_data).save()

    def update(self, instance, validated_data):

        instance.course_code = validated_data.get(
            "course_code",
            instance.course_code
        )

        instance.room_id = validated_data.get(
            "room_id",
            instance.room_id
        )

        instance.faculty = validated_data.get(
            "faculty",
            instance.faculty
        )

        instance.exam_date = validated_data.get(
            "exam_date",
            instance.exam_date
        )

        instance.exam_time = validated_data.get(
            "exam_time",
            instance.exam_time
        )

        instance.save()

        return instance