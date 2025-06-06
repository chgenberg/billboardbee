'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isWithinInterval, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';

interface Booking {
  id: string;
  startDate: string;
  endDate: string;
  status: 'REQUESTED' | 'CONFIRMED' | 'CANCELLED';
  user?: {
    name: string;
  };
}

interface BookingCalendarProps {
  billboardId: string;
  onDateSelect?: (date: Date) => void;
  selectedDates?: { start: Date | null; end: Date | null };
}

export default function BookingCalendar({ billboardId, onDateSelect, selectedDates }: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  useEffect(() => {
    fetchBookings();
    // Set up real-time updates
    const interval = setInterval(fetchBookings, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [billboardId]);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`/api/billboards/${billboardId}/bookings`);
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Add padding days to start from Monday
  const startPadding = (monthStart.getDay() + 6) % 7;
  const paddingDays = Array.from({ length: startPadding }, (_, i) => 
    new Date(monthStart.getTime() - (startPadding - i) * 24 * 60 * 60 * 1000)
  );

  const allDays = [...paddingDays, ...days];

  const isDateBooked = (date: Date) => {
    return bookings.some(booking => {
      if (booking.status === 'CANCELLED') return false;
      const start = parseISO(booking.startDate);
      const end = parseISO(booking.endDate);
      return isWithinInterval(date, { start, end });
    });
  };

  const isDateRequested = (date: Date) => {
    return bookings.some(booking => {
      if (booking.status !== 'REQUESTED') return false;
      const start = parseISO(booking.startDate);
      const end = parseISO(booking.endDate);
      return isWithinInterval(date, { start, end });
    });
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDates?.start) return false;
    if (!selectedDates.end) return isSameDay(date, selectedDates.start);
    return isWithinInterval(date, { start: selectedDates.start, end: selectedDates.end });
  };

  const isDateInRange = (date: Date) => {
    if (!selectedDates?.start || !hoveredDate) return false;
    if (hoveredDate < selectedDates.start) return false;
    return isWithinInterval(date, { start: selectedDates.start, end: hoveredDate });
  };

  const handleDateClick = (date: Date) => {
    if (isDateBooked(date)) return;
    onDateSelect?.(date);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Tillgänglighet</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          <div className="px-3 py-1 min-w-[140px] text-center">
            <p className="text-sm font-medium text-gray-900 capitalize">
              {format(currentMonth, 'MMMM yyyy', { locale: sv })}
            </p>
          </div>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-200 rounded" />
          <span className="text-gray-600">Bokad</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-yellow-200 rounded" />
          <span className="text-gray-600">Förfrågan</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-orange-500 rounded" />
          <span className="text-gray-600">Vald</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Weekday headers */}
        {['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}

        {/* Days */}
        {allDays.map((date, index) => {
          const isBooked = isDateBooked(date);
          const isRequested = isDateRequested(date);
          const isSelected = isDateSelected(date);
          const isInRange = isDateInRange(date);
          const isCurrentMonth = isSameMonth(date, currentMonth);
          const isToday = isSameDay(date, new Date());

          return (
            <motion.button
              key={index}
              whileHover={!isBooked ? { scale: 1.1 } : {}}
              whileTap={!isBooked ? { scale: 0.95 } : {}}
              onClick={() => handleDateClick(date)}
              onMouseEnter={() => setHoveredDate(date)}
              onMouseLeave={() => setHoveredDate(null)}
              disabled={isBooked || !isCurrentMonth}
              className={`
                relative aspect-square flex items-center justify-center rounded-lg text-sm font-medium
                transition-all duration-200
                ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-900'}
                ${isBooked ? 'bg-gray-200 cursor-not-allowed' : ''}
                ${isRequested && !isBooked ? 'bg-yellow-200' : ''}
                ${isSelected ? 'bg-orange-500 text-white' : ''}
                ${isInRange && !isSelected ? 'bg-orange-100' : ''}
                ${!isBooked && !isSelected && !isInRange && isCurrentMonth ? 'hover:bg-gray-50' : ''}
                ${isToday && !isSelected ? 'ring-2 ring-orange-500 ring-offset-2' : ''}
              `}
            >
              {format(date, 'd')}
              {isBooked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1 h-8 bg-gray-400 rotate-45 rounded-full" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Loading overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center"
          >
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 