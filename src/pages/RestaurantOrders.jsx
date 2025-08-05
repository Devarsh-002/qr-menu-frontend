import React, { useEffect, useState } from "react";
import axios from "../api/api.config";
import RestaurantNavbar from "../components/RestaurantNavbar";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const RestaurantOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusModal, setStatusModal] = useState({
    open: false,
    orderId: null,
    newStatus: "",
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/restaurantOrders");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    setStatusModal({ open: true, orderId, newStatus });
  };

  const confirmStatusChange = async () => {
    try {
      const res = await axios.put(`/status/${statusModal.orderId}`, {
        status: statusModal.newStatus,
      });
      toast.success(res.data.message || "Order status updated.");
      fetchOrders();
      setStatusModal({ open: false, orderId: null, newStatus: "" });
    } catch (error) {
      console.error("Failed to update order status", error);
      toast.error(error.response?.data?.message || "Error updating status.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <RestaurantNavbar />

      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Page Header */}
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-indigo-400">
            Orders
          </h2>

          {/* Orders Table */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/10">
            {loading ? (
              <p className="text-center text-gray-400 py-6">Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="text-center text-gray-400 py-6">
                No orders found for your restaurant.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-gray-300">
                  <thead>
                    <tr className="bg-gray-900/50 text-indigo-400 uppercase text-sm">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <motion.tr
                        key={order._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-t border-gray-700 hover:bg-gray-800/40 transition"
                      >
                        <td className="p-4 font-mono text-xs sm:text-sm break-all">
                          {order._id}
                        </td>
                        <td className="p-4">{order.customer?.name || "N/A"}</td>
                        <td className="p-4 capitalize">{order.status}</td>
                        <td className="p-4 font-semibold">
                          ${order.totalAmount.toFixed(2)}
                        </td>
                        <td className="p-4">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }
                            className="px-3 py-2 rounded-lg bg-gray-900/40 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
                          >
                            <option value="pending">Pending</option>
                            <option value="preparing">Preparing</option>
                            <option value="ready">Ready</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {statusModal.open && (
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
                Confirm Status Change
              </h3>
              <p className="text-gray-400 mb-6">
                Change order status to{" "}
                <span className="font-semibold text-indigo-400">
                  {statusModal.newStatus}
                </span>
                ?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() =>
                    setStatusModal({ open: false, orderId: null, newStatus: "" })
                  }
                  className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmStatusChange}
                  className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RestaurantOrders;
