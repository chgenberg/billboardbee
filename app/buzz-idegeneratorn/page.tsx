'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIdeas([]);
    setError('');
    setLoading(true);
    
    try {
      const res = await fetch('/api/buzz-idegeneratorn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.ideas) {
        setIdeas(data.ideas);
      } else {
        setError(data.error || 'Något gick fel.');
      }
    } catch (e) {
      setError('Kunde inte generera idéer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-6xl mb-6 block">🐝</span>
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-4 uppercase tracking-tight">
              BUZZ IDÉGENERATORN
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-light">
              Låt AI skapa kreativa billboard-idéer baserat på din webbplats
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="url"
                required
                placeholder="https://dinhemsida.se"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-full text-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 shadow-sm text-gray-700"
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Genererar...
                </span>
              ) : (
                'Generera idéer'
              )}
            </motion.button>
          </form>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Ideas Section */}
      <AnimatePresence>
        {ideas.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 pb-20"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-12 text-center uppercase tracking-wide">
                DINA BILLBOARD-IDÉER
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ideas.map((idea, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="space-y-4">
                      <h3 className="text-2xl font-medium text-gray-900">
                        "{idea.slogan}"
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {idea.beskrivning}
                      </p>
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-sm text-orange-600 font-medium">
                          FÖRVÄNTAD EFFEKT:
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {idea.effekt}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 text-center"
              >
                <button
                  onClick={() => {
                    setUrl('');
                    setIdeas([]);
                    setError('');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="uppercase tracking-wide">Testa igen</span>
                </button>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
} 