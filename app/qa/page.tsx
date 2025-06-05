"use client";
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDownIcon, 
  MagnifyingGlassIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  PaintBrushIcon,
  ComputerDesktopIcon,
  ChartBarIcon,
  ScaleIcon,
  WrenchScrewdriverIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  MegaphoneIcon,
  HomeIcon,
  LifebuoyIcon
} from '@heroicons/react/24/outline';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // 1. Konto & plattform
  {
    category: "Konto & plattform",
    question: "Hur registrerar jag mig?",
    answer: "Klicka Logga in → Skapa konto, fyll i organisationsnummer och e-post, verifiera via engångskod."
  },
  {
    category: "Konto & plattform",
    question: "Får jag ha flera användare under samma bolag?",
    answer: "Ja, huvudkontot kan bjuda in obegränsat antal underkonton utan extra kostnad."
  },
  {
    category: "Konto & plattform",
    question: "Kan jag byta fakturaadress i efterhand?",
    answer: "Ja, under Inställningar → Företagsuppgifter fram till 24 h före kampanjstart."
  },
  {
    category: "Konto & plattform",
    question: "Stöder ni tvåfaktorsautentisering?",
    answer: "Ja, via TOTP-app eller sms-kod."
  },
  {
    category: "Konto & plattform",
    question: "Finns Single Sign-On?",
    answer: "SAML 2.0 och Azure AD erbjuds i Enterprise-planen."
  },
  {
    category: "Konto & plattform",
    question: "Är plattformen tillgänglig på engelska?",
    answer: "Ja, språkväxling finns längst ned i sidfoten."
  },

  // 2. Bokning & prissättning
  {
    category: "Bokning & prissättning",
    question: "När blir en bokning bindande?",
    answer: "Så snart du klickar Bekräfta i kassan."
  },
  {
    category: "Bokning & prissättning",
    question: "Vilka betalmetoder finns?",
    answer: "Stripe (kort/Apple Pay/Google Pay) och Klarna Faktura."
  },
  {
    category: "Bokning & prissättning",
    question: "Hur funkar avbokning?",
    answer: "≥ 14 dagar före start = 100 % återbetalning, < 14 dagar = 50 %."
  },
  {
    category: "Bokning & prissättning",
    question: "Debiteras moms?",
    answer: "Ja, 25 % om annonsören är svensk eller saknar giltigt VAT-nummer."
  },
  {
    category: "Bokning & prissättning",
    question: "Kan jag boka samma skylt för flera kampanjperioder?",
    answer: "Ja, lägg perioderna efter varandra i varukorgen innan du checkar ut."
  },
  {
    category: "Bokning & prissättning",
    question: "Finns bulk-rabatt?",
    answer: "Ja, fler än 10 samtidiga bokningar ger automatisk tröskelrabatt som syns i kassan."
  },
  {
    category: "Bokning & prissättning",
    question: "Hur sätts grundpriset?",
    answer: "Markägaren anger ett CPM-golv; plattformen visar priset som Fastpris per vecka baserat på genomsnittlig trafik."
  },
  {
    category: "Bokning & prissättning",
    question: "Kan jag förhandla pris direkt med markägaren?",
    answer: "Ja, Enterprise-konton kan skicka privata bud i meddelandeflödet."
  },

  // 3. Kreativt material & tryck
  {
    category: "Kreativt material & tryck",
    question: "Vilka filformat accepteras?",
    answer: "PDF/X-4, JPG eller PNG, 300 dpi i skala 1:10, max 200 MB."
  },
  {
    category: "Kreativt material & tryck",
    question: "Deadline för original?",
    answer: "Senast 5 arbetsdagar före start."
  },
  {
    category: "Kreativt material & tryck",
    question: "Får jag leverera eget tryck?",
    answer: "Ja, men du måste följa Boverkets bygg- och brandskyddskrav för material."
  },
  {
    category: "Kreativt material & tryck",
    question: "Är PVC-fria banners möjliga?",
    answer: "Ja, systemet stöder PP-baserade 300 gsm Eco-banners som är 100 % återvinningsbara."
  },
  {
    category: "Kreativt material & tryck",
    question: "Erbjuder ni designhjälp?",
    answer: "Via partnern Crowddesign mot fast arvode."
  },
  {
    category: "Kreativt material & tryck",
    question: "Kan jag byta motiv under kampanjen?",
    answer: "Ja, till självkostnadspris för ny utskrift + montage."
  },
  {
    category: "Kreativt material & tryck",
    question: "Maximal ljusstyrka för digitala skyltar?",
    answer: "Rekommenderat är 1 500–4 000 nits ute och 350 nits inne."
  },
  {
    category: "Kreativt material & tryck",
    question: "Finns AR- eller QR-kod-stöd?",
    answer: "Ja, QR-kod kan placeras enligt RO:s riktlinjer för läsbarhet."
  },

  // 4. Digital DOOH & programmatic
  {
    category: "Digital DOOH & programmatic",
    question: "Kan jag köra realtids­triggade kampanjer (t.ex. väderstyrda)?",
    answer: "Ja, via OpenRTB 2.5-kopplingen för programmatiska spot-köp."
  },
  {
    category: "Digital DOOH & programmatic",
    question: "Får jag statistik i realtid?",
    answer: "Live-dashboard visar OTS-impressioner baserat på mobil rörelsedata och Outdoor Impact-panel."
  },
  {
    category: "Digital DOOH & programmatic",
    question: "Hur mäter ni impressioner?",
    answer: "Kombinerar plats-GPS, trafikflöden och modellering enligt OAAA/OAAA-Europe Guidelines."
  },
  {
    category: "Digital DOOH & programmatic",
    question: "Stöder ni synk mot mobilt display-köp?",
    answer: "Ja, geofence-sync via Adsquare ger simultan mobil-banner."
  },
  {
    category: "Digital DOOH & programmatic",
    question: "Finns API för automatiserad bokning?",
    answer: "REST-API med OAuth 2.0 för bokning, status och fakturaexport."
  },
  {
    category: "Digital DOOH & programmatic",
    question: "Kan jag utnyttja first-party datapunkter?",
    answer: "Ja, du kan ladda upp CRM-segment (hashad e-post) som matchas mot mobila ID:n."
  },
  {
    category: "Digital DOOH & programmatic",
    question: "Hur lång är en spot på digital skylt?",
    answer: "Standard 10 sek – går att boka exklusiv loop."
  },
  {
    category: "Digital DOOH & programmatic",
    question: "Vad är minsta budget för programmatic?",
    answer: "10 000 kr i daglig spendering eller 250 kr CPM-golv."
  },

  // 5. Analys & rapportering
  {
    category: "Analys & rapportering",
    question: "Vilka KPI:er ingår?",
    answer: "OTS, räckvidd, frekvens, dwell-time, samt heat-map av målgrupper."
  },
  {
    category: "Analys & rapportering",
    question: "Hur beräknas OTS?",
    answer: "Kombination av trafikmätningar, GPS-paneler och modellering enligt Geopath-standard."
  },
  {
    category: "Analys & rapportering",
    question: "Rapporterings­frekvens?",
    answer: "Dagliga uppdateringar + slutrapport PDF 48 h efter kampanj."
  },
  {
    category: "Analys & rapportering",
    question: "Kan jag exportera rådata?",
    answer: "Ja, CSV eller API-pull för BI-verktyg."
  },
  {
    category: "Analys & rapportering",
    question: "Finns spårning till butik-besök?",
    answer: "Ja, validerad footfall-lift via mobil SDK."
  },
  {
    category: "Analys & rapportering",
    question: "Hur hanterar ni privacy?",
    answer: "All positionsdata pseudonymiseras och aggregeras (> 50 enheter)."
  },
  {
    category: "Analys & rapportering",
    question: "Erbjuder ni brand safety?",
    answer: "Ja, skärmen pausar vid nyhetsläge som anses olämpligt."
  },
  {
    category: "Analys & rapportering",
    question: "Hur jämförs DOOH med andra medier?",
    answer: "Outdoor Impact-index låter dig modellera cross-media-ROI."
  },

  // 6. Juridik, etik & regelverk
  {
    category: "Juridik, etik & regelverk",
    question: "Måste jag ha bygglov?",
    answer: "Ja, inom detaljplan krävs bygglov; utanför plan kan kommunen ha utökat krav."
  },
  {
    category: "Juridik, etik & regelverk",
    question: "Vad gäller i vägområde?",
    answer: "Skylt inom statligt vägområde kräver tillstånd från väghållaren (Trafikverket)."
  },
  {
    category: "Juridik, etik & regelverk",
    question: "Vilka nya byggregler träder i kraft 1 juli 2025?",
    answer: "Boverkets nya regelverk samordnar PBL, BBR och EKS; ett års övergångstid."
  },
  {
    category: "Juridik, etik & regelverk",
    question: "Vilka etiska regler gäller?",
    answer: "ICC:s internationella marknadsföringskod och RO:s praxis."
  },
  {
    category: "Juridik, etik & regelverk",
    question: "Får reklamen vara diskriminerande?",
    answer: "Nej, strider mot ICC artikel 2 och förbjuds av RO."
  },
  {
    category: "Juridik, etik & regelverk",
    question: "Hur hanteras miljöpåståenden?",
    answer: "De får inte vilseleda enligt ICC artikel 5; RO har fällt gröntvättande annonser."
  },
  {
    category: "Juridik, etik & regelverk",
    question: "Regler för alkoholreklam?",
    answer: "Måste vara måttfull, får inte rikta sig till under 25 år; omfattas av lag (1978:763) och AGM-rekommendationen."
  },
  {
    category: "Juridik, etik & regelverk",
    question: "Politiska annonser – krav?",
    answer: "Avsändare ska framgå tydligt; följer Lag (2018:1804) om politiska budskap."
  },
  {
    category: "Juridik, etik & regelverk",
    question: "Ansvar vid felaktig annons?",
    answer: "Annonsören bär fullt legalt ansvar."
  },
  {
    category: "Juridik, etik & regelverk",
    question: "Force majeure?",
    answer: "Krig, naturkatastrof, myndighetsbeslut medför befrielse från skadestånd."
  },
  {
    category: "Juridik, etik & regelverk",
    question: "Hur snabbt ska person­uppgiftsincident rapporteras?",
    answer: "Inom 36 h."
  },
  {
    category: "Juridik, etik & regelverk",
    question: "Finns en DPA-mall?",
    answer: "Ja, bifogad som separat bilaga."
  },

  // 7. Byggnation & installation
  {
    category: "Byggnation & installation",
    question: "Vem äger stativet?",
    answer: "Markägaren äger och underhåller stativet."
  },
  {
    category: "Byggnation & installation",
    question: "Kan BillboardBee hjälpa med bygglov?",
    answer: "Ja, ansöknings­service mot fast arvode."
  },
  {
    category: "Byggnation & installation",
    question: "Krav på fundament?",
    answer: "Måste dimensioneras enligt Eurokod 1 vindlast­zon 3."
  },
  {
    category: "Byggnation & installation",
    question: "Hur snabbt efter godkänt bygglov kan skylten monteras?",
    answer: "Vanligen 4–6 veckor beroende på markförhållanden."
  },
  {
    category: "Byggnation & installation",
    question: "Vilka LED-paneltyper används?",
    answer: "P6-P8 ute, P4 inne."
  },
  {
    category: "Byggnation & installation",
    question: "Max ljusstyrka i tätbebyggt område?",
    answer: "Rek. 3 000 nits dagtid, automatisk dimning nattetid."
  },
  {
    category: "Byggnation & installation",
    question: "Krävs TA-plan vid montage nära väg?",
    answer: "Ja, enligt Trafikverkets TRVK/TRVR Apv."
  },
  {
    category: "Byggnation & installation",
    question: "Kan jag få en checklista?",
    answer: "Ja, Trafikverkets samhälls­planeringschecklista finns länkad."
  },

  // 8. Hållbarhet & miljö
  {
    category: "Hållbarhet & miljö",
    question: "Trycker ni på PVC-fritt material?",
    answer: "Ja, PP-baserade Eco-banners (kode 5) kan väljas."
  },
  {
    category: "Hållbarhet & miljö",
    question: "Kan vanliga PVC-banners återvinnas?",
    answer: "PVC kan material- eller energiåtervinnas upp till åtta gånger."
  },
  {
    category: "Hållbarhet & miljö",
    question: "Energiförbrukning digital skylt?",
    answer: "P8-panel ≈ 400 W/m² på full ljusstyrka; automatisk dimning sparar ~60 %."
  },
  {
    category: "Hållbarhet & miljö",
    question: "CO₂-rapport?",
    answer: "Slutrapport visar uppskattat CO₂-footprint från tryck & drift."
  },
  {
    category: "Hållbarhet & miljö",
    question: "Har ni klimatkompensation?",
    answer: "Ja, valfri certifierad Gold Standard-kompensation vid checkout."
  },
  {
    category: "Hållbarhet & miljö",
    question: "Återbruk av stativ?",
    answer: "Galvade stålkonstruktioner kan återbrukas > 25 år."
  },

  // 9. Säkerhet & försäkring
  {
    category: "Säkerhet & försäkring",
    question: "Vilken försäkring ingår?",
    answer: "Allrisk upp till 5 mnkr, exkl. indirekt skada."
  },
  {
    category: "Säkerhet & försäkring",
    question: "Täcks skador vid storm?",
    answer: "Ja, material- och personskador inom ramen för allrisk."
  },
  {
    category: "Säkerhet & försäkring",
    question: "Vad gäller vid sabotage?",
    answer: "Polisanmälan krävs, självrisken är 10 000 kr."
  },
  {
    category: "Säkerhet & försäkring",
    question: "Är LED-paneler CE-märkta?",
    answer: "Ja, enligt EN 60950 och EMC-direktiv."
  },
  {
    category: "Säkerhet & försäkring",
    question: "Finns riskanalys för glaskross?",
    answer: "Digitala kapslingar har säkerhetsglas klass P6B."
  },

  // 10. Integritet & cookies
  {
    category: "Integritet & cookies",
    question: "Vem är personuppgifts­ansvarig?",
    answer: "FrejFund AB."
  },
  {
    category: "Integritet & cookies",
    question: "Vilka persondata lagras?",
    answer: "Kontakt-, affärs-, teknisk- och betaldata."
  },
  {
    category: "Integritet & cookies",
    question: "Lagringstid?",
    answer: "24 mån efter senaste inloggning; bokföringsdata 7 år."
  },
  {
    category: "Integritet & cookies",
    question: "Kan jag neka cookies?",
    answer: "Ja, via cookie-banner eller webbläsarinställningar."
  },
  {
    category: "Integritet & cookies",
    question: "Vilka cookies är nödvändiga?",
    answer: "Endast sessions- och säkerhetscookies."
  },
  {
    category: "Integritet & cookies",
    question: "Incident­rapporteringstid?",
    answer: "Max 36 h från upptäckt."
  },

  // 11. Frågor för annonsörer
  {
    category: "Frågor för annonsörer",
    question: "Kan jag boka cross-country kampanj?",
    answer: "Ja, skyltnät i Finland & Norge via partnerfeed."
  },
  {
    category: "Frågor för annonsörer",
    question: "Får jag se foto­montage på motivet?",
    answer: "Ja, AI-preview ingår."
  },
  {
    category: "Frågor för annonsörer",
    question: "Finns rabatter för ideella organisationer?",
    answer: "30 % rabatt efter intyg."
  },
  {
    category: "Frågor för annonsörer",
    question: "Hur hanterar ni kampanjer med kort varsel?",
    answer: "Express-print 24 h + budbil."
  },
  {
    category: "Frågor för annonsörer",
    question: "Kan jag annonsera med ljud?",
    answer: "Endast på CityHub-skärmar med inbyggd högtalare."
  },
  {
    category: "Frågor för annonsörer",
    question: "Vilka regler gäller för e-cigarettreklam?",
    answer: "Marknadsföring är förbjuden enligt tobakslagen."
  },
  {
    category: "Frågor för annonsörer",
    question: "Stöder ni A/B-test?",
    answer: "Ja, rotera upp till fem varianter per kampanj."
  },
  {
    category: "Frågor för annonsörer",
    question: "Hur lång är minsta kampanjperiod?",
    answer: "En vecka analogt, en dag digitalt."
  },

  // 12. Frågor för markägare
  {
    category: "Frågor för markägare",
    question: "Hur lägger jag upp en ny skylt?",
    answer: "Fyll i geo-data, format, pris & bilder."
  },
  {
    category: "Frågor för markägare",
    question: "När betalas min andel ut?",
    answer: "15 dagar efter kampanjstart."
  },
  {
    category: "Frågor för markägare",
    question: "Serviceavgift?",
    answer: "20 % av kampanjvärdet."
  },
  {
    category: "Frågor för markägare",
    question: "Krav på fotodokumentation?",
    answer: "Ja, före och efter kampanj."
  },
  {
    category: "Frågor för markägare",
    question: "Får jag neka en annons?",
    answer: "Ja, inom 24 h av etiska skäl."
  },
  {
    category: "Frågor för markägare",
    question: "Underhålls­skyldighet?",
    answer: "Markägaren står för stativ & el; LED-paneler har 5 års garanti."
  },
  {
    category: "Frågor för markägare",
    question: "Kan jag ansluta digital skärm?",
    answer: "Ja, via NDI eller HDMI-player."
  },
  {
    category: "Frågor för markägare",
    question: "Finns white-label-portal?",
    answer: "Ja, så att du kan sälja egna ytor under egen domän."
  },

  // 13. Support & drift
  {
    category: "Support & drift",
    question: "Hur kontaktar supporten?",
    answer: "support@billboardbee.se eller 08-123 456 78 vardagar 09–17."
  },
  {
    category: "Support & drift",
    question: "Respons-SLA?",
    answer: "Första svar inom 24 h; kritiska driftfrågor dygnet runt."
  },
  {
    category: "Support & drift",
    question: "Status­sida?",
    answer: "status.billboardbee.se med uptime-logg."
  },
  {
    category: "Support & drift",
    question: "Har ni utbildnings­webbinarier?",
    answer: "Ja, varje månad – anmälan via dashboard."
  },
  {
    category: "Support & drift",
    question: "Erbjuder ni onsite-support?",
    answer: "Endast Enterprise, inom 2 arbetsdagar."
  },

  // 14. Övrigt & framtidsplaner
  {
    category: "Övrigt & framtidsplaner",
    question: "Kommer ni stödja 3D-animerade DOOH-spots?",
    answer: "Ja, WebGL-stödet lanseras Q4 2025."
  },
  {
    category: "Övrigt & framtidsplaner",
    question: "Har ni planer för EV-laddstation-skärmar?",
    answer: "Pilotprojekt med Vattenfall pågår."
  },
  {
    category: "Övrigt & framtidsplaner",
    question: "Kommer AI-genererade motiv att godkännas?",
    answer: "Ja, så länge licenserna är klarlagda."
  },
  {
    category: "Övrigt & framtidsplaner",
    question: "Släpper ni en mobilapp?",
    answer: "Beta väntas i oktober 2025."
  },
];

const categoryIcons: { [key: string]: React.ReactNode } = {
  "Konto & plattform": <UserGroupIcon className="w-6 h-6" />,
  "Bokning & prissättning": <CurrencyDollarIcon className="w-6 h-6" />,
  "Kreativt material & tryck": <PaintBrushIcon className="w-6 h-6" />,
  "Digital DOOH & programmatic": <ComputerDesktopIcon className="w-6 h-6" />,
  "Analys & rapportering": <ChartBarIcon className="w-6 h-6" />,
  "Juridik, etik & regelverk": <ScaleIcon className="w-6 h-6" />,
  "Byggnation & installation": <WrenchScrewdriverIcon className="w-6 h-6" />,
  "Hållbarhet & miljö": <GlobeAltIcon className="w-6 h-6" />,
  "Säkerhet & försäkring": <ShieldCheckIcon className="w-6 h-6" />,
  "Integritet & cookies": <LockClosedIcon className="w-6 h-6" />,
  "Frågor för annonsörer": <MegaphoneIcon className="w-6 h-6" />,
  "Frågor för markägare": <HomeIcon className="w-6 h-6" />,
  "Support & drift": <LifebuoyIcon className="w-6 h-6" />
};

const categoryColors: { [key: string]: string } = {
  "Konto & plattform": "from-blue-500 to-blue-600",
  "Bokning & prissättning": "from-green-500 to-green-600",
  "Kreativt material & tryck": "from-purple-500 to-purple-600",
  "Digital DOOH & programmatic": "from-indigo-500 to-indigo-600",
  "Analys & rapportering": "from-yellow-500 to-yellow-600",
  "Juridik, etik & regelverk": "from-red-500 to-red-600",
  "Byggnation & installation": "from-gray-500 to-gray-600",
  "Hållbarhet & miljö": "from-emerald-500 to-emerald-600",
  "Säkerhet & försäkring": "from-orange-500 to-orange-600",
  "Integritet & cookies": "from-pink-500 to-pink-600",
  "Frågor för annonsörer": "from-cyan-500 to-cyan-600",
  "Frågor för markägare": "from-teal-500 to-teal-600",
  "Support & drift": "from-rose-500 to-rose-600"
};

export default function QAPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Alla');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const categories = ['Alla', ...Array.from(new Set(faqData.map(item => item.category)))];

  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Alla' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 uppercase tracking-wider">
              VANLIGA FRÅGOR
            </h1>
            <p className="text-xl text-gray-600 mb-12 font-medium uppercase tracking-wide">
              ALLT DU BEHÖVER VETA OM BILLBOARDBEE
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <MagnifyingGlassIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-orange-600 transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SÖK BLAND FRÅGOR..."
                  className="w-full pl-16 pr-6 py-5 text-lg font-medium placeholder-gray-400 bg-white border-2 border-gray-200 rounded-full focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  {category !== 'Alla' && (
                    <span className={selectedCategory === category ? 'text-white' : 'text-gray-600'}>
                      {categoryIcons[category]}
                    </span>
                  )}
                  {category}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <AnimatePresence mode="wait">
          {filteredFAQs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 uppercase">INGA RESULTAT</h3>
              <p className="text-gray-600 uppercase">PROVA ATT SÖKA PÅ NÅGOT ANNAT</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredFAQs.map((item, index) => {
                const isExpanded = expandedItems.includes(index);
                const categoryColor = categoryColors[item.category] || "from-gray-500 to-gray-600";
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <div
                      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                        isExpanded ? 'ring-2 ring-orange-500' : ''
                      }`}
                    >
                      <button
                        onClick={() => toggleExpanded(index)}
                        className="w-full px-8 py-6 text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-inset"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r ${categoryColor} text-white flex-shrink-0`}>
                                {categoryIcons[item.category]}
                              </span>
                              <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                                {item.category}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 pr-8 group-hover:text-orange-600 transition-colors">
                              {item.question}
                            </h3>
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0 mt-8"
                          >
                            <ChevronDownIcon className="w-6 h-6 text-gray-400 group-hover:text-orange-600 transition-colors" />
                          </motion.div>
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-8 pb-6 pt-2">
                              <div className="pl-13 pr-8">
                                <p className="text-gray-700 leading-relaxed">
                                  {item.answer}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-20 mt-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-wider">
              HITTADE DU INTE SVARET?
            </h2>
            <p className="text-xl text-white/90 mb-8 uppercase tracking-wide">
              VI HJÄLPER DIG GÄRNA!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:support@billboardbee.se"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-orange-600 rounded-full font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                MAILA OSS
              </motion.a>
              <motion.a
                href="tel:08123456"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/20 backdrop-blur text-white border-2 border-white rounded-full font-bold uppercase tracking-wider hover:bg-white/30 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                RING OSS
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 