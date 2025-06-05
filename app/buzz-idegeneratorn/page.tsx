'use client';
import React, { useState } from 'react';

interface Idea {
  slogan: string;
  beskrivning: string;
  effekt: string;
}

export default function BuzzIdegeneratorn() {
  const [url, setUrl] = useState('');
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIdeas([]);
    setError('');
    setLoading(true);
    setModalOpen(false);
    setModalIndex(0);
    try {
      const res = await fetch('/api/buzz-idegeneratorn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.ideas) {
        setIdeas(data.ideas);
        setModalOpen(true);
      } else setError(data.error || 'Något gick fel.');
    } catch (e) {
      setError('Kunde inte generera idéer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100 py-16 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-xl w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-[#ff6b00] mb-4 text-center">Buzz idégeneratorn 🐝</h1>
        <p className="mb-6 text-gray-700 text-center">Klistra in din webbadress så genererar vi kreativa billboard-idéer med AI!</p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="url"
            required
            placeholder="https://dinhemsida.se"
            className="input-alt text-lg"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-[#ff6b00] text-white font-bold text-lg shadow-md border-2 border-[#ff6b00] tracking-wide hover:bg-white hover:text-[#ff6b00] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40"
            disabled={loading}
          >
            {loading ? 'Genererar...' : 'Generera idéer'}
          </button>
        </form>
        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
        {ideas.length > 0 && (
          <div className="mt-8 w-full">
            <h2 className="text-xl font-bold text-[#ff6b00] mb-2 text-center">Förslag på billboard-idéer:</h2>
            <div className="grid gap-6">
              {ideas.map((idea, i) => (
                <div
                  key={i}
                  className="group bg-white border border-[#ffb400]/30 rounded-2xl p-6 flex flex-col items-center shadow-md text-[#222] transition-transform duration-200 hover:scale-[1.03] hover:shadow-2xl cursor-pointer min-h-[170px]"
                  style={{ boxShadow: '0 2px 16px 0 rgba(255, 186, 0, 0.08)' }}
                >
                  <div className="font-bold text-lg text-[#ff6b00] text-center mb-2 group-hover:text-[#222] transition-colors">{idea.slogan}</div>
                  <div className="text-sm text-gray-700 text-center mb-2 italic">{idea.beskrivning}</div>
                  <div className="text-xs text-[#16475b] bg-[#ffb400]/10 rounded px-3 py-2 mt-2 text-center w-full group-hover:bg-[#ffb400]/20 transition-colors">
                    {idea.effekt}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {modalOpen && ideas.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full flex flex-col items-center relative">
            <button
              className="absolute top-4 right-4 text-3xl text-[#ff6b00] hover:text-black font-extrabold z-10 bg-white/80 rounded-full w-10 h-10 flex items-center justify-center shadow-md border border-[#ff6b00]/20 transition-colors"
              onClick={() => setModalOpen(false)}
              aria-label="Stäng"
            >×</button>
            <div className="w-full flex flex-col items-center">
              <div className="font-bold text-2xl text-[#ff6b00] mb-4 text-center">Billboard-idé {modalIndex + 1} av {ideas.length}</div>
              <div className="font-bold text-lg text-[#ff6b00] text-center mb-2">{ideas[modalIndex].slogan}</div>
              <div className="text-sm text-gray-700 text-center mb-2 italic">{ideas[modalIndex].beskrivning}</div>
              <div className="text-xs text-[#16475b] bg-[#ffb400]/10 rounded px-3 py-2 mt-2 text-center w-full">{ideas[modalIndex].effekt}</div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                className="px-4 py-2 rounded-full bg-[#ff6b00] text-white font-bold disabled:opacity-40"
                onClick={() => setModalIndex(i => Math.max(0, i - 1))}
                disabled={modalIndex === 0}
              >Föregående</button>
              <button
                className="px-4 py-2 rounded-full bg-[#ff6b00] text-white font-bold disabled:opacity-40"
                onClick={() => setModalIndex(i => Math.min(ideas.length - 1, i + 1))}
                disabled={modalIndex === ideas.length - 1}
              >Nästa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 