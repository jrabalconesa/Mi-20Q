import type { Category, Question } from '../types/game'

const animal: Category[] = ['animal']
const object: Category[] = ['object']
const place: Category[] = ['place']
const person: Category[] = ['person']
const placeContinent = 'place-continent'
const personBirthContinent = 'person-birth-continent'

const semanticQuestions: Question[] = [
  { id: 'animal_domestic', text: '¿Suele vivir con personas?', attribute: 'domestic', categories: animal, importance: 1.3 },
  { id: 'animal_large', text: '¿Es más grande que una persona?', attribute: 'large', categories: animal, importance: 1.25 },
  { id: 'animal_flies', text: '¿Puede volar?', attribute: 'flies', categories: animal, importance: 1.3 },
  { id: 'animal_water', text: '¿Vive principalmente en el agua?', attribute: 'water', categories: animal, importance: 1.3 },
  { id: 'animal_four_legs', text: '¿Tiene cuatro patas?', attribute: 'fourLegs', categories: animal, importance: 1.3 },
  { id: 'animal_dangerous', text: '¿Puede resultar peligroso para una persona?', attribute: 'dangerous', categories: animal, importance: 1.2 },
  { id: 'animal_fur', text: '¿Tiene pelo o pelaje?', attribute: 'fur', categories: animal, importance: 1.3 },
  { id: 'animal_eggs', text: '¿Pone huevos?', attribute: 'laysEggs', categories: animal, importance: 1.25 },
  { id: 'animal_carnivore', text: '¿Es principalmente carnívoro?', attribute: 'carnivore', categories: animal, importance: 1.5 },
  { id: 'animal_feline', text: '¿Pertenece a la familia de los felinos?', attribute: 'feline', categories: animal, importance: 2 },
  { id: 'animal_spotted', text: '¿Tiene manchas bien visibles en el pelaje?', attribute: 'spottedCoat', categories: animal, importance: 1.4 },
  { id: 'animal_striped', text: '¿Tiene el pelaje a rayas?', attribute: 'stripedCoat', categories: animal, importance: 1.3 },
  { id: 'animal_plain_coat', text: '¿Su pelaje es principalmente liso, sin manchas ni rayas?', attribute: 'plainCoat', categories: animal, importance: 1.2 },
  { id: 'animal_larger_tiger', text: '¿Es más grande que un tigre adulto?', attribute: 'largerThanTiger', categories: animal, importance: 1.15 },
  { id: 'animal_fast_runner', text: '¿Puede superar aproximadamente los 80 km/h corriendo?', attribute: 'veryFastRunner', categories: animal, importance: 1.5 },
  { id: 'animal_farm', text: '¿Lo encontrarías normalmente en una granja?', attribute: 'farm', categories: animal, openingOrder: 1 },
  { id: 'animal_swims', text: '¿Suele nadar o se desenvuelve bien en el agua?', attribute: 'swims', categories: animal, importance: 1.5 },
  { id: 'animal_insect', text: '¿Es un insecto?', attribute: 'insect', categories: animal },
  { id: 'animal_nocturnal', text: '¿Es principalmente nocturno?', attribute: 'nocturnal', categories: animal },
  { id: 'animal_colorful_wings', text: '¿Destaca por tener alas de colores?', attribute: 'colorfulWings', categories: animal },
  { id: 'animal_ridden', text: '¿Se utiliza habitualmente para montar?', attribute: 'ridden', categories: animal },

  { id: 'object_daily', text: '¿Se usa habitualmente a diario?', attribute: 'usedDaily', categories: object, openingOrder: 1 },
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

  { id: 'place_natural', text: '¿Es un lugar principalmente natural?', attribute: 'natural', categories: place, openingOrder: 1 },
  { id: 'place_urban', text: '¿Es una ciudad o está dentro de una?', attribute: 'urban', categories: place },
  { id: 'place_famous', text: '¿Es conocido internacionalmente?', attribute: 'famous', categories: place },
  { id: 'place_europe', text: '¿Está en Europa?', attribute: 'europe', categories: place, exclusiveGroup: placeContinent },
  { id: 'place_coastal', text: '¿Está junto al mar?', attribute: 'coastal', categories: place },
  { id: 'place_mountain', text: '¿Es una zona montañosa?', attribute: 'mountain', categories: place },
  { id: 'place_desert', text: '¿Es un desierto?', attribute: 'desert', categories: place },
  { id: 'place_building', text: '¿Es un edificio o monumento construido?', attribute: 'building', categories: place },
  { id: 'place_americas', text: '¿Está en América?', attribute: 'americas', categories: place, exclusiveGroup: placeContinent },
  { id: 'place_asia', text: '¿Está en Asia?', attribute: 'asia', categories: place, exclusiveGroup: placeContinent },
  { id: 'place_ancient_city', text: '¿Es especialmente conocido por su legado de la Antigüedad?', attribute: 'ancientCity', categories: place },
  { id: 'place_iberian', text: '¿Está en la península ibérica?', attribute: 'iberianPeninsula', categories: place, importance: 1.5 },
  { id: 'place_spain', text: '¿Está en España?', attribute: 'inSpain', categories: place, importance: 1.7 },
  { id: 'place_france', text: '¿Está en Francia?', attribute: 'inFrance', categories: place, importance: 1.4 },
  { id: 'place_italy', text: '¿Está en Italia?', attribute: 'inItaly', categories: place, importance: 1.3 },
  { id: 'place_uk', text: '¿Está en el Reino Unido?', attribute: 'inUnitedKingdom', categories: place, importance: 1.3 },
  { id: 'place_regional_capital', text: '¿Es capital de una comunidad, estado o región?', attribute: 'regionalCapital', categories: place, importance: 1.35 },
  { id: 'place_north_45', text: '¿Está al norte del paralelo 45?', attribute: 'northOf45', categories: place },
  { id: 'place_south_40', text: '¿Está al sur del paralelo 40?', attribute: 'southOf40', categories: place },

  { id: 'person_real', text: '¿Es una persona real?', attribute: 'realPerson', categories: person, openingOrder: 1 },
  { id: 'person_living', text: '¿Sigue con vida?', attribute: 'living', categories: person },
  { id: 'person_historical', text: '¿Es principalmente una figura histórica?', attribute: 'historical', categories: person },
  { id: 'person_artist', text: '¿Se dedica o se dedicó al arte?', attribute: 'artist', categories: person },
  { id: 'person_sports', text: '¿Es conocido por el deporte?', attribute: 'sports', categories: person },
  { id: 'person_scientist', text: '¿Es conocido por la ciencia?', attribute: 'scientist', categories: person },
  { id: 'person_politician', text: '¿Es conocido por la política o el liderazgo?', attribute: 'politician', categories: person },
  { id: 'person_writer', text: '¿Es conocido principalmente por escribir?', attribute: 'writer', categories: person },
  { id: 'person_woman', text: '¿Es una mujer?', attribute: 'woman', categories: person },
  { id: 'person_europe', text: '¿Nació en Europa?', attribute: 'europe', categories: person, exclusiveGroup: personBirthContinent },
  { id: 'person_before_1900', text: '¿Nació antes del año 1900?', attribute: 'bornBefore1900', categories: person }
]

const expandedSemanticQuestions: Question[] = [
  { id: 'animal_mammal', text: '¿Es un mamífero?', attribute: 'mammal', categories: animal, importance: 1.2 },
  { id: 'animal_bird', text: '¿Es un ave?', attribute: 'bird', categories: animal, importance: 1.1 },
  { id: 'animal_fish', text: '¿Es un pez?', attribute: 'fish', categories: animal },
  { id: 'animal_reptile', text: '¿Es un reptil?', attribute: 'reptile', categories: animal },
  { id: 'animal_amphibian', text: '¿Es un anfibio?', attribute: 'amphibian', categories: animal },
  { id: 'animal_arachnid', text: '¿Es un arácnido?', attribute: 'arachnid', categories: animal },
  { id: 'animal_mollusk', text: '¿Es un molusco?', attribute: 'mollusk', categories: animal },
  { id: 'animal_crustacean', text: '¿Es un crustáceo?', attribute: 'crustacean', categories: animal },
  { id: 'animal_vertebrate', text: '¿Es un animal vertebrado?', attribute: 'vertebrate', categories: animal },

  { id: 'object_device', text: '¿Es un dispositivo o aparato?', attribute: 'device', categories: object },
  { id: 'object_machine', text: '¿Es una máquina?', attribute: 'machine', categories: object },
  { id: 'object_instrument', text: '¿Es un instrumento musical?', attribute: 'musicalInstrument', categories: object },
  { id: 'object_weapon', text: '¿Es un arma?', attribute: 'weapon', categories: object },
  { id: 'object_container', text: '¿Sirve principalmente para contener otras cosas?', attribute: 'container', categories: object },
  { id: 'object_game_equipment', text: '¿Se utiliza para jugar o practicar un deporte?', attribute: 'gameEquipment', categories: object },

  { id: 'place_large_city', text: '¿Es una ciudad de más de un millón de habitantes?', attribute: 'largeCity', categories: place },
  { id: 'place_mega_city', text: '¿Supera los cinco millones de habitantes?', attribute: 'megaCity', categories: place },
  { id: 'place_capital', text: '¿Es la capital de un país?', attribute: 'capital', categories: place },
  { id: 'place_africa', text: '¿Está en África?', attribute: 'africa', categories: place, exclusiveGroup: placeContinent },
  { id: 'place_oceania', text: '¿Está en Oceanía?', attribute: 'oceania', categories: place, exclusiveGroup: placeContinent },
  { id: 'place_northern', text: '¿Está en el hemisferio norte?', attribute: 'northernHemisphere', categories: place },
  { id: 'place_eastern', text: '¿Está en el hemisferio oriental?', attribute: 'easternHemisphere', categories: place },

  { id: 'person_americas', text: '¿Nació en América?', attribute: 'americas', categories: person, exclusiveGroup: personBirthContinent },
  { id: 'person_asia', text: '¿Nació en Asia?', attribute: 'asia', categories: person, exclusiveGroup: personBirthContinent },
  { id: 'person_africa', text: '¿Nació en África?', attribute: 'africa', categories: person, exclusiveGroup: personBirthContinent },
  { id: 'person_before_1800', text: '¿Nació antes del año 1800?', attribute: 'bornBefore1800', categories: person },
  { id: 'person_after_1950', text: '¿Nació en 1950 o después?', attribute: 'bornAfter1950', categories: person }
]

export const questions: Question[] = [
  ...semanticQuestions,
  ...expandedSemanticQuestions
]
