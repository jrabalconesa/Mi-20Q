import { describe, expect, it } from 'vitest'
import { loadCategoryKnowledge } from '../src/data/catalog'
import { rankCandidates } from '../src/engine/scoring'
import type { GameKnowledge } from '../src/types/game'

function rank(knowledge: GameKnowledge, answers: Record<string, 'yes' | 'no'>) {
  const questionsById = Object.fromEntries(knowledge.questions.map(question => [question.id, question]))
  return rankCandidates(knowledge.candidates, questionsById, answers)
}

describe('strict category filtering', () => {
  it('no propone objetos que no sean vehiculos tras confirmar vehiculo', async () => {
    const knowledge = await loadCategoryKnowledge('object')
    const ranked = rank(knowledge, { object_vehicle: 'yes' })
    const viable = ranked.filter(candidate => candidate.score > 0)

    expect(viable.length).toBeGreaterThan(0)
    expect(viable.every(candidate => candidate.attributes.vehicle === true)).toBe(true)
    expect(ranked.find(candidate => candidate.name === 'Cuchara')?.score).toBe(0)
  })

  it('separa alimentos y cubiertos de objetos incompatibles', async () => {
    const knowledge = await loadCategoryKnowledge('object')
    const edible = rank(knowledge, { object_edible: 'yes' }).filter(candidate => candidate.score > 0)
    const cutlery = rank(knowledge, { object_cutlery: 'yes' }).filter(candidate => candidate.score > 0)

    expect(edible.length).toBeGreaterThan(0)
    expect(edible.every(candidate => candidate.attributes.edible === true)).toBe(true)
    expect(cutlery.length).toBeGreaterThan(0)
    expect(cutlery.every(candidate => candidate.attributes.cutlery === true)).toBe(true)
  })

  it('excluye lugares extranjeros tras confirmar que estan en Espana', async () => {
    const knowledge = await loadCategoryKnowledge('place')
    const ranked = rank(knowledge, { place_in_spain: 'yes' })

    expect(ranked.find(candidate => candidate.name === 'Madrid')?.score).toBeGreaterThan(0)
    expect(ranked.find(candidate => candidate.name === 'París')?.score).toBe(0)
    expect(ranked.filter(candidate => candidate.score > 0)
      .every(candidate => candidate.attributes.inSpain !== false)).toBe(true)
  })

  it('respeta continente y tipo geografico confirmados', async () => {
    const knowledge = await loadCategoryKnowledge('place')
    const european = rank(knowledge, { place_in_europe: 'yes' })
    const water = rank(knowledge, { place_water: 'yes' }).filter(candidate => candidate.score > 0)

    expect(european.find(candidate => candidate.name === 'Nueva York')?.score).toBe(0)
    expect(water.length).toBeGreaterThan(0)
    expect(water.every(candidate => candidate.attributes.waterPlace === true)).toBe(true)
  })

  it('descarta otras regiones espanolas tras confirmar una comunidad', async () => {
    const knowledge = await loadCategoryKnowledge('place')
    const ranked = rank(knowledge, { place_in_spain: 'yes', place_in_murcia_region: 'yes' })

    expect(ranked.find(candidate => candidate.name === 'Murcia')?.score).toBeGreaterThan(0)
    expect(ranked.find(candidate => candidate.name === 'Madrid')?.score).toBe(0)
  })

  it('no mezcla personas reales con personajes ficticios', async () => {
    const knowledge = await loadCategoryKnowledge('person')
    const real = rank(knowledge, { person_real: 'yes' })
    const fictional = rank(knowledge, { person_fictional: 'yes' })

    expect(real.find(candidate => candidate.name === 'Sherlock Holmes')?.score).toBe(0)
    expect(real.find(candidate => candidate.name === 'Mahatma Gandhi')?.score).toBeGreaterThan(0)
    expect(fictional.find(candidate => candidate.name === 'Mahatma Gandhi')?.score).toBe(0)
    expect(fictional.find(candidate => candidate.name === 'Sherlock Holmes')?.score).toBeGreaterThan(0)
  })

  it('mantiene solo candidatas compatibles tras confirmar genero femenino', async () => {
    const knowledge = await loadCategoryKnowledge('person')
    const ranked = rank(knowledge, { person_woman: 'yes' })
    const viable = ranked.filter(candidate => candidate.score > 0)

    expect(viable.length).toBeGreaterThan(0)
    expect(viable.every(candidate => candidate.attributes.woman === true)).toBe(true)
    expect(ranked.find(candidate => candidate.name === 'Pedro Sánchez')?.score).toBe(0)
  })

  it('descarta a Pedro Sánchez cuando la persona no es de origen español', async () => {
    const knowledge = await loadCategoryKnowledge('person')
    const ranked = rank(knowledge, { person_spanish_origin: 'no' })

    expect(ranked.find(candidate => candidate.name === 'Barack Obama')?.score).toBeGreaterThan(0)
    expect(ranked.find(candidate => candidate.name === 'Pedro Sánchez')?.score).toBe(0)
  })
})
