export default function ScheduleChart({

    stats

}) {

    return (

        <div className="bg-white rounded-2xl shadow-xl p-6">

            <h2 className="text-2xl font-bold mb-6">

                Schedule Summary

            </h2>

            <div className="space-y-4">

                <div>

                    Courses

                    <div className="w-full h-3 bg-gray-200 rounded-full mt-2">

                        <div

                            className="h-3 rounded-full bg-blue-500"

                            style={{
                                width: `${stats.courses * 20}%`
                            }}

                        ></div>

                    </div>

                </div>

                <div>

                    Rooms

                    <div className="w-full h-3 bg-gray-200 rounded-full mt-2">

                        <div

                            className="h-3 rounded-full bg-green-500"

                            style={{
                                width: `${stats.rooms * 20}%`
                            }}

                        ></div>

                    </div>

                </div>

                <div>

                    Exams

                    <div className="w-full h-3 bg-gray-200 rounded-full mt-2">

                        <div

                            className="h-3 rounded-full bg-purple-500"

                            style={{
                                width: `${stats.timetable * 20}%`
                            }}

                        ></div>

                    </div>

                </div>

            </div>

        </div>

    );

}