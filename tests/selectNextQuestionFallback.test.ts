import { describe, expect, it } from 'vitest'
import type { Question, RankedCandidate } from '../src/types/game'
import { resolveGuess } from '../src/engine/gameEngine'
import { rankAvailableQuestions } from '../src/engine/questionRanking'
import { selectNextQuestion } from '../src/engine/selectNextQuestion'

describe('selectNextQuestion fallback', () => {
  it('conserva una pregunta que separa candidatos aunque no alcance el umbral general', () => {
    const question: Question = {
      id: 'rare_discriminator',
      text: '¿Tiene el rasgo que separa las alternativas?',
      attribute: 'rareMarker',
      categories: ['object']
    }
    const candidates: RankedCandidate[] = Array.from({ length: 100 }, (_, index) => ({
      id: `candidate-${index}`,
      name: `Candidato ${index}`,
      category: 'object',
      attributes: { rareMarker: index === 0 },
      score: 0.01
    }))

    expect(rankAvailableQuestions([question], candidates, [], {})).toEqual([])
    expect(selectNextQuestion([question], candidates, [], {})?.id).toBe(question.id)
  })

  it('no encadena otra propuesta cuando ya no quedan preguntas discriminatorias', () => {
    const question: Question = {
      id: 'already_asked',
      text: '¿Tiene un rasgo?',
      attribute: 'marker',
      categories: ['object']
    }
    const candidates: RankedCandidate[] = [
      { id: 'first', name: 'Primero', category: 'object', attributes: { marker: true }, score: 0.6 },
      { id: 'second', name: 'Segundo', category: 'object', attributes: { marker: false }, score: 0.4 }
    ]
    const recovered = resolveGuess({
      category: 'object',
      askedQuestionIds: [question.id],
      answers: { [question.id]: 'yes' },
      rankedCandidates: candidates,
      currentQuestionId: null,
      guessCandidateId: 'first',
      excludedCandidateIds: [],
      questionCount: 5,
      status: 'guessing'
    }, false, { questions: [question], candidates })

    expect(recovered.status).toBe('lost')
    expect(recovered.guessCandidateId).toBeNull()
  })
})
