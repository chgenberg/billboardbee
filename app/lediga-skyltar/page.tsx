"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaSearch, FaFilter, FaTimes, FaMapMarkerAlt, FaTag, FaUsers, FaRuler } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

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

const sortOptions = [
  { value: 'price-asc', label: 'Billigast först' },
  { value: 'price-desc', label: 'Dyrast först' },
  { value: 'traffic-desc', label: 'Mest trafik' },
  { value: 'traffic-asc', label: 'Minst trafik' },
  { value: 'size-desc', label: 'Störst först' },
  { value: 'size-asc', label: 'Minst först' },
  { value: 'newest', label: 'Nyast' },
];

export default function LedigaSkyltar() {
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [type, setType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minTraffic, setMinTraffic] = useState('');
  const [maxTraffic, setMaxTraffic] = useState('');
  const [sort, setSort] = useState('price-asc');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  useEffect(() => {
    const fetchBillboards = async () => {
      try {
        const response = await fetch('/api/billboards');
        const data = await response.json();
        setBillboards(data);
      } catch (error) {
        console.error('Error fetching billboards:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBillboards();
  }, []);

  // Sätt förvalt sökfilter från query-param vid mount
  useEffect(() => {
    const q = searchParams?.get('search') || '';
    if (q && !search) setSearch(q);
  }, [searchParams]);

  // Unika regioner och typer för filter
  const regions = Array.from(new Set(billboards?.map(b => b.region).filter(Boolean) || []));
  const types = Array.from(new Set(billboards?.map(b => b.type).filter(Boolean) || []));

  // Filtrering
  let filtered = billboards?.filter(b => {
    const matchesSearch =
      search.trim().length === 0 ||
      (b.title && b.title.toLowerCase().includes(search.toLowerCase())) ||
      (b.location && b.location.toLowerCase().includes(search.toLowerCase())) ||
      (b.region && b.region.toLowerCase().includes(search.toLowerCase())) ||
      (b.type && b.type.toLowerCase().includes(search.toLowerCase()));
    const matchesRegion = !region || b.region === region;
    const matchesType = !type || b.type === type;
    const matchesMinPrice = !minPrice || b.price >= parseInt(minPrice);
    const matchesMaxPrice = !maxPrice || b.price <= parseInt(maxPrice);
    const matchesMinTraffic = !minTraffic || (b.traffic ?? 0) >= parseInt(minTraffic);
    const matchesMaxTraffic = !maxTraffic || (b.traffic ?? 0) <= parseInt(maxTraffic);
    return matchesSearch && matchesRegion && matchesType && matchesMinPrice && matchesMaxPrice && matchesMinTraffic && matchesMaxTraffic;
  });

  // Sortering
  filtered = filtered.sort((a, b) => {
    switch (sort) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'traffic-desc': return (b.traffic ?? 0) - (a.traffic ?? 0);
      case 'traffic-asc': return (a.traffic ?? 0) - (b.traffic ?? 0);
      case 'size-desc': return (parseFloat(b.size ?? '0') - parseFloat(a.size ?? '0'));
      case 'size-asc': return (parseFloat(a.size ?? '0') - parseFloat(b.size ?? '0'));
      case 'newest': return b.id.localeCompare(a.id); // Förenklad, byt till datum om det finns
      default: return 0;
    }
  });

  // Rensa filter-funktion
  const clearFilters = () => {
    setRegion(''); setType(''); setMinPrice(''); setMaxPrice(''); setMinTraffic(''); setMaxTraffic('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search and Filter Bar */}
      <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Sök efter skyltar..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/20 outline-none transition-all duration-200 bg-white"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl border border-[#ff6b00] text-[#ff6b00] bg-white hover:bg-[#fff7f0] hover:border-[#ff6b00] hover:text-[#ff6b00] transition-all duration-200 font-semibold shadow-sm`}
              style={{ boxShadow: '0 1px 4px 0 rgba(255,107,0,0.04)' }}
            >
              <FaFilter className="text-[#ff6b00]" />
              <span>Filter</span>
              {activeFilters.length > 0 && (
                <span className="bg-[#ff6b00] text-white text-xs px-2 py-1 rounded-full">
                  {activeFilters.length}
                </span>
              )}
            </button>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {activeFilters.map((filter, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#ff6b00]/10 text-[#ff6b00] rounded-lg text-sm"
                >
                  <span>{filter}</span>
                  <button
                    onClick={() => setActiveFilters(filters => filters.filter((_, i) => i !== index))}
                    className="hover:text-[#ff6b00]/70"
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full flex justify-center bg-transparent"
          >
            <Card className="w-full max-w-5xl mx-auto rounded-2xl shadow-xl border-0 bg-white/90 mt-4">
              <CardContent className="py-8 px-6 md:px-10">
                <div className="flex flex-col md:flex-row md:items-end gap-6">
                  {/* Stad */}
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-[#ff6b00] mb-1 flex items-center gap-1">
                      <span className="text-lg"><FaMapMarkerAlt /></span> Stad
                    </label>
                    <div className="relative">
                      <Input
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="Ange stad..."
                        className="rounded-full bg-gray-50 border-0 shadow-inner pl-10"
                      />
                      <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                    </div>
                  </div>
                  {/* Adress */}
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-[#ff6b00] mb-1 flex items-center gap-1">
                      <span className="text-lg"><FaMapMarkerAlt /></span> Adress
                    </label>
                    <div className="relative">
                      <Input
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Ange adress..."
                        className="rounded-full bg-gray-50 border-0 shadow-inner pl-10"
                      />
                      <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                    </div>
                  </div>
                  {/* Visa/Dölj avancerade filter */}
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-full bg-gradient-to-r from-[#ff6b00] to-[#ffb300] text-white font-bold shadow-lg px-6 py-2 border-0 hover:scale-105 transition"
                      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    >
                      <FaFilter className="mr-2" />
                      {showAdvancedFilters ? 'Dölj avancerade filter' : 'Visa avancerade filter'}
                    </Button>
                  </div>
                </div>

                {/* Avancerade filter */}
                <AnimatePresence>
                  {showAdvancedFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8"
                    >
                      {/* Region */}
                      <div>
                        <label className="block text-xs font-semibold text-[#ff6b00] mb-1 flex items-center gap-1">
                          <FaMapMarkerAlt /> Region
                        </label>
                        <div className="relative">
                          <Select
                            value={region}
                            onChange={e => setRegion(e.target.value)}
                            className="rounded-full bg-gray-50 border-0 shadow-inner pl-10 text-gray-700 italic"
                          >
                            <option value="">
                              <span className="flex items-center text-gray-400 italic">
                                <FaMapMarkerAlt className="mr-2" /> Alla regioner
                              </span>
                            </option>
                            {regions.map(r => (
                              <option key={r} value={r || ''}>{r}</option>
                            ))}
                          </Select>
                          <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                        </div>
                      </div>
                      {/* Typ */}
                      <div>
                        <label className="block text-xs font-semibold text-[#ff6b00] mb-1 flex items-center gap-1">
                          <FaTag /> Typ
                        </label>
                        <div className="relative">
                          <Select
                            value={type}
                            onChange={e => setType(e.target.value)}
                            className="rounded-full bg-gray-50 border-0 shadow-inner pl-10 text-gray-700 italic"
                          >
                            <option value="">
                              <span className="flex items-center text-gray-400 italic">
                                <FaTag className="mr-2" /> Alla typer
                              </span>
                            </option>
                            {types.map(t => (
                              <option key={t} value={t || ''}>{t}</option>
                            ))}
                          </Select>
                          <FaTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                        </div>
                      </div>
                      {/* Pris */}
                      <div>
                        <label className="block text-xs font-semibold text-[#ff6b00] mb-1 flex items-center gap-1">
                          <FaTag /> Pris (kr/mån)
                        </label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            value={minPrice}
                            onChange={e => setMinPrice(e.target.value)}
                            placeholder="Min"
                            className="rounded-full bg-gray-50 border-0 shadow-inner"
                          />
                          <Input
                            type="number"
                            value={maxPrice}
                            onChange={e => setMaxPrice(e.target.value)}
                            placeholder="Max"
                            className="rounded-full bg-gray-50 border-0 shadow-inner"
                          />
                        </div>
                      </div>
                      {/* Trafik */}
                      <div>
                        <label className="block text-xs font-semibold text-[#ff6b00] mb-1 flex items-center gap-1">
                          <FaUsers /> Trafik (per dag)
                        </label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            value={minTraffic}
                            onChange={e => setMinTraffic(e.target.value)}
                            placeholder="Min"
                            className="rounded-full bg-gray-50 border-0 shadow-inner"
                          />
                          <Input
                            type="number"
                            value={maxTraffic}
                            onChange={e => setMaxTraffic(e.target.value)}
                            placeholder="Max"
                            className="rounded-full bg-gray-50 border-0 shadow-inner"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Sortering som pills */}
                <div className="flex flex-wrap gap-2 mt-8 items-center">
                  <span className="text-xs font-semibold text-[#ff6b00] flex items-center gap-1">
                    <FaRuler /> Sortera efter
                  </span>
                  {sortOptions.map(option => (
                    <Button
                      key={option.value}
                      type="button"
                      variant={sort === option.value ? 'default' : 'outline'}
                      className={`rounded-full px-4 py-1 text-xs font-bold transition ${sort === option.value ? 'bg-gradient-to-r from-[#ff6b00] to-[#ffb300] text-white' : 'bg-white text-[#ff6b00] border-[#ffb300]'}`}
                      onClick={() => setSort(option.value)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>

                {/* Chips för aktiva filter */}
                {activeFilters.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6">
                    {activeFilters.map((filter, index) => (
                      <span
                        key={index}
                        className="bg-[#ff6b00]/10 text-[#ff6b00] rounded-full px-3 py-1 flex items-center gap-2 shadow-sm text-xs"
                      >
                        {filter}
                        <button
                          onClick={() => setActiveFilters(filters => filters.filter((_, i) => i !== index))}
                          className="hover:text-[#ff6b00]/70"
                        >
                          <FaTimes className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Rensa filter */}
                <div className="flex justify-end mt-6">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-xs text-gray-500 hover:text-[#ff6b00] px-3 py-1 rounded-full"
                    onClick={() => {
                      clearFilters();
                      setActiveFilters([]);
                      setCity('');
                      setAddress('');
                    }}
                  >
                    Rensa alla filter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-[#ff6b00] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">Inga skyltar matchar din sökning</div>
            <button
              onClick={() => {
                clearFilters();
                setActiveFilters([]);
                setSearch('');
              }}
              className="text-[#ff6b00] hover:text-[#ff6b00]/80 transition-colors duration-200"
            >
              Rensa alla filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(billboard => (
              <Link
                key={billboard.id}
                href={`/objekt/${billboard.id}`}
                className="group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={billboard.imageUrls[0] || '/billboards/bb1.png'}
                      alt={billboard.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{billboard.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <FaMapMarkerAlt className="text-[#ff6b00] w-3 h-3" />
                      <span className="line-clamp-1">{billboard.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#ff6b00]">{billboard.price} kr/mån</span>
                      {billboard.traffic && (
                        <span className="text-sm text-gray-500">{billboard.traffic} trafik/dag</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 