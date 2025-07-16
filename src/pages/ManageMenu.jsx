import { useEffect, useState } from "react";
import API_BASE_URL from "../api/api.config";

const ManageMenu = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const fetchCategories = async () => {
    const res = await fetch(`${API_BASE_URL}/category`);
    const data = await res.json();
    setCategories(data);
  };

  const handleAddCategory = async () => {
    await fetch(`${API_BASE_URL}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name }),
    });
    setName("");
    fetchCategories();
  };

  useEffect(() => { fetchCategories(); }, []);

  return (
    <div>
      <input className="border p-2 mb-2 w-full" value={name} onChange={e => setName(e.target.value)} placeholder="New Category" />
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleAddCategory}>Add</button>
      <ul className="mt-4">
        {categories.map((cat, i) => <li key={i} className="border-b py-1">{cat.name}</li>)}
      </ul>
    </div>
  );
};

export default ManageMenu;
