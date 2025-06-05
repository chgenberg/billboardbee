'use client';

import { motion } from 'framer-motion';
import { DocumentCheckIcon, ClockIcon, ExclamationCircleIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface Permit {
  id: string;
  billboard: string;
  type: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expiring' | 'expired' | 'pending';
  documentUrl?: string;
}

export default function TillstandPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'expiring' | 'expired'>('all');

  const permits: Permit[] = [
    {
      id: 'PERM-001',
      billboard: 'Storgatan 12',
      type: 'Bygglov',
      issuer: 'Stockholms stad',
      issueDate: '2022-03-15',
      expiryDate: '2025-03-15',
      status: 'active',
      documentUrl: '/permits/PERM-001.pdf',
    },
    {
      id: 'PERM-002',
      billboard: 'E4 Norrgående',
      type: 'Vägverket tillstånd',
      issuer: 'Trafikverket',
      issueDate: '2021-06-01',
      expiryDate: '2024-06-01',
      status: 'expiring',
      documentUrl: '/permits/PERM-002.pdf',
    },
    {
      id: 'PERM-003',
      billboard: 'Centralstationen',
      type: 'Reklamtillstånd',
      issuer: 'Jernhusen',
      issueDate: '2020-01-01',
      expiryDate: '2023-12-31',
      status: 'expired',
      documentUrl: '/permits/PERM-003.pdf',
    },
    {
      id: 'PERM-004',
      billboard: 'Köpcentrum Väst',
      type: 'Hyresavtal',
      issuer: 'Westfield',
      issueDate: '2023-09-01',
      expiryDate: '2026-08-31',
      status: 'active',
      documentUrl: '/permits/PERM-004.pdf',
    },
    {
      id: 'PERM-005',
      billboard: 'Storgatan 12',
      type: 'Miljötillstånd',
      issuer: 'Miljöförvaltningen',
      issueDate: '2024-01-15',
      expiryDate: '2027-01-15',
      status: 'pending',
    },
  ];

  const filteredPermits = filter === 'all' 
    ? permits 
    : permits.filter(permit => {
        if (filter === 'expiring') return permit.status === 'expiring';
        if (filter === 'expired') return permit.status === 'expired';
        return permit.status === 'active';
      });

  const stats = {
    active: permits.filter(p => p.status === 'active').length,
    expiring: permits.filter(p => p.status === 'expiring').length,
    expired: permits.filter(p => p.status === 'expired').length,
    pending: permits.filter(p => p.status === 'pending').length,
  };

  const getStatusBadge = (status: Permit['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <DocumentCheckIcon className="w-3 h-3" />
            Aktivt
          </span>
        );
      case 'expiring':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <ClockIcon className="w-3 h-3" />
            Går ut snart
          </span>
        );
      case 'expired':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <ExclamationCircleIcon className="w-3 h-3" />
            Utgånget
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            <ClockIcon className="w-3 h-3" />
            Under behandling
          </span>
        );
    }
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-light text-gray-900 tracking-tight">Tillstånd & dokument</h1>
        <p className="text-gray-600 mt-2">Hantera tillstånd och viktiga dokument för dina skyltar</p>
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
              <DocumentCheckIcon className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-600">Aktiva</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{stats.active}</p>
          <p className="text-sm text-gray-500 mt-1">Giltiga tillstånd</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <ClockIcon className="w-5 h-5 text-yellow-600" />
            </div>
            <span className="text-sm text-gray-600">Går ut snart</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{stats.expiring}</p>
          <p className="text-sm text-yellow-600 mt-1">Kräver förnyelse</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-50 rounded-lg">
              <ExclamationCircleIcon className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-sm text-gray-600">Utgångna</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{stats.expired}</p>
          <p className="text-sm text-red-600 mt-1">Behöver åtgärdas</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <ClockIcon className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">Under behandling</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
          <p className="text-sm text-gray-500 mt-1">Väntar på beslut</p>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex gap-2"
      >
        {(['all', 'active', 'expiring', 'expired'] as const).map((filterType) => (
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
            {filterType === 'active' && 'Aktiva'}
            {filterType === 'expiring' && 'Går ut snart'}
            {filterType === 'expired' && 'Utgångna'}
          </button>
        ))}
      </motion.div>

      {/* Permits List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        {filteredPermits.map((permit, index) => {
          const daysUntilExpiry = getDaysUntilExpiry(permit.expiryDate);
          
          return (
            <motion.div
              key={permit.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{permit.billboard}</h3>
                    {getStatusBadge(permit.status)}
                  </div>
                  <p className="text-gray-900 font-medium mb-1">{permit.type}</p>
                  <p className="text-sm text-gray-600 mb-3">Utfärdat av: {permit.issuer}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div>
                      <span className="text-gray-400">Utfärdat:</span> {permit.issueDate}
                    </div>
                    <div>
                      <span className="text-gray-400">Utgår:</span> {permit.expiryDate}
                    </div>
                    {permit.status === 'active' && daysUntilExpiry < 90 && (
                      <div className="text-yellow-600 font-medium">
                        {daysUntilExpiry} dagar kvar
                      </div>
                    )}
                  </div>
                </div>
                {permit.documentUrl && (
                  <button className="ml-4 inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium">
                    <ArrowDownTrayIcon className="w-5 h-5" />
                    Ladda ner
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Upload New Document */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Ladda upp nytt dokument</h3>
            <p className="text-sm text-gray-600">
              Lägg till nya tillstånd eller uppdatera befintliga dokument
            </p>
          </div>
          <button className="px-4 py-2 bg-white text-orange-600 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200">
            Ladda upp dokument
          </button>
        </div>
      </motion.div>
    </div>
  );
} 