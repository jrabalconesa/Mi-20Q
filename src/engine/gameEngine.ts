import { questions } from '../data/questions'
import type { Answer, Category, GameKnowledge, GameState, Question } from '../types/game'
import { effectiveCandidateCount } from './questionPhase'
import { expectedValue, normalizeAttribute, rankCandidates } from './scoring'
import { selectNextQuestion } from './selectNextQuestion'

const MAX_QUESTIONS = 20
const MIN_GUESS_QUESTIONS = 6
const SMALL_EFFECTIVE_SET = 3
const builtInKnowledge: GameKnowledge = { candidates: [], questions }

function questionMap(knowledge: GameKnowledge): Record<string, Question> {
  return Object.fromEntries(knowledge.questions.map(question => [question.id, question]))
}

function distinguishesLeaders(question: Question | null, best: GameState['rankedCandidates'][number] | undefined, second: GameState['rankedCandidates'][number] | undefined): boolean {
  if (!question || !best || !second) return false
  const bestExpected = normalizeAttribute(expectedValue(best, question))
  const secondExpected = normalizeAttribute(expectedValue(second, question))
  return Math.abs(bestExpected - secondExpected) >= 0.35
}

export function createGame(category: Category, knowledge: GameKnowledge = builtInKnowledge): GameState {
  const questionsById = questionMap(knowledge)
  const pool = knowledge.candidates.filter(candidate => candidate.category === category)
  const ranked = rankCandidates(pool, questionsById, {})
  const categoryQuestions = knowledge.questions.filter(question => question.categories.includes(category))
  const firstQuestion = selectNextQuestion(categoryQuestions, ranked, [])

  return {
    category,
    askedQuestionIds: [],
    answers: {},
    rankedCandidates: ranked,
    currentQuestionId: firstQuestion?.id ?? null,
    guessCandidateId: null,
    excludedCandidateIds: [],
    questionCount: 0,
    status: 'playing'
  }
}

export function answerCurrentQuestion(
  state: GameState,
  answer: Answer,
  knowledge: GameKnowledge = builtInKnowledge
): GameState {
  if (state.status !== 'playing' || !state.currentQuestionId) return state

  const questionsById = questionMap(knowledge)
  const answers = { ...state.answers, [state.currentQuestionId]: answer }
  const askedQuestionIds = [...state.askedQuestionIds, state.currentQuestionId]
  const pool = knowledge.candidates.filter(candidate =>
    candidate.category === state.category && !state.excludedCandidateIds.includes(candidate.id)
  )
  const rankedCandidates = rankCandidates(pool, questionsById, answers)
  const questionCount = state.questionCount + 1
  const best = rankedCandidates[0]
  const second = rankedCandidates[1]
  const odds = best && second ? best.score / Math.max(second.score, Number.EPSILON) : Number.POSITIVE_INFINITY
  const dominant = Boolean(best && questionCount >= MIN_GUESS_QUESTIONS && best.score >= 0.68 && odds >= 4)
  const smallSet = questionCount >= MIN_GUESS_QUESTIONS && effectiveCandidateCount(rankedCandidates) <= SMALL_EFFECTIVE_SET
  const categoryQuestions = knowledge.questions.filter(question => question.categories.includes(state.category))
  const next = selectNextQuestion(categoryQuestions, rankedCandidates, askedQuestionIds, answers)
  const canAskDiscriminatingQuestion = questionCount < MAX_QUESTIONS && distinguishesLeaders(next, best, second)
  const shouldGuess = (dominant || smallSet || questionCount >= MAX_QUESTIONS) && !canAskDiscriminatingQuestion

  if (shouldGuess && best) {
    return {
      ...state,
      answers,
      askedQuestionIds,
      rankedCandidates,
      questionCount,
      currentQuestionId: null,
      guessCandidateId: best.id,
      status: 'guessing'
    }
  }

  return {
    ...state,
    answers,
    askedQuestionIds,
    rankedCandidates,
    questionCount,
    currentQuestionId: next?.id ?? null,
    guessCandidateId: next ? null : best?.id ?? null,
    status: next ? 'playing' : 'guessing'
  }
}

export function resolveGuess(
  state: GameState,
  correct: boolean,
  knowledge: GameKnowledge = builtInKnowledge
): GameState {
  if (state.status !== 'guessing') return state
  if (correct) return { ...state, status: 'won' }
  if (state.questionCount >= MAX_QUESTIONS || !state.guessCandidateId) return { ...state, status: 'lost' }

  const excludedCandidateIds = [...state.excludedCandidateIds, state.guessCandidateId]
  const questionsById = questionMap(knowledge)
  const pool = knowledge.candidates.filter(candidate =>
    candidate.category === state.category && !excludedCandidateIds.includes(candidate.id)
  )
  const rankedCandidates = rankCandidates(pool, questionsById, state.answers)
  const categoryQuestions = knowledge.questions.filter(question => question.categories.includes(state.category))
  const next = selectNextQuestion(categoryQuestions, rankedCandidates, state.askedQuestionIds, state.answers)

  if (!next) return { ...state, excludedCandidateIds, rankedCandidates, status: 'lost' }
  return {
    ...state,
    excludedCandidateIds,
    rankedCandidates,
    currentQuestionId: next.id,
    guessCandidateId: null,
    status: 'playing'
  }
}

export function getQuestion(questionId: string | null, knowledge: GameKnowledge = builtInKnowledge): Question | null {
  return questionId ? knowledge.questions.find(question => question.id === questionId) ?? null : null
}

export function getCandidateName(candidateId: string | null, knowledge: GameKnowledge = builtInKnowledge): string | null {
  return knowledge.candidates.find(candidate => candidate.id === candidateId)?.name ?? null
}

export function canUndoLastAnswer(state: GameState): boolean {
  return state.status === 'playing' && state.questionCount > 0 && state.askedQuestionIds.length > 0
}

export function undoLastAnswer(
  state: GameState,
  knowledge: GameKnowledge = builtInKnowledge
): GameState {
  if (!canUndoLastAnswer(state)) return state

  const askedQuestionIds = state.askedQuestionIds.slice(0, -1)
  const lastQuestionId = state.askedQuestionIds.at(-1)
  if (!lastQuestionId) return state

  const answers = { ...state.answers }
  delete answers[lastQuestionId]

  const questionsById = questionMap(knowledge)
  const pool = knowledge.candidates.filter(candidate =>
    candidate.category === state.category && !state.excludedCandidateIds.includes(candidate.id)
  )
  const rankedCandidates = rankCandidates(pool, questionsById, answers)

  return {
    ...state,
    askedQuestionIds,
    answers,
    rankedCandidates,
    questionCount: state.questionCount - 1,
    currentQuestionId: lastQuestionId,
    guessCandidateId: null,
    status: 'playing'
  }
}
