import { ShieldCheck, ShieldAlert } from "lucide-react";

export default function ConflictStatus({ status }) {

    const ok = status === "No conflicts found";

    return (

        <div className="bg-white rounded-xl border border-slate-200 p-6">

            <h2 className="text-lg font-semibold mb-5">

                Conflict Status

            </h2>

            <div className="flex items-center gap-4">

                {

                    ok ?

                    <ShieldCheck
                        size={45}
                        className="text-green-600"
                    />

                    :

                    <ShieldAlert
                        size={45}
                        className="text-red-600"
                    />

                }

                <div>

                    <h3 className="font-semibold">

                        {status}

                    </h3>

                    <p className="text-sm text-slate-500">

                        Scheduler verification result

                    </p>

                </div>

            </div>

        </div>

    );

}