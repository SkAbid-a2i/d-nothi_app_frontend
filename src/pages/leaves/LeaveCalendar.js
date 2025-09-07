import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { getLeaves } from '../services/api';
import { useAuth } from '../hooks/useAuth';

function LeaveCalendar() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const leaves = await getLeaves();
        const calendarEvents = leaves.map(leave => ({
          title: `Leave: ${leave.reason} (${leave.status})`,
          start: leave.start_date,
          end: leave.end_date,
          allDay: true
        }));
        setEvents(calendarEvents);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching leaves');
      }
    };
    fetchLeaves();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Leave Calendar</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />
    </div>
  );
}

export default LeaveCalendar;