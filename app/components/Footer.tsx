"use client";
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full py-8 mt-auto bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Separator line */}
        <div className="h-px bg-gray-200 mb-8" />
        
        {/* Footer links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <Link 
            href="/integritet" 
            className="text-[#222] hover:text-[#ff6b00] transition-colors uppercase text-sm font-semibold tracking-wide"
          >
            INTEGRITET
          </Link>
          <Link 
            href="/cookies" 
            className="text-[#222] hover:text-[#ff6b00] transition-colors uppercase text-sm font-semibold tracking-wide"
          >
            COOKIES
          </Link>
          <Link 
            href="/villkor" 
            className="text-[#222] hover:text-[#ff6b00] transition-colors uppercase text-sm font-semibold tracking-wide"
          >
            VILLKOR
          </Link>
          <Link 
            href="/dpa" 
            className="text-[#222] hover:text-[#ff6b00] transition-colors uppercase text-sm font-semibold tracking-wide"
          >
            DPA
          </Link>
        </div>
        
        {/* Logo and Copyright */}
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/LOGOblackorange.png"
            alt="BillboardBee Logo"
            width={120}
            height={38}
            className="object-contain h-9 w-auto"
          />
          <div className="text-center text-gray-600 text-sm">
            © 2025 BillboardBee AB – en del av Founder Bee
          </div>
        </div>
      </div>
    </footer>
  );
} 