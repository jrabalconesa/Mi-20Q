import { describe, expect, it } from 'vitest'
import { loadCategoryKnowledge } from '../src/data/catalog'
import { validateCatalog } from '../src/engine/catalogValidation'

describe('catalog', () => {
  it('enriquece los objetos con conocimiento derivado', async () => {
    const knowledge = await loadCategoryKnowledge('object')
    const guitar = knowledge.candidates.find(candidate => candidate.name === 'Guitarra')
    const phone = knowledge.candidates.find(candidate => candidate.name === 'Teléfono móvil')

    expect(guitar?.attributes.musicalInstrument).toBe(true)
    expect(guitar?.attributes.portable).toBe(true)
    expect(guitar?.attributes.indoors).toBe(true)
    expect(guitar?.attributes.largerThanShoebox).toBe(true)
    expect(phone?.attributes.largerThanShoebox).toBe(false)
  })

  it('incluye la pregunta de caja de zapatos para animales y objetos', async () => {
    const animalKnowledge = await loadCategoryKnowledge('animal')
    const objectKnowledge = await loadCategoryKnowledge('object')
    const dog = animalKnowledge.candidates.find(candidate => candidate.name === 'Perro')
    const bee = animalKnowledge.candidates.find(candidate => candidate.name === 'Abeja')

    expect(animalKnowledge.questions).toContainEqual(expect.objectContaining({
      attribute: 'largerThanShoebox',
      text: '¿Es más grande que una caja de zapatos?'
    }))
    expect(objectKnowledge.questions).toContainEqual(expect.objectContaining({
      attribute: 'largerThanShoebox',
      text: '¿Es más grande que una caja de zapatos?'
    }))
    expect(dog?.attributes.largerThanShoebox).toBe(true)
    expect(bee?.attributes.largerThanShoebox).toBe(false)
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
