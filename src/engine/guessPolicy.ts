import type { RankedCandidate } from '../types/game'

export const GUESS_POLICY = {
  absoluteProbability: 0.7,
  lateQuestion: 15,
  lateProbability: 0.35,
  lateRatio: 2,
  maxQuestions: 20
} as const

export type GuessPolicyReason = 'absolute_probability' | 'late_ratio' | 'max_questions' | 'not_ready'

export interface GuessPolicyEvaluation {
  ready: boolean
  reason: GuessPolicyReason
  leaderScore: number
  leaderOdds: number
}

export function evaluateGuessPolicy(
  questionCount: number,
  rankedCandidates: RankedCandidate[]
): GuessPolicyEvaluation {
  const best = rankedCandidates[0]
  const second = rankedCandidates[1]
  const leaderScore = best?.score ?? 0
  const leaderOdds = best && second
    ? best.score / Math.max(second.score, Number.EPSILON)
    : Number.POSITIVE_INFINITY
  const absoluteProbability = Boolean(best && leaderScore >= GUESS_POLICY.absoluteProbability)
  const lateRatio = Boolean(
    best &&
    questionCount >= GUESS_POLICY.lateQuestion &&
    leaderScore >= GUESS_POLICY.lateProbability &&
    leaderOdds >= GUESS_POLICY.lateRatio
  )
  const maxQuestionsReached = questionCount >= GUESS_POLICY.maxQuestions
  const reason: GuessPolicyReason = maxQuestionsReached
    ? 'max_questions'
    : absoluteProbability
      ? 'absolute_probability'
      : lateRatio
        ? 'late_ratio'
        : 'not_ready'

  return {
    ready: absoluteProbability || lateRatio || maxQuestionsReached,
    reason,
    leaderScore,
    leaderOdds
  }
}
