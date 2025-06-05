'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Ett fel uppstod:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Något gick fel
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ett oväntat fel uppstod. Försök igen eller kontakta support om problemet kvarstår.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">
              {error.message || 'Ett oväntat fel uppstod'}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={reset}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Försök igen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 