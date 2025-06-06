"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { XMarkIcon, MapIcon } from '@heroicons/react/24/outline';
import { Billboard } from '../types/billboard';

const BillboardMapWrapper = dynamic(() => import('../components/BillboardMapWrapper'), { ssr: false });

export default function LedigaSkyltar() {
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [sortBy, setSortBy] = useState('price-asc');
  const [showMap, setShowMap] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [minTraffic, setMinTraffic] = useState('');
  const [selectedBillboard, setSelectedBillboard] = useState<Billboard | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchBillboards = async () => {
      try {
        const response = await fetch('/api/billboards');
        if (!response.ok) {
          throw new Error('Failed to fetch billboards');
        }
        const data = await response.json();
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

  useEffect(() => {
    const q = searchParams?.get('search') || '';
    if (q) setSearch(q);
  }, [searchParams]);

  // Extract unique values
  const regions = Array.from(new Set((billboards || []).map(b => b.region).filter(Boolean)));
  const types = Array.from(new Set((billboards || []).map(b => b.type).filter(Boolean)));
  const sizes = Array.from(new Set((billboards || []).map(b => b.size).filter(Boolean)));

  // Filter billboards
  let filtered = (billboards || []).filter(b => {
    const matchesSearch = !search || 
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.location?.toLowerCase().includes(search.toLowerCase()) ||
      b.region?.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = !selectedRegion || b.region === selectedRegion;
    const matchesType = !selectedType || b.type === selectedType;
    const matchesPrice = b.price >= priceRange[0] && b.price <= priceRange[1];
    const matchesSize = !selectedSize || b.size === selectedSize;
    const matchesTraffic = !minTraffic || (b.traffic ?? 0) >= parseInt(minTraffic);
    return matchesSearch && matchesRegion && matchesType && matchesPrice && matchesSize && matchesTraffic;
  });

  // Sort billboards
  filtered = filtered.sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'traffic-desc': return (b.traffic ?? 0) - (a.traffic ?? 0);
      case 'newest': return b.id.localeCompare(a.id);
      default: return 0;
    }
  });

  const activeFiltersCount = [
    selectedRegion, 
    selectedType, 
    selectedSize,
    minTraffic,
    priceRange[0] > 0 || priceRange[1] < 50000
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm mt-8">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between gap-4">
            {/* Search */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Sök stad, region eller skylt..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 shadow-sm text-black"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`relative px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  showFilters 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-orange-500 hover:text-orange-600 shadow-sm'
                }`}
              >
                FILTER
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-orange-600 text-white text-xs rounded-full flex items-center justify-center shadow-md">
                    {activeFiltersCount}
                  </span>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMap(true)}
                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-full font-medium hover:border-orange-500 hover:text-orange-600 transition-all duration-200 shadow-sm"
              >
                KARTA
              </motion.button>
            </div>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-6 pb-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {/* Region */}
                  <div className="relative">
                    <label className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1 block">Region</label>
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm appearance-none cursor-pointer text-[#222]"
                    >
                      <option value="">Alla regioner</option>
                      {regions.map(region => (
                        <option key={region} value={region || ''}>{region}</option>
                      ))}
                    </select>
                    <svg className="absolute right-3 top-[60%] -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Type */}
                  <div className="relative">
                    <label className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1 block">Typ</label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm appearance-none cursor-pointer text-[#222]"
                    >
                      <option value="">Alla typer</option>
                      {types.map(type => (
                        <option key={type} value={type || ''}>{type}</option>
                      ))}
                    </select>
                    <svg className="absolute right-3 top-[60%] -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Size */}
                  <div className="relative">
                    <label className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1 block">Storlek</label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm appearance-none cursor-pointer text-[#222]"
                    >
                      <option value="">Alla storlekar</option>
                      {sizes.map(size => (
                        <option key={size} value={size || ''}>{size}</option>
                      ))}
                    </select>
                    <svg className="absolute right-3 top-[60%] -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1 block">Pris (kr/mån)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0] || ''}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm"
                      />
                      <span className="text-gray-400">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1] === 50000 ? '' : priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 50000])}
                        className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm"
                      />
                    </div>
                  </div>

                  {/* Traffic */}
                  <div>
                    <label className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1 block">Min trafik/dag</label>
                    <input
                      type="number"
                      placeholder="Ex: 5000"
                      value={minTraffic}
                      onChange={(e) => setMinTraffic(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm"
                    />
                  </div>

                  {/* Sort */}
                  <div className="relative">
                    <label className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1 block">Sortera</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm appearance-none cursor-pointer text-[#222]"
                    >
                      <option value="price-asc">Pris: Låg till hög</option>
                      <option value="price-desc">Pris: Hög till låg</option>
                      <option value="traffic-desc">Mest trafik</option>
                      <option value="newest">Nyast</option>
                    </select>
                    <svg className="absolute right-3 top-[60%] -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Clear filters */}
                  {activeFiltersCount > 0 && (
                    <div className="col-span-full flex justify-end">
                      <button
                        onClick={() => {
                          setSelectedRegion('');
                          setSelectedType('');
                          setSelectedSize('');
                          setMinTraffic('');
                          setPriceRange([0, 50000]);
                        }}
                        className="px-4 py-2 text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
                      >
                        RENSA ALLA FILTER
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Results */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filtered.length} {filtered.length === 1 ? 'skylt' : 'skyltar'} hittades
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Inga skyltar hittades</h3>
              <p className="text-gray-600 mb-6">Prova att ändra dina sökkriterier eller filter</p>
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedRegion('');
                  setSelectedType('');
                  setPriceRange([0, 50000]);
                }}
                className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-200"
              >
                Rensa alla filter
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((billboard, index) => (
              <motion.div
                key={billboard.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
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
                      {billboard.type && (
                        <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                          {billboard.type}
                        </div>
                      )}
                    </div>
                    <div className="mt-3">
                      <h3 className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-1">
                        {billboard.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">{billboard.location}</p>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-xl font-light text-gray-900">{billboard.price.toLocaleString()}</span>
                        <span className="text-sm text-gray-500">kr/mån</span>
                      </div>
                      {billboard.traffic && (
                        <p className="text-sm text-gray-500 mt-1">
                          {billboard.traffic.toLocaleString()} visningar/dag
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </main>

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
                <BillboardMapWrapper
                  billboards={filtered}
                  selectedBillboard={selectedBillboard}
                  onSelectBillboard={setSelectedBillboard}
                  onClose={() => setShowMap(false)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowMap(true)}
          className="bg-white text-gray-900 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 font-medium"
        >
          <MapIcon className="w-5 h-5" />
          Visa karta
        </motion.button>
      </div>
    </div>
  );
} 