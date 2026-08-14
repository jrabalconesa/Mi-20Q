import { describe, expect, it } from 'vitest'
import { questions } from '../src/data/questions'
import { buildDebugSnapshot, getGuessReadiness } from '../src/engine/debugInsights'
import { rankCandidates } from '../src/engine/scoring'
import type { Candidate, GameKnowledge, GameState, Question } from '../src/types/game'

const personQuestions = questions.filter(question => question.categories.includes('person'))

function questionById(id: string): Question {
  const question = personQuestions.find(item => item.id === id)
  if (!question) throw new Error(`No existe la pregunta ${id}`)
  return question
}

const candidates: Candidate[] = [
  {
    id: 'europe_artist',
    name: 'Artista europea',
    category: 'person',
    attributes: { realPerson: true, europe: true, asia: false, artist: true }
  },
  {
    id: 'asia_artist',
    name: 'Artista asiatica',
    category: 'person',
    attributes: { realPerson: true, europe: false, asia: true, artist: true }
  }
]

const knowledge: GameKnowledge = {
  candidates,
  questions: personQuestions
}

function stateWithAnswers(answers: Record<string, 'yes'>): GameState {
  const askedQuestionIds = Object.keys(answers)
  const questionsById = Object.fromEntries(personQuestions.map(question => [question.id, question]))
  return {
    category: 'person',
    askedQuestionIds,
    answers,
    rankedCandidates: rankCandidates(candidates, questionsById, answers),
    currentQuestionId: null,
    guessCandidateId: null,
    excludedCandidateIds: [],
    questionCount: askedQuestionIds.length,
    status: 'playing'
  }
}

describe('debugInsights', () => {
  it('respeta grupos exclusivos al listar preguntas recomendadas', () => {
    const snapshot = buildDebugSnapshot(stateWithAnswers({ person_europe: 'yes' }), knowledge, 5, 20)
    const questionIds = snapshot.questionScores.map(score => score.question.id)

    expect(questionById('person_asia').exclusiveGroup).toBe('person-birth-continent')
    expect(questionIds).not.toContain('person_asia')
    expect(questionIds).toContain('person_artist')
  })

  it('expone umbrales de preparacion de suposicion', () => {
    const readiness = getGuessReadiness(stateWithAnswers({ person_real: 'yes' }))

    expect(readiness.ready).toBe(false)
    expect(readiness.thresholds.minQuestions).toBe(6)
    expect(readiness.thresholds.maxQuestions).toBe(20)
  })
})
