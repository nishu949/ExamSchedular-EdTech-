import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Rooms from "./pages/Rooms";
import Faculty from "./pages/Faculty";
import Students from "./pages/Students";
import Timetable from "./pages/Timetable";
import Reports from "./pages/Reports";
import ConflictReport from "./pages/ConflictReport";
import StudentView from "./pages/StudentView";


export default function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route element={<DashboardLayout />}>

                    <Route
                        path="/"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/courses"
                        element={<Courses />}
                    />

                    <Route
                        path="/rooms"
                        element={<Rooms />}
                    />

                    <Route
                        path="/faculty"
                        element={<Faculty />}
                    />

                    <Route
                        path="/students"
                        element={<Students />}
                    />

                    <Route
                        path="/timetable"
                        element={<Timetable />}
                    />

                    <Route
                        path="/reports"
                        element={<Reports />}
                    />

                    <Route
                        path="/conflicts"
                        element={<ConflictReport />}
                    />

                    <Route
                        path="/student-view"
                        element={<StudentView />}
                    />

               

                </Route>

            </Routes>

        </BrowserRouter>

    );

}