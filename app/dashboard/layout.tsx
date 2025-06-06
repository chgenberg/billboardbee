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
      {/* Mobile sidebar toggle button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-full bg-white shadow-lg md:hidden"
        onClick={() => setSidebarOpen(true)}
        aria-label="Öppna meny"
        style={{ display: sidebarOpen ? 'none' : 'block' }}
      >
        <ArrowRightIcon className="w-7 h-7 text-gray-700" />
      </button>
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ x: sidebarOpen || typeof window === 'undefined' ? 0 : '-100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-100 pt-20 z-50 md:translate-x-0 md:static md:block"
          style={{ transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)' }}
        >
          {/* Close button for mobile */}
          <button
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white shadow-lg md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Stäng meny"
          >
            <ArrowLeftIcon className="w-7 h-7 text-gray-700" />
          </button>
          {/* Skapa annons knapp för UTHYRARE */}
          {user?.role === 'UTHYRARE' && (
            <div className="px-4 mb-4">
              <Link
                href="/saljare/ny-annons"
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <PlusCircleIcon className="w-5 h-5" />
                SKAPA ANNONS
              </Link>
            </div>
          )}
          
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
        </motion.aside>

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