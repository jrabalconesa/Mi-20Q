import type { GameKnowledge, GameState, RankedCandidate } from '../types/game'
import { effectiveCandidateCount } from './questionPhase'
import { rankAvailableQuestions } from './questionRanking'

const MAX_QUESTIONS = 20
const MIN_GUESS_QUESTIONS = 6
const MIN_LEADER_SCORE = 0.68
const MIN_LEADER_ODDS = 4
const SMALL_EFFECTIVE_SET = 3

export interface GuessReadiness {
  ready: boolean
  reason: 'dominant' | 'small_set' | 'max_questions' | 'not_ready'
  leaderScore: number
  leaderOdds: number
  effectiveCandidateCount: number
  questionCount: number
  thresholds: {
    minQuestions: number
    minScore: number
    minOdds: number
    maxQuestions: number
    smallEffectiveSet: number
  }
}

export interface DebugSnapshot {
  topCandidates: RankedCandidate[]
  guessReadiness: GuessReadiness
  currentQuestionRank: number | null
  questionScores: ReturnType<typeof rankAvailableQuestions>
}

export function getGuessReadiness(state: GameState): GuessReadiness {
  const best = state.rankedCandidates[0]
  const second = state.rankedCandidates[1]
  const leaderScore = best?.score ?? 0
  const candidateCount = effectiveCandidateCount(state.rankedCandidates)
  const leaderOdds = best && second
    ? best.score / Math.max(second.score, Number.EPSILON)
    : Number.POSITIVE_INFINITY
  const dominant = Boolean(
    best
    && state.questionCount >= MIN_GUESS_QUESTIONS
    && leaderScore >= MIN_LEADER_SCORE
    && leaderOdds >= MIN_LEADER_ODDS
  )
  const smallSet = state.questionCount >= MIN_GUESS_QUESTIONS && candidateCount <= SMALL_EFFECTIVE_SET
  const maxQuestionsReached = state.questionCount >= MAX_QUESTIONS
  const reason = maxQuestionsReached ? 'max_questions' : dominant ? 'dominant' : smallSet ? 'small_set' : 'not_ready'

  return {
    ready: dominant || smallSet || maxQuestionsReached,
    reason,
    leaderScore,
    leaderOdds,
    effectiveCandidateCount: candidateCount,
    questionCount: state.questionCount,
    thresholds: {
      minQuestions: MIN_GUESS_QUESTIONS,
      minScore: MIN_LEADER_SCORE,
      minOdds: MIN_LEADER_ODDS,
      maxQuestions: MAX_QUESTIONS,
      smallEffectiveSet: SMALL_EFFECTIVE_SET
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
