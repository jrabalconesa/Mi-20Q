import type { Answer, AttributeValue, Candidate, Question, RankedCandidate } from '../types/game'

export const ANSWER_EVIDENCE_WEIGHTS: Record<Answer, number> = {
  yes: 1,
  no: -1,
  sometimes: 0.4,
  unknown: 0,
}

export const SMOOTHED_NO = 0.02
export const SMOOTHED_YES = 0.98
export const SMOOTHED_SOMETIMES = 0.5
const STRONG_EVIDENCE_SCALE = 0.45 / (SMOOTHED_YES * 2 - 1)

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

export function answerToAttributeProbability(answer: Answer): number | undefined {
  if (answer === 'unknown') return undefined
  if (answer === 'yes') return 0.95
  if (answer === 'no') return 0.05
  return 0.7
}

function probabilityToEvidence(value: number): number {
  return value * 2 - 1
}

export function scoreAnswer(candidate: Candidate, question: Question, answer: Answer): number {
  if (answer === 'unknown') return 0.5
  return answerLikelihood(candidate, question, answer)
}

export function answerLikelihood(candidate: Candidate, question: Question, answer: Answer): number {
  if (answer === 'unknown') return 1
  const expectedProbability = normalizeAttribute(expectedValue(candidate, question))
  if (answer === 'sometimes') {
    return clampProbability(0.72 + (1 - Math.abs(expectedProbability - SMOOTHED_SOMETIMES) * 2) * 0.18)
  }

  const expected = probabilityToEvidence(expectedProbability)
  const actual = ANSWER_EVIDENCE_WEIGHTS[answer]
  return clampProbability(0.5 + expected * actual * STRONG_EVIDENCE_SCALE)
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
