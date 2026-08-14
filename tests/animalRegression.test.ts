import { describe, expect, it } from 'vitest'
import { loadCategoryKnowledge } from '../src/data/catalog'
import { questions } from '../src/data/questions'
import { availableQuestions } from '../src/engine/questionAvailability'
import { rankCandidates } from '../src/engine/scoring'

describe('animal regressions', () => {
  it('no vuelve a preguntar por otras clases animales tras confirmar mamifero', () => {
    const animalQuestions = questions.filter(question => question.categories.includes('animal'))
    const available = availableQuestions(animalQuestions, ['animal_mammal'], { animal_mammal: 'yes' })
    const availableIds = available.map(question => question.id)

    expect(availableIds).not.toEqual(expect.arrayContaining([
      'animal_bird',
      'animal_reptile',
      'animal_amphibian',
      'animal_crustacean',
      'animal_arachnid',
      'animal_insect',
      'animal_mollusk'
    ]))
  })

  it('penaliza las ardillas frente a respuestas de carnivoro grande de cuatro patas', async () => {
    const knowledge = await loadCategoryKnowledge('animal')
    const questionsById = Object.fromEntries(knowledge.questions.map(question => [question.id, question]))
    const ranked = rankCandidates(knowledge.candidates, questionsById, {
      animal_mammal: 'yes',
      animal_carnivore: 'yes',
      animal_four_legs: 'yes',
      animal_large: 'yes'
    })
    const tiger = ranked.find(candidate => candidate.name === 'Tigre')
    const squirrel = ranked.find(candidate => candidate.name === 'Ardilla gris de las Carolinas')

    expect(ranked[0]?.name).not.toContain('Ardilla')
    expect(tiger?.score).toBeGreaterThan(squirrel?.score ?? 0)
  })
})
