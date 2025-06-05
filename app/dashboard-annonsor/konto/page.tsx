'use client';

import { motion } from 'framer-motion';
import { CreditCardIcon, UserCircleIcon, BuildingOfficeIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function KontoPage() {
  const [activeTab, setActiveTab] = useState('personuppgifter');

  const tabs = [
    { id: 'personuppgifter', name: 'Personuppgifter', icon: UserCircleIcon },
    { id: 'foretag', name: 'Företagsuppgifter', icon: BuildingOfficeIcon },
    { id: 'betalning', name: 'Betalningsmetoder', icon: CreditCardIcon },
    { id: 'sakerhet', name: 'Säkerhet', icon: ShieldCheckIcon },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-light text-gray-900 tracking-tight">Konto & betalningar</h1>
        <p className="text-gray-600 mt-2">Hantera dina kontouppgifter och betalningsmetoder</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex space-x-1 bg-gray-100 p-1 rounded-xl"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200
              ${activeTab === tab.id 
                ? 'bg-white text-orange-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            <tab.icon className="w-5 h-5" />
            <span className="hidden md:inline">{tab.name}</span>
          </button>
        ))}
      </motion.div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
      >
        {activeTab === 'personuppgifter' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Personuppgifter</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Förnamn</label>
                <input
                  type="text"
                  defaultValue="Erik"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Efternamn</label>
                <input
                  type="text"
                  defaultValue="Andersson"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-post</label>
                <input
                  type="email"
                  defaultValue="erik@foretag.se"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                <input
                  type="tel"
                  defaultValue="+46 70 123 45 67"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                Spara ändringar
              </button>
            </div>
          </div>
        )}

        {activeTab === 'foretag' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Företagsuppgifter</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Företagsnamn</label>
                <input
                  type="text"
                  defaultValue="Exempel AB"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organisationsnummer</label>
                <input
                  type="text"
                  defaultValue="556677-8899"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Momsregistreringsnummer</label>
                <input
                  type="text"
                  defaultValue="SE556677889901"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                Spara ändringar
              </button>
            </div>
          </div>
        )}

        {activeTab === 'betalning' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Betalningsmetoder</h2>
            <div className="space-y-4">
              <div className="p-6 border border-gray-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded flex items-center justify-center text-white text-xs font-bold">
                    VISA
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                    <p className="text-sm text-gray-500">Utgår 12/25</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                  Primär
                </span>
              </div>
              <button className="w-full p-6 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-orange-500 hover:text-orange-600 transition-all duration-200">
                + Lägg till ny betalningsmetod
              </button>
            </div>
          </div>
        )}

        {activeTab === 'sakerhet' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Säkerhetsinställningar</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Ändra lösenord</h3>
                <div className="space-y-4">
                  <input
                    type="password"
                    placeholder="Nuvarande lösenord"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  />
                  <input
                    type="password"
                    placeholder="Nytt lösenord"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  />
                  <input
                    type="password"
                    placeholder="Bekräfta nytt lösenord"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Tvåfaktorsautentisering</h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-700">Aktivera tvåfaktorsautentisering</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-orange-600"></div>
                  </label>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                  Uppdatera säkerhetsinställningar
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
} 