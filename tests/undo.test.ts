import { describe, expect, it } from 'vitest'
import { answerCurrentQuestion, canUndoLastAnswer, createGame, undoLastAnswer } from '../src/engine/gameEngine'
import { coreCandidates } from '../src/data/candidates'
import { questions } from '../src/data/questions'

const knowledge = { candidates: coreCandidates, questions }

describe('deshacer respuesta', () => {
  it('restaura la pregunta anterior y revierte el contador', () => {
    const initial = createGame('animal', knowledge)
    const answered = answerCurrentQuestion(initial, 'yes', knowledge)
    expect(canUndoLastAnswer(answered)).toBe(true)

    const restored = undoLastAnswer(answered, knowledge)
    expect(restored.questionCount).toBe(0)
    expect(restored.askedQuestionIds).toHaveLength(0)
    expect(restored.currentQuestionId).toBe(initial.currentQuestionId)
    expect(Object.keys(restored.answers)).toHaveLength(0)
    expect(canUndoLastAnswer(restored)).toBe(false)
  })

  it('no permite deshacer fuera de la fase de preguntas', () => {
    const guessing = {
      ...createGame('animal', knowledge),
      status: 'guessing' as const,
      guessCandidateId: 'dog',
      questionCount: 8
    }
    expect(canUndoLastAnswer(guessing)).toBe(false)
    expect(undoLastAnswer(guessing, knowledge)).toBe(guessing)
  })
})
