import { useEffect, useState } from "react";

export default function FacultyForm({

    initialData,
    onSubmit,
    onCancel

}) {

    const [form, setForm] = useState({

    faculty_id: "",
    faculty_name: "",
    department: "",
    available_days: []

});

    useEffect(() => {

        if (initialData) {

            setForm({

    faculty_id: initialData.faculty_id,
    faculty_name: initialData.faculty_name,
    department: initialData.department,
    available_days: initialData.available_days || []

});

        }

    }, [initialData]);

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleDayChange = (e) => {

    const { value, checked } = e.target;

    if (checked) {

        setForm({
            ...form,
            available_days: [...form.available_days, value]
        });

    } else {

        setForm({
            ...form,
            available_days: form.available_days.filter(
                day => day !== value
            )
        });

    }

};

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit(form);

    };

    return (

        <div className="bg-white border border-slate-200 rounded-xl p-6">

            <h2 className="text-xl font-semibold mb-6">

                {initialData ? "Edit Faculty" : "Add Faculty"}

            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid md:grid-cols-2 gap-5"
            >

                <div>

                    <label className="block mb-2 text-sm font-medium">

                        Faculty ID

                    </label>

                    <input

                        type="text"

                        name="faculty_id"

                        value={form.faculty_id}

                        onChange={handleChange}

                        placeholder="FAC101"

                        required

                        className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"

                    />

                </div>

                <div>

                    <label className="block mb-2 text-sm font-medium">

                        Faculty Name

                    </label>

                    <input

                        type="text"

                        name="faculty_name"

                        value={form.faculty_name}

                        onChange={handleChange}

                        placeholder="Dr. Sharma"

                        required

                        className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"

                    />

                </div>

                <div className="md:col-span-2">

                    <label className="block mb-2 text-sm font-medium">

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

                <div className="md:col-span-2">

    <label className="block mb-2 text-sm font-medium">

        Available Days

    </label>

    <div className="flex flex-wrap gap-4">

        {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
        ].map(day => (

            <label key={day} className="flex items-center gap-2">

                <input
                    type="checkbox"
                    value={day}
                    checked={form.available_days.includes(day)}
                    onChange={handleDayChange}
                />

                {day}

            </label>

        ))}

    </div>

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