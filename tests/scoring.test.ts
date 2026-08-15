import { describe, expect, it } from 'vitest'
import {
  MISSING_ATTRIBUTE_LIKELIHOOD,
  STRONG_MATCH_LIKELIHOOD,
  STRONG_MISMATCH_LIKELIHOOD,
  UNKNOWN_ANSWER_LIKELIHOOD,
  answerLikelihood,
  answerToAttributeProbability,
  scoreAnswer
} from '../src/engine/scoring'
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
  it('expone la matriz de verosimilitud bayesiana solicitada', () => {
    expect(STRONG_MATCH_LIKELIHOOD).toBe(0.95)
    expect(STRONG_MISMATCH_LIKELIHOOD).toBe(0.05)
    expect(MISSING_ATTRIBUTE_LIKELIHOOD).toBe(0.3)
    expect(UNKNOWN_ANSWER_LIKELIHOOD).toBe(0.5)
  })

  it('convierte respuestas con evidencia a probabilidades aprendibles', () => {
    expect(answerToAttributeProbability('yes')).toBeCloseTo(0.95)
    expect(answerToAttributeProbability('no')).toBeCloseTo(0.05)
    expect(answerToAttributeProbability('sometimes')).toBeCloseTo(0.7)
    expect(answerToAttributeProbability('unknown')).toBeUndefined()
  })

  it('da alta verosimilitud a una respuesta coincidente', () => {
    expect(scoreAnswer(candidate, question, 'yes')).toBeCloseTo(0.95)
  })

  it('da baja verosimilitud a una respuesta opuesta fuerte', () => {
    expect(answerLikelihood(candidate, question, 'no')).toBeCloseTo(0.05)
  })

  it('trata a veces como evidencia parcial suave', () => {
    expect(answerLikelihood(candidate, question, 'no')).toBeLessThan(answerLikelihood(candidate, question, 'sometimes'))
    expect(answerLikelihood(candidate, question, 'sometimes')).toBeGreaterThan(0.7)
  })

  it('trata no sé como respuesta neutral', () => {
    expect(scoreAnswer(candidate, question, 'unknown')).toBe(0.5)
  })

  it('trata atributos sin dato como penalización suave para sí y no', () => {
    const missingAttributeCandidate: Candidate = {
      ...candidate,
      attributes: {}
    }

    expect(answerLikelihood(missingAttributeCandidate, question, 'yes')).toBe(MISSING_ATTRIBUTE_LIKELIHOOD)
    expect(answerLikelihood(missingAttributeCandidate, question, 'no')).toBe(MISSING_ATTRIBUTE_LIKELIHOOD)
    expect(answerLikelihood(missingAttributeCandidate, question, 'sometimes')).toBe(0.5)
    expect(answerLikelihood(missingAttributeCandidate, question, 'unknown')).toBe(UNKNOWN_ANSWER_LIKELIHOOD)
  })
})
