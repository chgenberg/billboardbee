"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { PhoneIcon, EnvelopeIcon, XMarkIcon } from '@heroicons/react/24/outline';
import BookingCalendar from '@/app/components/BookingCalendar';

const BillboardMapWrapper = dynamic(() => import("@/app/components/BillboardMapWrapper"), { ssr: false });

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
  address: string | null;
}

export default function BillboardPage() {
  const params = useParams();
  const router = useRouter();
  const [billboard, setBillboard] = useState<Billboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    startDate: '',
    endDate: ''
  });
  const [infoForm, setInfoForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  useEffect(() => {
    const fetchBillboard = async () => {
      try {
        const response = await fetch('/api/billboards');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        const billboards = Array.isArray(data) ? data : data.billboards || [];
        const found = billboards.find((b: Billboard) => b.id === params.id);
        if (found) {
          setBillboard(found);
        }
      } catch (error) {
        console.error('Error fetching billboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBillboard();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (!billboard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-gray-900 mb-4">Skylt hittades inte</h1>
          <Link href="/lediga-skyltar" className="text-gray-600 hover:text-gray-900">
            ← Tillbaka till alla skyltar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/lediga-skyltar" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Tillbaka</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 cursor-zoom-in"
              onClick={() => setShowImageModal(true)}
            >
              <Image
                src={billboard.imageUrls[mainImage] || '/billboards/bb1.png'}
                alt={billboard.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            
            {billboard.imageUrls.length > 1 && (
              <div className="flex gap-3 mt-4">
                {billboard.imageUrls.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all ${
                      mainImage === index ? 'ring-2 ring-gray-900' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details + Kalender */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Kalendern till vänster */}
            <div className="order-2 lg:order-1">
              <BookingCalendar 
                billboardId={billboard.id}
                onDateSelect={(date) => {
                  // Handle date selection for booking
                  console.log('Selected date:', date);
                }}
              />
            </div>
            {/* Info, beskrivning och knappar till höger */}
            <div className="order-1 lg:order-2">
              <div className="mb-8">
                <h1 className="text-3xl font-light text-gray-900 mb-2">{billboard.title}</h1>
                <p className="text-gray-600">{billboard.location}</p>
              </div>
              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-light text-gray-900">{billboard.price.toLocaleString()}</span>
                  <span className="text-lg text-gray-500">kr/månad</span>
                </div>
              </div>
              {/* Specs */}
              <div className="space-y-6 mb-8">
                {billboard.type && (
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Typ</span>
                    <span className="font-medium text-gray-900">{billboard.type}</span>
                  </div>
                )}
                {billboard.size && (
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Storlek</span>
                    <span className="font-medium text-gray-900">{billboard.size}</span>
                  </div>
                )}
                {billboard.traffic && (
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Trafik</span>
                    <span className="font-medium text-gray-900">{billboard.traffic.toLocaleString()} visningar/dag</span>
                  </div>
                )}
                {billboard.region && (
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Region</span>
                    <span className="font-medium text-gray-900">{billboard.region}</span>
                  </div>
                )}
              </div>
              {/* Description */}
              {billboard.description && (
                <div className="mb-8">
                  <h2 className="text-lg font-medium text-gray-900 mb-3">Beskrivning</h2>
                  <p className="text-gray-600 leading-relaxed">{billboard.description}</p>
                </div>
              )}
              {/* CTA */}
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    setAddedToCart(true);
                    setTimeout(() => {
                      router.push('/varukorg');
                    }, 1000);
                  }}
                  className="w-full py-4 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-all duration-200 font-medium flex items-center justify-center gap-2"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  {addedToCart ? 'Tillagd! Går till varukorg...' : 'Lägg till i varukorg'}
                </button>
                <button 
                  onClick={() => setShowBookingModal(true)}
                  className="w-full py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors duration-200 font-medium"
                >
                  Kontakta för bokning
                </button>
                <button 
                  onClick={() => setShowInfoModal(true)}
                  className="w-full py-4 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200 font-medium"
                >
                  Begär mer information
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        {billboard.latitude && billboard.longitude && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="text-2xl font-light text-gray-900 mb-6">Plats</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-96 rounded-2xl overflow-hidden bg-gray-100">
                  <BillboardMapWrapper focusBillboardId={billboard.id} height="h-full" />
                </div>
              </div>
              <div>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Adress</h3>
                  <p className="text-gray-600">
                    {billboard.address || billboard.location}
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>GPS: {billboard.latitude.toFixed(4)}, {billboard.longitude.toFixed(4)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl max-h-[90vh] bg-white rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute -top-8 right-0 bg-white/80 hover:bg-gray-200 text-gray-900 hover:text-black rounded-full shadow-md transition-colors p-1.5"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <Image
                src={billboard.imageUrls[mainImage] || '/billboards/bb1.png'}
                alt={billboard.title}
                width={1200}
                height={800}
                className="rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowBookingModal(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Kontakta för bokning</h2>
              
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                // Handle form submission
                console.log('Booking form:', bookingForm);
                setShowBookingModal(false);
              }}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Namn *</label>
                    <input
                      type="text"
                      required
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Företag</label>
                    <input
                      type="text"
                      value={bookingForm.company}
                      onChange={(e) => setBookingForm({...bookingForm, company: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-post *</label>
                  <input
                    type="email"
                    required
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefon *</label>
                  <input
                    type="tel"
                    required
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Startdatum</label>
                    <input
                      type="date"
                      value={bookingForm.startDate}
                      onChange={(e) => setBookingForm({...bookingForm, startDate: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slutdatum</label>
                    <input
                      type="date"
                      value={bookingForm.endDate}
                      onChange={(e) => setBookingForm({...bookingForm, endDate: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meddelande</label>
                  <textarea
                    rows={3}
                    value={bookingForm.message}
                    onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 resize-none"
                    placeholder="Berätta mer om din kampanj..."
                  />
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <PhoneIcon className="w-4 h-4" />
                    <span>Ring oss direkt: <a href="tel:+46701234567" className="font-medium text-orange-600 hover:text-orange-700">070-123 45 67</a></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <EnvelopeIcon className="w-4 h-4" />
                    <span>E-post: <a href="mailto:info@billboardbee.se" className="font-medium text-orange-600 hover:text-orange-700">info@billboardbee.se</a></span>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Skicka bokningsförfrågan
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowInfoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowInfoModal(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Begär mer information</h2>
              
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                // Handle form submission
                console.log('Info form:', infoForm);
                setShowInfoModal(false);
              }}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Namn *</label>
                    <input
                      type="text"
                      required
                      value={infoForm.name}
                      onChange={(e) => setInfoForm({...infoForm, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Företag</label>
                    <input
                      type="text"
                      value={infoForm.company}
                      onChange={(e) => setInfoForm({...infoForm, company: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-post *</label>
                  <input
                    type="email"
                    required
                    value={infoForm.email}
                    onChange={(e) => setInfoForm({...infoForm, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                  <input
                    type="tel"
                    value={infoForm.phone}
                    onChange={(e) => setInfoForm({...infoForm, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vad vill du veta mer om?</label>
                  <textarea
                    rows={4}
                    required
                    value={infoForm.message}
                    onChange={(e) => setInfoForm({...infoForm, message: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 resize-none"
                    placeholder="Beskriv vad du vill veta mer om..."
                  />
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <PhoneIcon className="w-4 h-4" />
                    <span>Ring oss: <a href="tel:+46701234567" className="font-medium text-orange-600 hover:text-orange-700">070-123 45 67</a></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <EnvelopeIcon className="w-4 h-4" />
                    <span>E-post: <a href="mailto:info@billboardbee.se" className="font-medium text-orange-600 hover:text-orange-700">info@billboardbee.se</a></span>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Skicka förfrågan
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 