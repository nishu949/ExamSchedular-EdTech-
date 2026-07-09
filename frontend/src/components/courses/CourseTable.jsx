import { Pencil, Trash2, BookOpen } from "lucide-react";

export default function CourseTable({

    courses,
    onEdit,
    onDelete

}) {

    return (

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">

            {/* Header */}

            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">

                <div>

                    <h2 className="text-lg font-semibold text-slate-800">
                        Course List
                    </h2>

                    <p className="text-sm text-slate-500">
                        {courses.length} course(s) available
                    </p>

                </div>

            </div>

            {/* Table */}

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-slate-50">

                        <tr>

                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                                Code
                            </th>

                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                                Course Name
                            </th>

                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                                Faculty
                            </th>

                            <th className="px-6 py-3 text-center text-sm font-semibold text-slate-600">
                                Students
                            </th>

                            <th className="px-6 py-3 text-center text-sm font-semibold text-slate-600">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {courses.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="py-16 text-center"
                                >

                                    <BookOpen
                                        className="mx-auto text-slate-300 mb-3"
                                        size={48}
                                    />

                                    <h3 className="text-lg font-medium text-slate-600">

                                        No Courses Found

                                    </h3>

                                    <p className="text-slate-500 mt-2">

                                        Add your first course to begin scheduling.

                                    </p>

                                </td>

                            </tr>

                        ) : (

                            courses.map((course, index) => (

                                <tr
                                    key={course.id}
                                    className={`border-t border-slate-100 hover:bg-slate-50 transition ${
                                        index % 2 === 0
                                            ? "bg-white"
                                            : "bg-slate-50/40"
                                    }`}
                                >

                                    <td className="px-6 py-4 font-semibold text-blue-700">

                                        {course.course_code}

                                    </td>

                                    <td className="px-6 py-4">

                                        {course.course_name}

                                    </td>

                                    <td className="px-6 py-4">

                                        {course.faculty}

                                    </td>

                                    <td className="px-6 py-4 text-center">

                                        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">

                                            {course.students?.length ?? 0}

                                        </span>

                                    </td>

                                    <td className="px-6 py-4">

                                        <div className="flex justify-center gap-3">

                                            <button
                                                onClick={() => onEdit(course)}
                                                className="rounded-lg bg-amber-100 p-2 text-amber-600 hover:bg-amber-200 transition"
                                            >

                                                <Pencil size={18} />

                                            </button>

                                            <button
                                                onClick={() => onDelete(course.id)}
                                                className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200 transition"
                                            >

                                                <Trash2 size={18} />

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}