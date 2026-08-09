import type { Question, RankedCandidate } from '../types/game'
import { compareCandidateNames } from './nameComparison'
import { expectedValue } from './scoring'

function asProbability(value: boolean | number | undefined): number {
  if (typeof value === 'boolean') return value ? 1 : 0
  if (typeof value === 'number') return Math.max(0, Math.min(1, value))
  return 0.5
}

export function selectNextQuestion(
  questions: Question[],
  rankedCandidates: RankedCandidate[],
  askedQuestionIds: string[]
): Question | null {
  const available = questions.filter(q => !askedQuestionIds.includes(q.id))
  const semanticAvailable = available.filter(question => question.kind !== 'nameBefore')
  const alphabeticalAvailable = available.filter(question => question.kind === 'nameBefore')
  const bestScore = rankedCandidates[0]?.score
  const competitive = bestScore === undefined
    ? []
    : rankedCandidates.filter(candidate => Math.abs(candidate.score - bestScore) < 0.000_001)
  const top = competitive.length >= 2
    ? competitive
    : rankedCandidates.slice(0, Math.min(64, rankedCandidates.length))

  if (!available.length || !top.length) return null

  if (askedQuestionIds.length >= 5 && alphabeticalAvailable.length && top.length >= 2) {
    const sortedCandidates = [...top].sort((left, right) => compareCandidateNames(left.name, right.name))
    const pivotName = sortedCandidates[Math.floor((sortedCandidates.length - 1) / 2)]?.name
    const alphabeticalQuestion = alphabeticalAvailable.find(question => question.pivotName === pivotName)
    if (alphabeticalQuestion) return alphabeticalQuestion
  }

  const questionPool = semanticAvailable.length ? semanticAvailable : alphabeticalAvailable

  return questionPool
    .map(question => {
      const rawValues = top.map(candidate => expectedValue(candidate, question))
      const values = rawValues.map(asProbability)
      const coverage = rawValues.filter(value => value !== undefined).length / rawValues.length
      const mean = values.reduce((a, b) => a + b, 0) / values.length
      const balance = 1 - Math.abs(0.5 - mean) * 2
      const variance = values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / values.length
      return { question, usefulness: (balance * 0.7 + variance * 0.3) * coverage }
    })
    .sort((a, b) => b.usefulness - a.usefulness)[0]?.question ?? null
}
