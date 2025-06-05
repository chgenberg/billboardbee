import { useState } from 'react';

interface BeeQuizModalProps {
  onClose: () => void;
}

const questions = [
  {
    label: '1. Var ligger marken?',
    sub: '(Ange närmaste adress eller koordinat)',
    input: (
      <input
        id="address"
        type="text"
        className="w-full px-4 py-3 rounded-xl border border-[#ff6b00] bg-[#23272f] text-white focus:outline-none focus:border-amber-400 placeholder:text-white/40"
        placeholder="Ex: Storgatan 1, 123 45 Ort eller 57.7, 11.9"
        autoFocus
      />
    ),
  },
  {
    label: '2. Hur nära en större väg ligger marken?',
    sub: '',
    input: (
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2">
          <input type="radio" name="distance" value="< 20 m" className="accent-[#ff6b00]" />
          {'< 20 m'}
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="distance" value="20–50 m" className="accent-[#ff6b00]" />
          {'20–50 m'}
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="distance" value="> 50 m" className="accent-[#ff6b00]" />
          {'> 50 m'}
        </label>
      </div>
    ),
  },
  // ...lägg till fler frågor här
];

export default function BeeQuizModal({ onClose }: BeeQuizModalProps) {
  const [step, setStep] = useState(0); // 0-index
  const totalSteps = questions.length;
  const progress = Math.round(((step + 1) / totalSteps) * 100);
  const [slide, setSlide] = useState<'in' | 'out'>('in');

  const handleNext = () => {
    setSlide('out');
    setTimeout(() => {
      setStep((s) => Math.min(s + 1, totalSteps - 1));
      setSlide('in');
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#181c23] rounded-2xl shadow-2xl border border-[#23272f] p-8 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-orange-400 text-2xl"
          aria-label="Stäng"
        >
          ✕
        </button>
        {/* Progressbar och stegtext */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-white/80 font-bold tracking-widest">Fråga {step + 1} / {totalSteps}</span>
            <span className="text-xs text-white/60">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-[#23272f] rounded-full overflow-hidden">
            <div
              className="h-2 bg-amber-400 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        {/* Fråga med slide-animation */}
        <div className={`mb-8 transition-all duration-300 ${slide === 'in' ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'}`}>
          <label className="block text-white font-bold mb-3 text-lg">
            {questions[step].label} {questions[step].sub && <span className="text-xs text-white/60">{questions[step].sub}</span>}
          </label>
          {questions[step].input}
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#23272f] text-white font-bold border border-[#ff6b00] hover:bg-[#ff6b00] hover:text-[#181c23] transition-colors text-sm tracking-widest"
          >
            Avbryt
          </button>
          <button
            onClick={handleNext}
            className="px-5 py-2 rounded-full bg-amber-400 text-[#181c23] font-bold hover:bg-[#ffb300] transition-colors text-sm tracking-widest shadow"
            disabled={step === totalSteps - 1}
          >
            Nästa
          </button>
        </div>
      </div>
    </div>
  );
} 