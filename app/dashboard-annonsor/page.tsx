'use client';

import { motion } from 'framer-motion';
import { FaBullseye, FaChartBar, FaCalendarCheck, FaRocket, FaPlusCircle } from 'react-icons/fa';

export default function AnnonsorDashboard() {
  // Dummy stats
  const stats = [
    { label: 'Aktiva kampanjer', value: 4, icon: <FaRocket className="text-2xl text-orange-500" /> },
    { label: 'Bokningar', value: 12, icon: <FaCalendarCheck className="text-2xl text-orange-500" /> },
    { label: 'Budget kvar', value: '32 000 kr', icon: <FaChartBar className="text-2xl text-orange-500" /> },
  ];

  // Dummy activity
  const activity = [
    { time: 'Idag', text: 'Du bokade skyltplats i Stockholm.' },
    { time: 'Igår', text: 'Din kampanj "Vårkampanj" startade.' },
    { time: '22 maj', text: 'Du laddade upp nytt kampanjmaterial.' },
    { time: '20 maj', text: 'Betalning mottagen för "Vårkampanj".' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <div className="inline-block p-4 bg-orange-50 rounded-2xl mb-6">
          <FaBullseye className="text-4xl text-orange-500" />
        </div>
        <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">
          Välkommen till din Dashboard
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Här får du full kontroll över dina kampanjer, bokningar och resultat. Skapa, följ upp och optimera din annonsering – allt på ett ställe.
        </p>
      </motion.div>

      {/* CTA Button - direkt under välkomsttexten */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex justify-center mb-12"
      >
        <button
          onClick={() => window.location.href = '/saljare/ny-annons'}
          className="relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-200 text-xl transform hover:scale-105"
        >
          <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-20"></span>
          <FaPlusCircle className="text-2xl" />
          SKAPA ANNONS
        </button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-50 rounded-xl">
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Senaste aktivitet</h2>
        <div className="space-y-6">
          {activity.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="w-2 h-2 mt-2 rounded-full bg-orange-500" />
              <div>
                <p className="text-sm text-gray-500 mb-1">{item.time}</p>
                <p className="text-gray-900">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 