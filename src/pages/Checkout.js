import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import axios from 'axios';

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address) {
      alert('Please fill all required fields.');
      return;
    }

    axios.post('https://kuha.pythonanywhere.com/api/orders/', {
      ...form,
      items: cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image_url: item.image_url || ''
      }))
    })
    .then(() => {
      setSubmitted(true);
      clearCart();
    })
    .catch(err => {
      console.error('Order submission failed:', err.message);
      alert('Order submission failed. Please try again.');
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white py-20 px-6 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Order Confirmed!</h1>
        <p className="text-gray-600 text-lg">Thank you {form.name}, your food will be delivered shortly!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">🧾 Checkout</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white border border-gray-200 p-8 rounded-2xl shadow space-y-6"
      >
        <div>
          <label className="block font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Delivery Address *</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Notes (optional)</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
