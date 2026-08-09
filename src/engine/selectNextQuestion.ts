import type { Question, RankedCandidate } from '../types/game'
import { expectedValue } from './scoring'

function asProbability(value: boolean | number | undefined): number {
  if (typeof value === 'boolean') return value ? 1 : 0
  if (typeof value === 'number') return Math.max(0, Math.min(1, value))
  return 0.5
}

function binaryEntropy(probability: number): number {
  if (probability <= 0 || probability >= 1) return 0
  return -probability * Math.log2(probability) - (1 - probability) * Math.log2(1 - probability)
}

export function selectNextQuestion(
  questions: Question[],
  rankedCandidates: RankedCandidate[],
  askedQuestionIds: string[]
): Question | null {
  const available = questions.filter(q => !askedQuestionIds.includes(q.id))
  const scriptedOpening = available
    .filter(question => question.openingOrder === askedQuestionIds.length + 1)
    .sort((left, right) => (left.openingOrder ?? 0) - (right.openingOrder ?? 0))[0]
  const bestScore = rankedCandidates[0]?.score
  const tiedLeaders = bestScore === undefined
    ? []
    : rankedCandidates.filter(candidate => Math.abs(candidate.score - bestScore) < 0.000_000_001)
  const top = tiedLeaders.length >= 2
    ? tiedLeaders
    : rankedCandidates.slice(0, Math.min(256, rankedCandidates.length))

  if (!available.length || !top.length) return null
  if (scriptedOpening) return scriptedOpening

  const totalPosterior = top.reduce((total, candidate) => total + candidate.score, 0) || 1

  return available
    .map(question => {
      const rawValues = top.map(candidate => expectedValue(candidate, question))
      const values = rawValues.map(asProbability)
      const yesProbability = values.reduce(
        (total, value, index) => total + value * top[index].score,
        0
      ) / totalPosterior
      const expectedNoise = values.reduce(
        (total, value, index) => total + binaryEntropy(value) * top[index].score,
        0
      ) / totalPosterior
      const informationGain = Math.max(0, binaryEntropy(yesProbability) - expectedNoise)
      const leaderValue = values[0] ?? 0.5
      const othersWeight = Math.max(totalPosterior - top[0].score, Number.EPSILON)
      const othersValue = values.slice(1).reduce(
        (total, value, index) => total + value * top[index + 1].score,
        0
      ) / othersWeight
      const confirmationBonus = askedQuestionIds.length >= 4 && askedQuestionIds.length % 4 === 0
        ? Math.abs(leaderValue - othersValue) * 0.18
        : 0
      const knownMass = rawValues.reduce<number>(
        (total, value, index) => total + (value === undefined ? 0 : top[index].score),
        0
      ) / totalPosterior
      return { question, usefulness: (informationGain + confirmationBonus) * knownMass * (question.importance ?? 1) }
    })
    .sort((a, b) => b.usefulness - a.usefulness)[0]?.question ?? null
}
