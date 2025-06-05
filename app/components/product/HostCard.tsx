export default function HostCard({ host }: { host: { avatar: string, name: string, responseTime: string, moreListings: boolean } }) {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3">
      <img src={host.avatar} alt={host.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#bf7100]" />
      <div>
        <div className="font-semibold text-[#222]">{host.name}</div>
        <div className="text-xs text-gray-500 mb-1">{host.responseTime}</div>
        {host.moreListings && <a href="#" className="text-[#bf7100] underline text-xs">Visa hans övriga listningar</a>}
      </div>
    </section>
  );
} 