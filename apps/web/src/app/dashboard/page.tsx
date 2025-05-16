
"use client";

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, BarChart3, Settings, PlusCircle, ListChecks, Edit3 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function HostDashboardPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?message=auth_required_host_dashboard');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="space-y-8">
        <PageHeader title="Loading Host Dashboard..." description="Please wait while we prepare your hosting tools." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="shadow-lg">
              <CardHeader>
                <Skeleton className="h-7 w-3/4 mb-1" />
                 <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-5 w-full mb-4" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
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
            <CardDescription className="text-sm text-muted-foreground pt-1">List your next amazing event.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Ready to host something new? Click below to get started.
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
            <CardDescription className="text-sm text-muted-foreground pt-1">View, edit, or track your events.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
             Access your currently listed events and their status.
            </p>
            <Button asChild variant="secondary" className="w-full" disabled>
              <Link href="#">My Listed Events (Soon)</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="card-interactive-glow">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-display text-secondary">
              <Users className="mr-3 h-7 w-7" />
              My Subscribers
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground pt-1">Connect with your followers.</CardDescription>
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
            <CardDescription className="text-sm text-muted-foreground pt-1">Track event performance.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Gain insights into attendance, engagement, and other key metrics.
            </p>
            <Button asChild variant="secondary" className="w-full" disabled>
              <Link href="#">View Analytics (Soon)</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="card-interactive-glow">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-display text-secondary">
              <Edit3 className="mr-3 h-7 w-7" />
               Host Profile
            </CardTitle>
             <CardDescription className="text-sm text-muted-foreground pt-1">Manage your public presence.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Update your public host profile, links, and branding information.
            </p>
            <Button asChild variant="secondary" className="w-full" disabled>
              <Link href="#">Edit Profile (Soon)</Link>
            </Button>
          </CardContent>
        </Card>

         <Card className="card-interactive-glow">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-display text-secondary">
              <Settings className="mr-3 h-7 w-7" />
              Account Settings
            </CardTitle>
             <CardDescription className="text-sm text-muted-foreground pt-1">Configure your host account.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Adjust notification preferences, connected accounts, and more.
            </p>
            <Button asChild variant="secondary" className="w-full" disabled>
              <Link href="#">Manage Settings (Soon)</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}