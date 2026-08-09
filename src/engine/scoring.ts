import type { Answer, AttributeValue, Candidate, Question, RankedCandidate } from '../types/game'
import { compareCandidateNames } from './nameComparison'

const answerWeights: Record<Answer, number> = {
  yes: 1,
  probably_yes: 0.75,
  unknown: 0.5,
  probably_no: 0.25,
  no: 0
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
  const expected = normalizeAttribute(expectedValue(candidate, question))
  const actual = answerWeights[answer]
  return 1 - Math.abs(expected - actual)
}

export function rankCandidates(
  candidates: Candidate[],
  questionsById: Record<string, Question>,
  answers: Record<string, Answer>
): RankedCandidate[] {
  return candidates
    .map(candidate => {
      const scores = Object.entries(answers).map(([questionId, answer]) => {
        const question = questionsById[questionId]
        return question ? scoreAnswer(candidate, question, answer) : 0.5
      })
      const score = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0.5
      return { ...candidate, score }
    })
    .sort((a, b) => b.score - a.score)
}
