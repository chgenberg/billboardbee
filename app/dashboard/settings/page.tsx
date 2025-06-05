'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const tabs = [
  { id: 'profile', label: 'Profil', icon: '👤' },
  { id: 'payout', label: 'Utbetalningar', icon: '💰' },
  { id: 'team', label: 'Team', icon: '👥' },
  { id: 'notifications', label: 'Notiser', icon: '🔔' },
  { id: 'api', label: 'API', icon: '🔑' },
];

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-[#f6f5f3]">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold tracking-tight text-[#ff6b00]">Inställningar</h1>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 text-sm rounded-lg bg-[#f6f5f3] text-[#ff6b00] border border-[#ff6b00]/30 hover:bg-[#fff] transition"
            >
              Tillbaka till dashboard
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-8">
        <div className="bg-white rounded-2xl shadow">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center px-6 py-4 text-sm font-medium border-b-2 transition
                    ${activeTab === tab.id
                      ? 'border-[#ff6b00] text-[#ff6b00]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab content */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-[#222]">Profilinställningar</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Företagsnamn
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-[#ff6b00]/30 bg-[#f6f5f3] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40"
                      placeholder="Ange företagsnamn"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organisationsnummer
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-[#ff6b00]/30 bg-[#f6f5f3] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40"
                      placeholder="XXXXXX-XXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-post
                    </label>
                    <input
                      type="email"
                      className="w-full rounded-lg border border-[#ff6b00]/30 bg-[#f6f5f3] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40"
                      placeholder="din@email.se"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      className="w-full rounded-lg border border-[#ff6b00]/30 bg-[#f6f5f3] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40"
                      placeholder="070-XXX XX XX"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="px-4 py-2 bg-[#ff6b00] text-white rounded-lg hover:bg-[#a05c00] transition">
                    Spara ändringar
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'payout' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-[#222]">Utbetalningsinställningar</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bankkonto (IBAN)
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-[#ff6b00]/30 bg-[#f6f5f3] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40"
                      placeholder="SEXX XXXX XXXX XXXX XXXX XXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Utbetalningsfrekvens
                    </label>
                    <select className="w-full rounded-lg border border-[#ff6b00]/30 bg-[#f6f5f3] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40">
                      <option>Veckovis</option>
                      <option>Månadsvis</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Momsregistrerad
                    </label>
                    <select className="w-full rounded-lg border border-[#ff6b00]/30 bg-[#f6f5f3] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40">
                      <option>Ja</option>
                      <option>Nej</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="px-4 py-2 bg-[#ff6b00] text-white rounded-lg hover:bg-[#a05c00] transition">
                    Spara ändringar
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-[#222]">Teammedlemmar</h2>
                  <button className="px-4 py-2 bg-[#ff6b00] text-white rounded-lg hover:bg-[#a05c00] transition">
                    Bjud in medlem
                  </button>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-500 text-center">Inga teammedlemmar ännu</p>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-[#222]">Notisinställningar</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-[#222]">E-postnotiser</h3>
                      <p className="text-sm text-gray-500">Få notiser via e-post</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ff6b00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6b00]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-[#222]">Push-notiser</h3>
                      <p className="text-sm text-gray-500">Få notiser i webbläsaren</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ff6b00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6b00]"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-[#222]">API-nycklar</h2>
                  <button className="px-4 py-2 bg-[#ff6b00] text-white rounded-lg hover:bg-[#a05c00] transition">
                    Generera ny nyckel
                  </button>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-500 text-center">Inga API-nycklar ännu</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 