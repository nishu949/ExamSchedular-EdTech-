// # Case 5:A React-based Admin Dashboard allows administrators to manage courses, rooms, faculty, students, 
// and generate the exam timetable
import { useEffect, useState } from "react";
import api from "../services/api";
import UpcomingExams from "../components/dashboard/UpcomingExams";
import ConflictStatus from "../components/dashboard/ConflictStatus";
import RecentActivity from "../components/dashboard/RecentActivity";
import SystemStatus from "../components/dashboard/SystemStatus";
import Hero from "../components/dashboard/Hero";
import StatCard from "../components/dashboard/StatCard";
import QuickAction from "../components/dashboard/QuickAction";
import RecentTimetable from "../components/dashboard/RecentTimetable";
import ScheduleChart from "../components/dashboard/ScheduleChart";

import {
  BookOpen,
  Building2,
  GraduationCap,
  Users,
} from "lucide-react";

export default function Dashboard() {

  const [stats, setStats] = useState({
    courses: 0,
    rooms: 0,
    timetable: 0,
    faculty: 0,
    students: 0,
  });

  const [timetable, setTimetable] = useState([]);

const loadDashboard = async () => {

    try {

        const dashboardRes = await api.get("/dashboard/");

        const timetableRes = await api.get("/timetable/");

        const conflictRes = await api.get("/conflicts/");

        setStats({

            courses: dashboardRes.data.courses,

            rooms: dashboardRes.data.rooms,

            faculty: dashboardRes.data.faculties,

            students: dashboardRes.data.students,

            timetable: dashboardRes.data.timetable,

            conflict:

                conflictRes.data.status

        });

        setTimetable(timetableRes.data);

    }

    catch(err){

        console.log(err);

    }

};

  useEffect(() => {
    loadDashboard();
  }, []);

const generateTimetable = async () => {

    console.log("Generate button clicked");

    try {

        const res = await api.post("/generate/");

        console.log(res.data);

        alert("Timetable Generated Successfully");

        loadDashboard();

    }

catch (err) {

    console.log(err);

    console.log(err.response);

    console.log(err.response.data);

    alert(err.response.data.error);

}

};

const downloadReport = () => {

   window.open("http://127.0.0.1:8000/api/report/", "_blank");

};

  return (

    <div className="space-y-8">

      <Hero onGenerate={generateTimetable} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

<StatCard
    title="Courses"
    value={stats.courses}
    icon={<BookOpen size={26} className="text-blue-600" />}
    color="bg-blue-100"
/>

<StatCard
    title="Rooms"
    value={stats.rooms}
    icon={<Building2 size={26} className="text-green-600" />}
    color="bg-green-100"
/>

<StatCard
    title="Faculty"
    value={stats.faculty}
    icon={<GraduationCap size={26} className="text-orange-600" />}
    color="bg-orange-100"
/>

<StatCard
    title="Students"
    value={stats.students}
    icon={<Users size={26} className="text-purple-600" />}
    color="bg-purple-100"
/>

      </div>

      <QuickAction
        onGenerate={generateTimetable}
        onDownload={downloadReport}
      />

    <div className="grid xl:grid-cols-3 gap-6">

    <div className="xl:col-span-2">

        <RecentTimetable timetable={timetable} />

    </div>

    <UpcomingExams timetable={timetable} />

</div>

<div className="grid xl:grid-cols-3 gap-6">

    <ConflictStatus status={stats.conflict} />

    <SystemStatus />

    <RecentActivity timetable={timetable} />

</div>

    </div>

  );

}