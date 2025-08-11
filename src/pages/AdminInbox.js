import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import toast, { Toaster } from "react-hot-toast";

const AdminInbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchMessages = () => {
    axios.get("https://kuha.pythonanywhere.com/api/messages/")
      .then(res => setMessages(res.data))
      .catch(err => toast.error("Failed to load messages"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async () => {
    if (!selectedMessage) return;
    try {
      await axios.delete(`https://kuha.pythonanywhere.com/api/messages/${selectedMessage.id}/`);
      toast.success("Message deleted");
      setMessages(prev => prev.filter(msg => msg.id !== selectedMessage.id));
    } catch (err) {
      toast.error("Deletion failed");
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-20">
      <Toaster />
      <h1 className="text-3xl font-bold text-center text-orange-600 mb-10">📥 Admin Inbox</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-500">No messages found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition relative"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="font-bold text-lg text-orange-700">{msg.name}</h2>
                  <p className="text-sm text-gray-500">📞 {msg.tell}</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedMessage(msg);
                    setIsModalOpen(true);
                  }}
                  className="text-red-500 hover:text-red-700"
                  title="Delete message"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
              <p className="text-right text-xs text-gray-400 mt-4">
                {new Date(msg.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            leave="ease-in duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                leave="ease-in duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl">
                  <Dialog.Title className="text-lg font-bold text-center text-red-600">
                    Confirm Deletion
                  </Dialog.Title>
                  <div className="mt-4 text-center text-gray-700">
                    Are you sure you want to delete the message from <strong>{selectedMessage?.name}</strong>?
                  </div>

                  <div className="mt-6 flex justify-end gap-4">
                    <button
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AdminInbox;
