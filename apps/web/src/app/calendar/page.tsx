import { EventCalendar } from '@/components/events/EventCalendar';
import PageHeader from '@/components/shared/PageHeader';
import type { Event } from '@/types';

// Mock events data, assuming these are events the user is involved in
const mockUserEvents: Event[] = [
  {
    id: '1',
    title: 'Neon Future Rave (Attended)',
    date: '2024-08-15', // Ensure dates are in YYYY-MM-DD for proper Date object creation
    time: '22:00 UTC',
    location: 'Metaverse Arena',
    description: 'Past event.',
    hostName: 'DJ Sparkle',
  },
  {
    id: '3',
    title: 'Upcoming Web3 Conference (Registered)',
    date: '2024-10-01',
    time: '10:00 UTC',
    location: 'Virtual Hall',
    description: 'Upcoming event.',
    hostName: 'Web3 Foundation',
  },
   {
    id: '5',
    title: 'Design Thinking Workshop',
    date: new Date().toISOString().split('T')[0], // Today's date
    time: '14:00 UTC',
    location: 'Innovation Hub',
    description: 'A workshop on design thinking principles.',
    hostName: 'Creative Minds Inc.',
  },
];

export default function CalendarPage() {
  return (
    <div>
      <PageHeader
        title="Event Calendar"
        description="View your registered and attended events in a calendar format."
      />
      <EventCalendar events={mockUserEvents} />
    </div>
  );
}
