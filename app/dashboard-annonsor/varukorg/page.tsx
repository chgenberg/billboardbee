'use client';

import { motion } from 'framer-motion';
import { ShoppingCartIcon, TrashIcon, BookmarkIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Image from 'next/image';

interface CartItem {
  id: string;
  title: string;
  location: string;
  period: string;
  price: number;
  image: string;
}

interface Draft {
  id: string;
  name: string;
  lastUpdated: string;
  items: number;
  totalPrice: number;
}

export default function VarukorgPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      title: 'Digital skylt - Stureplan',
      location: 'Stockholm',
      period: '15 mars - 15 april 2024',
      price: 15000,
      image: '/billboard1.jpg',
    },
    {
      id: '2',
      title: 'LED-tavla Göteborg Central',
      location: 'Göteborg',
      period: '1 april - 1 maj 2024',
      price: 12000,
      image: '/billboard2.jpg',
    },
  ]);

  const [drafts, setDrafts] = useState<Draft[]>([
    {
      id: '1',
      name: 'Vårkampanj 2024',
      lastUpdated: '2024-03-15',
      items: 3,
      totalPrice: 35000,
    },
    {
      id: '2',
      name: 'Sommarkampanj 2024',
      lastUpdated: '2024-03-10',
      items: 5,
      totalPrice: 58000,
    },
  ]);

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.25;
  const total = subtotal + tax;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-light text-gray-900 tracking-tight">Varukorg & utkast</h1>
        <p className="text-gray-600 mt-2">Hantera dina bokningar och sparade kampanjer</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-6">
              <ShoppingCartIcon className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-900">Din varukorg</h2>
              <span className="ml-auto text-sm text-gray-500">{cartItems.length} artiklar</span>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Din varukorg är tom</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{item.location}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-2">
                        <ClockIcon className="w-4 h-4" />
                        {item.period}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-semibold text-gray-900">{item.price.toLocaleString()} kr</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="mt-2 p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Saved Drafts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <BookmarkIcon className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-900">Sparade utkast</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {drafts.map((draft, index) => (
                <motion.div
                  key={draft.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <h3 className="font-medium text-gray-900">{draft.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">Uppdaterad: {draft.lastUpdated}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-600">{draft.items} skyltar</span>
                    <span className="font-medium text-orange-600">{draft.totalPrice.toLocaleString()} kr</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Ordersammanfattning</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Delsumma</span>
                <span>{subtotal.toLocaleString()} kr</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Moms (25%)</span>
                <span>{tax.toLocaleString()} kr</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Totalt</span>
                  <span className="text-orange-600">{total.toLocaleString()} kr</span>
                </div>
              </div>
            </div>

            <button 
              disabled={cartItems.length === 0}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Gå till betalning
            </button>

            <div className="mt-6 p-4 bg-orange-50 rounded-xl">
              <p className="text-sm text-orange-800">
                <strong>Tips!</strong> Du kan spara din varukorg som ett utkast för att fortsätta senare.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 