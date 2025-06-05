export default function Reviews({ reviews }: { reviews: { rating: number, text: string, author: string }[] }) {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-4">
      <h2 className="text-lg font-semibold text-[#bf7100] mb-2">Omdömen</h2>
      <div className="flex flex-col gap-2">
        {reviews.map((r, i) => (
          <div key={i} className="bg-[#fffbe6] rounded-lg p-3">
            <div className="font-bold text-[#bf7100]">{"★".repeat(r.rating)}<span className="text-gray-400">{"★".repeat(5-r.rating)}</span></div>
            <div className="text-[#222] italic mb-1">{r.text}</div>
            <div className="text-xs text-gray-500">{r.author}</div>
          </div>
        ))}
      </div>
    </section>
  );
} 