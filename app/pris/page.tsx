"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InformationCircleIcon, ChevronDownIcon, ChevronUpIcon, CheckCircleIcon, CalculatorIcon, ChartBarIcon, BoltIcon, CurrencyDollarIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const baseParams = [
  { label: "Foot-fall / trafikflöde", source: "MobilGPS + kommunal trafikstatistik", weight: 35 },
  { label: "Målgruppsmatchning", source: "Demografi & pendlar­mönster", weight: 20 },
  { label: "Placering & siktvinkel", source: "GIS-analys, ögonhöjd, dwell-time", weight: 15 },
  { label: "Skylttyp & format", source: "LED-pixelpitch, ljusnivåer, storlek", weight: 10 },
  { label: "Tidsfönster", source: "Dagstid/kväll, säsong, evenemang", weight: 15 },
  { label: "Beläggning", source: "Aktuell yield-faktor", weight: 5 },
];

const priceModels = [
  { model: "Fast CPM", fit: "Kampanjer < 4 v, tydlig budget", desc: "Du betalar en fast kostnad per tusen exponeringar (CPM)." },
  { model: "Share-of-voice (SOV)", fit: "Långsiktiga brand-build", desc: "Du köper procent av visningsloopen (t.ex. 10 % av 60 s-loop)." },
  { model: "Programmatic / RTB", fit: "Datadriven prestanda", desc: "Budgivning i realtid via Vistar / Hivestack; golv-CPM sätts av skylten." },
  { model: "Revenue-share", fit: "Markägareincitament", desc: "Uthyrare får procent av nettointäkten; annonsörer betalar marknads-pris." },
];

const costExample = [
  { post: "Bas-CPM", calc: "45 kr × 420 000 visningar", cost: "18 900 kr" },
  { post: "Early-bird-rabatt", calc: "–12 % (bokning 4 mån i förväg)", cost: "–2 268 kr" },
  { post: "Produktion LED-anpassning", calc: "Fast", cost: "3 000 kr" },
  { post: "Summa exkl. moms", calc: "", cost: "19 632 kr" },
];

const alwaysIncluded = [
  "QC-granskning av filformat, luminans, färgprofil.",
  "Energi & drift – grön el, fjärrövervakning, reparationer.",
  "Live-dashboard (impressions + väder + QR-scans).",
  "Slutrapport (PDF + CSV) för ROI-analys.",
  "Support 24/7 – chat, mail eller telefon."
];

const faqs = [
  { q: "Måste jag förbinda mig till minst X dagar?", a: "Nej, minsta bokning är 24 timmar (programmatic) eller 7 dagar (fast CPM)." },
  { q: "Kan jag pausa eller byta motiv under kampanjen?", a: "Ja, första filbytet är kostnadsfritt. Därefter 250 kr per filversion (teknik-hantering)." },
  { q: "Hur ofta justeras yield-priset?", a: "Var 15:e minut baserat på realtidsefterfrågan och beläggning." },
  { q: "Får markägaren insyn i min kampanjdata?", a: "Nej, dashboarden är separerat: annonsör ser kampanj-KPI, uthyrare ser beläggning & intäkt." },
];

const ownerExamples = [
  { model: "Fast hyra", desc: "12 000 kr/mån (vi tar risken)" },
  { model: "RevShare 50 %", desc: "prognos 15 000 – 25 000 kr/mån (du delar risk & belöning)" },
];

const getStepIcon = (step: number) => {
  switch (step) {
    case 1: return <CalculatorIcon className="w-7 h-7 text-orange-500" />;
    case 2: return <ChartBarIcon className="w-7 h-7 text-pink-500" />;
    case 3: return <CurrencyDollarIcon className="w-7 h-7 text-green-500" />;
    case 4: return <BoltIcon className="w-7 h-7 text-blue-500" />;
    case 5: return <CheckCircleIcon className="w-7 h-7 text-emerald-500" />;
    default: return <QuestionMarkCircleIcon className="w-7 h-7 text-gray-400" />;
  }
};

function PriceCalculatorModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [location, setLocation] = useState("");
  const [views, setViews] = useState(420000);
  const [length, setLength] = useState(14);
  const [time, setTime] = useState("day");
  const [advance, setAdvance] = useState(120);
  const [showResult, setShowResult] = useState(false);

  // Simple price calculation based on weights
  const baseCPM = 45;
  let price = (views / 1000) * baseCPM;
  if (advance >= 90) price *= 0.88; // Early-bird 12% rabatt
  if (length >= 30) price *= 0.95; // Liten rabatt för längre kampanj
  if (time === "both") price *= 1.15;
  const production = 3000;
  const total = Math.round(price + production);

  const steps = [
    {
      label: "Var ska skylten stå?",
      content: (
        <input
          type="text"
          className="w-full border rounded-lg px-4 py-3 mt-4 text-gray-900"
          placeholder="Stad eller region (t.ex. Göteborg)"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
      )
    },
    {
      label: "Hur många visningar vill du ha?",
      content: (
        <div className="flex flex-col items-center mt-4">
          <input
            type="range"
            min={50000}
            max={1000000}
            step={10000}
            value={views}
            onChange={e => setViews(Number(e.target.value))}
            className="w-full"
          />
          <div className="mt-2 text-lg font-bold text-gray-900">{views.toLocaleString()} visningar</div>
        </div>
      )
    },
    {
      label: "Kampanjlängd?",
      content: (
        <div className="flex gap-3 mt-4 justify-center">
          {[7, 14, 30].map(val => (
            <button
              key={val}
              onClick={() => setLength(val)}
              className={`px-6 py-3 rounded-full font-bold border transition-all ${length === val ? 'bg-orange-500 text-white' : 'bg-white text-gray-900 border-orange-200 hover:bg-orange-50'}`}
            >
              {val} dagar
            </button>
          ))}
        </div>
      )
    },
    {
      label: "Vilken tid på dygnet?",
      content: (
        <div className="flex gap-3 mt-4 justify-center">
          {[
            { key: "day", label: "Dag (06–18)" },
            { key: "evening", label: "Kväll (18–24)" },
            { key: "both", label: "Både dag & kväll" }
          ].map(opt => (
            <button
              key={opt.key}
              onClick={() => setTime(opt.key)}
              className={`px-6 py-3 rounded-full font-bold border transition-all ${time === opt.key ? 'bg-orange-500 text-white' : 'bg-white text-gray-900 border-orange-200 hover:bg-orange-50'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )
    },
    {
      label: "Hur långt i förväg bokar du?",
      content: (
        <div className="flex flex-col items-center mt-4">
          <input
            type="range"
            min={1}
            max={180}
            step={1}
            value={advance}
            onChange={e => setAdvance(Number(e.target.value))}
            className="w-full"
          />
          <div className="mt-2 text-lg font-bold text-gray-900">{advance} dagar i förväg</div>
        </div>
      )
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <motion.div initial={{ scale: 0.95, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 40 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-orange-500 text-2xl font-bold">×</button>
            {!showResult ? (
              <>
                <div className="mb-6 text-center">
                  <div className="text-xs uppercase tracking-widest text-orange-500 font-bold mb-2">Steg {step + 1} av {steps.length}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{steps[step].label}</h3>
                  {steps[step].content}
                </div>
                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => step > 0 ? setStep(step - 1) : onClose()}
                    className="px-5 py-2 rounded-full bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-all"
                  >
                    {step === 0 ? "Avbryt" : "Tillbaka"}
                  </button>
                  <button
                    onClick={() => {
                      if (step === steps.length - 1) setShowResult(true);
                      else setStep(step + 1);
                    }}
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold shadow hover:from-orange-600 hover:to-orange-700 transition-all"
                  >
                    {step === steps.length - 1 ? "Visa pris" : "Nästa"}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-2">Ditt prisestimat</div>
                <div className="text-5xl font-extrabold text-orange-600 mb-4">{total.toLocaleString()} kr</div>
                <div className="mb-4 text-gray-700">Baserat på dina val:</div>
                <ul className="mb-6 text-left text-gray-700">
                  <li><span className="font-bold">Plats:</span> {location || "-"}</li>
                  <li><span className="font-bold">Visningar:</span> {views.toLocaleString()}</li>
                  <li><span className="font-bold">Kampanjlängd:</span> {length} dagar</li>
                  <li><span className="font-bold">Tid på dygnet:</span> {time === "day" ? "Dag" : time === "evening" ? "Kväll" : "Både dag & kväll"}</li>
                  <li><span className="font-bold">Bokning i förväg:</span> {advance} dagar</li>
                </ul>
                <div className="mb-2 text-gray-700">Inkluderar produktion ({production.toLocaleString()} kr)</div>
                <button
                  onClick={() => { setShowResult(false); setStep(0); }}
                  className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold shadow hover:from-orange-600 hover:to-orange-700 transition-all"
                >Beräkna igen</button>
                <button
                  onClick={onClose}
                  className="mt-4 ml-3 px-6 py-3 rounded-full bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-all"
                >Stäng</button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function PrisPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-20">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-orange-100 via-white to-pink-50 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Prissättning <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">– transparens</span> från första klick till slutrapport
          </h1>
          <p className="text-xl text-gray-600 mb-8">Alltid tydligt, alltid datadrivet. Se exakt vad du betalar för – och vad du får.</p>
          <button
            onClick={() => setShowCalculator(true)}
            className="mt-2 px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Beräkna pris
          </button>
        </motion.div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
      </section>

      {/* Why pricing is more than a number */}
      <section className="w-full sm:max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-2 text-gray-900"><InformationCircleIcon className="w-7 h-7 text-orange-500" /> Varför prissättning är mer än en siffra</h2>
          <p className="text-lg text-gray-700 mb-4">När du köper eller hyr ut en billboard hos Billboard Bee betalar du inte bara för ytan i sig. Du betalar för räckvidd, kontext, exponeringstid, driftsäkerhet, energieffektiv teknik och mätbar effekt. Vår modell bygger därför på att varje krona du investerar – eller tjänar – är förankrad i data som går att följa i realtid.</p>
        </motion.div>
      </section>

      {/* How base price is calculated */}
      <section className="w-full sm:max-w-5xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-900"><CalculatorIcon className="w-7 h-7 text-orange-500" /> Så beräknas grundpriset</h2>
          <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-orange-50">
                <tr>
                  <th className="py-3 px-4 font-bold text-gray-800">Parameter</th>
                  <th className="py-3 px-4 font-bold text-gray-800">Datakälla</th>
                  <th className="py-3 px-4 font-bold text-gray-800">Vikt i modellen</th>
                </tr>
              </thead>
              <tbody>
                {baseParams.map((p, i) => (
                  <tr key={p.label} className="border-b hover:bg-orange-50 transition-colors">
                    <td className="py-3 px-4 text-gray-900 font-medium">{p.label}</td>
                    <td className="py-3 px-4 text-gray-900">{p.source}</td>
                    <td className="py-3 px-4 text-gray-900">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${p.weight}%` }} transition={{ duration: 1 }} viewport={{ once: true }} className="h-3 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full" style={{ width: `${p.weight}%`, minWidth: 40 }} />
                      <span className="ml-2 font-bold text-gray-900">{p.weight} %</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-4 text-xs text-gray-500">* Procentandelar anger hur mycket faktorn påverkar det algoritmiska "base CPM".</div>
          </div>
        </motion.div>
      </section>

      {/* Dynamic pricing (yield engine) */}
      <section className="w-full sm:max-w-5xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-2 text-gray-900"><BoltIcon className="w-7 h-7 text-pink-500" /> Dynamisk prissättning (yield-motor)</h2>
          <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2 mb-4">
            <li>Real-time inventory check – lediga spotar prissätts lägre för att fyllas snabbare.</li>
            <li>Early-bird-fönster – bokningar ≥ 90 dagar i förväg kan trigga 10–20 % rabatt.</li>
            <li>Demand surge – vid hög efterfrågan (t.ex. mässvecka i Göteborg) justeras CPM upp automatiskt.</li>
            <li>Last-minute deals – korta, osålda spotar (&lt; 48 h) säljs till fast lågpris för att inte stå tomma.</li>
            <li>Transparens: algoritmen visas i dashboarden; du ser exakt varför priset rör sig.</li>
          </ul>
        </motion.div>
      </section>

      {/* Price models */}
      <section className="w-full sm:max-w-5xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-900"><CurrencyDollarIcon className="w-7 h-7 text-green-500" /> Prisstrukturer att välja mellan</h2>
          <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-green-50">
                <tr>
                  <th className="py-3 px-4 font-bold text-gray-800">Modell</th>
                  <th className="py-3 px-4 font-bold text-gray-800">Passar</th>
                  <th className="py-3 px-4 font-bold text-gray-800">Så funkar det</th>
                </tr>
              </thead>
              <tbody>
                {priceModels.map((m) => (
                  <tr key={m.model} className="border-b hover:bg-green-50 transition-colors">
                    <td className="py-3 px-4 text-gray-900 font-medium">{m.model}</td>
                    <td className="py-3 px-4 text-gray-900">{m.fit}</td>
                    <td className="py-3 px-4 text-gray-900">{m.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>

      {/* Cost example */}
      <section className="w-full sm:max-w-5xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-900"><ChartBarIcon className="w-7 h-7 text-blue-500" /> Kostnadsexempel</h2>
          <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="py-3 px-4 font-bold text-gray-800">Post</th>
                  <th className="py-3 px-4 font-bold text-gray-800">Beräkning</th>
                  <th className="py-3 px-4 font-bold text-gray-800">Kostnad</th>
                </tr>
              </thead>
              <tbody>
                {costExample.map((c) => (
                  <tr key={c.post} className="border-b hover:bg-blue-50 transition-colors">
                    <td className="py-3 px-4 text-gray-900 font-medium">{c.post}</td>
                    <td className="py-3 px-4 text-gray-900">{c.calc}</td>
                    <td className="py-3 px-4 text-gray-900 font-bold">{c.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-4 text-xs text-gray-500">Scenario: LED-skylt 8 m² i mellanstor svensk stad, 25 000 passerande fordon/dygn<br />Period: 14 dagar, 12 h/dag (kl 06–18)<br />Kreativ: 10 s spot, loop på 60 s</div>
          </div>
        </motion.div>
      </section>

      {/* Always included */}
      <section className="w-full sm:max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-900"><CheckCircleIcon className="w-7 h-7 text-emerald-500" /> Vad ingår alltid i priset?</h2>
          <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
            {alwaysIncluded.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="w-full sm:max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-900"><QuestionMarkCircleIcon className="w-7 h-7 text-orange-500" /> Vanliga frågor</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl shadow border border-gray-100">
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-lg font-medium text-left focus:outline-none hover:bg-orange-50 transition-colors text-gray-900"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUpIcon className="w-6 h-6 text-orange-500" />
                  ) : (
                    <ChevronDownIcon className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-5 text-gray-700">
                    {faq.a}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Owner calculator */}
      <section className="w-full sm:max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-900"><CurrencyDollarIcon className="w-7 h-7 text-green-500" /> För markägare – din intäktskalkyl</h2>
          <p className="text-lg text-gray-700 mb-4">Som uthyrare kan du välja fast hyra (garanterad månadsintäkt) eller revenue-share (procent av omsättningen). Kalkylatorn i ditt konto visar båda scenarierna utifrån samma yield-data som annonsörerna ser.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ownerExamples.map((ex, i) => (
              <div key={i} className="bg-white rounded-xl shadow border border-gray-100 p-6 flex items-center gap-4">
                <CurrencyDollarIcon className="w-8 h-8 text-green-500" />
                <div>
                  <div className="font-bold text-lg text-gray-900">{ex.model}</div>
                  <div className="text-gray-700">{ex.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Steps to get started */}
      <section className="w-full sm:max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-900"><ChartBarIcon className="w-7 h-7 text-blue-500" /> Så kommer du i gång</h2>
          <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="py-3 px-4 font-bold text-gray-800">Steg</th>
                  <th className="py-3 px-4 font-bold text-gray-800">Annonsör</th>
                  <th className="py-3 px-4 font-bold text-gray-800">Uthyrare</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["1", "Testa skylt + mock-up", "Skicka foton på plats"],
                  ["2", "Se pris i realtid", "Få intäktsprognos"],
                  ["3", "Boka → Betala", "Signera avtal"],
                  ["4", "Kampanj live", "Skylten live"],
                  ["5", "Följ KPI", "Se intäkter"],
                ].map(([step, adv, own], i) => (
                  <tr key={step} className="border-b hover:bg-blue-50 transition-colors">
                    <td className="py-3 px-4 text-gray-900 font-bold flex items-center gap-2">{getStepIcon(i+1)} Steg {step}</td>
                    <td className="py-3 px-4 text-gray-900">{adv}</td>
                    <td className="py-3 px-4 text-gray-900">{own}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>

      {/* Contact CTA */}
      <section className="w-full sm:max-w-3xl mx-auto px-4 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Har du fler frågor?</h2>
          <p className="text-lg text-gray-900 mb-8">Kontakta oss – vi ger dig en skräddarsydd offert inom 24 timmar.</p>
          <a href="/kontakt" className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">Kontakta oss</a>
        </motion.div>
      </section>
      <PriceCalculatorModal isOpen={showCalculator} onClose={() => setShowCalculator(false)} />
    </div>
  );
} 