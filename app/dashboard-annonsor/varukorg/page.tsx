export default function VarukorgPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#ff6b00]">Varukorg & utkast</h1>

      {/* Varukorg */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Aktuell varukorg</h2>
        <div className="space-y-4">
          {/* Varukorgsitem 1 */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
              <div>
                <h3 className="font-medium">Skyltplats 1 - Stockholm</h3>
                <p className="text-sm text-gray-500">15 mars - 15 april 2024</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-[#ff6b00] font-semibold">2 500 kr</span>
              <button className="text-red-500 hover:text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Varukorgsitem 2 */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
              <div>
                <h3 className="font-medium">Skyltplats 2 - Göteborg</h3>
                <p className="text-sm text-gray-500">1 april - 1 maj 2024</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-[#ff6b00] font-semibold">3 000 kr</span>
              <button className="text-red-500 hover:text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Summering */}
          <div className="mt-6 pt-6 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Delsumma</span>
              <span className="font-semibold">5 500 kr</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Moms (25%)</span>
              <span className="font-semibold">1 375 kr</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Totalt</span>
              <span className="text-[#ff6b00]">6 875 kr</span>
            </div>
            <button className="w-full mt-6 py-3 bg-[#ff6b00] text-white rounded-lg hover:bg-[#e65c00]">
              Fortsätt till betalning
            </button>
          </div>
        </div>
      </section>

      {/* Utkast */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Sparade utkast</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Utkast 1 */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Vårkampanj 2024</h3>
            <p className="text-sm text-gray-500 mb-4">Senast uppdaterad: 2024-03-15</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">3 skyltar</span>
              <button className="text-[#ff6b00] hover:text-[#e65c00]">
                Fortsätt redigera
              </button>
            </div>
          </div>

          {/* Utkast 2 */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Sommarkampanj 2024</h3>
            <p className="text-sm text-gray-500 mb-4">Senast uppdaterad: 2024-03-10</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">5 skyltar</span>
              <button className="text-[#ff6b00] hover:text-[#e65c00]">
                Fortsätt redigera
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 