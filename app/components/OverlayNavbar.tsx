"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function OverlayNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  return (
    <>
      {/* Hamburgarmeny */}
      <div className="fixed top-6 left-6 z-[300]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col justify-center items-center w-9 h-9 bg-transparent border-none p-0 focus:outline-none group"
          aria-label="Meny"
        >
          <span className="block w-7 h-0.5 my-0.5 rounded bg-black transition-all duration-200 group-hover:bg-gray-700" />
          <span className="block w-7 h-0.5 my-0.5 rounded bg-black transition-all duration-200 group-hover:bg-gray-700" />
          <span className="block w-7 h-0.5 my-0.5 rounded bg-black transition-all duration-200 group-hover:bg-gray-700" />
        </button>
        {isOpen && (
          <div className="absolute left-0 top-full mt-2 w-56 bg-white text-black border border-gray-200 rounded-xl p-1">
            <div className="py-1">
              <Link 
                href="/" 
                className="block px-4 py-2 hover:bg-gray-100 transition-colors text-sm tracking-wide text-left uppercase text-black font-medium rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                HEM
              </Link>
              <Link 
                href="/om-oss" 
                className="block px-4 py-2 hover:bg-gray-100 transition-colors text-sm tracking-wide text-left uppercase text-black font-medium rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                OM OSS
              </Link>
              <Link 
                href="/buzz-idegeneratorn" 
                className="block px-4 py-2 hover:bg-gray-100 transition-colors text-sm tracking-wide text-left uppercase text-black font-medium rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                BUZZ IDÉGENERATORN
              </Link>
              <Link 
                href="/qa" 
                className="block px-4 py-2 hover:bg-gray-100 transition-colors text-sm tracking-wide text-left uppercase text-black font-medium rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                href="/kontakt" 
                className="block px-4 py-2 hover:bg-gray-100 transition-colors text-sm tracking-wide text-left uppercase text-black font-medium rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                KONTAKT
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Logotyp */}
      <div className="fixed top-6 right-6 z-50 h-14 w-44 flex items-center justify-end">
        {!logoError ? (
          <Image
            src="/LOGOwhiteyellow.png"
            alt="BillboardBee Logo"
            width={120}
            height={40}
            priority
            className="object-contain w-32 h-auto"
            onError={() => setLogoError(true)}
          />
        ) : (
          <span className="text-white text-xl font-bold">Frejfund</span>
        )}
      </div>
    </>
  );
} 