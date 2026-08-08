import { describe, expect, it } from 'vitest'
import { answerCurrentQuestion, createGame } from '../src/engine/gameEngine'

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
})
