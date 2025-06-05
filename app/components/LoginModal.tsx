'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, MegaphoneIcon, HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
                <h2 className="text-3xl font-bold text-center uppercase tracking-wider">
                  VÄLJ DIN ROLL
                </h2>
                <p className="text-center mt-2 text-white/90">
                  Logga in som annonsör eller uthyrare
                </p>
              </div>
              
              {/* Options */}
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Advertiser Option */}
                  <Link href="/login?role=annonsor" onClick={onClose}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      className="group cursor-pointer"
                    >
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-transparent hover:border-blue-500 transition-all duration-300 h-full">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <MegaphoneIcon className="w-10 h-10 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
                            ANNONSÖR
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            För företag och privatpersoner som vill hyra reklamplatser och nå ut med sitt budskap
                          </p>
                          <div className="pt-4">
                            <span className="inline-flex items-center gap-2 text-blue-600 font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                              LOGGA IN SOM ANNONSÖR
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                  
                  {/* Landlord Option */}
                  <Link href="/login?role=uthyrare" onClick={onClose}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      className="group cursor-pointer"
                    >
                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-transparent hover:border-green-500 transition-all duration-300 h-full">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <HomeIcon className="w-10 h-10 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
                            UTHYRARE
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            För markägare och fastighetsägare som vill hyra ut sina skyltplatser och tjäna pengar
                          </p>
                          <div className="pt-4">
                            <span className="inline-flex items-center gap-2 text-green-600 font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                              LOGGA IN SOM UTHYRARE
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </div>
                
                {/* Divider */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-center text-gray-600">
                    Har du inget konto?{' '}
                    <Link href="/register" onClick={onClose} className="font-bold text-orange-600 hover:text-orange-700 transition-colors">
                      SKAPA KONTO HÄR
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 