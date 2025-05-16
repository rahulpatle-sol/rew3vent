import Link from 'next/link';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, BarChart3, Settings, PlusCircle, ListChecks, Edit3 } from 'lucide-react';

export default function HostDashboardPage() {
  return (
    <div>
      <PageHeader
        title="Host Dashboard"
        description="Manage your events, view analytics, and engage with your community."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="card-interactive-glow">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-display text-primary">
              <PlusCircle className="mr-3 h-7 w-7" />
              Create New Event
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Ready to host something new? List your next amazing event here.
            </p>
            <Button asChild className="w-full button-neon-glow">
              <Link href="/create-event">Create Event</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="card-interactive-glow">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-display text-secondary">
              <ListChecks className="mr-3 h-7 w-7" />
              Manage My Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
             View, edit, or track your currently listed events.
            </p>
            <Button asChild variant="secondary" className="w-full">
              <Link href="#">My Listed Events (Coming Soon)</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="card-interactive-glow">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-display text-secondary">
              <Users className="mr-3 h-7 w-7" />
              My Subscribers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              View and manage your subscriber base who follow your announcements.
            </p>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/host/dashboard/subscribers">View Subscribers</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="card-interactive-glow">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-display text-secondary">
              <BarChart3 className="mr-3 h-7 w-7" />
              Event Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Track attendance, engagement, and other key metrics for your events.
            </p>
            <Button asChild variant="secondary" className="w-full" disabled>
              <Link href="#">View Analytics (Coming Soon)</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="card-interactive-glow">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-display text-secondary">
              <Edit3 className="mr-3 h-7 w-7" />
               Host Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Manage your public host profile, links, and branding.
            </p>
            <Button asChild variant="secondary" className="w-full" disabled>
              <Link href="#">Edit Profile (Coming Soon)</Link>
            </Button>
          </CardContent>
        </Card>

         <Card className="card-interactive-glow">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-display text-secondary">
              <Settings className="mr-3 h-7 w-7" />
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Adjust notification preferences, connected accounts, and more.
            </p>
            <Button asChild variant="secondary" className="w-full" disabled>
              <Link href="#">Manage Settings (Coming Soon)</Link>
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
