import { Pencil, Trash2, GraduationCap } from "lucide-react";

export default function FacultyTable({

    faculties,
    onEdit,
    onDelete

}) {

    return (

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">

            <div className="flex items-center justify-between px-6 py-4 border-b">

                <div>

                    <h2 className="text-lg font-semibold">
                        Faculty List
                    </h2>

                    <p className="text-sm text-slate-500">
                        {faculties.length} faculty member(s)
                    </p>

                </div>

            </div>

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-slate-50">

                        <tr>

                            <th className="px-6 py-3 text-left">
                                Faculty ID
                            </th>

                            <th className="px-6 py-3 text-left">
                                Name
                            </th>

                            <th className="px-6 py-3 text-left">
                                Department
                            </th>

                            <th className="px-6 py-3 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {faculties.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="4"
                                    className="py-14 text-center"
                                >

                                    <GraduationCap
                                        size={48}
                                        className="mx-auto text-slate-300 mb-3"
                                    />

                                    <h3 className="text-lg font-medium text-slate-600">
                                        No Faculty Found
                                    </h3>

                                </td>

                            </tr>

                        ) : (

                            faculties.map((faculty,index)=>(

                                <tr
                                    key={faculty.id}
                                    className={`border-t ${
                                        index%2===0
                                        ?"bg-white"
                                        :"bg-slate-50/40"
                                    }`}
                                >

                                    <td className="px-6 py-4 font-semibold text-blue-700">
                                        {faculty.faculty_id}
                                    </td>

                                    <td className="px-6 py-4">
                                        {faculty.faculty_name}
                                    </td>

                                    <td className="px-6 py-4">
                                        {faculty.department}
                                    </td>

                                    <td className="px-6 py-4">

                                        <div className="flex justify-center gap-3">

                                            <button
                                                onClick={()=>onEdit(faculty)}
                                                className="bg-amber-100 text-amber-600 rounded-lg p-2 hover:bg-amber-200"
                                            >
                                                <Pencil size={18}/>
                                            </button>

                                            <button
                                                onClick={()=>onDelete(faculty.id)}
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