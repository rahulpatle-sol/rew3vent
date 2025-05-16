
import { EventCard } from '@/components/events/EventCard';
import PageHeader from '@/components/shared/PageHeader';
import type { Event } from '@/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Neon Future Rave',
    date: '2024-08-15',
    time: '22:00 UTC',
    location: 'Metaverse Arena',
    description: 'Experience the future of music in a stunning neon-lit virtual world.',
    rewards: 'Exclusive NFT wearable',
    imageUrl: 'https://picsum.photos/seed/rave/600/400',
    hostName: 'DJ Sparkle',
    hostAvatarUrl: 'https://avatar.vercel.sh/djsparkle',
    attendees: 1200,
    capacity: 2000,
  },
  {
    id: '2',
    title: 'Crypto Art Workshop',
    date: '2024-08-20',
    time: '18:00 UTC',
    location: 'Decentral Art Gallery',
    description: 'Learn to create and mint your own crypto art with leading digital artists.',
    rewards: 'POAP token & art supplies',
    imageUrl: 'https://picsum.photos/seed/cryptoart/600/400', // Corrected URL
    hostName: 'Artisan Guild',
    hostAvatarUrl: 'https://avatar.vercel.sh/artisan',
    attendees: 85,
    capacity: 100,
  },
  {
    id: '3',
    title: 'DeFi Summit 2024',
    date: '2024-09-05',
    time: '14:00 UTC',
    location: 'Virtual Conference Hall',
    description: 'Explore the latest trends and innovations in decentralized finance.',
    rewards: 'Participation Badge NFT',
    imageUrl: 'https://picsum.photos/seed/defisummit/600/400',
    hostName: 'FinTech Innovators',
    hostAvatarUrl: 'https://avatar.vercel.sh/fintech',
    attendees: 5000,
    capacity: 10000,
  },
  {
    id: '4',
    title: 'Gaming Guild Tournament',
    date: '2024-09-10',
    time: '20:00 UTC',
    location: 'Pixel Palace',
    description: 'Compete for glory and prizes in the ultimate web3 gaming tournament.',
    rewards: 'Rare Game Item NFTs + Token Prize Pool',
    imageUrl: 'https://picsum.photos/seed/gamingtournament/600/400',
    hostName: 'Pixel Warriors',
    hostAvatarUrl: 'https://avatar.vercel.sh/pixelwarriors',
    attendees: 350,
    capacity: 512,
  },
];


export default function EventsPage() {
  // TODO: Implement actual search and filtering logic
  const eventsToDisplay = mockEvents; // Simplified, as data is now correct

  return (
    <div>
      <PageHeader
        title="Browse Events"
        description="Discover exciting events happening across the metaverse and beyond."
      />
      <div className="mb-8 max-w-md">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search events by name, host, or keyword..."
            className="pl-10 text-base"
          />
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventsToDisplay.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      {eventsToDisplay.length === 0 && (
        <p className="text-center text-muted-foreground text-lg col-span-full">
          No events found. Check back later or create your own!
        </p>
      )}
    </div>
  );
}
