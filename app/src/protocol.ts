import { z } from 'zod'
import { defineProtocol } from 'easy-p2p-netcode'

export const PHASE_VALUES = ['lobby', 'answer', 'voting', 'results'] as const
export const Phase = z.enum(PHASE_VALUES)
export type Phase = z.infer<typeof Phase>

export const PlayerSummary = z.object({
  peerId: z.string(),
  name: z.string(),
  color: z.string(),
  connected: z.boolean(),
})
export type PlayerSummary = z.infer<typeof PlayerSummary>

export const PromptForAnswer = z.object({
  promptId: z.string(),
  text: z.string(),
})
export type PromptForAnswer = z.infer<typeof PromptForAnswer>

export const VoteChoice = z.object({
  choiceId: z.string(),
  text: z.string(),
})
export type VoteChoice = z.infer<typeof VoteChoice>

export const FinalScore = z.object({
  peerId: z.string(),
  name: z.string(),
  color: z.string(),
  points: z.number().int().min(0),
})
export type FinalScore = z.infer<typeof FinalScore>

export const protocol = defineProtocol({
  intents: {
    setName: z.object({ name: z.string().min(1).max(24) }),
    submitAnswer: z.object({
      promptId: z.string(),
      text: z.string().max(300),
    }),
    progressTick: z.object({
      promptId: z.string(),
      charsTyped: z.number().int().min(0).max(300),
    }),
    castVote: z.object({
      promptId: z.string(),
      choiceId: z.string(),
    }),
  },
  events: {
    lobbyState: z.object({
      code: z.string(),
      players: z.array(PlayerSummary),
      canStart: z.boolean(),
    }),
    phaseChange: z.object({ phase: Phase }),
    answerPrompts: z.object({
      prompts: z.array(PromptForAnswer),
      timerEndsAt: z.number(),
    }),
    progressBroadcast: z.object({
      peerId: z.string(),
      promptId: z.string(),
      charsTyped: z.number().int(),
    }),
    votingPrompt: z.object({
      promptId: z.string(),
      prompt: z.string(),
      choices: z.array(VoteChoice),
      timerEndsAt: z.number(),
    }),
    voteResult: z.object({
      promptId: z.string(),
      winnerChoiceId: z.string().nullable(),
      tally: z.record(z.string(), z.number().int().min(0)),
    }),
    finalScores: z.object({ scores: z.array(FinalScore) }),
    error: z.object({ reason: z.string() }),
  },
})

export type Protocol = typeof protocol
