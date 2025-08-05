import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import api from "../api/api.config";
import { toast } from "react-toastify";

const CheckoutFormInner = ({ slug, cart, navigate, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    try {
      const cardNumberElement = elements.getElement(CardNumberElement);

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
        },
      });

      if (error) {
        toast.error(error.message || "Payment failed");
        setLoading(false);
        return;
      }

      // ✅ Place the order
      try {
        const restaurantSlugRes = await api.get(`/menu/${slug}`);
        const restaurantId = restaurantSlugRes.data._id;

        const items = cart.map((item) => ({
          dish: item.dishId,
          dishId: item.dishId,
          quantity: item.quantity,
        }));

        const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const token = localStorage.getItem("customerToken");

        const orderRes = await api.post(
          "/place",
          { restaurantId, items, totalAmount },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (orderRes.status === 200 || orderRes.status === 201) {
          localStorage.removeItem("cart");
          toast.success("Payment successful! Order placed.");
          navigate(`/menu/${slug}/success?orderId=${orderRes.data.orderId}`);
        } else {
          toast.error("Order failed. Try again.");
        }
      } catch (err) {
        toast.error("Payment succeeded but order failed. Contact support.");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  const totalAmount = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {/* Payment Section */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 p-6">
        <h3 className="text-xl font-semibold text-indigo-400 mb-6">
          Enter Payment Details
        </h3>

        {/* Card Number */}
        <label className="block text-sm text-gray-400 mb-2">Card Number</label>
        <div className="p-3 rounded-lg bg-gray-900/40 border border-gray-700 mb-4">
          <CardNumberElement
            options={{
              style: {
                base: { color: "#fff", fontSize: "16px", "::placeholder": { color: "#9CA3AF" } },
                invalid: { color: "#EF4444" },
              },
            }}
          />
        </div>

        {/* Expiry & CVC */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Expiry</label>
            <div className="p-3 rounded-lg bg-gray-900/40 border border-gray-700">
              <CardExpiryElement
                options={{
                  style: {
                    base: { color: "#fff", fontSize: "16px" },
                  },
                }}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">CVC</label>
            <div className="p-3 rounded-lg bg-gray-900/40 border border-gray-700">
              <CardCvcElement
                options={{
                  style: {
                    base: { color: "#fff", fontSize: "16px" },
                  },
                }}
              />
            </div>
          </div>
        </div>

        

        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-105 transition-transform shadow-md ${loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
        >
          {loading ? "Processing..." : `Pay $${totalAmount}`}
        </button>
      </div>

      {/* Order Summary */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 p-6">
        <h3 className="text-xl font-semibold text-indigo-400 mb-4">
          Order Summary
        </h3>
        <div className="max-h-64 overflow-y-auto space-y-4">
          {cart.map((item) => (
            <div
              key={item.dishId}
              className="flex justify-between items-center border-b border-gray-700 pb-2"
            >
              <div>
                <p className="font-medium text-white">{item.name}</p>
                <p className="text-gray-400 text-sm">
                  {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
              <p className="text-white font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t border-gray-700 pt-4 flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span className="text-indigo-400">${totalAmount}</span>
        </div>
      </div>
    </form>
  );
};

export default CheckoutFormInner;
