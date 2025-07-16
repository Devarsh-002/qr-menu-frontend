import { useSearchParams, Link } from "react-router-dom";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const slug = searchParams.get("slug");

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Order Placed!
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your order.
      </p>

      {sessionId && slug && (
        <Link
          to={`/menu/${slug}/track?sessionId=${sessionId}`}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Track Your Order
        </Link>
      )}
    </div>
  );
};

export default OrderSuccess;
