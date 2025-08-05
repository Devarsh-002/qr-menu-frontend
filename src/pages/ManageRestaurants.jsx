import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/api.config";
import AdminNavbar from "../components/AdminNavbar";
import { motion, AnimatePresence } from "framer-motion";

const ManageRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    slug: "",
    password: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    slug: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState(null);

  // Fetch restaurants
  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/restaurants");
      setRestaurants(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load restaurants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Create restaurant
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/restaurants", formData);
      toast.success("Restaurant created successfully");
      setFormData({ name: "", email: "", slug: "", password: "" });
      fetchRestaurants();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create restaurant");
    }
  };

  // Edit restaurant
  const handleEdit = (restaurant) => {
    setEditingId(restaurant._id);
    setEditData({
      name: restaurant.name,
      email: restaurant.email,
      slug: restaurant.slug,
      password: "",
    });
  };

  // Update restaurant
  const handleUpdate = async (id) => {
    try {
      await api.put(`/admin/restaurants/${id}`, editData);
      toast.success("Restaurant updated successfully");
      setEditingId(null);
      fetchRestaurants();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update restaurant");
    }
  };

  // Open Delete Modal
  const confirmDelete = (restaurant) => {
    setRestaurantToDelete(restaurant);
    setDeleteModalOpen(true);
  };

  // Delete restaurant
  const handleDelete = async () => {
    if (!restaurantToDelete) return;
    try {
      await api.delete(`/admin/restaurants/${restaurantToDelete._id}`);
      toast.success("Restaurant deleted successfully");
      fetchRestaurants();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete restaurant");
    } finally {
      setDeleteModalOpen(false);
      setRestaurantToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <AdminNavbar />

      {/* Page Content */}
      <div className="pt-24 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-indigo-400">
          Manage Restaurants
        </h2>

        {/* Add New Restaurant */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-10 border border-white/10">
          <h3 className="text-xl font-semibold mb-6 text-indigo-300">
            Add New Restaurant
          </h3>
          <form onSubmit={handleCreate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {["name", "email", "slug", "password"].map((field, index) => (
                <input
                  key={index}
                  type={field === "password" ? "password" : "text"}
                  required
                  placeholder={
                    field === "slug"
                      ? "Slug (e.g., tims-bistro)"
                      : field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  className="px-4 py-3 rounded-lg bg-gray-900/40 border border-gray-700 placeholder-gray-400 text-white focus:ring-2 focus:ring-indigo-500"
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full md:w-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 rounded-lg font-semibold text-white hover:scale-105 transition-transform shadow-lg"
            >
              Create Restaurant
            </button>
          </form>
        </div>

        {/* Restaurant List */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/10">
          {loading ? (
            <p className="text-center text-gray-400 py-6">
              Loading restaurants...
            </p>
          ) : restaurants.length === 0 ? (
            <p className="text-center text-gray-400 py-6">
              No restaurants available.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-300">
                <thead className="sticky top-0 bg-gray-900/80 backdrop-blur-xl z-10">
                  <tr className="text-indigo-400 uppercase text-sm">
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Slug</th>
                    <th className="p-4">Reset Password</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurants.map((r) => (
                    <tr
                      key={r._id}
                      className="border-t border-gray-700 hover:bg-gray-800/40 transition"
                    >
                      <td className="p-4">
                        {editingId === r._id ? (
                          <input
                            className="bg-gray-900/40 border border-gray-600 px-2 py-1 rounded"
                            value={editData.name}
                            onChange={(e) =>
                              setEditData({ ...editData, name: e.target.value })
                            }
                          />
                        ) : (
                          r.name
                        )}
                      </td>
                      <td className="p-4">
                        {editingId === r._id ? (
                          <input
                            className="bg-gray-900/40 border border-gray-600 px-2 py-1 rounded"
                            value={editData.email}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                email: e.target.value,
                              })
                            }
                          />
                        ) : (
                          r.email
                        )}
                      </td>
                      <td className="p-4">
                        {editingId === r._id ? (
                          <input
                            className="bg-gray-900/40 border border-gray-600 px-2 py-1 rounded"
                            value={editData.slug}
                            onChange={(e) =>
                              setEditData({ ...editData, slug: e.target.value })
                            }
                          />
                        ) : (
                          r.slug
                        )}
                      </td>
                      <td className="p-4">
                        {editingId === r._id ? (
                          <input
                            className="bg-gray-900/40 border border-gray-600 px-2 py-1 rounded"
                            type="password"
                            placeholder="New Password"
                            value={editData.password}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                password: e.target.value,
                              })
                            }
                          />
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="p-4 flex gap-4 text-sm">
                        {editingId === r._id ? (
                          <>
                            <button
                              onClick={() => handleUpdate(r._id)}
                              className="text-green-400 hover:text-green-300 font-medium"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="text-gray-400 hover:text-gray-300 font-medium"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(r)}
                              className="text-indigo-400 hover:text-indigo-300 font-medium"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => confirmDelete(r)}
                              className="text-red-400 hover:text-red-300 font-medium"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 p-6 rounded-2xl shadow-lg max-w-sm w-full text-center border border-gray-700"
            >
              <h3 className="text-lg font-semibold mb-4">
                Are you sure you want to delete{" "}
                <span className="text-red-400">{restaurantToDelete?.name}</span>?
              </h3>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageRestaurants;
