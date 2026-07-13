import { ShieldCheck, ShieldAlert } from "lucide-react";

export default function ConflictStatus({ status }) {

    const ok = status === "No conflicts found";

    return (

        <div className="bg-gradient-to-b from-white to-green-50/30 rounded-2xl border border-green-100 border-l-[3px] border-r-[3px] border-l-green-500 border-r-green-500 shadow-sm overflow-hidden">

            {/* Header */}

            <div className="px-6 py-5 border-b border-blue-100 bg-blue-50/40">

                <h2 className="text-xl font-semibold text-slate-800">

                    Conflict Status

                </h2>

                <p className="text-sm text-slate-500 mt-1">

                    Scheduler verification result

                </p>

            </div>

            {/* Body */}

            <div className="p-6">

                <div
                    className={`flex items-center gap-5 rounded-xl border p-5 transition
                    ${
                        ok
                            ? "bg-green-50 border-green-100"
                            : "bg-red-50 border-red-100"
                    }`}
                >

                    <div
                        className={`h-14 w-14 rounded-xl flex items-center justify-center
                        ${
                            ok
                                ? "bg-green-100"
                                : "bg-red-100"
                        }`}
                    >

                        {ok ? (

                            <ShieldCheck
                                size={28}
                                className="text-green-600"
                            />

                        ) : (

                            <ShieldAlert
                                size={28}
                                className="text-red-600"
                            />

                        )}

                    </div>

                    <div className="flex-1">

                        <h3
                            className={`font-semibold text-lg ${
                                ok
                                    ? "text-green-700"
                                    : "text-red-700"
                            }`}
                        >

                            {status}

                        </h3>

                        <p className="text-sm text-slate-500 mt-1">

                            {ok
                                ? "The generated timetable has no scheduling conflicts."
                                : "Scheduling conflicts were detected and require attention."}

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}