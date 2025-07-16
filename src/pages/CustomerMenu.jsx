import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API_BASE_URL from "../api/api.config";
import { useCart } from "../context/CartContext";

const CustomerMenu = () => {
  const { slug } = useParams(); 
  const [dishes, setDishes] = useState([]);
  const [grouped, setGrouped] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addItem, cart } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/restaurant/menu/slug/${slug}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Invalid format");
        setDishes(data);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to load menu. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [slug]);

  useEffect(() => {
    const groupedByCategory = {};
    dishes.forEach(dish => {
      const category = dish?.categoryId?.name || "Uncategorized";
      if (!groupedByCategory[category]) groupedByCategory[category] = [];
      groupedByCategory[category].push(dish);
    });
    setGrouped(groupedByCategory);
  }, [dishes]);

  if (loading) return <p className="text-center mt-10">Loading menu...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Restaurant Menu</h1>

      {Object.keys(grouped).length === 0 && (
        <p className="text-center text-gray-500">No dishes available.</p>
      )}

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">{category}</h2>
          <ul className="space-y-3">
            {items.map(dish => (
              <li
                key={dish._id}
                className="p-4 bg-white rounded shadow-sm flex justify-between items-center"
              >
                <div className="w-3/4">
                  <h3 className="font-semibold">{dish.name}</h3>
                  <p className="text-sm text-gray-600">{dish.description}</p>
                  <p className="text-blue-600 font-bold">${dish.price}</p>
                </div>
                <div className="text-right">
                  {dish.image && (
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-20 h-20 object-cover rounded mb-2"
                    />
                  )}
                  <button
                    onClick={() => addItem(dish)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="fixed bottom-4 left-0 right-0 text-center">
          <Link to={`/menu/${slug}/cart`}>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg">
              View Cart ({cart.reduce((sum, item) => sum + item.qty, 0)})
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CustomerMenu;
