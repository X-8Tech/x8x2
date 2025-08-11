import { Dialog, Transition } from "@headlessui/react";
import { MessageSquare, Send } from "lucide-react";
import React, { Fragment, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import logo from '../assets/logo.jpg'; // Place your logo in src/assets/logo.png


const FloatingMessageButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    tell: "",
    message: "",
  });

  const allFilled = formData.name && formData.tell && formData.message;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allFilled) return;

    toast.loading("Sending message...");

    try {
      await axios.post("https://kuha.pythonanywhere.com/api/messages/", formData);
      toast.dismiss();
      toast.success("✅ Message sent successfully!");
      setFormData({ name: "", tell: "", message: "" });
      setTimeout(() => setIsOpen(false), 1000);
    } catch (err) {
      toast.dismiss();
      toast.error("❌ Failed to send message. Please try again.");
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-orange-500 text-white p-4 rounded-full shadow-xl hover:bg-orange-600 transition transform hover:scale-105"
        title="Send a message"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            leave="ease-in duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-500 ease-out scale-95 animate-fadeIn relative">
                  
                  {/* Header */}
                  <div className="relative bg-gradient-to-r from-orange-600 to-orange-400 h-28 rounded-b-3xl flex items-center justify-center">
                    <div className="bg-white rounded-full p-1 shadow-lg overflow-hidden h-16 w-16 flex items-center justify-center">
                    <img
                        src={logo}
                        alt="KuhaBites"
                        className="h-full w-full object-cover rounded-full"
                    />
                    </div>

                    <svg
                      className="absolute bottom-0 left-0 w-full"
                      viewBox="0 0 1440 60"
                      preserveAspectRatio="none"
                    >
                      <path
                        fill="#ffffff"
                        d="M0,32L60,32C120,32,240,32,360,26.7C480,21,600,11,720,10.7C840,11,960,21,1080,26.7C1200,32,1320,32,1380,32L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
                      />
                    </svg>
                  </div>

                  {/* Form */}
                  <div className="px-6 pt-4 pb-6">
                    <Dialog.Title className="text-xl font-bold text-center text-orange-600 mb-3">
                      📩 Send Us a Message
                    </Dialog.Title>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        name="name"
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-500"
                      />
                      <input
                        name="tell"
                        type="tel"
                        placeholder="Your Phone Number"
                        value={formData.tell}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-500"
                      />
                      <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-500"
                      ></textarea>

                      <button
                        type="submit"
                        disabled={!allFilled}
                        className={`w-full flex items-center justify-center gap-2 py-2 text-base font-semibold transition duration-300 ${
                          allFilled
                            ? "text-orange-600 hover:text-orange-700"
                            : "text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <Send className="h-5 w-5" />
                        <span>Submit</span>
                      </button>
                    </form>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-3 right-4 text-gray-400 hover:text-red-600 text-2xl font-bold"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default FloatingMessageButton;
