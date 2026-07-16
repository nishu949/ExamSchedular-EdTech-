import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import loginImage from "../assets/login.png";

export default function Register() {

    const navigate = useNavigate();

    const [role, setRole] = useState("admin");

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        student_id: "",
        student_name: "",
        department: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const register = async (e) => {

        e.preventDefault();

        try {

            if (role === "admin") {

                await api.post("/admin/register/", {
                    username: form.username,
                    email: form.email,
                    password: form.password
                });

            } else {

                await api.post("/student/register/", {
                    student_id: form.student_id,
                    student_name: form.student_name,
                    department: form.department,
                    password: form.password
                });

            }

            alert("Registration Successful");

            navigate("/login");

        } catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Registration Failed"
            );

        }

    };

   return (

<div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center p-6">

    <div className="w-full max-w-6xl">

        {/* Demo Banner */}

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

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
            {/* Left Side */}

<div className="hidden md:flex bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 items-center justify-center p-10">

    <div className="text-center">

        <img
            src={loginImage}
            alt="Exam Scheduler"
            className="w-[420px] mx-auto"
        />

        <h2 className="text-4xl font-bold text-white mt-8">
            University Exam Scheduler
        </h2>

        <p className="text-blue-100 mt-5 text-lg leading-8">

            Register as an Administrator or Student to
            manage examinations, access schedules,
            and experience a smarter university exam system.

        </p>

    </div>

</div>

{/* Right Side */}

<div className="p-12 flex flex-col justify-center">

    <div className="text-center mb-8">

        <h1 className="text-4xl font-bold text-blue-700">
            Create Account
        </h1>

        <p className="text-slate-500 mt-3">
            Register to access the University Exam Scheduler
        </p>

    </div>

    <h2 className="font-semibold mb-3">
        Register As
    </h2>

    <div className="flex gap-8 mb-6">

        <label>

            <input
                type="radio"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
            />

            <span className="ml-2">Admin</span>

        </label>

        <label>

            <input
                type="radio"
                checked={role === "student"}
                onChange={() => setRole("student")}
            />

            <span className="ml-2">Student</span>

        </label>

    </div>

    <form
        onSubmit={register}
        className="space-y-5"
    >

        {role === "admin" ? (

            <>

                <input
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-5 py-3"
                    required
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-5 py-3"
                    required
                />

            </>

        ) : (

            <>

                <input
                    name="student_id"
                    placeholder="Student ID"
                    value={form.student_id}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-5 py-3"
                    required
                />

                <input
                    name="student_name"
                    placeholder="Student Name"
                    value={form.student_name}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-5 py-3"
                    required
                />

                <input
                    name="department"
                    placeholder="Department"
                    value={form.department}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-5 py-3"
                    required
                />

            </>

        )}

        <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-xl px-5 py-3"
            required
        />

        <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg transition"
        >
            Register
        </button>

    </form>

    <p className="text-center mt-6 text-slate-600">

        Already have an account?

        <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold cursor-pointer ml-2 hover:underline"
        >
            Login Here
        </span>

    </p>

</div>

</div>

</div>

</div>

);
}