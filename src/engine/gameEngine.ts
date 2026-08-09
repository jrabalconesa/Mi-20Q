import { candidates } from '../data/candidates'
import { questions } from '../data/questions'
import type { Answer, Category, GameState, Question } from '../types/game'
import { rankCandidates } from './scoring'
import { selectNextQuestion } from './selectNextQuestion'

const questionsById: Record<string, Question> = Object.fromEntries(questions.map(q => [q.id, q]))
const MAX_QUESTIONS = 20

export function createGame(category: Category): GameState {
  const pool = candidates.filter(c => c.category === category)
  const ranked = rankCandidates(pool, questionsById, {})
  const categoryQuestions = questions.filter(question => question.categories.includes(category))
  const firstQuestion = selectNextQuestion(categoryQuestions, ranked, [])

  return {
    category,
    askedQuestionIds: [],
    answers: {},
    rankedCandidates: ranked,
    currentQuestionId: firstQuestion?.id ?? null,
    guessCandidateId: null,
    questionCount: 0,
    status: 'playing'
  }
}

export function answerCurrentQuestion(state: GameState, answer: Answer): GameState {
  if (state.status !== 'playing' || !state.currentQuestionId) return state

  const answers = { ...state.answers, [state.currentQuestionId]: answer }
  const askedQuestionIds = [...state.askedQuestionIds, state.currentQuestionId]
  const pool = candidates.filter(c => c.category === state.category)
  const rankedCandidates = rankCandidates(pool, questionsById, answers)
  const questionCount = state.questionCount + 1
  const best = rankedCandidates[0]
  const second = rankedCandidates[1]
  const scoreGap = best && second ? best.score - second.score : 1
  const confidenceGap = Math.max(0.03, 0.5 / questionCount)
  const dominant = Boolean(best && questionCount >= 5 && best.score >= 0.85 && scoreGap >= confidenceGap)
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

  const categoryQuestions = questions.filter(question => question.categories.includes(state.category))
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

export function resolveGuess(state: GameState, correct: boolean): GameState {
  if (state.status !== 'guessing') return state
  return { ...state, status: correct ? 'won' : 'lost' }
}

export function getQuestion(questionId: string | null): Question | null {
  return questionId ? questionsById[questionId] ?? null : null
}

export function getCandidateName(candidateId: string | null): string | null {
  return candidates.find(c => c.id === candidateId)?.name ?? null
}
