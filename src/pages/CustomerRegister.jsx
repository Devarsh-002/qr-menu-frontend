import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import api from "../api/api.config";
import { toast } from "react-toastify";

const CustomerRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get("redirect");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/customer/register", formData);
      localStorage.setItem("customerToken", res.data.token);
      toast.success("Registered successfully!");

      if (redirect) {
        navigate(redirect);
      } else {
        navigate("/customer/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 sm:p-10 w-full max-w-md">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-400">
          Customer Register
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-900/40 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-900/40 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-900/40 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transition-transform shadow-lg ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-6 text-gray-300 text-sm">
          Already have an account?{" "}
          <Link
            to={`/customer/login${redirect ? `?redirect=${redirect}` : ""}`}
            className="text-indigo-400 hover:text-indigo-300 underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CustomerRegister;
