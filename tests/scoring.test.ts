import { describe, expect, it } from 'vitest'
import { ANSWER_EVIDENCE_WEIGHTS, answerLikelihood, answerToAttributeProbability, scoreAnswer } from '../src/engine/scoring'
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
  it('expone la matriz de evidencia bayesiana solicitada', () => {
    expect(ANSWER_EVIDENCE_WEIGHTS).toEqual({
      yes: 1,
      no: -1,
      sometimes: 0.4,
      unknown: 0,
    })
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

  it('trata atributos sin dato como evidencia neutra para cualquier respuesta', () => {
    const missingAttributeCandidate: Candidate = {
      ...candidate,
      attributes: {}
    }

    expect(answerLikelihood(missingAttributeCandidate, question, 'yes')).toBe(1)
    expect(answerLikelihood(missingAttributeCandidate, question, 'no')).toBe(1)
    expect(answerLikelihood(missingAttributeCandidate, question, 'sometimes')).toBe(1)
  })
})
