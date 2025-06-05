'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Register state
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [acceptPolicy, setAcceptPolicy] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-[#181c23] p-8 rounded-2xl shadow-2xl w-full max-w-md relative border border-[#23272f]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-orange-400 text-2xl"
        >
          ✕
        </button>
        <h2 className="text-2xl font-extrabold text-white mb-8 text-center tracking-wide">Logga in / Skapa konto</h2>
        {/* Tabs */}
        <div className="flex mb-8 gap-2">
          <button
            className={`flex-1 py-2 rounded-full font-bold text-sm tracking-widest transition-colors ${tab === 'login' ? 'bg-[#ff6b00] text-white shadow' : 'bg-transparent text-white/60 hover:bg-[#23272f]'}`}
            onClick={() => setTab('login')}
          >
            LOGGA IN
          </button>
          <button
            className={`flex-1 py-2 rounded-full font-bold text-sm tracking-widest transition-colors ${tab === 'register' ? 'bg-[#ff6b00] text-white shadow' : 'bg-transparent text-white/60 hover:bg-[#23272f]'}`}
            onClick={() => setTab('register')}
          >
            SKAPA KONTO
          </button>
        </div>
        {/* Content */}
        {tab === 'login' ? (
          <>
            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-gray-700 bg-white hover:bg-gray-100 shadow-sm text-[#222] font-semibold text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-700"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Fortsätt med Google
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-gray-700 bg-white hover:bg-gray-100 shadow-sm text-[#222] font-semibold text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-700"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
                </svg>
                Fortsätt med Facebook
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-[#183E4F] bg-white hover:bg-[#f7f7f7] shadow-sm text-[#183E4F] font-semibold text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#183E4F]/30"
                style={{ boxShadow: '0 2px 8px 0 rgba(24,62,79,0.08)' }}
                title="Logga in med BankID (snart tillgängligt)"
                disabled
              >
                <Image
                  src="/bankid.png"
                  alt="BankID"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                Logga in med BankID
              </button>
            </div>
            <div className="relative flex items-center justify-center my-6">
              <div className="border-t border-gray-700 w-full"></div>
              <span className="bg-[#181c23] px-4 text-sm text-gray-400">eller</span>
              <div className="border-t border-gray-700 w-full"></div>
            </div>
            <form className="space-y-5" onSubmit={e => { e.preventDefault(); /* TODO: login-funktion */ }}>
              <div>
                <label htmlFor="email" className="block text-white mb-2">E-post</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-white text-[#222] border border-[#ff6b00] focus:outline-none focus:border-[#ff6b00] placeholder:text-gray-400"
                  placeholder="din@email.se"
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-white mb-2">Lösenord</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-white text-[#222] border border-[#ff6b00] focus:outline-none focus:border-[#ff6b00] placeholder:text-gray-400"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#ff6b00] text-white font-bold py-2 px-4 rounded-full hover:bg-white hover:text-[#ff6b00] transition-colors text-base tracking-widest shadow"
              >
                Logga in
              </button>
            </form>
          </>
        ) : (
          <form className="space-y-5" onSubmit={e => { e.preventDefault(); /* TODO: register-funktion */ }}>
            <div>
              <label htmlFor="regName" className="block text-white mb-2">Namn (valfritt)</label>
              <input
                type="text"
                id="regName"
                value={regName}
                onChange={e => setRegName(e.target.value)}
                className="w-full px-4 py-2 rounded bg-white text-[#222] border border-[#ff6b00] focus:outline-none focus:border-[#ff6b00] placeholder:text-gray-400"
                placeholder="Ditt namn"
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="regEmail" className="block text-white mb-2">E-post</label>
              <input
                type="email"
                id="regEmail"
                value={regEmail}
                onChange={e => setRegEmail(e.target.value)}
                className="w-full px-4 py-2 rounded bg-white text-[#222] border border-[#ff6b00] focus:outline-none focus:border-[#ff6b00] placeholder:text-gray-400"
                placeholder="din@email.se"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="regPassword" className="block text-white mb-2">Lösenord</label>
              <input
                type="password"
                id="regPassword"
                value={regPassword}
                onChange={e => setRegPassword(e.target.value)}
                className="w-full px-4 py-2 rounded bg-white text-[#222] border border-[#ff6b00] focus:outline-none focus:border-[#ff6b00] placeholder:text-gray-400"
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="acceptPolicy"
                checked={acceptPolicy}
                onChange={e => setAcceptPolicy(e.target.checked)}
                className="accent-[#ff6b00] w-4 h-4 rounded focus:ring-2 focus:ring-[#ff6b00]"
                required
              />
              <label htmlFor="acceptPolicy" className="text-xs text-white select-none">
                Jag godkänner{' '}
                <Link href="/integritet" target="_blank" className="underline text-[#ff6b00] hover:text-white transition-colors">integritetspolicyn</Link>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-[#ff6b00] text-white font-bold py-2 px-4 rounded-full hover:bg-white hover:text-[#ff6b00] transition-colors text-base tracking-widest shadow disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!acceptPolicy}
            >
              Skapa konto
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 