import React, { useState } from 'react';
import axios from 'axios';

const DishForm = ({ restaurantId, categories, onDishAdded }) => {
  const [dish, setDish] = useState({ name: '', price: '', category: '' });

  const handleChange = (e) => {
    setDish({ ...dish, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/dishes', {
        ...dish,
        price: parseFloat(dish.price),
        restaurantId
      });
      setDish({ name: '', price: '', category: '' });
      onDishAdded();
    } catch (err) {
      console.error('Error adding dish:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="name" value={dish.name} onChange={handleChange} placeholder="Dish name" className="border px-2 py-1 w-full" required />
      <input name="price" value={dish.price} onChange={handleChange} placeholder="Price" type="number" className="border px-2 py-1 w-full" required />
      <select name="category" value={dish.category} onChange={handleChange} className="border px-2 py-1 w-full" required>
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat._id} value={cat._id}>{cat.name}</option>
        ))}
      </select>
      <button type="submit" className="bg-green-500 text-white px-4 py-1">Add Dish</button>
    </form>
  );
};

export default DishForm;
