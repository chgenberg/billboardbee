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
  CogIcon,
  PlusCircleIcon 
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Sidebar */}
      <div className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:block`}>
        {/* Sidebar content */}
        <nav className="px-4 space-y-1">
          {/* Översikt med närmare gul markering */}
          <Link
            href={navigation[0].href}
            className={cn(
              'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 mb-4',
              pathname === navigation[0].href
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            <HomeIcon className="w-5 h-5" />
            {navigation[0].name}
          </Link>
          
          {/* Separator */}
          <div className="h-px bg-gray-200 my-4" />
          
          {/* Resten av menyn */}
          {navigation.slice(1).map((item) => {
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
      </div>
      {/* Pil-ikon endast på mobil (<md) */}
      {!sidebarOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-white rounded-full shadow p-2"
          onClick={() => setSidebarOpen(true)}
          aria-label="Öppna meny"
        >
          <ArrowRightIcon className="w-6 h-6 text-gray-700" />
        </button>
      )}
      {sidebarOpen && (
        <button
          className="md:hidden fixed top-4 left-64 z-50 bg-white rounded-full shadow p-2"
          onClick={() => setSidebarOpen(false)}
          aria-label="Stäng meny"
        >
          <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
        </button>
      )}
      <div className="flex">
        {/* Main content */}
        <main className="flex-1 pt-20 md:pl-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 