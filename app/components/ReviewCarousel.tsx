import { useEffect, useRef, useState } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const reviews = [
  { name: 'Anna S.', rating: 5, text: 'Fantastisk tjänst! Hittade rätt skylt på nolltid.' },
  { name: 'Johan L.', rating: 4, text: 'Smidigt och enkelt att boka. Rekommenderas!' },
  { name: 'Maria P.', rating: 5, text: 'Kundservicen var toppen och allt gick snabbt.' },
  { name: 'Erik B.', rating: 5, text: 'Bästa plattformen för utomhusreklam!' },
  { name: 'Sara K.', rating: 4, text: 'Bra urval och tydlig information.' },
  { name: 'Oskar N.', rating: 5, text: 'Väldigt nöjd med resultatet av min kampanj.' },
  { name: 'Linda G.', rating: 5, text: 'Enkel process och bra support.' },
  { name: 'Mikael T.', rating: 4, text: 'Fick hjälp direkt när jag hade frågor.' },
  { name: 'Elin W.', rating: 5, text: 'Snygg och lättanvänd sida!' },
  { name: 'Patrik D.', rating: 5, text: 'Kommer definitivt använda Billboard Bee igen.' },
  { name: 'Sofia H.', rating: 5, text: 'Allt fungerade perfekt från start till mål.' },
  { name: 'Gustav F.', rating: 4, text: 'Bra priser och många alternativ.' },
  { name: 'Camilla E.', rating: 5, text: 'Kände mig trygg genom hela processen.' },
  { name: 'Henrik J.', rating: 5, text: 'Snabbt, smidigt och professionellt.' },
  { name: 'Emma Z.', rating: 5, text: 'Tack för en superenkel bokning!' },
  { name: 'Fredrik S.', rating: 4, text: 'Lite svårt att välja skylt, men annars toppen.' },
  { name: 'Nina M.', rating: 5, text: 'Rekommenderar till alla företagare!' },
  { name: 'David R.', rating: 5, text: 'Bästa kundupplevelsen på länge.' },
  { name: 'Jessica V.', rating: 5, text: 'Så nöjd med min annonskampanj.' },
  { name: 'Anders O.', rating: 4, text: 'Bra och tydlig plattform.' },
];

function getSlidesToShow(width: number) {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  return 3;
}

export default function ReviewCarousel() {
  const [current, setCurrent] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Responsivitet
  useEffect(() => {
    function handleResize() {
      setSlidesToShow(getSlidesToShow(window.innerWidth));
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Automatisk sidväxling
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % Math.ceil(reviews.length / slidesToShow));
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [slidesToShow]);

  // Navigering
  const goTo = (idx: number) => {
    setCurrent(idx);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % Math.ceil(reviews.length / slidesToShow));
      }, 5000);
    }
  };

  const totalSlides = Math.ceil(reviews.length / slidesToShow);
  const startIdx = current * slidesToShow;
  const visibleReviews: ({ name: string; rating: number; text: string; } | undefined)[] = reviews.slice(startIdx, startIdx + slidesToShow);

  // Om vi är på sista sidan och det är "halv" slide, fyll ut med tomma kort
  while (visibleReviews.length < slidesToShow) {
    visibleReviews.push(undefined);
  }

  return (
    <section className="w-full bg-gradient-to-r from-[#fff7f0] via-[#ffe5d0] to-[#fff7f0] py-20 px-2 md:px-0 flex flex-col items-center border-t border-[#ffd6b3] shadow-inner relative">
      <h2 className="text-2xl md:text-3xl font-bold text-[#ff6b00] mb-8 tracking-wide uppercase text-center drop-shadow">Vad våra användare säger</h2>
      <div className="w-full max-w-5xl flex items-center justify-center relative">
        {/* Vänsterpil */}
        <button
          aria-label="Föregående"
          onClick={() => goTo((current - 1 + totalSlides) % totalSlides)}
          className="absolute left-0 z-10 bg-white/80 hover:bg-[#ffb400] hover:text-white text-[#ff6b00] rounded-full p-3 shadow-lg transition-all duration-200 border border-[#ffd6b3] focus:outline-none focus:ring-2 focus:ring-[#ffb400]/40"
        >
          <FaChevronLeft size={28} />
        </button>
        {/* Slides */}
        <div className="w-full flex gap-6 justify-center items-stretch">
          {visibleReviews.map((review, idx) =>
            review ? (
              <div
                key={review.name + idx}
                className="flex-1 min-w-0 max-w-xs bg-white rounded-2xl shadow-xl p-6 flex flex-col items-start border border-[#f3e7db] hover:scale-105 transition-transform duration-300"
                style={{ boxShadow: '0 4px 24px 0 rgba(255, 186, 0, 0.10)' }}
              >
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < review.rating ? 'text-[#ffb400] drop-shadow-[0_0_4px_#ff6b00]' : 'text-gray-300'} />
                  ))}
                </div>
                <p className="text-gray-700 text-base mb-4 italic">"{review.text}"</p>
                <span className="font-bold text-[#ff6b00] text-sm mt-auto">{review.name}</span>
              </div>
            ) : (
              <div key={idx} className="flex-1 min-w-0 max-w-xs bg-transparent" />
            )
          )}
        </div>
        {/* Högerpil */}
        <button
          aria-label="Nästa"
          onClick={() => goTo((current + 1) % totalSlides)}
          className="absolute right-0 z-10 bg-white/80 hover:bg-[#ffb400] hover:text-white text-[#ff6b00] rounded-full p-3 shadow-lg transition-all duration-200 border border-[#ffd6b3] focus:outline-none focus:ring-2 focus:ring-[#ffb400]/40"
        >
          <FaChevronRight size={28} />
        </button>
      </div>
      {/* Små prickar för sidindikator */}
      <div className="flex gap-2 mt-6">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`w-3 h-3 rounded-full ${idx === current ? 'bg-[#ffb400]' : 'bg-[#ffd6b3]'} transition-all`}
            aria-label={`Gå till sida ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
} 