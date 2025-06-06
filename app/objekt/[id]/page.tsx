"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ShoppingCartIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  XMarkIcon,
  MapPinIcon,
  ChartBarIcon,
  CubeIcon,
  TagIcon,
  CalendarIcon,
  InformationCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
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
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
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

  const nextImage = () => {
    if (billboard && billboard.imageUrls.length > 1) {
      setMainImage((prev) => (prev + 1) % billboard.imageUrls.length);
    }
  };

  const prevImage = () => {
    if (billboard && billboard.imageUrls.length > 1) {
      setMainImage((prev) => (prev - 1 + billboard.imageUrls.length) % billboard.imageUrls.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-3 border-gray-300 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!billboard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Skylt hittades inte</h1>
          <Link href="/lediga-skyltar" className="text-orange-600 hover:text-orange-700 font-medium">
            ← Tillbaka till alla skyltar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/lediga-skyltar" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ChevronLeftIcon className="w-5 h-5" />
              <span className="font-medium">Tillbaka</span>
            </Link>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                {isFavorite ? (
                  <HeartIconSolid className="w-6 h-6 text-red-500" />
                ) : (
                  <HeartIcon className="w-6 h-6 text-gray-600" />
                )}
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section with Images and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Image Gallery - Takes 2 columns on desktop */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Main Image */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 group">
                <Image
                  src={billboard.imageUrls[mainImage] || '/billboards/bb1.png'}
                  alt={billboard.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={85}
                  loading="eager"
                />
                
                {/* Image Navigation */}
                {billboard.imageUrls.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRightIcon className="w-6 h-6 text-gray-800" />
                    </button>
                  </>
                )}
                
                {/* Fullscreen button */}
                <button
                  onClick={() => setShowImageModal(true)}
                  className="absolute bottom-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
                >
                  <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
              </div>
              
              {/* Thumbnail Gallery */}
              {billboard.imageUrls.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {billboard.imageUrls.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImage(index)}
                      className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden transition-all ${
                        mainImage === index 
                          ? 'ring-2 ring-orange-500 ring-offset-2' 
                          : 'opacity-70 hover:opacity-100'
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
            </motion.div>
          </div>

          {/* Quick Info Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24"
            >
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{billboard.title}</h1>
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <MapPinIcon className="w-5 h-5" />
                <span>{billboard.location}</span>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-orange-600">{billboard.price.toLocaleString()}</span>
                  <span className="text-gray-600">kr/månad</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {billboard.type && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <TagIcon className="w-5 h-5 text-gray-400 mb-1" />
                    <p className="text-xs text-gray-500">Typ</p>
                    <p className="text-sm font-semibold text-gray-900">{billboard.type}</p>
                  </div>
                )}
                {billboard.size && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <CubeIcon className="w-5 h-5 text-gray-400 mb-1" />
                    <p className="text-xs text-gray-500">Storlek</p>
                    <p className="text-sm font-semibold text-gray-900">{billboard.size}</p>
                  </div>
                )}
                {billboard.traffic && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <ChartBarIcon className="w-5 h-5 text-gray-400 mb-1" />
                    <p className="text-xs text-gray-500">Trafik</p>
                    <p className="text-sm font-semibold text-gray-900">{billboard.traffic.toLocaleString()}/dag</p>
                  </div>
                )}
                {billboard.region && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <MapPinIcon className="w-5 h-5 text-gray-400 mb-1" />
                    <p className="text-xs text-gray-500">Region</p>
                    <p className="text-sm font-semibold text-gray-900">{billboard.region}</p>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    setAddedToCart(true);
                    setTimeout(() => {
                      router.push('/varukorg');
                    }, 1000);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  {addedToCart ? 'Tillagd! Går till varukorg...' : 'Lägg till i varukorg'}
                </button>
                <button 
                  onClick={() => setShowBookingModal(true)}
                  className="w-full py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors duration-200 font-semibold"
                >
                  Boka direkt
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Detailed Info Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Description and Calendar */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <InformationCircleIcon className="w-6 h-6 text-orange-500" />
                Om denna skylt
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {billboard.description || 'En fantastisk reklamplats med hög synlighet och strategiskt läge. Perfekt för att nå din målgrupp effektivt.'}
              </p>
            </motion.div>

            {/* Calendar Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CalendarIcon className="w-6 h-6 text-orange-500" />
                Tillgänglighet
              </h2>
              <BookingCalendar 
                billboardId={billboard.id}
                onDateSelect={(date) => {
                  setSelectedDates([...selectedDates, date]);
                }}
              />
            </motion.div>
          </div>

          {/* Right Column - Map */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPinIcon className="w-6 h-6 text-orange-500" />
                Plats
              </h2>
              
              {billboard.latitude && billboard.longitude ? (
                <>
                  <div className="h-64 rounded-xl overflow-hidden mb-4">
                    <BillboardMapWrapper focusBillboardId={billboard.id} height="h-full" />
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-600">
                        {billboard.address || billboard.location}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500">
                      GPS: {billboard.latitude.toFixed(4)}, {billboard.longitude.toFixed(4)}
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center">
                  <p className="text-gray-500">Kartdata saknas</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Har du frågor?</h3>
          <p className="text-gray-600 mb-6">Vårt team hjälper dig gärna med mer information om denna skylt.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowInfoModal(true)}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-orange-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-sm"
            >
              <EnvelopeIcon className="w-5 h-5 mr-2" />
              Begär information
            </button>
            <a
              href="tel:+46701234567"
              className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors duration-200 shadow-sm"
            >
              <PhoneIcon className="w-5 h-5 mr-2" />
              Ring oss direkt
            </a>
          </div>
        </motion.div>
      </main>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90"
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute -top-12 right-0 bg-white/90 hover:bg-white text-gray-900 rounded-full shadow-lg transition-all duration-200 p-2"
              >
                <XMarkIcon className="w-8 h-8" />
              </button>
              <Image
                src={billboard.imageUrls[mainImage] || '/billboards/bb1.png'}
                alt={billboard.title}
                width={1200}
                height={800}
                className="rounded-lg max-h-[85vh] w-auto object-contain"
                quality={90}
                priority
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-white rounded-3xl shadow-2xl p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowBookingModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 pr-8">Kontakta för bokning</h2>
              
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                // Handle form submission
                console.log('Booking form:', bookingForm);
                setShowBookingModal(false);
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowInfoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-white rounded-3xl shadow-2xl p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowInfoModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 pr-8">Begär mer information</h2>
              
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                // Handle form submission
                console.log('Info form:', infoForm);
                setShowInfoModal(false);
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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