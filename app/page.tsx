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
}

export default function Home() {
  const [showMap, setShowMap] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Billboard[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
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

  // Extract unique regions safely
  const regions = Array.from(new Set((billboards || []).map(b => b.region).filter(Boolean)));

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value.trim().length > 0) {
      router.push(`/lediga-skyltar?search=${encodeURIComponent(value.trim())}`);
    }
  };

  const handleQuickSearch = (city: string) => {
    setSearchQuery(city);
    handleSearch(city);
  };

  return (
    <>
      {/* Hero Section with Billboard Background */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/bakgrunds.png"
            alt="Billboard background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Search Section - Positioned inside the billboard */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-2xl mx-auto px-4"
            style={{
              // Adjust these values to position the search box inside the billboard
              marginTop: '-5%',
              transform: 'scale(0.85)'
            }}
          >
            <div className="text-center space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 uppercase tracking-wider"
              >
                HITTA DIN PERFEKTA
                <span className="block text-orange-600 mt-2">REKLAMPLATS</span>
              </motion.h1>
              
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch(searchQuery);
                }}
                className="space-y-6"
              >
                <div className="relative group">
                  <MagnifyingGlassIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500 group-focus-within:text-orange-600 transition-colors" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="SÖK STAD ELLER REGION..."
                    className="w-full pl-16 pr-6 py-6 text-lg font-medium placeholder-gray-500 bg-white/90 backdrop-blur border-2 border-gray-200 rounded-full focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 shadow-lg"
                  />
                </div>
                
                <div className="flex flex-wrap justify-center gap-3">
                  {['STOCKHOLM', 'GÖTEBORG', 'MALMÖ', 'UPPSALA'].map((city) => (
                    <motion.button
                      key={city}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickSearch(city)}
                      className="px-6 py-3 text-sm font-bold text-gray-700 bg-white/80 backdrop-blur hover:bg-white hover:text-orange-600 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      {city}
                    </motion.button>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 uppercase tracking-wider"
                  >
                    SÖK SKYLTAR
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowMap(true)}
                    className="inline-flex items-center gap-3 px-8 py-4 text-orange-600 bg-white/80 backdrop-blur hover:bg-white rounded-full font-bold transition-all duration-200 shadow-lg hover:shadow-xl uppercase tracking-wider"
                  >
                    <MapIcon className="w-5 h-5" />
                    <span>VISA KARTA</span>
                  </motion.button>
                </div>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Billboards Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 uppercase tracking-wider">
              UTVALDA SKYLTAR
            </h2>
            <p className="text-lg text-gray-600 font-medium uppercase tracking-wide">
              Upptäck våra mest populära reklamplatser
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-3 border-gray-300 border-t-orange-500 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wide mb-2">
                          {billboard.title}
                        </h3>
                        <p className="text-sm text-gray-600 font-medium uppercase tracking-wide mb-4">{billboard.location}</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-orange-600">{billboard.price.toLocaleString()}</span>
                          <span className="text-sm text-gray-600 font-medium uppercase">KR/MÅNAD</span>
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
            className="text-center mt-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/lediga-skyltar"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-full hover:from-gray-800 hover:to-gray-700 transition-all duration-300 font-bold text-lg uppercase tracking-wider shadow-xl hover:shadow-2xl"
              >
                VISA ALLA SKYLTAR
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
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
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl h-[80vh] relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 z-10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowMap(false)}
                  className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-600" />
                </motion.button>
              </div>
              <BillboardMapWrapper />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}