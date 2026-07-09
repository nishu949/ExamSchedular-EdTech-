const services = [

    "Backend API",

    "MongoDB",

    "Scheduler",

    "PDF Reports"

];

export default function SystemStatus() {

    return (

        <div className="bg-white rounded-xl border border-slate-200 p-6">

            <h2 className="text-lg font-semibold mb-5">

                System Status

            </h2>

            {

                services.map((service) => (

                    <div

                        key={service}

                        className="flex justify-between py-3 border-b last:border-none"

                    >

                        <span>

                            {service}

                        </span>

                        <span className="text-green-600 font-medium">

                            Online

                        </span>

                    </div>

                ))

            }

        </div>

    );

}