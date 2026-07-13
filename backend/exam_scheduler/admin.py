from django.contrib import admin

# MongoEngine models are not registered with Django admin.
# This project uses custom REST APIs and MongoDB collections.

# The project uses MongoDB with MongoEngine instead of Django's ORM. 
# Since Django Admin is designed for ORM models, I built a custom administrator dashboard using React 
# and Django REST Framework. It provides full CRUD functionality, timetable generation, reporting, 
# and scheduling features, serving as the administrator interface."