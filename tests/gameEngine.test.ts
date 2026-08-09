import { beforeAll, describe, expect, it } from 'vitest'
import { loadCategoryKnowledge } from '../src/data/catalog'
import { coreCandidates } from '../src/data/candidates'
import { answerCurrentQuestion, createGame, resolveGuess } from '../src/engine/gameEngine'
import { expectedValue } from '../src/engine/scoring'
import type { Candidate, Category, GameKnowledge } from '../src/types/game'

const categories: Category[] = ['animal', 'object', 'place', 'person']
const knowledgeByCategory = new Map<Category, GameKnowledge>()
let candidates: Candidate[] = []

beforeAll(async () => {
  const loaded = await Promise.all(categories.map(loadCategoryKnowledge))
  loaded.forEach((knowledge, index) => knowledgeByCategory.set(categories[index], knowledge))
  candidates = loaded.flatMap(knowledge => knowledge.candidates)
})

function knowledgeFor(category: Category): GameKnowledge {
  const knowledge = knowledgeByCategory.get(category)
  if (!knowledge) throw new Error(`No se cargó la categoría ${category}`)
  return knowledge
}

describe('gameEngine', () => {
  it('crea una partida con una pregunta inicial', () => {
    const state = createGame('animal', knowledgeFor('animal'))
    expect(state.status).toBe('playing')
    expect(state.currentQuestionId).not.toBeNull()
  })

  it('registra una respuesta y avanza el contador', () => {
    const knowledge = knowledgeFor('animal')
    const state = createGame('animal', knowledge)
    const next = answerCurrentQuestion(state, 'yes', knowledge)
    expect(next.questionCount).toBe(1)
    expect(next.askedQuestionIds).toHaveLength(1)
  })

  it('no repite la pregunta respondida', () => {
    const knowledge = knowledgeFor('animal')
    const state = createGame('animal', knowledge)
    const answeredId = state.currentQuestionId
    const next = answerCurrentQuestion(state, 'yes', knowledge)
    expect(next.currentQuestionId).not.toBe(answeredId)
  })

  it('continúa preguntando tras una suposición temprana fallida', () => {
    const knowledge = knowledgeFor('animal')
    const initial = createGame('animal', knowledge)
    const guessing = { ...initial, status: 'guessing' as const, guessCandidateId: initial.rankedCandidates[0].id, questionCount: 6 }
    const next = resolveGuess(guessing, false, knowledge)
    expect(next.status).toBe('playing')
    expect(next.excludedCandidateIds).toContain(guessing.guessCandidateId)
    expect(next.currentQuestionId).not.toBeNull()
  })

  it.each<Category>(['animal', 'object', 'place', 'person'])('no intenta adivinar %s después de una sola respuesta', category => {
    const knowledge = knowledgeFor(category)
    const state = answerCurrentQuestion(createGame(category, knowledge), 'yes', knowledge)
    expect(state.status).toBe('playing')
    expect(state.questionCount).toBe(1)
  })

  it.each<Category>(['animal', 'object', 'place', 'person'])('solo formula preguntas aplicables a %s', category => {
    const knowledge = knowledgeByCategory.get(category)
    expect(knowledge).toBeDefined()
    if (!knowledge) return
    let state = createGame(category, knowledge)
    for (let turn = 0; turn < 20 && state.status === 'playing'; turn += 1) {
      const question = knowledge.questions.find(item => item.id === state.currentQuestionId)
      expect(question?.categories).toContain(category)
      state = answerCurrentQuestion(state, 'unknown', knowledge)
    }
  })

  it.each(categories)('incluye al menos 1.000 candidatos de %s', category => {
    expect(candidates.filter(candidate => candidate.category === category).length).toBeGreaterThanOrEqual(1_000)
  })

  it.each(categories)('no contiene nombres duplicados en %s', category => {
    const names = candidates
      .filter(candidate => candidate.category === category)
      .map(candidate => candidate.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es'))
    expect(new Set(names).size).toBe(names.length)
  })

  it('adivina candidatos curados y una muestra del catálogo diferido con respuestas exactas', () => {
    const sampledGeneratedCandidates = categories.flatMap(category => {
      const categoryCandidates = candidates.filter(candidate => candidate.category === category && !coreCandidates.includes(candidate))
      return [categoryCandidates[0], categoryCandidates[Math.floor(categoryCandidates.length / 2)], categoryCandidates.at(-1)]
        .filter(candidate => candidate !== undefined)
    })

    for (const target of [...coreCandidates, ...sampledGeneratedCandidates]) {
      const knowledge = knowledgeByCategory.get(target.category)
      expect(knowledge).toBeDefined()
      if (!knowledge) continue
      let state = createGame(target.category, knowledge)
      while (state.status === 'playing') {
        const question = knowledge.questions.find(item => item.id === state.currentQuestionId)
        expect(question).toBeDefined()
        const value = question ? expectedValue(target, question) : undefined
        state = answerCurrentQuestion(state, value === true ? 'yes' : value === false ? 'no' : 'unknown', knowledge)
      }
      expect(state.status).toBe('guessing')
      expect(state.guessCandidateId).toBe(target.id)
    }
  }, 30_000)
})
