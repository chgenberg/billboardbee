'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with bee image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1.5 }}
            className="relative w-full h-full max-w-4xl"
          >
            <Image
              src="/bi.png"
              alt="BillboardBee"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-light text-gray-900 mb-6 tracking-tight uppercase"
          >
            OM OSS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 font-light"
          >
            Där mark möter mening
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Vision Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 uppercase tracking-wide">
              EN NY ERA AV UTOMHUSREKLAM
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Vi omdefinierar hur markägare och varumärken möts. Genom att förbinda tradition med innovation 
              skapar vi en plattform där varje skylt berättar en historia.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {[
              {
                title: 'VISION',
                icon: '💡',
                description: 'Vi såg ett landskap av oanvända möjligheter. Varje tom reklamram blev en chans att skapa något extraordinärt – en plattform där lokala berättelser möter globala varumärken.'
              },
              {
                title: 'SAMARBETE',
                icon: '🤝',
                description: 'Vi bygger broar mellan markägare och annonsörer. Varje samarbete är en möjlighet att stärka lokalsamhällen och skapa meningsfulla kopplingar.'
              },
              {
                title: 'HÅLLBARHET',
                icon: '🌱',
                description: 'Varje skylt bidrar till en hållbar framtid. Vi investerar i lokalsamhällen, stödjer grön omställning och skapar möjligheter som varar.'
              },
              {
                title: 'ENGAGEMANG',
                icon: '❤️',
                description: 'Vi tror på kraften i autentiska berättelser. Varje projekt är en chans att inspirera, engagera och skapa verklig förändring.'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{value.icon}</span>
                  <h3 className="text-2xl font-medium text-gray-900">{value.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed pl-14">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light text-gray-900 mb-16 text-center uppercase tracking-wide"
          >
            VÅR PÅVERKAN
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '100%', label: 'Transparens i alla transaktioner' },
              { number: '24/7', label: 'Realtidsdata och support' },
              { number: '1000+', label: 'Aktiva samarbeten' }
            ].map((stat, index) => (
              <motion.div
                key={stat.number}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-light text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 mb-4">
                  {stat.number}
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8 uppercase tracking-wide">
            FRAMTIDEN ÄR HÄR
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
            BillboardBee är mer än en plattform – det är en rörelse. En rörelse som förbinder tradition med innovation, 
            lokalt med globalt, och vision med verklighet. Tillsammans skapar vi en framtid där varje skylt berättar 
            en historia, varje samarbete bygger ett samhälle, och varje möte skapar möjligheter.
          </p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <Image
              src="/bi.png"
              alt="BillboardBee"
              width={80}
              height={80}
              className="mx-auto opacity-20"
            />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
} 