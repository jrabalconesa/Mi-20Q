import type { Category, Question } from '../types/game'

const allCategories: Category[] = ['animal', 'object', 'place', 'person']
const animal: Category[] = ['animal']
const object: Category[] = ['object']
const place: Category[] = ['place']
const person: Category[] = ['person']
const culture: Category[] = ['place', 'person']

export const questions: Question[] = [
  {
    id: 'universal_artificial_or_fictional',
    text: '¿Es un objeto o personaje de ficción / creado por el ser humano?',
    attribute: 'artificialOrFictional',
    categories: allCategories
  },
  {
    id: 'universal_indoors',
    text: '¿Se puede encontrar normalmente en interiores o dentro de una casa?',
    attribute: 'indoors',
    categories: allCategories
  },
  {
    id: 'universal_larger_shoebox',
    text: '¿Es más grande que una caja de zapatos?',
    attribute: 'largerThanShoebox',
    categories: allCategories
  },
  {
    id: 'universal_digital_electronic',
    text: '¿Se interactúa con ello principalmente de forma digital o electrónica?',
    attribute: 'digitalOrElectronic',
    categories: allCategories
  },
  {
    id: 'universal_tangible',
    text: '¿Existe de forma física y tangible?',
    attribute: 'tangible',
    categories: allCategories
  },
  {
    id: 'animal_vertebrate',
    text: '¿Es un animal vertebrado?',
    attribute: 'vertebrate',
    categories: animal
  },
  {
    id: 'animal_mammal',
    text: '¿Es un mamífero?',
    attribute: 'mammal',
    categories: animal
  },
  {
    id: 'animal_domestic_farm_pet',
    text: '¿Es un animal doméstico, de granja o mascota común?',
    attribute: 'domesticFarmPet',
    categories: animal
  },
  {
    id: 'animal_air_or_water',
    text: '¿Suele desplazarse principalmente por el aire o el agua?',
    attribute: 'movesByAirOrWater',
    categories: animal
  },
  {
    id: 'animal_carnivore_predator',
    text: '¿Es principalmente carnívoro o depredador?',
    attribute: 'carnivore',
    categories: animal
  },
  {
    id: 'animal_four_or_more_legs',
    text: '¿Tiene cuatro patas o más?',
    attribute: 'fourOrMoreLegs',
    categories: animal
  },
  {
    id: 'animal_feline_or_canid',
    text: '¿Pertenece a la familia de los felinos o cánidos?',
    attribute: 'felineOrCanid',
    categories: animal
  },
  {
    id: 'object_moving_mechanical_electronic',
    text: '¿Tiene partes móviles, mecánicas o electrónicas?',
    attribute: 'movingMechanicalElectronic',
    categories: object
  },
  {
    id: 'object_work_study_tool',
    text: '¿Se utiliza principalmente como una herramienta de trabajo o estudio?',
    attribute: 'workStudyTool',
    categories: object
  },
  {
    id: 'object_store_contain_transport',
    text: '¿Su función principal es almacenar, contener o transportar cosas?',
    attribute: 'storeContainTransport',
    categories: object
  },
  {
    id: 'object_wearable',
    text: '¿Es algo que las personas visten, calzan o llevan puesto en el cuerpo?',
    attribute: 'wearable',
    categories: object
  },
  {
    id: 'object_kitchen_food',
    text: '¿Se utiliza principalmente en la cocina o está relacionado con la alimentación?',
    attribute: 'kitchenFood',
    categories: object
  },
  {
    id: 'object_metal_or_plastic',
    text: '¿Está hecho principalmente de metal o plástico?',
    attribute: 'metalOrPlastic',
    categories: object
  },
  {
    id: 'person_real',
    text: '¿Es (o fue) una persona real de carne y hueso?',
    attribute: 'realPerson',
    categories: person
  },
  {
    id: 'culture_before_1900',
    text: '¿Nació o se originó antes del año 1900?',
    attribute: 'before1900',
    categories: culture
  },
  {
    id: 'person_art_entertainment_sport',
    text: '¿Es una figura conocida principalmente por el arte, entretenimiento o deporte?',
    attribute: 'artEntertainmentSport',
    categories: person
  },
  {
    id: 'place_geographic_or_built',
    text: '¿Es un lugar geográfico o una estructura construida por el hombre?',
    attribute: 'geographicOrBuilt',
    categories: place
  },
  {
    id: 'culture_western_hemisphere',
    text: '¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)?',
    attribute: 'westernHemisphere',
    categories: culture
  },
  {
    id: 'person_woman',
    text: '¿Es una persona o personaje de género femenino?',
    attribute: 'woman',
    categories: person
  },
  {
    id: 'person_science_politics_leadership',
    text: '¿Está relacionado principalmente con la ciencia, la política o el liderazgo histórico?',
    attribute: 'sciencePoliticsLeadership',
    categories: person
  }
]
