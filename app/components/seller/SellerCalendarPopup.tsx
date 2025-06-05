import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useState } from 'react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="relative bg-white rounded-3xl p-6 w-[99vw] max-w-3xl h-[80vh] flex flex-col border-2 border-[#ff6b00] shadow-xl">
        <button className="absolute top-4 right-4 text-[#ff6b00] text-2xl font-bold" onClick={onClose}>&times;</button>
        <div className="flex gap-4 mb-6 justify-center">
          <button
            className={`px-6 py-2 rounded-full font-bold text-base border transition-all duration-200 ${tab === 'standard' ? 'bg-[#ff6b00] text-white border-[#ff6b00]' : 'bg-white text-[#ff6b00] border-[#ff6b00]'}`}
            onClick={() => setTab('standard')}
          >
            Standardperiod <HelpIcon type="standard" />
          </button>
          <button
            className={`px-6 py-2 rounded-full font-bold text-base border transition-all duration-200 ${tab === 'peak' ? 'bg-[#ff6b00] text-white border-[#ff6b00]' : 'bg-white text-[#ff6b00] border-[#ff6b00]'}`}
            onClick={() => setTab('peak')}
          >
            Peak-period <HelpIcon type="peak" />
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl bg-white rounded-2xl p-6 flex items-center justify-center border-2 border-[#ff6b00] shadow-md">
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
                peak: 'bg-[#ffb347] text-black font-bold',
                standard: 'bg-[#ffe082] text-black font-bold',
                selected: 'rounded-full border-2 border-[#ff6b00] text-black',
                hover: 'hover:bg-[#fff7e6] hover:text-[#ff6b00]',
              }}
              className="rounded-2xl"
              styles={{
                caption: { color: '#ff6b00', fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'Avenir Next, Helvetica Neue, Helvetica, Arial, sans-serif', background: 'white', padding: '0.5rem', borderRadius: '0.75rem' },
                day: { borderRadius: '1rem', background: '#fff', border: '1px solid #eee', margin: 2, transition: 'background 0.2s', color: '#23272f', fontFamily: 'Avenir Next, Helvetica Neue, Helvetica, Arial, sans-serif', fontWeight: 500 },
                day_selected: { borderRadius: '1rem', border: '2px solid #ff6b00', background: '#fff3e0', color: '#ff6b00' },
                months: { justifyContent: 'center', display: 'flex', gap: '2rem' },
              }}
            />
          </div>
        </div>
        <button
          className="mt-8 mx-auto px-10 py-4 rounded-full bg-[#ff6b00] text-white font-bold text-xl border border-[#ff6b00] tracking-wide font-avenir hover:bg-white hover:text-[#ff6b00] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40"
          style={{ fontFamily: 'Avenir Next, Helvetica Neue, Helvetica, Arial, sans-serif' }}
          onClick={onClose}
        >
          KLAR
        </button>
      </div>
    </div>
  );
} 