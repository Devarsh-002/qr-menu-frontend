import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api.config";
import CustomerNavbar from "../components/CustomerNavbar";

const OrderTracking = () => {
  const { slug, orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        setLoading(true);
        const customerToken = localStorage.getItem("customerToken");
        const res = await api.get(`/status/${orderId}`, {
          headers: {
            Authorization: `Bearer ${customerToken}`,
          },
        });
        setOrder(res.data);
      } catch (err) {
        setError(
          err?.response?.data?.message || "Failed to fetch order status."
        );
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderStatus();
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <CustomerNavbar restaurant={slug} />

      <div className="w-full px-4 sm:px-6 py-8 flex justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-2xl border border-white/10">
          {/* Heading */}
          <h1 className="text-3xl font-bold mb-6 text-center text-indigo-400">
            Order Tracking
          </h1>

          {/* Loading State */}
          {loading ? (
            <p className="text-center text-gray-400 text-lg">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-400 font-semibold">{error}</p>
          ) : order ? (
            <>
              {/* Order Details */}
              <div className="mb-6 text-center">
                <p className="text-lg mb-2">
                  <span className="font-semibold text-gray-300">Order ID:</span>{" "}
                  {orderId}
                </p>
                <p className="text-lg mb-2">
                  <span className="font-semibold text-gray-300">Status:</span>{" "}
                  <span className="capitalize text-green-400">{order.status}</span>
                </p>
                <p className="text-lg mb-4">
                  <span className="font-semibold text-gray-300">Placed At:</span>{" "}
                  {new Date(order.placedAt).toLocaleString()}
                </p>
              </div>

              {/* Items List */}
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-indigo-400">
                  Items
                </h2>
                <ul className="space-y-3">
                  {order.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between bg-gray-900/40 rounded-lg px-4 py-3 shadow-md"
                    >
                      <span className="text-white">{item.dish.name}</span>
                      <span className="text-gray-300">
                        {item.quantity} × ${item.dish.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Total Amount */}
              <p className="text-xl font-bold text-right mt-6 text-white">
                Total: ${order.totalAmount}
              </p>
            </>
          ) : (
            <p className="text-center text-gray-400">Order not found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
