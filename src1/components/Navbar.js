import { useState, useEffect } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useScroll } from "../components/ScrollContext";

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setTargetId } = useScroll();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (id) => {
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      setTargetId(id);
      navigate("/");
    }
    setMobileMenuOpen(false);
  };

  const handleAdminClick = () => {
    navigate("/admin");
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { label: "Get Involved", id: "get-involved" },
    { label: "Contact", id: "contact" },
    { label: "Articles", id: "articles" },
    { label: "Events", id: "events" },
    { label: "About", id: "about" },
  ];

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm transition-shadow duration-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3">
        {/* Logo */}

      <Link to="/" className="flex items-center gap-3">
        <img
          src="/images/imarikalogo.jpeg"
          alt="Imarika Logo"
          className="h-14 w-auto rounded-lg shadow-sm"
        />
        <span className="text-xl sm:text-2xl font-bold text-gray-800">
          Imarika <span className="text-orange-500">Foundation</span>
        </span>
      </Link>


        {/* Desktop Navigation */}
        <nav className="hidden md:flex relative items-center gap-6 px-4">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gray-300 z-0" />
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-300 z-0" />
          {menuItems.map((item) => (
            <div key={item.id} className="relative group z-10 px-2 py-3">
              <button
                onClick={() => handleNavClick(item.id)}
                className="text-gray-700 font-medium transition-colors duration-300 hover:text-orange-600"
              >
                {item.label}
              </button>
              <div className="absolute top-0 left-0 h-[2px] w-full bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              <div className="absolute bottom-0 left-0 h-[2px] w-full bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
            </div>
          ))}
          {/* Admin Button */}
          <button
            onClick={handleAdminClick}
            className="ml-4 inline-flex items-center gap-2 px-4 py-2 rounded-md border border-blue-600 text-blue-600 font-semibold bg-transparent hover:bg-blue-600 hover:text-white transition"
          >
            <ShieldCheck className="w-5 h-5" />
            {isLoggedIn ? "Admin Panel" : "Login"}
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-white border-t transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-[500px] py-3" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-4 px-6 text-gray-700 text-base font-medium">
          {menuItems.map((item) => (
            <div key={item.id} className="relative group py-2">
              <button
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left text-gray-700 hover:text-orange-600 transition-colors duration-300"
              >
                {item.label}
              </button>
              <div className="absolute top-0 left-0 h-[2px] w-full bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <div className="absolute bottom-0 left-0 h-[2px] w-full bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
          {/* Mobile Admin Button */}
          <button
            onClick={handleAdminClick}
            className="mt-4 inline-flex items-center justify-center gap-2 border border-blue-600 text-blue-600 font-semibold py-2 px-4 rounded-md bg-transparent hover:bg-blue-600 hover:text-white transition"
          >
            <ShieldCheck className="w-5 h-5" />
            {isLoggedIn ? "Admin Panel" : "Login"}
          </button>
        </nav>
      </div>
    </header>
  );
}
