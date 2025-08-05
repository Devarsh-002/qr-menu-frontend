import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api.config";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [selectedRole, setSelectedRole] = useState("admin");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginEndpoint =
        selectedRole === "admin" ? "/admin/login" : "/restaurant/login";

      const res = await api.post(loginEndpoint, form);
      const { token, slug } = res.data;

      if (!token) {
        toast.error("Invalid login response");
        return;
      }

      localStorage.setItem("token", token);

      if (selectedRole === "admin") {
        localStorage.setItem("role", "superadmin");
        toast.success("Admin login successful!");
        navigate("/admin");
      } else {
        localStorage.setItem("role", "restaurant");
        if (slug) localStorage.setItem("slug", slug);
        toast.success("Restaurant login successful!");
        navigate("/restaurant");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Admin / Restaurant Login
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Login as:
            </label>
            <select
              value={selectedRole}
              onChange={handleRoleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-900/40 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="admin">Admin</option>
              <option value="restaurant">Restaurant</option>
            </select>
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-900/40 border border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-900/40 border border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform shadow-lg ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Customer Redirect */}
        <p className="mt-6 text-center text-gray-300 text-sm">
          Are you a customer?{" "}
          <a
            href="/customer/login"
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
