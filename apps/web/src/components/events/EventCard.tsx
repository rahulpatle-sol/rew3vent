
import Image from 'next/image';
import Link from 'next/link';
import type { Event } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, Award, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const imageUrl = event.imageUrl; // Data should be correct from source

  return (
    <Card className="overflow-hidden shadow-lg flex flex-col h-full bg-card/80 backdrop-blur-sm card-interactive-glow group">
      {imageUrl && (
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            style={{objectFit: "cover"}}
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="event banner"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-display text-gradient-neon truncate group-hover:text-primary transition-colors">
            <Link href={`/events/${event.id}`} className="hover:underline">
                {event.title}
            </Link>
        </CardTitle>
        <CardDescription className="text-muted-foreground flex items-center gap-2 pt-1 text-sm">
          <Image src={event.hostAvatarUrl || `https://avatar.vercel.sh/${encodeURIComponent(event.hostName || 'default')}?size=32`} alt={event.hostName || 'Host'} width={24} height={24} className="rounded-full border border-primary/50" data-ai-hint="profile avatar" />
          Hosted by {event.hostName}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        <div className="flex items-center space-x-2 text-muted-foreground text-xs">
          <CalendarDays className="h-4 w-4 text-primary/80" />
          <span>{new Date(event.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} at {event.time}</span>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground text-xs">
          <MapPin className="h-4 w-4 text-primary/80" />
          <span>{event.location}</span>
        </div>
        <p className="text-sm text-foreground/80 mt-2 line-clamp-3">{event.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4">
        {event.rewards && (
          <Badge variant="outline" className="border-secondary text-secondary/90 bg-secondary/10 text-xs py-1 px-2.5">
            <Award className="mr-1.5 h-3.5 w-3.5" /> {event.rewards}
          </Badge>
        )}
         <Button asChild variant="default" size="sm" className="w-full sm:w-auto button-neon-glow">
          <Link href={`/events/${event.id}`}>
            View Details <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
