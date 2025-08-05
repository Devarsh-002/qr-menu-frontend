import React, { useEffect, useState } from "react";
import api from "../api/api.config";
import RestaurantNavbar from "../components/RestaurantNavbar";
import CategoryForm from "../components/CategoryForm";
import DishForm from "../components/DishForm";
import { motion, AnimatePresence } from "framer-motion";

const ManageMenu = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [dishes, setDishes] = useState([]);
  const [loadingDishes, setLoadingDishes] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, dishId: null });

  const restaurantId = localStorage.getItem("restaurantId");

  const fetchCategories = async () => {
    try {
      const res = await api.get("/restaurant/categories");
      setCategories(res.data);
      if (res.data.length > 0) {
        setSelectedCategoryId(res.data[0]._id);
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const fetchDishes = async (categoryId) => {
    try {
      setLoadingDishes(true);
      const res = await api.get(`/restaurant/dishes/${categoryId}`);
      setDishes(res.data);
    } catch (error) {
      console.error("Failed to fetch dishes", error);
    } finally {
      setLoadingDishes(false);
    }
  };

  const handleEditDish = (dish) => {
    setEditingDish(dish);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmDeleteDish = (dishId) => {
    setDeleteModal({ open: true, dishId });
  };

  const handleDeleteDish = async () => {
    try {
      await api.delete(`/restaurant/dish/${deleteModal.dishId}`);
      fetchDishes(selectedCategoryId);
      setDeleteModal({ open: false, dishId: null });
    } catch (error) {
      console.error("Failed to delete dish", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      fetchDishes(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <RestaurantNavbar />

      <div className="pt-24 container max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-indigo-400">
            Manage Menu
          </h2>

          {/* Category Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8 border border-white/10">
            <CategoryForm
              restaurantId={restaurantId}
              onCategoryAdded={(newCat) =>
                setCategories((prev) => [...prev, newCat])
              }
            />
          </div>

          {/* Category Selector */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <label className="font-semibold text-gray-300 text-lg">
              Select Category:
            </label>
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="px-4 py-3 rounded-lg bg-gray-900/40 border border-gray-700 text-white focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
            >
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Dish Form */}
          {selectedCategoryId && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8 border border-white/10">
              <DishForm
                categoryId={selectedCategoryId}
                onDishAdded={() => {
                  fetchDishes(selectedCategoryId);
                  setEditingDish(null);
                }}
                editingDish={editingDish}
                clearEditing={() => setEditingDish(null)}
              />
            </div>
          )}

          {/* Dish List */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-6 text-indigo-400">
              Dishes
            </h3>
            {loadingDishes ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-48 bg-gray-800 animate-pulse rounded-xl"
                  ></div>
                ))}
              </div>
            ) : dishes.length === 0 ? (
              <p className="text-gray-400">
                No dishes available for this category.
              </p>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {dishes.map((dish) => (
                  <motion.li
                    key={dish._id}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(99,102,241,0.4)",
                    }}
                    className="flex flex-col bg-gray-900/40 rounded-xl overflow-hidden shadow-lg border border-gray-700"
                  >
                    {dish.image && (
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-40 object-cover"
                      />
                    )}
                    <div className="p-4 flex flex-col justify-between flex-1">
                      <h4 className="text-lg font-semibold mb-1">{dish.name}</h4>
                      <p className="text-gray-400 mb-3">${dish.price}</p>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                        {dish.description}
                      </p>
                      <div className="flex justify-between">
                        <button
                          onClick={() => handleEditDish(dish)}
                          className="text-indigo-400 hover:text-indigo-300 font-medium transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => confirmDeleteDish(dish._id)}
                          className="text-red-400 hover:text-red-300 font-medium transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModal.open && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 rounded-2xl shadow-xl p-6 max-w-sm w-full text-center border border-gray-700"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3 className="text-xl font-bold mb-4 text-white">
                Confirm Deletion
              </h3>
              <p className="text-gray-400 mb-6">
                Are you sure you want to delete this dish? This action cannot be
                undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setDeleteModal({ open: false, dishId: null })}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteDish}
                  className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageMenu;
