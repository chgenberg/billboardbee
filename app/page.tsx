"use client";

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import BeeQuizModal from './components/BeeQuizModal';
import { FaMapMarkedAlt } from 'react-icons/fa';

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
  const [search, setSearch] = useState('');
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
    setSearch(value);
    if (value.trim().length > 0) {
      router.push(`/lediga-skyltar?search=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <>
      {/* Hero Section with Billboard Background */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/bakgrund.png"
            alt="Billboard background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20" />
        </div>

        {/* Search Container */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-4 tracking-tight">
              Hitta din perfekta
              <span className="block font-medium text-gray-800">reklamplats</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 mb-12 font-light">
              Sveriges ledande marknadsplats för utomhusreklam
            </p>

            {/* Search Bar */}
            <div className={`relative max-w-2xl mx-auto transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
              <div className="relative bg-white/95 backdrop-blur-md rounded-full shadow-2xl border border-gray-100 overflow-hidden">
                <input
                  type="text"
                  placeholder="Sök stad eller region..."
                  className="w-full px-8 py-6 pr-32 text-lg bg-transparent outline-none text-gray-900 placeholder-gray-400"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(search);
                    }
                  }}
                />
                <button
                  onClick={() => handleSearch(search)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors duration-200 font-medium"
                >
                  Sök
                </button>
              </div>

              {/* Quick Links */}
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {['Stockholm', 'Göteborg', 'Malmö', 'Uppsala'].map((city) => (
                  <button
                    key={city}
                    onClick={() => handleSearch(city)}
                    className="px-6 py-2 text-sm text-gray-600 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white hover:text-gray-900 transition-all duration-200 border border-gray-200"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Map Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => setShowMap(true)}
              className="mt-8 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <span className="font-medium">Visa karta</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Billboards Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Utvalda skyltar
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Upptäck våra mest populära reklamplatser
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {billboards.slice(0, 6).map((billboard, index) => (
                <motion.div
                  key={billboard.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/objekt/${billboard.id}`}>
                    <div className="group cursor-pointer">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
                        <Image
                          src={billboard.imageUrls[0] || '/billboards/bb1.png'}
                          alt={billboard.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="mt-4">
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                          {billboard.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{billboard.location}</p>
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-2xl font-light text-gray-900">{billboard.price.toLocaleString()}</span>
                          <span className="text-sm text-gray-500">kr/månad</span>
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
            <Link
              href="/lediga-skyltar"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors duration-200 font-medium"
            >
              Visa alla skyltar
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowMap(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl h-[80vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowMap(false)}
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <BillboardMapWrapper />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}