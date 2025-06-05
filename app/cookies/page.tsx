"use client";
import Image from 'next/image';

export default function Cookies() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-12 pt-20">
      <Image
        src="/bakgrund.png"
        alt="Bakgrund"
        fill
        className="object-cover -z-10"
        priority
      />
      <div className="w-full max-w-4xl mx-auto bg-white/95 rounded-3xl shadow-xl p-8 md:p-12 border border-white/20 backdrop-blur-md">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-12 text-center text-[#16475b] tracking-tight">
          COOKIEPOLICY
        </h1>
        
        <div className="space-y-10 text-gray-800">
          <section className="bg-white/50 rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-[#16475b]">Vad är cookies?</h2>
            <p className="leading-relaxed">En cookie är en liten textfil som lagras i din webbläsare för att känna igen din enhet.</p>
          </section>

          <div className="bg-white/50 rounded-2xl p-6 border border-gray-100">
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border-b p-3 text-left text-sm font-semibold text-gray-600">Typ</th>
                    <th className="border-b p-3 text-left text-sm font-semibold text-gray-600">Syfte</th>
                    <th className="border-b p-3 text-left text-sm font-semibold text-gray-600">Hur länge?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-3 text-sm">Strikt nödvändiga</td>
                    <td className="p-3 text-sm">Kom ihåg inloggning, säkerhetstoken</td>
                    <td className="p-3 text-sm">Sessionsbaserade</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-3 text-sm">Analys</td>
                    <td className="p-3 text-sm">Förstå hur tjänsten används (Matomo)</td>
                    <td className="p-3 text-sm">13 mån</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-3 text-sm">Marknadsföring</td>
                    <td className="p-3 text-sm">Mätning av kampanjer (Meta Pixel)</td>
                    <td className="p-3 text-sm">3–6 mån</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <section className="bg-white/50 rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-[#16475b]">Hantera cookies</h2>
            <p className="leading-relaxed">Du kan när som helst slå av/pausa icke-nödvändiga cookies via vår cookie-banner eller dina webbläsarinställningar.</p>
          </section>
        </div>
      </div>
    </div>
  );
} 