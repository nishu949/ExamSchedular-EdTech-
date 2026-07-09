export default function RecentTimetable({ timetable }) {

    return (

        <div className="bg-white border border-slate-200 rounded-xl p-6">

            <h2 className="text-xl font-semibold mb-5">
                Recent Timetable
            </h2>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="text-left py-3">
                            Course
                        </th>

                        <th className="text-left">
                            Room
                        </th>

                        <th className="text-left">
                            Date
                        </th>

                        <th className="text-left">
                            Time
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {timetable.length > 0 ? (

                        timetable.map((exam) => (

                            <tr
                                key={exam.id}
                                className="border-b hover:bg-slate-50"
                            >

                                <td className="py-3">
                                    {exam.course_code}
                                </td>

                                <td>
                                    {exam.room_id}
                                </td>

                                <td>
                                    {exam.exam_date}
                                </td>

                                <td>
                                    {exam.exam_time}
                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="4"
                                className="py-6 text-center text-slate-500"
                            >
                                No timetable generated yet.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}