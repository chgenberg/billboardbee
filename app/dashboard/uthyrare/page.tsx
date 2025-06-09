'use client';

import { motion } from 'framer-motion';
import { FaHome, FaChartLine, FaCalendarAlt, FaTools, FaFileAlt, FaCreditCard, FaChartBar, FaBell, FaCog } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function UthyrareDashboard() {
  const router = useRouter();

  // Dummy stats
  const stats = [
    { label: 'Aktiva annonser', value: 8, icon: <FaHome className="text-2xl text-orange-500" /> },
    { label: 'Intäkter (2024)', value: '45 000 kr', icon: <FaChartLine className="text-2xl text-orange-500" /> },
    { label: 'Bokningar', value: 15, icon: <FaCalendarAlt className="text-2xl text-orange-500" /> },
  ];

  // Dummy activity
  const activity = [
    { time: 'Idag', text: 'Ny bokning mottagen för skyltplats i Stockholm.' },
    { time: 'Igår', text: 'Betalning mottagen för "Vårkampanj".' },
    { time: '22 maj', text: 'Ny annons publicerad.' },
    { time: '20 maj', text: 'Underhållsrapport uppdaterad.' },
  ];

  // Quick actions
  const quickActions = [
    { name: 'Skapa ny annons', icon: <FaHome />, href: '/saljare/ny-annons' },
    { name: 'Hantera bokningar', icon: <FaCalendarAlt />, href: '/dashboard/calendar' },
    { name: 'Underhåll', icon: <FaTools />, href: '/dashboard/maintenance' },
    { name: 'Tillstånd', icon: <FaFileAlt />, href: '/dashboard/permits' },
    { name: 'Utbetalningar', icon: <FaCreditCard />, href: '/dashboard/payout-settings' },
    { name: 'Rapporter', icon: <FaChartBar />, href: '/dashboard/reports' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-2"
      >
        <div className="inline-block p-4 bg-orange-50 rounded-2xl mb-6">
          <FaHome className="text-4xl text-orange-500" />
        </div>
        <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">
          Välkommen till din Dashboard
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Här får du full kontroll över dina skyltplatser, bokningar och intäkter. Hantera, optimera och väx ditt utbud – allt på ett ställe.
        </p>
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

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {quickActions.map((action, index) => (
          <motion.button
            key={action.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            onClick={() => router.push(action.href)}
            className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 text-left"
          >
            <div className="p-3 bg-orange-50 rounded-xl text-orange-500">
              {action.icon}
            </div>
            <span className="font-medium text-gray-900">{action.name}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Senaste aktivitet</h2>
        <div className="space-y-6">
          {activity.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
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