import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {

    const [stats, setStats] = useState({
        courses: 0,
        rooms: 0,
        timetable: 0
    });

    const loadDashboard = async () => {
        try {
            const res = await api.get("/dashboard/");
            setStats(res.data);
        } catch (err) {
            console.error(err);
            alert("Unable to load dashboard");
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    const generateTimetable = async () => {
        try {
            await api.post("/generate/");
            alert("Timetable Generated Successfully");
            loadDashboard();
        } catch (err) {
            console.error(err);
            alert("Generation Failed");
        }
    };

    const downloadReport = () => {
        window.open("http://127.0.0.1:8000/api/report/");
    };

    return (

        <div className="container">

            <h1>Exam Scheduler Dashboard</h1>

            <h3>Total Courses : {stats.courses}</h3>

            <h3>Total Rooms : {stats.rooms}</h3>

            <h3>Total Exams : {stats.timetable}</h3>

            <br/>

            <button onClick={generateTimetable}>
                Generate Timetable
            </button>

            <button
                onClick={downloadReport}
                style={{marginLeft:"10px"}}
            >
                Download PDF
            </button>

        </div>

    );
}