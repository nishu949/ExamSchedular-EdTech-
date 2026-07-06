import { useEffect, useState } from "react";
import api from "../services/api";

export default function Rooms() {

    const [rooms, setRooms] = useState([]);

    const [form, setForm] = useState({
        room_id: "",
        capacity: ""
    });

    const load = async () => {
        try {
            const res = await api.get("/rooms/");
            setRooms(res.data);
        } catch (error) {
            console.error(error);
            alert("Failed to load rooms");
        }
    };

    useEffect(() => {
        load();
    }, []);

    const save = async () => {
        try {
            await api.post("/rooms/", form);

            setForm({
                room_id: "",
                capacity: ""
            });

            load();

            alert("Room Added Successfully");

        } catch (error) {
            console.error(error);
            alert("Unable to add room");
        }
    };

    const remove = async (id) => {
        try {

            await api.delete(`/rooms/${id}/`);

            load();

            alert("Room Deleted");

        } catch (error) {
            console.error(error);
            alert("Unable to delete room");
        }
    };

    return (
        <div className="container">

            <h1>Room Management</h1>

            <div style={{ marginBottom: "20px" }}>

                <input
                    type="text"
                    placeholder="Room ID"
                    value={form.room_id}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            room_id: e.target.value
                        })
                    }
                />

                <input
                    type="number"
                    placeholder="Capacity"
                    value={form.capacity}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            capacity: e.target.value
                        })
                    }
                    style={{ marginLeft: "10px" }}
                />

                <button
                    onClick={save}
                    style={{ marginLeft: "10px" }}
                >
                    Add Room
                </button>

            </div>

            <table
                border="1"
                cellPadding="10"
                cellSpacing="0"
                width="100%"
            >

                <thead>

                    <tr>
                        <th>Room ID</th>
                        <th>Capacity</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {rooms.length > 0 ? (

                        rooms.map((r) => (

                            <tr key={r.id}>

                                <td>{r.room_id}</td>

                                <td>{r.capacity}</td>

                                <td>

                                    <button
                                        onClick={() => remove(r.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>
                            <td colSpan="3" style={{ textAlign: "center" }}>
                                No Rooms Found
                            </td>
                        </tr>

                    )}

                </tbody>

            </table>

        </div>
    );
}