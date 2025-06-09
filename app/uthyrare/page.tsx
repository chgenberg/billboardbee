'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  HomeModernIcon,
  ChartBarIcon,
  DocumentTextIcon,
  WrenchScrewdriverIcon,
  SignalIcon,
  CogIcon,
  BanknotesIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const steps = [
  {
    number: "01",
    title: "Intresseanmälan & platsscreening",
    description: "Fyll i adress, ladda upp 2–3 foton av tänkt placering. GIS-modul beräknar trafikdata, siktvinkel, skugga och konkurrerande skyltar i området.",
    icon: HomeModernIcon,
    color: "from-green-500 to-emerald-500"
  },
  {
    number: "02",
    title: "Intäktsprognos & affärsmodell",
    description: "Plattformen genererar automatisk forecast: årlig bruttointäkt, occupancy-rate och underhållskostnad. Alternativ: fast hyra, revenue-share eller hybridmodell.",
    icon: ChartBarIcon,
    color: "from-blue-500 to-cyan-500"
  },
  {
    number: "03",
    title: "Bygglov & regelverk",
    description: "Jurist-team tar fram nödvändiga ritningar, ljus-beräkningar och miljökonsekvens­bedömning. Ansökan lämnas in digitalt till kommun/Länsstyrelse; status kan följas i dashboard.",
    icon: DocumentTextIcon,
    color: "from-purple-500 to-indigo-500"
  },
  {
    number: "04",
    title: "Avtal & installation",
    description: "Digital signering av hyres-/samarbetsavtal + ansvarsförsäkring. Montageplan tas fram (fundament, el, fiber, 4G/5G-router). Installationsteam bokas; du får push-notis med datum och tidsfönster.",
    icon: WrenchScrewdriverIcon,
    color: "from-orange-500 to-red-500"
  },
  {
    number: "05",
    title: "Skylt går live",
    description: "Slutbesiktning & fotodokumentation laddas upp i systemet. Skylten markeras 'tillgänglig' i Lediga-lista och kartan för annonsörer.",
    icon: SignalIcon,
    color: "from-pink-500 to-rose-500"
  },
  {
    number: "06",
    title: "Drift & underhåll",
    description: "Automatisk self-test (ljusstyrka, pixel-fel, temperatur) skickar larm till NOC. Du kan felanmäla via appen (foto + text) och följa ärenden i realtid.",
    icon: CogIcon,
    color: "from-gray-500 to-gray-600"
  },
  {
    number: "07",
    title: "Intäktsdashboard",
    description: "Se bokningar, beläggningsgrad och kommande kampanjer. Prognos uppdateras löpande så du kan planera framtida investeringar.",
    icon: BanknotesIcon,
    color: "from-yellow-500 to-amber-500"
  },
  {
    number: "08",
    title: "Utbetalning & redovisning",
    description: "Intäkter samlas och betalas ut varje månad tillsammans med detaljerad transaktionsrapport och fakturaunderlag. CSV/PDF-export för bokföring; API för direktkoppling till Fortnox/Visma.",
    icon: CurrencyDollarIcon,
    color: "from-green-600 to-emerald-600"
  },
  {
    number: "09",
    title: "Expansion & upsell",
    description: "AI föreslår ytterligare skyltlägen på din mark (t.ex. LED-totem, Adshel) baserat på trafikdata. Referral-program: få bonus när du värvar grannar/kollegor som också sätter upp skylt.",
    icon: ArrowTrendingUpIcon,
    color: "from-indigo-500 to-blue-500"
  },
  {
    number: "10",
    title: "Hållbarhets-modul",
    description: "Dashboard visar energiförbrukning, CO₂-besparing jämfört med tryckt affisch, samt lokala återinvesteringar finansierade av kampanjintäkter. Data kan delas öppet (API/embed) för att stärka markägarens ESG-profil.",
    icon: GlobeAltIcon,
    color: "from-teal-500 to-green-500"
  }
];

export default function UthyrarePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 pt-32 pb-20">
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6"
            >
              <SparklesIcon className="w-4 h-4" />
              För uthyrare
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Så funkar det för{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
                uthyrare
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Förvandla din mark till en lönsam inkomstkälla. Vi sköter allt från tillstånd till 
              teknik – du får passiva intäkter varje månad.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/lediga-skyltar"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Registrera din plats
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center px-8 py-4 bg-white text-gray-700 rounded-full font-semibold text-lg shadow-md hover:shadow-lg border border-gray-200 hover:border-green-500 hover:text-green-600 transition-all duration-200"
              >
                Beräkna intäkter
              </Link>
            </div>
          </div>

          {/* Animated decoration */}
          <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-green-400 to-blue-400 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
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
                    <span className="text-sm text-gray-500">Genomsnittlig tid: {2 + index * 3} dagar</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Income Calculator Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <div className="w-full sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Potentiella intäkter</h2>
            <p className="text-xl opacity-90">Se vad du kan tjäna på din mark</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { value: "45K", label: "Genomsnittlig månadsintäkt", suffix: " kr" },
              { value: "92", label: "Beläggningsgrad", suffix: "%" },
              { value: "540K", label: "Årlig intäkt", suffix: " kr" },
              { value: "0", label: "Din arbetsinsats", suffix: " tim" }
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

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="w-full sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Varför välja BillboardBee?</h2>
            <p className="text-xl text-gray-600">Vi tar hand om allt – du får bara intäkterna</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Helt passiv inkomst",
                description: "Vi sköter allt från installation till underhåll. Du behöver aldrig lyfta ett finger.",
                icon: "💰"
              },
              {
                title: "Garanterade intäkter",
                description: "Fast månadshyra eller revenue share – du väljer modellen som passar dig bäst.",
                icon: "📈"
              },
              {
                title: "Miljövänligt val",
                description: "Digital reklam sparar 95% CO₂ jämfört med tryckta affischer. Bra för plånboken och planeten.",
                icon: "🌱"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
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
          className="w-full sm:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Börja tjäna pengar på din mark idag</h2>
          <p className="text-xl mb-10 opacity-90">
            Registrera din plats och få en gratis intäktsprognos inom 24 timmar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/lediga-skyltar"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Registrera plats nu
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center px-8 py-4 bg-gray-800 text-white rounded-full font-semibold text-lg hover:bg-gray-700 transition-all duration-200"
            >
              Prata med en expert
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
} 