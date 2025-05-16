
import { EventForm } from '@/components/events/EventForm';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export default function CreateEventPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Host Your Event"
        description="Unleash your creativity and bring your event to life on Rew3vent. Fill out the form below to get started."
      />
      <Card className="max-w-3xl mx-auto shadow-2xl card-interactive-glow border-primary/20">
        <CardHeader className="items-center text-center pt-8">
          <div className="p-3 bg-primary/20 rounded-full mb-4 inline-block ring-4 ring-primary/30">
            <Sparkles className="h-12 w-12 text-primary animate-pulse-glow" />
          </div>
          <CardTitle className="text-3xl font-display text-gradient-neon">Event Creation Form</CardTitle>
          <CardDescription className="text-lg text-muted-foreground max-w-xl mx-auto pt-1">
            Provide the specifics for your new event. The more detail you add, the more engaging it will be for attendees!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-10">
          <EventForm />
        </CardContent>
      </Card>
    </div>
  );
}

