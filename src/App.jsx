import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import PrivateRoute from "./components/PrivateRoute";
import CustomerMenu from "./pages/CustomerMenu";
import QRCodePage from "./pages/QRCodePage";
import Cart from "./pages/Cart";
import AdminHome from "./pages/AdminHome";
import ManageRestaurants from "./pages/ManageRestaurants";
import ManageCustomers from "./pages/ManageCustomers";
import RestaurantOrders from "./pages/RestaurantOrders";
import OrderSuccess from "./pages/OrderSuccess";
import OrderTracking from "./pages/OrderTracking";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Navbar />
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute allowed={["admin"]}>
                <AdminHome />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/restaurants"
            element={
              <PrivateRoute allowed={["admin"]}>
                <ManageRestaurants />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/customers"
            element={
              <PrivateRoute allowed={["admin"]}>
                <ManageCustomers />
              </PrivateRoute>
            }
          />
          <Route
            path="/restaurant"
            element={
              <PrivateRoute allowed={["restaurant"]}>
                <RestaurantDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/restaurant/qr"
            element={
              <PrivateRoute allowed={["restaurant"]}>
                <QRCodePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/menu/:slug"
            element={<CustomerMenu />}
          />
          <Route path="/menu/:slug" element={<CustomerMenu />} />
          <Route path="/menu/:slug/cart" element={<Cart />} />
          <Route
            path="/restaurant/orders"
            element={
              <PrivateRoute allowed={["restaurant"]}>
                <RestaurantOrders />
              </PrivateRoute>
            }
          />
          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />
          <Route
            path="/menu/:slug/track"
            element={<OrderTracking />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
