import React, { useEffect, useState } from "react";
import api from "../api/api.config";
import RestaurantNavbar from "../components/RestaurantNavbar";
import { QRCode } from "react-qrcode-logo";
import { toast } from "react-toastify";
import { Copy, Download } from "lucide-react";
import { motion } from "framer-motion";

const RestaurantDashboard = () => {
  const [restaurant, setRestaurant] = useState(null);
  const restaurantSlug = localStorage.getItem("slug");

  const fetchRestaurant = async () => {
    try {
      const res = await api.get(`/menu/${restaurantSlug}`);
      setRestaurant(res.data);
    } catch (err) {
      console.error("Failed to load restaurant", err);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const menuURL = `${window.location.origin}/menu/${restaurantSlug}`;

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(menuURL);
    toast.success("Menu link copied to clipboard!");
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById("styled-qr");
    const image = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = image;
    a.download = `${restaurantSlug}-qr.png`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <RestaurantNavbar />

      <div className="pt-24 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        {restaurant ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-3xl border border-white/10 text-center flex flex-col items-center"
          >
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-indigo-400">
              Restaurant Dashboard
            </h2>

            {/* Welcome */}
            <p className="text-lg mb-2">
              Welcome,{" "}
              <span className="text-indigo-400 font-semibold">
                {restaurant.name}
              </span>
            </p>
            <p className="text-gray-400 mb-8">
              Slug: <code>{restaurant.slug}</code>
            </p>

            {/* QR Code with modern style */}
            <div className="relative p-[4px] rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-6">
              <div className="bg-gray-900/80 rounded-2xl p-6 flex flex-col items-center">
                <QRCode
                  id="styled-qr"
                  value={menuURL}
                  size={220}
                  fgColor="#8B5CF6"
                  qrStyle="dots" // Modern rounded dots
                  eyeRadius={8} // Rounded eye corners
                  ecLevel="H"
                  logoImage="/logo.png" // Your logo
                  logoWidth={50}
                  logoHeight={50}
                  removeQrCodeBehindLogo={true}
                  bgColor="transparent"
                />
                <p className="text-sm text-gray-300 mt-4">
                  Scan to view your menu
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(139,92,246,0.6)" }}
                onClick={copyLinkToClipboard}
                className="flex items-center justify-center gap-2 py-3 rounded-lg font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md w-full transition"
              >
                <Copy size={18} /> Copy Link
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(16,185,129,0.6)" }}
                onClick={downloadQRCode}
                className="flex items-center justify-center gap-2 py-3 rounded-lg font-medium bg-gradient-to-r from-green-500 to-emerald-400 text-white shadow-md w-full transition"
              >
                <Download size={18} /> Download QR
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div className="text-center text-gray-400 mt-20">
            <div className="animate-pulse w-20 h-20 bg-gray-700 rounded-full mx-auto mb-4"></div>
            Loading dashboard...
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDashboard;
