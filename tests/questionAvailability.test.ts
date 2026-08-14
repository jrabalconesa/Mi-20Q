import { describe, expect, it } from 'vitest'
import { questions as appQuestions } from '../src/data/questions'
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

  it('solo activa una pregunta condicionada cuando la respuesta previa encaja', () => {
    const conditionalQuestions: Question[] = [
      { id: 'place_political', text: '¿Es una ciudad?', attribute: 'politicalDivision', categories: ['place'] },
      {
        id: 'place_capital',
        text: '¿Es una capital?',
        attribute: 'capital',
        categories: ['place'],
        askIf: [{ questionId: 'place_political', answers: ['yes'] }]
      }
    ]

    expect(availableQuestions(conditionalQuestions, ['place_political'], { place_political: 'no' }).map(question => question.id)).toEqual([])
    expect(availableQuestions(conditionalQuestions, ['place_political'], { place_political: 'yes' }).map(question => question.id)).toEqual(['place_capital'])
  })

  it('evita preguntas de mamifero tras descartar que sea mamifero', () => {
    const available = availableQuestions(appQuestions.filter(question => question.categories.includes('animal')), ['animal_mammal'], { animal_mammal: 'no' })
    const ids = available.map(question => question.id)

    expect(ids).not.toEqual(expect.arrayContaining([
      'animal_feline',
      'animal_canid',
      'animal_antlers',
      'animal_male_bovine'
    ]))
  })

  it('evita preguntas urbanas cuando un lugar no es division politica', () => {
    const available = availableQuestions(appQuestions.filter(question => question.categories.includes('place')), ['place_political_division'], { place_political_division: 'no' })
    const ids = available.map(question => question.id)

    expect(ids).not.toEqual(expect.arrayContaining(['place_capital', 'place_large_city']))
  })

  it('evita preguntar si es cubierto cuando no esta relacionado con cocina o alimentacion', () => {
    const available = availableQuestions(appQuestions.filter(question => question.categories.includes('object')), ['object_kitchen_food'], { object_kitchen_food: 'no' })

    expect(available.map(question => question.id)).not.toContain('object_cutlery')
  })
})
