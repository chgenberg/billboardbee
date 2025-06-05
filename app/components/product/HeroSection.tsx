import Image from 'next/image';

export default function HeroSection({ coverImage, title, trafficTeaser, teaser }: { coverImage: string, title: string, trafficTeaser: string, teaser: string }) {
  return (
    <section className="relative w-full max-w-4xl mx-auto mt-8">
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#222]/10 shadow-lg">
        {coverImage ? (
          <Image src={coverImage} alt={title} fill className="object-cover w-full h-full" priority />
        ) : (
          <div className="w-full h-full bg-[#ececec] flex items-center justify-center text-4xl text-[#bf7100]">Ingen bild</div>
        )}
        {/* Mörk gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        {/* Titel och teaser */}
        <div className="absolute left-0 bottom-0 p-6 md:p-10 z-10 max-w-xl">
          <h1 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow mb-1">{title}</h1>
          <div className="text-base md:text-xl font-bold text-[#bf7100] mb-1">{trafficTeaser}</div>
          <p className="text-white text-base mb-4 drop-shadow">{teaser}</p>
          <button className="px-7 py-2 rounded-full bg-[#bf7100] text-white font-bold text-base shadow border border-[#bf7100] tracking-wide font-avenir hover:bg-white hover:text-[#bf7100] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#bf7100]/40">Boka nu</button>
        </div>
      </div>
    </section>
  );
} 