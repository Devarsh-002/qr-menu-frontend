import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AdminNavbar from "../components/AdminNavbar";
import { UtensilsCrossed, Users } from "lucide-react"; // Icons

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <AdminNavbar />

      {/* Main Content */}
      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-10 max-w-6xl mx-auto"
        >
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-indigo-400">
            Welcome to Admin Dashboard
          </h1>
          <p className="text-gray-300 text-lg mb-10">
            Manage restaurants and customers easily from here.
          </p>

          {/* Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Card 1 - Manage Restaurants */}
            <motion.div
              onClick={() => navigate("/admin/restaurants")}
              className="p-6 bg-gray-900/40 rounded-xl shadow-lg cursor-pointer border border-gray-700 hover:border-indigo-500 hover:bg-gray-800/60 transition-all flex flex-col items-start gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-indigo-500/20 p-3 rounded-full">
                <UtensilsCrossed className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-xl font-semibold text-indigo-400">
                Manage Restaurants
              </h2>
              <p className="text-gray-400 text-sm">
                Add, edit, or remove restaurants from the platform.
              </p>
            </motion.div>

            {/* Card 2 - Manage Customers */}
            <motion.div
              onClick={() => navigate("/admin/customers")}
              className="p-6 bg-gray-900/40 rounded-xl shadow-lg cursor-pointer border border-gray-700 hover:border-pink-500 hover:bg-gray-800/60 transition-all flex flex-col items-start gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-pink-500/20 p-3 rounded-full">
                <Users className="w-6 h-6 text-pink-400" />
              </div>
              <h2 className="text-xl font-semibold text-pink-400">
                Manage Customers
              </h2>
              <p className="text-gray-400 text-sm">
                View and manage customer accounts easily.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
