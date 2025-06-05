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
          
          {/* Modal - Centered and smaller */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-lg">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-bold text-center uppercase tracking-wider">
                  VÄLJ DIN ROLL
                </h2>
                <p className="text-center mt-1 text-white/90 text-sm">
                  Logga in som annonsör eller uthyrare
                </p>
              </div>
              
              {/* Options */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Advertiser Option */}
                  <Link href="/login?role=annonsor" onClick={onClose}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className="group cursor-pointer"
                    >
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-transparent hover:border-blue-500 transition-all duration-300 h-full">
                        <div className="flex flex-col items-center text-center space-y-3">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <MegaphoneIcon className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                            ANNONSÖR
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            För företag och privatpersoner som vill hyra reklamplatser
                          </p>
                          <div className="pt-2">
                            <span className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider group-hover:gap-3 transition-all">
                              LOGGA IN
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      whileHover={{ scale: 1.02, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className="group cursor-pointer"
                    >
                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-transparent hover:border-green-500 transition-all duration-300 h-full">
                        <div className="flex flex-col items-center text-center space-y-3">
                          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <HomeIcon className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                            UTHYRARE
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            För markägare som vill hyra ut sina skyltplatser
                          </p>
                          <div className="pt-2">
                            <span className="inline-flex items-center gap-2 text-green-600 font-bold text-sm uppercase tracking-wider group-hover:gap-3 transition-all">
                              LOGGA IN
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-center text-sm text-gray-600">
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