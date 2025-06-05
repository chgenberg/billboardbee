"use client";
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

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

export default function QAPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Alla');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  // Get unique categories
  const categories = ['Alla', ...Array.from(new Set(faqData.map(item => item.category)))];

  // Filter FAQ items
  const filteredItems = faqData.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Alla' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-light text-gray-900 mb-4 tracking-tight">
            Vanliga frågor
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Allt du behöver veta om BillboardBee
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Sök bland frågor..."
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <button
                onClick={() => toggleExpanded(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-lg">{item.question}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                </div>
                <ChevronDownIcon 
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                    expandedItems.has(index) ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {expandedItems.has(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">
              Hittade du inte svaret?
            </h2>
            <p className="text-gray-600 mb-6">
              Kontakta vår support så hjälper vi dig
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@billboardbee.se"
                className="px-6 py-3 bg-white text-orange-600 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200"
              >
                support@billboardbee.se
              </a>
              <a
                href="tel:08-123 456 78"
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200"
              >
                08-123 456 78
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 