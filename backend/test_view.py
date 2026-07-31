import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from mongoengine import connect
from exam_scheduler.models import Course

try:
    connect(host=os.environ.get('MONGO_URI'))
    print("✅ MongoDB Connected")
    print(f"Total Courses: {Course.objects.count()}")
    for course in Course.objects()[:3]:
        print(f"  - {course.course_code}: {course.course_name}")
except Exception as e:
    print(f"❌ Error: {e}")