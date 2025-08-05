import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const OrderSuccess = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");

  const [showConfetti, setShowConfetti] = useState(true);
  const [countdown, setCountdown] = useState(10);

  // Auto redirect after 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      navigate(`/menu/${slug}`);
    }

    return () => clearInterval(timer);
  }, [countdown, navigate, slug]);

  // Stop confetti after 5 seconds
  useEffect(() => {
    const confettiTimer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(confettiTimer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      {showConfetti && <Confetti />}

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 sm:p-10 text-center max-w-lg w-full border border-white/10">
        {/* Success Icon */}
        <div className="flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-green-400">
          Order Placed Successfully!
        </h2>

        {/* Order ID */}
        <p className="text-lg text-gray-300 mb-6">
          Your order ID is:{" "}
          <span className="font-semibold text-white">{orderId || "N/A"}</span>
        </p>

        {/* Track Order Button */}
        <Link
          to={`/menu/${slug}/track/${orderId}`}
          className="inline-block px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-105 transition-transform shadow-lg text-white"
        >
          Track Your Order
        </Link>

        {/* Back to Menu */}
        <div className="mt-6">
          <Link
            to={`/menu/${slug}`}
            className="text-indigo-400 hover:text-indigo-300 text-sm"
          >
            Back to Menu
          </Link>
        </div>

        {/* Countdown Info */}
        <p className="mt-4 text-gray-400 text-sm">
          Redirecting to menu in {countdown}s...
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;
