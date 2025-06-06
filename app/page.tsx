"use client";

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import BeeQuizModal from './components/BeeQuizModal';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { MagnifyingGlassIcon, MapIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { MapPinIcon } from '@heroicons/react/24/outline';
import Papa from 'papaparse';

const MapWithBees = dynamic(() => import('./components/MapWithBees'), { ssr: false });
const BillboardMapWrapper = dynamic(() => import('./components/BillboardMapWrapper'), { ssr: false });

interface Billboard {
  id: string;
  title: string;
  description: string;
  imageUrls: string[];
  location: string;
  price: number;
  status: string;
  size: string | null;
  type: string | null;
  traffic: number | null;
  region: string | null;
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [showMap, setShowMap] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Billboard[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBillboards = async () => {
      try {
        const response = await fetch('/api/billboards');
        if (!response.ok) {
          throw new Error('Failed to fetch billboards');
        }
        const data = await response.json();
        // Handle the response properly
        if (Array.isArray(data)) {
          setBillboards(data);
        } else if (data && Array.isArray(data.billboards)) {
          setBillboards(data.billboards);
        } else {
          setBillboards([]);
        }
      } catch (error) {
        console.error('Error fetching billboards:', error);
        setBillboards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBillboards();
  }, []);

  // Läs in städer från CSV vid mount
  useEffect(() => {
    fetch('/Stader.csv')
      .then(res => res.text())
      .then(csv => {
        const parsed = Papa.parse(csv, { header: false });
        const cities = parsed.data.map((row: any) => row[0]).filter((c: string) => !!c && typeof c === 'string');
        setCitySuggestions(cities);
      });
  }, []);

  // Extract unique regions safely
  const regions = Array.from(new Set((billboards || []).map(b => b.region).filter(Boolean)));

  const handleSearch = (value?: string) => {
    const searchValue = value || searchQuery;
    if (searchValue.trim()) {
      router.push(`/lediga-skyltar?search=${encodeURIComponent(searchValue)}`);
    }
  };

  const handleQuickSearch = (city: string) => {
    setSearchQuery(city);
    handleSearch(city);
  };

  // Filtrera förslag baserat på input
  const filteredCities = searchQuery.length > 0
    ? citySuggestions.filter(city => city.toLowerCase().startsWith(searchQuery.toLowerCase())).slice(0, 8)
    : [];

  return (
    <>
      {/* Search Section */}
      <section className="relative w-full h-[calc(100vh-64px)] sm:h-auto sm:aspect-[16/9] flex items-center justify-center overflow-hidden sm:pt-14">
        {/* Mobilbild */}
        <img
          src="/hero-mobile.png"
          alt="Billboard"
          className="block sm:hidden absolute inset-0 w-full h-full object-cover"
        />
        {/* Desktopbild */}
        <img
          src="/bakgrunds.png"
          alt="Billboard"
          className="hidden sm:block absolute top-0 left-0 w-full h-full object-contain"
          style={{ objectFit: 'contain', objectPosition: 'center' }}
        />
        {/* Overlay för bättre kontrast - svagare på mobil */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 sm:from-white/80 via-white/20 sm:via-white/60 to-transparent pointer-events-none" />
        {/* Sökboxen */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10 mt-[-220px] sm:mt-[-160px]">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-center mb-1 text-gray-900 drop-shadow-lg">
            <span className="font-extrabold tracking-[0.15em] sm:tracking-[0.2em] leading-relaxed">HITTA DIN PERFEKTA</span>
          </h2>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-3 text-[#ff6b00] drop-shadow-lg">
            <span className="font-extrabold tracking-[0.15em] sm:tracking-[0.2em] leading-relaxed">REKLAMPLATS</span>
          </h2>
          <div className="space-y-2 sm:space-y-2 w-full max-w-[280px] sm:max-w-2xl mx-auto">
            <div className="flex flex-col gap-4 w-full max-w-2xl">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Sök efter stad eller område..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(searchQuery);
                    }
                  }}
                />
                {showSuggestions && filteredCities.length > 0 && (
                  <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-auto">
                    {filteredCities.map((city, idx) => (
                      <li
                        key={city + idx}
                        className="px-4 py-2 cursor-pointer hover:bg-orange-50 text-gray-900"
                        onMouseDown={() => {
                          setSearchQuery(city);
                          setShowSuggestions(false);
                          handleSearch(city);
                        }}
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  onClick={() => handleSearch(searchQuery)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 hover:text-orange-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
              <button
                onClick={() => setShowMap(true)}
                className="px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors mx-auto flex items-center justify-center"
              >
                <MapPinIcon className="h-5 w-5 mr-2 text-white" />
                VISA KARTA
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Billboards Section */}
      <section className="py-12 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-4 uppercase tracking-wider">
              UTVALDA SKYLTAR
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-medium uppercase tracking-wide">
              Upptäck våra mest populära reklamplatser
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-3 border-gray-300 border-t-orange-500 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {billboards.slice(0, 6).map((billboard, index) => (
                <motion.div
                  key={billboard.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <Link href={`/objekt/${billboard.id}`}>
                    <div className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                        <Image
                          src={billboard.imageUrls[0] || '/billboards/bb1.png'}
                          alt={billboard.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-sm font-bold uppercase tracking-wider">SE MER</p>
                        </div>
                      </div>
                      <div className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 uppercase tracking-wide mb-1 sm:mb-2">
                          {billboard.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 font-medium uppercase tracking-wide mb-2 sm:mb-4">{billboard.location}</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl sm:text-3xl font-bold text-orange-600">{billboard.price.toLocaleString()}</span>
                          <span className="text-xs sm:text-sm text-gray-600 font-medium uppercase">KR/MÅNAD</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-8 sm:mt-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/lediga-skyltar"
                className="inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-full hover:from-gray-800 hover:to-gray-700 transition-all duration-300 font-bold text-base sm:text-lg uppercase tracking-wider shadow-xl hover:shadow-2xl"
              >
                VISA ALLA SKYLTAR
                <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* Full-width Map Section */}
          <section className="py-16 bg-gradient-to-b from-white to-orange-50">
            <div className="max-w-7xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="mb-8 text-center"
              >
                <p className="text-base sm:text-lg text-gray-600 font-medium">Utforska alla skyltar på kartan – klicka på en bi-symbol för mer info</p>
              </motion.div>
              <div className="rounded-3xl shadow-2xl overflow-hidden border-4 border-orange-100 bg-white" style={{ minHeight: 480, height: '60vh' }}>
                <MapWithBees 
                  billboards={billboards.filter(b => typeof b.latitude === 'number' && typeof b.longitude === 'number').map(b => ({ ...b, lat: b.latitude, lng: b.longitude }))}
                  initialCenter={[59.3325806, 18.0649031]}
                  initialZoom={13}
                  key="map-with-bees"
                />
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Map Modal */}
      <AnimatePresence>
        {showMap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowMap(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl h-[80vh] relative overflow-hidden mt-16"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-4 right-4 z-[100]">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowMap(false)}
                  className="p-4 bg-black/90 text-white rounded-full shadow-2xl border-2 border-white hover:bg-black transition-colors"
                  style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25)' }}
                >
                  <XMarkIcon className="w-7 h-7" />
                </motion.button>
              </div>
              <div className="w-full h-full">
                <MapWithBees 
                  billboards={billboards
                    .filter((b): b is Billboard & { latitude: number; longitude: number } => 
                      typeof b.latitude === 'number' && typeof b.longitude === 'number'
                    )
                    .map(b => ({
                      ...b,
                      lat: b.latitude,
                      lng: b.longitude
                    }))}
                  initialCenter={[62.0, 16.5]}
                  initialZoom={5}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}