import { describe, expect, it } from 'vitest'
import type { Candidate, Question } from '../types/game'
import {
  MISSING_ATTRIBUTE_LIKELIHOOD,
  STRONG_MATCH_LIKELIHOOD,
  STRONG_MISMATCH_LIKELIHOOD,
  UNKNOWN_ANSWER_LIKELIHOOD,
  answerLikelihood,
  rankCandidates,
} from './scoring'

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

const missingAttributeCandidate: Candidate = {
  id: 'mystery',
  name: 'Animal misterioso',
  category: 'animal',
  attributes: {},
}

function scoreSum(scores: Array<{ score: number }>): number {
  return scores.reduce((total, candidate) => total + candidate.score, 0)
}

describe('scoring', () => {
  it('aplica la matriz de verosimilitud para Sí, No y No lo sé', () => {
    const hasFurQuestion = questionsById.has_fur
    const dog = candidates[0]
    const eagle = candidates[2]

    expect(answerLikelihood(dog, hasFurQuestion, 'yes')).toBe(STRONG_MATCH_LIKELIHOOD)
    expect(answerLikelihood(eagle, hasFurQuestion, 'yes')).toBe(STRONG_MISMATCH_LIKELIHOOD)
    expect(answerLikelihood(missingAttributeCandidate, hasFurQuestion, 'yes')).toBe(MISSING_ATTRIBUTE_LIKELIHOOD)

    expect(answerLikelihood(dog, hasFurQuestion, 'no')).toBe(STRONG_MISMATCH_LIKELIHOOD)
    expect(answerLikelihood(eagle, hasFurQuestion, 'no')).toBe(STRONG_MATCH_LIKELIHOOD)
    expect(answerLikelihood(missingAttributeCandidate, hasFurQuestion, 'no')).toBe(MISSING_ATTRIBUTE_LIKELIHOOD)

    expect(answerLikelihood(dog, hasFurQuestion, 'unknown')).toBe(UNKNOWN_ANSWER_LIKELIHOOD)
    expect(answerLikelihood(eagle, hasFurQuestion, 'unknown')).toBe(UNKNOWN_ANSWER_LIKELIHOOD)
    expect(answerLikelihood(missingAttributeCandidate, hasFurQuestion, 'unknown')).toBe(UNKNOWN_ANSWER_LIKELIHOOD)
  })

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

  it('mantiene la distribución relativa cuando la respuesta es No lo sé', () => {
    const rankedBeforeUnknown = rankCandidates(candidates, questionsById, {
      has_fur: 'yes',
    })
    const rankedAfterUnknown = rankCandidates(candidates, questionsById, {
      has_fur: 'yes',
      barks: 'unknown',
    })

    expect(rankedAfterUnknown.map(candidate => candidate.id)).toEqual(
      rankedBeforeUnknown.map(candidate => candidate.id)
    )
    expect(rankedAfterUnknown.map(candidate => candidate.score)).toEqual(
      rankedBeforeUnknown.map(candidate => candidate.score)
    )
  })
})
