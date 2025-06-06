import Link from 'next/link';
import Image from 'next/image';

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center py-20">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10 text-center uppercase tracking-wide">Välj din roll</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Uthyrare */}
        <div className="flex flex-col items-center bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
          <Image src="/uthyrare.png" alt="Uthyrare" width={320} height={320} className="rounded-2xl mb-6 object-cover" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Jag vill hyra ut en skylt</h2>
          <Link href="/uthyrare" className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 mt-2">Jag är uthyrare</Link>
        </div>
        {/* Annonsör */}
        <div className="flex flex-col items-center bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
          <Image src="/annonsor.png" alt="Annonsör" width={320} height={320} className="rounded-2xl mb-6 object-cover" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Jag vill hyra en skylt</h2>
          <Link href="/annonsor" className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 mt-2">Jag är annonsör</Link>
        </div>
      </div>
    </div>
  );
} 