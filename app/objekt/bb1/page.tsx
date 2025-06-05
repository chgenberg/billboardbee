import Header from '../../components/product/Header';
import HeroSection from '../../components/product/HeroSection';
import SidebarPricing from '../../components/product/SidebarPricing';
import WhyBlock from '../../components/product/WhyBlock';
import InteractiveCalendar from '../../components/product/InteractiveCalendar';
import MapSection from '../../components/product/MapSection';
import SpecGrid from '../../components/product/SpecGrid';
import PhotoGallery from '../../components/product/PhotoGallery';
import Reviews from '../../components/product/Reviews';
import HostCard from '../../components/product/HostCard';
import FooterCTABanner from '../../components/product/FooterCTABanner';

export default function ProductPage() {
  // Exempeldata
  const product = {
    title: 'LED-skylt vid E6 N – Löddeköpinge',
    coverImage: '/billboards/bb1.png',
    trafficTeaser: '65 000 fordon passerar varje dag',
    teaser: 'Ge ditt budskap premiumläge mitt i pendlingsstråket mellan Malmö & Helsingborg. Blixtra förbi trafiken – utan dolda rabatter och byråpåslag.',
    basePrice: 18900,
    serviceFee: 0.05,
    availableWeeks: [28,29,30,31,34,35,36,37,38,39,40],
    peakWeeks: [27,32,33],
    peakPrice: 23625,
    summary: 'Veckopris 18 900 kr, serviceavgift 5 %, lediga veckor: 28–31, 34–40',
    lat: 55.7694,
    lng: 13.1221,
    specs: [
      { icon: '📏', label: 'Panelbredd', value: '12,0 m' },
      { icon: '📐', label: 'Panelhöjd', value: '3,0 m' },
      { icon: '🖥️', label: 'Upplösning', value: '1536 × 384 px' },
      { icon: '💡', label: 'Ljusstyrka', value: '6 000 cd/m²' },
      { icon: '🎞️', label: 'Format', value: 'JPEG/MP4, max 30 MB' },
      { icon: '⚡', label: 'Ström', value: '400 V / 32 A trefas' },
    ],
    gallery: ['/billboards/bb1.png','/billboards/bb2.png','/billboards/bb3.png'],
    reviews: [
      { rating: 5, text: 'Vi såg 23 % fler butiksbesök under vår sommarkampanj – exakt vad vi hoppades.', author: 'Sara Lundberg, Marknadschef, Bageri Lundén' },
      { rating: 5, text: 'Enkelt, transparent och inga dolda kostnader. Kommer boka igen.', author: 'David Persson, Byggmax' },
      { rating: 4, text: 'Skönt med fasta priser utan byråsnack, men gärna fler live-statistik-grafer.', author: 'Linda K., Mediabyrå Nord' },
    ],
    host: {
      avatar: '/host-anders.png',
      name: 'Anders Olsson',
      responseTime: 'Svarar normalt inom 4 h',
      moreListings: true,
    },
    cta: 'Boka vecka 34 • 18 900 kr',
  };

  return (
    <div className="bg-[#181818] min-h-screen">
      <Header />
      <HeroSection coverImage={product.coverImage} title={product.title} trafficTeaser={product.trafficTeaser} teaser={product.teaser} />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-4 mt-8">
        <SidebarPricing basePrice={product.basePrice} serviceFee={product.serviceFee} availableWeeks={product.availableWeeks} peakWeeks={product.peakWeeks} peakPrice={product.peakPrice} summary={product.summary} />
        <main className="flex-1 flex flex-col gap-8">
          <WhyBlock />
          <InteractiveCalendar />
          <MapSection lat={product.lat} lng={product.lng} />
          <SpecGrid specs={product.specs} />
          <PhotoGallery images={product.gallery} />
          <Reviews reviews={product.reviews} />
          <HostCard host={product.host} />
        </main>
      </div>
      <FooterCTABanner cta={product.cta} />
    </div>
  );
} 