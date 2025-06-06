import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDaysIcon, XMarkIcon } from '@heroicons/react/24/outline';

const helpTexts = {
  standard: 'Standardperiod: Vanliga veckor/dagar med ordinarie pris.',
  peak: 'Peak-period: Extra attraktiva veckor/dagar, t.ex. sommar, jul, där du kan ta ut högre pris.'
};

function HelpIcon({ type }: { type: 'standard' | 'peak' }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative ml-2 cursor-pointer select-none" onClick={e => { e.stopPropagation(); setOpen(!open); }}>
      <span className="text-[#ff6b00] text-lg font-bold">?</span>
      {open && (
        <div className="absolute left-1/2 top-8 -translate-x-1/2 z-50 bg-white text-[#222] rounded-xl shadow-lg p-4 w-64 text-sm border border-[#ff6b00]/30 animate-fade-in">
          {helpTexts[type]}
          <button className="absolute top-1 right-2 text-[#ff6b00] text-lg" onClick={() => setOpen(false)}>&times;</button>
        </div>
      )}
    </span>
  );
}

export default function SellerCalendarPopup({
  standardDays,
  setStandardDays,
  peakDays,
  setPeakDays,
  tab,
  setTab,
  onClose
}: {
  standardDays: Date[];
  setStandardDays: (days: Date[]) => void;
  peakDays: Date[];
  setPeakDays: (days: Date[]) => void;
  tab: 'standard' | 'peak';
  setTab: (tab: 'standard' | 'peak') => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm pt-24 md:pt-0">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <CalendarDaysIcon className="w-8 h-8" />
              <h2 className="text-2xl font-semibold">Välj tillgängliga perioder</h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setTab('standard')}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                tab === 'standard' 
                  ? 'bg-white text-orange-600' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Standardperiod
            </button>
            <button
              onClick={() => setTab('peak')}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                tab === 'peak' 
                  ? 'bg-white text-orange-600' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Peak-period 🔥
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="p-6 bg-gray-50 rounded-b-3xl">
          <div className="mb-4 text-sm text-gray-700">
            {tab === 'standard' ? (
              <p>Välj dagar med standardpris. Klicka på en dag för att markera/avmarkera.</p>
            ) : (
              <p>Välj högsäsongsdagar med högre pris (t.ex. sommar, storhelger).</p>
            )}
          </div>
          <DayPicker
            mode="multiple"
            selected={tab === 'standard' ? standardDays : peakDays}
            onSelect={days => {
              if (tab === 'standard') setStandardDays(days || []);
              else setPeakDays(days || []);
            }}
            modifiers={{
              peak: peakDays,
              standard: standardDays
            }}
            modifiersClassNames={{
              peak: 'rdp-day_peak',
              standard: 'rdp-day_standard',
            }}
            className="rdp-custom"
          />

          {/* Lista med valda datum */}
          <div className="mt-6">
            <div className="mb-2 text-xs text-gray-500 font-semibold">Valda datum:</div>
            <div className="flex flex-wrap gap-2">
              {tab === 'standard'
                ? standardDays.length > 0
                  ? standardDays.map((d, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{d.toLocaleDateString('sv-SE')}</span>
                    ))
                  : <span className="text-gray-400">Inga valda standarddagar</span>
                : peakDays.length > 0
                  ? peakDays.map((d, i) => (
                      <span key={i} className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">{d.toLocaleDateString('sv-SE')}</span>
                    ))
                  : <span className="text-gray-400">Inga valda peak-dagar</span>
              }
            </div>
          </div>

          <style jsx global>{`
            .rdp-custom {
              --rdp-cell-size: 40px;
              --rdp-accent-color: #ff6b00;
              --rdp-background-color: #ff6b00;
              margin: 0 auto;
              background: #f9fafb;
              border-radius: 18px;
              box-shadow: 0 2px 8px 0 #0001;
            }
            .rdp-custom .rdp-day {
              border-radius: 12px;
              font-weight: 500;
              transition: all 0.2s;
              color: #222;
              background: #fff;
            }
            .rdp-custom .rdp-day:hover:not(.rdp-day_selected) {
              background-color: #ffe4b5;
              color: #ff6b00;
            }
            .rdp-custom .rdp-day_selected:not(.rdp-day_disabled) {
              background-color: #ff6b00;
              color: white;
              font-weight: 700;
              box-shadow: 0 0 0 2px #fff, 0 2px 8px 0 #0001;
            }
            .rdp-custom .rdp-day_standard:not(.rdp-day_selected) {
              background-color: #e0f2fe;
              color: #0369a1;
            }
            .rdp-custom .rdp-day_peak:not(.rdp-day_selected) {
              background-color: #fef3c7;
              color: #d97706;
            }
            .rdp-custom .rdp-caption {
              font-weight: 600;
              font-size: 1.1rem;
              color: #1f2937;
            }
            .rdp-custom .rdp-head_cell {
              font-weight: 600;
              color: #6b7280;
              font-size: 0.875rem;
            }
          `}</style>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{standardDays.length}</span> standarddagar, 
            <span className="font-medium ml-1">{peakDays.length}</span> peak-dagar
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium shadow hover:shadow-lg transition-all duration-200"
          >
            Klar
          </button>
        </div>
      </motion.div>
    </div>
  );
} 