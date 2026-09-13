import { describe, expect, it } from 'vitest'
import type { Question, RankedCandidate } from '../src/types/game'
import { rankAvailableQuestions } from '../src/engine/questionRanking'
import { selectNextQuestion } from '../src/engine/selectNextQuestion'

describe('selectNextQuestion fallback', () => {
  it('conserva una pregunta que separa candidatos aunque no alcance el umbral general', () => {
    const question: Question = {
      id: 'rare_discriminator',
      text: '¿Tiene el rasgo que separa las alternativas?',
      attribute: 'rareMarker',
      categories: ['object']
    }
    const candidates: RankedCandidate[] = Array.from({ length: 100 }, (_, index) => ({
      id: `candidate-${index}`,
      name: `Candidato ${index}`,
      category: 'object',
      attributes: { rareMarker: index === 0 },
      score: 0.01
    }))

    expect(rankAvailableQuestions([question], candidates, [], {})).toEqual([])
    expect(selectNextQuestion([question], candidates, [], {})?.id).toBe(question.id)
  })
})
