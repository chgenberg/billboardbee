export default function KreativUploadPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#ff6b00]">Kreativ-upload & validering</h1>

      {/* Upload-sektion */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Ladda upp kampanjmaterial</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="max-w-xl mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="mt-4 text-lg text-gray-600">Dra och släpp dina filer här</p>
            <p className="mt-2 text-sm text-gray-500">eller</p>
            <button className="mt-4 px-4 py-2 bg-[#ff6b00] text-white rounded-lg hover:bg-[#e65c00]">
              Välj filer
            </button>
            <p className="mt-4 text-sm text-gray-500">
              Stödda format: JPG, PNG, PDF (max 10MB)
            </p>
          </div>
        </div>
      </section>

      {/* Valideringsstatus */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Valideringsstatus</h2>
        <div className="space-y-4">
          {/* Material 1 */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                <div>
                  <h3 className="font-medium">Vårkampanj 2024 - Skylt 1</h3>
                  <p className="text-sm text-gray-500">Uppladdad: 2024-03-15</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                  Godkänd
                </span>
                <button className="text-[#ff6b00] hover:text-[#e65c00]">
                  Visa detaljer
                </button>
              </div>
            </div>
          </div>

          {/* Material 2 */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                <div>
                  <h3 className="font-medium">Vårkampanj 2024 - Skylt 2</h3>
                  <p className="text-sm text-gray-500">Uppladdad: 2024-03-15</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800">
                  Under granskning
                </span>
                <button className="text-[#ff6b00] hover:text-[#e65c00]">
                  Visa detaljer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Riktlinjer */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Riktlinjer för material</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Bildkrav</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Minimal upplösning: 300 DPI</li>
              <li>Rekommenderad storlek: 3000 x 2000 pixlar</li>
              <li>Filformat: JPG, PNG, PDF</li>
              <li>Max filstorlek: 10MB</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Innehållskrav</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Ingen explicit reklam</li>
              <li>Inga varumärken utan tillstånd</li>
              <li>Inga personuppgifter</li>
              <li>Följ gällande reklamregler</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
} 