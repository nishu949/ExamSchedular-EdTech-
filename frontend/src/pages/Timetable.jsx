import { useEffect, useState } from "react";
import axios from "axios";

export default function Timetable() {

    const [timetable, setTimetable] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadTimetable = async () => {

        try {

            const res = await axios.get(
                "http://127.0.0.1:8000/api/timetable/"
            );

            setTimetable(res.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadTimetable();

    }, []);

    const downloadPDF = () => {

        window.open(
            "http://127.0.0.1:8000/api/report/",
            "_blank"
        );

    };

    return (

        <div className="p-6">

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">

                    Exam Timetable

                </h1>

                <div className="flex gap-3">

                    <button

                        onClick={loadTimetable}

                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"

                    >

                        Refresh

                    </button>

                    <button

                        onClick={downloadPDF}

                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"

                    >

                        Download PDF

                    </button>

                </div>

            </div>

            {loading ? (

                <div className="text-center py-10">

                    Loading timetable...

                </div>

            ) : timetable.length === 0 ? (

                <div className="text-center py-10 text-gray-500">

                    No timetable generated yet.

                </div>

            ) : (

                <div className="overflow-x-auto bg-white rounded-xl shadow">

                    <table className="w-full">

                        <thead className="bg-blue-600 text-white">

                            <tr>

                                <th className="p-4 text-left">

                                    Course

                                </th>

                                <th className="p-4 text-left">

                                    Faculty

                                </th>

                                <th className="p-4 text-left">

                                    Room

                                </th>

                                <th className="p-4 text-left">

                                    Date

                                </th>

                                <th className="p-4 text-left">

                                    Time

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {timetable.map((item) => (

                                <tr
                                    key={item.id}
                                    className="border-b hover:bg-slate-50"
                                >

                                    <td className="p-4">

                                        {item.course_code}

                                    </td>

                                    <td className="p-4">

                                        {item.faculty}

                                    </td>

                                    <td className="p-4">

                                        {item.room_id}

                                    </td>

                                    <td className="p-4">

                                        {item.exam_date}

                                    </td>

                                    <td className="p-4">

                                        {item.exam_time}

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