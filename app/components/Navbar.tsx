'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaUserCircle,
  FaBullhorn,
  FaUserPlus,
  FaSignInAlt,
  FaTimes,
  FaSign,
} from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

function AuthModal({
  open,
  onClose,
  mode: initialMode,
  role,
}: {
  open: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  role: 'ANNONSOR' | 'UTHYRARE' | null;
}) {
  const [tab, setTab] = useState<'login' | 'register'>(initialMode);
  useEffect(() => { setTab(initialMode); }, [initialMode, open]);
  if (!open || !role) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-md rounded-2xl bg-white/90 px-8 py-10 shadow-xl ring-1 ring-black/10 backdrop-blur-lg"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Stäng"
              className="absolute right-4 top-4 text-xl text-neutral-400 transition-colors hover:text-[#ff6b00]"
            >
              <FaTimes />
            </button>
            {/* Flikar */}
            <div className="flex mb-8 gap-2">
              <button
                className={`flex-1 py-2 rounded-full font-bold text-sm tracking-widest transition-colors ${tab === 'login' ? 'bg-[#ff6b00] text-white shadow' : 'bg-transparent text-[#ff6b00] hover:bg-[#fff5ed]'}`}
                onClick={() => setTab('login')}
              >
                LOGGA IN
              </button>
              <button
                className={`flex-1 py-2 rounded-full font-bold text-sm tracking-widest transition-colors ${tab === 'register' ? 'bg-[#ff6b00] text-white shadow' : 'bg-transparent text-[#ff6b00] hover:bg-[#fff5ed]'}`}
                onClick={() => setTab('register')}
              >
                SKAPA KONTO
              </button>
            </div>
            {/* Rubrik */}
            <h2 className="mb-4 text-center text-2xl font-semibold text-neutral-800">
              {tab === 'login' ? 'Logga in' : 'Skapa konto'} som {role === 'ANNONSOR' ? 'annonsör' : 'uthyrare'}
            </h2>
            {/* Formulär (placeholder) */}
            {tab === 'login' ? (
              <form className="flex flex-col gap-4">
                <input type="email" placeholder="E-post" className="rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40" />
                <input type="password" placeholder="Lösenord" className="rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40" />
                <button type="submit" className="w-full py-2 rounded-full bg-[#ff6b00] text-white font-bold shadow hover:bg-[#ff8c42] transition-colors mt-2">Logga in</button>
              </form>
            ) : (
              <form className="flex flex-col gap-4">
                <input type="text" placeholder="Namn" className="rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40" />
                <input type="email" placeholder="E-post" className="rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40" />
                <input type="password" placeholder="Lösenord" className="rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40" />
                <button type="submit" className="w-full py-2 rounded-full bg-[#ff6b00] text-white font-bold shadow hover:bg-[#ff8c42] transition-colors mt-2">Skapa konto</button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [authMenuOpen, setAuthMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authRole, setAuthRole] = useState<'ANNONSOR' | 'UTHYRARE' | null>(null);
  const authMenuRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (authMenuRef.current && !authMenuRef.current.contains(e.target as Node)) {
        setAuthMenuOpen(false);
      }
    }
    if (authMenuOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [authMenuOpen]);

  useEffect(() => {
    if (authModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [authModalOpen]);

  function handleAuthMenuClick(mode: 'login' | 'register', role: 'ANNONSOR' | 'UTHYRARE') {
    setAuthMenuOpen(false);
    setAuthMode(mode);
    setAuthRole(role);
    setAuthModalOpen(true);
  }

  return (
    <nav className={`w-full z-50 fixed top-0 left-0 shadow-sm flex items-center justify-between h-20 px-6 transition-colors duration-200 ${authModalOpen ? 'bg-transparent' : 'bg-white/80 backdrop-blur-md'}`}>
      {/* Logotyp centrerad */}
      <div className="flex-1 flex items-center justify-center h-16 gap-6">
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/LOGOblackorange.png"
            alt="BillboardBee Logo"
            width={180}
            height={54}
            priority
            className="object-contain h-14 w-auto drop-shadow"
          />
        </Link>
        {user && (
          <Link
            href={user.role === 'ANNONSOR' ? '/dashboard-annonsor' : '/dashboard'}
            className="px-4 py-2 rounded-full bg-[#16475b] text-white font-bold shadow hover:bg-[#133a4a] transition-colors text-sm"
          >
            Dashboard
          </Link>
        )}
      </div>
      {/* Logga in knapp och meny */}
      <div className="flex items-center gap-2 relative" ref={authMenuRef}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setAuthMenuOpen(v => !v)}
          className="relative flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 text-sm overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <FaUserCircle className="text-lg relative z-10" />
          <span className="relative z-10 uppercase tracking-wide">Logga in</span>
        </motion.button>
        <AnimatePresence>
          {authMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="absolute right-0 top-full w-64 max-h-[320px] bg-white rounded-2xl shadow-xl border border-[#ececec] py-5 px-4 z-50 animate-fade-in overflow-auto"
              style={{ background: 'rgba(255,255,255,0.98)' }}
            >
              {/* Annonsör */}
              <div className="mb-3">
                <div className="flex items-center gap-2 font-semibold text-base text-[#16475b] mb-1 tracking-wide uppercase">
                  <FaBullhorn className="text-[#16475b] text-lg" /> Annonsör
                </div>
                <div className="flex flex-col gap-1 pl-7">
                  <button onClick={() => handleAuthMenuClick('login', 'ANNONSOR')} className="flex items-center gap-2 text-sm text-[#16475b] hover:bg-[#f3f7fa] hover:font-bold py-2 px-2 rounded transition-colors">
                    <FaSignInAlt className="text-[#16475b]" /> Logga in
                  </button>
                  <button onClick={() => handleAuthMenuClick('register', 'ANNONSOR')} className="flex items-center gap-2 text-sm text-[#16475b] hover:bg-[#f3f7fa] hover:font-bold py-2 px-2 rounded transition-colors">
                    <FaUserPlus className="text-[#16475b]" /> Skapa konto
                  </button>
                </div>
              </div>
              <div className="border-t border-[#ececec] my-2" />
              {/* Uthyrare */}
              <div>
                <div className="flex items-center gap-2 font-semibold text-base text-[#ff6b00] mb-1 tracking-wide uppercase">
                  <FaSign className="text-[#ff6b00] text-lg" /> Uthyrare
                </div>
                <div className="flex flex-col gap-1 pl-7">
                  <button onClick={() => handleAuthMenuClick('login', 'UTHYRARE')} className="flex items-center gap-2 text-sm text-[#ff6b00] hover:bg-[#fff5ed] hover:font-bold py-2 px-2 rounded transition-colors">
                    <FaSignInAlt className="text-[#ff6b00]" /> Logga in
                  </button>
                  <button onClick={() => handleAuthMenuClick('register', 'UTHYRARE')} className="flex items-center gap-2 text-sm text-[#ff6b00] hover:bg-[#fff5ed] hover:font-bold py-2 px-2 rounded transition-colors">
                    <FaUserPlus className="text-[#ff6b00]" /> Skapa konto
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Auth Modal */}
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} mode={authMode} role={authRole} />
    </nav>
  );
}

// Extra: Fade-in animation för dropdown
// Lägg till i app/globals.css:
// @keyframes fade-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: none; } }
// .animate-fade-in { animation: fade-in 0.2s ease; } 