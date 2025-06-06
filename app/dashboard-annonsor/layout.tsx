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
  ChatBubbleLeftRightIcon 
} from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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
          {/* Skapa ny annons knapp */}
          <div className="flex flex-col items-center mb-6">
            <button
              onClick={() => window.location.href = '/saljare/ny-annons'}
              className="w-11/12 py-3 mb-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-semibold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 animate-bounce-short"
              style={{ fontFamily: 'Avenir Next, Helvetica Neue, Helvetica, Arial, sans-serif' }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Skapa ny annons
            </button>
          </div>
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