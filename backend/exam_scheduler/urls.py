from django.urls import path
from .views import *

urlpatterns = [

    path(
        "courses/",
        courses
    ),

    path(
        "courses/<int:id>/",
        delete_course
    ),

    path(
        "rooms/",
        rooms
    ),

    path(
        "rooms/<int:id>/",
        delete_room
    ),

    path(
        "timetable/",
        timetable
    ),

    path(
        "generate/",
        generate_timetable
    ),

    path(
        "conflicts/",
        detect_conflicts
    ),

    path(
        "student-schedule/",
        student_schedule
    ),

    path(
        "search/",
        search_timetable
    ),

    path(
        "report/",
        download_report
    ),
    path(
        "faculties/", 
         faculties
         ),

    path(
        "faculties/<int:id>/",
      delete_faculty
      ),

    path(
    "dashboard/",
    dashboard
),
]