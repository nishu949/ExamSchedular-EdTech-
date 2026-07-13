import { useState } from "react";
import api from "../services/api";

export default function StudentView() {

    const [studentId, setStudentId] = useState("");
    const [schedule, setSchedule] = useState([]);
    const [error, setError] = useState("");

    const loadSchedule = async () => {

    if (!studentId) return;

    setError("");
    setSchedule([]);

    try {

        const res = await api.get(
            `/student-schedule/?student_id=${studentId}`
        );

        setSchedule(res.data);

    } catch {

        setError("Student not found");

    }

};

    return (

        <div className="space-y-6">

            <div className="flex justify-between items-center">

               <div>
    <h1 className="text-3xl font-bold text-slate-800">
        Student Schedule
    </h1>

    <p className="text-slate-500 mt-1">
        View a student's personalized examination timetable.
    </p>
</div>

            </div>

           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

    <div className="flex items-center gap-4">

       <input
    value={studentId}
    onChange={(e) => setStudentId(e.target.value)}
    onKeyDown={(e) => {
        if (e.key === "Enter") {
            loadSchedule();
        }
    }}
    placeholder="Enter Student ID (e.g. S001)"
    className="flex-1 rounded-xl border border-slate-300 px-5 py-3 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
/>

        <button
            onClick={loadSchedule}
            className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl transition"
        >
            View Schedule
        </button>

    </div>

</div>

            {error && (

                <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">

                    {error}

                </div>

            )}
            {schedule.length > 0 && (

<div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex justify-between items-center">

    <div>

        <h3 className="font-semibold text-slate-800">

            Student ID

        </h3>

        <p className="text-blue-700 text-lg font-bold">

            {studentId}

        </p>

    </div>

    <div className="text-right">

        <h3 className="font-semibold text-slate-800">

            Total Exams

        </h3>

        <p className="text-2xl font-bold text-blue-600">

            {schedule.length}

        </p>

    </div>

</div>

)}

            {schedule.length > 0 && (

                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">

                            <tr className="border-b hover:bg-blue-50 transition-colors">

                                <th className="p-4 text-left">Course</th>
                                <th className="p-4 text-left">Faculty</th>
                                <th className="p-4 text-left">Room</th>
                                <th className="p-4 text-left">Date</th>
                                <th className="p-4 text-left">Time</th>

                            </tr>

                        </thead>

                        <tbody>

                            {schedule.map((exam)=>(

                                <tr
                                    key={exam.id}
                                    className="border-t hover:bg-slate-50"
                                >

                                    <td className="p-4">{exam.course_code}</td>

                                    <td className="p-4">{exam.faculty}</td>

                                    <td className="p-4">{exam.room_id}</td>

                                    <td className="p-4">{exam.exam_date}</td>

                                    <td className="p-4">{exam.exam_time}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>

    );

}