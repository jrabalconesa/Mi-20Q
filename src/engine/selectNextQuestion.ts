import type { Answer, Question, RankedCandidate } from '../types/game'
import { availableQuestions } from './questionAvailability'
import { rankAvailableQuestions } from './questionRanking'
import { expectedValue, normalizeAttribute } from './scoring'

function selectFallbackDiscriminator(
  questions: Question[],
  rankedCandidates: RankedCandidate[],
  askedQuestionIds: string[],
  answers: Record<string, Answer>
): Question | null {
  const activeCandidates = rankedCandidates.filter(candidate => candidate.score > 0)
  const candidatesTotal = activeCandidates.reduce((total, candidate) => total + candidate.score, 0)
  if (activeCandidates.length < 2 || candidatesTotal <= 0) return null

  const rankedFallbacks = availableQuestions(questions, askedQuestionIds, answers)
    .map(question => {
      let yesMass = 0
      let noMass = 0
      let knownMass = 0

      for (const candidate of activeCandidates) {
        const value = expectedValue(candidate, question)
        if (value === undefined) continue
        const probability = normalizeAttribute(value)
        knownMass += candidate.score
        yesMass += candidate.score * probability
        noMass += candidate.score * (1 - probability)
      }

      return {
        question,
        usefulness: Math.min(yesMass, noMass) * (knownMass / candidatesTotal) * (question.importance ?? 1)
      }
    })
    .filter(item => item.usefulness > 0)
    .sort((left, right) =>
      right.usefulness - left.usefulness || left.question.id.localeCompare(right.question.id)
    )

  return rankedFallbacks[0]?.question ?? null
}

export function selectNextQuestion(
  questions: Question[],
  rankedCandidates: RankedCandidate[],
  askedQuestionIds: string[],
  answers: Record<string, Answer> = {}
): Question | null {
  return rankAvailableQuestions(questions, rankedCandidates, askedQuestionIds, answers)[0]?.question ??
    selectFallbackDiscriminator(questions, rankedCandidates, askedQuestionIds, answers)
}
