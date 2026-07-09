import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function DashboardLayout() {

    return (

        <div className="min-h-screen bg-slate-100">

            <div className="flex">

                <Sidebar />

                <div className="flex flex-col flex-1 min-h-screen">

                    <Navbar />

                    <main className="flex-1 p-8">

                        <Outlet />

                    </main>

                    <Footer />

                </div>

            </div>

        </div>

    );

}