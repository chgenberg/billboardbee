export default function MapSection({ lat, lng }: { lat: number, lng: number }) {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-4">
      <h2 className="text-lg font-semibold text-[#bf7100] mb-2">Karta</h2>
      <p className="text-[#222]">[Karta och avstånd till knytpunkter kommer här]</p>
      <div className="text-xs text-gray-400 mt-2">Lat: {lat}, Lng: {lng}</div>
    </section>
  );
} 