export default function StatCard({

    title,
    value,
    icon,
    color

}) {

    return (

        <div className="bg-white rounded-xl border border-slate-200 p-6">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-sm text-slate-500">

                        {title}

                    </p>

                    <h2 className="text-3xl font-bold mt-2">

                        {value}

                    </h2>

                </div>

                <div
                    className={`h-14 w-14 rounded-xl flex items-center justify-center ${color}`}
                >

                    {icon}

                </div>

            </div>

        </div>

    );

}