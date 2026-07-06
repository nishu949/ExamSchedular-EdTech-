from rest_framework import serializers

from .models import Course, Room, Faculty, Timetable


class CourseSerializer(serializers.Serializer):

    id = serializers.CharField(read_only=True)

    course_code = serializers.CharField()

    course_name = serializers.CharField()

    faculty = serializers.CharField()

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

        instance.save()

        return instance


class RoomSerializer(serializers.Serializer):

    id = serializers.CharField(read_only=True)

    room_id = serializers.CharField()

    capacity = serializers.IntegerField()

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

        instance.save()

        return instance


class TimetableSerializer(serializers.Serializer):

    id = serializers.CharField(read_only=True)

    course_code = serializers.CharField()

    room_id = serializers.CharField()

    exam_date = serializers.DateField()

    exam_time = serializers.CharField()

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