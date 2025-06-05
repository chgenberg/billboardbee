import Image from 'next/image';
import { FaSeedling, FaHandshake, FaRegLightbulb, FaHeart } from 'react-icons/fa';

export default function About() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-white pt-20">
      {/* Hero Section */}
      <div className="w-full min-h-[60vh] relative flex items-center justify-center bg-[#ff6b00]/5">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/bi.png"
            alt="BillboardBee illustration"
            width={800}
            height={600}
            className="object-contain opacity-90"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-[#ff6b00] mb-6 tracking-tight uppercase">
            BILLBOARDBEE
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto font-light">
            Där mark möter mening
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-5xl mx-auto px-4 py-20">
        {/* Vision Statement */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-[#ff6b00] mb-6">
            En ny era av utomhusreklam
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Vi omdefinierar hur markägare och varumärken möts. Genom att förbinda tradition med innovation skapar vi en plattform där varje skylt berättar en historia.
          </p>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#ff6b00]/10 flex items-center justify-center">
                <FaRegLightbulb className="text-[#ff6b00] text-xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">Vision</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Vi såg ett landskap av oanvända möjligheter. Varje tom reklamram blev en chans att skapa något extraordinärt – en plattform där lokala berättelser möter globala varumärken.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#ff6b00]/10 flex items-center justify-center">
                <FaHandshake className="text-[#ff6b00] text-xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">Samarbete</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Vi bygger broar mellan markägare och annonsörer. Varje samarbete är en möjlighet att stärka lokalsamhällen och skapa meningsfulla kopplingar.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#ff6b00]/10 flex items-center justify-center">
                <FaSeedling className="text-[#ff6b00] text-xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">Hållbarhet</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Varje skylt bidrar till en hållbar framtid. Vi investerar i lokalsamhällen, stödjer grön omställning och skapar möjligheter som varar.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#ff6b00]/10 flex items-center justify-center">
                <FaHeart className="text-[#ff6b00] text-xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">Engagemang</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Vi tror på kraften i autentiska berättelser. Varje projekt är en chans att inspirera, engagera och skapa verklig förändring.
            </p>
          </div>
        </div>

        {/* Impact Section */}
        <div className="bg-gray-50 rounded-3xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Vår påverkan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#ff6b00] mb-2">100%</div>
              <p className="text-gray-600">Transparens i alla transaktioner</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#ff6b00] mb-2">24/7</div>
              <p className="text-gray-600">Realtidsdata och support</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#ff6b00] mb-2">1000+</div>
              <p className="text-gray-600">Aktiva samarbeten</p>
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Framtiden är här
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            BillboardBee är mer än en plattform – det är en rörelse. En rörelse som förbinder tradition med innovation, lokalt med globalt, och vision med verklighet. Tillsammans skapar vi en framtid där varje skylt berättar en historia, varje samarbete bygger ett samhälle, och varje möte skapar möjligheter.
          </p>
        </div>
      </div>
    </div>
  );
} 