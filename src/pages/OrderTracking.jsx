import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import API_BASE_URL from "../api/api.config";

const OrderTracking = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const sessionId = searchParams.get("sessionId");

  useEffect(() => {
    if (!sessionId) return;

    const fetchOrder = async () => {
      const res = await fetch(`${API_BASE_URL}/order/by-session/${sessionId}`);
      const data = await res.json();
      setOrder(data);
    };

    fetchOrder();
  }, [sessionId]);

  if (!order) return <p>Loading order...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Track Your Order</h1>
      <p className="mb-4">
        Status: <span className="font-semibold">{order.status}</span>
      </p>
      <ul className="space-y-2 mb-4">
        {order.items.map((item, i) => (
          <li key={i} className="border p-2 rounded">
            {item.dishId.name} x {item.quantity}
          </li>
        ))}
      </ul>
      <p className="font-bold">Total: ${order.total}</p>
    </div>
  );
};

export default OrderTracking;
