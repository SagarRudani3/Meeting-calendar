import { Calendar, momentLocalizer } from 'react-big-calendar';
import type { View, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import { useState, useCallback, useMemo } from 'react';
import type { Meeting } from '../types/meeting';
import { format } from 'date-fns';

// Ensure react-big-calendar CSS is imported
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface CalendarViewProps {
  meetings: Meeting[];
  onSelectEvent: (meeting: Meeting) => void;
}

export default function CalendarView({ meetings, onSelectEvent }: CalendarViewProps) {
  const [view, setView] = useState<View>('month');
  const [date, setDate] = useState(new Date());

  const handleSelectEvent = useCallback(
    (event: Meeting) => {
      onSelectEvent(event);
    },
    [onSelectEvent]
  );

  const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
    console.log('Selected slot:', slotInfo);
    // You can add functionality to create new meetings here
  }, []);

  // Custom event styling based on meeting status
  const eventStyleGetter = useCallback((event: Meeting) => {
    const isPast = event.isPast;

    const style = {
      backgroundColor: isPast ? '#9ca3af' : '#3b82f6',
      backgroundImage: isPast
        ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
        : 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
      borderRadius: '6px',
      opacity: isPast ? 0.65 : 1,
      color: 'white',
      border: '0px',
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      padding: '2px 6px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    };

    return {
      style,
      className: isPast ? 'past-event' : 'upcoming-event',
    };
  }, []);

  // Custom day styling to highlight today
  const dayPropGetter = useCallback((date: Date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    if (isToday) {
      return {
        className: 'rbc-today',
        style: {
          backgroundColor: '#eff6ff',
        },
      };
    }
    return {};
  }, []);

  // Custom tooltip/title accessor
  const eventTitle = useCallback((event: Meeting) => {
    return event.title;
  }, []);

  // Memoize messages for better internationalization
  const messages = useMemo(() => ({
    today: 'Today',
    previous: '← Back',
    next: 'Next →',
    month: 'Month',
    week: 'Week',
    day: 'Day',
    agenda: 'Agenda',
    date: 'Date',
    time: 'Time',
    event: 'Meeting',
    showMore: (total: number) => `+${total} more`,
  }), []);

  // Custom formats for better date/time display
  const formats = useMemo(() => ({
    dateFormat: 'D',
    dayFormat: 'ddd M/D',
    weekdayFormat: 'dddd',
    monthHeaderFormat: 'MMMM YYYY',
    dayHeaderFormat: 'dddd, MMMM D, YYYY',
    dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
      `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`,
    agendaHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
      `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`,
    agendaDateFormat: 'ddd MMM D',
    agendaTimeFormat: 'h:mm A',
    agendaTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
      `${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`,
  }), []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Calendar View</h2>
            <p className="text-gray-600 text-sm">
              Click on any event to see meeting details • Switch between Month, Week, Day, and Agenda views
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              <span className="text-gray-600 font-medium">Upcoming</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 opacity-65"></div>
              <span className="text-gray-600 font-medium">Past</span>
            </div>
          </div>
        </div>
      </div>

      <div className="calendar-wrapper" style={{ height: '650px' }}>
        <Calendar
          localizer={localizer}
          events={meetings}
          startAccessor="start"
          endAccessor="end"
          titleAccessor={eventTitle}
          style={{ height: '100%' }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          eventPropGetter={eventStyleGetter}
          dayPropGetter={dayPropGetter}
          view={view}
          onView={setView}
          date={date}
          onNavigate={setDate}
          views={['month', 'week', 'day', 'agenda']}
          messages={messages}
          formats={formats}
          popup
          tooltipAccessor={(event: Meeting) => {
            return `${event.title}\n${format(event.start, 'h:mm a')} - ${format(event.end, 'h:mm a')}\n${event.attendees.length} attendees\n${event.location || 'No location'}`;
          }}
          showMultiDayTimes
          step={30}
          timeslots={2}
        />
      </div>
    </div>
  );
}
