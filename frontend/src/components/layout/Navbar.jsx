import {
    Bell,
    Search,
    CalendarDays,
    UserCircle,
    BookOpen,
    GraduationCap,
    Users,
    DoorOpen
} from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
const getIcon = (type) => {

    switch (type) {

        case "Course":
            return (
                <div className="bg-blue-100 p-2 rounded-lg">
                    <BookOpen size={18} className="text-blue-600"/>
                </div>
            );

        case "Faculty":
            return (
                <div className="bg-green-100 p-2 rounded-lg">
                    <GraduationCap size={18} className="text-green-600"/>
                </div>
            );

        case "Student":
            return (
                <div className="bg-purple-100 p-2 rounded-lg">
                    <Users size={18} className="text-purple-600"/>
                </div>
            );

        case "Room":
            return (
                <div className="bg-orange-100 p-2 rounded-lg">
                    <DoorOpen size={18} className="text-orange-600"/>
                </div>
            );

        case "Timetable":
            return (
                <div className="bg-red-100 p-2 rounded-lg">
                    <CalendarDays size={18} className="text-red-600"/>
                </div>
            );

        default:
            return (
                <div className="bg-slate-100 p-2 rounded-lg">
                    <Search size={18}/>
                </div>
            );

    }

};

const handleSearch = async (value) => {

    setQuery(value);

    if (value.trim().length < 2) {

        setResults([]);

        return;

    }

    try {

        const res = await axios.get(
            `http://127.0.0.1:8000/api/search/?q=${value}`
        );

        setResults(res.data);

    }

    catch {

        setResults([]);

    }

};

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

           {/* Center */}

<div className="hidden lg:block relative w-[400px]">

    <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl px-4 py-3">

        <Search
            size={18}
            className="text-slate-500"
        />

        <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search courses, students, faculty..."
            className="ml-3 w-full bg-transparent outline-none text-sm"
        />

    </div>

    {results.length > 0 && (

        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50">

            {results.map((item, index) => (

                <div
                    key={index}
                    onClick={() => {
                        navigate(item.page);
                        setQuery("");
                        setResults([]);
                    }}
                    className="flex items-center gap-4 px-5 py-4 hover:bg-blue-50 cursor-pointer transition border-b last:border-b-0"
                >

                    {getIcon(item.type)}

                    <div className="flex-1">

                        <p className="font-semibold text-slate-800">

                            {item.title}

                        </p>

                        <p className="text-sm text-slate-500">

                            {item.subtitle}

                        </p>

                    </div>

                    <span className="text-xs bg-slate-100 px-3 py-1 rounded-full">

                        {item.type}

                    </span>

                </div>

            ))}

        </div>

    )}

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