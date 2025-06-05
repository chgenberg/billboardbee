'use client';

import { motion } from 'framer-motion';
import { UserGroupIcon, UserPlusIcon, ShieldCheckIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'viewer';
  avatar: string;
  lastActive: string;
  billboards: string[];
}

export default function TeamPage() {
  const [showInviteModal, setShowInviteModal] = useState(false);

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Anna Andersson',
      email: 'anna@billboardbee.se',
      role: 'admin',
      avatar: 'AA',
      lastActive: '2 timmar sedan',
      billboards: ['Alla skyltar'],
    },
    {
      id: '2',
      name: 'Erik Eriksson',
      email: 'erik@billboardbee.se',
      role: 'manager',
      avatar: 'EE',
      lastActive: '1 dag sedan',
      billboards: ['Storgatan 12', 'E4 Norrgående', 'Centralstationen'],
    },
    {
      id: '3',
      name: 'Maria Nilsson',
      email: 'maria@billboardbee.se',
      role: 'viewer',
      avatar: 'MN',
      lastActive: '3 dagar sedan',
      billboards: ['Köpcentrum Väst', 'Storgatan 12'],
    },
  ];

  const getRoleBadge = (role: TeamMember['role']) => {
    switch (role) {
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
            <ShieldCheckIcon className="w-3 h-3" />
            Administratör
          </span>
        );
      case 'manager':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            Hanterare
          </span>
        );
      case 'viewer':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            Visare
          </span>
        );
    }
  };

  const permissions = [
    { name: 'Visa bokningar', admin: true, manager: true, viewer: true },
    { name: 'Skapa bokningar', admin: true, manager: true, viewer: false },
    { name: 'Redigera bokningar', admin: true, manager: true, viewer: false },
    { name: 'Ta bort bokningar', admin: true, manager: false, viewer: false },
    { name: 'Hantera team', admin: true, manager: false, viewer: false },
    { name: 'Visa intäkter', admin: true, manager: true, viewer: false },
    { name: 'Exportera data', admin: true, manager: true, viewer: false },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-light text-gray-900 tracking-tight">Teamhantering</h1>
          <p className="text-gray-600 mt-2">Hantera ditt team och deras behörigheter</p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium shadow hover:shadow-lg transition-all duration-200"
        >
          <UserPlusIcon className="w-5 h-5" />
          Bjud in medlem
        </button>
      </motion.div>

      {/* Team Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <UserGroupIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{teamMembers.length}</p>
              <p className="text-sm text-gray-600">Teammedlemmar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <ShieldCheckIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">
                {teamMembers.filter(m => m.role === 'admin').length}
              </p>
              <p className="text-sm text-gray-600">Administratörer</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <EnvelopeIcon className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">2</p>
              <p className="text-sm text-gray-600">Väntande inbjudningar</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Team Members */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Teammedlemmar</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-medium">
                    {member.avatar}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.email}</p>
                    <p className="text-xs text-gray-500 mt-1">Aktiv {member.lastActive}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {getRoleBadge(member.role)}
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Tillgång till skyltar:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {member.billboards.map((billboard) => (
                    <span key={billboard} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {billboard}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Permissions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Rollbehörigheter</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Behörighet
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Administratör
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hanterare
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visare
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {permissions.map((permission) => (
                <tr key={permission.name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {permission.name}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {permission.admin ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-gray-300">–</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {permission.manager ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-gray-300">–</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {permission.viewer ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-gray-300">–</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
} 