import Image from 'next/image';

const billboardImages = [
  '/billboards/bb1.png',
  '/billboards/bb2.png',
  '/billboards/bb3.png',
  '/billboards/bb4.png',
  '/billboards/bb5.png',
  '/billboards/bb6.png',
];

export default function BillboardGallery() {
  return (
    <section className="w-full flex flex-col items-center py-16 px-2">
      {/* Karta-knapp */}
      <button
        className="mb-10 px-8 py-3 bg-white/80 text-[#16475b] font-bold rounded-full shadow-lg border border-[#16475b] hover:bg-[#16475b] hover:text-white transition-colors text-lg tracking-widest uppercase"
      >
        Karta
      </button>
      {/* Vit bubbla bakom galleriet */}
      <div className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl px-6 py-12 flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full">
          {billboardImages.map((src, i) => (
            <button
              key={src}
              className="relative flex items-center justify-center p-2 group focus:outline-none bg-transparent"
              tabIndex={0}
              aria-label={`Visa mer om billboard ${i+1}`}
              type="button"
              onClick={() => { /* Här kan du lägga till popup eller navigering */ }}
            >
              <div
                className="w-full h-64 bg-white flex items-center justify-center rounded-xl border border-gray-200 shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`Billboard exempel ${i+1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={i < 3}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
} 