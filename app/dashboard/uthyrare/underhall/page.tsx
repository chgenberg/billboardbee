'use client';

import { motion } from 'framer-motion';
import { WrenchScrewdriverIcon, ExclamationTriangleIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface MaintenanceTask {
  id: string;
  billboard: string;
  type: 'scheduled' | 'urgent' | 'completed';
  description: string;
  date: string;
  technician?: string;
  cost?: number;
  status: 'pending' | 'in-progress' | 'completed';
}

export default function UnderhallPage() {
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'urgent' | 'completed'>('all');

  const maintenanceTasks: MaintenanceTask[] = [
    {
      id: '1',
      billboard: 'Storgatan 12',
      type: 'urgent',
      description: 'LED-panel fungerar inte',
      date: '2024-03-22',
      status: 'in-progress',
      technician: 'TechTeam AB',
    },
    {
      id: '2',
      billboard: 'E4 Norrgående',
      type: 'scheduled',
      description: 'Årlig inspektion',
      date: '2024-04-15',
      status: 'pending',
      cost: 5000,
    },
    {
      id: '3',
      billboard: 'Centralstationen',
      type: 'completed',
      description: 'Byte av belysning',
      date: '2024-03-10',
      status: 'completed',
      technician: 'ElektroFix',
      cost: 12000,
    },
    {
      id: '4',
      billboard: 'Köpcentrum Väst',
      type: 'scheduled',
      description: 'Rengöring av skylt',
      date: '2024-03-30',
      status: 'pending',
      cost: 2000,
    },
  ];

  const filteredTasks = filter === 'all' 
    ? maintenanceTasks 
    : maintenanceTasks.filter(task => task.type === filter);

  const stats = {
    urgent: maintenanceTasks.filter(t => t.type === 'urgent').length,
    scheduled: maintenanceTasks.filter(t => t.type === 'scheduled').length,
    completed: maintenanceTasks.filter(t => t.type === 'completed' && t.date.startsWith('2024-03')).length,
    totalCost: maintenanceTasks.filter(t => t.cost).reduce((sum, t) => sum + (t.cost || 0), 0),
  };

  const getStatusBadge = (task: MaintenanceTask) => {
    if (task.type === 'urgent') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
          <ExclamationTriangleIcon className="w-3 h-3" />
          Brådskande
        </span>
      );
    }
    if (task.type === 'completed') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          <CheckCircleIcon className="w-3 h-3" />
          Slutförd
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
        <ClockIcon className="w-3 h-3" />
        Schemalagd
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-light text-gray-900 tracking-tight">Underhåll & service</h1>
        <p className="text-gray-600 mt-2">Hantera underhåll och service för dina skyltar</p>
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
            <div className="p-2 bg-red-50 rounded-lg">
              <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-sm text-gray-600">Brådskande</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{stats.urgent}</p>
          <p className="text-sm text-red-600 mt-1">Kräver omedelbar åtgärd</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <ClockIcon className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">Schemalagda</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{stats.scheduled}</p>
          <p className="text-sm text-gray-500 mt-1">Kommande underhåll</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircleIcon className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-600">Slutförda</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{stats.completed}</p>
          <p className="text-sm text-gray-500 mt-1">Denna månad</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-50 rounded-lg">
              <WrenchScrewdriverIcon className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm text-gray-600">Total kostnad</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{stats.totalCost.toLocaleString()} kr</p>
          <p className="text-sm text-gray-500 mt-1">Denna månad</p>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex gap-2"
      >
        {(['all', 'urgent', 'scheduled', 'completed'] as const).map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
              filter === filterType
                ? 'bg-orange-500 text-white shadow'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {filterType === 'all' && 'Alla'}
            {filterType === 'urgent' && 'Brådskande'}
            {filterType === 'scheduled' && 'Schemalagda'}
            {filterType === 'completed' && 'Slutförda'}
          </button>
        ))}
      </motion.div>

      {/* Maintenance Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        {filteredTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{task.billboard}</h3>
                  {getStatusBadge(task)}
                </div>
                <p className="text-gray-600 mb-3">{task.description}</p>
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4" />
                    <span>{task.date}</span>
                  </div>
                  {task.technician && (
                    <div className="flex items-center gap-2">
                      <WrenchScrewdriverIcon className="w-4 h-4" />
                      <span>{task.technician}</span>
                    </div>
                  )}
                  {task.cost && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{task.cost.toLocaleString()} kr</span>
                    </div>
                  )}
                </div>
              </div>
              <button className="ml-4 text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6"
      >
        <h3 className="font-semibold text-gray-900 mb-4">Snabbåtgärder</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-white rounded-xl text-left hover:shadow-md transition-all duration-200">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-600 mb-2" />
            <h4 className="font-medium text-gray-900">Rapportera problem</h4>
            <p className="text-sm text-gray-600 mt-1">Anmäl ett akut underhållsbehov</p>
          </button>
          <button className="p-4 bg-white rounded-xl text-left hover:shadow-md transition-all duration-200">
            <ClockIcon className="w-6 h-6 text-blue-600 mb-2" />
            <h4 className="font-medium text-gray-900">Schemalägg service</h4>
            <p className="text-sm text-gray-600 mt-1">Boka in rutinunderhåll</p>
          </button>
          <button className="p-4 bg-white rounded-xl text-left hover:shadow-md transition-all duration-200">
            <WrenchScrewdriverIcon className="w-6 h-6 text-orange-600 mb-2" />
            <h4 className="font-medium text-gray-900">Visa servicehistorik</h4>
            <p className="text-sm text-gray-600 mt-1">Se tidigare underhållsarbeten</p>
          </button>
        </div>
      </motion.div>
    </div>
  );
} 