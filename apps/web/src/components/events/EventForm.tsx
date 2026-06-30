
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, ClockIcon, MapPinIcon, GiftIcon, FileTextIcon, UsersIcon, ImagePlusIcon, Sparkles } from "lucide-react";

const eventFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }).max(100),
  date: z.string().refine((val) => !isNaN(Date.parse(val)) && new Date(val) >= new Date(new Date().setHours(0,0,0,0)), { message: "Please select a valid future date." }),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Invalid time format (HH:MM)." }),
  location: z.string().min(3, "Location must be at least 3 characters.").max(100),
  description: z.string().min(10, "Description must be at least 10 characters.").max(1000),
  rewards: z.string().optional(),
  capacity: z.coerce.number().int().positive("Capacity must be a positive number.").optional(),
  imageUrl: z.string().url({ message: "Please enter a valid URL." }).optional(),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

const defaultValues: Partial<EventFormValues> = {
  title: "",
  date: "",
  time: "",
  location: "",
  description: "",
  rewards: "",
  imageUrl: "",
};

export function EventForm() {
  const { toast } = useToast();
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: EventFormValues) {
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const saved = await res.json();
      toast({
        title: "Your event is live! 🎉",
        description: (
          <div className="mt-2 w-full rounded-md bg-background/50 p-4">
            <p className="text-sm text-foreground">"{data.title}" has been created successfully!</p>
          </div>
        ),
        variant: "default",
        duration: 5000,
      });
      form.reset();
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Could not create event. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg flex items-center"><FileTextIcon className="mr-2 h-5 w-5 text-primary" />Event Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Mumbai Web3 Meetup, Crypto Art Workshop Delhi" {...field} className="text-base py-3" />
              </FormControl>
              <FormDescription>A catchy title that attracts attendees.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid md:grid-cols-2 gap-x-6 gap-y-8">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg flex items-center"><CalendarIcon className="mr-2 h-5 w-5 text-primary" />Date</FormLabel>
                <FormControl>
                    <Input type="date" {...field} className="text-base py-3" min={new Date().toISOString().split("T")[0]} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg flex items-center"><ClockIcon className="mr-2 h-5 w-5 text-primary" />Time</FormLabel>
                <FormControl>
                    <Input type="time" {...field} className="text-base py-3" />
                </FormControl>
                <FormDescription>Enter time in IST</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg flex items-center"><MapPinIcon className="mr-2 h-5 w-5 text-primary" />Location</FormLabel>
              <FormControl>
                  <Input placeholder="e.g., BKC Mumbai, Connaught Place Delhi, Electronic City Bangalore" {...field} className="text-base py-3" />
              </FormControl>
              <FormDescription>City and exact location.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg flex items-center"><Sparkles className="mr-2 h-5 w-5 text-primary" />Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What makes your event special? What will attendees learn or do?"
                  className="resize-y min-h-[150px] text-base py-3"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The more detail you provide, the more attendees you'll attract!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rewards"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg flex items-center"><GiftIcon className="mr-2 h-5 w-5 text-primary" />Rewards (Optional)</FormLabel>
              <FormControl>
                  <Input placeholder="e.g., POAP, NFTs, Swag, Cash Prize" {...field} className="text-base py-3" />
              </FormControl>
              <FormDescription>Why should people attend? What will they get?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg flex items-center"><UsersIcon className="mr-2 h-5 w-5 text-primary" />Capacity (Optional)</FormLabel>
              <FormControl>
                  <Input 
                    type="number" 
                    placeholder="e.g., 100" 
                    {...field}
                    className="text-base py-3" />
              </FormControl>
              <FormDescription>Maximum attendees. Leave blank for unlimited.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg flex items-center"><ImagePlusIcon className="mr-2 h-5 w-5 text-primary" />Event Image URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://picsum.photos/seed/your-event/600/400" {...field} className="text-base py-3"/>
              </FormControl>
              <FormDescription>A good image that represents your event.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full md:w-auto md:px-12 py-3 button-neon-glow text-base">
          Create Event & Go Live 🚀
        </Button>
      </form>
    </Form>
  );
}

