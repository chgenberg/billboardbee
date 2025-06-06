'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import LoginModal from "./LoginModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(2); // Mock cart count
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    {
      label: "Upptäck",
      children: [
        { label: "Lediga skyltar", path: "/lediga-skyltar" },
        { label: "Buzz-idégeneratorn", path: "/buzz-idegeneratorn" }
      ]
    },
    {
      label: "Om BillboardBee",
      children: [
        { label: "Om oss", path: "/om-oss" },
        { label: "FAQ", path: "/qa" }
      ]
    },
    {
      label: "Partner",
      path: "/partner",
      children: [
        { label: "Annonsör", path: "/annonsor" },
        { label: "Uthyrare", path: "/uthyrare" }
      ]
    },
    {
      label: "Kontakt",
      path: "/kontakt"
    }
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav className={`fixed top-4 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl py-2' 
          : 'bg-white/80 backdrop-blur-md py-2'
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
                  width={220}
                  height={80}
                  className="h-12 sm:h-14 w-auto object-contain"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Menu - Centered */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 absolute left-1/2 transform -translate-x-1/2">
              {menuItems.map((item, index) => (
                <div key={item.label} className="relative group">
                  {item.path ? (
                    <Link
                      href={item.path}
                      className={`relative px-2 py-2 text-xs xl:text-sm font-bold tracking-wider transition-all duration-300 group whitespace-nowrap ${
                        isActive(item.path)
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
                      {isActive(item.path) && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  ) : (
                    <div className="relative px-2 py-2 text-xs xl:text-sm font-bold tracking-wider text-gray-700 opacity-90 cursor-pointer select-none group-hover:text-orange-600">
                      {item.label}
                    </div>
                  )}
                  {/* Dropdown för children */}
                  {item.children && item.children.length > 0 && (
                    <>
                      {/* Invisible bridge to keep dropdown open */}
                      <div className="absolute left-0 top-full h-2 w-full" />
                      <div className="absolute left-0 top-full pt-2 min-w-[200px] opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
                        <div className="bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden">
                          <ul className="py-2">
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <Link
                                  href={child.path}
                                  className="block px-5 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Right side - Cart, Login Button and Mobile Menu */}
            <div className="flex items-center gap-3 lg:gap-4">
              {/* Shopping Cart */}
              <Link href="/varukorg" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* Desktop Login Button */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="hidden sm:block"
              >
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="relative inline-flex items-center px-5 lg:px-6 py-2 lg:py-2.5 overflow-hidden text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-full group"
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-orange-700 rounded-full group-hover:w-48 group-hover:h-48"></span>
                  <span className="relative font-bold tracking-wider text-xs lg:text-sm">LOGGA IN</span>
                  <motion.svg
                    className="w-3.5 lg:w-4 h-3.5 lg:h-4 ml-2"
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
                    <div key={item.label} className="relative">
                      {item.path ? (
                        <Link
                          href={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block px-4 py-3 rounded-lg transition-all duration-200 font-bold tracking-wider ${
                            isActive(item.path)
                              ? 'bg-orange-50 text-orange-600'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <div
                          className="block px-4 py-3 rounded-lg font-bold tracking-wider text-gray-700 opacity-90 cursor-pointer select-none"
                        >
                          {item.label}
                        </div>
                      )}
                      {/* Dropdown för children i mobilmeny */}
                      {item.children && item.children.length > 0 && (
                        <ul className="pl-4 pb-2">
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <Link
                                href={child.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Link
                    href="/varukorg"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-lg bg-orange-50 text-orange-600 font-bold"
                  >
                    <span>VARUKORG</span>
                    <div className="flex items-center">
                      <ShoppingCartIcon className="h-5 w-5 mr-2" />
                      {cartItemCount > 0 && (
                        <span className="bg-orange-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {cartItemCount}
                        </span>
                      )}
                    </div>
                  </Link>
                </div>

                <div className="mt-4">
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

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
} 