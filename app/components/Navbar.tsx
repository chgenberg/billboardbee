'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import LoginModal from "./LoginModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { href: "/lediga-skyltar", label: "LEDIGA SKYLTAR" },
    { href: "/buzz-idegeneratorn", label: "BUZZ IDÉGENERATORN" },
    { href: "/om-oss", label: "OM OSS" },
    { href: "/qa", label: "FAQ" },
    { href: "/kontakt", label: "KONTAKT" }
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl py-2' 
          : 'bg-white/80 backdrop-blur-md py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Image
                  src="/LOGOblackorange.png"
                  alt="BillboardBee"
                  width={180}
                  height={60}
                  className="h-10 sm:h-12 w-auto object-contain"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Menu - Centered */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 absolute left-1/2 transform -translate-x-1/2">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`relative px-2 py-2 text-xs xl:text-sm font-bold tracking-wider transition-all duration-300 group whitespace-nowrap ${
                      isActive(item.href)
                        ? 'text-orange-600'
                        : 'text-gray-700 hover:text-orange-600'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    
                    {/* Hover effect background */}
                    <motion.div
                      className="absolute inset-0 bg-orange-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                    />
                    
                    {/* Active indicator */}
                    {isActive(item.href) && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right side - Login Button and Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Desktop Login Button */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="hidden sm:block"
              >
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="relative inline-flex items-center px-6 lg:px-8 py-2.5 lg:py-3 overflow-hidden text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-full group"
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-orange-700 rounded-full group-hover:w-56 group-hover:h-56"></span>
                  <span className="relative font-bold tracking-wider text-sm lg:text-base">LOGGA IN</span>
                  <motion.svg
                    className="w-4 lg:w-5 h-4 lg:h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </button>
              </motion.div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6 text-gray-600" />
                ) : (
                  <Bars3Icon className="h-6 w-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <span className="text-xl font-bold uppercase tracking-wider">MENY</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              <div className="p-6">
                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg transition-all duration-200 font-bold tracking-wider ${
                        isActive(item.href)
                          ? 'bg-orange-50 text-orange-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setShowLoginModal(true);
                    }}
                    className="block w-full text-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all duration-200 uppercase tracking-wider"
                  >
                    LOGGA IN
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className={`transition-all duration-500 ${scrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20'}`} />

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
} 