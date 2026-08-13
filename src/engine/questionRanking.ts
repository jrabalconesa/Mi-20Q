import type { Answer, Question, RankedCandidate } from '../types/game'
import { availableQuestions } from './questionAvailability'
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

export interface QuestionScore {
  question: Question
  usefulness: number
  informationGain: number
  confirmationBonus: number
  knownMass: number
  yesProbability: number
  scriptedOpening: boolean
}

function candidatePool(rankedCandidates: RankedCandidate[]): RankedCandidate[] {
  const bestScore = rankedCandidates[0]?.score
  const tiedLeaders = bestScore === undefined
    ? []
    : rankedCandidates.filter(candidate => Math.abs(candidate.score - bestScore) < 0.000_000_001)
  return tiedLeaders.length >= 2
    ? tiedLeaders
    : rankedCandidates.slice(0, Math.min(256, rankedCandidates.length))
}

export function rankAvailableQuestions(
  questions: Question[],
  rankedCandidates: RankedCandidate[],
  askedQuestionIds: string[],
  answers: Record<string, Answer> = {}
): QuestionScore[] {
  const available = availableQuestions(questions, askedQuestionIds, answers)
  const top = candidatePool(rankedCandidates)
  if (!available.length || !top.length) return []

  const totalPosterior = top.reduce((total, candidate) => total + candidate.score, 0) || 1
  const openingIndex = askedQuestionIds.length + 1

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
      const usefulness = (informationGain + confirmationBonus) * knownMass * (question.importance ?? 1)
      return {
        question,
        usefulness,
        informationGain,
        confirmationBonus,
        knownMass,
        yesProbability,
        scriptedOpening: question.openingOrder === openingIndex
      }
    })
    .sort((left, right) => right.usefulness - left.usefulness)
}

export function selectNextQuestion(
  questions: Question[],
  rankedCandidates: RankedCandidate[],
  askedQuestionIds: string[],
  answers: Record<string, Answer> = {}
): Question | null {
  const ranked = rankAvailableQuestions(questions, rankedCandidates, askedQuestionIds, answers)
  const scriptedOpening = ranked.find(entry => entry.scriptedOpening)
  if (scriptedOpening) return scriptedOpening.question
  return ranked[0]?.question ?? null
}
