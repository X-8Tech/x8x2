import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ClipboardList,
  UtensilsCrossed,
  MessageCircle,
  LogOut,
  Home as HomeIcon,
} from "lucide-react";
import logo from "../assets/logo.jpg";

const AdminHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminUsername");
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-8 sm:py-10">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8 sm:mb-10 text-center relative">
        <div className="absolute right-0 top-0 flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-1 px-3 py-1 border rounded text-sm text-gray-700 hover:bg-gray-200"
          >
            <HomeIcon className="w-4 h-4" /> Home
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-1 px-3 py-1 border border-red-500 text-red-600 rounded text-sm hover:bg-red-100"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        <div className="flex flex-col items-center mt-12 sm:mt-0">
          <img
            src={logo}
            alt="Logo"
            className="w-20 h-20 rounded-full border-4 border-orange-500 shadow-lg"
          />
          <h1 className="text-2xl sm:text-3xl font-bold mt-4 text-gray-800">
            Welcome Admin 👋
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Manage everything with ease and style.
          </p>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Link
          to="/orders"
          className="bg-white border shadow-md rounded-xl p-5 sm:p-6 hover:shadow-xl transition group"
        >
          <ClipboardList className="text-orange-500 w-9 h-9 sm:w-10 sm:h-10 mb-3 group-hover:scale-110 transition" />
          <h3 className="text-base sm:text-lg font-bold text-gray-800">
            View Orders
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Check all submitted food orders.
          </p>
        </Link>

        <Link
          to="/admin-menu"
          className="bg-white border shadow-md rounded-xl p-5 sm:p-6 hover:shadow-xl transition group"
        >
          <UtensilsCrossed className="text-orange-500 w-9 h-9 sm:w-10 sm:h-10 mb-3 group-hover:scale-110 transition" />
          <h3 className="text-base sm:text-lg font-bold text-gray-800">
            Manage Menu
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Add, edit, or remove menu items and restaurants.
          </p>
        </Link>

        <Link
          to="/adminInbox"
          className="bg-white border shadow-md rounded-xl p-5 sm:p-6 hover:shadow-xl transition group"
        >
          <MessageCircle className="text-orange-500 w-9 h-9 sm:w-10 sm:h-10 mb-3 group-hover:scale-110 transition" />
          <h3 className="text-base sm:text-lg font-bold text-gray-800">
            Inbox
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            View user messages sent through the contact form.
          </p>
        </Link>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-gray-400 text-xs sm:text-sm">
        KUHA BITES Admin Panel © {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default AdminHome;
