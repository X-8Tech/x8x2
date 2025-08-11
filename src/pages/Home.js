import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import FloatingMessageButton from "../context/FloatingMessageButton";
import FloatingWhatsAppButton from "../context/FloatingWhatsAppButton";
import InstallAppButton from '../components/InstallAppButton';

const Home = () => {
  const categories = [
    { name: 'Fast Food 🍟', path: '/restaurant/1' },
    { name: 'Swahili Dishes 🥘', path: '/restaurant/1' },
    { name: 'Desserts 🍰', path: '/restaurant/2' },
    { name: 'Beverages 🧃', path: '/restaurant/2' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center h-[90vh] flex items-center justify-center text-center text-white">
        <div className="bg-black bg-opacity-60 p-6 md:p-10 rounded-lg mx-4">
          <div className="flex flex-col items-center gap-3 mb-4">
            <Link to="/">
              <img
                src={logo}
                alt="KUHA BITES Logo"
                className="h-20 w-20 rounded-full shadow-lg border-4 border-white animate-pulse hover:scale-105 transition duration-300"
              />
            </Link>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide">KUHA BITES</h1>
          </div>
          <p className="text-lg md:text-xl mb-6 max-w-xl mx-auto px-2">
            Warning: Our Swahili dishes may cause excessive happiness and spontaneous dance moves! 🌴💃
          </p>
          <Link
            to="/restaurants"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-lg rounded-full transition shadow-lg"
          >
            Start Your Order
          </Link>
          {/* Install App Button (below CTA) */}
          <div className="fixed bottom-6 left-6 z-50">
            <InstallAppButton />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16 bg-orange-50 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">Why Choose KUHA BITES?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
          <div>
            <span className="text-4xl">⚡</span>
            <h3 className="text-lg md:text-xl font-semibold mt-3">Fast Delivery</h3>
            <p className="text-gray-600 mt-2">We’re so fast, even your hunger won’t see us coming! 🚀</p>
          </div>
          <div>
            <span className="text-4xl">🍲</span>
            <h3 className="text-lg md:text-xl font-semibold mt-3">Tasty Meals</h3>
            <p className="text-gray-600 mt-2">Flavor explosion guaranteed — no safety goggles needed! 🤯</p>
          </div>
          <div>
            <span className="text-4xl">💸</span>
            <h3 className="text-lg md:text-xl font-semibold mt-3">Affordable Prices</h3>
            <p className="text-gray-600 mt-2">Deliciousness that won’t leave your wallet in tears. 💰😄</p>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Top Categories</h2>
        <div className="flex overflow-x-auto gap-4 px-4 md:justify-center scrollbar-thin">
          {categories.map((cat, i) => (
            <Link
              key={i}
              to={cat.path}
              className="whitespace-nowrap bg-orange-100 text-orange-800 px-5 py-3 rounded-full shadow hover:scale-105 transition cursor-pointer"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-500 text-white py-12 md:py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Craving something delicious?</h2>
        <p className="mb-6 text-base md:text-lg">Click that button. Your stomach just sent you a love letter. 💌🍽️</p>
        <Link
          to="/restaurants"
          className="bg-white text-orange-600 px-6 py-3 text-lg font-semibold rounded-full shadow hover:bg-gray-100"
        >
          Browse Restaurants
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} KUHA BITES. All rights reserved.</p>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
        <FloatingMessageButton />
        <FloatingWhatsAppButton phone="254791777572" />
      </div>
    </div>
  );
};

export default Home;
