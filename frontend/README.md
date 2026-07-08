# University Exam Timetable Generator & Conflict Resolver

## Project Overview

The **University Exam Timetable Generator & Conflict Resolver** is an intelligent scheduling system designed to automate the process of creating university examination timetables while ensuring conflict-free scheduling. The system uses Python-based constraint checking algorithms to automatically allocate exam slots, rooms, and faculty resources while detecting and resolving scheduling conflicts.

The application helps administrators efficiently manage large examination schedules by considering course details, room availability, faculty availability, and student examination constraints. It provides an automated timetable generation mechanism, conflict detection, and reporting features through a web-based admin interface and REST APIs.

## Problem Statement

Creating university exam timetables manually is a complex task that requires handling multiple constraints such as:

- Multiple courses having overlapping examination requirements
- Limited room availability
- Faculty availability restrictions
- Student timetable clashes
- Proper allocation of examination dates and time slots

Manual scheduling often leads to conflicts, errors, and time-consuming adjustments. This project provides an automated solution to generate optimized and conflict-free examination schedules.

## Proposed Solution

The system implements a custom scheduling engine that automatically generates examination timetables using constraint-based logic. It validates course codes and room IDs, checks availability, detects clashes, and provides conflict reports.

The scheduler uses Python data structures and algorithms to efficiently manage scheduling operations:

- Dictionaries for course-to-timeslot mapping
- Lists for room allocation management
- Conditional logic for conflict checking
- Datetime module for generating examination date and time slots
- Custom exceptions for handling room and faculty conflicts
- Multithreading for faster conflict detection on large schedules

## Key Features

### 1. Automated Timetable Generation
- Automatically creates examination schedules based on available resources.
- Assigns suitable rooms and time slots.
- Generates clash-free timetables using scheduling constraints.

### 2. Conflict Detection & Resolution
- Detects:
  - Same student appearing for multiple exams at the same time
  - Room allocation conflicts
  - Faculty availability conflicts
- Flags conflicts using custom exception handling.

### 3. Course & Room Management
- Manage courses, rooms, faculty availability, and timetable records.
- Perform CRUD operations using MongoDB.
- Query schedules based on:
  - Examination date
  - Room allocation

### 4. Admin Scheduler Dashboard
- Admin can enter scheduling details.
- Manage:
  - Course information
  - Room details
  - Faculty availability
  - Exam scheduling inputs

### 5. Student Schedule View
- Students can view their personal examination timetable.
- Provides easy access to exam date, time, and room details.

### 6. Report Generation
- Generate:
  - Date-wise examination timetable reports
  - Room-wise allocation reports

### 7. REST API Support
- Built using Django REST Framework (DRF).
- Provides APIs for:
  - Student mobile application access
  - Timetable retrieval
  - Schedule information management

## Technology Stack

### Backend
- Python
- Django
- Django REST Framework (DRF)
- Custom Scheduler Module

### Database
- MongoDB

### Frontend
- Admin Scheduler UI
- Student Timetable Interface

### Python Concepts Used

- **Data Structures**
  - Dictionary → Course and timeslot mapping
  - List → Room allocation management

- **Libraries & Modules**
  - `datetime` → Exam slot generation
  - `re` → Course code and room ID validation
  - `threading` → Parallel conflict checking
  - `exception handling` → Scheduling conflict management

- **Object-Oriented Programming**
  - Course Class
  - Room Class
  - ScheduleEngine Class

## Database Modules

The MongoDB database contains collections for:

### Courses
Stores:
- Course code
- Course name
- Student details
- Exam requirements

### Rooms
Stores:
- Room ID
- Capacity
- Availability

### Faculty Availability
Stores faculty scheduling information.

### Timetable
Stores generated examination schedules.

## System Workflow

1. Admin enters course, room, and faculty availability details.
2. System validates course codes and room IDs using regex.
3. Scheduler engine generates available date-time slots.
4. Constraint checking algorithm allocates rooms and schedules.
5. Conflict detection runs to identify clashes.
6. Final timetable is stored in MongoDB.
7. Students can view their examination schedules.
8. Reports can be generated based on date and room.

## Benefits

- Reduces manual timetable preparation effort.
- Generates accurate conflict-free schedules.
- Improves resource utilization.
- Provides quick timetable access for students.
- Handles large scheduling datasets efficiently.

## Future Enhancements

- AI-based timetable optimization.
- Mobile application integration.
- Advanced scheduling algorithms.
- Real-time timetable modification notifications.
- Cloud deployment for university-wide usage.
# installation command 
 1.npm create vite@latest frontend   
 2.npm install axios react-router-dom
 3.npm install tailwindcss
 4.npm install -D @tailwindcss/postcss
 5.npm install tailwindcss@latest @tailwindcss/vite@latest
 6.npm install -D tailwindcss@3.4.17 postcss autoprefixer 
 7.npm install lucide-react framer-motion recharts react-hot-toast
