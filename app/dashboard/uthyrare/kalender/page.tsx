'use client';

import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface Booking {
  id: string;
  date: string;
  advertiser: string;
  billboard: string;
  duration: string;
  price: number;
  status: 'confirmed' | 'pending' | 'completed';
}

export default function KalenderPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const bookings: Booking[] = [
    {
      id: '1',
      date: '2024-03-20',
      advertiser: 'ICA Maxi',
      billboard: 'Storgatan 12',
      duration: '2 veckor',
      price: 15000,
      status: 'confirmed',
    },
    {
      id: '2',
      date: '2024-03-25',
      advertiser: 'Volvo Cars',
      billboard: 'E4 Norrgående',
      duration: '1 månad',
      price: 35000,
      status: 'pending',
    },
    {
      id: '3',
      date: '2024-04-01',
      advertiser: 'H&M',
      billboard: 'Centralstationen',
      duration: '3 veckor',
      price: 28000,
      status: 'confirmed',
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

  const hasBooking = (date: Date | null) => {
    if (!date) return false;
    const dateStr = date.toISOString().split('T')[0];
    return bookings.some(booking => booking.date === dateStr);
  };

  const getBookingsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return bookings.filter(booking => booking.date === dateStr);
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Bekräftad</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">Väntar</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">Avslutad</span>;
    }
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-light text-gray-900 tracking-tight">Bokningskalender</h1>
        <p className="text-gray-600 mt-2">Översikt över dina bokningar och tillgänglighet</p>
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
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="text-xl font-semibold text-gray-900 capitalize">
                {formatMonth(currentMonth)}
              </h2>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Week days */}
              {weekDays.map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
              
              {/* Calendar days */}
              {days.map((day, index) => (
                <motion.div
                  key={index}
                  whileHover={day ? { scale: 1.05 } : {}}
                  className={`
                    aspect-square p-2 rounded-lg cursor-pointer transition-all
                    ${!day ? 'invisible' : ''}
                    ${selectedDate?.toDateString() === day?.toDateString() 
                      ? 'bg-orange-500 text-white' 
                      : 'hover:bg-gray-100'
                    }
                    ${hasBooking(day) && selectedDate?.toDateString() !== day?.toDateString() 
                      ? 'bg-orange-50 border-2 border-orange-200' 
                      : ''
                    }
                  `}
                  onClick={() => day && setSelectedDate(day)}
                >
                  {day && (
                    <div className="h-full flex flex-col">
                      <span className={`text-sm ${
                        selectedDate?.toDateString() === day.toDateString() 
                          ? 'font-semibold' 
                          : ''
                      }`}>
                        {day.getDate()}
                      </span>
                      {hasBooking(day) && (
                        <div className="flex-1 flex items-end">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            selectedDate?.toDateString() === day.toDateString()
                              ? 'bg-white'
                              : 'bg-orange-500'
                          }`} />
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Selected Date Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          {selectedDate ? (
            <>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  {selectedDate.toLocaleDateString('sv-SE', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>
                
                {getBookingsForDate(selectedDate).length > 0 ? (
                  <div className="space-y-4">
                    {getBookingsForDate(selectedDate).map(booking => (
                      <div key={booking.id} className="border-l-4 border-orange-500 pl-4 py-2">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{booking.advertiser}</h4>
                          {getStatusBadge(booking.status)}
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <MapPinIcon className="w-4 h-4" />
                            <span>{booking.billboard}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ClockIcon className="w-4 h-4" />
                            <span>{booking.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CurrencyDollarIcon className="w-4 h-4" />
                            <span className="font-medium">{booking.price.toLocaleString()} kr</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Inga bokningar för detta datum
                  </p>
                )}
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium shadow hover:shadow-lg transition-all duration-200">
                Lägg till bokning
              </button>
            </>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">
                Välj ett datum för att se detaljer
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Upcoming Bookings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Kommande bokningar</h2>
        <div className="space-y-4">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <CalendarIcon className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{booking.advertiser}</h4>
                  <p className="text-sm text-gray-600">{booking.billboard} • {booking.duration}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{booking.price.toLocaleString()} kr</p>
                <p className="text-sm text-gray-600">{booking.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 