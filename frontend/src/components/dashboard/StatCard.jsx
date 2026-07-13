export default function StatCard({

    title,
    value,
    icon,
    color

}) {

    return (

        <div
            className="
            bg-white
            rounded-2xl
            border
            border-slate-200
            p-6
            shadow-sm
            hover:shadow-lg
            hover:-translate-y-1
            transition-all
            duration-300
            cursor-pointer
            "
        >

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-sm font-medium text-slate-500">

                        {title}

                    </p>

                    <h2 className="text-4xl font-bold text-slate-800 mt-3">

                        {value}

                    </h2>

                </div>

                <div
                    className={`
                    h-14
                    w-14
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    ${color}
                    shadow-sm
                    `}
                >

                    {icon}

                </div>

            </div>

            <div className="mt-5 h-px bg-slate-100"></div>

            <p className="mt-4 text-xs text-slate-500">

                Updated just now

            </p>

        </div>

    );

}