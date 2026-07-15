
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { Navigate } from "react-router-dom";
export default function Login() {

    const [role, setRole] = useState("admin");
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));


    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");

        try {

            let res;

            if (role === "admin") {

                res = await api.post("/admin/login/", {
                    username,
                    password
                });

                localStorage.setItem(
                    "user",
                    JSON.stringify(res.data)
                );

                navigate("/dashboard");

            } else {

                res = await api.post("/student/login/", {
                    student_id: username,
                    password
                });

                localStorage.setItem(
                    "user",
                    JSON.stringify(res.data)
                );

                navigate("/student-dashboard");

            }

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Invalid Credentials"
            );

        }

    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center">

            <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-10">

                <div className="text-center">

                    <h1 className="text-4xl font-bold text-blue-700">
                        Exam Scheduler
                    </h1>

                    <p className="text-slate-500 mt-3">
                        University Examination Management System
                    </p>

                </div>

                <div className="mt-8">

                    <label className="block font-semibold mb-3">
                        Login As
                    </label>

                    <div className="flex gap-6">

                        <label className="flex items-center gap-2 cursor-pointer">

                            <input
                                type="radio"
                                value="admin"
                                checked={role === "admin"}
                                onChange={(e) => setRole(e.target.value)}
                            />

                            Admin

                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">

                            <input
                                type="radio"
                                value="student"
                                checked={role === "student"}
                                onChange={(e) => setRole(e.target.value)}
                            />

                            Student

                        </label>

                    </div>

                </div>

                <form
                    onSubmit={handleLogin}
                    className="space-y-5 mt-8"
                >

                    <div>

                        <label className="block mb-2 font-medium">

                            {role === "admin" ? "Username" : "Student ID"}

                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder={
                                role === "admin"
                                    ? "Enter Username"
                                    : "Enter Student ID"
                            }
                            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">

                            Password

                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>
                    {error && (

                        <div className="bg-red-100 text-red-600 rounded-lg p-3 text-sm">

                            {error}

                        </div>

                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                    >

                        Login

                    </button>

                </form>

                <div className="text-center mt-8">

                    <p className="text-slate-500">

                        Don't have an account?

                    </p>

                    <Link
                        to="/register"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Register Here
                    </Link>

                </div>

            </div>

        </div>

    );

}