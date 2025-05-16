import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingUp, MailPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';

// Mock data - in a real app, this would come from a backend
const MOCK_SUBSCRIBER_COUNT = 1234;
const MOCK_GROWTH_PERCENTAGE = 2.1; // e.g., 2.1% growth this month
const MOCK_RECENT_SUBSCRIBERS = [
    { id: 'user1', name: 'Alice CryptoFan', date: '2024-07-28', avatar: 'https://avatar.vercel.sh/alice' },
    { id: 'user2', name: 'Bob Web3Dev', date: '2024-07-27', avatar: 'https://avatar.vercel.sh/bob' },
    { id: 'user3', name: 'Carol NFTArt', date: '2024-07-27', avatar: 'https://avatar.vercel.sh/carol' },
    { id: 'user4', name: 'Dave DeFiKing', date: '2024-07-26', avatar: 'https://avatar.vercel.sh/dave' },
    { id: 'user5', name: 'Eve EventGoer', date: '2024-07-25', avatar: 'https://avatar.vercel.sh/eve' },
    { id: 'user6', name: 'Frank Founder', date: '2024-07-25', avatar: 'https://avatar.vercel.sh/frank' },
    { id: 'user7', name: 'Grace Gamer', date: '2024-07-24', avatar: 'https://avatar.vercel.sh/grace' },
];


export default function SubscribersPage() {
  return (
    <div>
      <PageHeader
        title="My Subscribers"
        description="Keep track of users who follow your events and announcements."
      />
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-xl bg-card/80 backdrop-blur-sm card-interactive-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-display text-primary">Total Subscribers</CardTitle>
            <Users className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gradient-neon">
              {MOCK_SUBSCRIBER_COUNT.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground pt-1">
              The pulse of your community.
            </p>
          </CardContent>
        </Card>
         <Card className="shadow-xl bg-card/80 backdrop-blur-sm card-interactive-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-display text-primary">Monthly Growth</CardTitle>
            <TrendingUp className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gradient-neon">
              +{MOCK_GROWTH_PERCENTAGE}%
            </div>
            <p className="text-xs text-muted-foreground pt-1">
              New subscribers this month.
            </p>
          </CardContent>
        </Card>
         <Card className="shadow-xl bg-card/80 backdrop-blur-sm card-interactive-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-display text-primary">Engage</CardTitle>
            <MailPlus className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <Button className="w-full button-neon-glow text-sm">Send Update</Button>
            <p className="text-xs text-muted-foreground pt-1 text-center mt-1">
             Notify your subscribers. (Soon)
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl bg-card/80 backdrop-blur-sm card-interactive-glow">
            <CardHeader>
                <CardTitle className="text-2xl font-display text-secondary">Subscriber List</CardTitle>
                <div className="pt-2">
                    <Input placeholder="Search subscribers..." className="max-w-sm"/>
                </div>
            </CardHeader>
            <CardContent>
                {MOCK_RECENT_SUBSCRIBERS.length > 0 ? (
                    <ScrollArea className="h-[400px] pr-4">
                        <ul className="space-y-3">
                            {MOCK_RECENT_SUBSCRIBERS.map(subscriber => (
                                <li key={subscriber.id} className="flex justify-between items-center p-3 bg-background rounded-lg border border-border hover:border-primary transition-colors duration-200">
                                    <div className="flex items-center gap-3">
                                        <Image src={subscriber.avatar} alt={subscriber.name} width={40} height={40} className="rounded-full border-2 border-primary/50" data-ai-hint="subscriber avatar"/>
                                        <span className="font-medium text-foreground text-base">{subscriber.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm text-muted-foreground">Subscribed: {new Date(subscriber.date).toLocaleDateString()}</span>
                                        {/* Add action buttons like "View Profile" or "Message" if needed */}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </ScrollArea>
                ) : (
                    <p className="text-muted-foreground text-lg text-center py-8">No subscribers found yet. Share your host profile to grow your community!</p>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
