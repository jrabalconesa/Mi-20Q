import { describe, expect, it } from 'vitest'
import { coreCandidates } from '../src/data/candidates'
import { questions } from '../src/data/questions'
import { SMOOTHED_NO } from '../src/engine/scoring'
import { applyExperience, readExperience, reinforceCandidate } from '../src/experience'
import { createGame } from '../src/engine/gameEngine'

describe('adaptación por experiencia', () => {
  it('refuerza las relaciones pregunta-candidato sin sustituir el conocimiento previo de golpe', () => {
    const knowledge = { candidates: coreCandidates, questions }
    const state = {
      ...createGame('animal', knowledge),
      status: 'won' as const,
      guessCandidateId: 'dog',
      answers: { animal_domestic_farm_pet: 'no' as const }
    }
    const experiences = reinforceCandidate([], state, knowledge)
    const adapted = applyExperience(knowledge, experiences)
    const dog = adapted.candidates.find(candidate => candidate.id === 'dog')

    expect(experiences[0].attributes.domesticFarmPet).toEqual({ mean: SMOOTHED_NO, samples: 1 })
    expect(dog?.attributes.domesticFarmPet).toBeCloseTo(0.38)
  })

  it('tolera almacenamiento corrupto', () => {
    expect(readExperience({ getItem: () => 'null' })).toEqual([])
  })
})
