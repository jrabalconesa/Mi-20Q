import type { Answer, AttributeValue, Candidate, Question, RankedCandidate } from '../types/game'

const answerWeights: Record<Answer, number> = {
  yes: 0.98,
  no: 0.02,
  sometimes: 0.5,
  unknown: 0.5
}

export const SMOOTHED_NO = 0.02
export const SMOOTHED_YES = 0.98
export const SMOOTHED_SOMETIMES = 0.5

function clampProbability(value: number): number {
  return Math.max(SMOOTHED_NO, Math.min(SMOOTHED_YES, value))
}

export function normalizeAttribute(value: AttributeValue | undefined): number {
  if (typeof value === 'boolean') return value ? SMOOTHED_YES : SMOOTHED_NO
  if (typeof value === 'number') return clampProbability(value)
  return 0.5
}

export function expectedValue(candidate: Candidate, question: Question): AttributeValue | undefined {
  return candidate.attributes[question.attribute]
}

export function scoreAnswer(candidate: Candidate, question: Question, answer: Answer): number {
  if (answer === 'unknown') return 0.5
  const expected = normalizeAttribute(expectedValue(candidate, question))
  const actual = answerWeights[answer]
  return 1 - Math.abs(expected - actual)
}

export function answerLikelihood(candidate: Candidate, question: Question, answer: Answer): number {
  if (answer === 'unknown') return 1
  const expected = normalizeAttribute(expectedValue(candidate, question))
  const actual = answerWeights[answer]
  return clampProbability(1 - Math.abs(expected - actual))
}

export function candidateSetEntropy(rankedCandidates: RankedCandidate[]): number {
  return rankedCandidates.reduce((entropy, candidate) => {
    if (candidate.score <= 0) return entropy
    return entropy - candidate.score * Math.log2(candidate.score)
  }, 0)
}

export function rankCandidates(
  candidates: Candidate[],
  questionsById: Record<string, Question>,
  answers: Record<string, Answer>
): RankedCandidate[] {
  const evidence = Object.entries(answers).filter(([, answer]) => answer !== 'unknown')
  const logScores = candidates.map(candidate => evidence.reduce((total, [questionId, answer]) => {
    const question = questionsById[questionId]
    return question ? total + Math.log(answerLikelihood(candidate, question, answer)) : total
  }, 0))
  const bestLogScore = Math.max(...logScores, 0)
  const weights = logScores.map(score => Math.exp(score - bestLogScore))
  const totalWeight = weights.reduce((total, weight) => total + weight, 0) || 1

  return candidates
    .map((candidate, index) => ({ ...candidate, score: weights[index] / totalWeight }))
    .sort((left, right) => right.score - left.score)
}
