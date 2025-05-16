import { EventCard } from '@/components/events/EventCard';
import PageHeader from '@/components/shared/PageHeader';
import type { Event } from '@/types';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockNearbyEvents: Event[] = [
  {
    id: '10',
    title: 'Local Art Fair',
    date: '2024-08-25',
    time: '10:00 AM - 06:00 PM',
    location: 'City Park Pavilion',
    description: 'Discover local artists and craftsmen. Live music and food trucks!',
    rewards: 'Support local art!',
    imageUrl: 'https://picsum.photos/seed/artfair/600/400',
    hostName: 'City Arts Council',
    hostAvatarUrl: 'https://avatar.vercel.sh/cityartscouncil',
  },
  {
    id: '11',
    title: 'Tech Meetup: AI in 2024',
    date: '2024-08-28',
    time: '07:00 PM',
    location: 'CoWo Space Downtown',
    description: 'Networking and talks on the latest AI advancements. Pizza provided.',
    rewards: 'Knowledge & Connections',
    imageUrl: 'https://picsum.photos/seed/techmeetup/600/400',
    hostName: 'Tech Enthusiasts Group',
    hostAvatarUrl: 'https://avatar.vercel.sh/techenthusiasts',
  },
];

export default function ExploreEventsPage() {
  // TODO: Implement actual location-based search
  return (
    <div>
      <PageHeader
        title="Explore Events Near You"
        description="Find interesting events happening in your vicinity or chosen area."
      />
      <div className="mb-8 flex flex-col sm:flex-row gap-4 max-w-xl">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Enter your city or zip code..."
            className="pl-10 text-base"
          />
          <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>
        <Button variant="secondary" size="lg" className="shrink-0">Search Nearby</Button>
      </div>

      {mockNearbyEvents.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockNearbyEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg">
          No events found for the specified location. Try a broader search!
        </p>
      )}
    </div>
  );
}
