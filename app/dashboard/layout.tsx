'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
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
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const pathname = usePathname();
  if (user?.role === 'ANNONSOR' && !pathname.startsWith('/dashboard-annonsor')) {
    if (typeof window !== 'undefined') {
      window.location.href = '/dashboard-annonsor';
    }
    return null;
  }
  const rolePrefix = user?.role === 'ANNONSOR' ? '/dashboard/annonsor' : user?.role === 'UTHYRARE' ? '/dashboard/uthyrare' : '/dashboard';

  const navigation = [
    { name: 'Översikt', href: `${rolePrefix}`, icon: HomeIcon },
    { name: 'Kalender', href: `${rolePrefix}/calendar`, icon: CalendarIcon },
    { name: 'Intäkter', href: `${rolePrefix}/revenue`, icon: CurrencyDollarIcon },
    { name: 'Team', href: `${rolePrefix}/team`, icon: UserGroupIcon },
    { name: 'Underhåll', href: `${rolePrefix}/maintenance`, icon: WrenchIcon },
    { name: 'Tillstånd', href: `${rolePrefix}/permits`, icon: DocumentIcon },
    { name: 'Utbetalningar', href: `${rolePrefix}/payout-settings`, icon: CreditCardIcon },
    { name: 'Rapporter', href: `${rolePrefix}/reports`, icon: ChartBarIcon },
    { name: 'Notiser', href: `${rolePrefix}/notifications`, icon: BellIcon },
    { name: 'Inställningar', href: `${rolePrefix}/settings`, icon: CogIcon },
  ];

  return (
    <div className="min-h-screen bg-[#f6f5f3]">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b">
            <h1 className="text-xl font-bold text-[#ff6b00]">Billboard Bee</h1>
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