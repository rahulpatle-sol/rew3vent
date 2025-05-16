import { EventCard } from '@/components/events/EventCard';
import PageHeader from '@/components/shared/PageHeader';
import type { Event } from '@/types';

const mockAttendedEvents: Event[] = [
  {
    id: '1',
    title: 'Past Hackathon Blast',
    date: '2024-03-10',
    time: '09:00 UTC',
    location: 'Tech Hub Arena',
    description: 'An amazing hackathon where innovation thrived.',
    rewards: 'Winner Trophy NFT',
    imageUrl: 'https://picsum.photos/seed/hackathon/600/400',
    hostName: 'DevRel Collective',
    hostAvatarUrl: 'https://avatar.vercel.sh/devrelcollective',
  },
  {
    id: '2',
    title: 'Virtual Art Exhibition Opening',
    date: '2024-04-22',
    time: '17:00 UTC',
    location: 'Digital Dreams Gallery',
    description: 'Showcasing groundbreaking digital artists.',
    rewards: 'Exclusive Art Print NFT',
    imageUrl: 'https://picsum.photos/seed/artexhibit/600/400',
    hostName: 'Curators United',
    hostAvatarUrl: 'https://avatar.vercel.sh/curatorsunited',
  },
];

export default function AttendedEventsPage() {
  return (
    <div>
      <PageHeader
        title="Attended Events"
        description="A record of events you've participated in."
      />
      {mockAttendedEvents.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockAttendedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg">
          You haven't attended any events yet. Go explore and join some!
        </p>
      )}
    </div>
  );
}
