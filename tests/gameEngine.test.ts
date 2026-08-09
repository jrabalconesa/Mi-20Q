import { describe, expect, it } from 'vitest'
import { candidates } from '../src/data/candidates'
import { questions } from '../src/data/questions'
import { answerCurrentQuestion, createGame } from '../src/engine/gameEngine'
import { expectedValue } from '../src/engine/scoring'
import type { Category } from '../src/types/game'

const categories: Category[] = ['animal', 'object', 'place', 'person']
const generatedPrefixes = ['birdnet-', 'wn-', 'geonames-', 'pantheon-']
const coreCandidates = candidates.filter(candidate => !generatedPrefixes.some(prefix => candidate.id.startsWith(prefix)))
const sampledGeneratedCandidates = categories.flatMap(category => {
  const categoryCandidates = candidates.filter(candidate =>
    candidate.category === category && generatedPrefixes.some(prefix => candidate.id.startsWith(prefix))
  )
  return [
    categoryCandidates[0],
    categoryCandidates[Math.floor(categoryCandidates.length / 2)],
    categoryCandidates.at(-1)
  ].filter(candidate => candidate !== undefined)
})
const sampledCandidates = [...coreCandidates, ...sampledGeneratedCandidates]

describe('gameEngine', () => {
  it('crea una partida con una pregunta inicial', () => {
    const state = createGame('animal')
    expect(state.status).toBe('playing')
    expect(state.currentQuestionId).not.toBeNull()
  })

  it('registra una respuesta y avanza el contador', () => {
    const state = createGame('animal')
    const next = answerCurrentQuestion(state, 'yes')
    expect(next.questionCount).toBe(1)
    expect(next.askedQuestionIds).toHaveLength(1)
  })

  it('no repite la pregunta respondida', () => {
    const state = createGame('animal')
    const answeredId = state.currentQuestionId
    const next = answerCurrentQuestion(state, 'yes')
    expect(next.currentQuestionId).not.toBe(answeredId)
  })

  it.each<Category>(['animal', 'object', 'place', 'person'])('no intenta adivinar %s después de una sola respuesta', category => {
    const state = answerCurrentQuestion(createGame(category), 'yes')
    expect(state.status).toBe('playing')
    expect(state.questionCount).toBe(1)
  })

  it.each<Category>(['animal', 'object', 'place', 'person'])('solo formula preguntas aplicables a %s', category => {
    let state = createGame(category)
    for (let turn = 0; turn < 20 && state.status === 'playing'; turn += 1) {
      const question = questions.find(item => item.id === state.currentQuestionId)
      expect(question?.categories).toContain(category)
      state = answerCurrentQuestion(state, 'unknown')
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

  it.each(sampledCandidates)('adivina $name con respuestas exactas', target => {
    let state = createGame(target.category)
    while (state.status === 'playing') {
      const question = questions.find(item => item.id === state.currentQuestionId)
      expect(question).toBeDefined()
      const value = question ? expectedValue(target, question) : undefined
      state = answerCurrentQuestion(state, value === true ? 'yes' : value === false ? 'no' : 'unknown')
    }
    expect(state.status).toBe('guessing')
    expect(state.guessCandidateId).toBe(target.id)
  })
})
