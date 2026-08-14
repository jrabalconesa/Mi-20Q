import type { AttributeValue, Candidate } from '../types/game'

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
  'vaca': { mammal: true, bird: false, fish: false, reptile: false, amphibian: false, carnivore: false, fourLegs: true, fur: true, largerThanShoebox: true },
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

function inferredProfile(name: string): Record<string, AttributeValue> | undefined {
  if (name.includes('ardilla')) return squirrelProfile
  return undefined
}

function isLikelyCanid(name: string): boolean {
  return ['perro', 'lobo', 'zorro', 'coyote', 'chacal', 'canido', 'canidae'].some(token => name.includes(token))
}

function inferAnimalAttributes(name: string, attributes: Record<string, AttributeValue>): Record<string, AttributeValue> {
  const flies = attributes.flies === true
  const water = attributes.water === true || attributes.aquatic === true
  const swims = attributes.swims === true
  const insect = attributes.insect === true
  const arachnid = attributes.arachnid === true
  const crustacean = attributes.crustacean === true
  const fourLegs = attributes.fourLegs === true
  const feline = attributes.feline === true
  const canid = isLikelyCanid(name)
  const large = attributes.large

  return {
    ...attributes,
    artificialOrFictional: false,
    indoors: attributes.indoors ?? attributes.domestic,
    largerThanShoebox: attributes.largerThanShoebox ?? large,
    digitalOrElectronic: false,
    tangible: true,
    domesticFarmPet: attributes.domesticFarmPet ?? (attributes.domestic === true || attributes.farm === true),
    movesByAirOrWater: attributes.movesByAirOrWater ?? (flies || water || swims),
    fourOrMoreLegs: attributes.fourOrMoreLegs ?? (fourLegs || insect || arachnid || crustacean),
    felineOrCanid: attributes.felineOrCanid ?? (feline || canid)
  }
}

export function enrichAnimalCandidate(candidate: Candidate): Candidate {
  const name = normalizedName(candidate.name)
  const profile = { ...inferredProfile(name), ...profiles[name] }
  const attributes = { ...candidate.attributes, ...profile }
  return { ...candidate, attributes: inferAnimalAttributes(name, attributes) }
}
