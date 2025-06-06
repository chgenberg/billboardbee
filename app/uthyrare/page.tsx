import { CheckCircleIcon } from '@heroicons/react/24/solid';

const steps = [
  {
    title: 'Intresseanmälan & plats­screening',
    desc: 'Fyll i adress, ladda upp 2–3 foton av tänkt placering. GIS-modul beräknar trafik­data, sikt­vinkel, skugga och konkurrerande skyltar i området.'
  },
  {
    title: 'Intäkts­prognos & affärs­modell',
    desc: 'Plattformen genererar automatisk forecast: årlig bruttointäkt, occupancy-rate och underhålls­kostnad. Alternativ: fast hyra, revenue-share eller hybrid­modell.'
  },
  {
    title: 'Bygglov & regelverk',
    desc: 'Jurist-team tar fram nödvändiga ritningar, ljus-beräkningar och miljö­konsekvens­bedömning. Ansökan lämnas in digitalt till kommun/Länsstyrelse; status kan följas i dashboard.'
  },
  {
    title: 'Avtal & installation',
    desc: 'Digital signering av hyres-/samarbetsavtal + ansvarsförsäkring. Montage­plan tas fram (fundament, el, fiber, 4G/5G-router). Installations­team bokas; du får push-notis med datum och tidsfönster.'
  },
  {
    title: 'Skylt går live',
    desc: 'Slutbesiktning & fotodokumentation laddas upp i systemet. Skylten markeras "tillgänglig" i Lediga-lista och kartan för annonsörer.'
  },
  {
    title: 'Drift & underhåll',
    desc: 'Automatisk self-test (ljusstyrka, pixel-fel, temperatur) skickar larm till NOC. Du kan felanmäla via appen (foto + text) och följa ärenden i realtid.'
  },
  {
    title: 'Intäkts­dashboard',
    desc: 'Se bokningar, beläggnings-grad och kommande kampanjer. Prognos uppdateras löpande så du kan planera framtida investeringar.'
  },
  {
    title: 'Utbetalning & redovisning',
    desc: 'Intäkter samlas och betalas ut varje månad tillsammans med detaljerad transaktions­rapport och faktura­underlag. CSV/PDF-export för bokföring; API för direktkoppling till Fortnox/Visma.'
  },
  {
    title: 'Expansion & upsell',
    desc: 'AI föreslår ytterligare skylt­lägen på din mark (t.ex. LED-totem, Adshel) baserat på trafik­data. Referral-program: få bonus när du värvar grannar/kollegor som också sätter upp skylt.'
  },
  {
    title: 'Hållbarhets-modul',
    desc: 'Dashboard visar energi­förbrukning, CO₂-besparing jämfört med tryckt affisch, samt lokala åter­investeringar finansierade av kampanj­intäkter. Data kan delas öppet (API/embed) för att stärka markägarens ESG-profil.'
  }
];

export default function UthyrarePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10 text-center uppercase tracking-wide">Så funkar det för uthyrare</h1>
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