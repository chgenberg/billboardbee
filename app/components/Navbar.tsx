'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
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
                  className="h-12 w-auto object-contain"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Menu */}
            <div className="flex items-center gap-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`relative px-2 py-2 text-sm font-bold tracking-wider transition-all duration-300 group ${
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

            {/* Login Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/login"
                className="relative inline-flex items-center px-8 py-3 overflow-hidden text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-full group"
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-orange-700 rounded-full group-hover:w-56 group-hover:h-56"></span>
                <span className="relative font-bold tracking-wider">LOGGA IN</span>
                <motion.svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className={`transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`} />
    </>
  );
} 