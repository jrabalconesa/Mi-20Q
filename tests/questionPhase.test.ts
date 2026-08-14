import { describe, expect, it } from 'vitest'
import { filterQuestionsByPhase } from '../src/engine/questionPhase'
import type { Question, RankedCandidate } from '../src/types/game'

const questions: Question[] = [
  { id: 'absolute', text: '¿Es real?', attribute: 'real', categories: ['person'], phase: 'absolute' },
  { id: 'segment', text: '¿Es artista?', attribute: 'artist', categories: ['person'] },
  { id: 'closing', text: '¿Usa seudónimo?', attribute: 'pseudonym', categories: ['person'], phase: 'closing' }
]

function candidates(count: number): RankedCandidate[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `candidate-${index}`,
    name: `Candidato ${index}`,
    category: 'person',
    attributes: {},
    score: 1 / count
  }))
}

describe('filterQuestionsByPhase', () => {
  it('prioriza preguntas absolutas durante los primeros turnos', () => {
    expect(filterQuestionsByPhase(questions, candidates(20), 2).map(question => question.id)).toEqual(['absolute'])
  })

  it('omite preguntas de cierre mientras el universo efectivo es grande', () => {
    expect(filterQuestionsByPhase(questions, candidates(80), 7).map(question => question.id)).toEqual(['absolute', 'segment'])
  })

  it('permite preguntas de cierre cuando el universo efectivo ya es pequeno', () => {
    expect(filterQuestionsByPhase(questions, candidates(3), 7).map(question => question.id)).toEqual(['absolute', 'segment', 'closing'])
  })
})
