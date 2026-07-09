import {
    Bell,
    Search,
    CalendarDays,
    UserCircle
} from "lucide-react";

export default function Navbar() {

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (

        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">

            {/* Left */}

            <div>

                <h2 className="text-2xl font-semibold text-slate-800">

                    University Exam Scheduler

                </h2>

                <p className="text-sm text-slate-500">

                    {today}

                </p>

            </div>

            {/* Center */}

            <div className="hidden lg:flex items-center bg-slate-100 rounded-lg px-4 py-2 w-[380px]">

                <Search
                    size={18}
                    className="text-slate-500"
                />

                <input
                    type="text"
                    placeholder="Search..."
                    className="ml-3 w-full bg-transparent outline-none text-sm"
                />

            </div>

            {/* Right */}

            <div className="flex items-center gap-5">

                <button className="relative">

                    <Bell
                        size={22}
                        className="text-slate-600"
                    />

                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>

                </button>

                <CalendarDays
                    size={22}
                    className="text-slate-600"
                />

                <div className="flex items-center gap-3">

                    <UserCircle
                        size={38}
                        className="text-blue-600"
                    />

                    <div>

                        <p className="font-medium text-sm">

                            Administrator

                        </p>

                        <p className="text-xs text-slate-500">

                            University Admin

                        </p>

                    </div>

                </div>

            </div>

        </header>

    );

}