import { useEffect, useState } from "react";
import axios from "axios";

export default function ConflictReport() {

    const [conflicts, setConflicts] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadConflicts = async () => {

        try {

            const res = await axios.get(
                "http://127.0.0.1:8000/api/conflicts/"
            );

            setConflicts(res.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadConflicts();

    }, []);

    if (loading)
        return (
            <div className="p-6">
                Loading...
            </div>
        );

    return (

        <div className="p-6">

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">

                    Conflict Report

                </h1>

                <button

                    onClick={loadConflicts}

                    className="bg-blue-600 text-white px-5 py-2 rounded-lg"

                >

                    Refresh

                </button>

            </div>

            {conflicts.status ? (

                <div className="bg-green-100 border border-green-300 rounded-xl p-8 text-center">

                    <div className="text-5xl mb-3">

                        ✅

                    </div>

                    <h2 className="text-2xl font-bold text-green-700">

                        {conflicts.status}

                    </h2>

                    <p className="text-gray-600 mt-3">

                        Your examination timetable is completely clash free.

                    </p>

                </div>

            ) : (

                <div className="overflow-x-auto bg-white rounded-xl shadow">

                    <table className="w-full">

                        <thead className="bg-red-600 text-white">

                            <tr>

                                <th className="p-4">Conflict</th>

                                <th className="p-4">Course</th>

                                <th className="p-4">Room</th>

                                <th className="p-4">Date</th>

                                <th className="p-4">Time</th>

                            </tr>

                        </thead>

                        <tbody>

                            {conflicts.map((item,index)=>(

                                <tr key={index} className="border-b">

                                    <td className="p-4">

                                        {item.type}

                                    </td>

                                    <td className="p-4">

                                        {item.course}

                                    </td>

                                    <td className="p-4">

                                        {item.room}

                                    </td>

                                    <td className="p-4">

                                        {item.date}

                                    </td>

                                    <td className="p-4">

                                        {item.time}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>

    );

}
