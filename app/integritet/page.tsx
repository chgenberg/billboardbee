"use client";
import Image from 'next/image';

export default function Privacy() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-12">
      <Image
        src="/bakgrund.png"
        alt="Bakgrund"
        fill
        className="object-cover -z-10"
        priority
      />
      <div className="w-full sm:max-w-4xl mx-auto bg-white/95 rounded-3xl shadow-xl p-8 md:p-12 border border-white/20 backdrop-blur-md">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-[#16475b] tracking-tight uppercase">Integritetspolicy</h1>
        <p className="text-center text-gray-500 mb-8">(Gäller BillboardBee AB, org.nr 556000-0000)<br/>Senast uppdaterad: 20 juni 2025</p>
        <div className="space-y-10 text-gray-800 text-base">
          <section>
            <h2 className="text-xl font-bold mb-2 text-[#16475b]">1. Personuppgiftsansvarig</h2>
            <p>BillboardBee AB (org.nr 556000-0000)<br/>
            Drottninggatan 1, 111 51 Stockholm<br/>
            E-post: <a href="mailto:privacy@billboardbee.com" className="text-[#16475b] underline">privacy@billboardbee.com</a> | Tel: <a href="tel:+46855555555" className="text-[#16475b] underline">+46 8 55 55 55 55</a></p>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-2 text-[#16475b]">2. Vilka uppgifter samlar vi in – och varför?</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-100 mb-4">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border-b p-3 text-left font-semibold text-gray-600">Kategori</th>
                    <th className="border-b p-3 text-left font-semibold text-gray-600">Exempel på uppgifter</th>
                    <th className="border-b p-3 text-left font-semibold text-gray-600">Ändamål</th>
                    <th className="border-b p-3 text-left font-semibold text-gray-600">Laglig grund</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-3">Kontakt­uppgifter</td>
                    <td className="p-3">Namn, e-post, telefon</td>
                    <td className="p-3">Kontoskapande, nyhetsbrev, support</td>
                    <td className="p-3">Avtal · Berättigat intresse</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-3">Kampanj­data</td>
                    <td className="p-3">Uppladdade annons­filer, bokade skyltar, tid­scheman</td>
                    <td className="p-3">Mock-ups, publicering, rapporter</td>
                    <td className="p-3">Avtal</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-3">Plats & trafik­data</td>
                    <td className="p-3">GPS-koordinater (skylt), trafikflöde</td>
                    <td className="p-3">Räckvidds­beräkning, pris­sättning</td>
                    <td className="p-3">Berättigat intresse</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-3">Teknisk data</td>
                    <td className="p-3">IP-adress, cookie-ID, loggar</td>
                    <td className="p-3">Säkerhet, statistik, fel­spårning</td>
                    <td className="p-3">Berättigat intresse</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-3">Betal­data</td>
                    <td className="p-3">Transaktions-ID från Stripe/Klarna</td>
                    <td className="p-3">Fakturering, bokföring</td>
                    <td className="p-3">Avtal · Rättslig skyldighet</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-2 text-[#16475b]">3. Lagringstider</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Kontakter & kampanj­data: raderas 24 månader efter din senaste inloggning eller tidigare på begäran.</li>
              <li>Bokförings­­uppgifter: sparas i 7 år enligt Bokförings­lagen.</li>
              <li>Cookie-data: se separat Cookiepolicy (livslängd 1 dag – 24 mån).</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-2 text-[#16475b]">4. Tredje parter & överföringar utanför EU</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-100 mb-4">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border-b p-3 text-left font-semibold text-gray-600">Tjänst</th>
                    <th className="border-b p-3 text-left font-semibold text-gray-600">Syfte</th>
                    <th className="border-b p-3 text-left font-semibold text-gray-600">Plats</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-3">Amazon Web Services (eu-west-1)</td>
                    <td className="p-3">Hosting & databas</td>
                    <td className="p-3">Irland</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-3">Stripe Payments Europe</td>
                    <td className="p-3">Betalningar</td>
                    <td className="p-3">EU</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-3">OpenAI Ireland Ltd.</td>
                    <td className="p-3">AI-bearbetning (idégenerator, mock-up)</td>
                    <td className="p-3">Datacenter inom EU</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>Överföringar utanför EU/EES sker endast om lämpliga skyddsåtgärder finns (t.ex. EU-standard­avtals­klausuler).</p>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-2 text-[#16475b]">5. Dina rättigheter</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Tillgång & utdrag av de personuppgifter vi lagrar</li>
              <li>Rättelse av felaktiga uppgifter</li>
              <li>Radering (“rätten att bli bortglömd”)</li>
              <li>Begränsning av behandling</li>
              <li>Dataportabilitet</li>
              <li>Invändning mot behandling som sker med berättigat intresse</li>
            </ul>
            <p className="mt-2">Begäran skickas till <a href="mailto:privacy@billboardbee.com" className="text-[#16475b] underline">privacy@billboardbee.com</a>. Om du är missnöjd kan du klaga hos Integritetsskyddsmyndigheten (IMY).</p>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-2 text-[#16475b]">6. Cookies</h2>
            <p>Vi använder nödvändiga, analytiska och marknads­förings­cookies. Fullständig lista finns i vår <a href="/cookies" className="text-[#16475b] underline">Cookiepolicy</a>.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-2 text-[#16475b]">7. Kontakt</h2>
            <p>E-post: <a href="mailto:privacy@billboardbee.com" className="text-[#16475b] underline">privacy@billboardbee.com</a><br/>
            Telefon: <a href="tel:+46855555555" className="text-[#16475b] underline">+46 8 55 55 55 55</a><br/>
            Postadress: BillboardBee AB, Drottninggatan 1, 111 51 Stockholm</p>
          </section>
        </div>
      </div>
    </div>
  );
} 