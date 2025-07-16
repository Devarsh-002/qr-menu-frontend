import { useCart } from "../context/CartContext";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API_BASE_URL from "../api/api.config";

const Cart = () => {
  const { slug } = useParams();
  const { cart, updateQty, removeItem, clearCart } = useCart();
  const [restaurantId, setRestaurantId] = useState("");
  const [customer, setCustomer] = useState({ name: "", phone: "" });
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  // Fetch restaurant ID by slug
  useEffect(() => {
    const getId = async () => {
      const res = await fetch(`${API_BASE_URL}/restaurant/menu/slug/${slug}`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setRestaurantId(data[0].restaurantId);
      }
    };
    getId();
  }, [slug]);

  const handleCheckout = async () => {
    if (!customer.name || !customer.phone) {
      return alert("Please enter your name and phone.");
    }

    try {
      const res = await fetch(`${API_BASE_URL}/payment/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          customerInfo: customer,
          slug,
          restaurantId,
        }),
      });

      const data = await res.json();
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {cart.map((item) => (
              <li
                key={item._id}
                className="p-3 bg-white shadow-sm rounded flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    ${item.price} x {item.qty}
                  </p>
                  <p className="text-sm font-bold text-blue-600">
                    ${item.price * item.qty}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <input
                    type="number"
                    min={1}
                    value={item.qty}
                    onChange={(e) => updateQty(item._id, parseInt(e.target.value))}
                    className="border w-16 text-center p-1 rounded"
                  />
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-600 text-sm mt-1"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mb-6 text-right">
            <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
          </div>

          <div className="grid gap-4 mb-6">
            <input
              type="text"
              placeholder="Your name"
              value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="tel"
              placeholder="Phone number"
              value={customer.phone}
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              className="border p-2 rounded"
              required
            />
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-green-600 text-white py-3 rounded font-semibold"
          >
            Pay & Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
