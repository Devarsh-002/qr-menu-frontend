import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/api.config";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";



const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get("redirect");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/customer/login", { email, password });
      localStorage.setItem("customerToken", res.data.token);
      toast.success("Login successful!");
      navigate(redirect || "/menu");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 sm:p-10 w-full max-w-md">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-400">
          Customer Login
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-900/40 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-gray-900/40 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transition-transform shadow-lg"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-300 text-sm">
            Don't have an account?{" "}
            <Link
              to={`/customer/register${redirect ? `?redirect=${redirect}` : ""}`}
              className="text-indigo-400 hover:text-indigo-300 underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
