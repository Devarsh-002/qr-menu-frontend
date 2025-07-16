import { useEffect, useState } from "react";
import API_BASE_URL from "../api/api.config";

const ManageDishes = () => {
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    image: null
  });

  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    const res = await fetch(`${API_BASE_URL}/restaurant/categories`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setCategories(data);
  };

  const fetchDishes = async () => {
    const res = await fetch(`${API_BASE_URL}/restaurant/dishes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setDishes(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    const url = editingId
      ? `${API_BASE_URL}/restaurant/dishes/${editingId}`
      : `${API_BASE_URL}/restaurant/dishes`;

    const res = await fetch(url, {
      method: editingId ? "PUT" : "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (res.ok) {
      resetForm();
      fetchDishes();
    } else {
      alert("Failed to save dish.");
    }
  };

  const handleEdit = (dish) => {
    setEditingId(dish._id);
    setForm({
      name: dish.name,
      description: dish.description,
      price: dish.price,
      categoryId: dish.categoryId,
      image: null
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this dish?")) return;
    const res = await fetch(`${API_BASE_URL}/restaurant/dishes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) fetchDishes();
  };

  const resetForm = () => {
    setForm({ name: "", description: "", price: "", categoryId: "", image: null });
    setEditingId(null);
  };

  useEffect(() => {
    fetchCategories();
    fetchDishes();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">{editingId ? "Edit Dish" : "Add Dish"}</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 mb-6">
        <input className="border p-2 rounded" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input className="border p-2 rounded" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
        <input className="border p-2 rounded" type="number" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
        <select className="border p-2 rounded" value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })} required>
          <option value="">Select category</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        <input className="border p-2 rounded" type="file" onChange={e => setForm({ ...form, image: e.target.files[0] })} />
        <div className="flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {editingId ? "Update Dish" : "Add Dish"}
          </button>
          {editingId && (
            <button onClick={resetForm} type="button" className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3 className="text-lg font-semibold mb-2">Your Dishes</h3>
      <ul className="divide-y border rounded bg-white">
        {dishes.map(dish => (
          <li key={dish._id} className="flex justify-between items-center p-3">
            <div>
              <h4 className="font-bold">{dish.name}</h4>
              <p className="text-sm text-gray-600">{dish.description}</p>
              <p className="text-sm text-gray-700">${dish.price}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(dish)} className="bg-yellow-400 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(dish._id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageDishes;
