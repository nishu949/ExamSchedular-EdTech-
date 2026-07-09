import { CalendarDays, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-10 text-white shadow-2xl">

      {/* Background Blur */}
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl"></div>

      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10">

        {/* Left Side */}
        <div className="max-w-2xl">

          <h1 className="mt-6 text-5xl font-extrabold leading-tight">
            Smart University
            <br />
            Exam Timetable
          </h1>

          <p className="mt-6 text-lg text-blue-100 leading-8">
            Automatically generate clash-free examination schedules,
            detect room, faculty and student conflicts,
            manage reports, and simplify university examination planning.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <button className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:scale-105">
              Generate Timetable
            </button>

            <button className="rounded-xl border border-white/40 px-6 py-3 font-semibold transition hover:bg-white/10">
              View Schedule
            </button>

          </div>

        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center">

          <div className="rounded-3xl bg-white/15 p-8 backdrop-blur-lg shadow-xl">

            <CalendarDays
              size={130}
              className="mx-auto text-white"
            />

            <h3 className="mt-6 text-center text-xl font-semibold">
              Conflict-Free Scheduling
            </h3>

            <p className="mt-2 text-center text-blue-100">
              Powered by Python Scheduling Engine
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}