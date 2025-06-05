'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Dummy data for billboards
const dummyBillboards = [
  {
    id: 1,
    name: 'Skylt 1 - E6:an',
    basePrice: 18900,
    dynamicPricing: true,
    peakPrice: 22900,
    cpm: 2.5,
  },
  {
    id: 2,
    name: 'Skylt 2 - Centrum',
    basePrice: 15900,
    dynamicPricing: false,
    peakPrice: null,
    cpm: 3.2,
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [selectedBillboard, setSelectedBillboard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#f6f5f3]">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold tracking-tight text-[#ff6b00]">Prissättning</h1>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Billboard list */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-[#222]">Dina skyltar</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {dummyBillboards.map(billboard => (
                  <button
                    key={billboard.id}
                    onClick={() => setSelectedBillboard(billboard.id)}
                    className={`w-full text-left p-6 hover:bg-gray-50 transition ${
                      selectedBillboard === billboard.id ? 'bg-gray-50' : ''
                    }`}
                  >
                    <h3 className="text-[#222] font-medium">{billboard.name}</h3>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[#ff6b00] font-medium">
                        {billboard.basePrice.toLocaleString('sv-SE')} kr/vecka
                      </span>
                      {billboard.dynamicPricing && (
                        <span className="px-2 py-1 bg-[#ff6b00]/10 text-[#ff6b00] text-xs rounded-full">
                          Dynamisk
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing settings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow p-6">
              {selectedBillboard ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-[#222]">
                      {dummyBillboards.find(b => b.id === selectedBillboard)?.name}
                    </h2>
                    <button className="px-4 py-2 bg-[#ff6b00] text-white rounded-lg hover:bg-[#a05c00] transition">
                      Spara ändringar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Baspris per vecka
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          className="w-full rounded-lg border border-[#ff6b00]/30 bg-[#f6f5f3] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40"
                          defaultValue={dummyBillboards.find(b => b.id === selectedBillboard)?.basePrice}
                        />
                        <span className="absolute right-3 top-2 text-gray-500">kr</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CPM (Cost Per Mile)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          className="w-full rounded-lg border border-[#ff6b00]/30 bg-[#f6f5f3] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40"
                          defaultValue={dummyBillboards.find(b => b.id === selectedBillboard)?.cpm}
                        />
                        <span className="absolute right-3 top-2 text-gray-500">kr</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-[#222] font-medium">Dynamisk prissättning</h3>
                        <p className="text-sm text-gray-500">
                          Justera priset automatiskt baserat på efterfrågan och säsong
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked={dummyBillboards.find(b => b.id === selectedBillboard)?.dynamicPricing}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ff6b00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6b00]"></div>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Topppris per vecka
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            className="w-full rounded-lg border border-[#ff6b00]/30 bg-[#f6f5f3] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40"
                            defaultValue={dummyBillboards.find(b => b.id === selectedBillboard)?.peakPrice || undefined}
                          />
                          <span className="absolute right-3 top-2 text-gray-500">kr</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Minsta pris per vecka
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            className="w-full rounded-lg border border-[#ff6b00]/30 bg-[#f6f5f3] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40"
                            defaultValue={dummyBillboards.find(b => b.id === selectedBillboard)?.basePrice}
                          />
                          <span className="absolute right-3 top-2 text-gray-500">kr</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <h3 className="text-[#222] font-medium mb-4">Prisprognos</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-500 text-center">Ingen prognos tillgänglig ännu</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">Välj en skylt för att hantera prissättning</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 