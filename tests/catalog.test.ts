import { describe, expect, it } from 'vitest'
import { loadCategoryKnowledge } from '../src/data/catalog'
import { validateCatalog } from '../src/engine/catalogValidation'

describe('catalog', () => {
  it('enriquece los objetos con conocimiento derivado', async () => {
    const knowledge = await loadCategoryKnowledge('object')
    const guitar = knowledge.candidates.find(candidate => candidate.name === 'Guitarra')

    expect(guitar?.attributes.musicalInstrument).toBe(true)
    expect(guitar?.attributes.portable).toBe(true)
    expect(guitar?.attributes.indoors).toBe(true)
  })

  it('valida tamano y duplicados del catalogo base', async () => {
    const categories = ['animal', 'object', 'place', 'person'] as const
    const knowledge = await Promise.all(categories.map(loadCategoryKnowledge))
    const candidates = knowledge.flatMap(category => category.candidates)
    const questions = knowledge.flatMap(category => category.questions)

    const issues = validateCatalog(candidates, questions, [...categories], { minCoverage: 0 })

    expect(issues).toEqual([])
  })
})
