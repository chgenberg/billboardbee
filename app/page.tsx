"use client";

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BeeQuizModal from './components/BeeQuizModal';
import ReviewCarousel from './components/ReviewCarousel';
import { FaMapMarkedAlt } from 'react-icons/fa';
import BillboardMapWrapper from './components/BillboardMapWrapper';

const MapWithBees = dynamic(() => import('./components/MapWithBees'), { ssr: false });

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

export default function Home() {
  const [showMap, setShowMap] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Billboard[]>([]);
  const router = useRouter();

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

  // Extrahera unika städer från billboards
  const cities = [...new Set(billboards.map(b => b.region).filter(Boolean))];

  // Söklogik
  const handleSearch = (value: string) => {
    setSearch(value);
    if (value.trim().length === 0) {
      setSearchResults([]);
      return;
    }
    // Navigera till lediga-skyltar med query
    router.push(`/lediga-skyltar?search=${encodeURIComponent(value.trim())}`);
  };

  return (
    <>
      <div
        className="min-h-screen w-full flex flex-col items-center justify-start bg-cover bg-center relative"
        style={{ backgroundImage: 'url(/bakgrundens.png)' }}
      >
        {/* Main content */}
        <main className="flex flex-col items-center justify-center flex-1 relative w-full h-full">
          {/* Minimalistisk sökruta centrerad i billboardbilden */}
          <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center z-20">
            <h1
              className="text-[22px] md:text-[32px] font-bold text-black mb-4 text-center tracking-tight"
              style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 700, letterSpacing: '-0.01em' }}
            >
              SÖK DIN SKYLT
            </h1>
            <div className="w-full max-w-md flex flex-row items-center bg-white/90 rounded-full shadow-lg border border-[#ececec] px-3 py-2 gap-2">
              <input
                id="search-input"
                type="text"
                placeholder="Sök ort, t.ex. Stockholm..."
                className="flex-1 bg-transparent outline-none text-base md:text-lg text-[#222] placeholder-gray-400 font-sans"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { handleSearch(search); } }}
              />
              <button
                className="px-4 py-2 rounded-full bg-[#ff6b00] text-white font-semibold text-base shadow-md border-2 border-[#ff6b00] tracking-wide font-sans hover:bg-white hover:text-[#ff6b00] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40"
                onClick={() => handleSearch(search)}
                type="button"
              >
                Sök
              </button>
              <button
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[#ff6b00] hover:bg-[#ff8c1a] transition-colors ml-2"
                onClick={() => setShowMap(true)}
                title="Visa karta"
                type="button"
              >
                <FaMapMarkedAlt className="w-5 h-5 text-white" />
              </button>
            </div>
            {/* Förslag på städer */}
            <div className="flex flex-row gap-2 mt-3">
              {['Stockholm', 'Göteborg', 'Malmö', 'Norrköping'].map((city) => (
                <button
                  key={city}
                  className="px-3 py-1.5 rounded-full bg-white/80 border border-[#ececec] text-[#ff6b00] font-medium shadow hover:bg-[#ff6b00] hover:text-white transition-colors text-xs md:text-sm"
                  type="button"
                  onClick={() => handleSearch(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* === NY RECENSIONSKOMPONENT === */}
      <ReviewCarousel />

      {/* Sektion med billboard-objekt */}
      <section
        className="w-full min-h-screen flex flex-col items-center justify-center bg-white relative pt-16"
      >
        <h2
          className="text-3xl md:text-4xl font-bold text-[#ff6b00] tracking-widest uppercase mb-6 text-center"
          style={{ fontFamily: 'Avenir Next, Helvetica Neue, Helvetica, Arial, sans-serif', letterSpacing: '0.08em' }}
        >
          LEDIGA OBJEKT
        </h2>
        <button
          onClick={() => setShowMap(true)}
          className="mb-10 text-[#ff6b00] font-bold text-lg px-6 py-2 rounded-full border border-[#ff6b00] bg-white/90 hover:bg-[#ff6b00] hover:text-white transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40"
          style={{ fontFamily: 'Avenir Next, Helvetica Neue, Helvetica, Arial, sans-serif' }}
        >
          KARTA
        </button>
        <div className="max-w-5xl w-full flex flex-col items-center justify-center">
          <div className="bg-white/95 rounded-[2.5rem] shadow-2xl px-8 py-12 w-full flex flex-col items-center justify-center">
            {loading ? (
              <div className="text-[#ff6b00] text-xl">Laddar objekt...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                {billboards.slice(0, 6).map((billboard) => (
                  <Link
                    key={billboard.id}
                    href={`/objekt/${billboard.id}`}
                    className="group flex flex-col items-center justify-center transition-transform duration-200 hover:scale-105"
                  >
                    <div className="relative w-full aspect-square max-w-[260px] max-h-[260px]">
                      <Image
                        src={billboard.imageUrls[0] || '/billboards/bb1.png'}
                        alt={billboard.title}
                        fill
                        className="object-cover rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-200"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="text-lg font-bold text-[#ff6b00]">{billboard.title}</h3>
                      <p className="text-sm text-gray-600">{billboard.location}</p>
                      <p className="text-sm font-semibold">{billboard.price} kr/månad</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {/* Visa alla lediga skyltar-knapp */}
            <div className="flex flex-col items-center mt-10">
              <Link href="/lediga-skyltar" className="group flex flex-col items-center">
                <span className="text-5xl text-[#ff6b00] font-extrabold group-hover:scale-110 transition-transform mb-2">+</span>
                <span className="text-lg font-bold text-[#ff6b00] group-hover:underline tracking-wide">Visa alla lediga skyltar</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Modal för karta */}
        {showMap && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setShowMap(false)}
          >
            <div
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl h-[500px] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setShowMap(false)}
                className="absolute top-4 right-4 text-3xl text-[#ff6b00] hover:text-black font-extrabold z-10 bg-white/80 rounded-full w-10 h-10 flex items-center justify-center shadow-md border border-[#ff6b00]/20 transition-colors"
                aria-label="Stäng karta"
              >
                ×
              </button>
              <div className="flex-1 rounded-3xl overflow-hidden">
                <BillboardMapWrapper />
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}