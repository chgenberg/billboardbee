export default function KalenderPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#ff6b00]">Bokningskalender</h1>

      {/* Kalendervy */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Mars 2024</h2>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Kalendergrid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Veckodagar */}
          {['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}

          {/* Kalenderdagar */}
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <div
              key={day}
              className={`aspect-square p-2 border rounded-lg ${
                day === 15 ? 'bg-[#ff6b00] text-white' : 'hover:bg-gray-50'
              }`}
            >
              <div className={`text-sm ${day === 15 ? 'text-black' : ''}`}>{day}</div>
              {day === 15 && (
                <div className="text-xs mt-1">3 bokningar</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bokningslista */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Kommande bokningar</h2>
        <div className="space-y-4">
          {/* Bokning 1 */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">Skyltplats 1 - Stockholm</h3>
                <p className="text-sm text-gray-500">15 mars - 15 april 2024</p>
              </div>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                Bekräftad
              </span>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Vårkampanj 2024</p>
                  <p className="text-xs text-gray-500">3 skyltar</p>
                </div>
              </div>
              <button className="text-[#ff6b00] hover:text-[#e65c00]">
                Visa detaljer
              </button>
            </div>
          </div>

          {/* Bokning 2 */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">Skyltplats 2 - Göteborg</h3>
                <p className="text-sm text-gray-500">1 april - 1 maj 2024</p>
              </div>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800">
                Väntar på bekräftelse
              </span>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Sommarkampanj 2024</p>
                  <p className="text-xs text-gray-500">5 skyltar</p>
                </div>
              </div>
              <button className="text-[#ff6b00] hover:text-[#e65c00]">
                Visa detaljer
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 