import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, ShieldCheck, Users, Gift } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="About Rew3vent"
        description="Revolutionizing event experiences with Web3 technology."
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-4xl font-display text-gradient-neon mb-6">Our Mission</h2>
          <p className="text-lg text-foreground/90 leading-relaxed mb-4">
            At Rew3vent, we believe in the power of decentralized communities and transparent interactions. Our mission is to provide a platform where event creators and attendees can connect in a more engaging, secure, and rewarding way. We leverage blockchain technology to bring fairness, ownership, and innovation to the event industry.
          </p>
          <p className="text-lg text-foreground/90 leading-relaxed">
            Whether you're hosting a global virtual conference, a local workshop, or an exclusive digital art exhibit, Rew3vent offers the tools to make your event a success while providing unique benefits to your audience through NFTs, POAPs, and other Web3 integrations.
          </p>
        </div>
        <div className="order-1 md:order-2">
          <Image 
            src="https://picsum.photos/seed/mission/600/450" 
            alt="Rew3vent Mission" 
            width={600} 
            height={450} 
            className="rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            data-ai-hint="futuristic technology" 
          />
        </div>
      </section>

      <section className="py-10">
        <h2 className="text-4xl font-display text-gradient-neon mb-10 text-center">Why Choose Rew3vent?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="bg-card/70 text-center card-interactive-glow p-2">
            <CardHeader className="items-center">
              <div className="p-3 bg-primary/20 rounded-full mb-3 inline-block">
                 <Sparkles className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-xl font-display text-primary">Innovative Experiences</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Engage attendees with unique Web3 features like NFT ticketing and token-gated access.</p>
            </CardContent>
          </Card>
          <Card className="bg-card/70 text-center card-interactive-glow p-2">
            <CardHeader className="items-center">
              <div className="p-3 bg-primary/20 rounded-full mb-3 inline-block">
                <ShieldCheck className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-xl font-display text-primary">Enhanced Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Benefit from blockchain's transparency and security for ticketing and reward distribution.</p>
            </CardContent>
          </Card>
          <Card className="bg-card/70 text-center card-interactive-glow p-2">
            <CardHeader className="items-center">
              <div className="p-3 bg-primary/20 rounded-full mb-3 inline-block">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-xl font-display text-primary">Community Focused</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Build and nurture your community with tools for direct engagement and subscriptions.</p>
            </CardContent>
          </Card>
          <Card className="bg-card/70 text-center card-interactive-glow p-2">
            <CardHeader className="items-center">
              <div className="p-3 bg-primary/20 rounded-full mb-3 inline-block">
                <Gift className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-xl font-display text-primary">Rewarding Participation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Offer tangible value to your attendees through digital collectibles and unique rewards.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className="text-center py-12 bg-gradient-to-tr from-card/50 to-background/30 rounded-xl shadow-2xl">
        <h2 className="text-4xl font-display text-gradient-neon mb-6">Join Us on Our Journey</h2>
        <p className="text-lg text-foreground/80 max-w-3xl mx-auto mb-10 leading-relaxed">
          Rew3vent is more than just an event platform; it's a movement towards a more open, interactive, and rewarding digital and physical event landscape. We're constantly innovating and invite you to be part of our growing ecosystem.
        </p>
        <Button asChild size="lg" className="button-neon-glow">
            <Link href="/events">Explore Events & Get Started</Link>
        </Button>
      </section>

    </div>
  );
}
