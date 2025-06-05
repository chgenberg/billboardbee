'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt, FaBuilding, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Här kan du lägga till logik för att hantera formuläret
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-white pt-20">
      {/* Hero Section */}
      <div className="w-full min-h-[35vh] flex flex-col items-center justify-center relative pb-10">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/kontakt.png"
            alt="Kontakt bakgrund"
            fill
            className="object-contain object-right opacity-60 scale-125 [mask-image:radial-gradient(ellipse_80%_60%_at_60%_50%,white_80%,transparent_100%)]"
            priority
          />
          <div className="absolute inset-0 bg-white/60" />
        </div>
        <div className="relative z-10 text-center pt-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#ff6b00] tracking-widest mb-4 drop-shadow-sm">Kontakta oss</h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto font-light">
            Vi hjälper dig gärna! Hör av dig via formuläret eller kontakta oss direkt – vi återkommer snabbt.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Vänster kolumn - Företagsinformation */}
        <div className="bg-white/90 rounded-3xl shadow-xl p-8 flex flex-col gap-8 border border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-[#ff6b00] flex items-center gap-2 mb-4">
              <FaBuilding className="inline text-[#ff6b00]" /> Vårt kontor
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-lg text-gray-700">
                <FaMapMarkerAlt className="text-[#ff6b00] text-xl" />
                <span>Drottninggatan 12, Stockholm</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#ff6b00] mb-2">Kontaktinformation</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-lg text-gray-700">
                <FaEnvelope className="text-[#ff6b00] text-xl" />
                <span>info@billboardbee.se</span>
              </div>
              <div className="flex items-center gap-3 text-lg text-gray-700">
                <FaPhone className="text-[#ff6b00] text-xl" />
                <span>08-123 45 67</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#ff6b00] mb-2">Följ oss</h3>
            <div className="flex gap-4">
              {/* Sociala ikoner */}
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#ff6b00]/10 text-[#ff6b00] hover:bg-[#ff6b00] hover:text-white transition-colors shadow" aria-label="Twitter">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.7-.02-1.36-.21-1.94-.53v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.65 0-1.29-.04-1.92-.11A12.13 12.13 0 0 0 7.29 21.5c8.07 0 12.5-6.68 12.5-12.48 0-.19 0-.37-.01-.56A8.8 8.8 0 0 0 24 4.59a8.5 8.5 0 0 1-2.54.7z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#ff6b00]/10 text-[#ff6b00] hover:bg-[#ff6b00] hover:text-white transition-colors shadow" aria-label="LinkedIn">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#ff6b00]/10 text-[#ff6b00] hover:bg-[#ff6b00] hover:text-white transition-colors shadow" aria-label="Instagram">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41.59.22 1.01.48 1.45.92.44.44.7.86.92 1.45.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43-.22.59-.48 1.01-.92 1.45-.44.44-.86.7-1.45.92-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41-.59-.22-1.01-.48-1.45-.92-.44-.44-.7-.86-.92-1.45-.17-.46-.354-1.26-.41-2.43C2.212 15.634 2.2 15.25 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43.22-.59.48-1.01.92-1.45.44-.44.86-.7 1.45-.92.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.012 7.052.07 5.77.128 4.87.312 4.13.54c-.82.25-1.5.58-2.18 1.26-.68.68-1.01 1.36-1.26 2.18-.228.74-.412 1.64-.47 2.92C.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.058 1.28.242 2.18.47 2.92.25.82.58 1.5 1.26 2.18.68.68 1.36 1.01 2.18 1.26.74.228 1.64.412 2.92.47C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.28-.058 2.18-.242 2.92-.47.82-.25 1.5-.58 2.18-1.26.68-.68 1.01-1.36 1.26-2.18.228-.74.412-1.64.47-2.92.058-1.28.07-1.684.07-4.948s-.012-3.668-.07-4.948c-.058-1.28-.242-2.18-.47-2.92-.25-.82-.58-1.5-1.26-2.18-.68-.68-1.36-1.01-2.18-1.26-.74-.228-1.64-.412-2.92-.47C15.668.012 15.264 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.844-10.406a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#ff6b00]/10 text-[#ff6b00] hover:bg-[#ff6b00] hover:text-white transition-colors shadow" aria-label="Facebook">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Höger kolumn - Kontaktformulär */}
        <form onSubmit={handleSubmit} className="bg-white/90 rounded-3xl shadow-xl p-8 flex flex-col gap-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-[#ff6b00] mb-4">Skicka ett meddelande</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Ditt namn"
              value={formData.name}
              onChange={handleChange}
              className="px-5 py-3 rounded-xl border border-gray-200 focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/20 transition-all duration-200 bg-white/60 placeholder-gray-400 text-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Din e-postadress"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-5 py-3 rounded-xl border border-gray-200 focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/20 transition-all duration-200 bg-white/60 placeholder-gray-400 text-lg"
            />
            <textarea
              name="message"
              placeholder="Ditt meddelande..."
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="px-5 py-3 rounded-xl border border-gray-200 focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/20 transition-all duration-200 bg-white/60 placeholder-gray-400 text-lg resize-none"
            />
          </div>
          <button
            type="submit"
            className="mt-2 px-8 py-3 rounded-full bg-[#ff6b00] text-white font-bold text-lg shadow-md border-2 border-[#ff6b00] tracking-wide hover:bg-white hover:text-[#ff6b00] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40"
          >
            Skicka meddelande
          </button>
        </form>
      </div>
      {/* Map Section */}
      <div className="col-span-1 md:col-span-2 flex flex-col items-center mt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#ff6b00] mb-2 text-center">Hitta till oss</h2>
        <p className="text-gray-600 mb-6 text-center max-w-xl">Vårt kontor ligger centralt på Drottninggatan 12 i Stockholm. Välkommen förbi på en kaffe eller boka ett möte!</p>
        <div className="relative w-full max-w-4xl h-[400px] md:h-[480px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-200 bg-white/70 backdrop-blur-xl flex items-center justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2035.1234567890123!2d18.0686!3d59.3346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d5f5c0c7c1f%3A0x1234567890abcdef!2sDrottninggatan%2012%2C%20Stockholm!5e0!3m2!1ssv!2sse!4v1234567890!5m2!1ssv!2sse"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full rounded-[2.5rem]"
            title="Karta till kontoret"
          ></iframe>
          {/* Removed blurred overlay for sharp map */}
        </div>
      </div>
    </div>
  );
} 