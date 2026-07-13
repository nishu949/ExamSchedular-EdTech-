import { useEffect, useState } from "react";
import api from "../../services/api";
import {
    Server,
    Database,
    CalendarClock,
    FileText
} from "lucide-react";

export default function SystemStatus() {

    const [backendOnline, setBackendOnline] = useState(false);

    useEffect(() => {

        checkStatus();

        const interval = setInterval(checkStatus, 5000);

        return () => clearInterval(interval);

    }, []);

    const checkStatus = async () => {

        try {

            await api.get("/dashboard/");

            setBackendOnline(true);

        }

        catch {

            setBackendOnline(false);

        }

    };

    const services = [

        {
            name: "Backend API",
            icon: <Server size={18} />,
            online: backendOnline
        },

        {
            name: "MongoDB",
            icon: <Database size={18} />,
            online: backendOnline
        },

        {
            name: "Scheduler",
            icon: <CalendarClock size={18} />,
            online: backendOnline
        },

        {
            name: "PDF Reports",
            icon: <FileText size={18} />,
            online: backendOnline
        }

    ];

    return (

        <div className="bg-gradient-to-b from-white to-blue-50/30 rounded-2xl border border-blue-100 shadow-sm overflow-hidden">

            {/* Header */}

            <div className="px-6 py-5 border-b border-blue-100 bg-blue-50/40">

                <h2 className="text-xl font-semibold text-slate-800">

                    System Status

                </h2>

                <p className="text-sm text-slate-500 mt-1">

                    Current health of application services

                </p>

            </div>

            {/* Services */}

            <div className="p-5 space-y-3">

                {services.map((service) => (

                    <div
                        key={service.name}
                        className="flex justify-between items-center border border-blue-100 rounded-xl px-4 py-3 bg-white hover:bg-blue-50 transition"
                    >

                        <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">

                                {service.icon}

                            </div>

                            <span className="font-medium text-slate-700">

                                {service.name}

                            </span>

                        </div>

                        <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                service.online
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >

                            {service.online ? "Online" : "Offline"}

                        </span>

                    </div>

                ))}

            </div>

        </div>

    );

}