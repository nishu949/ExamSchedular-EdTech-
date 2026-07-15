import { Outlet } from "react-router-dom";

export default function StudentLayout() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <div className="min-h-screen bg-slate-100">

            <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">

                <div>

                    <h1 className="text-2xl font-bold text-blue-600">
                        Exam Scheduler
                    </h1>

                    <p className="text-slate-500">
                        Student Portal
                    </p>

                </div>

                <div className="text-right">

                    <h3 className="font-semibold">

                        {user?.student_name}

                    </h3>

                    <p className="text-slate-500 text-sm">

                        {user?.student_id}

                    </p>

                </div>

            </header>

            <main className="p-8">

                <Outlet />

            </main>

        </div>

    );

}