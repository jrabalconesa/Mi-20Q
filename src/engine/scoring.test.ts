import { describe, expect, it } from 'vitest'
import type { Candidate, Question } from '../types/game'
import { rankCandidates } from './scoring'

const questions: Question[] = [
  {
    id: 'has_fur',
    text: '¿Tiene pelo?',
    attribute: 'hasFur',
    categories: ['animal'],
  },
  {
    id: 'barks',
    text: '¿Ladra?',
    attribute: 'barks',
    categories: ['animal'],
  },
  {
    id: 'domestic',
    text: '¿Es doméstico?',
    attribute: 'domestic',
    categories: ['animal'],
  },
  {
    id: 'small',
    text: '¿Es pequeño?',
    attribute: 'small',
    categories: ['animal'],
  },
]

const questionsById = Object.fromEntries(questions.map(question => [question.id, question]))

const candidates: Candidate[] = [
  {
    id: 'dog',
    name: 'Perro',
    category: 'animal',
    attributes: { hasFur: true, barks: true, domestic: true, small: true },
  },
  {
    id: 'wolf',
    name: 'Lobo',
    category: 'animal',
    attributes: { hasFur: true, barks: false, domestic: false, small: false },
  },
  {
    id: 'eagle',
    name: 'Águila',
    category: 'animal',
    attributes: { hasFur: false, barks: false, domestic: false, small: false },
  },
  {
    id: 'lizard',
    name: 'Lagarto',
    category: 'animal',
    attributes: { hasFur: false, barks: false, domestic: false, small: true },
  },
]

function scoreSum(scores: Array<{ score: number }>): number {
  return scores.reduce((total, candidate) => total + candidate.score, 0)
}

describe('scoring', () => {
  it('normaliza la probabilidad posterior tras aplicar respuestas bayesianas', () => {
    const rankedAfterOneAnswer = rankCandidates(candidates, questionsById, {
      has_fur: 'yes',
    })
    const rankedAfterSeveralAnswers = rankCandidates(candidates, questionsById, {
      has_fur: 'yes',
      barks: 'yes',
      domestic: 'yes',
      small: 'yes',
    })

    expect(scoreSum(rankedAfterOneAnswer)).toBeCloseTo(1, 12)
    expect(scoreSum(rankedAfterSeveralAnswers)).toBeCloseTo(1, 12)
    expect(rankedAfterSeveralAnswers.every(candidate =>
      Number.isFinite(candidate.score) && candidate.score >= 0
    )).toBe(true)
  })

  it('permite que un candidato claramente destacado supere el 90% de probabilidad', () => {
    const ranked = rankCandidates(candidates, questionsById, {
      has_fur: 'yes',
      barks: 'yes',
      domestic: 'yes',
      small: 'yes',
    })

    expect(ranked[0].id).toBe('dog')
    expect(ranked[0].score).toBeGreaterThan(0.9)
  })
})
