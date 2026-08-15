import type { Answer, Question, RankedCandidate } from '../types/game'
import { availableQuestions } from './questionAvailability'
import { filterQuestionsByPhase } from './questionPhase'
import { expectedValue, normalizeAttribute } from './scoring'

export interface QuestionScore {
  question: Question
  usefulness: number
  informationGain: number
  currentEntropy: number
  expectedEntropy: number
  knownMass: number
  yesProbability: number
  noProbability: number
  scriptedOpening: boolean
}

function positiveActiveCandidates(rankedCandidates: RankedCandidate[]): RankedCandidate[] {
  return rankedCandidates.filter(candidate => candidate.score > 0)
}

function totalScore(rankedCandidates: RankedCandidate[]): number {
  return rankedCandidates.reduce((total, candidate) => total + candidate.score, 0)
}

function sumWeights(weights: number[]): number {
  return weights.reduce((total, weight) => total + weight, 0)
}

function entropyFromWeights(weights: number[]): number {
  const total = sumWeights(weights)
  if (total <= 0) return 0

  return weights.reduce((entropy, weight) => {
    if (weight <= 0) return entropy
    const probability = weight / total
    return entropy - probability * Math.log2(probability)
  }, 0)
}

export function calculateQuestionInformationGain(
  question: Question,
  rankedCandidates: RankedCandidate[]
): Omit<QuestionScore, 'question' | 'usefulness' | 'scriptedOpening'> {
  const activeCandidates = positiveActiveCandidates(rankedCandidates)
  const activeTotal = totalScore(activeCandidates)
  if (!activeCandidates.length || activeTotal <= 0) {
    return {
      informationGain: 0,
      currentEntropy: 0,
      expectedEntropy: 0,
      knownMass: 0,
      yesProbability: 0,
      noProbability: 0
    }
  }

  const currentWeights = activeCandidates.map(candidate => candidate.score)
  const currentEntropy = entropyFromWeights(currentWeights)
  const yesWeights = activeCandidates.map(candidate =>
    candidate.score * normalizeAttribute(expectedValue(candidate, question))
  )
  const noWeights = activeCandidates.map(candidate =>
    candidate.score * (1 - normalizeAttribute(expectedValue(candidate, question)))
  )
  const yesProbability = sumWeights(yesWeights) / activeTotal
  const noProbability = sumWeights(noWeights) / activeTotal
  const yesEntropy = entropyFromWeights(yesWeights)
  const noEntropy = entropyFromWeights(noWeights)
  const expectedEntropy = yesProbability * yesEntropy + noProbability * noEntropy
  const knownMass = activeCandidates.reduce((total, candidate) =>
    expectedValue(candidate, question) === undefined ? total : total + candidate.score,
  0) / activeTotal

  return {
    informationGain: Math.max(0, currentEntropy - expectedEntropy),
    currentEntropy,
    expectedEntropy,
    knownMass,
    yesProbability,
    noProbability
  }
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
  if (!available.length || !rankedCandidates.length) return []

  return available
    .map(question => {
      const metrics = calculateQuestionInformationGain(question, rankedCandidates)
      return {
        question,
        usefulness: metrics.informationGain * (question.importance ?? 1),
        ...metrics,
        scriptedOpening: false
      }
    })
    .sort((left, right) =>
      right.usefulness - left.usefulness ||
      right.informationGain - left.informationGain ||
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
