import React from "react";

export default function PrisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-20">
      <section className="pt-32 pb-16 bg-gradient-to-br from-orange-100 via-white to-pink-50 relative">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Vi vill demokratisera annonsering.
          </h1>
          <p className="text-xl text-gray-600 mb-8 font-light">
            Inga konstgjorda reapriser. Bara ärliga, datadrivna priser som alla har råd att lita på.
          </p>
          <div className="bg-white/80 rounded-2xl shadow p-6 md:p-8 mb-8 text-left max-w-2xl mx-auto">
            <h2 className="text-lg font-bold text-orange-600 mb-2">Trött på "80 % RABATT – bara i dag!"?</h2>
            <p className="mb-4">Det är vi också. Reklamvärlden har länge levt på glittriga buzz-ord, tidsbegränsade superdeals och obegripliga pristabeller. Resultatet?</p>
            <ul className="list-disc pl-6 space-y-1 mb-4 text-gray-700">
              <li>Företagare som vågar mindre än de vill.</li>
              <li>Markägare som inte riktigt vet vad skylten egentligen är värd.</li>
              <li>Ett ständigt surr av osäkerhet, istället för det brummande ljudet av genuin affärsnytta.</li>
            </ul>
            <p>Hos BillboardBee skalar vi bort bruset och låter de viktigaste känslorna få styra: <span className="font-semibold text-orange-600">trygghet, kontroll och stolthet</span>.</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-10">Hur vi sätter pris – på riktigt</h2>
          <div className="grid gap-6 md:grid-cols-2 text-left mb-8">
            <div className="bg-white/80 rounded-2xl shadow p-6 text-gray-900">
              <h3 className="font-semibold text-orange-600 mb-2">Räckvidd du kan känna i magen</h3>
              <p className="mb-2">Likes i sociala medier är trevliga, men inget slår känslan av att se flödet av människor eller billyktor som passerar din kampanj. Vi mäter varje skylt med live-trafik och mobil­data – och visar siffrorna på skärmen innan du klickar "Boka".</p>
            </div>
            <div className="bg-white/80 rounded-2xl shadow p-6 text-gray-900">
              <h3 className="font-semibold text-orange-600 mb-2">Tid & plats – din scen, ditt ögonblick</h3>
              <p className="mb-2">Sol­uppgång över ett vetefält, rusningstid i Göteborgs innerstad eller stilla pendlar­flöde i tunnelbanan: varje plats har ett unikt puls­slag. När du väljer tidsfönster ser du priset forma sig i realtid – som att se pulsen på en hjärt­monitor.</p>
            </div>
            <div className="bg-white/80 rounded-2xl shadow p-6 text-gray-900">
              <h3 className="font-semibold text-orange-600 mb-2">Inga dolda avgifter – ingen hicka</h3>
              <p className="mb-2">Priset du ser i kassan är det som dras, punkt. Vi tar ingen påslag för "hanterings­­avgifter" eller "extra digital premium". Vår intäkt är en transparent förmedlingsprovision som redan är inräknad.</p>
            </div>
            <div className="bg-white/80 rounded-2xl shadow p-6 text-gray-900">
              <h3 className="font-semibold text-orange-600 mb-2">Belöning för framförhållning – inte för bluff</h3>
              <p>Bokar du tidigt? Klart du ska få en lägre kostnad, för då slipper skylten stå tom. Men "90 % off" hittar du inte här. Rabatt­erna ligger på 10–20 % och är helt baserade på faktisk efterfrågan, inte på marknads­trick.</p>
            </div>
          </div>

          <div className="bg-orange-50 rounded-2xl shadow p-6 md:p-8 mt-8 text-center">
            <h2 className="text-2xl font-bold text-orange-600 mb-2">Är du redo att ta plats – utan konstgjort glitter?</h2>
            <p className="mb-2">Testa din kreativa idé, se priset forma sig i realtid och känn hur mag­känslan går från \"hoppas\" till \"nu kör vi!\".</p>
            <p className="font-extrabold text-orange-700 mt-4">BillboardBee – ärliga priser, äkta räckvidd.</p>
          </div>
        </div>
      </section>
    </div>
  );
} 