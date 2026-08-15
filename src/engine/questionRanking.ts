import type { Answer, Question, RankedCandidate } from '../types/game'
import { availableQuestions } from './questionAvailability'
import { filterQuestionsByPhase } from './questionPhase'
import { expectedValue, normalizeAttribute } from './scoring'

export const MIN_INFORMATION_GAIN = 0.01
export const MIN_DISCRIMINATED_CANDIDATE_MASS = 0.05
export const MIN_ATTRIBUTE_COVERAGE = 0.3

export interface QuestionScore {
  question: Question
  usefulness: number
  informationGain: number
  currentEntropy: number
  expectedEntropy: number
  knownMass: number
  realCoverage: number
  yesProbability: number
  noProbability: number
  discriminatedCandidateMass: number
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
      realCoverage: 0,
      yesProbability: 0,
      noProbability: 0,
      discriminatedCandidateMass: 0
    }
  }

  const currentWeights = activeCandidates.map(candidate => candidate.score)
  const currentEntropy = entropyFromWeights(currentWeights)
  const knownCandidates = activeCandidates.filter(candidate => expectedValue(candidate, question) !== undefined)
  const booleanKnownCandidates = activeCandidates.filter(candidate => {
    const value = expectedValue(candidate, question)
    return value === true || value === false
  })
  const knownTotal = totalScore(knownCandidates)
  const knownMass = knownTotal / activeTotal
  const realCoverage = booleanKnownCandidates.length / activeCandidates.length
  if (realCoverage < MIN_ATTRIBUTE_COVERAGE || knownTotal <= 0) {
    return {
      informationGain: 0,
      currentEntropy,
      expectedEntropy: currentEntropy,
      knownMass,
      realCoverage,
      yesProbability: 0,
      noProbability: 0,
      discriminatedCandidateMass: 0
    }
  }

  const yesWeights = knownCandidates.map(candidate =>
    candidate.score * normalizeAttribute(expectedValue(candidate, question))
  )
  const noWeights = knownCandidates.map(candidate =>
    candidate.score * (1 - normalizeAttribute(expectedValue(candidate, question)))
  )
  const yesProbability = sumWeights(yesWeights) / knownTotal
  const noProbability = sumWeights(noWeights) / knownTotal
  const yesEntropy = entropyFromWeights(yesWeights)
  const noEntropy = entropyFromWeights(noWeights)
  const expectedEntropy = yesProbability * yesEntropy + noProbability * noEntropy
  const knownEntropy = entropyFromWeights(knownCandidates.map(candidate => candidate.score))
  const knownInformationGain = Math.max(0, knownEntropy - expectedEntropy)
  const informationGain = knownInformationGain * knownMass * realCoverage
  const discriminatedCandidateMass = Math.min(sumWeights(yesWeights), sumWeights(noWeights)) / activeTotal

  return {
    informationGain,
    currentEntropy,
    expectedEntropy: Math.max(0, currentEntropy - informationGain),
    knownMass,
    realCoverage,
    yesProbability,
    noProbability,
    discriminatedCandidateMass
  }
}

function isDiscriminatingQuestion(metrics: Omit<QuestionScore, 'question' | 'usefulness' | 'scriptedOpening'>): boolean {
  return metrics.realCoverage >= MIN_ATTRIBUTE_COVERAGE &&
    metrics.informationGain > MIN_INFORMATION_GAIN &&
    metrics.discriminatedCandidateMass >= MIN_DISCRIMINATED_CANDIDATE_MASS
}

function scoreQuestions(questions: Question[], rankedCandidates: RankedCandidate[]): QuestionScore[] {
  return questions
    .map(question => {
      const metrics = calculateQuestionInformationGain(question, rankedCandidates)
      return {
        question,
        usefulness: metrics.informationGain * (question.importance ?? 1),
        ...metrics,
        scriptedOpening: false
      }
    })
    .filter(score => isDiscriminatingQuestion(score))
    .sort((left, right) =>
      right.usefulness - left.usefulness ||
      right.informationGain - left.informationGain ||
      left.question.id.localeCompare(right.question.id)
    )
}

export function rankAvailableQuestions(
  questions: Question[],
  rankedCandidates: RankedCandidate[],
  askedQuestionIds: string[],
  answers: Record<string, Answer> = {}
): QuestionScore[] {
  const available = availableQuestions(questions, askedQuestionIds, answers)
  const phaseFiltered = filterQuestionsByPhase(
    available,
    rankedCandidates,
    askedQuestionIds.length
  )
  if (!phaseFiltered.length || !rankedCandidates.length) return []

  const ranked = scoreQuestions(phaseFiltered, rankedCandidates)
  return ranked.length || phaseFiltered.length === available.length
    ? ranked
    : scoreQuestions(available, rankedCandidates)
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
