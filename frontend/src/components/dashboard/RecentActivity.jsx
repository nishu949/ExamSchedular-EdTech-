export default function RecentActivity({ timetable }) {

    const latest = [...timetable]
        .reverse()
        .slice(0, 5);

    return (

        <div className="bg-white rounded-xl border border-slate-200 p-6">

            <h2 className="text-lg font-semibold mb-5">

                Recent Activity

            </h2>

            {

                latest.map((exam) => (

                    <div

                        key={exam.id}

                        className="py-3 border-b last:border-none"

                    >

                        <p className="font-medium">

                            {exam.course_code}

                        </p>

                        <p className="text-sm text-slate-500">

                            Timetable generated

                        </p>

                    </div>

                ))

            }

        </div>

    );

}