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
      {/* Search Section */}
      <section className="relative -mt-32 z-20 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Billboard Background */}
            <div className="relative">
              <Image
                src="/bakgrunds.png"
                alt="Billboard"
                width={1200}
                height={800}
                className="w-full h-auto"
                priority
              />
              
              {/* Search Content - Positioned inside billboard */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full transform -translate-y-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-900">
                    HITTA DIN PERFEKTA
                  </h2>
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#ff6b00]">
                    REKLAMPLATS
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="SÖK STAD ELLER REGION..."
                        className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-full focus:border-[#ff6b00] focus:outline-none transition-colors"
                      />
                      <MagnifyingGlassIcon className="absolute right-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-3">
                      {['STOCKHOLM', 'GÖTEBORG', 'MALMÖ', 'UPPSALA'].map((city) => (
                        <button
                          key={city}
                          className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-semibold text-gray-700 transition-colors"
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        href="/lediga-skyltar"
                        className="inline-flex items-center justify-center px-8 py-4 bg-[#ff6b00] text-white rounded-full font-bold hover:bg-[#e65c00] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                        SÖK SKYLTAR
                      </Link>
                      <Link
                        href="/lediga-skyltar"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#ff6b00] border-2 border-[#ff6b00] rounded-full font-bold hover:bg-[#ff6b00] hover:text-white transition-all duration-200"
                      >
                        <MapPinIcon className="h-5 w-5 mr-2" />
                        VISA KARTA
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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