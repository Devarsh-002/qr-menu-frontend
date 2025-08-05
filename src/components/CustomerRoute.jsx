// src/components/CustomerRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";

const CustomerPrivateRoute = () => {
  const token = localStorage.getItem("customerToken");
  const location = useLocation();

  // If not logged in, redirect with current path as redirect param
  if (!token) {
    const redirectPath = encodeURIComponent(location.pathname);
    return <Navigate to={`/customer/login?redirect=${redirectPath}`} replace />;
  }

  // Otherwise, render the requested child route
  return <Outlet />;
};

export default CustomerPrivateRoute;
