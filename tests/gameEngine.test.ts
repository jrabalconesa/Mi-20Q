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

function answerForTarget(target: Candidate, state: ReturnType<typeof createGame>, knowledge: GameKnowledge) {
  const question = knowledge.questions.find(item => item.id === state.currentQuestionId)
  const value = question ? expectedValue(target, question) : undefined
  return value === true ? 'yes' : value === false ? 'no' : value === 0.5 ? 'sometimes' : 'unknown'
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

  it.each([
    ['animal', 600],
    ['object', 1_000],
    ['place', 1_000],
    ['person', 1_000]
  ] as const)('incluye suficientes candidatos normalizados de %s', (category, minimum) => {
    expect(candidates.filter(candidate => candidate.category === category).length).toBeGreaterThanOrEqual(minimum)
  })

  it.each(categories)('no contiene nombres duplicados en %s', category => {
    const names = candidates
      .filter(candidate => candidate.category === category)
      .map(candidate => candidate.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es'))
    expect(new Set(names).size).toBe(names.length)
  })

  it('mantiene los candidatos curados entre las mejores opciones con respuestas exactas', () => {
    for (const target of coreCandidates) {
      const knowledge = knowledgeByCategory.get(target.category)
      expect(knowledge).toBeDefined()
      if (!knowledge) continue
      const enrichedTarget = knowledge.candidates.find(candidate => candidate.id === target.id)
      expect(enrichedTarget).toBeDefined()
      if (!enrichedTarget) continue
      let state = createGame(target.category, knowledge)
      const askedTexts: string[] = []
      while (state.status === 'playing') {
        const question = knowledge.questions.find(item => item.id === state.currentQuestionId)
        expect(question).toBeDefined()
        if (question) askedTexts.push(question.text)
        const value = question ? expectedValue(enrichedTarget, question) : undefined
        state = answerCurrentQuestion(state, value === true ? 'yes' : value === false ? 'no' : 'unknown', knowledge)
      }
      expect(state.status).toBe('guessing')
      const targetRank = state.rankedCandidates.findIndex(candidate => candidate.id === target.id)
      const targetScore = state.rankedCandidates[targetRank]?.score ?? 0
      const leaderScore = state.rankedCandidates[0]?.score ?? 0
      expect(targetRank, `${target.name}: ${askedTexts.join(' | ')}`).toBeLessThan(10)
      expect(targetScore, target.name).toBeCloseTo(leaderScore)
    }
  }, 30_000)

  it('prioriza guepardo usando el nuevo set semantico de animales', () => {
    const knowledge = knowledgeFor('animal')
    const target = knowledge.candidates.find(candidate => candidate.name === 'Guepardo')
    expect(target).toBeDefined()
    if (!target) return

    let state = createGame('animal', knowledge)
    const askedTexts: string[] = []
    while (state.status === 'playing') {
      const question = knowledge.questions.find(item => item.id === state.currentQuestionId)
      expect(question?.id).not.toContain('name-before')
      if (!question) break
      askedTexts.push(question.text)
      const value = expectedValue(target, question)
      state = answerCurrentQuestion(state, value === true ? 'yes' : value === false ? 'no' : value === 0.5 ? 'sometimes' : 'unknown', knowledge)
    }

    expect(askedTexts, askedTexts.join(' | ')).toContain('¿Es un felino?')
    expect(askedTexts).toContain('¿Es principalmente carnívoro o depredador?')
    expect(askedTexts).toContain('¿Tiene cuatro patas o más?')
    expect(state.rankedCandidates.findIndex(candidate => candidate.id === target.id)).toBeLessThan(10)
  }, 30_000)

  it('no formula preguntas de objeto al jugar con una persona real como Gandhi', () => {
    const knowledge = knowledgeFor('person')
    const target = knowledge.candidates.find(candidate => candidate.name === 'Mahatma Gandhi')
    expect(target).toBeDefined()
    if (!target) return

    let state = createGame('person', knowledge)
    const askedTexts: string[] = []
    while (state.status === 'playing') {
      const question = knowledge.questions.find(item => item.id === state.currentQuestionId)
      expect(question).toBeDefined()
      if (!question) break
      askedTexts.push(question.text)
      const value = expectedValue(target, question)
      state = answerCurrentQuestion(
        state,
        value === true ? 'yes' : value === false ? 'no' : value === 0.5 ? 'sometimes' : 'unknown',
        knowledge
      )
    }

    expect(askedTexts).not.toEqual(expect.arrayContaining([
      '¿Se puede encontrar normalmente en interiores o dentro de una casa?',
      '¿Es más grande que una caja de zapatos?',
      '¿Se interactúa con ello principalmente de forma digital o electrónica?',
      '¿Existe de forma física y tangible?'
    ]))
    expect(state.rankedCandidates.findIndex(candidate => candidate.name === 'Mahatma Gandhi')).toBeLessThan(25)
  }, 30_000)

  it('no cierra antes de veinte si falla una suposición pensando en Pedro Sánchez', () => {
    const knowledge = knowledgeFor('person')
    const target = knowledge.candidates.find(candidate => candidate.name === 'Pedro Sánchez')
    expect(target).toBeDefined()
    if (!target) return

    let state = createGame('person', knowledge)
    while (state.status === 'playing') {
      const value = answerForTarget(target, state, knowledge)
      state = answerCurrentQuestion(state, value, knowledge)
    }

    while (state.status === 'guessing' && state.guessCandidateId !== 'spanish-pedro-sanchez' && state.questionCount < 20) {
      state = resolveGuess(state, false, knowledge)
      expect(state.status).toBe('playing')
      const value = answerForTarget(target, state, knowledge)
      state = answerCurrentQuestion(state, value, knowledge)
    }

    expect(state.status).toBe('guessing')
    expect(state.guessCandidateId).toBe('spanish-pedro-sanchez')
    expect(state.questionCount).toBeLessThanOrEqual(20)
  }, 30_000)

  it('pregunta lo suficiente para distinguir Poseidón de Zeus antes de adivinar', () => {
    const knowledge = knowledgeFor('person')
    const target = knowledge.candidates.find(candidate => candidate.name === 'Poseidón')
    expect(target).toBeDefined()
    if (!target) return

    let state = createGame('person', knowledge)
    const guesses: string[] = []
    while (state.status === 'playing') {
      const value = answerForTarget(target, state, knowledge)
      state = answerCurrentQuestion(state, value, knowledge)
      if (state.status === 'guessing' && state.guessCandidateId) {
        const guess = knowledge.candidates.find(candidate => candidate.id === state.guessCandidateId)
        if (guess) guesses.push(guess.name)
      }
    }

    expect(state.status).toBe('guessing')
    expect(state.guessCandidateId).toBe('myth-poseidon')
    expect(guesses).toEqual(['Poseidón'])
    expect(state.questionCount).toBeLessThanOrEqual(20)
  }, 30_000)

  it('sigue preguntando tras fallar con cuchara antes de agotar las veinte preguntas', () => {
    const knowledge = knowledgeFor('object')
    const target = knowledge.candidates.find(candidate => candidate.name === 'Cuchara')
    expect(target).toBeDefined()
    if (!target) return

    let state = createGame('object', knowledge)
    const askedTexts: string[] = []
    while (state.status === 'playing') {
      const question = knowledge.questions.find(item => item.id === state.currentQuestionId)
      expect(question).toBeDefined()
      if (!question) break
      askedTexts.push(question.text)
      const value = expectedValue(target, question)
      state = answerCurrentQuestion(
        state,
        value === true ? 'yes' : value === false ? 'no' : value === 0.5 ? 'sometimes' : 'unknown',
        knowledge
      )
    }

    while (state.status === 'guessing' && state.guessCandidateId !== 'wn-object-spoon-n-01' && state.questionCount < 20) {
      state = resolveGuess(state, false, knowledge)
      expect(state.status, askedTexts.join(' | ')).toBe('playing')
      const question = knowledge.questions.find(item => item.id === state.currentQuestionId)
      expect(question).toBeDefined()
      if (!question) break
      askedTexts.push(question.text)
      const value = expectedValue(target, question)
      state = answerCurrentQuestion(
        state,
        value === true ? 'yes' : value === false ? 'no' : value === 0.5 ? 'sometimes' : 'unknown',
        knowledge
      )
    }

    expect(state.status).toBe('guessing')
    expect(state.guessCandidateId).toBe('wn-object-spoon-n-01')
    expect(state.questionCount).toBeLessThanOrEqual(20)
  }, 30_000)

  it.each(['París', 'Murcia', 'Cartagena (España)'])(
    'distingue %s mediante preguntas geográficas naturales',
    targetName => {
      const knowledge = knowledgeFor('place')
      const target = knowledge.candidates.find(candidate => candidate.name === targetName)
      expect(target).toBeDefined()
      if (!target) return

      let state = createGame('place', knowledge)
      const askedTexts: string[] = []
      while (state.status === 'playing') {
        const question = knowledge.questions.find(item => item.id === state.currentQuestionId)
        expect(question).toBeDefined()
        if (!question) break
        askedTexts.push(question.text)
        const value = expectedValue(target, question)
        state = answerCurrentQuestion(
          state,
          value === true ? 'yes' : value === false ? 'no' : value === 0.5 ? 'sometimes' : 'unknown',
          knowledge
        )
      }

      expect(askedTexts.some(text => /hemisferio occidental|año 1900|lugar geográfico/.test(text))).toBe(true)
      expect(askedTexts.every(text => !/alfab|nombre está antes|nombre está después/i.test(text))).toBe(true)
      expect(state.rankedCandidates.findIndex(candidate => candidate.id === target.id)).toBeLessThan(50)
    },
    30_000
  )
})
