
'use server';
/**
 * @fileOverview AI flow for suggesting event rewards.
 *
 * - rewardSuggestionFlow - A function that suggests rewards for an event.
 * - RewardSuggestionInput - The input type for the rewardSuggestionFlow.
 * - RewardSuggestionOutput - The return type for the rewardSuggestionFlow.
 */

import { ai } from '@root/lib/genkit';
import { z } from 'genkit';

export const RewardSuggestionInputSchema = z.object({
  eventCategory: z.string().describe("The category of the event (e.g., 'Tech Conference', 'Music Festival', 'Art Workshop')."),
  targetAudience: z.string().describe("Description of the target audience (e.g., 'Web3 developers', 'Indie music fans', 'Beginner artists')."),
  budgetLevel: z.enum(["low", "medium", "high"]).describe("The approximate budget level for rewards."),
  eventDescription: z.string().optional().describe("A brief description of the event for context."),
});
export type RewardSuggestionInput = z.infer<typeof RewardSuggestionInputSchema>;

export const RewardSuggestionOutputSchema = z.object({
  suggestions: z.array(
    z.object({
      rewardType: z.string().describe("Type of reward (e.g., 'NFT', 'POAP', 'Token Airdrop', 'Exclusive Content', 'Physical Swag')."),
      description: z.string().describe("A brief description of the suggested reward and why it's suitable."),
      estimatedCost: z.enum(["low", "medium", "high", "variable"]).describe("Estimated cost or effort to implement."),
      appealToAudience: z.string().describe("How this reward might appeal to the target audience.")
    })
  ).describe("A list of 2-3 reward suggestions."),
});
export type RewardSuggestionOutput = z.infer<typeof RewardSuggestionOutputSchema>;


const suggestRewardsPrompt = ai.definePrompt({
  name: 'suggestEventRewardsPrompt',
  input: { schema: RewardSuggestionInputSchema },
  output: { schema: RewardSuggestionOutputSchema },
  prompt: `You are an expert in Web3 event planning and community engagement.
Based on the following event details, suggest 2-3 creative and appealing rewards for attendees.
Consider the event category, target audience, and budget.
For each suggestion, provide the reward type, a brief description, its estimated cost/effort, and its appeal.

Event Details:
Category: {{{eventCategory}}}
Target Audience: {{{targetAudience}}}
Budget Level for Rewards: {{{budgetLevel}}}
{{#if eventDescription}}
Event Context: {{{eventDescription}}}
{{/if}}

Provide unique and relevant suggestions. Think about digital collectibles (NFTs, POAPs), token-based incentives, exclusive access, or even physical items if appropriate for a "high" budget.
Ensure the output is in the specified JSON format.
`,
});


export const rewardSuggestionFlow = ai.defineFlow(
  {
    name: 'rewardSuggestionFlow',
    inputSchema: RewardSuggestionInputSchema,
    outputSchema: RewardSuggestionOutputSchema,
  },
  async (input) => {
    const { output } = await suggestRewardsPrompt(input);
     if (!output) {
        throw new Error("Failed to generate reward suggestions. The AI model did not return an output.");
    }
    return output;
  }
);

export async function suggestEventRewards(input: RewardSuggestionInput): Promise<RewardSuggestionOutput> {
  return rewardSuggestionFlow(input);
}

