import { describe, expect, it } from 'vitest'
import { loadCategoryKnowledge } from '../src/data/catalog'
import { questions } from '../src/data/questions'
import { availableQuestions } from '../src/engine/questionAvailability'
import { expectedValue, rankCandidates } from '../src/engine/scoring'
import { answerCurrentQuestion, createGame, resolveGuess } from '../src/engine/gameEngine'

describe('animal regressions', () => {
  it('prioriza oca y descarta cigueña al confirmar que vive con personas o en granja', async () => {
    const knowledge = await loadCategoryKnowledge('animal')
    const questionsById = Object.fromEntries(knowledge.questions.map(question => [question.id, question]))
    const ranked = rankCandidates(knowledge.candidates, questionsById, {
      animal_mammal: 'no',
      animal_bird: 'yes',
      animal_lives_in_spain: 'yes',
      animal_domestic_farm_pet: 'yes',
      animal_air_or_water: 'sometimes',
      animal_black_white: 'yes',
      animal_long_neck: 'yes',
      animal_carnivore_predator: 'no',
      universal_larger_shoebox: 'yes',
      animal_semi_aquatic: 'sometimes',
      animal_bigger_than_dog: 'yes',
      animal_dangerous: 'sometimes',
      animal_nocturnal: 'no'
    })
    const goose = ranked.find(candidate => candidate.name === 'Oca')
    const stork = ranked.find(candidate => candidate.name === 'Cigüeña')

    expect(ranked[0]?.name).toBe('Oca')
    expect(goose?.score).toBeGreaterThan(0)
    expect(stork?.score).toBe(0)
    expect(goose?.attributes.domesticFarmPet).toBe(true)
    expect(goose?.attributes.primarilyWild).toBe(false)
    expect(stork?.attributes.domesticFarmPet).toBe(false)
    expect(stork?.attributes.primarilyWild).toBe(true)
  })

  it('evita preguntas redundantes o de pelaje tras confirmar que es un ave', () => {
    const animalQuestions = questions.filter(question => question.categories.includes('animal'))
    const available = availableQuestions(
      animalQuestions,
      ['animal_mammal', 'animal_bird'],
      { animal_mammal: 'no', animal_bird: 'yes' }
    )
    const availableIds = available.map(question => question.id)

    expect(availableIds).not.toEqual(expect.arrayContaining([
      'animal_feathers',
      'animal_oviparous',
      'animal_four_or_more_legs',
      'animal_vertebrate',
      'animal_striped',
      'animal_spotted'
    ]))
  })

  it('solo pregunta si vive en estado salvaje cuando la convivencia con personas queda ambigua', () => {
    const animalQuestions = questions.filter(question => question.categories.includes('animal'))
    const afterYes = availableQuestions(animalQuestions, ['animal_domestic_farm_pet'], { animal_domestic_farm_pet: 'yes' })
    const afterNo = availableQuestions(animalQuestions, ['animal_domestic_farm_pet'], { animal_domestic_farm_pet: 'no' })
    const afterSometimes = availableQuestions(animalQuestions, ['animal_domestic_farm_pet'], { animal_domestic_farm_pet: 'sometimes' })

    expect(afterYes.map(question => question.id)).not.toContain('animal_primarily_wild')
    expect(afterNo.map(question => question.id)).not.toContain('animal_primarily_wild')
    expect(afterSometimes.map(question => question.id)).toContain('animal_primarily_wild')
  })

  it('llega a oca sin gastar turnos en rasgos ya implicados por ser ave', async () => {
    const knowledge = await loadCategoryKnowledge('animal')
    const goose = knowledge.candidates.find(candidate => candidate.name === 'Oca')
    expect(goose).toBeDefined()
    if (!goose) return

    let state = createGame('animal', knowledge)
    const askedIds: string[] = []
    while (state.status === 'playing') {
      const question = knowledge.questions.find(item => item.id === state.currentQuestionId)
      expect(question).toBeDefined()
      if (!question) break
      askedIds.push(question.id)
      const value = expectedValue(goose, question)
      state = answerCurrentQuestion(
        state,
        value === true ? 'yes' : value === false ? 'no' : value === 0.5 ? 'sometimes' : 'unknown',
        knowledge
      )
    }

    expect(askedIds).not.toEqual(expect.arrayContaining([
      'animal_feathers',
      'animal_oviparous',
      'animal_four_or_more_legs',
      'animal_vertebrate',
      'animal_striped',
      'animal_spotted'
    ]))
    expect(state.guessCandidateId).toBe(goose.id)
    expect(state.questionCount).toBeLessThanOrEqual(12)
  })

  it('no vuelve a preguntar por otras clases animales tras confirmar mamifero', () => {
    const animalQuestions = questions.filter(question => question.categories.includes('animal'))
    const available = availableQuestions(animalQuestions, ['animal_mammal'], { animal_mammal: 'yes' })
    const availableIds = available.map(question => question.id)

    expect(availableIds).not.toEqual(expect.arrayContaining([
      'animal_bird',
      'animal_reptile',
      'animal_amphibian',
      'animal_crustacean',
      'animal_arachnid',
      'animal_insect',
      'animal_mollusk'
    ]))
  })

  it('penaliza las ardillas frente a respuestas de carnivoro grande de cuatro patas', async () => {
    const knowledge = await loadCategoryKnowledge('animal')
    const questionsById = Object.fromEntries(knowledge.questions.map(question => [question.id, question]))
    const ranked = rankCandidates(knowledge.candidates, questionsById, {
      animal_mammal: 'yes',
      animal_carnivore_predator: 'yes',
      animal_four_or_more_legs: 'yes',
      universal_larger_shoebox: 'yes'
    })
    const tiger = ranked.find(candidate => candidate.name === 'Tigre')
    const squirrel = ranked.find(candidate => candidate.name === 'Ardilla')

    expect(ranked[0]?.name).not.toContain('Ardilla')
    expect(tiger?.score).toBeGreaterThan(squirrel?.score ?? 0)
  })

  it('distingue tiburon de delfin usando la pregunta de mamifero del set maestro', async () => {
    const knowledge = await loadCategoryKnowledge('animal')
    const questionsById = Object.fromEntries(knowledge.questions.map(question => [question.id, question]))
    const ranked = rankCandidates(knowledge.candidates, questionsById, {
      universal_larger_shoebox: 'yes',
      animal_vertebrate: 'yes',
      animal_mammal: 'no',
      animal_air_or_water: 'yes',
      animal_carnivore_predator: 'yes',
      animal_four_or_more_legs: 'no'
    })
    const shark = ranked.find(candidate => candidate.name === 'Tiburón')
    const dolphin = ranked.find(candidate => candidate.name === 'Delfín')

    expect(shark?.score).toBeGreaterThan(dolphin?.score ?? 0)
    expect(ranked.findIndex(candidate => candidate.name === 'Tiburón')).toBeLessThan(5)
  })

  it('prioriza toro tras respuestas de animal de granja grande con cuernos', async () => {
    const knowledge = await loadCategoryKnowledge('animal')
    const questionsById = Object.fromEntries(knowledge.questions.map(question => [question.id, question]))
    const ranked = rankCandidates(knowledge.candidates, questionsById, {
      animal_carnivore_predator: 'no',
      animal_mammal: 'yes',
      animal_domestic_farm_pet: 'yes',
      animal_lives_in_spain: 'yes',
      animal_spotted: 'sometimes',
      animal_bigger_than_dog: 'yes',
      animal_antlers: 'yes',
      animal_canid: 'no',
      animal_dangerous: 'sometimes',
      animal_four_or_more_legs: 'yes',
      animal_nocturnal: 'no',
      animal_striped: 'no',
      universal_larger_shoebox: 'yes',
      animal_air_or_water: 'no',
      animal_oviparous: 'no'
    })
    const bull = ranked.find(candidate => candidate.name === 'Toro')
    const elephant = ranked.find(candidate => candidate.name === 'Elefante')
    const deer = ranked.find(candidate => candidate.name === 'Cervidae')
    const goat = ranked.find(candidate => candidate.name === 'Cabra de las Rocosas')

    expect(['Toro', 'Vaca']).toContain(ranked[0]?.name)
    expect(bull?.score ?? 0).toBeGreaterThan(elephant?.score ?? 0)
    expect(bull?.score ?? 0).toBeGreaterThan(deer?.score ?? 0)
    expect(bull?.score ?? 0).toBeGreaterThan(goat?.score ?? 0)
  })

  it('distingue toro de vaca con la pregunta de macho bovino', async () => {
    const knowledge = await loadCategoryKnowledge('animal')
    const questionsById = Object.fromEntries(knowledge.questions.map(question => [question.id, question]))
    const ranked = rankCandidates(knowledge.candidates, questionsById, {
      animal_carnivore_predator: 'no',
      animal_mammal: 'yes',
      animal_domestic_farm_pet: 'yes',
      animal_antlers: 'yes',
      animal_male_bovine: 'yes'
    })

    expect(ranked[0]?.name).toBe('Toro')
    expect(ranked.find(candidate => candidate.name === 'Toro')?.score ?? 0)
      .toBeGreaterThan(ranked.find(candidate => candidate.name === 'Vaca')?.score ?? 0)
  })

  it('llega a toro como candidato final con sus respuestas exactas', async () => {
    const knowledge = await loadCategoryKnowledge('animal')
    const bull = knowledge.candidates.find(candidate => candidate.name === 'Toro')
    expect(bull).toBeDefined()
    if (!bull) return

    let state = createGame('animal', knowledge)
    const askedTexts: string[] = []
    while (state.status === 'playing') {
      const question = knowledge.questions.find(item => item.id === state.currentQuestionId)
      expect(question).toBeDefined()
      if (!question) break
      askedTexts.push(question.text)
      const value = expectedValue(bull, question)
      state = answerCurrentQuestion(
        state,
        value === true ? 'yes' : value === false ? 'no' : value === 0.5 ? 'sometimes' : 'unknown',
        knowledge
      )
    }

    expect(askedTexts, askedTexts.join(' | ')).toContain('¿Tiene pezuñas?')
    expect(askedTexts).toContain('¿Tiene cornamenta o cuernos visibles?')
    expect(state.guessCandidateId).toBe('bull')
    expect(state.questionCount).toBeLessThanOrEqual(20)
  })

  it('descarta animales no felinos tras confirmar que es un felino', async () => {
    const knowledge = await loadCategoryKnowledge('animal')
    const questionsById = Object.fromEntries(knowledge.questions.map(question => [question.id, question]))
    const ranked = rankCandidates(knowledge.candidates, questionsById, {
      animal_mammal: 'yes',
      animal_domestic_farm_pet: 'no',
      animal_four_or_more_legs: 'yes',
      animal_feline: 'yes',
      animal_spotted: 'no',
      animal_striped: 'no',
      animal_bigger_than_dog: 'yes',
      animal_air_or_water: 'no',
      animal_lives_in_spain: 'no',
      animal_oviparous: 'no',
      animal_hoofed: 'no',
      animal_black_white: 'no',
      animal_marsupial: 'no',
      animal_antlers: 'no',
      animal_very_fast_runner: 'no',
      animal_trunk: 'no',
      animal_primate: 'no',
      animal_canid: 'no',
      animal_semi_aquatic: 'no'
    })
    const viable = ranked.filter(candidate => candidate.score > 0)

    expect(viable.length).toBeGreaterThan(0)
    expect(viable.every(candidate => candidate.attributes.feline === true)).toBe(true)
    expect(ranked.find(candidate => candidate.name === 'Gorila')?.score).toBe(0)
    expect(ranked.find(candidate => candidate.name === 'Jaguar')?.score).toBeGreaterThan(0)
  })

  it('usa rasgos discriminatorios para llegar antes a tigre', async () => {
    const knowledge = await loadCategoryKnowledge('animal')
    const tiger = knowledge.candidates.find(candidate => candidate.name === 'Tigre')
    expect(tiger).toBeDefined()
    if (!tiger) return

    let state = createGame('animal', knowledge)
    const askedTexts: string[] = []
    while (state.status === 'playing') {
      const question = knowledge.questions.find(item => item.id === state.currentQuestionId)
      expect(question).toBeDefined()
      if (!question) break
      askedTexts.push(question.text)
      const value = expectedValue(tiger, question)
      state = answerCurrentQuestion(
        state,
        value === true ? 'yes' : value === false ? 'no' : value === 0.5 ? 'sometimes' : 'unknown',
        knowledge
      )
    }

    expect(askedTexts, askedTexts.join(' | ')).toContain('¿Tiene rayas?')
    expect(askedTexts).not.toContain('¿Existe de forma física y tangible?')
    expect(askedTexts).not.toContain('¿Es un objeto o personaje de ficción / creado por el ser humano?')
    expect(state.rankedCandidates.findIndex(candidate => candidate.name === 'Tigre')).toBeLessThan(5)
    expect(state.questionCount).toBeLessThanOrEqual(12)
  })

  it('no encadena candidatos tras fallar si ya agoto las preguntas', async () => {
    const knowledge = await loadCategoryKnowledge('animal')
    const owl = knowledge.candidates.find(candidate => candidate.name === 'Búho')
    const sparrow = knowledge.candidates.find(candidate => candidate.name === 'Gorrión')
    expect(owl).toBeDefined()
    expect(sparrow).toBeDefined()
    if (!owl || !sparrow) return

    const narrowedKnowledge = {
      candidates: [sparrow, owl],
      questions: knowledge.questions
    }
    const state = {
      ...createGame('animal', narrowedKnowledge),
      askedQuestionIds: knowledge.questions.map(question => question.id),
      currentQuestionId: null,
      guessCandidateId: sparrow.id,
      rankedCandidates: [
        { ...sparrow, score: 0.6 },
        { ...owl, score: 0.4 }
      ],
      questionCount: 11,
      status: 'guessing' as const
    }

    const next = resolveGuess(state, false, narrowedKnowledge)

    expect(next.status).toBe('lost')
    expect(next.excludedCandidateIds).toContain(sparrow.id)
    expect(next.guessCandidateId).toBeNull()
    expect(next.questionCount).toBe(11)
  })

  it('resuelve perro sin preguntar por fauna iberica ni desplazamiento acuatico', async () => {
    const knowledge = await loadCategoryKnowledge('animal')
    const dog = knowledge.candidates.find(candidate => candidate.name === 'Perro')
    expect(dog).toBeDefined()
    if (!dog) return

    let state = createGame('animal', knowledge)
    const askedTexts: string[] = []
    while (state.status === 'playing') {
      const question = knowledge.questions.find(item => item.id === state.currentQuestionId)
      expect(question).toBeDefined()
      if (!question) break
      askedTexts.push(question.text)
      const value = expectedValue(dog, question)
      state = answerCurrentQuestion(
        state,
        value === true ? 'yes' : value === false ? 'no' : value === 0.5 ? 'sometimes' : 'unknown',
        knowledge
      )
    }

    expect(askedTexts).not.toContain('¿Vive normalmente en España o en la fauna ibérica?')
    expect(askedTexts).not.toContain('¿Suele desplazarse principalmente por el aire o el agua?')
    expect(state.guessCandidateId).toBe(dog.id)
    expect(state.questionCount).toBeLessThanOrEqual(10)
  })
})
