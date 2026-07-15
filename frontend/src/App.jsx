import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import StudentLayout from "./layouts/StudentLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Rooms from "./pages/Rooms";
import Faculty from "./pages/Faculty";
import Students from "./pages/Students";
import Timetable from "./pages/Timetable";
import Reports from "./pages/Reports";
import ConflictReport from "./pages/ConflictReport";
import StudentView from "./pages/StudentView";
import StudentDashboard from "./pages/StudentDashboard";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
export default function App() {

    return (

        <BrowserRouter>

            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

          

                <Route
    element={
        <ProtectedRoute allowedRole="admin">
            <DashboardLayout />
        </ProtectedRoute>
    }
>

                    <Route
                        path="/dashboard"
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

               <Route
    element={
        <ProtectedRoute allowedRole="student">
            <StudentLayout />
        </ProtectedRoute>
    }
>

    <Route
        path="/student-dashboard"
        element={<StudentDashboard />}
    />
</Route>
            </Routes>

        </BrowserRouter>

    );

}