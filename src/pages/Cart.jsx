import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api.config";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../pages/CheckoutForm";
import CustomerNavbar from "../components/CustomerNavbar";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Cart = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [clientSecret, setClientSecret] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const total = storedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total.toFixed(2));
  }, []);

  const updateTotal = (updatedCart) => {
    const total = updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total.toFixed(2));
  };

  const handleQuantityChange = (dishId, delta) => {
    const updated = cart.map((item) =>
      item.dishId === dishId
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    updateTotal(updated);
  };

  const handleRemove = (dishId, name) => {
    const updated = cart.filter((item) => item.dishId !== dishId);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    updateTotal(updated);

    toast.info(`${name} removed from cart`);
  };

  
  if (showPayment && clientSecret) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm cart={cart} slug={slug} totalAmount={totalAmount} />
      </Elements>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <CustomerNavbar restaurant={slug} />

      <div className="w-full px-4 py-6 sm:px-8 sm:py-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-400">
          Your Cart
        </h2>

        {cart.length === 0 ? (
          <div className="text-center text-gray-400 text-lg mt-12">
            <p className="mb-6">Your cart is empty.</p>
            <button
              onClick={() => navigate(`/menu/${slug}`)}
              className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transition-transform shadow-lg text-white"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <ul className="space-y-6 max-w-4xl mx-auto">
              {cart.map((item) => (
                <li
                  key={item.dishId}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-5 flex flex-col sm:flex-row items-center justify-between border border-white/10 transition-transform hover:scale-[1.02]"
                >
                  {/* Dish Info */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                        No Image
                      </div>
                    )}
                    <div>
                      <h4 className="text-lg font-semibold text-white">
                        {item.name}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex gap-3 mt-2">
                        <button
                          onClick={() => handleQuantityChange(item.dishId, -1)}
                          disabled={item.quantity === 1}
                          className={`w-8 h-8 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 transition ${
                            item.quantity === 1 ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          -
                        </button>
                        <span className="text-white">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.dishId, 1)}
                          className="w-8 h-8 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 transition hover:scale-105"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item.dishId, item.name)}
                    className="mt-4 sm:mt-0 text-red-400 hover:text-red-300 font-semibold transition hover:scale-105"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            {/* Sticky Cart Summary */}
            <div className="sticky bottom-0 bg-gray-900/70 backdrop-blur-lg border-t border-gray-700 mt-10 p-6 flex flex-col sm:flex-row items-center justify-between max-w-4xl mx-auto rounded-t-2xl">
              <p className="text-xl font-bold text-white">
                Total: ${totalAmount}
              </p>
              <button
                onClick={() => navigate(`/menu/${slug}/checkout`)}
                className="mt-4 sm:mt-0 px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transition-transform shadow-lg text-white"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
