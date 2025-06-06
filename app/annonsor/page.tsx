import { CheckCircleIcon } from '@heroicons/react/24/solid';

const steps = [
  {
    title: 'Inspiration & behovsanalys',
    desc: 'Kort behovs­intervju eller online-quiz identifierar målgrupp, kampanjmål, tidsperiod och ungefärlig budget. AI-baserad Buzz-idégenerator skapar första rubrik/färgsättning anpassad till DOOH-format.'
  },
  {
    title: 'Hitta rätt location',
    desc: 'Interaktiv karta filtrerar på räckvidd, demografi, trafikflöde, budgetspann och dataintervall. Heat-overlay visar "hot spots" för vald målgrupp; realtidsdata hämtas från mobil-GPS och trafik­kameror.'
  },
  {
    title: 'Live-mockup på 10 sekunder',
    desc: 'Klicka valfri skylt → ladda upp JPG/MP4/HTML-5-banner → se motivet automatiskt mappat på skylten (dag- och kvällsläge). Delningslänk skapas automatiskt (Open-Graph-bild) för intern godkännande-rundor.'
  },
  {
    title: 'Kampanj­paketering & budget',
    desc: 'Dra "slider" för kampanj­längd; systemet räknar CPM, reach och antal in-screen-sekunder. Rekommenderad media­plan (sekund-split / kreativa variationer) genereras automatiskt.'
  },
  {
    title: 'Kreativ produktion (tillval)',
    desc: 'In-house designstudio gör anpassning, motion-grafik eller 3D-mockups enligt IAB DOOH-specar. Filvalidering (fil­storlek, luminans, färgrymd) sker automatiskt innan uppladdning.'
  },
  {
    title: 'Bokning & betalning',
    desc: 'Självbetjänad kassa med Stripe / faktura / pay-later. Dynamisk prissättning (yield) kan ge "early-bird"-rabatt om det finns luckor.'
  },
  {
    title: 'Publicering & Go-Live',
    desc: 'Kampanjen schemaläggs på valda skyltar; systemet skickar automatiska QC-foton när första spoten rullat. Trigger-styrning möjlig (väder, tid på dygnet, målgrupp-densitet).'
  },
  {
    title: 'Live-dashboard & optimering',
    desc: 'Realtid: impressions, väder, QR-scans, foot-fall. A/B-split-rapport visar bäst presterande kreativer; reklamköparen kan pausa, byta motiv eller förlänga i ett klick.'
  },
  {
    title: 'Slutrapport & ROI-bevis',
    desc: 'PDF med samtliga metrics, heatmap över visnings­fönster och demografiska reach-grafer. Integration till GA4 eller Adobe Analytics för helhets­syn med on-line-konverteringar.'
  },
  {
    title: 'Uppföljning & återköp',
    desc: 'AI-förslag på nästa kampanj­period baserat på säsong, målgrupp, attrition-rate. Lojalitets­poäng som kan bytas mot produktions­stöd eller extra spot-dagar.'
  }
];

export default function AnnonsorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10 text-center uppercase tracking-wide">Så funkar det för annonsörer</h1>
      <div className="max-w-3xl w-full">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-6 mb-10 relative">
            <div className="flex flex-col items-center">
              <div className="bg-orange-500 text-white rounded-full p-3 shadow-lg mb-2">
                <CheckCircleIcon className="w-7 h-7" />
              </div>
              {i < steps.length - 1 && (
                <div className="w-1 h-16 bg-gradient-to-b from-orange-400 to-orange-200 mx-auto" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h2>
              <p className="text-gray-700 text-base leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 