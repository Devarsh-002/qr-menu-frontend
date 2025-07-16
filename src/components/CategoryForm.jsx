import React, { useState } from 'react';
import axios from 'axios';

const CategoryForm = ({ restaurantId, onCategoryAdded }) => {
  const [name, setName] = useState('');

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!name) return;

    try {
      const res = await axios.post('http://localhost:5000/api/categories', {
        restaurant: restaurantId,
        name,
      });
      onCategoryAdded(res.data);
      setName('');
    } catch (err) {
      console.error('Error adding category:', err);
      alert('Failed to add category');
    }
  };

  return (
    <form onSubmit={handleAddCategory} className="mb-4 flex gap-2">
      <input
        type="text"
        className="border border-gray-300 px-3 py-1 rounded"
        placeholder="New category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        Add Category
      </button>
    </form>
  );
};

export default CategoryForm;
