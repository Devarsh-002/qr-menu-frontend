import { Navigate } from "react-router-dom";

const PrivateRoute = ({ allowed, children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;

  if (!allowed.includes(role)) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;
