import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [categories, setCategories] = useState([]); // Restaurants with nested categories
  const [menuItems, setMenuItems] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [formItem, setFormItem] = useState({ name: '', price: '', category: '', image: null });
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get('https://kuha.pythonanywhere.com/api/restaurants/')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  };

  const fetchMenuItems = (restaurantId) => {
    setSelectedRestaurantId(restaurantId);
    axios.get(`https://kuha.pythonanywhere.com/api/menu/restaurant/${restaurantId}/`)
      .then(res => setMenuItems(res.data))
      .catch(err => console.error(err));
  };

  const handleItemChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormItem(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormItem(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleItemSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', formItem.name);
    formData.append('price', parseFloat(formItem.price));
    formData.append('category', parseInt(formItem.category));
    if (formItem.image) formData.append('image', formItem.image);

    if (editingItem) {
      axios.put(`https://kuha.pythonanywhere.com/api/menu/${editingItem.id}/update/`, formData)
        .then(() => {
          setEditingItem(null);
          setFormItem({ name: '', price: '', category: '', image: null });
          if (selectedRestaurantId) fetchMenuItems(selectedRestaurantId);
          showTempFeedback('✏️ Menu item updated successfully!');
        })
        .catch(err => {
          console.error('Update failed:', err.response?.data || err.message);
          showTempFeedback('❌ Update failed. Check console for details.');
        });
    } else {
      axios.post('https://kuha.pythonanywhere.com/api/menu/create/', formData)
        .then(() => {
          setFormItem({ name: '', price: '', category: '', image: null });
          if (selectedRestaurantId) fetchMenuItems(selectedRestaurantId);
          showTempFeedback('🍽️ Menu item added successfully!');
        })
        .catch(err => {
          console.error('Create failed:', err.response?.data || err.message);
          showTempFeedback('❌ Create failed. Check console for details.');
        });
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormItem({
      name: item.name,
      price: item.price,
      category: '', // Will be set via select
      image: null
    });
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    axios.delete(`https://kuha.pythonanywhere.com/api/menu/${itemToDelete.id}/delete/`)
      .then(() => {
        setMenuItems(prev => prev.filter(item => item.id !== itemToDelete.id));
        setItemToDelete(null);
        setShowDeleteModal(false);
        showTempFeedback('🗑️ Item deleted successfully.');
      });
  };

  const cancelDelete = () => {
    setItemToDelete(null);
    setShowDeleteModal(false);
  };

  const showTempFeedback = (message) => {
    setFeedbackMessage(message);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 3000);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-orange-600 mb-8">🍴 Admin Dashboard</h1>

      <div className="w-full max-w-3xl mb-6">
        <h2 className="text-xl font-semibold mb-2 text-center">🍽️ Restaurants</h2>
        <div className="flex justify-center">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => fetchMenuItems(cat.id)}
                className={`px-4 py-2 rounded ${
                  cat.id === selectedRestaurantId
                    ? 'bg-orange-600 text-white'
                    : 'bg-white border border-orange-400'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <form
        ref={formRef}
        onSubmit={handleItemSubmit}
        className="bg-white p-6 rounded-xl shadow max-w-xl w-full mb-12"
      >
        <h2 className="text-xl font-semibold mb-4">{editingItem ? '✏️ Edit Menu Item' : '➕ Add Menu Item'}</h2>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={formItem.name}
          onChange={handleItemChange}
          className="border p-2 rounded w-full mb-3"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formItem.price}
          onChange={handleItemChange}
          className="border p-2 rounded w-full mb-3"
          required
        />
        <select
          name="restaurant"
          value={selectedRestaurantId || ''}
          onChange={(e) => {
            const id = parseInt(e.target.value);
            setSelectedRestaurantId(id);
            setFormItem(prev => ({ ...prev, category: '' }));
          }}
          className="border p-2 rounded w-full mb-3"
          required
        >
          <option value="">Select Restaurant</option>
          {categories.map((r) => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>

        {selectedRestaurantId && (
          <select
            name="category"
            value={formItem.category}
            onChange={handleItemChange}
            className="border p-2 rounded w-full mb-3"
            required
          >
            <option value="">Select Menu Category</option>
            {(categories.find(r => r.id === selectedRestaurantId)?.categories || []).map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        )}

        <input
          type="file"
          name="image"
          onChange={handleItemChange}
          className="mb-3"
        />
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full">
          {editingItem ? 'Update Item' : 'Add Item'}
        </button>
      </form>

      {selectedRestaurantId && (
        <div className="w-full max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <h2 className="text-2xl font-bold text-orange-600">📋 Menu Items</h2>
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2 rounded w-full md:w-64"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems
              .filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map(item => (
                <div key={item.id} className="bg-white border rounded-xl shadow p-4">
                  <img src={item.image_url} alt={item.name} className="w-full h-40 object-cover rounded mb-3" />
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-orange-500 font-semibold">Ksh {item.price}</p>
                  <div className="mt-3 flex justify-between">
                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline text-sm">Edit</button>
                    <button onClick={() => handleDelete(item)} className="text-red-600 hover:underline text-sm">Delete</button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {showFeedback && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded shadow-lg z-50">
          {feedbackMessage}
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-xl font-bold text-red-600 mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete <strong>{itemToDelete?.name}</strong>?</p>
            <div className="flex justify-end gap-3">
              <button onClick={cancelDelete} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">Cancel</button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
