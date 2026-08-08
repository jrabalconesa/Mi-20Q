import type { Category, Question } from '../types/game'

const animal: Category[] = ['animal']
const object: Category[] = ['object']
const place: Category[] = ['place']
const person: Category[] = ['person']

export const questions: Question[] = [
  { id: 'animal_domestic', text: '¿Suele vivir con personas?', attribute: 'domestic', categories: animal },
  { id: 'animal_large', text: '¿Es más grande que una persona?', attribute: 'large', categories: animal },
  { id: 'animal_flies', text: '¿Puede volar?', attribute: 'flies', categories: animal },
  { id: 'animal_water', text: '¿Vive principalmente en el agua?', attribute: 'water', categories: animal },
  { id: 'animal_four_legs', text: '¿Tiene cuatro patas?', attribute: 'fourLegs', categories: animal },
  { id: 'animal_dangerous', text: '¿Puede resultar peligroso para una persona?', attribute: 'dangerous', categories: animal },
  { id: 'animal_fur', text: '¿Tiene pelo o pelaje?', attribute: 'fur', categories: animal },
  { id: 'animal_eggs', text: '¿Pone huevos?', attribute: 'laysEggs', categories: animal },
  { id: 'animal_carnivore', text: '¿Es principalmente carnívoro?', attribute: 'carnivore', categories: animal },
  { id: 'animal_farm', text: '¿Es habitual encontrarlo en una granja?', attribute: 'farm', categories: animal },
  { id: 'animal_swims', text: '¿Es un buen nadador?', attribute: 'swims', categories: animal },
  { id: 'animal_insect', text: '¿Es un insecto?', attribute: 'insect', categories: animal },
  { id: 'animal_nocturnal', text: '¿Es principalmente nocturno?', attribute: 'nocturnal', categories: animal },
  { id: 'animal_colorful_wings', text: '¿Destaca por tener alas de colores?', attribute: 'colorfulWings', categories: animal },
  { id: 'animal_ridden', text: '¿Se utiliza habitualmente para montar?', attribute: 'ridden', categories: animal },

  { id: 'object_daily', text: '¿Se usa habitualmente a diario?', attribute: 'usedDaily', categories: object },
  { id: 'object_electronic', text: '¿Es electrónico?', attribute: 'electronic', categories: object },
  { id: 'object_portable', text: '¿Se puede transportar fácilmente con una mano?', attribute: 'portable', categories: object },
  { id: 'object_indoors', text: '¿Se encuentra normalmente en interiores?', attribute: 'indoors', categories: object },
  { id: 'object_large', text: '¿Es más grande que una mochila?', attribute: 'large', categories: object },
  { id: 'object_kitchen', text: '¿Se usa principalmente en la cocina?', attribute: 'kitchen', categories: object },
  { id: 'object_vehicle', text: '¿Sirve para transportar personas?', attribute: 'vehicle', categories: object },
  { id: 'object_wearable', text: '¿Se lleva puesto en el cuerpo?', attribute: 'wearable', categories: object },
  { id: 'object_screen', text: '¿Tiene pantalla?', attribute: 'screen', categories: object },
  { id: 'object_furniture', text: '¿Es un mueble?', attribute: 'furniture', categories: object },
  { id: 'object_tool', text: '¿Es una herramienta?', attribute: 'tool', categories: object },
  { id: 'object_outdoors', text: '¿Se utiliza principalmente al aire libre?', attribute: 'outdoors', categories: object },
  { id: 'object_computer', text: '¿Es un tipo de ordenador?', attribute: 'computer', categories: object },
  { id: 'object_sit', text: '¿Está diseñado para sentarse encima?', attribute: 'sitOn', categories: object },
  { id: 'object_time', text: '¿Sirve principalmente para saber la hora?', attribute: 'tellsTime', categories: object },

  { id: 'place_natural', text: '¿Es un lugar principalmente natural?', attribute: 'natural', categories: place },
  { id: 'place_urban', text: '¿Es una ciudad o está dentro de una?', attribute: 'urban', categories: place },
  { id: 'place_famous', text: '¿Es conocido internacionalmente?', attribute: 'famous', categories: place },
  { id: 'place_europe', text: '¿Está en Europa?', attribute: 'europe', categories: place },
  { id: 'place_coastal', text: '¿Está junto al mar?', attribute: 'coastal', categories: place },
  { id: 'place_mountain', text: '¿Es una zona montañosa?', attribute: 'mountain', categories: place },
  { id: 'place_desert', text: '¿Es un desierto?', attribute: 'desert', categories: place },
  { id: 'place_building', text: '¿Es un edificio o monumento construido?', attribute: 'building', categories: place },
  { id: 'place_americas', text: '¿Está en América?', attribute: 'americas', categories: place },
  { id: 'place_asia', text: '¿Está en Asia?', attribute: 'asia', categories: place },
  { id: 'place_ancient_city', text: '¿Es especialmente conocido por su legado de la Antigüedad?', attribute: 'ancientCity', categories: place },

  { id: 'person_real', text: '¿Es una persona real?', attribute: 'realPerson', categories: person },
  { id: 'person_living', text: '¿Sigue con vida?', attribute: 'living', categories: person },
  { id: 'person_historical', text: '¿Es principalmente una figura histórica?', attribute: 'historical', categories: person },
  { id: 'person_artist', text: '¿Se dedica o se dedicó al arte?', attribute: 'artist', categories: person },
  { id: 'person_sports', text: '¿Es conocido por el deporte?', attribute: 'sports', categories: person },
  { id: 'person_scientist', text: '¿Es conocido por la ciencia?', attribute: 'scientist', categories: person },
  { id: 'person_politician', text: '¿Es conocido por la política o el liderazgo?', attribute: 'politician', categories: person },
  { id: 'person_writer', text: '¿Es conocido principalmente por escribir?', attribute: 'writer', categories: person },
  { id: 'person_woman', text: '¿Es una mujer?', attribute: 'woman', categories: person },
  { id: 'person_europe', text: '¿Nació en Europa?', attribute: 'europe', categories: person },
  { id: 'person_before_1900', text: '¿Nació antes del año 1900?', attribute: 'bornBefore1900', categories: person }
]
