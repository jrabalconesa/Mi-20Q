import { describe, expect, it } from 'vitest'
import type { Candidate, GameKnowledge, Question } from '../types/game'
import { answerCurrentQuestion, createGame } from './gameEngine'

const unknownFlowQuestions: Question[] = [
  {
    id: 'animal_has_fur',
    text: '¿Tiene pelo?',
    attribute: 'hasFur',
    categories: ['animal'],
  },
  {
    id: 'animal_can_fly',
    text: '¿Puede volar?',
    attribute: 'canFly',
    categories: ['animal'],
  },
  {
    id: 'animal_lives_water',
    text: '¿Vive en el agua?',
    attribute: 'livesInWater',
    categories: ['animal'],
  },
  {
    id: 'animal_is_domestic',
    text: '¿Es doméstico?',
    attribute: 'isDomestic',
    categories: ['animal'],
  },
]

function createCandidate(index: number): Candidate {
  return {
    id: `animal-${index}`,
    name: `Animal ${index}`,
    category: 'animal',
    attributes: {
      hasFur: (index & 1) !== 0,
      canFly: (index & 2) !== 0,
      livesInWater: (index & 4) !== 0,
      isDomestic: (index & 8) !== 0,
    },
  }
}

const unknownFlowKnowledge: GameKnowledge = {
  questions: unknownFlowQuestions,
  candidates: Array.from({ length: 16 }, (_, index) => createCandidate(index)),
}

function scoreSum(scores: Array<{ score: number }>): number {
  return scores.reduce((total, candidate) => total + candidate.score, 0)
}

describe('gameEngine', () => {
  it('recalcula el ranking tras cuatro No lo sé sin colapsar probabilidades ni repetir preguntas', () => {
    let state = createGame('animal', unknownFlowKnowledge)
    const askedQuestionIds = new Set<string>()
    const initialScores = state.rankedCandidates.map(candidate => candidate.score)

    for (let turn = 0; turn < 4; turn += 1) {
      expect(state.status).toBe('playing')
      expect(state.currentQuestionId).not.toBeNull()
      expect(askedQuestionIds.has(state.currentQuestionId ?? '')).toBe(false)

      askedQuestionIds.add(state.currentQuestionId ?? '')
      state = answerCurrentQuestion(state, 'unknown', unknownFlowKnowledge)

      expect(state.rankedCandidates).toHaveLength(unknownFlowKnowledge.candidates.length)
      expect(scoreSum(state.rankedCandidates)).toBeCloseTo(1, 12)
      expect(state.rankedCandidates.every(candidate =>
        Number.isFinite(candidate.score) && candidate.score > 0
      )).toBe(true)
      expect(state.rankedCandidates.map(candidate => candidate.score)).toEqual(initialScores)
    }

    expect(state.askedQuestionIds).toHaveLength(4)
    expect(new Set(state.askedQuestionIds).size).toBe(4)
    expect(Object.values(state.answers)).toEqual(['unknown', 'unknown', 'unknown', 'unknown'])
    expect(state.currentQuestionId === null || !askedQuestionIds.has(state.currentQuestionId)).toBe(true)
  })
})
