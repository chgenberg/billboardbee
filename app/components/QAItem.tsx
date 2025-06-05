'use client';

import { useState } from 'react';

interface QAItemProps {
  question: string;
  answer: string;
}

export default function QAItem({ question, answer }: QAItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`bg-white/95 rounded-[2rem] shadow-xl border border-gray-100 transition-all duration-300 ${
        isOpen ? 'scale-[1.02]' : ''
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 text-left focus:outline-none"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-[#16475b] pr-8">{question}</h3>
          <span className={`text-[#16475b] text-2xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </div>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-8 pb-6">
          <p className="text-gray-800 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
} 