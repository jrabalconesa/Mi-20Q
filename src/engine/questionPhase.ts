import type { Question, RankedCandidate } from '../types/game'

export function effectiveCandidateCount(rankedCandidates: RankedCandidate[]): number {
  let cumulative = 0
  for (let index = 0; index < rankedCandidates.length; index += 1) {
    cumulative += rankedCandidates[index].score
    if (cumulative >= 0.95) return index + 1
  }
  return rankedCandidates.length
}

export function filterQuestionsByPhase(
  questions: Question[],
  rankedCandidates: RankedCandidate[],
  askedQuestionCount: number
): Question[] {
  const effectiveCount = effectiveCandidateCount(rankedCandidates)

  if (askedQuestionCount < 6) {
    const absolutes = questions.filter(question => question.phase === 'absolute')
    if (absolutes.length) return absolutes
  }

  if (effectiveCount > 50) {
    const broadQuestions = questions.filter(question => question.phase !== 'closing')
    if (broadQuestions.length) return broadQuestions
  }

  return questions
}
