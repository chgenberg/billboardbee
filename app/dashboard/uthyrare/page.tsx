'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UthyrareDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Här kan du lägga till logik för att kontrollera om användaren är inloggad
    // och har rätt roll
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Uthyrare Dashboard</h1>
        <div className="mt-6 flex flex-col gap-4">
          <button
            onClick={() => router.push('/saljare/ny-annons')}
            className="w-fit px-6 py-3 rounded-xl bg-[#ff6b00] text-white font-bold shadow hover:bg-[#a05c00] transition-all text-lg"
          >
            + Skapa ny annons
          </button>
          <p className="text-gray-600">
            Välkommen till din dashboard som uthyrare. Här kan du hantera dina skyltplatser.
          </p>
        </div>
      </div>
    </div>
  );
} 