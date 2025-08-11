import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.jpg";
import { Loader2, Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ toggle
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://kuha.pythonanywhere.com/api/admin-login/", {
        username,
        password,
      });

      if (response.data.is_admin) {
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("adminUsername", response.data.username);
        navigate("/admin-home");
      } else {
        setError("Not an admin user.");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm text-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="KUHA BITES Logo"
            className="w-20 h-20 rounded-full border-4 border-orange-500 shadow-md"
          />
        </div>

        <h2 className="text-2xl font-bold mb-2 text-gray-800">Admin Login</h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter your credentials to access the dashboard.
        </p>

        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring focus:border-orange-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password Input with Toggle */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-orange-500 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-2 rounded font-semibold flex justify-center items-center gap-2 transition ${
            loading
              ? "bg-orange-300 text-white cursor-not-allowed"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Login"}
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
