import React, { useState, Fragment } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";

const FloatingWhatsAppDrawer = ({ phone = "254791777572" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("Hello Kuha Bites 👋, I'd like to place an order.");

  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${phone}?text=${encodedMessage}`;

  return (
    <>
      {/* Circular WhatsApp Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-green-500 text-white p-4 rounded-full shadow-xl hover:bg-green-600 transition-transform hover:scale-105"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp className="h-6 w-6" />
      </button>

      {/* Drawer */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          {/* Drawer */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="h-full flex flex-col justify-between p-6">
                {/* Title and Textarea */}
                <div>
                  <Dialog.Title className="text-lg font-bold mb-4">
                    Chat with us on WhatsApp
                  </Dialog.Title>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Type your message..."
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-600 hover:text-red-500 font-medium"
                  >
                    Cancel
                  </button>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                  >
                    Continue
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default FloatingWhatsAppDrawer;
