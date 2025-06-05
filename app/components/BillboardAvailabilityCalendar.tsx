"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const FullCalendar = dynamic(() => import("@fullcalendar/react"), {
  ssr: false,
  loading: () => <div className="h-32 flex items-center justify-center">Laddar kalender...</div>,
});

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  extendedProps: { status: string };
}

export default function BillboardAvailabilityCalendar({ billboardId }: { billboardId: string }) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  // Tooltip
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{x: number, y: number} | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch(`/api/bookings?billboardId=${billboardId}`);
      const data = await res.json();
      setEvents(
        data.map((b: any) => ({
          id: b.id,
          title: b.status === "confirmed" ? "Bokad" : "Förfrågan",
          start: b.startDate,
          end: b.endDate,
          backgroundColor: b.status === "confirmed" ? "#ff6b00" : "#fffbe6",
          borderColor: "#ff6b00",
          textColor: b.status === "confirmed" ? "#fff" : "#ff6b00",
          extendedProps: { status: b.status },
        }))
      );
    };
    if (billboardId) fetchBookings();
  }, [billboardId]);

  // Klick på dag (förberett för modal)
  function handleDateClick(arg: { dateStr: string }) {
    // Kolla om dagen är bokad
    const isBooked = events.some(ev => {
      const start = new Date(ev.start);
      const end = new Date(ev.end);
      const clicked = new Date(arg.dateStr);
      return clicked >= start && clicked <= end && ev.extendedProps.status === 'confirmed';
    });
    if (!isBooked) {
      alert(`Starta bokningsförfrågan för ${arg.dateStr}`);
      // Här kan du öppna en modal istället
    }
  }

  // Tooltip vid hover på event
  function handleEventMouseEnter(info: { event: { title: string }, jsEvent: { clientX: number, clientY: number } }) {
    setTooltipContent(info.event.title);
    setTooltipPos({ x: info.jsEvent.clientX, y: info.jsEvent.clientY });
  }
  function handleEventMouseLeave() {
    setTooltipContent(null);
    setTooltipPos(null);
  }

  return (
    <div className="w-full flex flex-col items-center bbbee-calendar">
      <div style={{ maxWidth: 220, borderRadius: 18, overflow: 'hidden', boxShadow: '0 6px 24px #0002', background: '#fff', padding: '18px 0 12px 0' }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={false}
          events={events}
          editable={false}
          selectable={false}
          dayMaxEvents={true}
          weekends={true}
          locale="sv"
          height={"auto"}
          contentHeight={"auto"}
          dateClick={handleDateClick}
          eventMouseEnter={handleEventMouseEnter}
          eventMouseLeave={handleEventMouseLeave}
        />
        <style jsx global>{`
          .bbbee-calendar .fc {
            font-size: 14px !important;
            background: #fff !important;
            border-radius: 18px !important;
            font-family: 'Avenir Next', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
            box-shadow: 0 6px 24px #0002 !important;
            border: none !important;
          }
          .bbbee-calendar .fc .fc-scrollgrid, .bbbee-calendar .fc .fc-scrollgrid-sync-table, .bbbee-calendar .fc .fc-scrollgrid-section-body, .bbbee-calendar .fc .fc-scrollgrid-section {
            border: none !important;
          }
          .bbbee-calendar .fc .fc-daygrid-day {
            min-height: 32px !important;
            padding: 0 !important;
            border-radius: 12px !important;
            border: none !important;
            transition: background 0.15s;
            background: none !important;
          }
          .bbbee-calendar .fc .fc-daygrid-day:hover {
            background: #fffbe6 !important;
            cursor: pointer;
            box-shadow: 0 2px 8px #ff6b0022;
          }
          .bbbee-calendar .fc .fc-daygrid-day-number {
            font-size: 14px !important;
            padding: 4px 0 0 7px !important;
            font-weight: 600;
            color: #23272f !important;
            background: none !important;
          }
          .bbbee-calendar .fc .fc-daygrid-day-frame {
            padding: 0 !important;
            border-radius: 12px !important;
            border: none !important;
            background: none !important;
          }
          .bbbee-calendar .fc .fc-col-header-cell-cushion {
            font-size: 13px !important;
            padding: 7px 0 !important;
            font-weight: 700;
            color: #bf7100 !important;
            background: none !important;
          }
          .bbbee-calendar .fc .fc-toolbar-title,
          .bbbee-calendar .fc .fc-daygrid-day-top {
            color: #222 !important;
          }
          .bbbee-calendar .fc .fc-daygrid-day.fc-day-today {
            background: #fffbe6 !important;
            border: none !important;
            box-shadow: 0 0 0 2px #ff6b00 !important;
          }
          /* Prickar för bokningar */
          .bbbee-calendar .fc .fc-event {
            border-radius: 50% !important;
            width: 10px !important;
            height: 10px !important;
            min-width: 10px !important;
            min-height: 10px !important;
            max-width: 10px !important;
            max-height: 10px !important;
            font-size: 0 !important;
            padding: 0 !important;
            margin: 0 auto 2px auto !important;
            box-shadow: none !important;
            border: none !important;
            display: block !important;
          }
          .bbbee-calendar .fc .fc-event[style*='background: #ff6b00'] {
            background: #ff6b00 !important;
          }
          .bbbee-calendar .fc .fc-event[style*='background: #fffbe6'] {
            background: #fffbe6 !important;
            border: 1.5px solid #ff6b00 !important;
          }
          .bbbee-calendar .fc .fc-scrollgrid-section-header, .bbbee-calendar .fc .fc-scrollgrid-section-footer {
            display: none !important;
          }
        `}</style>
        {tooltipContent && tooltipPos && (
          <div style={{
            position: 'fixed',
            top: tooltipPos.y + 10,
            left: tooltipPos.x + 10,
            background: '#222',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: 10,
            fontSize: 15,
            zIndex: 9999,
            pointerEvents: 'none',
            boxShadow: '0 2px 8px #0003',
          }}>{tooltipContent}</div>
        )}
      </div>
      {/* Modern legend med prickar */}
      <div className="flex gap-5 mt-4 text-[13px] items-center justify-center w-full font-semibold">
        <span className="inline-flex items-center"><span style={{width:13,height:13,display:'inline-block',background:'#ff6b00',borderRadius:'50%',marginRight:7}}></span>Bokad</span>
        <span className="inline-flex items-center"><span style={{width:13,height:13,display:'inline-block',background:'#fffbe6',borderRadius:'50%',border:'2px solid #ff6b00',marginRight:7}}></span>Förfrågan</span>
      </div>
    </div>
  );
} 