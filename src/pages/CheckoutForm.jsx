import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import api from "../api/api.config";
import CheckoutFormInner from "../components/CheckoutFormInner";
import CustomerNavbar from "../components/CustomerNavbar";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const { slug } = useParams();
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  useEffect(() => {
    const fetchIntent = async () => {
      try {
        const totalAmount = cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        const res = await api.post("/create-payment-intent", {
          amount: Math.round(totalAmount * 100), // Convert to cents
        });
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.error("Failed to create payment intent", err);
      }
    };

    fetchIntent();
  }, []);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#6366F1", // Indigo theme
      colorText: "#fff",
      borderRadius: "12px",
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500 mb-4"></div>
        <p className="text-lg text-gray-300">Loading payment...</p>
      </div>
    );
  }

  const totalAmount = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <CustomerNavbar restaurant={slug} />

      <div className="w-full px-4 sm:px-6 md:px-8 py-8 flex justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-2xl p-6 sm:p-8 border border-white/10">
          <h2 className="text-3xl font-bold mb-6 text-center text-indigo-400">
            Checkout
          </h2>

          {/* Order Summary */}
          <div className="bg-gray-900/50 rounded-xl p-4 mb-6 flex justify-between items-center">
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-2xl font-bold text-indigo-400">${totalAmount}</p>
          </div>

          {/* Stripe Payment Element */}
          <Elements stripe={stripePromise} options={options}>
            <CheckoutFormInner
              slug={slug}
              cart={cart}
              navigate={navigate}
              clientSecret={clientSecret}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
