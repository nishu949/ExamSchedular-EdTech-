import { History, CheckCircle2 } from "lucide-react";

export default function RecentActivity({ timetable }) {

    const latest = [...timetable]
        .reverse()
        .slice(0, 5);

    return (

        <div className="bg-gradient-to-b from-white to-green-50/30 rounded-2xl border border-green-100 border-l-[3px] border-r-[3px] border-l-green-500 border-r-green-500 shadow-sm overflow-hidden">

            {/* Header */}

            <div className="flex items-center justify-between px-6 py-5 border-b border-blue-100 bg-blue-50/40">

                <div>

                    <h2 className="text-xl font-semibold text-slate-800">

                        Recent Activity

                    </h2>

                    <p className="text-sm text-slate-500 mt-1">

                        Latest scheduling activities

                    </p>

                </div>

                <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">

                    <History
                        size={20}
                        className="text-blue-600"
                    />

                </div>

            </div>

            <div className="p-5">

                {

                    latest.length > 0 ?

                    latest.map((exam) => (

                        <div
                            key={exam.id}
                            className="flex items-center justify-between border border-blue-100 rounded-xl px-4 py-4 mb-3 last:mb-0 bg-white hover:bg-blue-50 hover:border-blue-200 transition-all duration-200"
                        >

                            <div className="flex items-center gap-3">

                                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">

                                    <CheckCircle2
                                        size={18}
                                        className="text-green-600"
                                    />

                                </div>

                                <div>

                                    <p className="font-semibold text-slate-800">

                                        {exam.course_code}

                                    </p>

                                    <p className="text-sm text-slate-500">

                                        Timetable generated successfully

                                    </p>

                                </div>

                            </div>

                            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">

                                Completed

                            </span>

                        </div>

                    ))

                    :

                    <div className="flex flex-col items-center justify-center py-14">

                        <History
                            size={42}
                            className="text-slate-300"
                        />

                        <p className="mt-4 font-medium text-slate-700">

                            No Recent Activity

                        </p>

                        <p className="text-sm text-slate-500 mt-1">

                            Generate a timetable to view recent activities.

                        </p>

                    </div>

                }

            </div>

        </div>

    );

}