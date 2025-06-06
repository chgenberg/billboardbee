"use client";
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import SellerCalendarPopup from './SellerCalendarPopup';
import Image from 'next/image';
import { 
  PhotoIcon, 
  MapPinIcon, 
  CurrencyDollarIcon, 
  CalendarDaysIcon,
  InformationCircleIcon,
  SparklesIcon,
  ChartBarIcon,
  CameraIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

const helpTexts: Record<string, string> = {
  title: 'Skriv en tydlig och lockande rubrik! Exempel: "Stor LED-skylt vid E6:an – syns av 65 000 bilar/dag". Tänk på att nämna plats, typ av skylt och något unikt.',
  coverImage: 'Ladda upp en bild som verkligen visar skylten och dess omgivning. Tips: En bild i dagsljus, gärna i liggande format (16:9), där skylten syns tydligt.',
  gallery: 'Lägg till fler bilder! Visa skylten från olika vinklar, på kvällen, i närbild och gärna med omgivningen. Max 4 bilder.',
  trafficTeaser: 'Beskriv trafikflödet eller exponeringen. Exempel: "65 000 fordon passerar varje dag", "Syns från motorvägen i båda riktningar".',
  teaser: 'Skriv en kort, säljande beskrivning! Vad gör platsen unik? Exempel: "Perfekt läge för sommarkampanjer – syns av semestertrafiken!"',
  basePrice: 'Ange pris per vecka i SEK exkl. moms. Tänk på att sätta ett konkurrenskraftigt pris.',
  serviceFee: 'Procentandel som går till BillboardBee. Standard är 10–15%.',
  availableWeeks: 'Välj vilka perioder skylten är ledig för uthyrning.',
  peakWeeks: 'Vilka veckor är extra attraktiva? (t.ex. sommar, jul).',
  peakPrice: 'Högre pris för peak-veckor.',
  location: 'Klicka på kartan för att markera skyltens exakta position.',
  cta: 'Skriv en tydlig call-to-action! Exempel: "Boka vecka 34 • 18 900 kr"'
};

// Dynamisk import av LeafletMap för att undvika SSR-problem
const LeafletMap = dynamic(() => import('./SellerMapPopup'), { ssr: false });

function HelpTooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  
  return (
    <div className="relative">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <InformationCircleIcon className="w-5 h-5" />
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-sm rounded-xl shadow-xl"
          >
            <div className="relative">
              {text}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function imageToUrl(file: File) {
  return URL.createObjectURL(file);
}

export default function SellerBillboardForm() {
  const [form, setForm] = useState({
    title: '',
    coverImage: null as File | null,
    gallery: [] as File[],
    trafficTeaser: '',
    teaser: '',
    basePrice: '',
    serviceFee: '10',
    availableWeeks: '',
    peakWeeks: '',
    peakPrice: '',
    lat: '',
    lng: '',
    cta: ''
  });
  
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [standardDays, setStandardDays] = useState<Date[]>([]);
  const [peakDays, setPeakDays] = useState<Date[]>([]);
  const [calendarTab, setCalendarTab] = useState<'standard' | 'peak'>('standard');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Drag & drop handlers
  function handleCoverDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setForm(f => ({ ...f, coverImage: e.dataTransfer.files[0] }));
    }
  }
  
  function handleCoverSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setForm(f => ({ ...f, coverImage: e.target.files![0] }));
    }
  }

  function handleGalleryDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files).slice(0, 4);
      setForm(f => ({ ...f, gallery: [...f.gallery, ...files].slice(0, 4) }));
    }
  }
  
  function handleGallerySelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 4);
      setForm(f => ({ ...f, gallery: [...f.gallery, ...files].slice(0, 4) }));
    }
  }
  
  function removeGalleryImage(idx: number) {
    setForm(f => ({ ...f, gallery: f.gallery.filter((_, i) => i !== idx) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Hämta JWT-token från localStorage eller cookies
      const token = localStorage.getItem('token') || document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      
      if (!token) {
        setError('Du måste vara inloggad för att skapa en annons');
        setLoading(false);
        return;
      }
      
      const formData = new FormData();
      formData.append('title', form.title);
      if (form.coverImage) formData.append('coverImage', form.coverImage);
      form.gallery.forEach((file) => formData.append('gallery', file));
      formData.append('trafficTeaser', form.trafficTeaser);
      formData.append('teaser', form.teaser);
      formData.append('basePrice', form.basePrice);
      formData.append('peakPrice', form.peakPrice);
      formData.append('lat', form.lat);
      formData.append('lng', form.lng);
      formData.append('cta', form.cta);
      formData.append('standardDays', JSON.stringify(standardDays));
      formData.append('peakDays', JSON.stringify(peakDays));

      const res = await fetch('/api/billboards', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
      
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      } else {
        setError(data.error || 'Något gick fel vid sparande.');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Något gick fel vid sparande.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Status Messages */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3"
          >
            <CheckCircleIcon className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-medium text-green-900">Annonsen har skapats!</p>
              <p className="text-sm text-green-700">Du omdirigeras till dashboard...</p>
            </div>
          </motion.div>
        )}
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3"
          >
            <ExclamationCircleIcon className="w-6 h-6 text-red-600" />
            <div>
              <p className="font-medium text-red-900">Ett fel uppstod</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section 1: Basic Information */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
            <SparklesIcon className="w-6 h-6 text-orange-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Grundinformation</h2>
        </div>

        {/* Title */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            Rubrik
            <HelpTooltip text={helpTexts.title} />
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 text-gray-900"
            placeholder="Ex: Stor LED-skylt vid E6:an – syns av 65 000 bilar/dag"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            Säljande beskrivning
            <HelpTooltip text={helpTexts.teaser} />
          </label>
          <textarea
            value={form.teaser}
            onChange={(e) => setForm(f => ({ ...f, teaser: e.target.value }))}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 resize-none text-gray-900"
            placeholder="Beskriv vad som gör din skyltplats unik..."
            rows={3}
            required
          />
        </div>
      </motion.section>

      {/* Section 2: Images */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <PhotoIcon className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Bilder</h2>
        </div>

        {/* Cover Image */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            Huvudbild
            <HelpTooltip text={helpTexts.coverImage} />
          </label>
          <div
            onClick={() => coverInputRef.current?.click()}
            onDrop={handleCoverDrop}
            onDragOver={e => e.preventDefault()}
            className="relative aspect-[16/9] bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl overflow-hidden cursor-pointer hover:border-orange-500 hover:bg-orange-50/50 transition-all duration-200 group"
          >
            {form.coverImage ? (
              <>
                <Image 
                  src={imageToUrl(form.coverImage)} 
                  alt="Huvudbild" 
                  fill 
                  className="object-cover" 
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setForm(f => ({ ...f, coverImage: null }));
                  }}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  <span className="text-2xl leading-none text-gray-600">×</span>
                </button>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <CameraIcon className="w-12 h-12 text-gray-400 mb-3" />
                <p className="text-gray-600 font-medium">Klicka eller dra för att ladda upp</p>
                <p className="text-sm text-gray-500 mt-1">JPG, PNG upp till 10MB</p>
              </div>
            )}
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverSelect}
            />
          </div>
        </div>

        {/* Gallery */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            Bildgalleri
            <HelpTooltip text={helpTexts.gallery} />
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {form.gallery.map((file, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                <Image 
                  src={imageToUrl(file)} 
                  alt={`Bild ${idx + 1}`} 
                  fill 
                  className="object-cover" 
                />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(idx)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span className="text-xl leading-none text-gray-600">×</span>
                </button>
              </motion.div>
            ))}
            
            {form.gallery.length < 4 && (
              <div
                onClick={() => galleryInputRef.current?.click()}
                onDrop={handleGalleryDrop}
                onDragOver={e => e.preventDefault()}
                className="aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-orange-500 hover:bg-orange-50/50 transition-all duration-200"
              >
                <div className="text-center">
                  <PhotoIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Lägg till</p>
                </div>
              </div>
            )}
            
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleGallerySelect}
            />
          </div>
        </div>
      </motion.section>

      {/* Section 3: Traffic & Location */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <ChartBarIcon className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Trafik & Plats</h2>
        </div>

        {/* Traffic */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            Trafikfakta
            <HelpTooltip text={helpTexts.trafficTeaser} />
          </label>
          <input
            type="text"
            value={form.trafficTeaser}
            onChange={(e) => setForm(f => ({ ...f, trafficTeaser: e.target.value }))}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 text-gray-900"
            placeholder="Ex: 65 000 fordon passerar varje dag"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            Plats på karta
            <HelpTooltip text={helpTexts.location} />
          </label>
          <button
            type="button"
            onClick={() => setMapOpen(true)}
            className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <MapPinIcon className="w-5 h-5" />
            {form.lat && form.lng ? 'Ändra position på karta' : 'Välj position på karta'}
          </button>
          
          {form.lat && form.lng && (
            <div className="mt-2 text-sm text-gray-600">
              Position: {parseFloat(form.lat).toFixed(4)}, {parseFloat(form.lng).toFixed(4)}
            </div>
          )}
        </div>
      </motion.section>

      {/* Section 4: Pricing & Availability */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Pris & Tillgänglighet</h2>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              Veckopris (SEK)
              <HelpTooltip text={helpTexts.basePrice} />
            </label>
            <input
              type="number"
              value={form.basePrice}
              onChange={(e) => setForm(f => ({ ...f, basePrice: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 text-gray-900"
              placeholder="18900"
              required
            />
          </div>
          
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              Peak-pris (SEK)
              <HelpTooltip text={helpTexts.peakPrice} />
            </label>
            <input
              type="number"
              value={form.peakPrice}
              onChange={(e) => setForm(f => ({ ...f, peakPrice: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 text-gray-900"
              placeholder="22900"
            />
          </div>
        </div>

        {/* Availability */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            Tillgängliga perioder
            <HelpTooltip text={helpTexts.availableWeeks} />
          </label>
          <button
            type="button"
            onClick={() => setCalendarOpen(true)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50/50 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <CalendarDaysIcon className="w-5 h-5 text-gray-600" />
            {standardDays.length === 0 && peakDays.length === 0 
              ? 'Välj tillgängliga perioder' 
              : `${standardDays.length + peakDays.length} perioder valda`}
          </button>
        </div>

        {/* CTA */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            Call-to-action
            <HelpTooltip text={helpTexts.cta} />
          </label>
          <input
            type="text"
            value={form.cta}
            onChange={(e) => setForm(f => ({ ...f, cta: e.target.value }))}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 text-gray-900"
            placeholder="Ex: Boka vecka 34 • 18 900 kr"
            required
          />
        </div>
      </motion.section>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="pt-6"
      >
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sparar annons...
            </>
          ) : (
            'Publicera annons'
          )}
        </button>
      </motion.div>

      {/* Map Modal */}
      <AnimatePresence>
        {mapOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setMapOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl h-[80vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl">
                  Välj skyltens position
                </h3>
                <button
                  onClick={() => setMapOpen(false)}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                >
                  <span className="text-2xl leading-none text-gray-600">×</span>
                </button>
              </div>
              <LeafletMap
                lat={form.lat}
                lng={form.lng}
                onSelect={(lat: string, lng: string) => {
                  setForm(f => ({ ...f, lat, lng }));
                  setMapOpen(false);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendar Modal */}
      {calendarOpen && (
        <SellerCalendarPopup
          standardDays={standardDays}
          setStandardDays={setStandardDays}
          peakDays={peakDays}
          setPeakDays={setPeakDays}
          tab={calendarTab}
          setTab={setCalendarTab}
          onClose={() => setCalendarOpen(false)}
        />
      )}
    </form>
  );
} 