'use client';

import { motion } from 'framer-motion';
import { ChartBarIcon, EyeIcon, CursorArrowRaysIcon, ArrowTrendingUpIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'scheduled';
  startDate: string;
  endDate: string;
  impressions: number;
  clicks: number;
  ctr: number;
  spend: number;
  locations: number;
}

export default function ResultatPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  const campaigns: Campaign[] = [
    {
      id: '1',
      name: 'Vårkampanj 2024',
      status: 'active',
      startDate: '2024-03-15',
      endDate: '2024-04-15',
      impressions: 125000,
      clicks: 4000,
      ctr: 3.2,
      spend: 35000,
      locations: 3,
    },
    {
      id: '2',
      name: 'Februarikampanj',
      status: 'completed',
      startDate: '2024-02-01',
      endDate: '2024-02-29',
      impressions: 98000,
      clicks: 2940,
      ctr: 3.0,
      spend: 24000,
      locations: 2,
    },
    {
      id: '3',
      name: 'Sommarkampanj 2024',
      status: 'scheduled',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      impressions: 0,
      clicks: 0,
      ctr: 0,
      spend: 0,
      locations: 5,
    },
  ];

  const totalStats = {
    impressions: campaigns.reduce((sum, c) => sum + c.impressions, 0),
    clicks: campaigns.reduce((sum, c) => sum + c.clicks, 0),
    spend: campaigns.reduce((sum, c) => sum + c.spend, 0),
    avgCtr: campaigns.filter(c => c.ctr > 0).reduce((sum, c) => sum + c.ctr, 0) / campaigns.filter(c => c.ctr > 0).length,
  };

  const getStatusBadge = (status: Campaign['status']) => {
    switch (status) {
      case 'active':
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Aktiv</span>;
      case 'completed':
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">Avslutad</span>;
      case 'scheduled':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Schemalagd</span>;
    }
  };

  // Dummy chart data
  const chartData = [
    { day: 'Mån', impressions: 18000 },
    { day: 'Tis', impressions: 22000 },
    { day: 'Ons', impressions: 19000 },
    { day: 'Tor', impressions: 24000 },
    { day: 'Fre', impressions: 28000 },
    { day: 'Lör', impressions: 32000 },
    { day: 'Sön', impressions: 30000 },
  ];

  const maxImpressions = Math.max(...chartData.map(d => d.impressions));

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-light text-gray-900 tracking-tight">Kampanj-resultat</h1>
        <p className="text-gray-600 mt-2">Analysera prestandan för dina kampanjer</p>
      </motion.div>

      {/* Period Selector */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center gap-4"
      >
        <CalendarIcon className="w-5 h-5 text-gray-400" />
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
        >
          <option value="7">Senaste 7 dagarna</option>
          <option value="30">Senaste 30 dagarna</option>
          <option value="90">Senaste 90 dagarna</option>
          <option value="365">Senaste året</option>
        </select>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <EyeIcon className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">Totala visningar</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{totalStats.impressions.toLocaleString()}</p>
          <p className="text-sm text-green-600 mt-1">↑ 12% från föregående period</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-50 rounded-lg">
              <CursorArrowRaysIcon className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm text-gray-600">Totala klick</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{totalStats.clicks.toLocaleString()}</p>
          <p className="text-sm text-green-600 mt-1">↑ 8% från föregående period</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <ArrowTrendingUpIcon className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-600">Genomsnittlig CTR</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{totalStats.avgCtr.toFixed(1)}%</p>
          <p className="text-sm text-red-600 mt-1">↓ 2% från föregående period</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 rounded-lg">
              <ChartBarIcon className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-gray-600">Total kostnad</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{totalStats.spend.toLocaleString()} kr</p>
          <p className="text-sm text-gray-600 mt-1">inom budget</p>
        </div>
      </motion.div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Visningar över tid</h2>
        <div className="h-64 flex items-end justify-between gap-4">
          {chartData.map((data, index) => (
            <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(data.impressions / maxImpressions) * 100}%` }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg relative group cursor-pointer"
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {data.impressions.toLocaleString()}
                </div>
              </motion.div>
              <span className="text-sm text-gray-600">{data.day}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Campaigns Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Kampanjöversikt</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kampanj</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visningar</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Klick</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTR</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kostnad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campaigns.map((campaign) => (
                <motion.tr
                  key={campaign.id}
                  whileHover={{ backgroundColor: '#fafafa' }}
                  onClick={() => setSelectedCampaign(campaign.id)}
                  className="cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{campaign.name}</p>
                      <p className="text-xs text-gray-500">{campaign.locations} platser</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(campaign.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {campaign.startDate} - {campaign.endDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.impressions.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.clicks.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.ctr}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {campaign.spend.toLocaleString()} kr
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
} 