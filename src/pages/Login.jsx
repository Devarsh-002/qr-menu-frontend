import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../api/api.config";

const Login = () => {
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const endpoint = role === "admin" ? "admin" : "restaurant";

    try {
      const res = await fetch(`${API_BASE_URL}/auth/${endpoint}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", role);

        // ✅ Extract and store restaurantId from JWT
        const payload = JSON.parse(atob(data.token.split('.')[1]));
        if (role === "restaurant") {
          localStorage.setItem("restaurantId", payload.id);
        }

        navigate(role === "admin" ? "/admin" : "/restaurant");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Login request failed");
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

      <div className="flex gap-4 justify-center mb-4">
        {["admin", "restaurant"].map(r => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`px-4 py-2 rounded ${role === r ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          type="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full border p-2 rounded"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
