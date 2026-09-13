import type { GameKnowledge, GameState, RankedCandidate } from '../types/game'
import { evaluateGuessPolicy, GUESS_POLICY, type GuessPolicyReason } from './guessPolicy'
import { effectiveCandidateCount } from './questionPhase'
import { rankAvailableQuestions } from './questionRanking'

export interface GuessReadiness {
  ready: boolean
  reason: GuessPolicyReason
  leaderScore: number
  leaderOdds: number
  effectiveCandidateCount: number
  questionCount: number
  thresholds: {
    absoluteProbability: number
    lateQuestion: number
    lateProbability: number
    lateRatio: number
    maxQuestions: number
  }
}

export interface DebugSnapshot {
  topCandidates: RankedCandidate[]
  guessReadiness: GuessReadiness
  currentQuestionRank: number | null
  questionScores: ReturnType<typeof rankAvailableQuestions>
}

export function getGuessReadiness(state: GameState): GuessReadiness {
  const evaluation = evaluateGuessPolicy(state.questionCount, state.rankedCandidates)
  const candidateCount = effectiveCandidateCount(state.rankedCandidates)

  return {
    ready: evaluation.ready,
    reason: evaluation.reason,
    leaderScore: evaluation.leaderScore,
    leaderOdds: evaluation.leaderOdds,
    effectiveCandidateCount: candidateCount,
    questionCount: state.questionCount,
    thresholds: {
      ...GUESS_POLICY
    }
  }
}

export function buildDebugSnapshot(
  state: GameState,
  knowledge: GameKnowledge,
  topLimit = 5,
  questionLimit = 6
): DebugSnapshot {
  const categoryQuestions = knowledge.questions.filter(question => question.categories.includes(state.category))
  const questionScores = rankAvailableQuestions(
    categoryQuestions,
    state.rankedCandidates,
    state.askedQuestionIds,
    state.answers
  )
  const currentQuestionRank = state.currentQuestionId
    ? questionScores.findIndex(entry => entry.question.id === state.currentQuestionId)
    : null

  return {
    topCandidates: state.rankedCandidates.slice(0, topLimit),
    guessReadiness: getGuessReadiness(state),
    currentQuestionRank: currentQuestionRank === -1 ? null : currentQuestionRank,
    questionScores: questionScores.slice(0, questionLimit)
  }
}
