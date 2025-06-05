'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

interface CartItem {
  id: string;
  billboardId: string;
  name: string;
  location: string;
  price: number;
  period: string;
  quantity: number;
  image: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      billboardId: '1',
      name: 'Digital skylt - Centralstationen',
      location: 'Stockholm Centralstation',
      price: 25000,
      period: '2024-06-01 - 2024-06-30',
      quantity: 1,
      image: '/billboard1.jpg',
    },
    {
      id: '2',
      billboardId: '2',
      name: 'LED-skylt - Stureplan',
      location: 'Stureplan, Stockholm',
      price: 35000,
      period: '2024-06-01 - 2024-06-30',
      quantity: 1,
      image: '/billboard2.jpg',
    },
  ]);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.25; // 25% moms
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Varukorg</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 mb-4">Din varukorg är tom</p>
            <Link
              href="/lediga-skyltar"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#ff6b00] hover:bg-[#e65c00]"
            >
              Fortsätt handla
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.location}</p>
                        <p className="text-sm text-gray-500">Period: {item.period}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 rounded-md hover:bg-gray-100"
                            >
                              <MinusIcon className="h-4 w-4 text-gray-600" />
                            </button>
                            <span className="text-gray-900 font-medium px-3">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 rounded-md hover:bg-gray-100"
                            >
                              <PlusIcon className="h-4 w-4 text-gray-600" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-medium text-gray-900">
                          {(item.price * item.quantity).toLocaleString('sv-SE')} kr
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.price.toLocaleString('sv-SE')} kr/månad
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Ordersammanfattning</h2>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delsumma</span>
                    <span className="text-gray-900">{subtotal.toLocaleString('sv-SE')} kr</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Moms (25%)</span>
                    <span className="text-gray-900">{tax.toLocaleString('sv-SE')} kr</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-lg font-medium text-gray-900">Totalt</span>
                      <span className="text-lg font-medium text-gray-900">
                        {total.toLocaleString('sv-SE')} kr
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Link
                    href="/betalning"
                    className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#ff6b00] hover:bg-[#e65c00]"
                  >
                    Gå till betalning
                  </Link>
                  <Link
                    href="/lediga-skyltar"
                    className="w-full inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Fortsätt handla
                  </Link>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Säker betalning</h3>
                  <p className="text-xs text-gray-600">
                    Vi använder säker SSL-kryptering för att skydda dina betalningsuppgifter.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 