import { describe, expect, it } from 'vitest'
import { createGame } from '../src/engine/gameEngine'
import { coreCandidates } from '../src/data/candidates'
import { questions } from '../src/data/questions'
import {
  createKnowledgeExport,
  mergeExperienceRecords,
  mergeLearningRecords,
  parseKnowledgeImport,
  serializeKnowledgeExport
} from '../src/knowledgeTransfer'
import { createLearningRecord } from '../src/learning'

const knowledge = { candidates: coreCandidates, questions }

describe('exportación e importación de conocimiento', () => {
  it('serializa y restaura aprendizaje y experiencia', () => {
    const lost = {
      ...createGame('animal', knowledge),
      status: 'lost' as const,
      guessCandidateId: 'elephant',
      answers: { animal_eggs: 'yes' as const }
    }
    const record = createLearningRecord(lost, 'Ornitorrinco', '¿Pone huevos?', true, '2026-01-01')
    const experience = [{
      candidateId: 'dog',
      attributes: { domestic: { mean: 0, samples: 2 } }
    }]
    const exported = createKnowledgeExport([record], experience, '2026-08-10T12:00:00.000Z')
    const parsed = parseKnowledgeImport(serializeKnowledgeExport(exported))

    expect(parsed.ok).toBe(true)
    if (!parsed.ok) return
    expect(parsed.learning[0].name).toBe('Ornitorrinco')
    expect(parsed.experience[0].candidateId).toBe('dog')
  })

  it('rechaza archivos inválidos o vacíos', () => {
    expect(parseKnowledgeImport('{')).toEqual({ ok: false, error: 'El archivo no contiene JSON válido.' })
    expect(parseKnowledgeImport(JSON.stringify({ version: 99 }))).toEqual({
      ok: false,
      error: 'Versión de exportación no compatible.'
    })
  })

  it('fusiona entradas por identificador sin duplicados', () => {
    const base = createLearningRecord(
      { ...createGame('animal', knowledge), status: 'lost', guessCandidateId: 'elephant', answers: {} },
      'Ornitorrinco',
      '¿Pone huevos?',
      true,
      '2026-01-01'
    )
    const updated = { ...base, name: 'Platypus' }
    const merged = mergeLearningRecords([base], [updated])
    expect(merged).toHaveLength(1)
    expect(merged[0].name).toBe('Platypus')

    const mergedExperience = mergeExperienceRecords(
      [{ candidateId: 'dog', attributes: { domestic: { mean: 0, samples: 1 } } }],
      [{ candidateId: 'dog', attributes: { domestic: { mean: 1, samples: 3 } } }]
    )
    expect(mergedExperience).toHaveLength(1)
    expect(mergedExperience[0].attributes.domestic.mean).toBe(1)
  })
})
