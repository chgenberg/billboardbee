'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  CreditCardIcon, 
  MagnifyingGlassIcon, 
  ShoppingCartIcon, 
  CalendarIcon, 
  ArrowUpTrayIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon, 
  WalletIcon, 
  UserGroupIcon, 
  BellIcon, 
  ChatBubbleLeftRightIcon,
  HomeIcon,
  PlusCircleIcon
} from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const navigation = [
  { name: 'Översikt', href: '/dashboard-annonsor', icon: HomeIcon },
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen || typeof window === 'undefined' ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-100 pt-32 z-50 md:translate-x-0 md:static md:block"
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
        {/* Skapa ny annons knapp - mer prominent */}
        {/* <div className="px-4 mb-4">
          <Link
            href="/saljare/ny-annons"
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-base shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <PlusCircleIcon className="w-6 h-6" />
            SKAPA ANNONS
          </Link>
        </div> */}
        
        <nav className="px-4 space-y-1">
          {/* Översikt med närmare markering */}
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
      <main className="flex-1 pt-32 md:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
} 