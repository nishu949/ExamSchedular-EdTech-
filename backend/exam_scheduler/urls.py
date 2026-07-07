from django.urls import path

from . import views

urlpatterns = [

    # Course
    path("courses/", views.courses),
    path("courses/<str:id>/", views.delete_course),

    # Room
    path("rooms/", views.rooms),
    path("rooms/<str:id>/", views.delete_room),

    # Faculty
    path("faculties/", views.faculties),
    path("faculties/<str:id>/", views.delete_faculty),

    # Student
    path("students/", views.students),
    path("students/<str:id>/", views.delete_student),

    # Timetable
    path("timetable/", views.timetable),

    # Scheduler
    path("generate/", views.generate_timetable),

    # Dashboard
    path("dashboard/", views.dashboard),

    # Search
    path("search/", views.search_timetable),

    # Student Schedule
    path("student-schedule/", views.student_schedule),

    # Conflict Detection
    path("conflicts/", views.detect_conflicts),

    # Reports
    path("report/", views.download_report),
    path("report/room/", views.room_report),
    path("report/date/", views.date_report),
]