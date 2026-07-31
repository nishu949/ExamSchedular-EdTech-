from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

from rest_framework import permissions

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Home page view
def home(request):
    return HttpResponse("""
    <h1>Welcome to Exam Scheduler API</h1>
    <p>Available endpoints:</p>
    <ul>
        <li><a href="/api/dashboard/">/api/dashboard/</a></li>
        <li><a href="/api/courses/">/api/courses/</a></li>
        <li><a href="/api/rooms/">/api/rooms/</a></li>
        <li><a href="/api/faculties/">/api/faculties/</a></li>
        <li><a href="/api/students/">/api/students/</a></li>
        <li><a href="/api/timetable/">/api/timetable/</a></li>
        <li><a href="/swagger/">/swagger/</a></li>
    </ul>
    """)

schema_view = get_schema_view(
    openapi.Info(
        title="University Exam Timetable Generator API",
        default_version="v1",
        description="REST API Documentation",
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path("", home),  # Root URL
    path("admin/", admin.site.urls),
    path("api/", include("exam_scheduler.urls")),
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]