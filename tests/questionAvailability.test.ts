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

const animalKindQuestions: Question[] = [
  {
    id: 'animal_mammal',
    text: '¿Es un mamífero?',
    attribute: 'mammal',
    categories: ['animal'],
    exclusiveGroup: 'animal-kind'
  },
  {
    id: 'animal_bird',
    text: '¿Es un ave?',
    attribute: 'bird',
    categories: ['animal'],
    exclusiveGroup: 'animal-kind'
  },
  {
    id: 'animal_mollusk',
    text: '¿Es un molusco?',
    attribute: 'mollusk',
    categories: ['animal'],
    exclusiveGroup: 'animal-kind'
  },
  {
    id: 'animal_fur',
    text: '¿Tiene pelo o pelaje?',
    attribute: 'fur',
    categories: ['animal']
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

  it('descarta otras clases animales tras una respuesta afirmativa', () => {
    const available = availableQuestions(animalKindQuestions, ['animal_mammal'], { animal_mammal: 'yes' })

    expect(available.map(question => question.id)).toEqual(['animal_fur'])
  })
})
