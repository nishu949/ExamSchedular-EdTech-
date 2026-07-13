import { useEffect, useState } from "react";

export default function RoomForm({

    initialData,
    onSubmit,
    onCancel

}) {

    const [form, setForm] = useState({

        room_id: "",
        capacity: ""

    });

    useEffect(() => {

        if (initialData) {

            setForm({

                room_id: initialData.room_id,
                capacity: initialData.capacity

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

            ...form,

            capacity: Number(form.capacity)

        });

    };

    return (

        <div className="bg-white border border-slate-200 rounded-xl p-6">

            <h2 className="text-xl font-semibold mb-6">

                {initialData ? "Edit Room" : "Add Room"}

            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid md:grid-cols-2 gap-5"
            >

                <div>

                    <label className="block mb-2 text-sm font-medium">

                        Room ID

                    </label>

                    <input

                        name="room_id"

                        value={form.room_id}

                        onChange={handleChange}

                        placeholder="A101"

                        pattern="[A-Z][0-9]{3}"

                        required

                        className="w-full rounded-lg border border-slate-300 px-4 py-2"

                    />

                </div>

                <div>

                    <label className="block mb-2 text-sm font-medium">

                        Capacity

                    </label>

                    <input

                        type="number"

                        name="capacity"

                        value={form.capacity}

                        onChange={handleChange}

                        required

                        min="1"

                        className="w-full rounded-lg border border-slate-300 px-4 py-2"

                    />

                </div>

                <div className="md:col-span-2 flex gap-3">

                    <button

                        className="bg-blue-600 text-white px-6 py-2 rounded-lg"

                    >

                        Save

                    </button>

                    <button

                        type="button"

                        onClick={onCancel}

                        className="border px-6 py-2 rounded-lg"

                    >

                        Cancel

                    </button>

                </div>

            </form>

        </div>

    );

}