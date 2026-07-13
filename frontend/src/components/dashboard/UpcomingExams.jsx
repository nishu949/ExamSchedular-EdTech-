export default function UpcomingExams({ timetable }) {

    const today = new Date().toISOString().split("T")[0];

    const upcoming = timetable
        .filter((exam) => exam.exam_date >= today)
        .slice(0, 5);

    return (

        <div className="bg-gradient-to-b from-white to-blue-50/30 rounded-2xl border border-blue-100 border-l-[3px] border-r-[3px] border-l-blue-500 border-r-blue-500 shadow-sm overflow-hidden">

            {/* Header */}

            <div className="flex items-center justify-between px-6 py-5 bg-blue-50/40 border-b border-blue-100">

                <div>

                    <h2 className="text-xl font-semibold text-slate-800">
                        Upcoming Exams
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Next scheduled examinations
                    </p>

                </div>

                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">

                    {upcoming.length}

                </span>

            </div>

            <div className="p-4 space-y-3">

                {upcoming.length === 0 ? (

                    <div className="py-12 text-center">

                        <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-2xl">

                            📅

                        </div>

                        <p className="mt-4 font-medium text-slate-700">

                            No Upcoming Exams

                        </p>

                        <p className="text-sm text-slate-500">

                            Generate a timetable to see upcoming exams.

                        </p>

                    </div>

                ) : (

                    upcoming.map((exam) => (

                        <div
                            key={exam.id}
                            className="flex justify-between items-center rounded-xl border border-blue-100 px-4 py-4 hover:bg-blue-50 transition">

                            <div>

                                <h4 className="font-semibold text-slate-800">

                                    {exam.course_code}

                                </h4>

                                <p className="text-sm text-slate-500 mt-1">

                                    Room {exam.room_id}

                                </p>

                            </div>

                            <div className="text-right">

                                <p className="text-sm font-medium text-slate-700">

                                    {exam.exam_date}

                                </p>

                                <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md">

                                    {exam.exam_time}

                                </span>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

}