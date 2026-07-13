import { useEffect, useState } from "react";

import api from "../services/api";

import StudentTable from "../components/students/StudentTable";
import StudentForm from "../components/students/StudentForm";

export default function Students() {

    const [students, setStudents] = useState([]);

    const [editing, setEditing] = useState(null);

    const [showForm, setShowForm] = useState(false);

    const [search, setSearch] = useState("");

    const filteredStudents = students.filter((student) =>

        student.student_id.toLowerCase().includes(search.toLowerCase()) ||

        student.student_name.toLowerCase().includes(search.toLowerCase()) ||

        student.department.toLowerCase().includes(search.toLowerCase())

    );

    const loadStudents = async () => {

        try {

            const res = await api.get("/students/");

            setStudents(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        loadStudents();

    }, []);

    const addStudent = async (data) => {

        try {

            await api.post("/students/", data);

            setShowForm(false);

            loadStudents();

        }

        catch (err) {

            console.log(err);

            alert("Unable to add student");

        }

    };

    const updateStudent = async (data) => {

        try {

            await api.put(

                `/students/${editing.id}/`,

                data

            );

            setEditing(null);

            setShowForm(false);

            loadStudents();

        }

        catch (err) {

            console.log(err);

            alert("Unable to update student");

        }

    };

    const deleteStudent = async (id) => {

        if (!window.confirm("Delete this student?"))

            return;

        try {

            await api.delete(`/students/${id}/`);

            loadStudents();

        }

        catch (err) {

            console.log(err);

            alert("Unable to delete student");

        }

    };

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="flex justify-between items-center">

                <h1 className="text-3xl font-bold">

                    Students

                </h1>

                <button

                    onClick={() => {

                        setEditing(null);

                        setShowForm(true);

                    }}

                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"

                >

                    + Add Student

                </button>

            </div>

            {/* Form */}

            {showForm && (

                <StudentForm

                    initialData={editing}

                    onCancel={() => {

                        setEditing(null);

                        setShowForm(false);

                    }}

                    onSubmit={

                        editing

                            ? updateStudent

                            : addStudent

                    }

                />

            )}

            {/* Search */}

            <input

                type="text"

                placeholder="Search by Student ID, Name or Department..."

                value={search}

                onChange={(e) => setSearch(e.target.value)}

                className="w-full md:w-96 rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"

            />

            {/* Table */}

            <StudentTable

                students={filteredStudents}

                onEdit={(student) => {

                    setEditing(student);

                    setShowForm(true);

                }}

                onDelete={deleteStudent}

            />

        </div>

    );

}