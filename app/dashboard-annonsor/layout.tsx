'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CreditCardIcon, MagnifyingGlassIcon, ShoppingCartIcon, CalendarIcon, ArrowUpTrayIcon, CurrencyDollarIcon, ChartBarIcon, WalletIcon, UserGroupIcon, BellIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

const navigation = [
  { name: 'Konto & betalningar', href: '/dashboard-annonsor/konto', icon: CreditCardIcon },
  { name: 'Utforska & bevaka skyltar', href: '/dashboard-annonsor/utforska', icon: MagnifyingGlassIcon },
  { name: 'Varukorg & utkast', href: '/dashboard-annonsor/varukorg', icon: ShoppingCartIcon },
  { name: 'Bokningskalender', href: '/dashboard-annonsor/kalender', icon: CalendarIcon },
  { name: 'Kreativ-upload & validering', href: '/dashboard-annonsor/kreativ-upload', icon: ArrowUpTrayIcon },
  { name: 'Betalning & kvittens', href: '/dashboard-annonsor/betalning', icon: CurrencyDollarIcon },
  { name: 'Kampanj-resultat', href: '/dashboard-annonsor/resultat', icon: ChartBarIcon },
  { name: 'Budget & spendering', href: '/dashboard-annonsor/budget', icon: WalletIcon },
  { name: 'Team & roller', href: '/dashboard-annonsor/team', icon: UserGroupIcon },
  { name: 'Notiser & påminnelser', href: '/dashboard-annonsor/notiser', icon: BellIcon },
  { name: 'Support & ärenden', href: '/dashboard-annonsor/support', icon: ChatBubbleLeftRightIcon },
];

export default function AnnonsorDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-[#f6f5f3]">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-20">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16">
            <Link href="/" className="flex items-center justify-center">
              <img src="/LOGOblackorange.png" alt="BillboardBee Logo" className="object-contain h-16 w-auto" />
            </Link>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'bg-[#ff6b00] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      {/* Main content */}
      <div className="pl-64">
        <main className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 