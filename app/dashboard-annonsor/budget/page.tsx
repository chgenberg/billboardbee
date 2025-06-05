export default function BudgetPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#ff6b00]">Budget & spendering</h1>

      {/* Budgetöversikt */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Budgetöversikt</h2>
          <div className="flex space-x-2">
            <select className="px-4 py-2 border rounded-lg bg-white">
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total budget</h3>
            <p className="text-2xl font-bold text-[#ff6b00]">100 000 kr</p>
            <p className="text-sm text-gray-500 mt-1">Årlig budget</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Spenderat</h3>
            <p className="text-2xl font-bold text-[#ff6b00]">25 000 kr</p>
            <p className="text-sm text-gray-500 mt-1">25% av budgeten</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Kvar att spendera</h3>
            <p className="text-2xl font-bold text-[#ff6b00]">75 000 kr</p>
            <p className="text-sm text-gray-500 mt-1">75% av budgeten</p>
          </div>
        </div>
      </section>

      {/* Budgetfördelning */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Budgetfördelning</h2>
        <div className="space-y-4">
          {/* Kategori 1 */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="font-medium">Vårkampanj 2024</h3>
                <p className="text-sm text-gray-500">15 mars - 15 april</p>
              </div>
              <div className="text-right">
                <p className="font-medium">25 000 kr</p>
                <p className="text-sm text-gray-500">25% av total budget</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-[#ff6b00] h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>

          {/* Kategori 2 */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="font-medium">Sommarkampanj 2024</h3>
                <p className="text-sm text-gray-500">1 april - 1 maj</p>
              </div>
              <div className="text-right">
                <p className="font-medium">30 000 kr</p>
                <p className="text-sm text-gray-500">30% av total budget</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-[#ff6b00] h-2 rounded-full" style={{ width: '30%' }}></div>
            </div>
          </div>

          {/* Kategori 3 */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="font-medium">Höstkampanj 2024</h3>
                <p className="text-sm text-gray-500">1 september - 1 oktober</p>
              </div>
              <div className="text-right">
                <p className="font-medium">45 000 kr</p>
                <p className="text-sm text-gray-500">45% av total budget</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-[#ff6b00] h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Transaktionshistorik */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Transaktionshistorik</h2>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Datum</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beskrivning</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kampanj</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Belopp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-03-15</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Bokning av skyltplats</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Vårkampanj 2024</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2 500 kr</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Betald
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-03-20</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Bokning av skyltplats</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sommarkampanj 2024</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3 000 kr</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Väntar
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
} 