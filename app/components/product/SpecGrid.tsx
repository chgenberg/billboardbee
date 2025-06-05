export default function SpecGrid({ specs }: { specs: { icon: string, label: string, value: string }[] }) {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-4">
      <h2 className="text-lg font-semibold text-[#bf7100] mb-2">Teknisk specifikation</h2>
      <div className="grid grid-cols-2 gap-2">
        {specs.map((spec, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-2xl">{spec.icon}</span>
            <span className="font-semibold text-[#222]">{spec.label}:</span>
            <span className="text-[#222]">{spec.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
} 