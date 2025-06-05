export default function BetalningPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#ff6b00]">Betalning & kvittens</h1>

      {/* Betalningsöversikt */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Betalningsöversikt</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Totalt spenderat</h3>
            <p className="text-2xl font-bold text-[#ff6b00]">25 000 kr</p>
            <p className="text-sm text-gray-500 mt-1">Senaste 30 dagarna</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Väntande betalningar</h3>
            <p className="text-2xl font-bold text-[#ff6b00]">6 875 kr</p>
            <p className="text-sm text-gray-500 mt-1">2 väntande fakturor</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Kommande betalningar</h3>
            <p className="text-2xl font-bold text-[#ff6b00]">12 500 kr</p>
            <p className="text-sm text-gray-500 mt-1">3 kommande bokningar</p>
          </div>
        </div>
      </section>

      {/* Kvitton */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Kvitton</h2>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
              Filtrera
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
              Exportera
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kvittonummer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Datum</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kampanj</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Belopp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Åtgärd</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">REC-2024-001</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-03-15</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Vårkampanj 2024</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2 500 kr</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Betald
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#ff6b00]">
                  <button className="hover:text-[#e65c00]">Ladda ner</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">REC-2024-002</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-03-20</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sommarkampanj 2024</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3 000 kr</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Väntar
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#ff6b00]">
                  <button className="hover:text-[#e65c00]">Ladda ner</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Betalningsmetoder */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Betalningsmetoder</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-8 bg-gray-200 rounded"></div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-500">Utgår 12/24</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                Standard
              </span>
              <button className="text-[#ff6b00] hover:text-[#e65c00]">Ta bort</button>
            </div>
          </div>
          <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#ff6b00] hover:text-[#ff6b00]">
            + Lägg till ny betalningsmetod
          </button>
        </div>
      </section>
    </div>
  );
} 