import { useEffect, useState } from "react";

export default function CourseForm({

    onSubmit,
    initialData,
    onCancel

}) {

    const [form, setForm] = useState({

        course_code: "",
        course_name: "",
        faculty: ""

    });

    const [errors, setErrors] = useState({});

    useEffect(() => {

        if (initialData) {

            setForm({

                course_code: initialData.course_code,
                course_name: initialData.course_name,
                faculty: initialData.faculty

            });

        }

    }, [initialData]);

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const validate = () => {

        let temp = {};

        const regex = /^[A-Z]{2,4}[0-9]{3}$/;

        if (!regex.test(form.course_code))

            temp.course_code =
                "Example: CS101";

        if (!form.course_name.trim())

            temp.course_name =
                "Course Name required";

        if (!form.faculty.trim())

            temp.faculty =
                "Faculty required";

        setErrors(temp);

        return Object.keys(temp).length === 0;

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!validate()) return;

        onSubmit(form);

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl border border-slate-200 p-6"
        >

            <h2 className="text-xl font-semibold mb-6">

                {initialData
                    ? "Edit Course"
                    : "Add Course"}

            </h2>

            <div className="space-y-5">

                <div>

                    <label className="block mb-2 text-sm font-medium">

                        Course Code

                    </label>

                    <input

                        name="course_code"

                        value={form.course_code}

                        onChange={handleChange}

                        className="w-full border rounded-lg px-4 py-2"

                    />

                    {errors.course_code &&

                        <p className="text-red-500 text-sm mt-1">

                            {errors.course_code}

                        </p>

                    }

                </div>

                <div>

                    <label className="block mb-2 text-sm font-medium">

                        Course Name

                    </label>

                    <input

                        name="course_name"

                        value={form.course_name}

                        onChange={handleChange}

                        className="w-full border rounded-lg px-4 py-2"

                    />

                    {errors.course_name &&

                        <p className="text-red-500 text-sm mt-1">

                            {errors.course_name}

                        </p>

                    }

                </div>

                <div>

                    <label className="block mb-2 text-sm font-medium">

                        Faculty

                    </label>

                    <input

                        name="faculty"

                        value={form.faculty}

                        onChange={handleChange}

                        className="w-full border rounded-lg px-4 py-2"

                    />

                    {errors.faculty &&

                        <p className="text-red-500 text-sm mt-1">

                            {errors.faculty}

                        </p>

                    }

                </div>

                <div className="flex justify-end gap-3 pt-4">

                    <button

                        type="button"

                        onClick={onCancel}

                        className="px-5 py-2 border rounded-lg"

                    >

                        Cancel

                    </button>

                    <button

                        type="submit"

                        className="bg-blue-600 text-white px-5 py-2 rounded-lg"

                    >

                        Save

                    </button>

                </div>

            </div>

        </form>

    );

}