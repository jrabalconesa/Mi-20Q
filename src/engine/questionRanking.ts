import type { Answer, Question, RankedCandidate } from '../types/game'
import { availableQuestions } from './questionAvailability'
import { filterQuestionsByPhase } from './questionPhase'
import { candidateSetEntropy, expectedValue, normalizeAttribute } from './scoring'

export interface QuestionScore {
  question: Question
  usefulness: number
  informationGain: number
  confirmationBonus: number
  knownMass: number
  yesProbability: number
  scriptedOpening: boolean
}

function weightedMeanProbability(question: Question, rankedCandidates: RankedCandidate[]): number {
  const totalPosterior = rankedCandidates.reduce((total, candidate) => total + candidate.score, 0) || 1
  return rankedCandidates.reduce(
    (total, candidate) => total + normalizeAttribute(expectedValue(candidate, question)) * candidate.score,
    0
  ) / totalPosterior
}

export function rankAvailableQuestions(
  questions: Question[],
  rankedCandidates: RankedCandidate[],
  askedQuestionIds: string[],
  answers: Record<string, Answer> = {}
): QuestionScore[] {
  const available = filterQuestionsByPhase(
    availableQuestions(questions, askedQuestionIds, answers),
    rankedCandidates,
    askedQuestionIds.length
  )
  const remainingEntropy = candidateSetEntropy(rankedCandidates)
  if (!available.length || !rankedCandidates.length || remainingEntropy <= 0) return []

  return available
    .map(question => {
      const yesProbability = weightedMeanProbability(question, rankedCandidates)
      const distanceToHalf = Math.abs(yesProbability - 0.5)
      const usefulness = remainingEntropy * (1 - distanceToHalf * 2) * (question.importance ?? 1)
      return {
        question,
        usefulness,
        informationGain: usefulness,
        confirmationBonus: 0,
        knownMass: 1,
        yesProbability,
        scriptedOpening: false
      }
    })
    .sort((left, right) =>
      right.usefulness - left.usefulness ||
      left.question.id.localeCompare(right.question.id)
    )
}

export function selectNextQuestion(
  questions: Question[],
  rankedCandidates: RankedCandidate[],
  askedQuestionIds: string[],
  answers: Record<string, Answer> = {}
): Question | null {
  const ranked = rankAvailableQuestions(questions, rankedCandidates, askedQuestionIds, answers)
  return ranked[0]?.question ?? null
}
