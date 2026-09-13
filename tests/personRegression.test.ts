import { describe, expect, it } from 'vitest'
import { loadCategoryKnowledge } from '../src/data/catalog'
import { answerCurrentQuestion, createGame } from '../src/engine/gameEngine'
import { expectedValue } from '../src/engine/scoring'

describe('person regressions', () => {
  it('clasifica a Frida Kahlo sin recorrer ramas mitologicas redundantes', async () => {
    const knowledge = await loadCategoryKnowledge('person')
    const target = knowledge.candidates.find(candidate => candidate.name === 'Frida Kahlo')
    expect(target).toBeDefined()
    if (!target) return

    expect(target.attributes.americas).toBe(true)
    expect(target.attributes.before1900).toBe(false)
    expect(target.attributes.visualArtist).toBe(true)

    let state = createGame('person', knowledge)
    const askedIds: string[] = []
    while (state.status === 'playing') {
      const question = knowledge.questions.find(item => item.id === state.currentQuestionId)
      expect(question).toBeDefined()
      if (!question) break
      askedIds.push(question.id)
      const value = expectedValue(target, question)
      state = answerCurrentQuestion(
        state,
        value === true ? 'yes' : value === false ? 'no' : value === 0.5 ? 'sometimes' : 'unknown',
        knowledge
      )
    }

    expect(askedIds[0]).toBe('person_real')
    expect(askedIds).toContain('person_visual_artist')
    expect(askedIds).not.toEqual(expect.arrayContaining([
      'person_greek_mythology',
      'person_ancient_classical',
      'person_deity',
      'person_mythic_hero',
      'person_roman_world'
    ]))
    expect(state.guessCandidateId).toBe(target.id)
    expect(state.questionCount).toBeLessThanOrEqual(15)
  })

  it('solo abre las especialidades creativas despues de confirmar la rama general', async () => {
    const knowledge = await loadCategoryKnowledge('person')
    const creativeQuestions = knowledge.questions.filter(question =>
      question.exclusiveGroup === 'person-primary-creative-field'
    )

    expect(creativeQuestions.length).toBeGreaterThanOrEqual(5)
    for (const question of creativeQuestions) {
      expect(question.askIf).toEqual(expect.arrayContaining([
        { questionId: 'person_art_entertainment_sport', answers: ['yes', 'sometimes'] }
      ]))
    }
  })
})
