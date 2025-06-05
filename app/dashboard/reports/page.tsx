'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const exportOptions = [
  { id: 'bookings', label: 'Bokningar' },
  { id: 'revenue', label: 'Intäkter' },
  { id: 'ads', label: 'Annonser' },
  { id: 'documents', label: 'Dokument' },
  { id: 'users', label: 'Användare' },
  { id: 'calendar', label: 'Kalender' },
  { id: 'all', label: 'Allt ovan' },
];

const formats = [
  { id: 'pdf', label: 'PDF' },
  { id: 'csv', label: 'CSV' },
  { id: 'xlsx', label: 'Excel (.xlsx)' },
];

export default function ReportsPage() {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['all']);
  const [format, setFormat] = useState('pdf');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);

  function handleOptionChange(id: string) {
    if (id === 'all') {
      setSelectedOptions(['all']);
    } else {
      setSelectedOptions(prev => {
        const filtered = prev.filter(opt => opt !== 'all');
        if (filtered.includes(id)) {
          return filtered.filter(opt => opt !== id);
        } else {
          return [...filtered, id];
        }
      });
    }
  }

  function handleExport(e: any) {
    e.preventDefault();
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setExported(true);
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-[#f6f5f3] pt-20 px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <nav className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-[#ff6b00]">Exportera rapporter</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 text-sm rounded-lg bg-[#f6f5f3] text-[#ff6b00] border border-[#ff6b00]/30 hover:bg-[#fff] transition shadow"
          >
            Tillbaka till dashboard
          </button>
        </nav>
        <form onSubmit={handleExport} className="bg-white/80 rounded-2xl shadow-xl p-6 border border-[#ff6b00]/10 flex flex-col gap-6">
          <div>
            <div className="font-semibold text-[#222] mb-2">Vad vill du exportera?</div>
            <div className="flex flex-wrap gap-3">
              {exportOptions.map(opt => (
                <label key={opt.id} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition ${selectedOptions.includes(opt.id) ? 'bg-[#ff6b00]/10 border-[#ff6b00]' : 'bg-[#f6f5f3] border-[#ff6b00]/20'}`}>
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(opt.id)}
                    onChange={() => handleOptionChange(opt.id)}
                    className="accent-[#ff6b00]"
                  />
                  <span className="text-[#222]">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-[#222] font-semibold mb-1">Från datum</label>
              <input type="date" className="w-full rounded-lg border border-[#ff6b00]/20 bg-[#f6f5f3] px-3 py-2" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
            </div>
            <div className="flex-1">
              <label className="block text-[#222] font-semibold mb-1">Till datum</label>
              <input type="date" className="w-full rounded-lg border border-[#ff6b00]/20 bg-[#f6f5f3] px-3 py-2" value={dateTo} onChange={e => setDateTo(e.target.value)} />
            </div>
          </div>
          <div>
            <div className="font-semibold text-[#222] mb-2">Format</div>
            <div className="flex gap-4">
              {formats.map(f => (
                <label key={f.id} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition ${format === f.id ? 'bg-[#ff6b00]/10 border-[#ff6b00]' : 'bg-[#f6f5f3] border-[#ff6b00]/20'}`}>
                  <input
                    type="radio"
                    name="format"
                    checked={format === f.id}
                    onChange={() => setFormat(f.id)}
                    className="accent-[#ff6b00]"
                  />
                  <span className="text-[#222]">{f.label}</span>
                </label>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-lg bg-[#ff6b00] text-white font-bold text-lg shadow hover:bg-[#a05c00] transition"
            disabled={exporting}
          >
            {exporting ? 'Exporterar...' : 'Exportera'}
          </button>
          {exported && <div className="text-green-600 font-semibold text-center">Din rapport har exporterats!</div>}
        </form>
      </div>
    </div>
  );
} 