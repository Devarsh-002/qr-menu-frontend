import React, { useEffect, useState } from "react";
import axios from "../api/api.config";
import AdminNavbar from "../components/AdminNavbar";
import { motion } from "framer-motion";

const ManageCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/admin/customers");
      setCustomers(res.data);
    } catch (error) {
      console.error("Failed to fetch customers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <AdminNavbar />

      <div className="pt-24 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-indigo-400">
          All Customers
        </h2>

        {/* Customers Table */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/10">
          {loading ? (
            <p className="text-center text-gray-400 py-6">Loading customers...</p>
          ) : customers.length === 0 ? (
            <p className="text-center text-gray-400 py-6">No customers found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-300">
                <thead className="sticky top-0 bg-gray-900/80 backdrop-blur-xl z-10">
                  <tr className="text-indigo-400 uppercase text-sm">
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Registered On</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, index) => (
                    <motion.tr
                      key={customer._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-t border-gray-700 hover:bg-gray-800/40 transition"
                    >
                      <td className="p-4 font-medium">{customer.name}</td>
                      <td className="p-4">{customer.email}</td>
                      <td className="p-4">
                        {new Date(customer.createdAt).toLocaleDateString()}{" "}
                        {new Date(customer.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCustomers;
