import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api.config";
import { toast } from "react-toastify";
import CategorySection from "../components/CategorySection";
import CustomerNavbar from "../components/CustomerNavbar";

const CustomerMenu = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await api.get(`/menu/${slug}/items`);
        setRestaurant(res.data.restaurant);
        setCategories(res.data.categories);
        setDishes(res.data.dishes);
      } catch (err) {
        console.error("Menu fetch error:", err.response || err);
        toast.error("Failed to load menu");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenu();
  }, [slug]);

  const addToCart = (dish) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((item) => item.dishId === dish._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({
        dishId: dish._id,
        name: dish.name,
        price: dish.price,
        imageUrl: dish.image,
        quantity: 1,
      });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success(`${dish.name} added to cart`);
  };

  const goToCart = () => {
    navigate(`/menu/${slug}/cart`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-visible">
      {/* Navbar */}
      <CustomerNavbar restaurant={slug} />

      {/* Main Content */}
      <div className="w-full px-4 sm:px-8 lg:px-12 py-8">
        {/* Restaurant Name */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 text-indigo-400">
          {restaurant?.name ? `${restaurant.name} Menu` : "Menu"}
        </h2>

        {/* Loading State */}
        {isLoading ? (
          <p className="text-gray-400 text-center">Loading menu...</p>
        ) : categories.length === 0 ? (
          <p className="text-gray-400 text-center">No categories available</p>
        ) : (
          <div className="space-y-10">
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/10 w-full"
              >
                <CategorySection
                  category={cat}
                  dishes={dishes.filter((d) => d.category === cat._id)}
                  addToCart={addToCart}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-[9999]">
          <button
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl hover:scale-105 transition-transform text-white font-semibold"
            onClick={goToCart}
          >
            View Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerMenu;
