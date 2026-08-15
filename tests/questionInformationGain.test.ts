import { describe, expect, it } from 'vitest'
import { calculateQuestionInformationGain, rankAvailableQuestions } from '../src/engine/questionRanking'
import type { Question, RankedCandidate } from '../src/types/game'

const splitQuestion: Question = {
  id: 'is_red',
  text: '¿Es rojo?',
  attribute: 'red',
  categories: ['object']
}

const commonQuestion: Question = {
  id: 'is_tangible',
  text: '¿Es tangible?',
  attribute: 'tangible',
  categories: ['object']
}

const rareQuestion: Question = {
  id: 'is_fragile',
  text: '¿Es frágil?',
  attribute: 'fragile',
  categories: ['object']
}

const activeCandidates: RankedCandidate[] = [
  {
    id: 'red_ball',
    name: 'Balón rojo',
    category: 'object',
    score: 0.25,
    attributes: { red: true, tangible: true, fragile: true }
  },
  {
    id: 'red_cup',
    name: 'Taza roja',
    category: 'object',
    score: 0.25,
    attributes: { red: true, tangible: true, fragile: false }
  },
  {
    id: 'blue_book',
    name: 'Libro azul',
    category: 'object',
    score: 0.25,
    attributes: { red: false, tangible: true, fragile: false }
  },
  {
    id: 'blue_box',
    name: 'Caja azul',
    category: 'object',
    score: 0.25,
    attributes: { red: false, tangible: true, fragile: false }
  }
]

describe('calculateQuestionInformationGain', () => {
  it('calcula alta ganancia para una pregunta que divide el subconjunto activo', () => {
    const metrics = calculateQuestionInformationGain(splitQuestion, activeCandidates)

    expect(metrics.currentEntropy).toBeCloseTo(2)
    expect(metrics.yesProbability).toBeCloseTo(0.5)
    expect(metrics.noProbability).toBeCloseTo(0.5)
    expect(metrics.informationGain).toBeGreaterThan(0.8)
  })

  it('devuelve ganancia cero cuando la pregunta no discrimina candidatos activos', () => {
    const metrics = calculateQuestionInformationGain(commonQuestion, activeCandidates)

    expect(metrics.informationGain).toBeCloseTo(0)
    expect(metrics.expectedEntropy).toBeCloseTo(metrics.currentEntropy)
  })

  it('ordena las preguntas disponibles por ganancia de informacion ponderada', () => {
    const ranked = rankAvailableQuestions(
      [commonQuestion, rareQuestion, splitQuestion],
      activeCandidates,
      ['is_fragile'],
      { is_fragile: 'no' }
    )

    expect(ranked[0].question.id).toBe('is_red')
    expect(ranked.map(score => score.question.id)).not.toContain('is_fragile')
    expect(ranked[0].informationGain).toBeGreaterThan(0.8)
  })
})
