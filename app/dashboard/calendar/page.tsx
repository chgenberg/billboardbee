'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Booking, BookingStatus } from '@prisma/client';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';

// Dynamically import FullCalendar with no SSR
const FullCalendar = dynamic(() => import('@fullcalendar/react'), {
  ssr: false,
  loading: () => <div className="h-[600px] flex items-center justify-center">Laddar kalender...</div>
});

// Import plugins directly since they're not React components
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const DEMO_BILLBOARDS = [
  { id: 'demo-billboard', name: 'Skylt 1 - E6:an' },
  { id: 'demo-billboard-2', name: 'Skylt 2 - Centrum' },
];

export default function CalendarPage() {
  const router = useRouter();
  const [view, setView] = useState('dayGridMonth');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [billboardId, setBillboardId] = useState('');

  // Hämta bokningar från API
  const fetchBookings = async () => {
    setLoading(true);
    let url = '/api/bookings';
    if (billboardId) url += `?billboardId=${billboardId}`;
    const res = await fetch(url);
    const data = await res.json();
    setEvents(
      data.map((b: Booking) => ({
        id: b.id,
        title: b.status === BookingStatus.CONFIRMED ? 'Bokad' : 'Förfrågan',
        start: b.startDate,
        end: b.endDate,
        backgroundColor: b.status === BookingStatus.CONFIRMED ? '#ff6b00' : '#fffbe6',
        borderColor: '#ff6b00',
        textColor: b.status === BookingStatus.CONFIRMED ? '#fff' : '#ff6b00',
        extendedProps: { ...b },
      }))
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, [billboardId, fetchBookings]);

  // Skapa bokning vid datumval
  async function handleSelect(info: DateSelectArg) {
    const start = info.startStr;
    const end = info.endStr;
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          billboardId: billboardId || 'demo-billboard',
          userId: 'demo-user',
          startDate: start,
          endDate: end,
          status: BookingStatus.REQUESTED,
        })
      });
      if (res.ok) {
        alert('Bokningsförfrågan skapad!');
        fetchBookings();
      } else {
        const data = await res.json();
        alert(data.error || 'Kunde inte skapa bokning.');
      }
    } catch (e) {
      alert('Något gick fel vid bokning.');
    }
  }

  // Visa modal vid klick på bokning
  function handleEventClick(info: EventClickArg) {
    const booking = info.event.extendedProps as Booking;
    setSelectedBooking(booking);
  }

  // Godkänn/avslå bokning
  async function updateBookingStatus(id: string, status: BookingStatus) {
    await fetch(`/api/bookings?id=${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setSelectedBooking(null);
    fetchBookings();
  }

  return (
    <div className="min-h-screen bg-[#f6f5f3]">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold tracking-tight text-[#ff6b00]">Bokningskalender</h1>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 text-sm rounded-lg bg-[#f6f5f3] text-[#ff6b00] border border-[#ff6b00]/30 hover:bg-[#fff] transition"
            >
              Tillbaka till dashboard
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-8">
        <div className="bg-white rounded-2xl shadow p-6">
          {/* Filter för skylt */}
          <div className="mb-6 flex gap-4 items-center">
            <label className="text-sm font-medium text-[#222]">Filtrera skylt:</label>
            <select
              className="rounded-lg border border-[#ff6b00]/30 bg-[#f6f5f3] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/40 text-[#222]"
              value={billboardId}
              onChange={e => setBillboardId(e.target.value)}
            >
              <option value="">Alla skyltar</option>
              {DEMO_BILLBOARDS.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* Calendar controls */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setView('dayGridMonth')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  view === 'dayGridMonth'
                    ? 'bg-[#ff6b00] text-white'
                    : 'bg-[#f6f5f3] text-[#ff6b00] border border-[#ff6b00]/30'
                }`}
              >
                Månad
              </button>
              <button
                onClick={() => setView('timeGridWeek')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  view === 'timeGridWeek'
                    ? 'bg-[#ff6b00] text-white'
                    : 'bg-[#f6f5f3] text-[#ff6b00] border border-[#ff6b00]/30'
                }`}
              >
                Vecka
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff6b00]"></div>
                <span className="text-sm text-gray-600">Bokad</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#f6f5f3] border border-[#ff6b00]"></div>
                <span className="text-sm text-gray-600">Förfrågan</span>
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="calendar-container">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={view}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: '',
              }}
              events={events}
              editable={false}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              locale="sv"
              height="auto"
              select={handleSelect}
              eventClick={handleEventClick}
              loading={(isLoading) => setLoading(isLoading)}
            />
            <style jsx global>{`
              .fc .fc-toolbar-title,
              .fc .fc-col-header-cell-cushion,
              .fc .fc-daygrid-day-number,
              .fc .fc-daygrid-day-top {
                color: #222 !important;
              }
              .fc .fc-button {
                color: #ff6b00;
                background: #fff;
                border: 1px solid #ff6b00;
              }
              .fc .fc-button-primary:not(:disabled).fc-button-active, .fc .fc-button-primary:not(:disabled):active {
                background: #ff6b00;
                color: #fff;
                border-color: #ff6b00;
              }
            `}</style>
          </div>
        </div>
      </main>

      {/* Modal för bokningsdetaljer */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Bokningsdetaljer</h2>
            <p><b>Status:</b> {selectedBooking.status === BookingStatus.CONFIRMED ? 'Bokad' : selectedBooking.status === BookingStatus.CANCELLED ? 'Avslagen' : 'Förfrågan'}</p>
            <p><b>Start:</b> {new Date(selectedBooking.startDate).toLocaleString()}</p>
            <p><b>Slut:</b> {new Date(selectedBooking.endDate).toLocaleString()}</p>
            <p><b>Skylt ID:</b> {selectedBooking.billboardId}</p>
            <p><b>Användare ID:</b> {selectedBooking.userId}</p>
            {selectedBooking.status === BookingStatus.REQUESTED && (
              <div className="flex gap-4 mt-6">
                <button
                  className="px-4 py-2 bg-[#ff6b00] text-white rounded-lg"
                  onClick={() => updateBookingStatus(selectedBooking.id, BookingStatus.CONFIRMED)}
                >
                  Godkänn
                </button>
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                  onClick={() => updateBookingStatus(selectedBooking.id, BookingStatus.CANCELLED)}
                >
                  Avslå
                </button>
              </div>
            )}
            <button
              className="mt-4 px-4 py-2 bg-gray-100 rounded-lg"
              onClick={() => setSelectedBooking(null)}
            >
              Stäng
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 