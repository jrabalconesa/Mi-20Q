import type { Question, RankedCandidate } from '../types/game'

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
  const top = rankedCandidates.slice(0, Math.min(10, rankedCandidates.length))

  if (!available.length || !top.length) return null

  return available
    .map(question => {
      const values = top.map(candidate => asProbability(candidate.attributes[question.attribute]))
      const mean = values.reduce((a, b) => a + b, 0) / values.length
      const balance = 1 - Math.abs(0.5 - mean) * 2
      const variance = values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / values.length
      return { question, usefulness: balance * 0.7 + variance * 0.3 }
    })
    .sort((a, b) => b.usefulness - a.usefulness)[0]?.question ?? null
}
