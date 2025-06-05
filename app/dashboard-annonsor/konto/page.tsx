import Image from "next/image";

export default function KontoPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#ff6b00]">Konto & betalningar</h1>
      
      {/* Profilsektion */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Profilinformation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Företagsnamn <span className="text-black">*</span></label>
            <input type="text" className="w-full p-2 border rounded-lg" placeholder="Ange företagsnamn" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organisationsnummer <span className="text-black">*</span></label>
            <input type="text" className="w-full p-2 border rounded-lg" placeholder="Ange organisationsnummer" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">E-post <span className="text-black">*</span></label>
            <input type="email" className="w-full p-2 border rounded-lg" placeholder="Ange e-postadress" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Telefon <span className="text-black">*</span></label>
            <input type="tel" className="w-full p-2 border rounded-lg" placeholder="Ange telefonnummer" />
          </div>
        </div>
      </section>

      {/* Betalningsmetoder */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Betalningsmetoder</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <Image src="/handelsbanken.png.avif" alt="Handelsbanken" width={48} height={32} className="rounded shadow" />
              <div>
                <p className="font-medium text-black">•••• •••• •••• 4242 <span className="text-black">*</span></p>
                <p className="text-sm text-black">Utgår 12/24 <span className="text-black">*</span></p>
              </div>
            </div>
            <button className="text-[#ff6b00] hover:text-[#e65c00]">Ta bort</button>
          </div>
          <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#ff6b00] hover:text-[#ff6b00]">
            + Lägg till ny betalningsmetod
          </button>
        </div>
      </section>

      {/* Fakturor */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Fakturor</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fakturanummer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Datum</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Belopp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Åtgärd</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">INV-2024-001</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-03-15</td>
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
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
} 