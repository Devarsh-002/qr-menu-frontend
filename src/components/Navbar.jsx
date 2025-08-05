// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        QR Menu
      </Link>
      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        ) : (
          <>
            <span>{user.email}</span>
            <button onClick={logout} className="bg-red-500 px-2 py-1 rounded">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
