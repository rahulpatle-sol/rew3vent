
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/shared/PageHeader';
import { EventCard } from '@/components/events/EventCard';
import type { Event } from '@/types';
import { ArrowRight, Search, PlusCircle, Zap, Gift, LogIn } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Neon Future Rave',
    date: '2024-08-15',
    time: '22:00 UTC',
    location: 'Metaverse Arena',
    description: 'Experience the future of music in a stunning neon-lit virtual world. Top DJs, immersive visuals, and interactive experiences await.',
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
    description: 'Learn to create and mint your own crypto art with leading digital artists. A hands-on workshop for all skill levels.',
    rewards: 'POAP token & art supplies',
    imageUrl: 'https://picsum.photos/seed/cryptoart/600/400',
    hostName: 'Artisan Guild',
    hostAvatarUrl: 'https://avatar.vercel.sh/artisan',
    attendees: 85,
    capacity: 100,
  },
];

export default function HomePage() {
  const eventsToDisplay = mockEvents;
  return (
    <div className="space-y-16">
      <section className="text-center py-16 bg-gradient-to-b from-card/50 to-transparent rounded-xl shadow-2xl overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 [filter:blur(100px)]">
             <Image src="https://picsum.photos/seed/hero-bg/1200/800" alt="Abstract background" fill style={{objectFit:"cover"}} data-ai-hint="abstract network" />
        </div>
        <div className="relative z-10">
            <PageHeader
            title="Step into Rew3vent"
            description="Your gateway to decentralized events. Discover, create, and connect like never before. Login to unlock the full experience!"
            />
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-6">
            <Button asChild size="lg" className="animate-pulse-glow button-neon-glow">
                <Link href="/login">
                Explore & Login <LogIn className="ml-2 h-5 w-5" />
                </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="bg-secondary/90 hover:bg-secondary text-secondary-foreground shadow-lg hover:shadow-secondary/40 transition-all">
                <Link href="/login">
                Host Your Event <PlusCircle className="ml-2 h-5 w-5" />
                </Link>
            </Button>
            </div>
        </div>
      </section>

      <section className="py-10 bg-card/30 rounded-xl shadow-xl p-6 md:p-8">
        <h2 className="text-3xl md:text-4xl font-display text-gradient-neon mb-8 text-center">Trending Experiences</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {eventsToDisplay.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
                <Link href="/login">
                    Discover All Events <Search className="ml-2 h-5 w-5"/>
                </Link>
            </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 text-center py-10">
        <Card className="p-6 bg-card/70 rounded-lg shadow-xl card-interactive-glow">
          <CardHeader className="items-center">
            <div className="p-3 bg-primary/20 rounded-full mb-4 inline-block">
              <Zap className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl font-display text-primary">Discover</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Find unique events hosted by creators worldwide. Filter by interest, location, or rewards.</p>
          </CardContent>
        </Card>
        <Card className="p-6 bg-card/70 rounded-lg shadow-xl card-interactive-glow">
          <CardHeader className="items-center">
            <div className="p-3 bg-primary/20 rounded-full mb-4 inline-block">
              <PlusCircle className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl font-display text-primary">Create</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Easily list your own events, set rewards, and connect with your community on the blockchain.</p>
          </CardContent>
        </Card>
        <Card className="p-6 bg-card/70 rounded-lg shadow-xl card-interactive-glow">
          <CardHeader className="items-center">
            <div className="p-3 bg-primary/20 rounded-full mb-4 inline-block">
              <Gift className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl font-display text-primary">Earn Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Attend events, participate, and earn exclusive Web3 rewards like NFTs and tokens.</p>
          </CardContent>
        </Card>
      </section>
      
      <section className="py-12">
          <div className="bg-gradient-to-br from-card via-background to-card/70 p-8 md:p-12 rounded-xl shadow-2xl flex flex-col lg:flex-row items-center gap-8 lg:gap-12 card-interactive-glow">
            <div className="flex-1 lg:order-2">
                 <Image
                    src="https://picsum.photos/seed/community/700/500"
                    alt="Community"
                    width={700}
                    height={500}
                    className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                    data-ai-hint="futuristic community network"
                />
            </div>
            <div className="flex-1 lg:order-1 text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl font-display text-gradient-neon mb-6">Join the Event Revolution</h2>
                <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Rew3vent utilizes blockchain for transparent, secure, and rewarding event experiences. As an attendee or host, you're integral to a dynamic, decentralized community shaping the future of gatherings.
                </p>
                <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-secondary/50 transition-shadow">
                    <Link href="/login">Learn More & Sign Up</Link>
                </Button>
            </div>
          </div>
      </section>

    </div>
  );
}
