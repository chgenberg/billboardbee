'use client';

import { useState } from 'react';
import { BellIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Bokning bekräftad',
      message: 'Din bokning för Skylt A har bekräftats för perioden 1-15 maj.',
      date: '2024-03-20',
      read: false,
    },
    {
      id: '2',
      type: 'warning',
      title: 'Underhåll pågår',
      message: 'Planerat underhåll av Skylt B kommer att påverka din bokning den 25 mars.',
      date: '2024-03-19',
      read: true,
    },
    {
      id: '3',
      type: 'info',
      title: 'Ny funktion tillgänglig',
      message: 'Nu kan du se detaljerade statistik för dina skyltar.',
      date: '2024-03-18',
      read: true,
    },
  ]);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      case 'warning':
        return <ExclamationCircleIcon className="h-6 w-6 text-yellow-500" />;
      case 'info':
        return <InformationCircleIcon className="h-6 w-6 text-blue-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Notiser</h1>
        <button
          onClick={markAllAsRead}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#ff6b00] hover:bg-[#e65c00]"
        >
          Markera alla som lästa
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white shadow rounded-lg p-4 ${
              !notification.read ? 'border-l-4 border-[#ff6b00]' : ''
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                {getIcon(notification.type)}
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                  <span className="text-sm text-gray-500">{notification.date}</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="mt-2 text-sm text-[#ff6b00] hover:text-[#e65c00]"
                  >
                    Markera som läst
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 