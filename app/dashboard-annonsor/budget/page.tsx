'use client';

import { motion } from 'framer-motion';
import { WalletIcon, ChartPieIcon, ExclamationTriangleIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface BudgetCategory {
  name: string;
  allocated: number;
  spent: number;
  color: string;
}

export default function BudgetPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [totalBudget, setTotalBudget] = useState(100000);

  const categories: BudgetCategory[] = [
    { name: 'Digital skyltar', allocated: 40000, spent: 32000, color: 'bg-blue-500' },
    { name: 'Statiska skyltar', allocated: 30000, spent: 18000, color: 'bg-green-500' },
    { name: 'LED-tavlor', allocated: 20000, spent: 15000, color: 'bg-purple-500' },
    { name: 'Övrigt', allocated: 10000, spent: 4000, color: 'bg-gray-500' },
  ];

  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalAllocated = categories.reduce((sum, cat) => sum + cat.allocated, 0);
  const remainingBudget = totalBudget - totalSpent;
  const budgetUtilization = (totalSpent / totalBudget) * 100;

  const monthlyTrend = [
    { month: 'Jan', spent: 45000 },
    { month: 'Feb', spent: 52000 },
    { month: 'Mar', spent: 69000 },
    { month: 'Apr', spent: 58000 },
    { month: 'Maj', spent: 0 },
    { month: 'Jun', spent: 0 },
  ];

  const maxSpent = Math.max(...monthlyTrend.filter(m => m.spent > 0).map(m => m.spent));

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-light text-gray-900 tracking-tight">Budget & spendering</h1>
        <p className="text-gray-600 mt-2">Håll koll på din marknadsföringsbudget</p>
      </motion.div>

      {/* Budget Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <WalletIcon className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">Total budget</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{totalBudget.toLocaleString()} kr</p>
          <p className="text-sm text-gray-500 mt-1">För {selectedPeriod === 'month' ? 'denna månad' : 'detta år'}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-50 rounded-lg">
              <ChartPieIcon className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm text-gray-600">Spenderat</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{totalSpent.toLocaleString()} kr</p>
          <div className="mt-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Utnyttjande</span>
              <span>{budgetUtilization.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${budgetUtilization}%` }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`h-2 rounded-full ${
                  budgetUtilization > 90 ? 'bg-red-500' : 
                  budgetUtilization > 70 ? 'bg-yellow-500' : 
                  'bg-green-500'
                }`}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <ArrowTrendingUpIcon className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-600">Återstående</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{remainingBudget.toLocaleString()} kr</p>
          <p className="text-sm text-gray-500 mt-1">{((remainingBudget / totalBudget) * 100).toFixed(0)}% av budget</p>
        </div>
      </motion.div>

      {/* Budget by Category */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Budget per kategori</h2>
        <div className="space-y-6">
          {categories.map((category, index) => {
            const percentage = (category.spent / category.allocated) * 100;
            const isOverBudget = percentage > 100;
            
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${category.color}`} />
                    <span className="font-medium text-gray-900">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {category.spent.toLocaleString()} / {category.allocated.toLocaleString()} kr
                    </p>
                    <p className={`text-xs ${isOverBudget ? 'text-red-600' : 'text-gray-500'}`}>
                      {percentage.toFixed(0)}% använt
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(percentage, 100)}%` }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className={`h-3 rounded-full ${category.color}`}
                    />
                  </div>
                  {isOverBudget && (
                    <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 ml-2">
                      <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Monthly Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Månatlig trend</h2>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 text-[#222] bg-white"
          >
            <option value="month">Denna månad</option>
            <option value="quarter">Detta kvartal</option>
            <option value="year">Detta år</option>
          </select>
        </div>
        
        <div className="h-48 flex items-end justify-between gap-4">
          {monthlyTrend.map((month, index) => (
            <div key={month.month} className="flex-1 flex flex-col items-center gap-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: month.spent > 0 ? `${(month.spent / maxSpent) * 100}%` : '4px' }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className={`w-full ${
                  month.spent > 0 
                    ? 'bg-gradient-to-t from-orange-500 to-orange-400' 
                    : 'bg-gray-300'
                } rounded-t-lg relative group cursor-pointer`}
              >
                {month.spent > 0 && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {month.spent.toLocaleString()} kr
                  </div>
                )}
              </motion.div>
              <span className="text-sm text-gray-600">{month.month}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Budget Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Budgetinställningar</h3>
            <p className="text-sm text-gray-600">
              Justera din budget och få notiser när du närmar dig gränsen
            </p>
          </div>
          <button className="px-4 py-2 bg-white text-orange-600 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200">
            Hantera budget
          </button>
        </div>
      </motion.div>
    </div>
  );
} 