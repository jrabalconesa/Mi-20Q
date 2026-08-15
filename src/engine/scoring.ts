import type { Answer, AttributeValue, Candidate, Question, RankedCandidate } from '../types/game'

export const SMOOTHED_NO = 0.02
export const SMOOTHED_YES = 0.98
export const SMOOTHED_SOMETIMES = 0.5
export const STRONG_MATCH_LIKELIHOOD = 0.95
export const STRONG_MISMATCH_LIKELIHOOD = 0.05
export const MISSING_ATTRIBUTE_LIKELIHOOD = 0.3
export const UNKNOWN_ANSWER_LIKELIHOOD = 0.5

function clampProbability(value: number): number {
  return Math.max(SMOOTHED_NO, Math.min(SMOOTHED_YES, value))
}

export function normalizeAttribute(value: AttributeValue | null | undefined): number {
  if (typeof value === 'boolean') return value ? SMOOTHED_YES : SMOOTHED_NO
  if (typeof value === 'number') return clampProbability(value)
  return 0.5
}

export function expectedValue(candidate: Candidate, question: Question): AttributeValue | undefined {
  const value = candidate.attributes[question.attribute] as AttributeValue | null | undefined
  return value === null ? undefined : value
}

export function answerToAttributeProbability(answer: Answer): number | undefined {
  if (answer === 'unknown') return undefined
  if (answer === 'yes') return 0.95
  if (answer === 'no') return 0.05
  return 0.7
}

export function scoreAnswer(candidate: Candidate, question: Question, answer: Answer): number {
  if (answer === 'unknown') return 0.5
  return answerLikelihood(candidate, question, answer)
}

export function answerLikelihood(candidate: Candidate, question: Question, answer: Answer): number {
  if (answer === 'unknown') return UNKNOWN_ANSWER_LIKELIHOOD
  const expectedAttribute = expectedValue(candidate, question)
  if (expectedAttribute === undefined) return answer === 'sometimes'
    ? SMOOTHED_SOMETIMES
    : MISSING_ATTRIBUTE_LIKELIHOOD

  const expectedProbability = normalizeAttribute(expectedAttribute)
  if (answer === 'sometimes') {
    return clampProbability(0.72 + (1 - Math.abs(expectedProbability - SMOOTHED_SOMETIMES) * 2) * 0.18)
  }

  if (typeof expectedAttribute === 'boolean') {
    const matchesAnswer = answer === 'yes' ? expectedAttribute : !expectedAttribute
    return matchesAnswer ? STRONG_MATCH_LIKELIHOOD : STRONG_MISMATCH_LIKELIHOOD
  }

  if (answer === 'yes') return expectedProbability
  return 1 - expectedProbability
}

export function candidateSetEntropy(rankedCandidates: RankedCandidate[]): number {
  return rankedCandidates.reduce((entropy, candidate) => {
    if (candidate.score <= 0) return entropy
    return entropy - candidate.score * Math.log2(candidate.score)
  }, 0)
}

function normalizePosteriorScores(scores: number[]): number[] {
  const totalScore = scores.reduce((total, score) => total + score, 0)
  if (totalScore <= 0) return scores.map(() => 0)
  return scores.map(score => score / totalScore)
}

function uniformPrior(candidateCount: number): number[] {
  if (candidateCount <= 0) return []
  return Array.from({ length: candidateCount }, () => 1 / candidateCount)
}

function applyBayesianAnswerUpdate(
  priorScores: number[],
  candidates: Candidate[],
  question: Question,
  answer: Answer
): number[] {
  const posteriorNumerators = candidates.map((candidate, index) =>
    answerLikelihood(candidate, question, answer) * priorScores[index]
  )
  return normalizePosteriorScores(posteriorNumerators)
}

export function rankCandidates(
  candidates: Candidate[],
  questionsById: Record<string, Question>,
  answers: Record<string, Answer>
): RankedCandidate[] {
  const posteriorScores = Object.entries(answers).reduce((scores, [questionId, answer]) => {
    const question = questionsById[questionId]
    return question ? applyBayesianAnswerUpdate(scores, candidates, question, answer) : scores
  }, uniformPrior(candidates.length))

  return candidates
    .map((candidate, index) => ({ ...candidate, score: posteriorScores[index] ?? 0 }))
    .sort((left, right) => right.score - left.score)
}
