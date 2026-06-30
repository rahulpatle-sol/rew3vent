'use client';

import { useState, useEffect } from 'react';
import { EventCard } from '@/components/events/EventCard';
import PageHeader from '@/components/shared/PageHeader';
import type { Event } from '@/types';
import { Input } from '@/components/ui/input';
import { MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const cityKeywords: Record<string, string> = {
  mumbai: 'Mumbai',
  delhi: 'Delhi',
  bengaluru: 'Bengaluru',
  bangalore: 'Bengaluru',
  hyderabad: 'Hyderabad',
  pune: 'Pune',
  chennai: 'Chennai',
  kolkata: 'Kolkata',
  jaipur: 'Jaipur',
  kochi: 'Kochi',
  ahmedabad: 'Ahmedabad',
  lucknow: 'Lucknow',
  surat: 'Surat',
  bhopal: 'Bhopal',
  chandigarh: 'Chandigarh',
};

export default function ExploreEventsPage() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');
  const [filtered, setFiltered] = useState<Event[] | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => { setAllEvents(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSearch = () => {
    setSearched(true);
    const input = city.toLowerCase().trim();
    const matchedCity = Object.entries(cityKeywords).find(([key]) => input.includes(key) || key.includes(input));
    if (matchedCity) {
      const cityName = matchedCity[1];
      setFiltered(allEvents.filter(e => e.location.toLowerCase().includes(cityName.toLowerCase())));
    } else {
      setFiltered([]);
    }
  };

  const uniqueCities = [...new Set(allEvents.map(e => {
    for (const [key, name] of Object.entries(cityKeywords)) {
      if (e.location.toLowerCase().includes(key)) return name;
    }
    return null;
  }).filter(Boolean))] as string[];

  return (
    <div>
      <PageHeader
        title="Find Events in Your City"
        description="Mumbai, Delhi, Bengaluru, Kolkata — discover events wherever you are."
      />
      <div className="mb-8 flex flex-col sm:flex-row gap-4 max-w-xl">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Enter your city (e.g. Mumbai, Delhi)..."
            value={city}
            onChange={e => setCity(e.target.value)}
            className="pl-10 text-base"
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
          <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>
        <Button variant="secondary" size="lg" className="shrink-0" onClick={handleSearch}>Search</Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : !searched ? (
        <div className="text-center py-20">
          <MapPin className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
          <p className="text-muted-foreground text-lg">Enter your city name above to see what&apos;s happening near you!</p>
          {uniqueCities.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {uniqueCities.map(c => (
                <Button key={c} variant="outline" size="sm" onClick={() => {
                  setCity(c); setSearched(true);
                  setFiltered(allEvents.filter(e => e.location.toLowerCase().includes(c.toLowerCase())));
                }}>
                  {c}
                </Button>
              ))}
            </div>
          )}
        </div>
      ) : filtered !== null && filtered.length === 0 ? (
        <p className="text-center text-muted-foreground text-lg py-20">
          No events in this city yet. Be the first to host one! 🚀
        </p>
      ) : filtered !== null && filtered.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
