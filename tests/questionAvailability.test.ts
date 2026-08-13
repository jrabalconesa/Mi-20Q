import { describe, expect, it } from 'vitest'
import { availableQuestions } from '../src/engine/questionAvailability'
import type { Question } from '../src/types/game'

const questions: Question[] = [
  {
    id: 'person_europe',
    text: '¿Nació en Europa?',
    attribute: 'europe',
    categories: ['person'],
    exclusiveGroup: 'person-birth-continent'
  },
  {
    id: 'person_asia',
    text: '¿Nació en Asia?',
    attribute: 'asia',
    categories: ['person'],
    exclusiveGroup: 'person-birth-continent'
  },
  {
    id: 'person_artist',
    text: '¿Se dedica o se dedicó al arte?',
    attribute: 'artist',
    categories: ['person']
  }
]

describe('availableQuestions', () => {
  it('descarta el resto de continentes tras una respuesta afirmativa', () => {
    const available = availableQuestions(questions, ['person_europe'], { person_europe: 'yes' })

    expect(available.map(question => question.id)).toEqual(['person_artist'])
  })

  it('mantiene el resto de continentes tras una respuesta negativa', () => {
    const available = availableQuestions(questions, ['person_europe'], { person_europe: 'no' })

    expect(available.map(question => question.id)).toEqual(['person_asia', 'person_artist'])
  })
})
