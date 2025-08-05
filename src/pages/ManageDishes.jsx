import React, { useEffect, useState } from "react";
import axios from "../api/api.config";
import DishForm from "../components/DishForm";
import DishCard from "../components/DishCard";

const ManageDishes = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/categories");
      setCategories(res.data);
      if (res.data.length > 0) {
        setSelectedCategory(res.data[0]._id);
      }
    } catch (err) {
      console.error("Error loading categories", err);
    }
  };

  const fetchDishes = async (categoryId) => {
    try {
      setLoading(true);
      const res = await axios.get(`/dishes/${categoryId}`);
      setDishes(res.data);
    } catch (err) {
      console.error("Error loading dishes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) fetchDishes(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Dishes</h2>

      <div className="mb-4">
        <label className="font-semibold mr-2">Select Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded"
        >
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <DishForm categoryId={selectedCategory} onSuccess={() => fetchDishes(selectedCategory)} />

      {loading ? (
        <p>Loading dishes...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {dishes.map((dish) => (
            <DishCard
              key={dish._id}
              dish={dish}
              refresh={() => fetchDishes(selectedCategory)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageDishes;
