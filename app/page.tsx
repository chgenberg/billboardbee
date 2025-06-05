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
            src="/bakgrund.png"
            alt="Billboard background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Search Section - Centered in billboard */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl mx-auto px-4"
          >
            <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-10 text-center tracking-tight">
                Hitta din perfekta reklamplats
              </h2>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSearch(searchQuery);
              }} className="space-y-8">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Sök stad eller region..."
                    className="w-full pl-14 pr-6 py-5 text-lg border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Stockholm', 'Göteborg', 'Malmö', 'Uppsala'].map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => handleQuickSearch(city)}
                      className="px-4 py-3 text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 text-sm font-medium"
                    >
                      {city}
                    </button>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Sök skyltar
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setShowMap(true)}
                    className="inline-flex items-center gap-2 px-6 py-4 text-orange-600 hover:text-orange-700 font-medium transition-colors"
                  >
                    <MapIcon className="w-5 h-5" />
                    <span>Visa karta</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
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
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 uppercase tracking-wide">
              UTVALDA SKYLTAR
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Upptäck våra mest populära reklamplatser
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-orange-500 rounded-full animate-spin" />
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
              VISA ALLA SKYLTAR
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Map Modal */}
      {showMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl h-[80vh] relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setShowMap(false)}
                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <XMarkIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <BillboardMapWrapper />
          </motion.div>
        </div>
      )}
    </>
  );
}