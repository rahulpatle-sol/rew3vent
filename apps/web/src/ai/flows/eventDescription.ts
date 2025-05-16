
'use server';
/**
 * @fileOverview AI flow for generating event descriptions.
 *
 * - eventDescriptionFlow - A function that generates an event description based on input.
 * - EventDescriptionInput - The input type for the eventDescriptionFlow.
 * - EventDescriptionOutput - The return type for the eventDescriptionFlow.
 */

import { ai } from '@root/lib/genkit';
import { z } from 'genkit';

export const EventDescriptionInputSchema = z.object({
  eventName: z.string().describe("The name of the event."),
  eventDate: z.string().describe("The date of the event (e.g., 'YYYY-MM-DD')."),
  eventLocation: z.string().describe("The location of the event (can be physical or virtual)."),
  eventTopic: z.string().describe("The main topic or theme of the event."),
  photoDataUri: z.string().optional().describe(
    "An optional photo of the event or related imagery, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
  ),
});
export type EventDescriptionInput = z.infer<typeof EventDescriptionInputSchema>;

export const EventDescriptionOutputSchema = z.object({
  description: z.string().describe("A compelling and detailed event description."),
  suggestedTags: z.array(z.string()).describe("A list of suggested tags or keywords for the event."),
});
export type EventDescriptionOutput = z.infer<typeof EventDescriptionOutputSchema>;


const generateDescriptionPrompt = ai.definePrompt({
  name: 'generateEventDescriptionPrompt',
  input: { schema: EventDescriptionInputSchema },
  output: { schema: EventDescriptionOutputSchema },
  prompt: `You are an expert event marketer. Generate a compelling and detailed event description and suggest relevant tags.

Event Details:
Name: {{{eventName}}}
Date: {{{eventDate}}}
Location: {{{eventLocation}}}
Topic: {{{eventTopic}}}
{{#if photoDataUri}}
Visual Context: {{media url=photoDataUri}}
{{/if}}

Based on these details, create an engaging description that would attract attendees.
Also, provide a list of 3-5 relevant tags or keywords for this event.
Ensure the output is in the specified JSON format.
`,
});


export const eventDescriptionFlow = ai.defineFlow(
  {
    name: 'eventDescriptionFlow',
    inputSchema: EventDescriptionInputSchema,
    outputSchema: EventDescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await generateDescriptionPrompt(input);
    if (!output) {
        throw new Error("Failed to generate event description. The AI model did not return an output.");
    }
    return output;
  }
);

export async function generateEventDescription(input: EventDescriptionInput): Promise<EventDescriptionOutput> {
  return eventDescriptionFlow(input);
}

