
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { Navigate } from "react-router-dom";
import loginImage from "../assets/login.png";
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
    <div>

  {/* Demo Login Banner */}

<div className="w-full max-w-6xl mb-5">

    <div className="flex flex-wrap items-center justify-center gap-8 rounded-xl border border-blue-200 bg-blue-50 px-6 py-3 shadow-sm">

        <h2 className="text-blue-700 font-bold text-lg">
            Demo Login Credentials
        </h2>

        <div className="h-6 w-px bg-blue-200 hidden md:block"></div>

        <div className="text-sm">

            <span className="font-semibold text-slate-700">
                👨‍💼 Admin
            </span>

            <span className="mx-2 text-slate-400">|</span>

            <span className="text-slate-600">
                Username:
            </span>

            <span className="font-semibold text-blue-700 ml-1">
                admin2005
            </span>

            <span className="mx-2 text-slate-400">•</span>

            <span className="text-slate-600">
                Password:
            </span>

            <span className="font-semibold text-blue-700 ml-1">
                1234
            </span>

        </div>

        <div className="h-6 w-px bg-blue-200 hidden md:block"></div>

        <div className="text-sm">

            <span className="font-semibold text-slate-700">
                🎓 Student
            </span>

            <span className="mx-2 text-slate-400">|</span>

            <span className="text-slate-600">
                ID:
            </span>

            <span className="font-semibold text-blue-700 ml-1">
                S010
            </span>

            <span className="mx-2 text-slate-400">•</span>

            <span className="text-slate-600">
                Password:
            </span>

            <span className="font-semibold text-blue-700 ml-1">
                123456
            </span>

        </div>

    </div>

</div>

<div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center p-6">
  

    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-6xl grid md:grid-cols-2">

        {/* Left Side */}

        <div className="hidden md:flex bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 items-center justify-center p-10">
            <div className="text-center">

                <img
                    src={loginImage}
                    alt="University Exam"
                    className="w-[420px] mx-auto"
                />

                <h2 className="text-4xl font-bold text-white mt-8">

                    University Exam Scheduler

                </h2>

                <p className="text-blue-100 mt-5 text-lg leading-8">

                    Automate exam scheduling, manage students,
                    generate conflict-free timetables,
                    and download reports effortlessly.

                </p>

            </div>

        </div>

        {/* Right Side */}

        <div className="p-12 flex flex-col justify-center">

            <div className="text-center mb-8">

                <h1 className="text-4xl font-bold text-blue-700">

                    Welcome Back

                </h1>

                <p className="text-slate-500 mt-3">

                    Login to continue

                </p>

            </div>

            <div className="mb-6">

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
                className="space-y-5"
            >

                <div>

                    <label className="block mb-2 font-medium">

                        {role === "admin"
                            ? "Username"
                            : "Student ID"}

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
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />

                </div>

                {error && (

                    <div className="bg-red-100 text-red-600 rounded-lg p-3 text-sm">

                        {error}

                    </div>

                )}

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg transition duration-300"
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

</div>
  </div>

);

}