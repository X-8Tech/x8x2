import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';

const Menu = () => {
  const { id } = useParams(); // restaurant ID
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, itemsRes] = await Promise.all([
          axios.get(`https://kuha.pythonanywhere.com/api/categories/?restaurant_id=${id}`),
          axios.get(`https://kuha.pythonanywhere.com/api/menu/restaurant/${id}/`)
        ]);
        setCategories(categoriesRes.data);
        setItems(itemsRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load menu or categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const allCategoryNames = ['All', ...categories.map(c => c.name)];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <p className="text-center text-lg text-gray-500 animate-pulse">Loading menu...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-white py-16 px-6 relative">
      {/* Responsive Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-6">
        🍛 Select Your Meal
      </h1>

      {/* Search Input */}
      <div className="max-w-3xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search meals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Category Filters - Horizontally Scrollable on small screens */}
      <div className="flex overflow-x-auto gap-3 mb-10 px-1 sm:justify-center scrollbar-hide">
        {allCategoryNames.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium border whitespace-nowrap transition ${
              selectedCategory === category
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-orange-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filtered Menu Items */}
      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No meals found.</p>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-100 rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={item.image_url || '/placeholder.png'}
                alt={item.name}
                onError={(e) => (e.currentTarget.src = '/placeholder.png')}
                className="h-52 w-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h2>
                <p className="text-orange-600 font-semibold text-lg mb-1">Ksh {item.price}</p>
                <p className="text-gray-400 text-sm mb-4">{item.category}</p>
                <button
                  onClick={() => {
                    addToCart({ ...item, quantity: 1 });
                    setFeedback(`${item.name} added to cart`);
                    setTimeout(() => setFeedback(''), 2000);
                  }}
                  className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Fixed Feedback Message at Bottom */}
      {feedback && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg text-sm">
            {feedback}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
