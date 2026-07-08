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
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "Courses",
    icon: BookOpen,
    path: "/courses",
  },
  {
    name: "Rooms",
    icon: Building2,
    path: "/rooms",
  },
  {
    name: "Faculty",
    icon: GraduationCap,
    path: "/faculty",
  },
  {
    name: "Students",
    icon: Users,
    path: "/students",
  },
  {
    name: "Timetable",
    icon: CalendarDays,
    path: "/timetable",
  },
  {
    name: "Reports",
    icon: FileText,
    path: "/reports",
  },
  {
    name: "Conflicts",
    icon: ShieldAlert,
    path: "/conflicts",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-[#071B3B] to-[#12336B] text-white shadow-2xl">

      <div className="p-8">

        <h1 className="text-2xl font-bold leading-tight">
          University
          <br />
          Scheduler
        </h1>

        <p className="text-blue-200 text-sm mt-2">
          Exam Timetable System
        </p>

      </div>

      <nav className="px-4">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-xl mb-2 transition-all duration-300
                ${
                  isActive
                    ? "bg-blue-600 shadow-lg"
                    : "hover:bg-white/10"
                }`
              }
            >

              <Icon size={20} />

              <span className="font-medium">
                {item.name}
              </span>

            </NavLink>

          );
        })}

      </nav>

    </aside>
  );
}