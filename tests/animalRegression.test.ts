import { describe, expect, it } from 'vitest'
import { loadCategoryKnowledge } from '../src/data/catalog'
import { questions } from '../src/data/questions'
import { availableQuestions } from '../src/engine/questionAvailability'
import { expectedValue, rankCandidates } from '../src/engine/scoring'
import { answerCurrentQuestion, createGame } from '../src/engine/gameEngine'

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
      animal_carnivore_predator: 'yes',
      animal_four_or_more_legs: 'yes',
      universal_larger_shoebox: 'yes'
    })
    const tiger = ranked.find(candidate => candidate.name === 'Tigre')
    const squirrel = ranked.find(candidate => candidate.name === 'Ardilla')

    expect(ranked[0]?.name).not.toContain('Ardilla')
    expect(tiger?.score).toBeGreaterThan(squirrel?.score ?? 0)
  })

  it('distingue tiburon de delfin usando la pregunta de mamifero del set maestro', async () => {
    const knowledge = await loadCategoryKnowledge('animal')
    const questionsById = Object.fromEntries(knowledge.questions.map(question => [question.id, question]))
    const ranked = rankCandidates(knowledge.candidates, questionsById, {
      universal_larger_shoebox: 'yes',
      animal_vertebrate: 'yes',
      animal_mammal: 'no',
      animal_air_or_water: 'yes',
      animal_carnivore_predator: 'yes',
      animal_four_or_more_legs: 'no'
    })
    const shark = ranked.find(candidate => candidate.name === 'Tiburón')
    const dolphin = ranked.find(candidate => candidate.name === 'Delfín')

    expect(shark?.score).toBeGreaterThan(dolphin?.score ?? 0)
    expect(ranked.findIndex(candidate => candidate.name === 'Tiburón')).toBeLessThan(5)
  })

  it('usa rasgos discriminatorios para llegar antes a tigre', async () => {
    const knowledge = await loadCategoryKnowledge('animal')
    const tiger = knowledge.candidates.find(candidate => candidate.name === 'Tigre')
    expect(tiger).toBeDefined()
    if (!tiger) return

    let state = createGame('animal', knowledge)
    const askedTexts: string[] = []
    while (state.status === 'playing') {
      const question = knowledge.questions.find(item => item.id === state.currentQuestionId)
      expect(question).toBeDefined()
      if (!question) break
      askedTexts.push(question.text)
      const value = expectedValue(tiger, question)
      state = answerCurrentQuestion(
        state,
        value === true ? 'yes' : value === false ? 'no' : value === 0.5 ? 'sometimes' : 'unknown',
        knowledge
      )
    }

    expect(askedTexts, askedTexts.join(' | ')).toContain('¿Tiene rayas?')
    expect(askedTexts).not.toContain('¿Existe de forma física y tangible?')
    expect(askedTexts).not.toContain('¿Es un objeto o personaje de ficción / creado por el ser humano?')
    expect(state.rankedCandidates.findIndex(candidate => candidate.name === 'Tigre')).toBeLessThan(5)
    expect(state.questionCount).toBeLessThanOrEqual(9)
  })
})
