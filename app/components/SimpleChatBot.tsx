'use client';

import { useState } from 'react';

export default function SimpleChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-4 bg-orange-500 text-white rounded-full shadow-lg ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col">
          <div className="bg-orange-500 p-4 flex justify-between items-center rounded-t-2xl">
            <h3 className="text-white font-bold">BillboardBee Support</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 rounded"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 p-4">
            <p className="text-gray-600">Hej! Hur kan jag hjälpa dig idag? 🐝</p>
          </div>
        </div>
      )}
    </>
  );
} 