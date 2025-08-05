import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion} from "framer-motion";

// Components
import ToastManager from "./components/ToastManager";
import PrivateRoute from "./components/PrivateRoute";
import CustomerRoute from "./components/CustomerRoute";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AdminHome from "./pages/AdminHome";
import ManageRestaurants from "./pages/ManageRestaurants";
import ManageCustomers from "./pages/ManageCustomers";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import RestaurantOrders from "./pages/RestaurantOrders";
import ManageMenu from "./pages/ManageMenu";
import ManageDishes from "./pages/ManageDishes";
import CustomerMenu from "./pages/CustomerMenu";
import QRCodePage from "./pages/QRCodePage";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess";
import OrderTracking from "./pages/OrderTracking";
import CheckoutForm from "./pages/CheckoutForm";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerRegister from "./pages/CustomerRegister";
import CustomerOrders from "./pages/CustomerOrders";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50">
        <ToastManager />
      </div>

      {/* Animated Page Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex-1"
        >
          <Routes location={location}>
            {/* Redirect root to /login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Auth Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/customer/login" element={<CustomerLogin />} />
            <Route path="/customer/register" element={<CustomerRegister />} />

            {/* Admin Protected Routes */}
            <Route
              path="/admin"
              element={
                <GlassWrapper>
                  <PrivateRoute allowed={["superadmin"]}>
                    <AdminDashboard />
                  </PrivateRoute>
                </GlassWrapper>
              }
            />
            <Route
              path="/admin/home"
              element={
                <GlassWrapper>
                  <PrivateRoute allowed={["superadmin"]}>
                    <AdminHome />
                  </PrivateRoute>
                </GlassWrapper>
              }
            />
            <Route
              path="/admin/restaurants"
              element={
                <GlassWrapper>
                  <PrivateRoute allowed={["superadmin"]}>
                    <ManageRestaurants />
                  </PrivateRoute>
                </GlassWrapper>
              }
            />
            <Route
              path="/admin/customers"
              element={
                <GlassWrapper>
                  <PrivateRoute allowed={["superadmin"]}>
                    <ManageCustomers />
                  </PrivateRoute>
                </GlassWrapper>
              }
            />

            {/* Restaurant Protected Routes */}
            <Route
              path="/restaurant"
              element={
                <GlassWrapper>
                  <PrivateRoute allowed={["restaurant"]}>
                    <RestaurantDashboard />
                  </PrivateRoute>
                </GlassWrapper>
              }
            />
            <Route
              path="/restaurant/orders"
              element={
                <GlassWrapper>
                  <PrivateRoute allowed={["restaurant"]}>
                    <RestaurantOrders />
                  </PrivateRoute>
                </GlassWrapper>
              }
            />
            <Route
              path="/restaurant/menu"
              element={
                <GlassWrapper>
                  <PrivateRoute allowed={["restaurant"]}>
                    <ManageMenu />
                  </PrivateRoute>
                </GlassWrapper>
              }
            />
            <Route
              path="/restaurant/dishes"
              element={
                <GlassWrapper>
                  <PrivateRoute allowed={["restaurant"]}>
                    <ManageDishes />
                  </PrivateRoute>
                </GlassWrapper>
              }
            />
            <Route
              path="/menu/:slug/qr"
              element={
                <GlassWrapper>
                  <PrivateRoute allowed={["restaurant"]}>
                    <QRCodePage />
                  </PrivateRoute>
                </GlassWrapper>
              }
            />

            {/* Customer Protected Routes */}
            <Route element={<CustomerRoute />}>
              <Route
                path="/menu/:slug"
                element={
                    <CustomerMenu />
                  
                }
              />
              <Route
                path="/menu/:slug/cart"
                element={
                    <Cart />
                }
              />
              <Route
                path="/menu/:slug/checkout"
                element={
                    <CheckoutForm />
                }
              />
              <Route
                path="/menu/:slug/success"
                element={
                  <GlassWrapper>
                    <OrderSuccess />
                  </GlassWrapper>
                }
              />
              <Route
                path="/menu/:slug/track/:orderId"
                element={
                    <OrderTracking />
                }
              />
              <Route
                path="/menu/:slug/orders"
                element={
                  <GlassWrapper>
                    <CustomerOrders />
                  </GlassWrapper>
                }
              />
            </Route>
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/**
 * ✅ Responsive GlassWrapper Component
 * Full width on mobile, progressive max-width on larger screens.
 */
const GlassWrapper = ({ children }) => (
  <div className="w-full px-2 sm:px-4 md:px-6 py-4">
    <div
      className="
        w-full
        max-w-full 
        sm:max-w-3xl 
        lg:max-w-5xl 
        xl:max-w-6xl
        mx-auto
        rounded-3xl 
        bg-white/10 dark:bg-gray-800/40 
        shadow-xl 
        backdrop-blur-md 
        p-4 sm:p-6 md:p-8
        flex flex-col
      "
    >
      {children}
    </div>
  </div>
);


export default App;
