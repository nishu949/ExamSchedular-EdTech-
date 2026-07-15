import { Navigate } from "react-router-dom";

export default function ProtectedRoute({

    children,

    allowedRole

}) {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

        return <Navigate to="/login" replace />;

    }

    if (user.role !== allowedRole) {

        if (user.role === "admin") {

            return <Navigate to="/dashboard" replace />;

        }

        return <Navigate to="/student-dashboard" replace />;

    }

    return children;

}