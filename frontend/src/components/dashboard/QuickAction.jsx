import {
    Play,
    Download,
    CalendarDays,
    ShieldAlert
} from "lucide-react";

export default function QuickAction({

    onGenerate,
    onDownload

}) {

    return (

        <div className="bg-white rounded-xl border border-slate-200 p-6">

            <h2 className="text-xl font-semibold mb-5">

                Quick Actions

            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                <button
                    onClick={onGenerate}
                    className="rounded-lg border p-4 hover:bg-blue-50 transition"
                >

                    <Play className="mx-auto text-blue-600" />

                    <p className="mt-3 text-sm">

                        Generate

                    </p>

                </button>

                <button
                    onClick={onDownload}
                    className="rounded-lg border p-4 hover:bg-green-50 transition"
                >

                    <Download className="mx-auto text-green-600" />

                    <p className="mt-3 text-sm">

                        Download

                    </p>

                </button>

                <button
                    className="rounded-lg border p-4 hover:bg-yellow-50 transition"
                >

                    <CalendarDays className="mx-auto text-yellow-600" />

                    <p className="mt-3 text-sm">

                        Timetable

                    </p>

                </button>

                <button
                    className="rounded-lg border p-4 hover:bg-red-50 transition"
                >

                    <ShieldAlert className="mx-auto text-red-600" />

                    <p className="mt-3 text-sm">

                        Conflicts

                    </p>

                </button>
        
            </div>

        </div>

    );

}