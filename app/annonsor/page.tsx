'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  LightBulbIcon, 
  MapPinIcon, 
  PhotoIcon, 
  CurrencyDollarIcon,
  PaintBrushIcon,
  CreditCardIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  DocumentChartBarIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const steps = [
  {
    number: "01",
    title: "Inspiration & behovsanalys",
    description: "Kort behovsintervju eller online-quiz identifierar målgrupp, kampanjmål, tidsperiod och ungefärlig budget. AI-baserad Buzz-idégenerator skapar första rubrik/färgsättning anpassad till DOOH-format.",
    icon: LightBulbIcon,
    color: "from-purple-500 to-pink-500"
  },
  {
    number: "02",
    title: "Hitta rätt location",
    description: "Interaktiv karta filtrerar på räckvidd, demografi, trafikflöde, budgetspann och dataintervall. Heat-overlay visar 'hot spots' för vald målgrupp; realtidsdata hämtas från mobil-GPS och trafikkameror.",
    icon: MapPinIcon,
    color: "from-blue-500 to-cyan-500"
  },
  {
    number: "03",
    title: "Live-mockup på 10 sekunder",
    description: "Klicka valfri skylt → ladda upp JPG/MP4/HTML-5-banner → se motivet automatiskt mappat på skylten (dag- och kvällsläge). Delningslänk skapas automatiskt för intern godkännande-rundor.",
    icon: PhotoIcon,
    color: "from-green-500 to-emerald-500"
  },
  {
    number: "04",
    title: "Kampanjpaketering & budget",
    description: "Dra 'slider' för kampanjlängd; systemet räknar CPM, reach och antal in-screen-sekunder. Rekommenderad mediaplan (sekund-split / kreativa variationer) genereras automatiskt.",
    icon: CurrencyDollarIcon,
    color: "from-yellow-500 to-orange-500"
  },
  {
    number: "05",
    title: "Kreativ produktion (tillval)",
    description: "In-house designstudio gör anpassning, motion-grafik eller 3D-mockups enligt IAB DOOH-specar. Filvalidering (filstorlek, luminans, färgrymd) sker automatiskt innan uppladdning.",
    icon: PaintBrushIcon,
    color: "from-pink-500 to-rose-500"
  },
  {
    number: "06",
    title: "Bokning & betalning",
    description: "Självbetjänad kassa med Stripe / faktura / pay-later. Dynamisk prissättning (yield) kan ge 'early-bird'-rabatt om det finns luckor.",
    icon: CreditCardIcon,
    color: "from-indigo-500 to-purple-500"
  },
  {
    number: "07",
    title: "Publicering & Go-Live",
    description: "Kampanjen schemaläggs på valda skyltar; systemet skickar automatiska QC-foton när första spoten rullat. Trigger-styrning möjlig (väder, tid på dygnet, målgrupp-densitet).",
    icon: RocketLaunchIcon,
    color: "from-red-500 to-orange-500"
  },
  {
    number: "08",
    title: "Live-dashboard & optimering",
    description: "Realtid: impressions, väder, QR-scans, foot-fall. A/B-split-rapport visar bäst presterande kreativer; reklamköparen kan pausa, byta motiv eller förlänga i ett klick.",
    icon: ChartBarIcon,
    color: "from-cyan-500 to-blue-500"
  },
  {
    number: "09",
    title: "Slutrapport & ROI-bevis",
    description: "PDF med samtliga metrics, heatmap över visningsfönster och demografiska reach-grafer. Integration till GA4 eller Adobe Analytics för helhetssyn med online-konverteringar.",
    icon: DocumentChartBarIcon,
    color: "from-emerald-500 to-green-500"
  },
  {
    number: "10",
    title: "Uppföljning & återköp",
    description: "AI-förslag på nästa kampanjperiod baserat på säsong, målgrupp, attrition-rate. Lojalitetspoäng som kan bytas mot produktionsstöd eller extra spot-dagar.",
    icon: ArrowPathIcon,
    color: "from-orange-500 to-yellow-500"
  }
];

export default function AnnonsorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-purple-50 pt-32 pb-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-6"
            >
              <SparklesIcon className="w-4 h-4" />
              För annonsörer
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Så funkar det för{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                annonsörer
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Från idé till färdig kampanj på 10 steg. Vi guidar dig hela vägen med smarta verktyg, 
              AI-stöd och branschexpertis.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard-annonsor"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Kom igång nu
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center px-8 py-4 bg-white text-gray-700 rounded-full font-semibold text-lg shadow-md hover:shadow-lg border border-gray-200 hover:border-orange-500 hover:text-orange-600 transition-all duration-200"
              >
                Boka demo
              </Link>
            </div>
          </div>

          {/* Animated decoration */}
          <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        </motion.div>
      </section>

      {/* Process Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="absolute left-12 top-32 w-0.5 h-24 bg-gradient-to-b from-gray-300 to-transparent"></div>
              )}
              
              <div className="flex gap-8 items-start">
                {/* Step number and icon */}
                <div className="flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} p-1 shadow-lg`}
                  >
                    <div className="w-full h-full bg-white rounded-xl flex items-center justify-center relative">
                      <step.icon className="w-10 h-10 text-gray-700" />
                      <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
                        {step.number}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  
                  {/* Progress indicator */}
                  <div className="mt-6 flex items-center gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-500">Genomsnittlig tid: {3 + index * 2} minuter</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
        <div className="w-full sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Resultat som talar för sig själva</h2>
            <p className="text-xl opacity-90">Våra annonsörer ser fantastiska resultat</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { value: "2.5M", label: "Visningar per månad", suffix: "+" },
              { value: "89", label: "Nöjda annonsörer", suffix: "%" },
              { value: "3.2", label: "ROI i genomsnitt", suffix: "x" },
              { value: "24", label: "Support dygnet runt", suffix: "/7" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl font-bold mb-2">
                  {stat.value}<span className="text-3xl">{stat.suffix}</span>
                </div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Redo att sätta igång?</h2>
          <p className="text-xl mb-10 opacity-90">
            Starta din första kampanj idag och nå tusentals potentiella kunder
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard-annonsor"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Skapa konto gratis
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center px-8 py-4 bg-gray-800 text-white rounded-full font-semibold text-lg hover:bg-gray-700 transition-all duration-200"
            >
              Prata med säljteamet
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
} 