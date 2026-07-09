import {
    LayoutDashboard,
    BookOpen,
    Building2,
    Users,
    GraduationCap,
    CalendarDays,
    FileText,
    ShieldAlert,
    Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Courses", icon: BookOpen, path: "/courses" },
    { name: "Rooms", icon: Building2, path: "/rooms" },
    { name: "Faculty", icon: GraduationCap, path: "/faculty" },
    { name: "Students", icon: Users, path: "/students" },
    { name: "Timetable", icon: CalendarDays, path: "/timetable" },
    { name: "Reports", icon: FileText, path: "/reports" },
    { name: "Conflicts", icon: ShieldAlert, path: "/conflicts" },
    { name: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {

    return (

        <aside className="w-64 bg-white border-r border-slate-200 min-h-screen">

            <div className="px-8 py-8 border-b border-slate-100">

                <div className="flex items-center gap-3">

                    <div className="h-11 w-11 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">

                        U

                    </div>

                    <div>

                        <h1 className="text-lg font-bold text-slate-800">

                            UniScheduler

                        </h1>

                        <p className="text-xs text-slate-500">

                            Exam Management

                        </p>

                    </div>

                </div>

            </div>

            <nav className="p-4">

                {menuItems.map((item) => {

                    const Icon = item.icon;

                    return (

                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-4 py-3 mb-2 text-sm font-medium transition-all
                                ${
                                    isActive
                                        ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                }`
                            }
                        >

                            <Icon size={19} />

                            {item.name}

                        </NavLink>

                    );

                })}

            </nav>

        </aside>

    );

}