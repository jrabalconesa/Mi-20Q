export type Category = 'animal' | 'object' | 'place' | 'person'
export type AttributeValue = boolean | number
export type Answer = 'yes' | 'no' | 'sometimes' | 'unknown'

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
  openingOrder?: number
  importance?: number
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
  excludedCandidateIds: string[]
  questionCount: number
  status: 'playing' | 'guessing' | 'won' | 'lost'
}

export interface GameKnowledge {
  candidates: Candidate[]
  questions: Question[]
}

export interface LearningRecord {
  id: string
  name: string
  category: Category
  attributes: Record<string, AttributeValue>
  distinguishingQuestion: string
  learnedAnswer: boolean
  guessedCandidateId: string
  createdAt: string
}

export interface CandidateExperience {
  candidateId: string
  attributes: Record<string, { mean: number; samples: number }>
}
