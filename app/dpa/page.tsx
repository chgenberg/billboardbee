"use client";
import Image from 'next/image';

export default function DPA() {
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
          DPA – PERSONUPPGIFTSBITRÄDESAVTAL
        </h1>
        
        <div className="space-y-10 text-gray-800">
          <p className="text-sm italic text-gray-600 bg-white/50 rounded-2xl p-6 border border-gray-100">
            Detta biträdesavtal ("Avtalet") är bilaga till Huvudavtalet mellan BillboardBee AB ("Biträdet") och Kunden ("Personuppgiftsansvarig").
          </p>

          <section className="bg-white/50 rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-[#16475b]">Syfte</h2>
            <p className="leading-relaxed">Biträdet behandlar personuppgifter endast för att tillhandahålla plattformen, support och betalningstjänster.</p>
          </section>

          <section className="bg-white/50 rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-[#16475b]">Instruktioner</h2>
            <p className="leading-relaxed">Biträdet får endast behandla personuppgifter enligt skriftliga instruktioner från Ansvarige.</p>
          </section>

          <section className="bg-white/50 rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-[#16475b]">Säkerhet</h2>
            <p className="leading-relaxed">Biträdet ska vidta minst de tekniska och organisatoriska säkerhetsåtgärder som anges i bilaga A (kryptering i vila & transit, 2FA, kontinuerlig penetrationstest).</p>
          </section>

          <section className="bg-white/50 rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-[#16475b]">Underbiträden</h2>
            <p className="leading-relaxed">Lista över underbiträden (AWS Europe, Stripe Payments Europe, Mapbox) finns i bilaga B. Biträdet informerar före byte och ger Ansvarige rätt att invända.</p>
          </section>

          <section className="bg-white/50 rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-[#16475b]">Överföringar utanför EU/EES</h2>
            <p className="leading-relaxed">Tillåts endast med giltig överföringsmekanism enligt kap. V GDPR, exempelvis SCC 2021.</p>
          </section>

          <section className="bg-white/50 rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-[#16475b]">Rättigheter & Dataportabilitet</h2>
            <p className="leading-relaxed">Biträdet assisterar Ansvarige vid förfrågningar enligt art. 12–23 GDPR.</p>
          </section>

          <section className="bg-white/50 rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-[#16475b]">Incidentrapportering</h2>
            <p className="leading-relaxed">Personuppgiftsincident rapporteras utan onödigt dröjsmål, dock senast 36 h efter upptäckt.</p>
          </section>

          <section className="bg-white/50 rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-[#16475b]">Revision</h2>
            <p className="leading-relaxed">Ansvarige har rätt till årlig revision (på egen bekostnad) efter 30 dagars föravisering.</p>
          </section>

          <section className="bg-white/50 rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-[#16475b]">Avtalstid & radering</h2>
            <p className="leading-relaxed">Gäller så länge Huvudavtalet löper. Vid upphörande raderas eller återlämnas alla personuppgifter inom 60 dagar.</p>
          </section>

          <section className="bg-white/50 rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-[#16475b]">Ansvar</h2>
            <p className="leading-relaxed">Biträdets ansvar är begränsat till direkt skada och högst summan som Ansvarige betalat de senaste 12 månaderna.</p>
          </section>
        </div>
      </div>
    </div>
  );
} 