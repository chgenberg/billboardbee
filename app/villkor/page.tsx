"use client";
import Image from 'next/image';

export default function Terms() {
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
          ALLMÄNNA VILLKOR
        </h1>
        
        <div className="space-y-10 text-gray-800">
          <section className="bg-white/50 rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-[#16475b]">1. Tillämpning</h2>
            <p className="leading-relaxed">Dessa villkor gäller för alla som (a) annonserar ("Annonsör") eller (b) upplåter mark ("Markägare") via BillboardBee-plattformen.</p>
          </section>

          <section className="bg-white/50 rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-[#16475b]">2. Tjänstens kärna</h2>
            <p className="leading-relaxed">BillboardBee matchar Annonsörer och Markägare men är inte part i hyres- eller annonsavtalet; vi är teknisk mellanhand.</p>
          </section>

          <section className="bg-white/50 rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-[#16475b]">3. Bokning & betalning</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Bokning är bindande när Annonsör klickar Bekräfta.</li>
              <li>Annonsör förskottsbetalar hela kampanjbeloppet; Markägare får sin andel senast 15 dgr efter kampanjstart.</li>
              <li>Avbokning ≥14 dgr före start = full återbetalning; &lt;14 dgr = 50 %.</li>
            </ul>
          </section>

          <section className="bg-white/50 rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-[#16475b]">4. Ansvar & försäkring</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Markägare ansvarar för fysiskt stativ och bygglov; BillboardBee erbjuder ansökningsservice.</li>
              <li>BillboardBee har allriskförsäkring upp till 5 M SEK; indirekta skador ersätts ej.</li>
              <li>Annonsör ansvarar för innehållets laglighet (RO, alkohollag, politisk reklam m.m.).</li>
            </ul>
          </section>

          <section className="bg-white/50 rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-[#16475b]">5. Användarkonto</h2>
            <p className="leading-relaxed">Ett (1) konto per juridisk person. Otillåten delning kan stängas av omedelbart.</p>
          </section>

          <section className="bg-white/50 rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-[#16475b]">6. Force Majeure</h2>
            <p className="leading-relaxed">Krig, naturkatastrof, myndighetsbeslut eller liknande befriar part från skadestånd och andra påföljder.</p>
          </section>

          <section className="bg-white/50 rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-[#16475b]">7. Tillämplig lag & tvist</h2>
            <p className="leading-relaxed">Svensk lag. Tvist löses i första hand genom medling, i andra hand i Göteborgs tingsrätt.</p>
          </section>
        </div>
      </div>
    </div>
  );
} 