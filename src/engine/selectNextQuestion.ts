import type { Answer, Question, RankedCandidate } from '../types/game'
import { rankAvailableQuestions } from './questionRanking'

export function selectNextQuestion(
  questions: Question[],
  rankedCandidates: RankedCandidate[],
  askedQuestionIds: string[],
  answers: Record<string, Answer> = {}
): Question | null {
  return rankAvailableQuestions(questions, rankedCandidates, askedQuestionIds, answers)[0]?.question ?? null
}
