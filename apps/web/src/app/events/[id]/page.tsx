
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import type { Event } from '@/types';
import { CalendarDays, MapPin, Users, Award, Share2, UserPlus, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Mock function to get event details by ID
async function getEventDetails(id: string): Promise<Event | null> {
  // In a real app, fetch this from an API or database
  const mockEvents: Event[] = [
    {
      id: '1',
      title: 'Neon Future Rave',
      date: '2024-08-15',
      time: '22:00 UTC',
      location: 'Metaverse Arena',
      description: 'Experience the future of music in a stunning neon-lit virtual world. This event features top DJs, immersive visuals, and interactive experiences. Come join us for a night you won\'t forget! We will explore new genres and push the boundaries of what a virtual concert can be. Expect surprises and special guest appearances. This is more than just a rave; it\'s a journey into sound and light.',
      rewards: 'Exclusive NFT wearable & POAP',
      imageUrl: 'https://picsum.photos/seed/rave/1200/600',
      hostName: 'DJ Sparkle',
      hostAvatarUrl: 'https://avatar.vercel.sh/djsparkle?size=128',
      attendees: 1200,
      capacity: 2000,
    },
     {
      id: '2',
      title: 'Crypto Art Workshop',
      date: '2024-08-20',
      time: '18:00 UTC',
      location: 'Decentral Art Gallery',
      description: 'Learn to create and mint your own crypto art with leading digital artists. This hands-on workshop will guide you through the process from concept to creation, covering tools, techniques, and market insights. No prior experience needed, just bring your creativity!',
      rewards: 'POAP token & art supplies NFT',
      imageUrl: 'https://picsum.photos/seed/cryptoart/1200/600', // Corrected URL
      hostName: 'Artisan Guild',
      hostAvatarUrl: 'https://avatar.vercel.sh/artisanguild?size=128',
      attendees: 85,
      capacity: 100,
    },
  ];
  const event = mockEvents.find(e => e.id === id) || null;
  return event;
}

interface EventDetailPageProps {
  params: { id: string };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const event = await getEventDetails(params.id);

  if (!event) {
    return (
      <div className="text-center py-10">
        <PageHeader title="Event Not Found" />
        <p className="text-muted-foreground text-lg">Sorry, we couldn't find the event you're looking for.</p>
        <Button asChild variant="link" className="mt-4">
            <Link href="/events">Browse other events</Link>
        </Button>
      </div>
    );
  }

  const registrationOpen = event.attendees !== undefined && event.capacity !== undefined ? event.attendees < event.capacity : true;

  return (
    <div className="space-y-10">
      {event.imageUrl && (
        <div className="relative w-full h-72 md:h-[500px] rounded-xl overflow-hidden shadow-2xl group">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill 
            style={{objectFit: "cover"}}
            priority
            className="transform transition-transform duration-500 group-hover:scale-110"
            data-ai-hint="event detail banner"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-10">
             <h1 className="text-4xl sm:text-5xl md:text-6xl font-display text-white shadow-text-lg">{event.title}</h1>
             <Badge variant="secondary" className="mt-2 text-sm py-1 px-3 bg-primary/80 text-primary-foreground backdrop-blur-sm">
                {event.location}
             </Badge>
          </div>
        </div>
      )}
      
      <div className="grid md:grid-cols-7 gap-8">
        <div className="md:col-span-5 space-y-8">
          <Card className="bg-card/70 shadow-xl card-interactive-glow">
            <CardHeader>
                <h2 className="text-3xl font-display text-gradient-neon">About This Event</h2>
            </CardHeader>
            <CardContent className="text-lg text-foreground/90 leading-relaxed prose prose-invert max-w-none">
                <p>{event.description}</p>
            </CardContent>
          </Card>

          {event.rewards && (
            <Card className="bg-card/70 shadow-xl card-interactive-glow">
                <CardHeader>
                    <h3 className="text-2xl font-display text-secondary flex items-center">
                        <Award className="mr-3 h-7 w-7" /> Attendee Rewards
                    </h3>
                </CardHeader>
                <CardContent>
                    <p className="text-lg text-foreground/80">{event.rewards}</p>
                    <p className="text-sm text-muted-foreground mt-2">Rewards are typically distributed after successful event participation. Terms may apply.</p>
                </CardContent>
            </Card>
          )}
        </div>

        <div className="md:col-span-2 space-y-6">
            <Card className="bg-card/70 shadow-lg card-interactive-glow sticky top-24">
                <CardContent className="pt-6 space-y-4">
                    <div className="flex items-start text-lg">
                        <CalendarDays className="mr-3 mt-1 h-6 w-6 text-primary flex-shrink-0" />
                        <div>
                            <span className="font-semibold">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span className="block text-sm text-muted-foreground">{event.time}</span>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex items-start text-lg">
                        <MapPin className="mr-3 mt-1 h-6 w-6 text-primary flex-shrink-0" />
                         <div>
                            <span className="font-semibold">{event.location}</span>
                            <span className="block text-sm text-muted-foreground">Check event details for specific directions or virtual access links.</span>
                        </div>
                    </div>
                    {event.capacity && event.attendees !== undefined && (
                    <>
                    <Separator />
                    <div className="flex items-center text-lg">
                        <Users className="mr-3 h-6 w-6 text-primary" />
                        <span>{event.attendees ?? 0} / {event.capacity} spots filled</span>
                    </div>
                    { registrationOpen &&
                        <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(event.attendees / event.capacity) * 100}%` }}></div>
                        </div>
                    }
                    </>
                    )}
                    <div className="mt-6 space-y-3 pt-2">
                        {registrationOpen ? (
                             <Button size="lg" className="w-full animate-pulse-glow button-neon-glow">
                                <CheckCircle className="mr-2 h-5 w-5"/> Register Now
                            </Button>
                        ) : (
                            <Button size="lg" className="w-full" disabled>
                                Registration Closed
                            </Button>
                        )}
                       
                        <Button variant="outline" size="lg" className="w-full">
                            <Share2 className="mr-2 h-5 w-5"/> Share Event
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-card via-card/80 to-background/90 shadow-xl border border-primary/30 card-interactive-glow">
                <CardHeader className="flex flex-col items-center text-center space-y-3">
                    {event.hostAvatarUrl && <Image src={event.hostAvatarUrl} alt={event.hostName || 'Host'} width={80} height={80} className="rounded-full border-2 border-primary shadow-lg" data-ai-hint="host avatar"/>}
                    <div>
                        <p className="text-sm text-muted-foreground">Hosted by</p>
                        <h3 className="text-xl font-semibold text-gradient-neon">{event.hostName}</h3>
                    </div>
                </CardHeader>
                <CardContent className="text-center">
                    <Button variant="secondary" className="w-full shadow-md hover:shadow-secondary/40">
                        <UserPlus className="mr-2 h-5 w-5"/> Subscribe to {event.hostName}
                    </Button>
                     <p className="text-xs text-muted-foreground mt-3">Get notified about future events from this host.</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

