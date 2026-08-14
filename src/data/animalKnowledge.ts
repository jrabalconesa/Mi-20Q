import type { AttributeValue, Candidate } from '../types/game'

export const curatedAnimalCandidates: Candidate[] = [
  {
    id: 'curated-animal-platypus',
    name: 'Ornitorrinco',
    category: 'animal',
    attributes: {
      mammal: true, bird: false, fish: false, reptile: false, amphibian: false, insect: false,
      arachnid: false, mollusk: false, crustacean: false, vertebrate: true, invertebrate: false,
      carnivore: true, domestic: false, farm: false, domesticFarmPet: false, large: false,
      largerThanShoebox: true, biggerThanDog: false, largerThanLion: false, fourLegs: true,
      fourOrMoreLegs: true, fur: true, water: true, swims: true, semiAquatic: true,
      movesByAirOrWater: true, laysEggs: true, oviparous: true, monotreme: true,
      duckBill: true, livesInSpain: false, dangerous: false, venomous: 0.5, feathers: false,
      scales: false, hasAntlers: false, stripedCoat: false, spottedCoat: false, nocturnal: 0.5,
      marsupial: false, primate: false, hoofed: false, trunk: false, longNeck: false,
      blackWhitePattern: false
    }
  },
  {
    id: 'curated-animal-stork',
    name: 'Cigüeña',
    category: 'animal',
    attributes: {
      mammal: false, bird: true, fish: false, reptile: false, amphibian: false, insect: false,
      arachnid: false, mollusk: false, crustacean: false, vertebrate: true, invertebrate: false,
      carnivore: true, domesticFarmPet: false, large: false, largerThanShoebox: true,
      biggerThanDog: false, fourLegs: false, fourOrMoreLegs: false, fur: false, flies: true,
      movesByAirOrWater: true, laysEggs: true, oviparous: true, livesInSpain: true,
      dangerous: false, venomous: false, feathers: true, scales: false, hasAntlers: false,
      stripedCoat: false, spottedCoat: false, blackWhitePattern: true, longNeck: true
    }
  },
  {
    id: 'curated-animal-hippopotamus',
    name: 'Hipopótamo',
    category: 'animal',
    attributes: {
      mammal: true, bird: false, fish: false, reptile: false, amphibian: false, insect: false,
      vertebrate: true, invertebrate: false, carnivore: false, domesticFarmPet: false,
      large: true, largerThanShoebox: true, biggerThanDog: true, largerThanLion: true,
      fourLegs: true, fourOrMoreLegs: true, fur: false, water: true, swims: true,
      semiAquatic: true, movesByAirOrWater: true, oviparous: false, livesInSpain: false,
      dangerous: true, venomous: false, hasAntlers: false, hoofed: true, longNeck: false,
      trunk: false, marsupial: false, primate: false, blackWhitePattern: false
    }
  },
  {
    id: 'curated-animal-rhinoceros',
    name: 'Rinoceronte',
    category: 'animal',
    attributes: {
      mammal: true, bird: false, fish: false, reptile: false, amphibian: false, insect: false,
      vertebrate: true, invertebrate: false, carnivore: false, domesticFarmPet: false,
      large: true, largerThanShoebox: true, biggerThanDog: true, largerThanLion: true,
      fourLegs: true, fourOrMoreLegs: true, fur: false, water: false, swims: false,
      semiAquatic: false, movesByAirOrWater: false, oviparous: false, livesInSpain: false,
      dangerous: true, venomous: false, hasAntlers: true, hoofed: true, longNeck: false,
      trunk: false, marsupial: false, primate: false, blackWhitePattern: false
    }
  },
  {
    id: 'curated-animal-giraffe',
    name: 'Jirafa',
    category: 'animal',
    attributes: {
      mammal: true, bird: false, fish: false, reptile: false, amphibian: false, insect: false,
      vertebrate: true, carnivore: false, domesticFarmPet: false, large: true,
      largerThanShoebox: true, biggerThanDog: true, largerThanLion: true, fourLegs: true,
      fourOrMoreLegs: true, fur: true, oviparous: false, livesInSpain: false,
      dangerous: false, venomous: false, hasAntlers: true, hoofed: true, longNeck: true,
      spottedCoat: true, stripedCoat: false, blackWhitePattern: false
    }
  },
  {
    id: 'curated-animal-zebra',
    name: 'Cebra',
    category: 'animal',
    attributes: {
      mammal: true, bird: false, fish: false, reptile: false, amphibian: false, insect: false,
      vertebrate: true, carnivore: false, domesticFarmPet: false, large: true,
      largerThanShoebox: true, biggerThanDog: true, fourLegs: true, fourOrMoreLegs: true,
      fur: true, oviparous: false, livesInSpain: false, dangerous: 0.5, venomous: false,
      hasAntlers: false, hoofed: true, stripedCoat: true, spottedCoat: false,
      blackWhitePattern: true, longNeck: false
    }
  },
  {
    id: 'curated-animal-kangaroo',
    name: 'Canguro',
    category: 'animal',
    attributes: {
      mammal: true, bird: false, fish: false, reptile: false, amphibian: false, insect: false,
      vertebrate: true, carnivore: false, domesticFarmPet: false, large: true,
      largerThanShoebox: true, biggerThanDog: true, fourLegs: false, fourOrMoreLegs: false,
      fur: true, oviparous: false, livesInSpain: false, dangerous: 0.5, venomous: false,
      hasAntlers: false, marsupial: true, hoofed: false, blackWhitePattern: false
    }
  },
  {
    id: 'curated-animal-koala',
    name: 'Koala',
    category: 'animal',
    attributes: {
      mammal: true, bird: false, fish: false, reptile: false, amphibian: false, insect: false,
      vertebrate: true, carnivore: false, domesticFarmPet: false, large: false,
      largerThanShoebox: true, biggerThanDog: false, fourLegs: true, fourOrMoreLegs: true,
      fur: true, oviparous: false, livesInSpain: false, dangerous: false, venomous: false,
      hasAntlers: false, marsupial: true, hoofed: false, blackWhitePattern: false
    }
  },
  {
    id: 'curated-animal-panda',
    name: 'Panda',
    category: 'animal',
    attributes: {
      mammal: true, bird: false, fish: false, reptile: false, amphibian: false, insect: false,
      vertebrate: true, carnivore: 0.5, domesticFarmPet: false, large: true,
      largerThanShoebox: true, biggerThanDog: true, fourLegs: true, fourOrMoreLegs: true,
      fur: true, oviparous: false, livesInSpain: false, dangerous: 0.5, venomous: false,
      hasAntlers: false, blackWhitePattern: true, marsupial: false, primate: false
    }
  },
  {
    id: 'curated-animal-gorilla',
    name: 'Gorila',
    category: 'animal',
    attributes: {
      mammal: true, bird: false, fish: false, reptile: false, amphibian: false, insect: false,
      vertebrate: true, carnivore: false, domesticFarmPet: false, large: true,
      largerThanShoebox: true, biggerThanDog: true, fourLegs: false, fourOrMoreLegs: false,
      fur: true, oviparous: false, livesInSpain: false, dangerous: 0.5, venomous: false,
      hasAntlers: false, primate: true, marsupial: false, hoofed: false
    }
  },
  {
    id: 'curated-animal-camel',
    name: 'Camello',
    category: 'animal',
    attributes: {
      mammal: true, bird: false, fish: false, reptile: false, amphibian: false, insect: false,
      vertebrate: true, carnivore: false, domesticFarmPet: true, domestic: true, farm: true,
      large: true, largerThanShoebox: true, biggerThanDog: true, largerThanLion: true,
      fourLegs: true, fourOrMoreLegs: true, fur: true, oviparous: false, livesInSpain: false,
      dangerous: 0.5, venomous: false, hasAntlers: false, hoofed: true, desertAdapted: true,
      longNeck: true, blackWhitePattern: false
    }
  },
  {
    id: 'curated-animal-polar-bear',
    name: 'Oso polar',
    category: 'animal',
    attributes: {
      mammal: true, bird: false, fish: false, reptile: false, amphibian: false, insect: false,
      vertebrate: true, carnivore: true, domesticFarmPet: false, large: true,
      largerThanShoebox: true, biggerThanDog: true, largerThanLion: true, fourLegs: true,
      fourOrMoreLegs: true, fur: true, water: 0.5, swims: true, semiAquatic: 0.5,
      movesByAirOrWater: true, oviparous: false, livesInSpain: false, dangerous: true,
      venomous: false, hasAntlers: false, blackWhitePattern: false
    }
  }
]

const profiles: Record<string, Record<string, AttributeValue>> = {
  'guepardo': { mammal: true, bird: false, fish: false, reptile: false, amphibian: false, feline: true, carnivore: true, spottedCoat: true, stripedCoat: false, plainCoat: false, largerThanTiger: false, largerThanShoebox: true, veryFastRunner: true, large: false, fourLegs: true, fur: true, dangerous: true, domestic: false, farm: false },
  'leopardo': { mammal: true, bird: false, fish: false, reptile: false, amphibian: false, feline: true, carnivore: true, spottedCoat: true, stripedCoat: false, plainCoat: false, largerThanTiger: false, largerThanShoebox: true, veryFastRunner: false, large: false, fourLegs: true, fur: true, dangerous: true, domestic: false, farm: false },
  'jaguar': { mammal: true, bird: false, fish: false, reptile: false, amphibian: false, feline: true, carnivore: true, spottedCoat: true, stripedCoat: false, plainCoat: false, largerThanTiger: false, largerThanShoebox: true, veryFastRunner: false, large: false, fourLegs: true, fur: true, dangerous: true, domestic: false, farm: false },
  'tigre': { mammal: true, bird: false, fish: false, reptile: false, amphibian: false, feline: true, carnivore: true, spottedCoat: false, stripedCoat: true, plainCoat: false, largerThanTiger: false, largerThanShoebox: true, veryFastRunner: false, large: true, fourLegs: true, fur: true, dangerous: true, domestic: false, farm: false },
  'leon': { mammal: true, bird: false, fish: false, reptile: false, amphibian: false, feline: true, carnivore: true, spottedCoat: false, stripedCoat: false, plainCoat: true, largerThanTiger: false, largerThanShoebox: true, veryFastRunner: false, large: true, fourLegs: true, fur: true, dangerous: true, domestic: false, farm: false },
  'gato': { mammal: true, bird: false, fish: false, reptile: false, amphibian: false, feline: true, carnivore: true, spottedCoat: false, stripedCoat: 0.5, plainCoat: 0.5, largerThanTiger: false, largerThanShoebox: true, veryFastRunner: false, large: false, fourLegs: true, fur: true, dangerous: false, domestic: true, farm: false },
  'gato domestico': { mammal: true, bird: false, fish: false, reptile: false, amphibian: false, feline: true, carnivore: true, spottedCoat: false, stripedCoat: 0.5, plainCoat: 0.5, largerThanTiger: false, largerThanShoebox: true, veryFastRunner: false, large: false, fourLegs: true, fur: true, dangerous: false, domestic: true, farm: false },
  'panthera leo': { mammal: true, bird: false, fish: false, reptile: false, amphibian: false, feline: true, carnivore: true, spottedCoat: false, stripedCoat: false, plainCoat: true, largerThanTiger: false, largerThanShoebox: true, veryFastRunner: false, large: true, fourLegs: true, fur: true, dangerous: true },
  'panthera onca': { mammal: true, bird: false, fish: false, reptile: false, amphibian: false, feline: true, carnivore: true, spottedCoat: true, stripedCoat: false, plainCoat: false, largerThanTiger: false, largerThanShoebox: true, veryFastRunner: false, large: false, fourLegs: true, fur: true, dangerous: true },
  'panthera tigris': { mammal: true, bird: false, fish: false, reptile: false, amphibian: false, feline: true, carnivore: true, spottedCoat: false, stripedCoat: true, plainCoat: false, largerThanTiger: false, largerThanShoebox: true, veryFastRunner: false, large: true, fourLegs: true, fur: true, dangerous: true },
  'elefante': { mammal: true, bird: false, fish: false, reptile: false, amphibian: false, carnivore: false, fourLegs: true, fur: false, largerThanTiger: true, largerThanShoebox: true, veryFastRunner: false },
  'delfin': { mammal: true, bird: false, fish: false, reptile: false, amphibian: false, carnivore: true, fourLegs: false, fur: false, water: true, swims: true, largerThanShoebox: true },
  'aguila': { mammal: false, bird: true, fish: false, reptile: false, amphibian: false, carnivore: true, fourLegs: false, fur: false, flies: true, laysEggs: true, largerThanShoebox: true },
  'tiburon': { mammal: false, bird: false, fish: true, reptile: false, amphibian: false, carnivore: true, fourLegs: false, fur: false, water: true, swims: true, largerThanShoebox: true },
  'caballo': { mammal: true, bird: false, fish: false, reptile: false, amphibian: false, feline: false, carnivore: false, spottedCoat: 0.5, stripedCoat: false, largerThanTiger: false, largerThanShoebox: true, veryFastRunner: 0.5 },
  'cocodrilo': { mammal: false, bird: false, fish: false, reptile: true, amphibian: false, carnivore: true, fourLegs: true, fur: false, water: 0.5, swims: true, largerThanShoebox: true },
  'oso': { mammal: true, bird: false, fish: false, reptile: false, amphibian: false, feline: false, carnivore: 0.5, spottedCoat: false, stripedCoat: false, largerThanTiger: 0.5, largerThanShoebox: true, veryFastRunner: false },
  'perro': { mammal: true, bird: false, fish: false, reptile: false, amphibian: false, feline: false, carnivore: 0.5, spottedCoat: 0.5, stripedCoat: false, largerThanTiger: false, largerThanShoebox: true, veryFastRunner: false },
  'vaca': { mammal: true, bird: false, fish: false, reptile: false, amphibian: false, carnivore: false, fourLegs: true, fur: true, largerThanShoebox: true, domestic: true, farm: true, maleBovine: false },
  'toro': { mammal: true, bird: false, fish: false, reptile: false, amphibian: false, carnivore: false, fourLegs: true, fur: true, largerThanShoebox: true, domestic: true, farm: true, dangerous: 0.5, biggerThanDog: true, largerThanLion: true, spottedCoat: 0.5, stripedCoat: false, hasAntlers: true, maleBovine: true },
  'pinguino': { mammal: false, bird: true, fish: false, reptile: false, amphibian: false, carnivore: true, fourLegs: false, fur: false, flies: false, swims: true, laysEggs: true, largerThanShoebox: true },
  'conejo': { mammal: true, bird: false, fish: false, reptile: false, amphibian: false, carnivore: false, fourLegs: true, fur: true, largerThanShoebox: 0.5 },
  'gallina': { mammal: false, bird: true, fish: false, reptile: false, amphibian: false, carnivore: false, fourLegs: false, fur: false, laysEggs: true, largerThanShoebox: 0.5 },
  'abeja': { mammal: false, bird: false, fish: false, reptile: false, amphibian: false, insect: true, largerThanShoebox: false },
  'mariposa': { mammal: false, bird: false, fish: false, reptile: false, amphibian: false, insect: true, largerThanShoebox: false },
  'rana': { mammal: false, bird: false, fish: false, reptile: false, amphibian: true, carnivore: true, fourLegs: true, largerThanShoebox: false },
  'serpiente': { mammal: false, bird: false, fish: false, reptile: true, amphibian: false, carnivore: true, fourLegs: false, largerThanShoebox: 0.5 },
  'buho': { mammal: false, bird: true, fish: false, reptile: false, amphibian: false, carnivore: true, fourLegs: false, flies: true, laysEggs: true, largerThanShoebox: 0.5 }
}

const squirrelProfile: Record<string, AttributeValue> = {
  mammal: true,
  bird: false,
  fish: false,
  reptile: false,
  amphibian: false,
  insect: false,
  arachnid: false,
  mollusk: false,
  crustacean: false,
  vertebrate: true,
  invertebrate: false,
  carnivore: false,
  large: false,
  largerThanShoebox: 0.5,
  fourLegs: true,
  fur: true,
  domestic: false,
  farm: false,
  dangerous: false,
  flies: false,
  water: false,
  swims: false,
  laysEggs: false
}

function normalizedName(name: string): string {
  return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es')
}

function genericAnimalName(name: string, attributes: Record<string, AttributeValue>): string {
  const normalized = normalizedName(name)
  if (normalized.includes('panthera tigris')) return 'Tigre'
  if (normalized.includes('panthera leo')) return 'León'
  if (normalized.includes('panthera onca')) return 'Jaguar'
  if (normalized === 'tigre' && attributes.mammal === true) return 'Tigre'
  if (normalized.includes('tigre') && attributes.insect === true) return 'Insecto'
  if (normalized.includes('ardilla')) return 'Ardilla'
  if (normalized.includes('abeja')) return 'Abeja'
  if (normalized.includes('abejorro')) return 'Abejorro'
  if (normalized.includes('aguila')) return 'Águila'
  if (normalized.includes('anade')) return 'Pato'
  if (normalized.includes('azulejo')) return 'Pájaro azul'
  if (normalized.includes('ballena')) return 'Ballena'
  if (normalized.includes('barnacla')) return 'Ganso'
  if (normalized.includes('bejori')) return 'Lagarto'
  if (normalized.includes('busardo')) return 'Busardo'
  if (normalized.includes('caballo')) return 'Caballo'
  if (normalized.includes('camachuelo')) return 'Camachuelo'
  if (normalized.includes('carbonero')) return 'Carbonero'
  if (normalized.includes('cardenal')) return 'Cardenal'
  if (normalized.includes('carpintero') || normalized.includes('pico ')) return 'Pájaro carpintero'
  if (normalized.includes('catarina')) return 'Mariquita'
  if (normalized.includes('cernicalo')) return 'Cernícalo'
  if (normalized.includes('chara')) return 'Arrendajo'
  if (normalized.includes('chinche')) return 'Chinche'
  if (normalized.includes('chingolo')) return 'Gorrión'
  if (normalized.includes('ciguena')) return 'Cigüeña'
  if (normalized.includes('cisne')) return 'Cisne'
  if (normalized.includes('cocodrilo')) return 'Cocodrilo'
  if (normalized.includes('colibri')) return 'Colibrí'
  if (normalized.includes('conejo')) return 'Conejo'
  if (normalized.includes('cormoran')) return 'Cormorán'
  if (normalized.includes('coyote')) return 'Coyote'
  if (normalized.includes('cuervo') || normalized.includes('corneja')) return 'Cuervo'
  if (normalized.includes('delfin')) return 'Delfín'
  if (normalized.includes('elefante')) return 'Elefante'
  if (normalized.includes('focha')) return 'Focha'
  if (normalized.includes('gallina') || normalized.includes('guajolote')) return 'Gallina'
  if (normalized.includes('garceta') || normalized.includes('garza') || normalized.includes('garcilla')) return 'Garza'
  if (normalized.includes('gato')) return 'Gato'
  if (normalized.includes('gaviota')) return 'Gaviota'
  if (normalized.includes('gorrion')) return 'Gorrión'
  if (normalized.includes('hipopotamo')) return 'Hipopótamo'
  if (normalized.includes('herrerillo')) return 'Herrerillo'
  if (normalized.includes('humano')) return 'Humano'
  if (normalized.includes('jilguero')) return 'Jilguero'
  if (normalized.includes('junco')) return 'Junco'
  if (normalized.includes('lavandera')) return 'Lavandera'
  if (normalized.includes('leon')) return 'León'
  if (normalized.includes('mariposa') || normalized.includes('icaro')) return 'Mariposa'
  if (normalized.includes('martinete')) return 'Martinete'
  if (normalized.includes('mirlo')) return 'Mirlo'
  if (normalized.includes('mosca')) return 'Mosca'
  if (normalized.includes('mosquero')) return 'Mosquero'
  if (normalized.includes('noctuido') || normalized.includes('polilla')) return 'Polilla'
  if (normalized.includes('ornitorrinco')) return 'Ornitorrinco'
  if (normalized.includes('paloma') || normalized.includes('tortola') || normalized.includes('zenaida')) return 'Paloma'
  if (normalized.includes('pelicano')) return 'Pelícano'
  if (normalized.includes('perro')) return 'Perro'
  if (normalized.includes('petirrojo')) return 'Petirrojo'
  if (normalized.includes('pigargo')) return 'Águila'
  if (normalized.includes('pinguino')) return 'Pingüino'
  if (normalized.includes('pinzon')) return 'Pinzón'
  if (normalized.includes('rana')) return 'Rana'
  if (normalized.includes('rayadora')) return 'Libélula'
  if (normalized.includes('reinita')) return 'Reinita'
  if (normalized.includes('rinoceronte')) return 'Rinoceronte'
  if (normalized.includes('sapo')) return 'Sapo'
  if (normalized.includes('serpiente') || normalized.includes('culebra')) return 'Serpiente'
  if (normalized.includes('serreta')) return 'Pato'
  if (normalized.includes('sinsonte')) return 'Sinsonte'
  if (normalized.includes('tiburon')) return 'Tiburón'
  if (normalized.includes('tortuga')) return 'Tortuga'
  if (normalized.includes('toro') && attributes.amphibian !== true) return 'Toro'
  if (normalized.includes('venado')) return 'Ciervo'
  if (normalized.includes('zorro')) return 'Zorro'
  if (normalized.includes('zopilote') || normalized.includes('aura')) return 'Buitre'
  return name
}

function inferredProfile(name: string): Record<string, AttributeValue> | undefined {
  if (name.includes('ardilla')) return squirrelProfile
  return undefined
}

function isLikelyCanid(name: string): boolean {
  return ['perro', 'lobo', 'zorro', 'coyote', 'chacal', 'canido', 'canidae'].some(token => name.includes(token))
}

function isCommonInSpain(name: string): boolean {
  return [
    'abeja', 'aguila', 'buho', 'caballo', 'cabra', 'cerdo', 'ciervo', 'conejo', 'gallina',
    'gato', 'gorrion', 'jabali', 'lagarto', 'lobo', 'mariposa', 'oveja', 'perro',
    'pato', 'rana', 'sapo', 'serpiente', 'toro', 'tortuga', 'vaca', 'zorro'
  ].some(token => name.includes(token))
}

function hasLikelyAntlersOrHorns(name: string): boolean {
  return [
    'alce',
    'antilope',
    'bisonte',
    'bufalo',
    'cabra',
    'carnero',
    'cervidae',
    'ciervo',
    'gacela',
    'reno',
    'rinoceronte',
    'toro',
    'vaca',
    'venado'
  ].some(token => name.includes(token))
}

function isLikelyHoofed(name: string): boolean {
  return [
    'antilope',
    'bisonte',
    'bufalo',
    'caballo',
    'cabra',
    'camello',
    'cebra',
    'ciervo',
    'gacela',
    'hipopotamo',
    'jirafa',
    'oveja',
    'rinoceronte',
    'toro',
    'vaca'
  ].some(token => name.includes(token))
}

function inferAnimalAttributes(name: string, attributes: Record<string, AttributeValue>): Record<string, AttributeValue> {
  const flies = attributes.flies === true
  const water = attributes.water === true || attributes.aquatic === true
  const swims = attributes.swims === true
  const insect = attributes.insect === true
  const arachnid = attributes.arachnid === true
  const mollusk = attributes.mollusk === true
  const crustacean = attributes.crustacean === true
  const fourLegs = attributes.fourLegs === true
  const feline = attributes.feline === true
  const canid = isLikelyCanid(name)
  const large = attributes.large
  const mammal = attributes.mammal === true
  const bird = attributes.bird === true
  const fish = attributes.fish === true
  const reptile = attributes.reptile === true
  const amphibian = attributes.amphibian === true
  const oviparous = attributes.laysEggs === true || bird || fish || reptile || amphibian || insect || arachnid || mollusk || crustacean
  const hasLegs = fourLegs || bird || amphibian || insect || arachnid || crustacean
  const biggerThanDog = attributes.biggerThanDog ?? (large === true || attributes.largerThanTiger === true)
  const venomous = attributes.venomous ?? (name.includes('serpiente') ? 0.5 : (mammal || bird ? false : undefined))

  return {
    ...attributes,
    artificialOrFictional: false,
    indoors: attributes.indoors ?? attributes.domestic,
    largerThanShoebox: attributes.largerThanShoebox ?? large,
    digitalOrElectronic: false,
    tangible: true,
    domesticFarmPet: attributes.domesticFarmPet ?? (attributes.domestic === true || attributes.farm === true),
    movesByAirOrWater: attributes.movesByAirOrWater ?? (flies || water || swims),
    semiAquatic: attributes.semiAquatic ?? (water && mammal ? 0.5 : false),
    fourOrMoreLegs: attributes.fourOrMoreLegs ?? (fourLegs || insect || arachnid || crustacean),
    felineOrCanid: attributes.felineOrCanid ?? (feline || canid),
    feline: attributes.feline ?? false,
    canid: attributes.canid ?? canid,
    hasLegs: attributes.hasLegs ?? hasLegs,
    oviparous: attributes.oviparous ?? oviparous,
    biggerThanDog,
    livesInSpain: attributes.livesInSpain ?? isCommonInSpain(name),
    venomous,
    feathers: attributes.feathers ?? bird,
    scales: attributes.scales ?? (fish || reptile),
    fur: attributes.fur ?? mammal,
    hasAntlers: attributes.hasAntlers ?? hasLikelyAntlersOrHorns(name),
    stripedCoat: attributes.stripedCoat ?? false,
    spottedCoat: attributes.spottedCoat ?? false,
    monotreme: attributes.monotreme ?? false,
    duckBill: attributes.duckBill ?? false,
    marsupial: attributes.marsupial ?? false,
    primate: attributes.primate ?? name.includes('humano'),
    hoofed: attributes.hoofed ?? isLikelyHoofed(name),
    trunk: attributes.trunk ?? name.includes('elefante'),
    longNeck: attributes.longNeck ?? (name.includes('jirafa') || name.includes('ciguena')),
    blackWhitePattern: attributes.blackWhitePattern ?? (name.includes('cebra') || name.includes('pinguino')),
    veryFastRunner: attributes.veryFastRunner ?? false,
    nocturnal: attributes.nocturnal ?? (name.includes('buho') ? true : undefined)
  }
}

export function enrichAnimalCandidate(candidate: Candidate): Candidate {
  const name = normalizedName(candidate.name)
  const profile = { ...inferredProfile(name), ...profiles[name] }
  const attributes = { ...candidate.attributes, ...profile }
  return { ...candidate, name: genericAnimalName(candidate.name, attributes), attributes: inferAnimalAttributes(name, attributes) }
}
