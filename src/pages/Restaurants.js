import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('https://kuha.pythonanywhere.com/api/restaurants/');
        setRestaurants(response.data);
      } catch (err) {
        console.error('Error fetching restaurants:', err.message);
        setError('Failed to load restaurants.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const isFewRestaurants = restaurants.length < 3;

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-800 mb-12">
        🍽️ Discover Our Kitchens
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 text-lg animate-pulse">Loading restaurants...</p>
      ) : error ? (
        <p className="text-center text-red-600 text-lg">{error}</p>
      ) : (
        <div
          className={`max-w-7xl mx-auto gap-10 ${
            isFewRestaurants
              ? 'flex flex-wrap justify-center'
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {restaurants.map((restaurant, index) => (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white w-full max-w-sm border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {restaurant.logo ? (
                <img
                  src={restaurant.logo}
                  alt={restaurant.name}
                  className="h-56 w-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="h-56 w-full bg-orange-100 flex items-center justify-center text-5xl font-bold text-orange-600">
                  {restaurant.name.charAt(0)}
                </div>
              )}

              <div className="p-6 flex flex-col">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{restaurant.name}</h2>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                  {restaurant.description || 'No description provided.'}
                </p>
                <Link
                  to={`/restaurant/${restaurant.id}`}
                  className="mt-auto inline-block bg-orange-500 text-white px-5 py-2 rounded-full text-sm hover:bg-orange-600 transition"
                >
                  View Menu →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Restaurants;
