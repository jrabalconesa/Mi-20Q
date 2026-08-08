import { describe, expect, it } from 'vitest'
import { scoreAnswer } from '../src/engine/scoring'
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
  attribute: 'domestic'
}

describe('scoreAnswer', () => {
  it('da puntuación máxima a una respuesta coincidente', () => {
    expect(scoreAnswer(candidate, question, 'yes')).toBe(1)
  })

  it('penaliza una respuesta opuesta', () => {
    expect(scoreAnswer(candidate, question, 'no')).toBe(0)
  })

  it('trata no sé como respuesta neutral', () => {
    expect(scoreAnswer(candidate, question, 'unknown')).toBe(0.5)
  })
})
