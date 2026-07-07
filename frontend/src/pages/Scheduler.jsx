import { useEffect, useState } from "react";
import axios from "axios";

function Scheduler() {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [timetable, setTimetable] = useState([]);

    const loadTimetable = async () => {

        try {

            const res = await axios.get(
                "http://127.0.0.1:8000/api/timetable/"
            );

            setTimetable(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        loadTimetable();

    }, []);

    const generateTimetable = async () => {

        setLoading(true);

        try {

            const res = await axios.post(
                "http://127.0.0.1:8000/api/generate/"
            );

            setMessage(res.data.message);

            loadTimetable();

        } catch (err) {

            setMessage(err.response.data.error);

        }

        setLoading(false);

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-body">

                    <h3 className="mb-4">
                        Exam Scheduler
                    </h3>

                    <button
                        className="btn btn-primary"
                        onClick={generateTimetable}
                        disabled={loading}
                    >

                        {loading ?
                            "Generating..." :
                            "Generate Timetable"}

                    </button>

                    <p className="mt-3 text-success">
                        {message}
                    </p>

                </div>

            </div>

            <div className="card mt-4 shadow">

                <div className="card-body">

                    <h4>Generated Timetable</h4>

                    <table className="table table-striped">

                        <thead>

                            <tr>

                                <th>Course</th>

                                <th>Room</th>

                                <th>Faculty</th>

                                <th>Date</th>

                                <th>Time</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                timetable.map((exam) => (

                                    <tr key={exam.id}>

                                        <td>{exam.course_code}</td>

                                        <td>{exam.room_id}</td>

                                        <td>{exam.faculty_id}</td>

                                        <td>{exam.exam_date}</td>

                                        <td>{exam.exam_time}</td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default Scheduler;