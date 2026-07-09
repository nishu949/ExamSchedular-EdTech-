export default function UpcomingExams({ timetable }) {

    const today = new Date().toISOString().split("T")[0];

    const upcoming = timetable
        .filter((exam) => exam.exam_date >= today)
        .slice(0, 5);

    return (

        <div className="bg-white rounded-xl border border-slate-200 p-6">

            <h2 className="text-lg font-semibold mb-5">

                Upcoming Exams

            </h2>

            {

                upcoming.length === 0 ?

                (

                    <p className="text-slate-500">

                        No upcoming exams

                    </p>

                )

                :

                upcoming.map((exam) => (

                    <div
                        key={exam.id}
                        className="flex justify-between items-center py-3 border-b last:border-none"
                    >

                        <div>

                            <h4 className="font-medium">

                                {exam.course_code}

                            </h4>

                            <p className="text-sm text-slate-500">

                                {exam.room_id}

                            </p>

                        </div>

                        <div className="text-right">

                            <p className="text-sm">

                                {exam.exam_date}

                            </p>

                            <p className="text-xs text-slate-500">

                                {exam.exam_time}

                            </p>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}