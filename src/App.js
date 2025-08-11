import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import { CartContext } from './context/CartContext';
import logo from './assets/logo.jpg';
import { ShoppingCart, LogOut } from 'lucide-react';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';
import AdminInbox from './pages/AdminInbox';
import AdminHome from './pages/AdminHome';
import AdminLogin from './pages/AdminLogin';
import AdminRoute from './components/AdminRoute';
import WelcomePage from './pages/WelcomePage';

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white text-orange-600 px-6 py-3 sticky top-0 z-50 shadow-md">
  <div className="flex justify-between items-center w-full">
    {/* Left: Logo */}
    <Link to="/" className="flex items-center gap-2">
      <img
        src={logo}
        alt="KUHA BITES Logo"
        className="h-10 w-10 rounded-full border-2 border-orange-500 shadow-md"
      />
      <span className="text-xl font-bold">KUHA BITES</span>
    </Link>

    {/* Right: Nav links and Cart */}
    <div className="flex items-center gap-6">
      {/* Desktop Nav Links */}
      <div className="hidden md:flex space-x-6 text-lg items-center">
        <Link to="/restaurants" className="hover:text-orange-400 transition">
          Restaurants
        </Link>

        {!isAdmin ? (
          <Link
            to="/admin-login"
            className="text-sm border border-orange-500 px-3 py-1 rounded hover:bg-orange-500 hover:text-white transition"
          >
            Kuha Login
          </Link>
        ) : (
          <>
            <Link
              to="/admin-home"
              className="text-sm border border-orange-500 px-3 py-1 rounded hover:bg-orange-500 hover:text-white transition"
            >
              Admin Panel
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-sm text-red-500 border border-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </>
        )}
      </div>

      {/* Cart Icon */}
      <Link
        to="/cart"
        className="relative hover:text-orange-400 transition"
      >
        <ShoppingCart className="w-6 h-6" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {cartItems.length}
          </span>
        )}
      </Link>

      {/* Mobile menu button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-orange-600 focus:outline-none"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
    </div>
  </div>

  {/* Mobile Nav Links (below navbar) */}
  {menuOpen && (
    <div className="md:hidden flex flex-col space-y-3 mt-4 text-lg transition-all duration-300">
      <Link to="/restaurants" onClick={closeMenu} className="hover:text-orange-400 transition">
        Restaurants
      </Link>

      {!isAdmin ? (
        <Link
          to="/admin-login"
          onClick={closeMenu}
          className="text-sm border border-orange-500 px-3 py-1 rounded hover:bg-orange-500 hover:text-white transition w-fit"
        >
          Kuha Login
        </Link>
      ) : (
        <>
          <Link
            to="/admin-home"
            onClick={closeMenu}
            className="text-sm border border-orange-500 px-3 py-1 rounded hover:bg-orange-500 hover:text-white transition w-fit"
          >
            Admin Panel
          </Link>
          <button
            onClick={() => {
              handleLogout();
              closeMenu();
            }}
            className="flex items-center gap-1 text-sm text-red-500 border border-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition w-fit"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </>
      )}
    </div>
  )}
</nav>

  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public pages */}
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurant/:id" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Admin login */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected admin routes */}
        <Route
          path="/admin-home"
          element={
            <AdminRoute>
              <AdminHome />
            </AdminRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <AdminRoute>
              <Orders />
            </AdminRoute>
          }
        />
        <Route
          path="/admin-menu"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/adminInbox"
          element={
            <AdminRoute>
              <AdminInbox />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
