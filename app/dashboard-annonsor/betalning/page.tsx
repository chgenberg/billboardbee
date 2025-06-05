'use client';

import { motion } from 'framer-motion';
import { CreditCardIcon, DocumentTextIcon, CheckCircleIcon, ClockIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  receiptUrl?: string;
}

export default function BetalningPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  
  const transactions: Transaction[] = [
    {
      id: 'INV-2024-001',
      date: '2024-03-15',
      description: 'Vårkampanj - 3 skyltar',
      amount: 35000,
      status: 'completed',
      receiptUrl: '/receipts/INV-2024-001.pdf',
    },
    {
      id: 'INV-2024-002',
      date: '2024-03-01',
      description: 'Februarikampanj - 2 skyltar',
      amount: 24000,
      status: 'completed',
      receiptUrl: '/receipts/INV-2024-002.pdf',
    },
    {
      id: 'INV-2024-003',
      date: '2024-04-01',
      description: 'Aprilkampanj - 5 skyltar',
      amount: 58000,
      status: 'pending',
    },
    {
      id: 'INV-2024-004',
      date: '2024-02-15',
      description: 'Valentinekampanj - 1 skylt',
      amount: 12000,
      status: 'failed',
    },
  ];

  const stats = {
    totalSpent: transactions
      .filter(t => t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0),
    pendingPayments: transactions
      .filter(t => t.status === 'pending')
      .reduce((sum, t) => sum + t.amount, 0),
    transactionsCount: transactions.length,
  };

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircleIcon className="w-3 h-3" />
            Betald
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <ClockIcon className="w-3 h-3" />
            Väntar
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <ClockIcon className="w-3 h-3" />
            Misslyckad
          </span>
        );
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
        <h1 className="text-3xl font-light text-gray-900 tracking-tight">Betalning & kvittens</h1>
        <p className="text-gray-600 mt-2">Hantera dina betalningar och ladda ner kvitton</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <CreditCardIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Totalt spenderat</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalSpent.toLocaleString()} kr
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-50 rounded-xl">
              <ClockIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Väntande betalningar</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.pendingPayments.toLocaleString()} kr
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <DocumentTextIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Antal transaktioner</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.transactionsCount}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100"
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Transaktionshistorik</h2>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
            >
              <option value="all">Alla transaktioner</option>
              <option value="month">Senaste månaden</option>
              <option value="quarter">Senaste kvartalet</option>
              <option value="year">Senaste året</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fakturanummer
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Datum
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Beskrivning
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Belopp
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Åtgärd
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((transaction) => (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: '#fafafa' }}
                  className="transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.amount.toLocaleString()} kr
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(transaction.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {transaction.status === 'completed' && transaction.receiptUrl ? (
                      <button className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium">
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        Ladda ner
                      </button>
                    ) : transaction.status === 'pending' ? (
                      <button className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium">
                        Betala nu
                      </button>
                    ) : (
                      <button className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-700 font-medium">
                        Försök igen
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Payment Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Betalningsmetoder</h3>
            <p className="text-sm text-gray-600">
              Hantera dina sparade betalningsmetoder för snabbare betalningar
            </p>
          </div>
          <button className="px-4 py-2 bg-white text-orange-600 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200">
            Hantera metoder
          </button>
        </div>
      </motion.div>
    </div>
  );
} 