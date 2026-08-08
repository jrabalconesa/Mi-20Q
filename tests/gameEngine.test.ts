import { describe, expect, it } from 'vitest'
import { candidates } from '../src/data/candidates'
import { questions } from '../src/data/questions'
import { answerCurrentQuestion, createGame } from '../src/engine/gameEngine'
import type { Category } from '../src/types/game'

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

  it('incluye los 60 candidatos previstos por categoría', () => {
    expect(candidates.filter(candidate => candidate.category === 'animal')).toHaveLength(20)
    expect(candidates.filter(candidate => candidate.category === 'object')).toHaveLength(20)
    expect(candidates.filter(candidate => candidate.category === 'place')).toHaveLength(10)
    expect(candidates.filter(candidate => candidate.category === 'person')).toHaveLength(10)
  })

  it.each<Category>(['animal', 'object', 'place', 'person'])('no contiene candidatos indistinguibles en %s', category => {
    const categoryQuestions = questions.filter(question => question.categories.includes(category))
    const signatures = candidates
      .filter(candidate => candidate.category === category)
      .map(candidate => categoryQuestions.map(question => candidate.attributes[question.attribute] ?? 0.5).join('|'))
    expect(new Set(signatures).size).toBe(signatures.length)
  })
})
