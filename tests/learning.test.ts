import { describe, expect, it } from 'vitest'
import { buildKnowledge, createLearningRecord, readLearning } from '../src/learning'
import { createGame } from '../src/engine/gameEngine'
import { coreCandidates } from '../src/data/candidates'
import { questions } from '../src/data/questions'
import { SMOOTHED_YES } from '../src/engine/scoring'

describe('aprendizaje local', () => {
  it('convierte una derrota en un candidato y una pregunta diferenciadora', () => {
    const baseKnowledge = { candidates: coreCandidates, questions }
    const base = createGame('animal', baseKnowledge)
    const lost = {
      ...base,
      status: 'lost' as const,
      guessCandidateId: 'elephant',
      answers: { animal_mammal: 'yes' as const }
    }
    const record = createLearningRecord(lost, 'Ornitorrinco', '¿Es un mamífero que pone huevos', true, '2026-01-01')
    const knowledge = buildKnowledge([record], baseKnowledge)
    const learned = knowledge.candidates.find(candidate => candidate.id === record.id)

    expect(record.distinguishingQuestion).toBe('¿Es un mamífero que pone huevos?')
    expect(learned?.attributes.mammal).toBe(SMOOTHED_YES)
    expect(knowledge.questions).toContainEqual(expect.objectContaining({ id: `question:${record.id}` }))
    expect(knowledge.candidates.find(candidate => candidate.id === 'elephant')?.attributes[`learned:${record.id}`]).toBe(false)
  })

  it('descarta datos locales corruptos', () => {
    expect(readLearning({ getItem: () => '{' })).toEqual([])
  })
})
