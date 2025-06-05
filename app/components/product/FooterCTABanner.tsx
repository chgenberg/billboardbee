"use client";
export default function FooterCTABanner({ cta }: { cta: string }) {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-[#fffbe6] border-t border-[#bf7100]/20 py-3 px-4 flex items-center justify-between shadow">
      <div className="font-semibold text-[#222] text-base">{cta}</div>
      <button className="px-5 py-2 rounded-full bg-[#bf7100] text-white font-bold text-base border border-[#bf7100] tracking-wide font-avenir hover:bg-white hover:text-[#bf7100] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#bf7100]/40">Boka nu</button>
    </div>
  );
} 