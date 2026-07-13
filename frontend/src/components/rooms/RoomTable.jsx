import { Pencil, Trash2, Building2 } from "lucide-react";

export default function RoomTable({

    rooms,
    onEdit,
    onDelete

}) {

    return (

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">

            {/* Header */}

            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">

                <div>

                    <h2 className="text-lg font-semibold text-slate-800">
                        Room List
                    </h2>

                    <p className="text-sm text-slate-500">
                        {rooms.length} room(s) available
                    </p>

                </div>

            </div>

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-slate-50">

                        <tr>

                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                                Room ID
                            </th>

                            <th className="px-6 py-3 text-center text-sm font-semibold text-slate-600">
                                Capacity
                            </th>

                            <th className="px-6 py-3 text-center text-sm font-semibold text-slate-600">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {rooms.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="3"
                                    className="py-16 text-center"
                                >

                                    <Building2
                                        size={48}
                                        className="mx-auto text-slate-300 mb-3"
                                    />

                                    <h3 className="text-lg font-medium text-slate-600">

                                        No Rooms Found

                                    </h3>

                                    <p className="text-slate-500 mt-2">

                                        Add rooms before generating the timetable.

                                    </p>

                                </td>

                            </tr>

                        ) : (

                            rooms.map((room, index) => (

                                <tr
                                    key={room.id}
                                    className={`border-t border-slate-100 hover:bg-slate-50 transition ${
                                        index % 2 === 0
                                            ? "bg-white"
                                            : "bg-slate-50/40"
                                    }`}
                                >

                                    <td className="px-6 py-4 font-semibold text-blue-700">

                                        {room.room_id}

                                    </td>

                                    <td className="px-6 py-4 text-center">

                                        <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">

                                            {room.capacity}

                                        </span>

                                    </td>

                                    <td className="px-6 py-4">

                                        <div className="flex justify-center gap-3">

                                            <button
                                                onClick={() => onEdit(room)}
                                                className="rounded-lg bg-amber-100 p-2 text-amber-600 hover:bg-amber-200 transition"
                                            >

                                                <Pencil size={18} />

                                            </button>

                                            <button
                                                onClick={() => onDelete(room.id)}
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