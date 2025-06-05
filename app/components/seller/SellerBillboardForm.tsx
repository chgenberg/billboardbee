"use client";
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import SellerCalendarPopup from './SellerCalendarPopup';

const helpTexts: Record<string, string> = {
  title: 'Skriv en tydlig och lockande rubrik! Exempel: "Stor LED-skylt vid E6:an – syns av 65 000 bilar/dag". Tänk på att nämna plats, typ av skylt och något unikt.',
  coverImage: 'Ladda upp en bild som verkligen visar skylten och dess omgivning. Tips: En bild i dagsljus, gärna i liggande format (16:9), där skylten syns tydligt.',
  gallery: 'Lägg till fler bilder! Visa skylten från olika vinklar, på kvällen, i närbild och gärna med omgivningen. Max 4 bilder. Dra in eller klicka för att välja.',
  trafficTeaser: 'Beskriv trafikflödet eller exponeringen. Exempel: "65 000 fordon passerar varje dag", "Syns från motorvägen i båda riktningar", "Nära köpcentrum".',
  teaser: 'Skriv en kort, säljande beskrivning! Vad gör platsen unik? Exempel: "Perfekt läge för sommarkampanjer – syns av semestertrafiken!"',
  basePrice: 'Ange pris per vecka i SEK exkl. moms. Tänk på att sätta ett konkurrenskraftigt pris. Exempel: "18 900 kr/vecka".',
  serviceFee: 'Procentandel som går till BillboardBee. Standard är 10–15%.',
  availableWeeks: 'Ange lediga veckor som kommateckenseparerade nummer, t.ex. "28,29,30,31". Skriv vilka veckor skylten är ledig för uthyrning.',
  peakWeeks: 'Vilka veckor är extra attraktiva? (t.ex. sommar, jul). Exempel: "32,33,34".',
  peakPrice: 'Högre pris för peak-veckor. Exempel: "22 900 kr".',
  lat: 'Använd Google Maps för att hitta exakta koordinater. Exempel: "55.123456".',
  lng: 'Använd Google Maps för att hitta exakta koordinater. Exempel: "13.123456".',
  cta: 'Skriv en tydlig call-to-action! Exempel: "Boka vecka 34 • 18 900 kr" eller "Kontakta oss för offert".'
};

// Dynamisk import av LeafletMap för att undvika SSR-problem
const LeafletMap = dynamic(() => import('./SellerMapPopup'), { ssr: false });

function HelpIcon({ field }: { field: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span
      role="button"
      tabIndex={0}
      aria-label="Visa tips"
      className="relative ml-2 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40 rounded-full"
      onClick={e => { e.stopPropagation(); setOpen(!open); }}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { setOpen(!open); } }}
    >
      <span className="text-[#ff6b00] text-lg font-bold">?</span>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={() => setOpen(false)}>
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-[90vw] max-w-md border-2 border-[#ff6b00]/60 animate-fade-in text-[#222]" onClick={e => e.stopPropagation()}>
            <div className="text-base font-semibold text-[#ff6b00] mb-2">Tips</div>
            <div className="text-sm leading-relaxed mb-2">{helpTexts[field]}</div>
            <span role="button" aria-label="Stäng" tabIndex={0} className="absolute top-2 right-3 text-[#ff6b00] text-2xl font-bold cursor-pointer" onClick={e => { e.stopPropagation(); setOpen(false); }} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { setOpen(false); } }}>&times;</span>
          </div>
        </div>
      )}
    </span>
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
    serviceFee: '',
    availableWeeks: '',
    peakWeeks: '',
    peakPrice: '',
    lat: '',
    lng: '',
    cta: ''
  });
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Karta-popup state
  const [mapOpen, setMapOpen] = useState(false);

  // Calendar state
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [standardDays, setStandardDays] = useState<Date[]>([]);
  const [peakDays, setPeakDays] = useState<Date[]>([]);
  const [calendarTab, setCalendarTab] = useState<'standard' | 'peak'>('standard');

  // Drag & drop handlers för huvudbild
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

  // Drag & drop handlers för galleri
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

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('coverImage', form.coverImage as any);
      form.gallery.forEach((file, i) => formData.append('gallery', file as any));
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
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        // Optionellt: resetForm();
      } else {
        setError(data.error || 'Något gick fel vid sparande.');
      }
    } catch (err: any) {
      setError(err.message || 'Något gick fel vid sparande.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      {/* Loading och bekräftelse */}
      {loading && <div className="text-[#ff6b00] text-center font-semibold">Sparar annons...</div>}
      {success && <div className="text-green-600 text-center font-semibold">Annonsen är sparad!</div>}
      {error && <div className="text-red-600 text-center font-semibold">{error}</div>}

      {/* Titel */}
      <label className="flex items-center gap-1 text-[#222] font-semibold">
        Rubrik
        <HelpIcon field="title" />
      </label>
      <input type="text" className="w-full rounded-lg border border-[#ff6b00]/30 bg-[#f6f5f3] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40 text-[#222] placeholder:text-[#ff6b00]/60 transition" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />

      {/* Huvudbild drag & drop */}
      <label className="flex items-center gap-1 text-[#222] font-semibold">
        Huvudbild
        <HelpIcon field="coverImage" />
      </label>
      <div
        className="w-full aspect-[16/9] bg-[#f7f7f7] border-2 border-dashed border-[#ff6b00]/40 rounded-xl flex items-center justify-center cursor-pointer relative group"
        onClick={() => coverInputRef.current?.click()}
        onDrop={handleCoverDrop}
        onDragOver={e => e.preventDefault()}
      >
        {form.coverImage ? (
          <img src={imageToUrl(form.coverImage)} alt="cover" className="object-cover w-full h-full rounded-xl" />
        ) : (
          <span className="text-[#ff6b00] text-lg opacity-60">Dra in eller klicka för att ladda upp bild</span>
        )}
        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleCoverSelect}
        />
        {form.coverImage && (
          <button
            type="button"
            className="absolute top-2 right-2 bg-white/80 rounded-full p-1 text-[#ff6b00] text-xl shadow"
            onClick={e => { e.stopPropagation(); setForm(f => ({ ...f, coverImage: null })); }}
          >
            &times;
          </button>
        )}
      </div>

      {/* Galleri drag & drop */}
      <label className="flex items-center gap-1 text-[#222] font-semibold">
        Galleri
        <HelpIcon field="gallery" />
      </label>
      <div
        className="w-full min-h-[60px] bg-[#f7f7f7] border-2 border-dashed border-[#ff6b00]/40 rounded-xl flex items-center gap-2 px-2 py-2 cursor-pointer relative group overflow-x-auto"
        onClick={() => galleryInputRef.current?.click()}
        onDrop={handleGalleryDrop}
        onDragOver={e => e.preventDefault()}
      >
        {form.gallery.length === 0 && (
          <span className="text-[#ff6b00] text-sm opacity-60">Dra in eller klicka för att ladda upp bilder</span>
        )}
        {form.gallery.map((file, idx) => (
          <div key={idx} className="relative group">
            <img src={imageToUrl(file)} alt={`gallery-${idx}`} className="w-20 h-14 object-cover rounded-lg border border-[#ff6b00]/20" />
            <button
              type="button"
              className="absolute top-1 right-1 bg-white/80 rounded-full p-0.5 text-[#ff6b00] text-base shadow"
              onClick={e => { e.stopPropagation(); removeGalleryImage(idx); }}
            >
              &times;
            </button>
          </div>
        ))}
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleGallerySelect}
        />
      </div>

      {/* Trafik/teaser */}
      <label className="flex items-center gap-1 text-[#222] font-semibold">
        Trafikfakta
        <HelpIcon field="trafficTeaser" />
      </label>
      <input type="text" className="w-full rounded-lg border border-[#ff6b00]/30 bg-[#f6f5f3] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40 text-[#222] placeholder:text-[#ff6b00]/60 transition" value={form.trafficTeaser} onChange={e => setForm(f => ({ ...f, trafficTeaser: e.target.value }))} />

      {/* Teaser */}
      <label className="flex items-center gap-1 text-[#222] font-semibold">
        Säljande text
        <HelpIcon field="teaser" />
      </label>
      <input type="text" className="w-full rounded-lg border border-[#ff6b00]/30 bg-[#f6f5f3] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40 text-[#222] placeholder:text-[#ff6b00]/60 transition" value={form.teaser} onChange={e => setForm(f => ({ ...f, teaser: e.target.value }))} />

      {/* Pris */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="flex items-center gap-1 text-[#222] font-semibold">
            Veckopris
            <HelpIcon field="basePrice" />
          </label>
          <input type="number" className="w-full rounded-lg border border-[#ff6b00]/30 bg-[#f6f5f3] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40 text-[#222] placeholder:text-[#ff6b00]/60 transition" value={form.basePrice} onChange={e => setForm(f => ({ ...f, basePrice: e.target.value }))} />
        </div>
        <div className="flex-1 flex flex-col justify-end">
          <label className="flex items-center gap-1 text-[#888] font-semibold mb-1">
            Serviceavgift (%)
            <HelpIcon field="serviceFee" />
          </label>
          <div className="w-full rounded-lg border border-[#ff6b00]/20 bg-[#fffbe6] px-3 py-2 text-[#ff6b00] font-bold text-center select-none cursor-not-allowed">
            10%
          </div>
        </div>
      </div>

      {/* Lediga perioder (kalender) */}
      <label className="flex items-center gap-1 text-[#222] font-semibold">
        Välj lediga perioder
        <HelpIcon field="availableWeeks" />
      </label>
      <div className="w-full">
        <button
          type="button"
          className="w-full rounded-lg border border-[#ff6b00]/30 bg-[#f6f5f3] px-3 py-2 text-[#222] text-left hover:bg-[#fffbe6] transition"
          onClick={() => setCalendarOpen(true)}
        >
          {standardDays.length === 0 && peakDays.length === 0 ? 'Klicka för att välja perioder' : 'Redigera perioder'}
        </button>
        {/* Visning av valda perioder */}
        {(standardDays.length > 0 || peakDays.length > 0) && (
          <div className="mt-2 flex flex-col gap-1">
            {standardDays.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-[#ff6b00] mr-1">Standard:</span>
                {standardDays.map((d, i) => (
                  <span key={d.toISOString()} className="bg-[#ffe082] text-[#222] rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1 shadow-sm">
                    {d.toLocaleDateString('sv-SE', { month: 'short', day: 'numeric' })}
                    <button type="button" className="ml-1 text-[#ff6b00] hover:text-red-500 text-base leading-none" onClick={e => {
                      e.stopPropagation();
                      setStandardDays(standardDays.filter((x, idx) => idx !== i));
                    }}>&times;</button>
                  </span>
                ))}
              </div>
            )}
            {peakDays.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-xs font-semibold text-[#ff9800] mr-1">Peak:</span>
                {peakDays.map((d, i) => (
                  <span key={d.toISOString()} className="bg-[#ffb347] text-white rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1 shadow-sm">
                    {d.toLocaleDateString('sv-SE', { month: 'short', day: 'numeric' })}
                    <button type="button" className="ml-1 text-white hover:text-red-200 text-base leading-none" onClick={e => {
                      e.stopPropagation();
                      setPeakDays(peakDays.filter((x, idx) => idx !== i));
                    }}>&times;</button>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
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

      {/* Karta-knapp för lat/lng */}
      <div className="flex justify-center mb-2">
        <button
          type="button"
          className="px-4 py-1.5 rounded-full bg-white text-[#ff6b00] font-bold text-sm border border-[#ff6b00] tracking-wide font-avenir hover:bg-[#ff6b00] hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40 shadow"
          style={{ fontFamily: 'Avenir Next, Helvetica Neue, Helvetica, Arial, sans-serif' }}
          onClick={e => { e.preventDefault(); setMapOpen(true); }}
        >
          VISA POSITION PÅ KARTA
        </button>
      </div>
      {/* Popup med karta */}
      {mapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setMapOpen(false)}>
          <div className="relative bg-white rounded-2xl shadow-2xl p-4 w-[98vw] max-w-5xl h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-2">
              <div className="text-[#ff6b00] font-bold text-lg">Välj position på karta</div>
              <button aria-label="Stäng karta" className="text-[#ff6b00] text-2xl font-bold" onClick={e => { e.stopPropagation(); setMapOpen(false); }}>&times;</button>
            </div>
            <div className="flex-1 rounded-xl overflow-hidden">
              <LeafletMap
                lat={form.lat}
                lng={form.lng}
                onSelect={(lat: string, lng: string) => {
                  setForm(f => ({ ...f, lat, lng }));
                  setMapOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Plats */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="flex items-center gap-1 text-[#222] font-semibold">
            Latitud
            <HelpIcon field="lat" />
          </label>
          <input type="number" className="w-full rounded-lg border border-[#ff6b00]/30 bg-[#f6f5f3] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40 text-[#222] placeholder:text-[#ff6b00]/60 transition" value={form.lat} onChange={e => setForm(f => ({ ...f, lat: e.target.value }))} />
        </div>
        <div className="flex-1">
          <label className="flex items-center gap-1 text-[#222] font-semibold">
            Longitud
            <HelpIcon field="lng" />
          </label>
          <input type="number" className="w-full rounded-lg border border-[#ff6b00]/30 bg-[#f6f5f3] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40 text-[#222] placeholder:text-[#ff6b00]/60 transition" value={form.lng} onChange={e => setForm(f => ({ ...f, lng: e.target.value }))} />
        </div>
      </div>

      {/* CTA */}
      <label className="flex items-center gap-1 text-[#222] font-semibold">
        CTA
        <HelpIcon field="cta" />
      </label>
      <input type="text" className="w-full rounded-lg border border-[#ff6b00]/30 bg-[#f6f5f3] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40 text-[#222] placeholder:text-[#ff6b00]/60 transition" value={form.cta} onChange={e => setForm(f => ({ ...f, cta: e.target.value }))} />

      <button type="submit" className="mt-4 w-full py-3 rounded-full bg-[#ff6b00] text-white font-bold text-lg shadow border border-[#ff6b00] tracking-wide font-avenir hover:bg-white hover:text-[#ff6b00] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40" disabled={loading}>
        Spara annons
      </button>
    </form>
  );
}

// Minimalistisk input-style (lägg till i global CSS eller tailwind.config.js)
// .input { @apply w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40 text-[#222] bg-white; }

/*
.input-alt {
  @apply w-full rounded-lg border border-[#ff6b00]/30 bg-[#f6f5f3] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40 text-[#222] placeholder:text-[#ff6b00]/60 transition;
}
*/ 