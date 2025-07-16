import { Link } from "react-router-dom";

const CustomerNavbar = ({ restaurantId }) => {
  return (
    <nav className="bg-green-600 text-white p-4 mb-4">
      <div className="flex gap-6 justify-center">
        <Link to={`/menu/${restaurantId}`} className="hover:underline">
          Menu
        </Link>
        <Link to={`/menu/${restaurantId}/cart`} className="hover:underline">
          Cart
        </Link>
        <Link to={`/menu/${restaurantId}/track`} className="hover:underline">
          Track Order
        </Link>
      </div>
    </nav>
  );
};

export default CustomerNavbar;
