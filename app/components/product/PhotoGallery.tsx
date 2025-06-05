import Image from 'next/image';

export default function PhotoGallery({ images }: { images: string[] }) {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-4">
      <h2 className="text-lg font-semibold text-[#bf7100] mb-2">Galleri</h2>
      <div className="flex gap-2 overflow-x-auto">
        {images.map((img, i) => (
          <Image key={i} src={img} alt={`Galleri ${i+1}`} width={160} height={112} className="w-40 h-28 object-cover rounded-xl" />
        ))}
      </div>
    </section>
  );
} 