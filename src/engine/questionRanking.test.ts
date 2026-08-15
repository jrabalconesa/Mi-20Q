import { describe, expect, it } from 'vitest'
import type { Question, RankedCandidate } from '../types/game'
import { rankAvailableQuestions, selectNextQuestion } from './questionRanking'

const questions: Question[] = [
  {
    id: 'is_mammal',
    text: '¿Es un mamífero?',
    attribute: 'mammal',
    categories: ['animal'],
    exclusiveGroup: 'animal-kind',
  },
  {
    id: 'is_bird',
    text: '¿Es un ave?',
    attribute: 'bird',
    categories: ['animal'],
    exclusiveGroup: 'animal-kind',
  },
  {
    id: 'is_domestic',
    text: '¿Suele vivir en casa?',
    attribute: 'domestic',
    categories: ['animal'],
  },
]

const rankedCandidates: RankedCandidate[] = [
  {
    id: 'dog',
    name: 'Perro',
    category: 'animal',
    score: 0.25,
    attributes: { mammal: true, bird: false, domestic: true },
  },
  {
    id: 'cat',
    name: 'Gato',
    category: 'animal',
    score: 0.25,
    attributes: { mammal: true, bird: false, domestic: false },
  },
  {
    id: 'owl',
    name: 'Búho',
    category: 'animal',
    score: 0.25,
    attributes: { mammal: false, bird: true, domestic: false },
  },
  {
    id: 'sparrow',
    name: 'Gorrión',
    category: 'animal',
    score: 0.25,
    attributes: { mammal: false, bird: true, domestic: false },
  },
]

describe('questionRanking', () => {
  it('descarta preguntas del mismo grupo exclusivo tras responder Sí a una de ellas', () => {
    const initialRanking = rankAvailableQuestions(questions, rankedCandidates, [])
    const initialBirdInformationGain = initialRanking.find(score =>
      score.question.id === 'is_bird'
    )?.informationGain ?? 0

    expect(initialBirdInformationGain).toBeGreaterThan(0.01)

    const rankingAfterExclusiveYes = rankAvailableQuestions(
      questions,
      rankedCandidates,
      ['is_mammal'],
      { is_mammal: 'yes' }
    )
    const birdInformationGainAfterYes = rankingAfterExclusiveYes.find(score =>
      score.question.id === 'is_bird'
    )?.informationGain ?? 0

    expect(birdInformationGainAfterYes).toBe(0)
    expect(rankingAfterExclusiveYes.map(score => score.question.id)).not.toContain('is_bird')
    expect(selectNextQuestion(
      questions,
      rankedCandidates,
      ['is_mammal'],
      { is_mammal: 'yes' }
    )?.id).not.toBe('is_bird')
  })
})
