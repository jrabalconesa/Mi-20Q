import { describe, expect, it } from 'vitest'
import { loadCategoryKnowledge } from '../src/data/catalog'
import { validateCatalog } from '../src/engine/catalogValidation'

describe('catalog', () => {
  it('enriquece los objetos con conocimiento derivado', async () => {
    const knowledge = await loadCategoryKnowledge('object')
    const guitar = knowledge.candidates.find(candidate => candidate.name === 'Guitarra')
    const phone = knowledge.candidates.find(candidate => candidate.name === 'Teléfono móvil')
    const spoon = knowledge.candidates.find(candidate => candidate.name === 'Cuchara')

    expect(guitar?.attributes.musicalInstrument).toBe(true)
    expect(guitar?.attributes.portable).toBe(true)
    expect(guitar?.attributes.indoors).toBe(true)
    expect(guitar?.attributes.largerThanShoebox).toBe(true)
    expect(phone?.attributes.largerThanShoebox).toBe(false)
    expect(spoon?.attributes.kitchenFood).toBe(true)
    expect(spoon?.attributes.cutlery).toBe(true)
    expect(spoon?.attributes.hasHandle).toBe(true)
    expect(spoon?.attributes.concave).toBe(true)
  })

  it('incluye la pregunta de caja de zapatos para animales y objetos', async () => {
    const animalKnowledge = await loadCategoryKnowledge('animal')
    const objectKnowledge = await loadCategoryKnowledge('object')
    const dog = animalKnowledge.candidates.find(candidate => candidate.name === 'Perro')
    const bee = animalKnowledge.candidates.find(candidate => candidate.name === 'Abeja')
    const cow = animalKnowledge.candidates.find(candidate => candidate.name === 'Vaca')
    const horse = animalKnowledge.candidates.find(candidate => candidate.name === 'Caballo')
    const bull = animalKnowledge.candidates.find(candidate => candidate.name === 'Toro')

    expect(animalKnowledge.questions).toContainEqual(expect.objectContaining({
      attribute: 'largerThanShoebox',
      text: '¿Es más grande que una caja de zapatos?'
    }))
    expect(animalKnowledge.questions).toContainEqual(expect.objectContaining({
      attribute: 'hasAntlers',
      text: '¿Tiene cornamenta o cuernos visibles?'
    }))
    expect(animalKnowledge.questions).toContainEqual(expect.objectContaining({
      attribute: 'maleBovine',
      text: '¿Es un macho bovino, como un toro?'
    }))
    expect(objectKnowledge.questions).toContainEqual(expect.objectContaining({
      attribute: 'largerThanShoebox',
      text: '¿Es más grande que una caja de zapatos?'
    }))
    expect(objectKnowledge.questions).toContainEqual(expect.objectContaining({
      attribute: 'cutlery',
      text: '¿Es un cubierto o utensilio para comer?'
    }))
    expect(animalKnowledge.questions.length).toBeGreaterThan(12)
    expect(objectKnowledge.questions.length).toBeGreaterThanOrEqual(20)
    expect(dog?.attributes.largerThanShoebox).toBe(true)
    expect(bee?.attributes.largerThanShoebox).toBe(false)
    expect(cow?.attributes.hasAntlers).toBe(true)
    expect(cow?.attributes.maleBovine).toBe(false)
    expect(bull?.attributes.hasAntlers).toBe(true)
    expect(bull?.attributes.maleBovine).toBe(true)
    expect(horse?.attributes.hasAntlers).toBe(false)
  })

  it('valida tamano y duplicados del catalogo base', async () => {
    const categories = ['animal', 'object', 'place', 'person'] as const
    const knowledge = await Promise.all(categories.map(loadCategoryKnowledge))
    const candidates = knowledge.flatMap(category => category.candidates)
    const questions = knowledge.flatMap(category => category.questions)

    const issues = [
      ...validateCatalog(candidates, questions, ['animal'], { minCandidates: 600, minCoverage: 0 }),
      ...validateCatalog(candidates, questions, ['object', 'place', 'person'], { minCoverage: 0 })
    ]

    expect(issues).toEqual([])
  })

  it('normaliza animales a nombres comunes y personas a formas frecuentes en espanol', async () => {
    const animalKnowledge = await loadCategoryKnowledge('animal')
    const personKnowledge = await loadCategoryKnowledge('person')
    const animalNames = animalKnowledge.candidates.map(candidate => candidate.name)
    const personNames = personKnowledge.candidates.map(candidate => candidate.name)

    expect(animalNames).toContain('Ardilla')
    expect(animalNames).toContain('Tigre')
    expect(animalNames).not.toContain('Ardilla gris de las Carolinas')
    expect(animalNames).not.toContain('Panthera tigris')
    expect(personNames).toEqual(expect.arrayContaining([
      'Aristóteles',
      'Julio César',
      'Cristóbal Colón',
      'Pedro Sánchez',
      'Rafa Nadal',
      'Rosalía'
    ]))
  })

  it('incorpora personajes reales del csv y descarta filas sinteticas redundantes', async () => {
    const personKnowledge = await loadCategoryKnowledge('person')
    const personNames = personKnowledge.candidates.map(candidate => candidate.name)
    const fernandoAlonso = personKnowledge.candidates.find(candidate => candidate.name === 'Fernando Alonso')
    const donQuijote = personKnowledge.candidates.find(candidate => candidate.name === 'Don Quijote de la Mancha')
    const gandhi = personKnowledge.candidates.find(candidate => candidate.name === 'Mahatma Gandhi')
    const julioCesar = personKnowledge.candidates.find(candidate => candidate.name === 'Julio César')
    const rosalia = personKnowledge.candidates.find(candidate => candidate.name === 'Rosalía')

    expect(personNames).toEqual(expect.arrayContaining([
      'Julio Iglesias',
      'Fernando Alonso',
      'Lope de Vega',
      'Margarita Salas',
      'Javier Bardem'
    ]))
    expect(personNames).not.toContain('Marta González 280 (Cine y Espectáculo Ref)')
    expect(personNames).not.toContain('Rafael Nadal')
    expect(fernandoAlonso?.attributes.sports).toBe(true)
    expect(fernandoAlonso?.attributes.spanishOrigin).toBe(true)
    expect(donQuijote?.attributes.realPerson).toBe(false)
    expect(donQuijote?.attributes.artificialOrFictional).toBe(true)
    expect(gandhi?.attributes.asia).toBe(true)
    expect(gandhi?.attributes.religiousSpiritual).toBe(true)
    expect(gandhi?.attributes.civicLeader).toBe(true)
    expect(julioCesar?.attributes.ancientClassical).toBe(true)
    expect(julioCesar?.attributes.romanWorld).toBe(true)
    expect(rosalia?.attributes.living).toBe(true)
  })

  it('incluye figuras antiguas y mitologicas frecuentes en espanol', async () => {
    const personKnowledge = await loadCategoryKnowledge('person')
    const names = personKnowledge.candidates.map(candidate => candidate.name)
    const byName = (name: string) => personKnowledge.candidates.find(candidate => candidate.name === name)

    expect(names).toEqual(expect.arrayContaining([
      'Atila',
      'Aníbal Barca',
      'Homero',
      'Ulises',
      'Hércules',
      'Nerón',
      'Séneca',
      'Cleopatra',
      'Hipatia de Alejandría',
      'Zeus',
      'Poseidón',
      'Afrodita',
      'Cupido',
      'Ares',
      'Marte',
      'Minotauro',
      'Atenea',
      'Apolo',
      'Hades',
      'Medusa',
      'Perseo',
      'Orión',
      'Casiopea',
      'Centauro'
    ]))
    expect(names).not.toContain('Nero')
    expect(names).not.toContain('Hypatia of Alexandria')
    expect(byName('Zeus')?.attributes.greekMythology).toBe(true)
    expect(byName('Zeus')?.attributes.deity).toBe(true)
    expect(byName('Zeus')?.attributes.olympianLeader).toBe(true)
    expect(byName('Hércules')?.attributes.mythicHero).toBe(true)
    expect(byName('Hércules')?.attributes.exceptionalStrength).toBe(true)
    expect(byName('Poseidón')?.attributes.seaAssociation).toBe(true)
    expect(byName('Poseidón')?.attributes.olympianLeader).toBe(false)
    expect(byName('Afrodita')?.attributes.woman).toBe(true)
    expect(byName('Afrodita')?.attributes.loveBeauty).toBe(true)
    expect(byName('Cupido')?.attributes.romanMythology).toBe(true)
    expect(byName('Cupido')?.attributes.loveBeauty).toBe(true)
    expect(byName('Ares')?.attributes.warAssociation).toBe(true)
    expect(byName('Marte')?.attributes.romanMythology).toBe(true)
    expect(byName('Minotauro')?.attributes.mythicMonster).toBe(true)
    expect(byName('Medusa')?.attributes.mythicMonster).toBe(true)
    expect(byName('Perseo')?.attributes.mythicHero).toBe(true)
    expect(byName('Perseo')?.attributes.slaysMonster).toBe(true)
    expect(byName('Ulises')?.attributes.legendaryVoyage).toBe(true)
    expect(byName('Orión')?.attributes.constellationAssociation).toBe(true)
    expect(byName('Orión')?.attributes.hunterAssociation).toBe(true)
    expect(byName('Casiopea')?.attributes.woman).toBe(true)
    expect(byName('Casiopea')?.attributes.constellationAssociation).toBe(true)
    expect(byName('Centauro')?.attributes.halfHumanHalfAnimal).toBe(true)
    expect(byName('Nerón')?.attributes.romanWorld).toBe(true)
    expect(byName('Hipatia de Alejandría')?.attributes.scientist).toBe(true)
  })

  it('traduce nombres frecuentes de personas y lugares al uso habitual en espanol', async () => {
    const [personKnowledge, placeKnowledge] = await Promise.all([
      loadCategoryKnowledge('person'),
      loadCategoryKnowledge('place')
    ])
    const personNames = personKnowledge.candidates.map(candidate => candidate.name)
    const placeNames = placeKnowledge.candidates.map(candidate => candidate.name)

    expect(personNames).toEqual(expect.arrayContaining([
      'Isabel I de Inglaterra',
      'Luis XIV de Francia',
      'Jerjes I de Persia',
      'Diógenes de Sinope',
      'Enrique VIII de Inglaterra',
      'Ciro el Grande',
      'Solimán el Magnífico',
      'Francisco de Asís',
      'Carlos V',
      'Juan Pablo II'
    ]))
    expect(placeNames).toContain('San Petersburgo')
    expect(placeNames).toContain('Ciudad de México')
    expect(placeNames).toContain('Londres')
    expect(placeNames).toContain('Moscú')
    expect(personNames).not.toEqual(expect.arrayContaining([
      'Elizabeth I of England',
      'Louis XIV of France',
      'Xerxes I of Persia',
      'Diogenes of Sinope',
      'Henry VIII of England',
      'Cyrus the Great',
      'Suleiman the Magnificent',
      'Francis of Assisi',
      'Charles V, Holy Roman Emperor',
      'Pope John Paul II'
    ]))
    expect(placeNames).not.toContain('Saint Petersburg')
    expect(placeNames).not.toContain('Mexico City')
    expect(placeNames).not.toContain('London')
  })

  it('refuerza Paris con atributos geograficos discriminatorios', async () => {
    const placeKnowledge = await loadCategoryKnowledge('place')
    const paris = placeKnowledge.candidates.find(candidate => candidate.name === 'París')
    const questionIds = placeKnowledge.questions.map(question => question.id)

    expect(paris?.attributes.capital).toBe(true)
    expect(paris?.attributes.inFrance).toBe(true)
    expect(paris?.attributes.europe).toBe(true)
    expect(paris?.attributes.americas).toBe(false)
    expect(paris?.attributes.westernHemisphere).toBe(true)
    expect(paris?.attributes.before1900).toBe(true)
    expect(placeKnowledge.questions.length).toBeGreaterThanOrEqual(20)
    expect(questionIds).toEqual(expect.arrayContaining([
      'place_in_europe',
      'place_in_americas',
      'place_in_france',
      'place_large_city'
    ]))
  })

  it('usa preguntas coherentes con la categoria persona', async () => {
    const personKnowledge = await loadCategoryKnowledge('person')
    const personQuestionIds = personKnowledge.questions.map(question => question.id)

    expect(personQuestionIds).toContain('person_fictional')
    expect(personQuestionIds).not.toEqual(expect.arrayContaining([
      'universal_indoors',
      'universal_larger_shoebox',
      'universal_digital_electronic',
      'universal_tangible',
      'universal_artificial_or_fictional'
    ]))
  })
})
