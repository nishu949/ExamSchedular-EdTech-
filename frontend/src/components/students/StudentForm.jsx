import { useEffect, useState } from "react";

export default function StudentForm({

    initialData,
    onSubmit,
    onCancel

}) {

    const [form, setForm] = useState({

        student_id: "",
        student_name: "",
        department: "",
        enrolled_courses: ""

    });

    useEffect(() => {

        if (initialData) {

            setForm({

                student_id: initialData.student_id,
                student_name: initialData.student_name,
                department: initialData.department,
                enrolled_courses: initialData.enrolled_courses.join(", ")

            });

        }

    }, [initialData]);

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit({

            student_id: form.student_id,

            student_name: form.student_name,

            department: form.department,

            enrolled_courses: form.enrolled_courses
                .split(",")
                .map(course => course.trim())
                .filter(course => course !== "")

        });

    };

    return (

        <div className="bg-white rounded-xl border border-slate-200 p-6">

            <h2 className="text-xl font-semibold mb-6">

                {initialData ? "Edit Student" : "Add Student"}

            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid md:grid-cols-2 gap-5"
            >

                <div>

                    <label className="block text-sm font-medium mb-2">

                        Student ID

                    </label>

                    <input

                        type="text"

                        name="student_id"

                        value={form.student_id}

                        onChange={handleChange}

                        placeholder="S001"

                        required

                        className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"

                    />

                </div>

                <div>

                    <label className="block text-sm font-medium mb-2">

                        Student Name

                    </label>

                    <input

                        type="text"

                        name="student_name"

                        value={form.student_name}

                        onChange={handleChange}

                        placeholder="John Smith"

                        required

                        className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"

                    />

                </div>

                <div>

                    <label className="block text-sm font-medium mb-2">

                        Department

                    </label>

                    <input

                        type="text"

                        name="department"

                        value={form.department}

                        onChange={handleChange}

                        placeholder="Computer Science"

                        required

                        className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"

                    />

                </div>

                <div>

                    <label className="block text-sm font-medium mb-2">

                        Enrolled Courses

                    </label>

                    <input

                        type="text"

                        name="enrolled_courses"

                        value={form.enrolled_courses}

                        onChange={handleChange}

                        placeholder="CS101, CS102"

                        className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"

                    />

                    <p className="text-xs text-slate-500 mt-1">

                        Separate course codes with commas.

                    </p>

                </div>

                <div className="md:col-span-2 flex gap-3">

                    <button

                        type="submit"

                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"

                    >

                        Save

                    </button>

                    <button

                        type="button"

                        onClick={onCancel}

                        className="border border-slate-300 px-6 py-2 rounded-lg hover:bg-slate-100"

                    >

                        Cancel

                    </button>

                </div>

            </form>

        </div>

    );

}