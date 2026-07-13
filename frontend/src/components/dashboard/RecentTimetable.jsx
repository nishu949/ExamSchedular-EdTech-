export default function RecentTimetable({ timetable }) {

    return (

        <div className="bg-gradient-to-b from-white to-blue-50/30 rounded-2xl border border-blue-100 border-l-[3px] border-r-[3px] border-l-blue-500 border-r-blue-500 shadow-sm overflow-hidden">

            {/* Header */}

            <div className="flex items-center justify-between px-6 py-5 bg-blue-50/60 border-b border-blue-100">

                <div>

                    <h2 className="text-xl font-semibold text-slate-800">
                        Recent Timetable
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Latest generated examination schedule
                    </p>

                </div>

                <div className="bg-white border border-blue-100 rounded-xl px-4 py-2 shadow-sm">

                    <p className="text-xs text-slate-500">
                        Total Exams
                    </p>

                    <p className="text-lg font-bold text-blue-600">
                        {timetable.length}
                    </p>

                </div>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-blue-50">

                        <tr>

                            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-600">
                                Course
                            </th>

                            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-600">
                                Room
                            </th>

                            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-600">
                                Exam Date
                            </th>

                            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-600">
                                Time
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {timetable.length > 0 ? (

                            timetable.map((exam, index) => (

                                <tr
                                    key={exam.id}
                                    className={`transition hover:bg-blue-50/50 ${
                                        index !== timetable.length - 1
                                            ? "border-b border-blue-50"
                                            : ""
                                    }`}
                                >

                                    <td className="px-6 py-5">

                                        <span className="inline-flex items-center rounded-lg bg-blue-100 text-blue-700 px-3 py-1 font-semibold text-sm">

                                            {exam.course_code}

                                        </span>

                                    </td>

                                    <td className="px-6 py-5">

                                        <span className="inline-flex items-center rounded-lg bg-sky-50 text-sky-700 px-3 py-1 text-sm border border-sky-100">

                                            {exam.room_id}

                                        </span>

                                    </td>

                                    <td className="px-6 py-5">

                                        <div>

                                            <p className="font-medium text-slate-700">

                                                {exam.exam_date}

                                            </p>

                                            <p className="text-xs text-slate-400">

                                                Examination Date

                                            </p>

                                        </div>

                                    </td>

                                    <td className="px-6 py-5">

                                        <span className="inline-flex rounded-lg bg-green-100 text-green-700 px-3 py-1 text-sm font-medium">

                                            {exam.exam_time}

                                        </span>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="4"
                                    className="py-20 text-center"
                                >

                                    <div className="flex flex-col items-center">

                                        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-3xl">

                                            📅

                                        </div>

                                        <h3 className="mt-5 text-lg font-semibold text-slate-700">

                                            No Timetable Available

                                        </h3>

                                        <p className="text-slate-500 mt-2">

                                            Generate the timetable to display the latest examination schedule.

                                        </p>

                                    </div>

                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}