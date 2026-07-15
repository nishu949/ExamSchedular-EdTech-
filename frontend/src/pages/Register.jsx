import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

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

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-100">

            <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg">

                <h1 className="text-5xl font-bold text-center text-blue-600">

                    Exam Scheduler

                </h1>

                <p className="text-center text-slate-500 mt-3 mb-8">

                    University Examination Management System

                </p>

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
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                    >

                        Register

                    </button>

                </form>

                <p className="text-center mt-6 text-slate-600">

                    Already have an account?

                    <span
                        onClick={() => navigate("/login")}
                        className="text-blue-600 font-semibold cursor-pointer ml-2"
                    >

                        Login Here

                    </span>

                </p>

            </div>

        </div>

    );

}