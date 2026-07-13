import { useState } from "react";
import axios from "axios";

export default function Reports() {

    const [reports, setReports] = useState([]);
    const [date, setDate] = useState("");

    const loadRoomReport = async () => {

        try {

            const res = await axios.get(
                "http://127.0.0.1:8000/api/report/room/"
            );

            setReports(res.data);

        } catch (err) {

            console.error(err);

        }

    };

    const loadDateReport = async () => {

        if (!date) {

            alert("Please select a date");

            return;

        }

        try {

            const res = await axios.get(

                `http://127.0.0.1:8000/api/report/date/?date=${date}`

            );

            setReports(res.data);

        } catch (err) {

            console.error(err);

        }

    };

    const downloadPDF = () => {

        window.open(

            "http://127.0.0.1:8000/api/report/",

            "_blank"

        );

    };

    return (

        <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">

                Reports

            </h1>

            <div className="flex flex-wrap gap-4 mb-6">

                <button

                    onClick={downloadPDF}

                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"

                >

                    Download PDF

                </button>

                <button

                    onClick={loadRoomReport}

                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"

                >

                    Room Report

                </button>

                <input

                    type="date"

                    value={date}

                    onChange={(e)=>setDate(e.target.value)}

                    className="border rounded-lg px-4 py-2"

                />

                <button

                    onClick={loadDateReport}

                    className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg"

                >

                    Date Report

                </button>

            </div>

            {reports.length === 0 ? (

                <div className="text-center text-gray-500 py-10">

                    No report loaded.

                </div>

            ) : (

                <div className="overflow-x-auto bg-white rounded-xl shadow">

                    <table className="w-full">

                        <thead className="bg-indigo-600 text-white">

                            <tr>

                                <th className="p-4 text-left">Course</th>

                                <th className="p-4 text-left">Faculty</th>

                                <th className="p-4 text-left">Room</th>

                                <th className="p-4 text-left">Date</th>

                                <th className="p-4 text-left">Time</th>

                            </tr>

                        </thead>

                        <tbody>

                            {reports.map((item)=>(

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