import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const navLinks = [
    { name: "Restaurants", path: "/admin/restaurants" },
    { name: "Customers", path: "/admin/customers" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/10 dark:bg-gray-900/30 backdrop-blur-lg border-b border-gray-700 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3">
        {/* Brand Logo */}
        <Link
          to="/admin"
          className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          QR Menu
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative font-medium transition-all after:content-[''] after:block after:w-0 after:h-[2px] after:bg-indigo-500 hover:after:w-full ${
                location.pathname === link.path
                  ? "text-white after:w-full"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 transition-transform shadow-lg"
          >
            Log Out
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        } bg-gray-900/95 border-t border-gray-700`}
      >
        <div className="flex flex-col px-4 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-lg font-medium ${
                location.pathname === link.path
                  ? "text-indigo-400"
                  : "text-gray-300 hover:text-indigo-400"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 font-semibold shadow-md"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
