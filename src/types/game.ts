export type Category = 'animal' | 'object' | 'place' | 'person'
export type AttributeValue = boolean | number
export type Answer = 'yes' | 'probably_yes' | 'unknown' | 'probably_no' | 'no'

export interface Candidate {
  id: string
  name: string
  category: Category
  attributes: Record<string, AttributeValue>
}

export interface Question {
  id: string
  text: string
  attribute: string
  categories: Category[]
  kind?: 'attribute' | 'nameBefore'
  pivotName?: string
}

export interface RankedCandidate extends Candidate {
  score: number
}

export interface GameState {
  category: Category
  askedQuestionIds: string[]
  answers: Record<string, Answer>
  rankedCandidates: RankedCandidate[]
  currentQuestionId: string | null
  guessCandidateId: string | null
  questionCount: number
  status: 'playing' | 'guessing' | 'won' | 'lost'
}
