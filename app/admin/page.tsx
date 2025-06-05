'use client';

import { useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/24/outline';

export default function AdminPage() {
  const [showInstructions, setShowInstructions] = useState(false);
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'billboardbee2025') {
      setShowInstructions(true);
    } else {
      alert('Fel lösenord');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center mb-6">
            <LockClosedIcon className="h-12 w-12 text-gray-400" />
          </div>
          
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">Admin Dashboard</h1>
          
          {!showInstructions ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lösenord
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Ange admin-lösenord"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
              >
                Logga in
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Prisma Studio Access</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">För lokal utveckling:</h3>
                    <code className="block bg-gray-100 p-3 rounded text-sm">
                      npx prisma studio
                    </code>
                    <p className="text-sm text-gray-600 mt-2">
                      Detta öppnar Prisma Studio på http://localhost:5555
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">För produktion (Render):</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                      <li>Logga in på Render Dashboard</li>
                      <li>Gå till din service</li>
                      <li>Klicka på "Shell" tabben</li>
                      <li>Kör kommandot: <code className="bg-gray-100 px-2 py-1 rounded">npx prisma studio</code></li>
                      <li>Använd port forwarding för att komma åt Studio</li>
                    </ol>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Säkerhet:</strong> Prisma Studio bör endast användas i utvecklingsmiljö. 
                      För produktion, använd säkra databasklienter eller bygg ett anpassat admin-gränssnitt.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-medium text-gray-900 mb-3">Databastabeller:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• <strong>User</strong> - Användare (annonsörer och hyresvärdar)</li>
                  <li>• <strong>Billboard</strong> - Skyltplatser</li>
                  <li>• <strong>Booking</strong> - Bokningar</li>
                  <li>• <strong>TeamMember</strong> - Teammedlemmar</li>
                  <li>• <strong>SupportTicket</strong> - Supportärenden</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 