import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // ✅ Icon library for hamburger menu

const CustomerNavbar = ({ restaurant }) => {
  const { slug } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("cart");
  };

  return (
    <nav className="w-full bg-white/10 backdrop-blur-lg border-b border-gray-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Brand */}
        <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Customer Panel
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link
            to={`/menu/${restaurant}`}
            className="relative text-gray-200 hover:text-green-400 font-medium transition-colors after:content-[''] after:block after:w-0 after:h-[2px] after:bg-green-400 after:transition-all after:duration-300 hover:after:w-full"
          >
            Menu
          </Link>
          <Link
            to={`/menu/${restaurant}/cart`}
            className="relative text-gray-200 hover:text-green-400 font-medium transition-colors after:content-[''] after:block after:w-0 after:h-[2px] after:bg-green-400 after:transition-all after:duration-300 hover:after:w-full"
          >
            Cart
          </Link>
          <Link
            to={`/menu/${restaurant}/orders`}
            className="relative text-gray-200 hover:text-green-400 font-medium transition-colors after:content-[''] after:block after:w-0 after:h-[2px] after:bg-green-400 after:transition-all after:duration-300 hover:after:w-full"
          >
            My Orders
          </Link>
          <Link
            to={`/menu/${slug}`}
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 transition-transform shadow-lg"
          >
            Logout
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-start px-6 pb-4 space-y-4 bg-gray-900/80 backdrop-blur-xl border-t border-gray-700">
          <Link
            to={`/menu/${restaurant}`}
            className="text-gray-200 hover:text-green-400 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Menu
          </Link>
          <Link
            to={`/menu/${restaurant}/cart`}
            className="text-gray-200 hover:text-green-400 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Cart
          </Link>
          <Link
            to={`/menu/${restaurant}/orders`}
            className="text-gray-200 hover:text-green-400 font-medium"
            onClick={() => setIsOpen(false)}
          >
            My Orders
          </Link>
          <Link
            to={`/menu/${slug}`}
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 transition-transform shadow-lg"
          >
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
};

export default CustomerNavbar;
