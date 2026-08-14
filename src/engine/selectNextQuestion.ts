import type { Answer, Question, RankedCandidate } from '../types/game'
import { availableQuestions } from './questionAvailability'
import { filterQuestionsByPhase } from './questionPhase'
import { candidateSetEntropy, expectedValue, normalizeAttribute } from './scoring'

function weightedMeanProbability(question: Question, rankedCandidates: RankedCandidate[]): number {
  const totalPosterior = rankedCandidates.reduce((total, candidate) => total + candidate.score, 0) || 1
  return rankedCandidates.reduce(
    (total, candidate) => total + normalizeAttribute(expectedValue(candidate, question)) * candidate.score,
    0
  ) / totalPosterior
}

export function selectNextQuestion(
  questions: Question[],
  rankedCandidates: RankedCandidate[],
  askedQuestionIds: string[],
  answers: Record<string, Answer> = {}
): Question | null {
  const available = filterQuestionsByPhase(
    availableQuestions(questions, askedQuestionIds, answers),
    rankedCandidates,
    askedQuestionIds.length
  )
  const remainingEntropy = candidateSetEntropy(rankedCandidates)

  if (!available.length || !rankedCandidates.length || remainingEntropy <= 0) return null

  return available
    .map(question => {
      const meanProbability = weightedMeanProbability(question, rankedCandidates)
      const distanceToHalf = Math.abs(meanProbability - 0.5)
      const importance = question.importance ?? 1
      return { question, distanceToHalf, usefulness: remainingEntropy * (1 - distanceToHalf * 2) * importance }
    })
    .sort((left, right) =>
      right.usefulness - left.usefulness ||
      left.distanceToHalf - right.distanceToHalf ||
      left.question.id.localeCompare(right.question.id)
    )[0]?.question ?? null
}
