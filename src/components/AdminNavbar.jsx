import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 mb-6">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex gap-6">
          <Link to="/admin" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/admin/restaurants" className="hover:underline">
            Restaurants
          </Link>
          <Link to="/admin/customers" className="hover:underline">
            Customers
          </Link>
        </div>
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
