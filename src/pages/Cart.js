import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // 👈 Add this


const Cart = () => {
  const { cartItems, clearCart, removeItem, updateQuantity } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-8 md:px-16">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-100 rounded-2xl shadow-md p-4 flex items-center justify-between gap-4"
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="h-20 w-20 object-cover rounded-xl"
              />

              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-2">Ksh {item.price.toLocaleString()} x {item.quantity}</p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-sm font-medium disabled:opacity-50"
                  >
                    −
                  </button>
                  <span className="px-3 text-gray-800 font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-sm font-medium"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeItem(cartItems.findIndex((i) => i.id === item.id))}
                className="text-red-500 hover:text-red-600 text-sm underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-xl font-bold text-right text-gray-800 mt-6">
            Total: <span className="text-orange-600">Ksh {total.toLocaleString()}</span>
          </div>

          <div className="flex flex-wrap justify-end gap-4 mt-6">
            <button
              onClick={clearCart}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full shadow-sm transition"
            >
              Clear Cart
            </button>
           <button
            onClick={() => navigate('/checkout')}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full shadow-sm transition"
          >
            Proceed to Checkout
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
