'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import type { Event } from '@/types';
import { CalendarDays, MapPin, Users, Award, Share2, UserPlus, CheckCircle, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useParams } from 'next/navigation';

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then(res => {
        if (!res.ok) { setNotFound(true); return null; }
        return res.json();
      })
      .then(data => { setEvent(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (notFound || !event) {
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
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-10">
             <h1 className="text-4xl sm:text-5xl md:text-6xl text-white">{event.title}</h1>
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
                <h2 className="text-3xl text-gradient-neon">About This Event</h2>
            </CardHeader>
            <CardContent className="text-lg text-foreground/90 leading-relaxed">
                <p>{event.description}</p>
            </CardContent>
          </Card>

          {event.rewards && (
            <Card className="bg-card/70 shadow-xl card-interactive-glow">
                <CardHeader>
                    <h3 className="text-2xl text-secondary flex items-center">
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
                            <span className="font-semibold">{new Date(event.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
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
                    {event.hostAvatarUrl && <Image src={event.hostAvatarUrl} alt={event.hostName || 'Host'} width={80} height={80} className="rounded-full border-2 border-primary shadow-lg" />}
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
