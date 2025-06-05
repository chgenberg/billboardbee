export default function ResultatPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#ff6b00]">Kampanj-resultat</h1>

      {/* Översikt */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Kampanjöversikt</h2>
          <div className="flex space-x-2">
            <select className="px-4 py-2 border rounded-lg bg-white">
              <option value="30">Senaste 30 dagarna</option>
              <option value="90">Senaste 90 dagarna</option>
              <option value="365">Senaste året</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Totalt antal visningar</h3>
            <p className="text-2xl font-bold text-[#ff6b00]">125 000</p>
            <p className="text-sm text-green-500 mt-1">↑ 12% från föregående period</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Genomsnittlig exponering</h3>
            <p className="text-2xl font-bold text-[#ff6b00]">45 000</p>
            <p className="text-sm text-green-500 mt-1">↑ 8% från föregående period</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Engagemang</h3>
            <p className="text-2xl font-bold text-[#ff6b00]">3.2%</p>
            <p className="text-sm text-red-500 mt-1">↓ 2% från föregående period</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">ROI</h3>
            <p className="text-2xl font-bold text-[#ff6b00]">2.8x</p>
            <p className="text-sm text-green-500 mt-1">↑ 15% från föregående period</p>
          </div>
        </div>
      </section>

      {/* Kampanjlista */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Aktiva kampanjer</h2>
        <div className="space-y-4">
          {/* Kampanj 1 */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">Vårkampanj 2024</h3>
                <p className="text-sm text-gray-500">15 mars - 15 april 2024</p>
              </div>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                Aktiv
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Visningar</p>
                <p className="text-lg font-semibold">45 000</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Exponering</p>
                <p className="text-lg font-semibold">15 000</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Engagemang</p>
                <p className="text-lg font-semibold">3.5%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Kostnad</p>
                <p className="text-lg font-semibold">2 500 kr</p>
              </div>
            </div>
            <div className="mt-4">
              <button className="text-[#ff6b00] hover:text-[#e65c00]">
                Visa detaljerad statistik
              </button>
            </div>
          </div>

          {/* Kampanj 2 */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">Sommarkampanj 2024</h3>
                <p className="text-sm text-gray-500">1 april - 1 maj 2024</p>
              </div>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800">
                Kommande
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Visningar</p>
                <p className="text-lg font-semibold">-</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Exponering</p>
                <p className="text-lg font-semibold">-</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Engagemang</p>
                <p className="text-lg font-semibold">-</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Kostnad</p>
                <p className="text-lg font-semibold">3 000 kr</p>
              </div>
            </div>
            <div className="mt-4">
              <button className="text-[#ff6b00] hover:text-[#e65c00]">
                Visa kampanjdetaljer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Prestandajämförelse */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Prestandajämförelse</h2>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Graf kommer att visas här</p>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Genomsnittlig exponering</p>
            <p className="text-lg font-semibold">45 000</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Genomsnittligt engagemang</p>
            <p className="text-lg font-semibold">3.2%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Genomsnittlig ROI</p>
            <p className="text-lg font-semibold">2.8x</p>
          </div>
        </div>
      </section>
    </div>
  );
} 