'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  HomeIcon, 
  CalendarIcon, 
  CurrencyDollarIcon, 
  UserGroupIcon, 
  WrenchIcon, 
  DocumentIcon, 
  CreditCardIcon, 
  ChartBarIcon, 
  BellIcon, 
  CogIcon 
} from '@heroicons/react/24/solid';

// Dummydata för graf och summeringskort
const dummyStats = {
  ads: 3,
  revenue: 48900,
  bookings: 7,
};
const dummyGraph = [
  { month: 'Jan', value: 0 },
  { month: 'Feb', value: 0 },
  { month: 'Mar', value: 0 },
  { month: 'Apr', value: 12000 },
  { month: 'Maj', value: 18900 },
  { month: 'Jun', value: 18000 },
  { month: 'Jul', value: 0 },
  { month: 'Aug', value: 0 },
  { month: 'Sep', value: 0 },
  { month: 'Okt', value: 0 },
  { month: 'Nov', value: 0 },
  { month: 'Dec', value: 0 },
];

function MiniGraph() {
  // Enkel svg-graf, minimalistisk
  const max = Math.max(...dummyGraph.map(d => d.value));
  const points = dummyGraph.map((d, i) => `${i * 35},${100 - (d.value / (max || 1)) * 80}` ).join(' ');
  return (
    <svg viewBox="0 0 385 110" className="w-full h-24">
      <polyline fill="#f6f5f3" stroke="#ff6b00" strokeWidth="3" points={points} />
      <g>
        {dummyGraph.map((d, i) => (
          <circle key={i} cx={i * 35} cy={100 - (d.value / (max || 1)) * 80} r="4" fill="#ff6b00" />
        ))}
      </g>
    </svg>
  );
}

const navigation = [
  { name: 'Översikt', href: '/dashboard', icon: HomeIcon },
  { name: 'Kalender', href: '/dashboard/calendar', icon: CalendarIcon },
  { name: 'Intäkter', href: '/dashboard/revenue', icon: CurrencyDollarIcon },
  { name: 'Team', href: '/dashboard/team', icon: UserGroupIcon },
  { name: 'Underhåll', href: '/dashboard/maintenance', icon: WrenchIcon },
  { name: 'Tillstånd', href: '/dashboard/permits', icon: DocumentIcon },
  { name: 'Utbetalningar', href: '/dashboard/payout-settings', icon: CreditCardIcon },
  { name: 'Rapporter', href: '/dashboard/reports', icon: ChartBarIcon },
  { name: 'Notiser', href: '/dashboard/notifications', icon: BellIcon },
  { name: 'Inställningar', href: '/dashboard/settings', icon: CogIcon },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSent, setSupportSent] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user');
        if (!response.ok) throw new Error('Kunde inte hämta användardata');
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f5f3]">
        <div className="text-lg text-[#ff6b00] font-semibold">Laddar dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f5f3]">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold tracking-tight text-[#ff6b00]">Billboard Bee</h1>
            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-sm font-medium">{user?.name || 'Användare'}</span>
              <button
                onClick={async () => { await fetch('/api/auth/logout', { method: 'POST' }); router.push('/login'); }}
                className="ml-4 px-4 py-2 text-sm rounded-lg bg-[#f6f5f3] text-[#ff6b00] border border-[#ff6b00]/30 hover:bg-[#fff] transition"
              >Logga ut</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-8">
        {/* Summeringskort */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-[#ff6b00]">{dummyStats.ads}</span>
            <span className="text-gray-500 mt-1">Annonser</span>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-[#ff6b00]">{dummyStats.revenue.toLocaleString('sv-SE')} kr</span>
            <span className="text-gray-500 mt-1">Intäkter (2024)</span>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-[#ff6b00]">{dummyStats.bookings}</span>
            <span className="text-gray-500 mt-1">Bokningar</span>
          </div>
        </div>

        {/* Graf över intäkter */}
        <div className="bg-white rounded-2xl shadow p-6 mb-10">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-[#222]">Hyresintäkter per månad</h2>
            <span className="text-sm text-gray-400">(dummydata)</span>
          </div>
          <MiniGraph />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            {dummyGraph.map((d, i) => <span key={i}>{d.month}</span>)}
          </div>
        </div>

        {/* Sektioner/kort */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
          {/* Annonser */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-semibold text-[#222]">Dina annonser</h3>
              <button
                onClick={() => router.push('/saljare/ny-annons')}
                className="px-3 py-1.5 bg-[#ff6b00] text-white rounded-lg text-sm hover:bg-[#a05c00] transition"
              >Skapa ny annons</button>
            </div>
            <p className="text-gray-500 text-sm mb-2">Hantera och redigera dina annonser.</p>
            <div className="flex-1 flex items-center justify-center text-gray-300 italic">(Inga annonser ännu)</div>
          </div>

          {/* Bokningar */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-semibold text-[#222]">Bokningar</h3>
              <button 
                onClick={() => router.push('/dashboard/calendar')}
                className="px-3 py-1.5 bg-[#f6f5f3] text-[#ff6b00] rounded-lg text-sm border border-[#ff6b00]/30 hover:bg-[#fff] transition"
              >Kalender</button>
            </div>
            <p className="text-gray-500 text-sm mb-2">Se och hantera bokningar.</p>
            <div className="flex-1 flex items-center justify-center text-gray-300 italic">(Inga bokningar ännu)</div>
          </div>

          {/* Notiser */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-semibold text-[#222]">Notiser</h3>
              <button 
                onClick={() => router.push('/dashboard/notifications')}
                className="px-3 py-1.5 bg-[#f6f5f3] text-[#ff6b00] rounded-lg text-sm border border-[#ff6b00]/30 hover:bg-[#fff] transition"
              >Visa alla</button>
            </div>
            <p className="text-gray-500 text-sm mb-2">Senaste händelser och meddelanden.</p>
            <div className="flex-1 flex items-center justify-center text-gray-300 italic">(Inga notiser ännu)</div>
          </div>

          {/* Support */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-semibold text-[#222]">Support</h3>
              <button 
                onClick={() => setShowSupportModal(true)}
                className="px-3 py-1.5 bg-[#f6f5f3] text-[#ff6b00] rounded-lg text-sm border border-[#ff6b00]/30 hover:bg-[#fff] transition"
              >Kontakta</button>
            </div>
            <p className="text-gray-500 text-sm mb-2">Behöver du hjälp? Kontakta oss!</p>
            <div className="flex-1 flex items-center justify-center text-gray-300 italic">(Inga supportärenden)</div>
          </div>

          {/* Rapporter */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-semibold text-[#222]">Rapporter</h3>
              <button 
                onClick={() => router.push('/dashboard/reports')}
                className="px-3 py-1.5 bg-[#f6f5f3] text-[#ff6b00] rounded-lg text-sm border border-[#ff6b00]/30 hover:bg-[#fff] transition"
              >Exportera</button>
            </div>
            <p className="text-gray-500 text-sm mb-2">Ladda ner statistik och bokningsdata.</p>
            <div className="flex-1 flex items-center justify-center text-gray-300 italic">(Inga rapporter ännu)</div>
          </div>
        </div>

        {/* Länk till inställningar */}
        <div className="flex justify-end">
          <button
            onClick={() => router.push('/dashboard/settings')}
            className="px-5 py-2 bg-gray-200 text-[#222] rounded-lg text-sm hover:bg-gray-300 transition shadow"
          >Inställningar</button>
        </div>
      </main>

      {/* Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative animate-fade-in">
            <button
              className="absolute top-3 right-4 text-2xl text-[#ff6b00] font-bold hover:opacity-70"
              onClick={() => { setShowSupportModal(false); setSupportSent(false); setSupportMessage(''); }}
              aria-label="Stäng"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-[#ff6b00] mb-2">Kontakta VIP-support</h2>
            <p className="mb-4 text-[#222]">Välkommen till Billboard Bee VIP-support för uthyrare! Fyll i ditt ärende nedan så återkommer vi så snart vi kan.</p>
            <div className="mb-4 flex items-center gap-2">
              <span className="font-semibold text-[#ff6b00]">VIP-telefon:</span>
              <span className="text-[#222] select-all">08-888 88 88</span>
            </div>
            <div className="mb-4 text-sm text-gray-600">Vi svarar alltid inom 48 timmar på supportärenden.</div>
            {supportSent ? (
              <div className="text-green-600 font-semibold text-center py-4">Tack! Ditt meddelande har skickats. Vi återkommer så snart vi kan.</div>
            ) : (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  setSupportSent(true);
                }}
                className="flex flex-col gap-3"
              >
                <textarea
                  className="w-full min-h-[80px] rounded-lg border border-[#ff6b00]/30 bg-[#f6f5f3] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40 text-[#222]"
                  placeholder="Skriv ditt meddelande här..."
                  value={supportMessage}
                  onChange={e => setSupportMessage(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#ff6b00] text-white rounded-lg font-semibold hover:bg-[#a05c00] transition"
                >Skicka</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 