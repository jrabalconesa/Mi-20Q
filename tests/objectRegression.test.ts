import { describe, expect, it } from 'vitest'
import { loadCategoryKnowledge } from '../src/data/catalog'
import { answerCurrentQuestion, createGame, resolveGuess } from '../src/engine/gameEngine'
import { expectedValue, rankCandidates } from '../src/engine/scoring'

describe('object regressions', () => {
  it('incluye tensiometro y lo resuelve mediante su uso medico', async () => {
    const knowledge = await loadCategoryKnowledge('object')
    const target = knowledge.candidates.find(candidate => candidate.name === 'Tensiómetro')
    expect(target).toBeDefined()
    if (!target) return

    let state = createGame('object', knowledge)
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

    expect(askedIds).toContain('object_medical_device')
    expect(state.guessCandidateId).toBe(target.id)
    expect(state.questionCount).toBeLessThanOrEqual(10)
  })

  it('no utiliza conceptos demasiado generales como respuesta final', async () => {
    const knowledge = await loadCategoryKnowledge('object')
    const names = knowledge.candidates.map(candidate => candidate.name)

    expect(names).not.toEqual(expect.arrayContaining([
      'Cosa',
      'Dispositivo',
      'Equipamiento',
      'Instrumento',
      'Objeto',
      'Sistema'
    ]))
  })

  it('descarta todas las armas y municiones tras responder que no es un arma', async () => {
    const knowledge = await loadCategoryKnowledge('object')
    const questionsById = Object.fromEntries(knowledge.questions.map(question => [question.id, question]))
    const ranked = rankCandidates(knowledge.candidates, questionsById, { object_weapon: 'no' })

    for (const name of ['Fusil', 'Bala', 'Arma de fuego']) {
      expect(ranked.find(candidate => candidate.name === name)?.score).toBe(0)
    }
    expect(ranked.find(candidate => candidate.name === 'Tensiómetro')?.score).toBeGreaterThan(0)
  })

  it('no propone armas con el historial observado para el tensiometro', async () => {
    const knowledge = await loadCategoryKnowledge('object')
    const questionsById = Object.fromEntries(knowledge.questions.map(question => [question.id, question]))
    const ranked = rankCandidates(knowledge.candidates, questionsById, {
      object_moving_mechanical_electronic: 'yes',
      object_portable: 'sometimes',
      object_screen: 'yes',
      object_work_study_tool: 'sometimes',
      universal_larger_shoebox: 'no'
    })

    expect(ranked[0]?.name).toBe('Tensiómetro')
    for (const name of ['Fusil', 'Bala', 'Arma de fuego', 'Anodo']) {
      expect(ranked.find(candidate => candidate.name === name)?.score).toBe(0)
    }
  })

  it('no infiere pantalla ni electronica solo por ser un dispositivo', async () => {
    const knowledge = await loadCategoryKnowledge('object')

    for (const name of ['Fusil', 'Bala', 'Arma de fuego', 'Anodo']) {
      const candidate = knowledge.candidates.find(item => item.name === name)
      expect(candidate?.attributes.screen).toBe(false)
      expect(candidate?.attributes.electronic).toBe(false)
      expect(candidate?.attributes.digitalOrElectronic).toBe(false)
    }
  })

  it('vuelve a preguntar para discriminar en vez de encadenar respuestas directas', async () => {
    const knowledge = await loadCategoryKnowledge('object')
    const questionsById = Object.fromEntries(knowledge.questions.map(question => [question.id, question]))
    const rankedCandidates = rankCandidates(knowledge.candidates, questionsById, {
      object_moving_mechanical_electronic: 'yes',
      object_portable: 'sometimes',
      object_screen: 'yes',
      object_work_study_tool: 'sometimes',
      universal_larger_shoebox: 'no'
    })
    const rejectedCandidate = rankedCandidates.find(candidate => candidate.name !== 'Tensiómetro' && candidate.score > 0)
    expect(rejectedCandidate).toBeDefined()
    if (!rejectedCandidate) return

    const recovered = resolveGuess({
      category: 'object',
      askedQuestionIds: [
        'object_moving_mechanical_electronic',
        'object_portable',
        'object_screen',
        'object_work_study_tool',
        'universal_larger_shoebox'
      ],
      answers: {
        object_moving_mechanical_electronic: 'yes',
        object_portable: 'sometimes',
        object_screen: 'yes',
        object_work_study_tool: 'sometimes',
        universal_larger_shoebox: 'no'
      },
      rankedCandidates,
      currentQuestionId: null,
      guessCandidateId: rejectedCandidate.id,
      excludedCandidateIds: [],
      questionCount: 5,
      status: 'guessing'
    }, false, knowledge)

    expect(recovered.status).toBe('playing')
    expect(recovered.currentQuestionId).not.toBeNull()
    expect(recovered.guessCandidateId).toBeNull()
  })
})
