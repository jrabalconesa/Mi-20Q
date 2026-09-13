import { describe, expect, it } from 'vitest'
import type { Category, GameState } from '../src/types/game'
import {
  guessingInteractionMessage,
  outcomeInteractionMessage,
  playingInteractionMessage
} from '../src/engine/interactionMessages'

function state(overrides: Partial<GameState> = {}): GameState {
  return {
    category: 'object',
    askedQuestionIds: [],
    answers: {},
    rankedCandidates: [],
    currentQuestionId: 'question',
    guessCandidateId: null,
    excludedCandidateIds: [],
    questionCount: 0,
    status: 'playing',
    ...overrides
  }
}

describe('interaction messages', () => {
  it.each([
    ['animal', 'cómo es'],
    ['object', 'para qué sirve'],
    ['place', 'dónde está'],
    ['person', 'su época']
  ] as const)('presenta una estrategia propia para %s', (category: Category, fragment) => {
    expect(playingInteractionMessage(state({ category }))).toContain(fragment)
  })

  it.each([
    [5, 'empiezo a verlo'],
    [10, 'Sé bastante más'],
    [15, 'pocas opciones']
  ])('introduce un mensaje antes de la pregunta siguiente al turno %s', (questionCount, fragment) => {
    expect(playingInteractionMessage(state({ questionCount }))).toContain(fragment)
  })

  it('avisa de que vuelve a preguntar después de una propuesta fallida', () => {
    expect(playingInteractionMessage(state({
      questionCount: 7,
      askedQuestionIds: Array.from({ length: 7 }, (_, index) => `q-${index}`),
      excludedCandidateIds: ['wrong-guess'],
      lastRejectedGuessAt: 7
    }))).toContain('otra pregunta')
  })

  it('no repite el aviso de reintento en las preguntas posteriores', () => {
    expect(playingInteractionMessage(state({
      questionCount: 8,
      excludedCandidateIds: ['wrong-guess'],
      lastRejectedGuessAt: 7
    }))).toBeNull()
  })

  it('distingue el primer intento de los siguientes', () => {
    expect(guessingInteractionMessage(state({ status: 'guessing' }))).toContain('Creo que ya lo tengo')
    expect(guessingInteractionMessage(state({
      status: 'guessing',
      excludedCandidateIds: ['wrong-guess']
    }))).toContain('respuesta anterior')
  })

  it('cierra la partida con mensajes diferentes al acertar o fallar', () => {
    expect(outcomeInteractionMessage(state({ status: 'won' }))).toContain('leído la mente')
    expect(outcomeInteractionMessage(state({ status: 'lost' }))).toContain('Has ganado')
  })
})
