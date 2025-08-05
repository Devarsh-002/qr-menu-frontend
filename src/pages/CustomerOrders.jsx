import React, { useEffect, useState } from "react";
import axios from "../api/api.config";
import { Link } from "react-router-dom";
import CustomerNavbar from "../components/CustomerNavbar";
import { useParams } from "react-router-dom";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const { slug } = useParams();

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/customerOrders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("customerToken")}`,
        },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching customer orders", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <CustomerNavbar restaurant={slug} />

      <div className="w-full px-4 sm:px-6 py-8">
        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-8">
          My Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
            You haven't placed any orders yet.
          </p>
        ) : (
          <div className="overflow-x-auto max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/10">
            <table className="min-w-full text-left text-gray-300">
              <thead>
                <tr className="bg-gray-900/50 text-indigo-400 uppercase text-sm">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Restaurant</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Track</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-t border-gray-700 hover:bg-gray-800/40 transition"
                  >
                    <td className="p-4 font-mono text-sm">{order._id}</td>
                    <td className="p-4">{order.restaurant?.name}</td>
                    
                    <td className="p-4 font-semibold">${order.totalAmount}</td>
                    <td
                      className={`p-4 font-semibold capitalize ${
                        order.status === "completed"
                          ? "text-green-400"
                          : order.status === "pending"
                          ? "text-yellow-400"
                          : order.status === "cancelled"
                          ? "text-red-400"
                          : "text-indigo-400"
                      }`}
                    >
                      {order.status}
                    </td>
                    <td className="p-4 text-center">
                      <Link
                        to={`/menu/${order.restaurant.slug}/track/${order._id}`}
                        className="inline-block px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105 transition-transform shadow-md text-white text-sm"
                      >
                        Track
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerOrders;
