import { describe, expect, it } from 'vitest'
import { shouldAskQuestion } from '../engine/questionAvailability'
import { loadCategoryKnowledge } from './catalog'

const africanExamples = [
  'Nelson Mandela',
  'Cleopatra',
  'Nefertiti',
  'Tutankamón',
  'Khufu',
  'Narmer',
  'Thutmose III',
  'Djoser',
  'Ramesses I',
  'Seti I'
]

describe('geografía de personas', () => {
  it('clasifica como africanas las fichas conocidas y las duplicadas prioritarias', async () => {
    const knowledge = await loadCategoryKnowledge('person')

    for (const name of africanExamples) {
      const candidate = knowledge.candidates.find(item => item.name === name)
      expect(candidate, `${name} debe existir en el catálogo`).toBeDefined()
      expect(candidate?.attributes.africa, `${name} debe estar asociado con África`).toBe(true)
      expect(candidate?.attributes.europe).not.toBe(true)
      expect(candidate?.attributes.americas).not.toBe(true)
      expect(candidate?.attributes.asia).not.toBe(true)
      expect(candidate?.attributes.westernHemisphere).toBe(false)
    }
  })

  it('mantiene una única región principal en todas las fichas africanas', async () => {
    const knowledge = await loadCategoryKnowledge('person')
    const africanCandidates = knowledge.candidates.filter(candidate => candidate.attributes.africa === true)

    expect(africanCandidates.length).toBeGreaterThan(40)
    expect(africanCandidates.every(candidate =>
      candidate.attributes.europe !== true &&
      candidate.attributes.americas !== true &&
      candidate.attributes.asia !== true &&
      candidate.attributes.westernHemisphere === false
    )).toBe(true)
  })

  it('ofrece Asia y África sólo en la rama no occidental y deja de preguntar continentes tras afirmarlos', async () => {
    const { questions } = await loadCategoryKnowledge('person')
    const questionsById = Object.fromEntries(questions.map(question => [question.id, question]))
    const asia = questionsById.person_asia_origin
    const africa = questionsById.person_africa_origin
    const americas = questionsById.person_americas_origin

    expect(shouldAskQuestion(asia, questionsById, { culture_western_hemisphere: 'no' })).toBe(true)
    expect(shouldAskQuestion(africa, questionsById, { culture_western_hemisphere: 'no' })).toBe(true)
    expect(shouldAskQuestion(americas, questionsById, { culture_western_hemisphere: 'no' })).toBe(false)
    expect(shouldAskQuestion(asia, questionsById, {
      culture_western_hemisphere: 'no',
      person_africa_origin: 'yes'
    })).toBe(false)
    expect(shouldAskQuestion(africa, questionsById, {
      culture_western_hemisphere: 'no',
      person_asia_origin: 'yes'
    })).toBe(false)
    expect(shouldAskQuestion(asia, questionsById, { culture_western_hemisphere: 'yes' })).toBe(false)
    expect(shouldAskQuestion(africa, questionsById, { culture_western_hemisphere: 'yes' })).toBe(false)
  })
})
