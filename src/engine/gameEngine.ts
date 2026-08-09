import { coreCandidates } from '../data/candidates'
import { questions } from '../data/questions'
import type { Answer, Category, GameKnowledge, GameState, Question } from '../types/game'
import { rankCandidates } from './scoring'
import { selectNextQuestion } from './selectNextQuestion'

const MAX_QUESTIONS = 20
const builtInKnowledge: GameKnowledge = { candidates: coreCandidates, questions }

function questionMap(knowledge: GameKnowledge): Record<string, Question> {
  return Object.fromEntries(knowledge.questions.map(question => [question.id, question]))
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
  const dominant = Boolean(best && questionCount >= 6 && best.score >= 0.68 && odds >= 4)
  const shouldGuess = dominant || questionCount >= MAX_QUESTIONS

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

  const categoryQuestions = knowledge.questions.filter(question => question.categories.includes(state.category))
  const next = selectNextQuestion(categoryQuestions, rankedCandidates, askedQuestionIds)

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
  const next = selectNextQuestion(categoryQuestions, rankedCandidates, state.askedQuestionIds)

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
