import { useEffect, useState } from "react";
import api from "../services/api";

import FacultyTable from "../components/faculty/FacultyTable";
import FacultyForm from "../components/faculty/FacultyForm";

export default function Faculty() {

    const [faculties, setFaculties] = useState([]);
    const [editing, setEditing] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState("");

    const filteredFaculties = faculties.filter((faculty) =>

        faculty.faculty_id.toLowerCase().includes(search.toLowerCase()) ||

        faculty.faculty_name.toLowerCase().includes(search.toLowerCase()) ||

        faculty.department.toLowerCase().includes(search.toLowerCase())

    );

    const loadFaculties = async () => {

        try {

            const res = await api.get("/faculties/");

            setFaculties(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        loadFaculties();

    }, []);

    const addFaculty = async (data) => {

        try {

            await api.post("/faculties/", data);

            setShowForm(false);

            loadFaculties();

        }

        catch (err) {

            console.log(err);

            alert("Unable to add faculty");

        }

    };

    const updateFaculty = async (data) => {

        try {

            await api.put(

                `/faculties/${editing.id}/`,

                data

            );

            setEditing(null);

            setShowForm(false);

            loadFaculties();

        }

        catch (err) {

            console.log(err);

            alert("Unable to update faculty");

        }

    };

    const deleteFaculty = async (id) => {

        if (!window.confirm("Delete this faculty member?"))

            return;

        try {

            await api.delete(`/faculties/${id}/`);

            loadFaculties();

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="space-y-6">

            <div className="flex justify-between items-center">

                <h1 className="text-3xl font-bold">

                    Faculty

                </h1>

                <button

                    onClick={() => {

                        setEditing(null);

                        setShowForm(true);

                    }}

                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"

                >

                    + Add Faculty

                </button>

            </div>

            {showForm && (

                <FacultyForm

                    initialData={editing}

                    onCancel={() => {

                        setEditing(null);

                        setShowForm(false);

                    }}

                    onSubmit={editing ? updateFaculty : addFaculty}

                />

            )}

            <input

                type="text"

                placeholder="Search faculty..."

                value={search}

                onChange={(e) => setSearch(e.target.value)}

                className="w-full md:w-96 rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"

            />

            <FacultyTable

                faculties={filteredFaculties}

                onEdit={(faculty) => {

                    setEditing(faculty);

                    setShowForm(true);

                }}

                onDelete={deleteFaculty}

            />

        </div>

    );

}