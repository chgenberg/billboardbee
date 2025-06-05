'use client';

import { motion } from 'framer-motion';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface Booking {
  id: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'upcoming' | 'completed';
  color: string;
}

export default function KalenderPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const bookings: Booking[] = [
    {
      id: '1',
      title: 'Vårkampanj - Stureplan',
      location: 'Stockholm',
      startDate: '2024-03-15',
      endDate: '2024-04-15',
      status: 'active',
      color: 'bg-green-500',
    },
    {
      id: '2',
      title: 'Sommarkampanj - Göteborg',
      location: 'Göteborg',
      startDate: '2024-04-01',
      endDate: '2024-05-01',
      status: 'upcoming',
      color: 'bg-blue-500',
    },
    {
      id: '3',
      title: 'Julkampanj - Malmö',
      location: 'Malmö',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      status: 'completed',
      color: 'bg-gray-400',
    },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('sv-SE', { month: 'long', year: 'numeric' });
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const hasBookingOnDate = (date: Date | null) => {
    if (!date) return false;
    const dateStr = date.toISOString().split('T')[0];
    return bookings.some(booking => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      return date >= start && date <= end;
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-light text-gray-900 tracking-tight">Bokningskalender</h1>
        <p className="text-gray-600 mt-2">Översikt över alla dina kampanjbokningar</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 capitalize">{formatMonth(currentMonth)}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {weekDays.map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((date, index) => {
                const isSelected = selectedDate && date && 
                  date.toDateString() === selectedDate.toDateString();
                const hasBooking = hasBookingOnDate(date);
                const isToday = date && date.toDateString() === new Date().toDateString();

                return (
                  <motion.button
                    key={index}
                    whileHover={date ? { scale: 1.05 } : {}}
                    whileTap={date ? { scale: 0.95 } : {}}
                    onClick={() => date && setSelectedDate(date)}
                    disabled={!date}
                    className={`
                      relative h-20 rounded-xl transition-all duration-200
                      ${!date ? 'cursor-default' : 'cursor-pointer'}
                      ${isSelected 
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg' 
                        : date 
                          ? 'bg-gray-50 hover:bg-gray-100 text-gray-900' 
                          : ''
                      }
                      ${isToday && !isSelected ? 'ring-2 ring-orange-500' : ''}
                    `}
                  >
                    {date && (
                      <>
                        <span className="absolute top-2 left-2 text-sm font-medium">
                          {date.getDate()}
                        </span>
                        {hasBooking && (
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full" />
                          </div>
                        )}
                      </>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Bookings List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1 space-y-6"
        >
          {/* Status Legend */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Status</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-600">Aktiv kampanj</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-sm text-gray-600">Kommande kampanj</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-gray-400 rounded-full" />
                <span className="text-sm text-gray-600">Avslutad kampanj</span>
              </div>
            </div>
          </div>

          {/* Active Bookings */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Aktiva bokningar</h3>
            <div className="space-y-4">
              {bookings.filter(b => b.status !== 'completed').map((booking) => (
                <motion.div
                  key={booking.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-gray-50 rounded-xl cursor-pointer hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full mt-1 ${booking.color}`} />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{booking.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{booking.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{booking.startDate} - {booking.endDate}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200">
            Boka ny skylt
          </button>
        </motion.div>
      </div>
    </div>
  );
} 