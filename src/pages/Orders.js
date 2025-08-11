import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedOrderToDelete, setSelectedOrderToDelete] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    axios.get('https://kuha.pythonanywhere.com/api/orders/all/')
      .then(res => setOrders(res.data))
      .catch(err => {
        console.error(err);
        setError('Failed to load orders.');
      })
      .finally(() => setLoading(false));
  };

  const handleMarkCompleted = async (orderId) => {
    try {
      await axios.patch(`https://kuha.pythonanywhere.com/api/orders/${orderId}/complete/`);
      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, completed: true } : order
        )
      );
      showToast("✅ Order marked as completed");
    } catch (err) {
      console.error('Failed to mark as completed', err);
      showToast("❌ Failed to mark as completed", true);
    }
  };

  const openDeleteModal = (orderId) => {
    setSelectedOrderToDelete(orderId);
  };

  const confirmDeleteOrder = async () => {
    try {
      await axios.delete(`https://kuha.pythonanywhere.com/api/orders/${selectedOrderToDelete}/delete/`);
      setOrders(prev => prev.filter(order => order.id !== selectedOrderToDelete));
      showToast("🗑️ Order deleted successfully");
    } catch (err) {
      console.error("Failed to delete order", err);
      showToast("❌ Error deleting order", true);
    } finally {
      setSelectedOrderToDelete(null);
    }
  };

  const showToast = (message, isError = false) => {
    setToast({ message, isError });
    setTimeout(() => setToast(null), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-600 mt-10">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 mb-10">
        📦 Submitted Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-base">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-100 shadow-md rounded-xl p-5 space-y-4 transition hover:shadow-lg"
            >
              <div className="flex justify-between items-center flex-wrap gap-y-2">
                <h2 className="text-lg font-bold text-orange-600">Order #{order.id}</h2>
                <span className="text-xs text-gray-500 break-all">📞 {order.phone || "N/A"}</span>
              </div>

              <p className="text-sm text-gray-700"><span className="font-semibold">👤 Name:</span> {order.name}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">📍 Address:</span> {order.address}</p>
              {order.notes && <p className="text-xs text-gray-600 italic">📝 {order.notes}</p>}

              <p className="text-xs text-gray-500">
                🕒 Ordered on:{" "}
                {new Date(order.created_at).toLocaleString('en-KE', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </p>

              <div>
                <h3 className="font-semibold text-sm text-gray-800 mb-1">🧾 Items:</h3>
                <ul className="text-xs text-gray-700 space-y-1 pl-4 list-disc">
                  {(order.items || []).map((item, i) => (
                    <li key={i}>
                      {item.name || "Unnamed Item"} – Ksh {item.price?.toLocaleString() || 0} × {item.quantity || 1}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-right text-sm font-bold text-green-600 mt-2">
                Total: Ksh{" "}
                {(order.items || []).reduce(
                  (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
                  0
                ).toLocaleString()}
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:justify-between gap-2">
                {order.completed ? (
                  <span className="text-sm font-semibold text-green-600">✅ Completed</span>
                ) : (
                  <button
                    onClick={() => handleMarkCompleted(order.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
                  >
                    Mark as Completed
                  </button>
                )}

                <button
                  onClick={() => openDeleteModal(order.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      {selectedOrderToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this order? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedOrderToDelete(null)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteOrder}
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white text-sm"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-5 right-5 max-w-xs px-4 py-2 rounded shadow-md text-white text-sm z-50 transition-all duration-300 ${toast.isError ? 'bg-red-500' : 'bg-green-500'}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default Orders;
