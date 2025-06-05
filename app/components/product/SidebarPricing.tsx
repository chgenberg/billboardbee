"use client";
import { useState } from 'react';

export default function SidebarPricing({ basePrice, serviceFee, availableWeeks, peakWeeks, peakPrice, summary }: {
  basePrice: number;
  serviceFee: number;
  availableWeeks: number[];
  peakWeeks: number[];
  peakPrice: number;
  summary: string;
}) {
  // Demo: välj vecka (för totalsumma)
  const [selectedWeek, setSelectedWeek] = useState<number | null>(availableWeeks[0] || null);
  const isPeak = selectedWeek && peakWeeks.includes(selectedWeek);
  const price = isPeak ? peakPrice : basePrice;
  const fee = Math.round(price * serviceFee);
  const total = price + fee;

  return (
    <aside className="sticky top-28 bg-white rounded-2xl shadow-xl p-6 w-full max-w-xs flex flex-col gap-4 border border-[#f3e7d7]">
      <div className="text-xl font-bold text-[#bf7100] mb-2">Pris & tillgänglighet</div>
      <div className="flex flex-col gap-2 mb-2">
        <div className="flex justify-between text-sm text-[#222]">
          <span>Veckopris</span>
          <span>{price.toLocaleString('sv-SE')} kr</span>
        </div>
        <div className="flex justify-between text-sm text-[#222]">
          <span>Serviceavgift</span>
          <span>{serviceFee * 100} % ({fee.toLocaleString('sv-SE')} kr)</span>
        </div>
        <div className="flex justify-between font-bold text-base border-t pt-2 mt-2 text-[#222]">
          <span>Totalt</span>
          <span>{total.toLocaleString('sv-SE')} kr</span>
        </div>
      </div>
      <div className="text-xs text-gray-500 mb-2">Alla priser exkl. moms.</div>
      <div className="mb-4 text-sm text-[#222]">{summary}</div>
      <label className="block text-xs text-gray-500 mb-1">Välj vecka:</label>
      <div className="relative">
        <select
          className="w-full rounded-lg border border-gray-200 px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-[#bf7100]/40 text-[#222] bg-white appearance-none pr-8"
          value={selectedWeek ?? ''}
          onChange={e => setSelectedWeek(Number(e.target.value))}
        >
          {availableWeeks.map(week => (
            <option key={week} value={week} className="text-[#222]">
              Vecka {week} {peakWeeks.includes(week) ? '• Peak' : ''}
            </option>
          ))}
        </select>
        {/* Custom pil-ikon */}
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#bf7100] text-lg">
          ▼
        </div>
      </div>
      <button className="w-full py-3 rounded-full bg-[#bf7100] text-white font-bold text-lg shadow border border-[#bf7100] tracking-wide font-avenir hover:bg-white hover:text-[#bf7100] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#bf7100]/40 mt-2">
        Boka nu
      </button>
    </aside>
  );
} 