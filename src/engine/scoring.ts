import type { Answer, AttributeValue, Candidate, Question, RankedCandidate } from '../types/game'
import { compareCandidateNames } from './nameComparison'

const answerWeights: Record<Answer, number> = {
  yes: 1,
  no: 0,
  sometimes: 0.5,
  unknown: 0.5
}

function normalizeAttribute(value: AttributeValue | undefined): number {
  if (typeof value === 'boolean') return value ? 1 : 0
  if (typeof value === 'number') return Math.max(0, Math.min(1, value))
  return 0.5
}

export function expectedValue(candidate: Candidate, question: Question): AttributeValue | undefined {
  if (question.kind === 'nameBefore' && question.pivotName) {
    return compareCandidateNames(candidate.name, question.pivotName) <= 0
  }
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
  const rawExpected = expectedValue(candidate, question)
  if (rawExpected === undefined) return 0.72
  const expected = normalizeAttribute(rawExpected)
  if (answer === 'yes') return 0.06 + expected * 0.9
  if (answer === 'no') return 0.06 + (1 - expected) * 0.9
  return 0.18 + (1 - Math.abs(expected - 0.5) * 2) * 0.76
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
    .sort((left, right) => right.score - left.score || compareCandidateNames(left.name, right.name))
}
