'use client';
import { FaBullseye, FaChartBar, FaCalendarCheck, FaRocket, FaPlusCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function AnnonsorDashboardClient() {
  // Dummy stats
  const stats = [
    { label: 'Kampanjer', value: 4, icon: <FaRocket className="text-2xl text-[#ff6b00]" /> },
    { label: 'Bokningar', value: 12, icon: <FaCalendarCheck className="text-2xl text-[#ff6b00]" /> },
    { label: 'Budget kvar', value: '32 000 kr', icon: <FaChartBar className="text-2xl text-[#ff6b00]" /> },
  ];
  // Dummy progress
  const progress = 0.6; // 60% of monthly goal
  // Dummy activity
  const activity = [
    { time: 'Idag', text: 'Du bokade skyltplats i Stockholm.' },
    { time: 'Igår', text: 'Din kampanj "Vårkampanj" startade.' },
    { time: '22 maj', text: 'Du laddade upp nytt kampanjmaterial.' },
    { time: '20 maj', text: 'Betalning mottagen för "Vårkampanj".' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f0] via-white to-[#eaf6ff] pb-16">
      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto pt-12 pb-8 px-4 text-center"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="bg-[#ff6b00]/10 rounded-full p-4 mb-2 shadow-lg">
            <FaBullseye className="text-5xl text-[#ff6b00] drop-shadow" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#ff6b00] tracking-tight mb-2" style={{letterSpacing: '0.04em'}}>Välkommen till din Dashboard</h1>
          <p className="text-lg md:text-xl text-[#183e4f] font-medium max-w-2xl mx-auto mb-2">Här får du full kontroll över dina kampanjer, bokningar och resultat. Skapa, följ upp och optimera din annonsering – allt på ett ställe.</p>
        </div>
      </motion.div>

      {/* STAT CARDS */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 px-4"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 32px #ff6b0033' }}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-2 border border-[#ff6b00]/10 cursor-pointer transition"
          >
            {s.icon}
            <div className="text-3xl font-bold text-[#ff6b00]">{s.value}</div>
            <div className="text-gray-700 font-medium">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* PROGRESS BAR */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="max-w-2xl mx-auto mb-10 px-4"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#183e4f] font-semibold">Månadens mål</span>
          <span className="text-[#ff6b00] font-bold">{Math.round(progress * 5)}/5 kampanjer</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-[#ff6b00] to-[#ffb347] h-4 rounded-full shadow"
            style={{ width: `${progress * 100}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ delay: 0.7, duration: 1 }}
          />
        </div>
      </motion.div>

      {/* RECENT ACTIVITY */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="max-w-3xl mx-auto mb-12 px-4"
      >
        <h2 className="text-2xl font-bold text-[#183e4f] mb-4">Senaste aktivitet</h2>
        <div className="bg-white rounded-2xl shadow p-6">
          <ol className="relative border-l-4 border-[#ff6b00]/30 pl-6 space-y-6">
            {activity.map((a, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                className="flex flex-col md:flex-row md:items-center gap-1"
              >
                <span className="absolute -left-3 w-6 h-6 bg-[#ff6b00] rounded-full flex items-center justify-center text-white font-bold shadow-md">{i + 1}</span>
                <span className="text-sm text-gray-400 w-24 md:w-20 flex-shrink-0">{a.time}</span>
                <span className="text-gray-800 font-medium">{a.text}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </motion.div>

      {/* CTA BUTTON */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="flex justify-center"
      >
        <button
          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#ff6b00] to-[#ffb347] text-white text-xl font-bold rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#ff6b00]/30"
          style={{ letterSpacing: '0.04em' }}
          onClick={() => window.location.href = '/dashboard-annonsor/utforska'}
        >
          <FaPlusCircle className="text-2xl" /> Skapa ny kampanj
        </button>
      </motion.div>
    </div>
  );
} 