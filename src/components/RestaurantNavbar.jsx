import { Link, useNavigate } from "react-router-dom";

const RestaurantNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-blue-700 text-white p-4 mb-6">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <div className="flex gap-6">
          <Link to="/restaurant" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/restaurant/orders" className="hover:underline">
            Orders
          </Link>
          <Link to="/restaurant/qr" className="hover:underline">
            QR Code
          </Link>
        </div>
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default RestaurantNavbar;
