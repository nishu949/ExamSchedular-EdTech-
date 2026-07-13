import {
    Play,
    Download,
    CalendarDays,
    ShieldAlert
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuickAction({

    onGenerate,
    onDownload
    

}) {
    const navigate = useNavigate();

    return (
        

        <div className="bg-white rounded-xl border border-slate-200 p-6">

            <h2 className="text-xl font-semibold mb-5">

                Quick Actions

            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                <button
    onClick={onGenerate}
   className="bg-gradient-to-b from-white to-blue-50/30 rounded-2xl border border-blue-100 border-l-[3px] border-r-[3px] border-l-blue-500 border-r-blue-500 shadow-sm overflow-hidden"
>
    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mx-auto">
        <Play size={22} className="text-blue-600" />
    </div>

    <p className="mt-4 font-medium text-slate-800">
        Generate
    </p>

    <p className="text-xs text-slate-500 mt-1">
        Create timetable
    </p>
</button>

               <button
    onClick={onDownload}
    className="bg-gradient-to-b from-white to-green-50/30 rounded-2xl border border-green-100 border-l-[3px] border-r-[3px] border-l-green-500 border-r-green-500 shadow-sm overflow-hidden"
>
    <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center mx-auto">
        <Download size={22} className="text-green-600" />
    </div>

    <p className="mt-4 font-medium text-slate-800">
        Download
    </p>

    <p className="text-xs text-slate-500 mt-1">
        Export report
    </p>
</button>

               <button
    onClick={() => navigate("/timetable")}
    className="bg-gradient-to-b from-white to-blue-50/30 rounded-2xl border border-purple-100 border-l-[3px] border-r-[3px] border-l-purple-500 border-r-purple-500 shadow-sm overflow-hidden"
>
    <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center mx-auto">
        <CalendarDays size={22} className="text-indigo-600" />
    </div>

    <p className="mt-4 font-medium text-slate-800">
        Timetable
    </p>

    <p className="text-xs text-slate-500 mt-1">
        View schedule
    </p>
</button>
<button
    onClick={() => navigate("/conflicts")}
    className="bg-gradient-to-b from-white to-red-50/30 rounded-2xl border border-red-100 border-l-[3px] border-r-[3px] border-l-red-500 border-r-red-500 shadow-sm overflow-hidden"
>
    <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center mx-auto">
        <ShieldAlert size={22} className="text-red-600" />
    </div>

    <p className="mt-4 font-medium text-slate-800">
        Conflicts
    </p>

    <p className="text-xs text-slate-500 mt-1">
        Check conflicts
    </p>
</button>
            </div>

        </div>

    );

}