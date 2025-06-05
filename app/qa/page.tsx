"use client";

import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  // Konto & Plattform
  {
    id: '1',
    question: 'Hur skapar jag ett konto?',
    answer: 'För att skapa ett konto, klicka på "Logga in" och välj sedan "Registrera". Fyll i dina uppgifter och välj om du vill registrera dig som annonsör eller hyresvärd.',
    category: 'Konto & Plattform'
  },
  {
    id: '2',
    question: 'Vad är skillnaden mellan annonsör och hyresvärd?',
    answer: 'Annonsörer hyr reklamplatser för sina kampanjer, medan hyresvärdar hyr ut sina skyltplatser till annonsörer.',
    category: 'Konto & Plattform'
  },
  // Bokning & Prissättning
  {
    id: '3',
    question: 'Hur bokar jag en skylt?',
    answer: 'Sök efter lediga skyltar i ditt område, välj den skylt du är intresserad av och klicka på "Boka". Följ sedan instruktionerna för att slutföra bokningen.',
    category: 'Bokning & Prissättning'
  },
  {
    id: '4',
    question: 'Kan jag avboka en skylt?',
    answer: 'Ja, du kan avboka en skylt upp till 30 dagar innan kampanjstart. Kontakta vår support för hjälp med avbokning.',
    category: 'Bokning & Prissättning'
  },
  // Kreativt material & Tryck
  {
    id: '5',
    question: 'Vilket format ska mitt material ha?',
    answer: 'Materialet ska vara i högupplöst format (minst 300 DPI). Vi accepterar PDF, JPG och PNG. Exakta mått beror på skylten du bokar.',
    category: 'Kreativt material & Tryck'
  },
  {
    id: '6',
    question: 'Kan ni hjälpa till med design?',
    answer: 'Ja, vi har partners som kan hjälpa till med design av ditt reklammaterial. Kontakta oss för mer information.',
    category: 'Kreativt material & Tryck'
  },
  // Juridik, Etik & Regelverk
  {
    id: '7',
    question: 'Behöver jag tillstånd för min reklam?',
    answer: 'I de flesta fall har skyltägaren redan nödvändiga tillstånd. Vi hjälper dig att säkerställa att din reklam följer lokala regler.',
    category: 'Juridik, Etik & Regelverk'
  },
  // Frågor för annonsörer
  {
    id: '8',
    question: 'Hur lång tid tar det att få upp min reklam?',
    answer: 'Normalt tar det 5-10 arbetsdagar från godkänt material till att reklamen är uppe, beroende på skylttyp och plats.',
    category: 'Frågor för annonsörer'
  },
  // Support & Drift
  {
    id: '9',
    question: 'Vad händer om min skylt går sönder?',
    answer: 'Vi övervakar alla skyltar och åtgärdar eventuella problem så snart som möjligt. Du får automatiskt kompensation för eventuell förlorad exponeringstid.',
    category: 'Support & Drift'
  }
];

const categories = [
  'Alla',
  'Konto & Plattform',
  'Bokning & Prissättning',
  'Kreativt material & Tryck',
  'Juridik, Etik & Regelverk',
  'Frågor för annonsörer',
  'Support & Drift'
];

export default function QAPage() {
  const [selectedCategory, setSelectedCategory] = useState('Alla');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'Alla' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Vanliga frågor</h1>
          <p className="text-lg text-gray-600">Allt du behöver veta om BillboardBee</p>
          
          {/* Search */}
          <div className="mt-8 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Sök bland frågor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleExpanded(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{faq.question}</h3>
                  <p className="text-sm text-gray-500 mt-1">{faq.category}</p>
                </div>
                <div className="ml-4">
                  {expandedItems.includes(faq.id) ? (
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {expandedItems.includes(faq.id) && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Inga frågor hittades. Prova att söka efter något annat.</p>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-16 bg-orange-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hittade du inte svaret?</h2>
          <p className="text-gray-600 mb-6">Vårt supportteam hjälper dig gärna</p>
          <a
            href="/kontakt"
            className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Kontakta oss
          </a>
        </div>
      </div>
    </div>
  );
}