"use client";
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface QAItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export default function QA() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const qaData: QAItem[] = [
    { id: 1, category: 'Integritet', question: "Vilken information lagrar ni om mig när jag skapar ett konto?", answer: "Namn, e-post, telefon, lösenords-hash och eventuell företagsinformation – inget mer." },
    { id: 2, category: 'Betalning', question: "Sparar ni kompletta kortnummer?", answer: "Nej. Vi använder Stripe; endast en krypterad betal-token lagras hos oss." },
    { id: 3, category: 'Integritet', question: "Hur länge behåller ni mina uppgifter efter att jag raderat kontot?", answer: "Max 12 månader för support-spårbarhet och 7 år för bokföringsmaterial." },
    { id: 4, category: 'Användning', question: "Kan jag annonsera anonymt?", answer: "Du kan visa annons utan personnamn, men faktureringsuppgifter måste vara korrekta enligt bokföringslagen." },
    { id: 5, category: 'Integritet', question: "Hur raderar jag all data permanent?", answer: "Skicka mejl till privacy@billboardbee.com — vi bekräftar radering inom 30 dagar." },
    { id: 6, category: 'Villkor', question: "Vad är skillnaden mellan villkor och integritetspolicy?", answer: "Villkoren reglerar dina rättigheter & skyldigheter; Integritetspolicyn berättar hur vi behandlar persondata." },
    { id: 7, category: 'Cookies', question: "Måste jag acceptera cookies?", answer: "Endast de strikt nödvändiga. Analys- och marknadsföringscookies är valbara via vår banner." },
    { id: 8, category: 'Cookies', question: "Vad händer om jag blockerar cookies?", answer: "Tjänsten fungerar, men inloggning och kart-filtrering kan bli långsammare." },
    { id: 9, category: 'Cookies', question: "Vilka tredjeparts-cookies använder ni?", answer: "Matomo (analys) och Meta Pixel (kampanj-mätning). Inga andra." },
    { id: 10, category: 'Integritet', question: "Kan jag ladda ned en kopia av all min data?", answer: 'Ja, klicka "Ladda ned mina data" i profilinställningarna eller be supporten.' },
    { id: 11, category: 'Företag', question: "Vad står i ert Personuppgiftsbiträdes-avtal (DPA) som är viktigt för mig som företagskund?", answer: "Att vi endast behandlar data enligt dina instruktioner, redogör för underbiträden och raderar allt inom 60 dagar efter avslut." },
    { id: 12, category: 'Säkerhet', question: "Hur ofta gör ni penetrationstester?", answer: "Minst årligen av extern part; sårbarheter patchas efter en 30-dagars SLA." },
    { id: 13, category: 'Säkerhet', question: "Var lagras våra data fysiskt?", answer: "AWS Frankfurt (eu-central-1) för drift och säkerhetskopior i AWS Stockholm." },
    { id: 14, category: 'AI', question: "Använder ni någon AI för att profilera användare?", answer: "Nej. Trafik-prognoser görs på platsnivå, inte på individnivå, och omfattas inte av automatiserade beslut enligt GDPR art. 22." },
    { id: 15, category: 'Användning', question: "Får jag skicka reklam via er plattform till markägare?", answer: "Endast inom ramen för pågående bokning; massutskick är förbjudet enligt villkor §5." }
  ];

  const categories = ['all', ...Array.from(new Set(qaData.map(item => item.category)))];
  const filteredData = selectedCategory === 'all' ? qaData : qaData.filter(item => item.category === selectedCategory);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/qa.png"
            alt="Q&A Background"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-light text-gray-900 mb-4 tracking-tight uppercase"
          >
            VANLIGA FRÅGOR
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 font-light"
          >
            Allt du behöver veta om BillboardBee
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'ALLA' : category.toUpperCase()}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Q&A Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div className="space-y-4">
            {filteredData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-8 py-6 text-left focus:outline-none group"
                  aria-expanded={openItems.includes(item.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                        {item.question}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: openItems.includes(item.id) ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </div>
                </button>
                
                <AnimatePresence>
                  {openItems.includes(item.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-8 pb-6 overflow-hidden"
                    >
                      <p className="text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-light text-gray-900 mb-4 uppercase tracking-wide">
            INTE HITTAT SVARET?
          </h2>
          <p className="text-gray-600 mb-8">
            Kontakta oss så hjälper vi dig
          </p>
          <a
            href="mailto:support@billboardbee.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors duration-200 font-medium"
          >
            KONTAKTA SUPPORT
          </a>
        </motion.div>
      </section>
    </div>
  );
} 