import { useEffect, useState } from "react";
import API_BASE_URL from "../api/api.config";
import ManageDishes from "./ManageDishes";
import RestaurantNavbar from "../components/RestaurantNavbar";

const RestaurantDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    const res = await fetch(`${API_BASE_URL}/restaurant/categories`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setCategories(data);
  };

  const handleAddCategory = async () => {
    if (!newCategory) return;
    const res = await fetch(`${API_BASE_URL}/restaurant/categories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: newCategory })
    });
    if (res.ok) {
      setNewCategory("");
      fetchCategories();
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
    <RestaurantNavbar/>
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>
      <div className="flex gap-2 mb-4">
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
          className="border p-2 rounded flex-1"
        />
        <button onClick={handleAddCategory} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </div>
      <ul className="list-disc pl-5 mb-8">
        {categories.map(cat => (
          <li key={cat._id}>{cat.name}</li>
        ))}
      </ul>

      <ManageDishes />
      <a href="/restaurant/qr" className="text-blue-600 underline">Generate QR Code</a>

    </div>
    </>
  );
};

export default RestaurantDashboard;
