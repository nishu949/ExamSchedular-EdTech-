import { useEffect, useState } from "react";

import api from "../services/api";

import CourseTable from "../components/courses/CourseTable";
import CourseForm from "../components/courses/CourseForm";

export default function Courses() {

    const [courses, setCourses] = useState([]);

    const [editing, setEditing] = useState(null);

    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState("");
    const filteredCourses = courses.filter((course) =>
    course.course_code.toLowerCase().includes(search.toLowerCase()) ||
    course.course_name.toLowerCase().includes(search.toLowerCase())
);

    const loadCourses = async () => {

        try {

            const res = await api.get("/courses/");

            setCourses(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        loadCourses();

    }, []);

    const addCourse = async (data) => {

        try {

            await api.post("/courses/", data);

            setShowForm(false);

            loadCourses();

        }

        catch (err) {

            console.log(err);

            alert("Unable to add course");

        }

    };

    const updateCourse = async (data) => {

        try {

            await api.put(

                `/courses/${editing.id}/`,

                data

            );

            setEditing(null);

            setShowForm(false);

            loadCourses();

        }

        catch (err) {

            console.log(err);

            alert("Unable to update");

        }

    };

    const deleteCourse = async (id) => {

        if (!window.confirm("Delete this course?"))

            return;

        try {

            await api.delete(`/courses/${id}/`);

            loadCourses();

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="space-y-6">

            <div className="flex justify-between items-center">

                <h1 className="text-3xl font-bold">

                    Courses

                </h1>

                <button

                    onClick={() => {

                        setEditing(null);

                        setShowForm(true);

                    }}

                    className="bg-blue-600 text-white px-5 py-2 rounded-lg"

                >

                    + Add Course

                </button>

            </div>

            {showForm && (

                <CourseForm

                    initialData={editing}

                    onCancel={() => {

                        setShowForm(false);

                        setEditing(null);

                    }}

                    onSubmit={editing ? updateCourse : addCourse}

                />

            )}
<div className="flex justify-between items-center gap-4">

    <input
        type="text"
        placeholder="Search by course code or course name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-96 rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
    />

</div>

          <CourseTable
    courses={filteredCourses}
    onEdit={(course) => {
        setEditing(course);
        setShowForm(true);
    }}
    onDelete={deleteCourse}
/>

        </div>

    );

}