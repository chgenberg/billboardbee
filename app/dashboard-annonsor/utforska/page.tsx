"use client";
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, MapPinIcon, FunnelIcon, HeartIcon, BellIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Billboard {
  id: string;
  title: string;
  location: string;
  price: number;
  size: string;
  traffic: string;
  imageUrls?: string[];
  status: string;
}

export default function UtforskaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBillboards = async () => {
      try {
        const response = await fetch('/api/billboards');
        const data = await response.json();
        setBillboards(data);
      } catch (error) {
        console.error('Failed to fetch billboards:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBillboards();
  }, []);

  const filters = [
    { id: 'digital', name: 'Digital', count: 45 },
    { id: 'static', name: 'Statisk', count: 23 },
    { id: 'led', name: 'LED', count: 18 },
    { id: 'stockholm', name: 'Stockholm', count: 34 },
    { id: 'goteborg', name: 'Göteborg', count: 21 },
    { id: 'malmo', name: 'Malmö', count: 15 },
  ];

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-light text-gray-900 tracking-tight">Utforska & bevaka skyltar</h1>
        <p className="text-gray-600 mt-2">Hitta perfekta skyltplatser för dina kampanjer</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative"
      >
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Sök efter plats, stad eller typ av skylt..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 text-lg"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium shadow hover:shadow-lg transition-all duration-200">
            Sök
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1 space-y-6"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Filter</h3>
              <FunnelIcon className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {filters.map((filter) => (
                <label key={filter.id} className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(filter.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFilters([...selectedFilters, filter.id]);
                        } else {
                          setSelectedFilters(selectedFilters.filter(f => f !== filter.id));
                        }
                      }}
                      className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-gray-700 group-hover:text-gray-900">{filter.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{filter.count}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6">
            <BellIcon className="w-8 h-8 text-orange-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Bevaka skyltar</h3>
            <p className="text-sm text-gray-600 mb-4">
              Få notiser när nya skyltar som matchar dina kriterier blir tillgängliga
            </p>
            <button className="w-full py-2 bg-white text-orange-600 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200">
              Skapa bevakning
            </button>
          </div>
        </motion.aside>

        {/* Results Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-3"
        >
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-gray-500">Laddar skyltar...</div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {billboards.map((billboard, index) => (
                  <motion.div
                    key={billboard.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200"
                  >
                    <div className="relative h-48 bg-gray-200">
                      <Image
                        src={billboard.imageUrls?.[0] || "/placeholder-billboard.jpg"}
                        alt={billboard.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <button
                        onClick={() => toggleFavorite(billboard.id)}
                        className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-all duration-200"
                      >
                        {favorites.includes(billboard.id) ? (
                          <HeartIconSolid className="w-5 h-5 text-red-500" />
                        ) : (
                          <HeartIcon className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-sm opacity-90">{billboard.location}</p>
                        <h3 className="text-lg font-semibold">{billboard.title}</h3>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-semibold text-gray-900">{billboard.price.toLocaleString()} kr/vecka</p>
                          <p className="text-sm text-gray-500">Storlek: {billboard.size}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Trafik</p>
                          <p className="font-semibold text-gray-900">{billboard.traffic}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPinIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{billboard.location}</span>
                        <span className={`ml-auto px-3 py-1 text-xs font-medium rounded-full ${
                          billboard.status === "ledig" 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {billboard.status === "ledig" ? 'Tillgänglig' : 'Upptagen'}
                        </span>
                      </div>
                      <Link href={`/dashboard-annonsor/skylt/${billboard.id}`} className="w-full block py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium shadow hover:shadow-lg transition-all duration-200 text-center">
                        Visa detaljer
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Load More */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex justify-center mt-8"
              >
                <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:border-orange-500 hover:text-orange-600 transition-all duration-200">
                  Ladda fler skyltar
                </button>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
} 