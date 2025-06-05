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
import { motion } from 'framer-motion';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-100 pt-20"
        >
          <nav className="px-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </motion.aside>

        {/* Main content */}
        <main className="flex-1 pl-64 pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 