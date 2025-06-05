'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Dummy data for documents
const dummyDocuments = [
  {
    id: 1,
    name: 'Bygglov 2024',
    type: 'building_permit',
    status: 'active',
    expiryDate: '2024-12-31',
    fileUrl: '#',
  },
  {
    id: 2,
    name: 'Elcertifikat',
    type: 'certificate',
    status: 'expired',
    expiryDate: '2024-03-31',
    fileUrl: '#',
  },
];

const documentTypes = {
  building_permit: {
    label: 'Bygglov',
    icon: '🏗️',
    color: '#bf7100',
  },
  certificate: {
    label: 'Certifikat',
    icon: '📜',
    color: '#4a90e2',
  },
  contract: {
    label: 'Kontrakt',
    icon: '📄',
    color: '#50e3c2',
  },
  other: {
    label: 'Övrigt',
    icon: '📁',
    color: '#b8b8b8',
  },
};

export default function DocumentsPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('all');

  const filteredDocuments = selectedType === 'all'
    ? dummyDocuments
    : dummyDocuments.filter(doc => doc.type === selectedType);

  return (
    <div className="min-h-screen bg-[#f6f5f3]">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold tracking-tight text-[#bf7100]">Dokument & Bygglov</h1>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 text-sm rounded-lg bg-[#f6f5f3] text-[#bf7100] border border-[#bf7100]/30 hover:bg-[#fff] transition"
            >
              Tillbaka till dashboard
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Document filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-semibold text-[#222] mb-4">Filter</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm ${
                    selectedType === 'all'
                      ? 'bg-[#bf7100] text-white'
                      : 'bg-[#f6f5f3] text-[#bf7100] border border-[#bf7100]/30'
                  }`}
                >
                  Alla dokument
                </button>
                {Object.entries(documentTypes).map(([type, info]) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm ${
                      selectedType === type
                        ? 'bg-[#bf7100] text-white'
                        : 'bg-[#f6f5f3] text-[#bf7100] border border-[#bf7100]/30'
                    }`}
                  >
                    <span className="mr-2">{info.icon}</span>
                    {info.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Document list */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-[#222]">Dokument</h2>
                  <button className="px-4 py-2 bg-[#bf7100] text-white rounded-lg hover:bg-[#a05c00] transition">
                    Ladda upp dokument
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredDocuments.map(doc => (
                  <div key={doc.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl mr-4">
                          {documentTypes[doc.type as keyof typeof documentTypes].icon}
                        </span>
                        <div>
                          <h3 className="text-[#222] font-medium">{doc.name}</h3>
                          <p className="text-sm text-gray-500">
                            {documentTypes[doc.type as keyof typeof documentTypes].label}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Utgår</div>
                          <div className="text-[#222]">
                            {new Date(doc.expiryDate).toLocaleDateString('sv-SE')}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-400 hover:text-[#bf7100] transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button className="p-2 text-gray-400 hover:text-[#bf7100] transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    {doc.status === 'expired' && (
                      <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                        Detta dokument har gått ut. Vänligen ladda upp ett nytt.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 