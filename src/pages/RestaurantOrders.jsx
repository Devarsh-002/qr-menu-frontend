import { useEffect, useState } from "react";
import API_BASE_URL from "../api/api.config";
import RestaurantNavbar from "../components/RestaurantNavbar";

const RestaurantOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const restaurantId = localStorage.getItem("restaurantId");

  const fetchOrders = async () => {
    const res = await fetch(
      `${API_BASE_URL}/order/by-restaurant/${restaurantId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    setOrders(data);
  };

  const updateStatus = async (orderId, status) => {
    const res = await fetch(`${API_BASE_URL}/order/${orderId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    if (res.ok) fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <RestaurantNavbar />
      <div className="p-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Customer Orders</h2>

        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="border rounded p-4 mb-4 bg-white shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">
                  Order from {order.customerId?.name}
                </h3>
                <span className="text-sm text-gray-500">
                  Phone: {order.customerId?.phone}
                </span>
              </div>
              <ul className="mb-2 text-sm">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.dishId?.name} x {item.quantity} — $
                    {(item.dishId?.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
              <p className="text-right font-bold mb-2">
                Total: ${order.total}
              </p>

              <div className="flex justify-between items-center">
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  className="border p-1 rounded"
                >
                  {[
                    "placed",
                    "preparing",
                    "ready",
                    "delivered",
                    "cancelled",
                  ].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <span className="text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default RestaurantOrders;
