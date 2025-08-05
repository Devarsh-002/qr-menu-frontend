import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { toast } from "react-toastify";

const RestaurantNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const navLinks = [
    { name: "Dashboard", path: "/restaurant" },
    { name: "Manage Menu", path: "/restaurant/menu" },
    { name: "Orders", path: "/restaurant/orders" },
  ];

  return (
    <nav className="w-full bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border-b border-gray-700 text-white shadow-lg fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Brand */}
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Restaurant Panel
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative font-medium transition-colors after:content-[''] after:block after:w-0 after:h-[2px] after:bg-green-400 after:transition-all after:duration-300 hover:after:w-full ${
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
            className="px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 transition-transform shadow-md"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-xl border-t border-gray-700 transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-lg font-medium transition ${
                location.pathname === link.path
                  ? "text-green-400"
                  : "text-gray-300 hover:text-green-400"
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
            className="w-full px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 transition-transform shadow-md"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default RestaurantNavbar;
