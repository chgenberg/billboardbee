'use client';

import { motion } from 'framer-motion';
import { CurrencyDollarIcon, ArrowTrendingUpIcon, ChartBarIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface RevenueData {
  month: string;
  revenue: number;
  bookings: number;
  growth: number;
}

interface Payment {
  id: string;
  date: string;
  advertiser: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  billboard: string;
}

export default function IntakterPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('year');

  const revenueData: RevenueData[] = [
    { month: 'Jan', revenue: 125000, bookings: 8, growth: 12 },
    { month: 'Feb', revenue: 145000, bookings: 10, growth: 16 },
    { month: 'Mar', revenue: 132000, bookings: 9, growth: -9 },
    { month: 'Apr', revenue: 168000, bookings: 12, growth: 27 },
    { month: 'Maj', revenue: 155000, bookings: 11, growth: -8 },
    { month: 'Jun', revenue: 178000, bookings: 13, growth: 15 },
  ];

  const payments: Payment[] = [
    {
      id: 'PAY-001',
      date: '2024-03-15',
      advertiser: 'ICA Maxi',
      amount: 15000,
      status: 'paid',
      billboard: 'Storgatan 12',
    },
    {
      id: 'PAY-002',
      date: '2024-03-20',
      advertiser: 'Volvo Cars',
      amount: 35000,
      status: 'pending',
      billboard: 'E4 Norrgående',
    },
    {
      id: 'PAY-003',
      date: '2024-03-10',
      advertiser: 'H&M',
      amount: 28000,
      status: 'paid',
      billboard: 'Centralstationen',
    },
    {
      id: 'PAY-004',
      date: '2024-02-28',
      advertiser: 'Elgiganten',
      amount: 22000,
      status: 'overdue',
      billboard: 'Köpcentrum Väst',
    },
  ];

  const totalRevenue = revenueData.reduce((sum, data) => sum + data.revenue, 0);
  const averageRevenue = totalRevenue / revenueData.length;
  const totalBookings = revenueData.reduce((sum, data) => sum + data.bookings, 0);
  const pendingPayments = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

  const getStatusBadge = (status: Payment['status']) => {
    switch (status) {
      case 'paid':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Betald</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">Väntar</span>;
      case 'overdue':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">Försenad</span>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-light text-gray-900 tracking-tight">Intäkter & betalningar</h1>
        <p className="text-gray-600 mt-2">Översikt över dina intäkter och betalningsstatus</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <CurrencyDollarIcon className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-600">Total intäkt</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{totalRevenue.toLocaleString()} kr</p>
          <p className="text-sm text-green-600 mt-1">↑ 15% från förra året</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <ChartBarIcon className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">Genomsnitt/månad</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{Math.round(averageRevenue).toLocaleString()} kr</p>
          <p className="text-sm text-gray-500 mt-1">Senaste 6 månader</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-50 rounded-lg">
              <CalendarIcon className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm text-gray-600">Antal bokningar</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{totalBookings}</p>
          <p className="text-sm text-gray-500 mt-1">Senaste 6 månader</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <ArrowTrendingUpIcon className="w-5 h-5 text-yellow-600" />
            </div>
            <span className="text-sm text-gray-600">Väntande betalningar</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{pendingPayments.toLocaleString()} kr</p>
          <p className="text-sm text-yellow-600 mt-1">3 fakturor</p>
        </div>
      </motion.div>

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Intäktsutveckling</h2>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
          >
            <option value="month">Denna månad</option>
            <option value="quarter">Detta kvartal</option>
            <option value="year">Detta år</option>
          </select>
        </div>

        <div className="h-64 flex items-end justify-between gap-4">
          {revenueData.map((data, index) => (
            <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg relative group cursor-pointer"
              >
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {data.revenue.toLocaleString()} kr
                  <div className={`text-xs ${data.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {data.growth > 0 ? '↑' : '↓'} {Math.abs(data.growth)}%
                  </div>
                </div>
              </motion.div>
              <span className="text-sm text-gray-600">{data.month}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Payments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Senaste betalningar</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Faktura-ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Datum
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Annonsör
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Skylt
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Belopp
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map((payment) => (
                <motion.tr
                  key={payment.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: '#fafafa' }}
                  className="transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {payment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {payment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.advertiser}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {payment.billboard}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {payment.amount.toLocaleString()} kr
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(payment.status)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Export Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex justify-end"
      >
        <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium shadow hover:shadow-lg transition-all duration-200">
          Exportera rapport
        </button>
      </motion.div>
    </div>
  );
} 