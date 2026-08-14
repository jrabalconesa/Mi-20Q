import { describe, expect, it } from 'vitest'
import { SMOOTHED_NO, scoreAnswer } from '../src/engine/scoring'
import type { Candidate, Question } from '../src/types/game'

const candidate: Candidate = {
  id: 'dog',
  name: 'Perro',
  category: 'animal',
  attributes: { domestic: true }
}

const question: Question = {
  id: 'domestic',
  text: '¿Es doméstico?',
  attribute: 'domestic',
  categories: ['animal']
}

describe('scoreAnswer', () => {
  it('da puntuación máxima a una respuesta coincidente', () => {
    expect(scoreAnswer(candidate, question, 'yes')).toBe(1)
  })

  it('penaliza una respuesta opuesta', () => {
    expect(scoreAnswer(candidate, question, 'no')).toBeCloseTo(SMOOTHED_NO * 2)
  })

  it('trata no sé como respuesta neutral', () => {
    expect(scoreAnswer(candidate, question, 'unknown')).toBe(0.5)
  })
})
