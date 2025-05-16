import { EventCard } from '@/components/events/EventCard';
import PageHeader from '@/components/shared/PageHeader';
import type { Event } from '@/types';

const mockRegisteredEvents: Event[] = [
  {
    id: '3',
    title: 'Upcoming Web3 Conference',
    date: '2024-10-01',
    time: '10:00 UTC',
    location: 'Global Convention Center (Virtual)',
    description: 'The future of the internet, today.',
    rewards: 'Early Bird NFT Badge',
    imageUrl: 'https://picsum.photos/seed/web3conf/600/400',
    hostName: 'Web3 Foundation',
    hostAvatarUrl: 'https://avatar.vercel.sh/web3foundation',
  },
];

export default function RegisteredEventsPage() {
  return (
    <div>
      <PageHeader
        title="Registered Events"
        description="Events you're signed up for. Don't miss out!"
      />
      {mockRegisteredEvents.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockRegisteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg">
          You haven't registered for any events yet. Find some exciting events to join!
        </p>
      )}
    </div>
  );
}
