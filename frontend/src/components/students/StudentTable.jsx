import { Pencil, Trash2, Users } from "lucide-react";

export default function StudentTable({

    students,
    onEdit,
    onDelete

}) {

    return (

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">

            <div className="flex items-center justify-between px-6 py-4 border-b">

                <div>

                    <h2 className="text-lg font-semibold">

                        Students

                    </h2>

                    <p className="text-sm text-slate-500">

                        {students.length} student(s)

                    </p>

                </div>

            </div>

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-slate-50">

                        <tr>

                            <th className="px-6 py-3 text-left">
                                Student ID
                            </th>

                            <th className="px-6 py-3 text-left">
                                Student Name
                            </th>

                            <th className="px-6 py-3 text-left">
                                Department
                            </th>

                            <th className="px-6 py-3 text-center">
                                Courses
                            </th>

                            <th className="px-6 py-3 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {students.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="py-16 text-center"
                                >

                                    <Users
                                        size={48}
                                        className="mx-auto text-slate-300 mb-3"
                                    />

                                    <h3 className="text-lg font-medium text-slate-600">

                                        No Students Found

                                    </h3>

                                </td>

                            </tr>

                        ) : (

                            students.map((student,index)=>(

                                <tr
                                    key={student.id}
                                    className={`border-t ${
                                        index%2===0
                                        ? "bg-white"
                                        : "bg-slate-50/40"
                                    }`}
                                >

                                    <td className="px-6 py-4 font-semibold text-blue-700">

                                        {student.student_id}

                                    </td>

                                    <td className="px-6 py-4">

                                        {student.student_name}

                                    </td>

                                    <td className="px-6 py-4">

                                        {student.department}

                                    </td>

                                    <td className="px-6 py-4 text-center">

                                        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">

                                            {student.enrolled_courses.length}

                                        </span>

                                    </td>

                                    <td className="px-6 py-4">

                                        <div className="flex justify-center gap-3">

                                            <button
                                                onClick={()=>onEdit(student)}
                                                className="bg-amber-100 text-amber-600 rounded-lg p-2 hover:bg-amber-200"
                                            >

                                                <Pencil size={18}/>

                                            </button>

                                            <button
                                                onClick={()=>onDelete(student.id)}
                                                className="bg-red-100 text-red-600 rounded-lg p-2 hover:bg-red-200"
                                            >

                                                <Trash2 size={18}/>

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