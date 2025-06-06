'use client';
import React, { useRef } from "react";

export default function PromoBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  // Pausa animation vid hover
  const handleMouseEnter = () => {
    if (bannerRef.current) bannerRef.current.style.animationPlayState = "paused";
  };
  const handleMouseLeave = () => {
    if (bannerRef.current) bannerRef.current.style.animationPlayState = "running";
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ background: "linear-gradient(90deg, #fdf6e3 0%, #fbeee6 100%)" }}>
      <div
        ref={bannerRef}
        className="flex items-center gap-8 py-2 px-4 animate-banner-move"
        style={{
          animation: "banner-move 15s linear infinite",
          cursor: "pointer",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Billboard-silhuett */}
        <div className="h-8 w-24 bg-white/30 rounded-lg border border-white/60 shadow-inner mr-4" style={{ minWidth: 96, minHeight: 32 }} />
        <span className="text-gray-900 font-semibold text-lg mr-4">Vi vill demokratisera annonsering.</span>
        <a
          href="https://billboard-m3ac.onrender.com/buzz-idegeneratorn"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-full shadow transition"
          tabIndex={0}
        >
          Testa din kampanj &rsaquo;
        </a>
      </div>
      <style jsx>{`
        @keyframes banner-move {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
} 