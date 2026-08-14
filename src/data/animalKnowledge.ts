import type { AttributeValue, Candidate } from '../types/game'

const profiles: Record<string, Record<string, AttributeValue>> = {
  'guepardo': { feline: true, carnivore: true, spottedCoat: true, stripedCoat: false, plainCoat: false, largerThanTiger: false, largerThanShoebox: true, veryFastRunner: true, large: false, fourLegs: true, fur: true, dangerous: true, domestic: false, farm: false },
  'leopardo': { feline: true, carnivore: true, spottedCoat: true, stripedCoat: false, plainCoat: false, largerThanTiger: false, largerThanShoebox: true, veryFastRunner: false, large: false, fourLegs: true, fur: true, dangerous: true, domestic: false, farm: false },
  'jaguar': { feline: true, carnivore: true, spottedCoat: true, stripedCoat: false, plainCoat: false, largerThanTiger: false, largerThanShoebox: true, veryFastRunner: false, large: false, fourLegs: true, fur: true, dangerous: true, domestic: false, farm: false },
  'tigre': { feline: true, carnivore: true, spottedCoat: false, stripedCoat: true, plainCoat: false, largerThanTiger: false, largerThanShoebox: true, veryFastRunner: false, large: true, fourLegs: true, fur: true, dangerous: true, domestic: false, farm: false },
  'leon': { feline: true, carnivore: true, spottedCoat: false, stripedCoat: false, plainCoat: true, largerThanTiger: false, largerThanShoebox: true, veryFastRunner: false, large: true, fourLegs: true, fur: true, dangerous: true, domestic: false, farm: false },
  'gato': { feline: true, carnivore: true, spottedCoat: false, stripedCoat: 0.5, plainCoat: 0.5, largerThanTiger: false, largerThanShoebox: true, veryFastRunner: false, large: false, fourLegs: true, fur: true, dangerous: false, domestic: true, farm: false },
  'gato domestico': { feline: true, carnivore: true, spottedCoat: false, stripedCoat: 0.5, plainCoat: 0.5, largerThanTiger: false, largerThanShoebox: true, veryFastRunner: false, large: false, fourLegs: true, fur: true, dangerous: false, domestic: true, farm: false },
  'panthera leo': { feline: true, carnivore: true, spottedCoat: false, stripedCoat: false, plainCoat: true, largerThanTiger: false, largerThanShoebox: true, veryFastRunner: false, large: true, fourLegs: true, fur: true, dangerous: true },
  'panthera onca': { feline: true, carnivore: true, spottedCoat: true, stripedCoat: false, plainCoat: false, largerThanTiger: false, largerThanShoebox: true, veryFastRunner: false, large: false, fourLegs: true, fur: true, dangerous: true },
  'panthera tigris': { feline: true, carnivore: true, spottedCoat: false, stripedCoat: true, plainCoat: false, largerThanTiger: false, largerThanShoebox: true, veryFastRunner: false, large: true, fourLegs: true, fur: true, dangerous: true },
  'elefante': { largerThanTiger: true, largerThanShoebox: true, veryFastRunner: false },
  'ballena': { largerThanTiger: true, largerThanShoebox: true, veryFastRunner: false },
  'oso': { feline: false, carnivore: 0.5, spottedCoat: false, stripedCoat: false, largerThanTiger: 0.5, largerThanShoebox: true, veryFastRunner: false },
  'perro': { feline: false, carnivore: 0.5, spottedCoat: 0.5, stripedCoat: false, largerThanTiger: false, largerThanShoebox: true, veryFastRunner: false },
  'caballo': { feline: false, carnivore: false, spottedCoat: 0.5, stripedCoat: false, largerThanTiger: false, largerThanShoebox: true, veryFastRunner: 0.5 },
  'conejo': { largerThanShoebox: 0.5 },
  'gallina': { largerThanShoebox: 0.5 },
  'abeja': { largerThanShoebox: false },
  'mariposa': { largerThanShoebox: false },
  'rana': { largerThanShoebox: false },
  'serpiente': { largerThanShoebox: 0.5 },
  'buho': { largerThanShoebox: 0.5 }
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

export function enrichAnimalCandidate(candidate: Candidate): Candidate {
  const name = normalizedName(candidate.name)
  const profile = { ...inferredProfile(name), ...profiles[name] }
  const attributes = { ...candidate.attributes, ...profile }
  return {
    ...candidate,
    attributes: {
      ...attributes,
      largerThanShoebox: attributes.largerThanShoebox ?? attributes.large
    }
  }
}
