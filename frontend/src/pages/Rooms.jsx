import { useEffect, useState } from "react";
import api from "../services/api";

import RoomTable from "../components/rooms/RoomTable";
import RoomForm from "../components/rooms/RoomForm";

export default function Rooms() {

    const [rooms, setRooms] = useState([]);

    const [editing, setEditing] = useState(null);

    const [showForm, setShowForm] = useState(false);

    const [search, setSearch] = useState("");

    const filteredRooms = rooms.filter((room) =>
        room.room_id.toLowerCase().includes(search.toLowerCase())
    );

    const loadRooms = async () => {

        try {

            const res = await api.get("/rooms/");

            setRooms(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        loadRooms();

    }, []);

    const addRoom = async (data) => {

        try {

            await api.post("/rooms/", data);

            setShowForm(false);

            loadRooms();

        }

        catch (err) {

            console.log(err);

            alert("Unable to add room");

        }

    };

    const updateRoom = async (data) => {

        try {

            await api.put(

                `/rooms/${editing.id}/`,

                data

            );

            setEditing(null);

            setShowForm(false);

            loadRooms();

        }

        catch (err) {

            console.log(err);

            alert("Unable to update room");

        }

    };

    const deleteRoom = async (id) => {

        if (!window.confirm("Delete this room?"))

            return;

        try {

            await api.delete(`/rooms/${id}/`);

            loadRooms();

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="flex justify-between items-center">

                <h1 className="text-3xl font-bold">

                    Rooms

                </h1>

                <button

                    onClick={() => {

                        setEditing(null);

                        setShowForm(true);

                    }}

                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"

                >

                    + Add Room

                </button>

            </div>

            {/* Form */}

            {showForm && (

                <RoomForm

                    initialData={editing}

                    onCancel={() => {

                        setEditing(null);

                        setShowForm(false);

                    }}

                    onSubmit={editing ? updateRoom : addRoom}

                />

            )}

            {/* Search */}

            <input

                type="text"

                placeholder="Search Room..."

                value={search}

                onChange={(e) => setSearch(e.target.value)}

                className="w-full md:w-96 rounded-lg border border-slate-300 px-4 py-2"

            />

            {/* Table */}

            <RoomTable

                rooms={filteredRooms}

                onEdit={(room) => {

                    setEditing(room);

                    setShowForm(true);

                }}

                onDelete={deleteRoom}

            />

        </div>

    );

}