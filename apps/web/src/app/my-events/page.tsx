import Link from 'next/link';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare, ListOrdered, CalendarClock, History, UserCheck } from 'lucide-react';

export default function MyEventsPage() {
  return (
    <div>
      <PageHeader
        title="My Events Dashboard"
        description="Manage your event participation and view your event history."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="card-interactive-glow">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-display text-primary">
              <ListOrdered className="mr-3 h-7 w-7" />
              Registered Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              See all upcoming events you're registered for. Don't miss out!
            </p>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/my-events/registered">View Registered</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="card-interactive-glow">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-display text-primary">
              <History className="mr-3 h-7 w-7" /> {/* Changed icon */}
              Attended Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              View a history of all events you've successfully attended and claimed rewards for.
            </p>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/my-events/attended">View Attended</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="card-interactive-glow lg:col-span-1 md:col-span-2"> {/* Adjusted span for better layout */}
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-display text-primary">
              <CalendarClock className="mr-3 h-7 w-7" />
              My Event Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              View your registered and attended events in a handy calendar format.
            </p>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/calendar">Go to Calendar</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Future expansion idea: My POAPs/NFTs earned */}
        {/* <Card className="card-interactive-glow">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-display text-primary">
              <UserCheck className="mr-3 h-7 w-7" />
              My Collectibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              View all your earned POAPs, NFTs, and other digital collectibles from events.
            </p>
            <Button asChild variant="secondary" className="w-full" disabled>
              <Link href="#">View Collectibles (Coming Soon)</Link>
            </Button>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
