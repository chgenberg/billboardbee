"use client";
import { useState } from 'react';
import Image from 'next/image';
import { FaQuestionCircle, FaChevronDown } from 'react-icons/fa';

interface QAItem {
  id: number;
  question: string;
  answer: string;
}

export default function QA() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const qaData: QAItem[] = [
    { id: 1, question: "Vilken information lagrar ni om mig när jag skapar ett konto?", answer: "Namn, e-post, telefon, lösenords-hash och eventuell företagsinformation – inget mer." },
    { id: 2, question: "Sparar ni kompletta kortnummer?", answer: "Nej. Vi använder Stripe; endast en krypterad betal-token lagras hos oss." },
    { id: 3, question: "Hur länge behåller ni mina uppgifter efter att jag raderat kontot?", answer: "Max 12 månader för support-spårbarhet och 7 år för bokföringsmaterial." },
    { id: 4, question: "Kan jag annonsera anonymt?", answer: "Du kan visa annons utan personnamn, men faktureringsuppgifter måste vara korrekta enligt bokföringslagen." },
    { id: 5, question: "Hur raderar jag all data permanent?", answer: "Skicka mejl till privacy@billboardbee.com — vi bekräftar radering inom 30 dagar." },
    { id: 6, question: "Vad är skillnaden mellan villkor och integritetspolicy?", answer: "Villkoren reglerar dina rättigheter & skyldigheter; Integritetspolicyn berättar hur vi behandlar persondata." },
    { id: 7, question: "Måste jag acceptera cookies?", answer: "Endast de strikt nödvändiga. Analys- och marknadsföringscookies är valbara via vår banner." },
    { id: 8, question: "Vad händer om jag blockerar cookies?", answer: "Tjänsten fungerar, men inloggning och kart-filtrering kan bli långsammare." },
    { id: 9, question: "Vilka tredjeparts-cookies använder ni?", answer: "Matomo (analys) och Meta Pixel (kampanj-mätning). Inga andra." },
    { id: 10, question: "Kan jag ladda ned en kopia av all min data?", answer: `Ja, klicka \"Ladda ned mina data\" i profilinställningarna eller be supporten.` },
    { id: 11, question: "Vad står i ert Personuppgiftsbiträdes-avtal (DPA) som är viktigt för mig som företagskund?", answer: "Att vi endast behandlar data enligt dina instruktioner, redogör för underbiträden och raderar allt inom 60 dagar efter avslut." },
    { id: 12, question: "Hur ofta gör ni penetrationstester?", answer: "Minst årligen av extern part; sårbarheter patchas efter en 30-dagars SLA." },
    { id: 13, question: "Var lagras våra data fysiskt?", answer: "AWS Frankfurt (eu-central-1) för drift och säkerhetskopior i AWS Stockholm." },
    { id: 14, question: "Använder ni någon AI för att profilera användare?", answer: "Nej. Trafik-prognoser görs på platsnivå, inte på individnivå, och omfattas inte av automatiserade beslut enligt GDPR art. 22." },
    { id: 15, question: "Får jag skicka reklam via er plattform till markägare?", answer: "Endast inom ramen för pågående bokning; massutskick är förbjudet enligt villkor §5." }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-white pt-20">
      {/* Hero Section */}
      <div className="w-full min-h-[40vh] flex flex-col items-center justify-center relative pb-12">
        {/* Bakgrundsbild */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/omoss.png"
            alt="Bakgrund Q&A"
            fill
            className="object-contain object-center opacity-60 scale-125 [mask-image:url('data:image/svg+xml;utf8,<svg width=\'100%25\' height=\'100%25\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'><radialGradient id=\'g\' cx=\'50%\' cy=\'50%\' r=\'0.8\'><stop offset=\'70%\' stop-color=\'white\'/><stop offset=\'100%\' stop-color=\'black\'/></radialGradient><ellipse cx=\'50\' cy=\'50\' rx=\'50\' ry=\'40\' fill=\'url(%23g)\'/><path d=\'M0,60 Q10,80 30,90 Q50,100 70,90 Q90,80 100,60 Q100,40 90,20 Q70,0 50,10 Q30,0 10,20 Q0,40 0,60 Z\' fill=\'black\' opacity=\'0.15\'/></svg>'); mask-size: cover; mask-repeat: no-repeat;"
            priority
          />
          <div className="absolute inset-0 bg-white/40" />
        </div>
        <div className="relative z-10 text-center pt-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#ff6b00] tracking-widest mb-4 drop-shadow-sm">Vanliga frågor</h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto font-light">
            Här hittar du svar på de vanligaste frågorna om BillboardBee, integritet och plattformens funktioner.
          </p>
        </div>
      </div>

      {/* Q&A Section */}
      <div className="w-full max-w-3xl mx-auto px-4 py-16">
        <div className="flex flex-col gap-6">
          {qaData.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none group"
                aria-expanded={openItems.includes(item.id)}
              >
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ff6b00]/10">
                    <FaQuestionCircle className="text-[#ff6b00] text-xl" />
                  </span>
                  <span className="font-semibold text-gray-900 text-lg group-hover:text-[#ff6b00] transition-colors">
                    {item.question}
                  </span>
                </div>
                <FaChevronDown
                  className={`text-[#ff6b00] text-xl transform transition-transform duration-300 ${openItems.includes(item.id) ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className={`px-6 transition-all duration-300 bg-[#fff8f2] ${openItems.includes(item.id) ? 'max-h-96 py-4' : 'max-h-0 py-0'} overflow-hidden`}
                aria-hidden={!openItems.includes(item.id)}
              >
                <p className="text-gray-700 leading-relaxed text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 