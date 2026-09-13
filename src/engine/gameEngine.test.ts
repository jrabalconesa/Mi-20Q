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

const guessRuleQuestion: Question = {
  id: 'guess_rule_marker',
  text: '¿Tiene el rasgo clave?',
  attribute: 'marker',
  categories: ['animal'],
}

const guessRuleKnowledge: GameKnowledge = {
  questions: [guessRuleQuestion],
  candidates: [
    {
      id: 'leader',
      name: 'Líder',
      category: 'animal',
      attributes: { marker: true },
    },
    {
      id: 'runner-up',
      name: 'Segundo',
      category: 'animal',
      attributes: { marker: false },
    },
  ],
}

const lateGuessRuleKnowledge: GameKnowledge = {
  questions: [guessRuleQuestion],
  candidates: [
    {
      id: 'late-leader',
      name: 'Líder tardío',
      category: 'animal',
      attributes: { marker: 0.6 },
    },
    {
      id: 'late-runner-up',
      name: 'Segundo tardío',
      category: 'animal',
      attributes: { marker: 0.25 },
    },
    {
      id: 'late-third',
      name: 'Tercero tardío',
      category: 'animal',
      attributes: { marker: 0.075 },
    },
    {
      id: 'late-fourth',
      name: 'Cuarto tardío',
      category: 'animal',
      attributes: { marker: 0.075 },
    },
  ],
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

  it('propone adivinanza cuando el candidato top alcanza probabilidad absoluta de 70%', () => {
    const state = createGame('animal', guessRuleKnowledge)
    const next = answerCurrentQuestion(state, 'yes', guessRuleKnowledge)

    expect(next.status).toBe('guessing')
    expect(next.guessCandidateId).toBe('leader')
    expect(next.rankedCandidates[0].score).toBeGreaterThanOrEqual(0.7)
  })

  it('propone adivinanza desde el turno 15 si el top supera 35% y duplica al segundo', () => {
    const state = {
      ...createGame('animal', lateGuessRuleKnowledge),
      currentQuestionId: guessRuleQuestion.id,
      questionCount: 14,
    }
    const next = answerCurrentQuestion(state, 'yes', lateGuessRuleKnowledge)

    expect(next.status).toBe('guessing')
    expect(next.guessCandidateId).toBe('late-leader')
    expect(next.rankedCandidates[0].score).toBeGreaterThanOrEqual(0.35)
    expect(next.rankedCandidates[0].score).toBeLessThan(0.7)
    expect(next.rankedCandidates[0].score).toBeGreaterThanOrEqual(2 * next.rankedCandidates[1].score)
  })
})
