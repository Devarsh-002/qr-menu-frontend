import { useEffect, useState } from "react";
import API_BASE_URL from "../api/api.config";
import AdminNavbar from "../components/AdminNavbar";

const ManageRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [form, setForm] = useState({ name: "", email: "", password: "", slug: "" });
    const [editingId, setEditingId] = useState(null);
    const token = localStorage.getItem("token");

    const fetchRestaurants = async () => {
        const res = await fetch(`${API_BASE_URL}/admin/restaurants`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setRestaurants(await res.json());
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = form;
        if (!name || !email || (!editingId && !password)) {
            alert("All fields are required.");
            return;
        }

        const method = editingId ? "PUT" : "POST";
        const url = editingId
            ? `${API_BASE_URL}/admin/restaurant/${editingId}`
            : `${API_BASE_URL}/admin/restaurant`;

        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            setForm({ name: "", email: "", password: "" });
            setEditingId(null);
            fetchRestaurants();
        }
    };

    const handleEdit = (rest) => {
        setForm({ name: rest.name, email: rest.email, password: "" });
        setEditingId(rest._id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this restaurant?")) return;
        await fetch(`${API_BASE_URL}/admin/restaurant/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchRestaurants();
    };

    return (
        <>
            <AdminNavbar />
            <div className="p-4 max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Manage Restaurants</h1>
                <form onSubmit={handleSubmit} className="grid gap-4 mb-6 grid-cols-1 md:grid-cols-3">
                    <input
                        type="text"
                        placeholder="Restaurant Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder={editingId ? "New Password (optional)" : "Password"}
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="border p-2 rounded"
                        required={!editingId}
                    />
                    <input
                        type="text"
                        placeholder="Slug"
                        value={form.slug}
                        onChange={(e) => setForm({ ...form, slug: e.target.value })}
                        className="border p-2 rounded"
                        required
                    />

                    <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 col-span-full">
                        {editingId ? "Update Restaurant" : "Add Restaurant"}
                    </button>
                </form>

                <ul className="space-y-3 mb-10">
                    {restaurants.map((r) => (
                        <li
                            key={r._id}
                            className="bg-white shadow p-4 rounded flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-bold">{r.name}</h3>
                                <p className="text-sm text-gray-600">{r.email}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(r)} className="text-blue-600 hover:underline">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(r._id)} className="text-red-600 hover:underline">
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default ManageRestaurants;
