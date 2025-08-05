import React, { useState } from "react";
import api from "../api/api.config";

const CategoryForm = ({ restaurantId, onCategoryAdded }) => {
  const [name, setName] = useState("");

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const res = await api.post("restaurant/category", {
        restaurant: restaurantId,
        name,
      });

      const newCategory = res.data;

      if (newCategory && newCategory.name) {
        onCategoryAdded(newCategory);
        setName("");
      } else {
        console.error("Invalid category response:", newCategory);
        alert("Category created but response is invalid");
      }
    } catch (err) {
      console.error("Error adding category:", err);
      alert("Failed to add category");
    }
  };

  return (
    <form
      onSubmit={handleAddCategory}
      className="flex flex-col sm:flex-row gap-4 w-full"
    >
      <input
        type="text"
        className="flex-1 px-4 py-3 rounded-lg bg-gray-900/40 border border-gray-700 placeholder-gray-400 text-white focus:ring-2 focus:ring-indigo-500"
        placeholder="New category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105 transition-transform shadow-lg text-white"
      >
        Add Category
      </button>
    </form>
  );
};

export default CategoryForm;
