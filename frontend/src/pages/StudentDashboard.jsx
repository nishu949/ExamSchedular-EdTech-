import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
export default function StudentDashboard() {
    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("user");

        navigate("/login");

    };

    const [schedule, setSchedule] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        if (!user) return;

        loadSchedule();

    }, []);

    const loadSchedule = async () => {

        try {

            const res = await api.get(
                `/student-schedule/?student_id=${user.student_id}`
            );

            setSchedule(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="p-8 bg-slate-100 min-h-screen">
            <div className="flex justify-end mb-4">

                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                    Logout
                </button>

            </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">

    <h1 className="text-4xl font-bold">
        Welcome, {user.student_name}
    </h1>

    <p className="mt-3 text-blue-100">
        View your upcoming university examinations and timetable.
    </p>

</div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                <div className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-slate-500">Total Exams</h3>

                    <p className="text-3xl font-bold mt-2">
                        {schedule.length}
                    </p>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-slate-500">Department</h3>

                    <p className="text-xl font-semibold mt-2">
                        {user.department}
                    </p>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-slate-500">Student ID</h3>

                    <p className="text-xl font-semibold mt-2">
                        {user.student_id}
                    </p>

                </div>

            </div>
            <div className="flex justify-between items-center mb-4">

                <h2 className="text-xl font-semibold">

                    Recent Exams

                </h2>

                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    View Full Schedule
                </button>

            </div>

            <div className="mt-8 bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-semibold mb-4">

                    My Exam Schedule

                </h2>

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="text-left py-3">Course</th>
                            <th className="text-left py-3">Date</th>
                            <th className="text-left py-3">Time</th>
                            <th className="text-left py-3">Room</th>

                        </tr>

                    </thead>

                    <tbody>

                        {schedule.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="4"
                                    className="py-6 text-center text-slate-500"
                                >

                                    No exams scheduled.

                                </td>

                            </tr>

                        ) : (

                            schedule.map((exam) => (

                                <tr
                                    key={exam.id}
                                    className="border-b"
                                >

                                    <td className="py-3">

                                        {exam.course_code}

                                    </td>

                                    <td>

                                        {exam.exam_date}

                                    </td>

                                    <td>

                                        {exam.exam_time}

                                    </td>

                                    <td>

                                        {exam.room_id}

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}