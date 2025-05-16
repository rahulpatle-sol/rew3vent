"use client";

import { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Event } from '@/types';
import { Badge } from '@/components/ui/badge';

interface EventCalendarProps {
  events: Event[];
}

export function EventCalendar({ events }: EventCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const eventsOnSelectedDate = events.filter(event => {
    if (!date) return false;
    const eventDate = new Date(event.date);
    return eventDate.toDateString() === date.toDateString();
  });

  if (!isClient) {
    // Render a placeholder or null on the server to avoid hydration mismatch
    return (
        <Card className="shadow-xl">
            <CardHeader>
                <CardTitle className="text-2xl font-display text-primary">Event Calendar</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-6 items-start">
                <div className="p-4 border rounded-md bg-muted animate-pulse h-[300px] w-[280px]"></div>
                <div className="flex-1 space-y-4">
                    <h3 className="text-xl font-semibold text-muted-foreground">Loading events...</h3>
                </div>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="shadow-xl bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-display text-gradient-neon">My Event Calendar</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-6 items-start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border border-border p-4 bg-background"
          modifiers={{
            eventDay: events.map(e => new Date(e.date))
          }}
          modifiersStyles={{
            eventDay: {
              border: "2px solid hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              backgroundColor: "hsl(var(--primary))",
              borderRadius: "var(--radius)"
            }
          }}
        />
        <div className="flex-1 space-y-4 min-h-[200px] md:min-h-0">
          <h3 className="text-xl font-semibold text-foreground">
            Events on {date ? date.toLocaleDateString() : 'selected date'}:
          </h3>
          {eventsOnSelectedDate.length > 0 ? (
            <ul className="space-y-3">
              {eventsOnSelectedDate.map(event => (
                <li key={event.id} className="p-3 bg-background rounded-md border border-border shadow-sm hover:border-primary transition-colors">
                  <h4 className="font-semibold text-primary">{event.title}</h4>
                  <p className="text-sm text-muted-foreground">{event.time} - {event.location}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No events scheduled for this day.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
