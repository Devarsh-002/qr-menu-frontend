import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import CategoryForm from '../components/CategoryForm';
import DishForm from '../components/DishForm';

const Dashboard = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [categories, setCategories] = useState([]);
  const [dishesByCategory, setDishesByCategory] = useState({});

  const fetchRestaurant = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setRestaurant(res.data);
    } catch (err) {
      console.error('Error fetching restaurant:', err);
    }
  };

  const fetchCategories = useCallback(async () => {
    if (!restaurant?._id) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/categories/${restaurant._id}`);
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, [restaurant]);

  const fetchDishes = useCallback(async () => {
    if (!restaurant?._id) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/dishes/${restaurant._id}`);
      const grouped = {};
      res.data.forEach((dish) => {
        const categoryId = dish.category._id || dish.category;
        if (!grouped[categoryId]) grouped[categoryId] = [];
        grouped[categoryId].push(dish);
      });
      setDishesByCategory(grouped);
    } catch (err) {
      console.error('Error fetching dishes:', err);
    }
  }, [restaurant]);

  useEffect(() => {
    fetchRestaurant();
  }, []);

  useEffect(() => {
    if (restaurant) {
      fetchCategories();
      fetchDishes();
    }
  }, [fetchCategories, fetchDishes, restaurant]);

  const handleCategoryAdded = () => {
    fetchCategories();
  };

  const handleDishAdded = () => {
    fetchDishes();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Restaurant Dashboard</h1>

      {restaurant && (
        <>
          <CategoryForm
            restaurantId={restaurant._id}
            onCategoryAdded={handleCategoryAdded}
          />

          <hr className="my-6" />

          <h2 className="text-xl font-semibold mb-2">Add Dish</h2>
          <DishForm
            restaurantId={restaurant._id}
            categories={categories}
            onDishAdded={handleDishAdded}
          />

          <hr className="my-6" />

          <h2 className="text-xl font-semibold mb-2">Menu</h2>
          {categories.length === 0 ? (
            <p>No categories added yet.</p>
          ) : (
            categories.map((cat) => (
              <div key={cat._id} className="mb-4">
                <h3 className="text-lg font-medium">{cat.name}</h3>
                <ul className="list-disc pl-5">
                  {dishesByCategory[cat._id] && dishesByCategory[cat._id].length > 0 ? (
                    dishesByCategory[cat._id].map((dish) => (
                      <li key={dish._id}>
                        {dish.name} - ${parseFloat(dish.price).toFixed(2)}
                      </li>
                    ))
                  ) : (
                    <li>No dishes in this category.</li>
                  )}
                </ul>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
