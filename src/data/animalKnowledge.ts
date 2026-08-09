import type { AttributeValue, Candidate } from '../types/game'

const profiles: Record<string, Record<string, AttributeValue>> = {
  'guepardo': { feline: true, carnivore: true, spottedCoat: true, stripedCoat: false, plainCoat: false, largerThanTiger: false, veryFastRunner: true, large: false, fourLegs: true, fur: true, dangerous: true, domestic: false, farm: false },
  'leopardo': { feline: true, carnivore: true, spottedCoat: true, stripedCoat: false, plainCoat: false, largerThanTiger: false, veryFastRunner: false, large: false, fourLegs: true, fur: true, dangerous: true, domestic: false, farm: false },
  'jaguar': { feline: true, carnivore: true, spottedCoat: true, stripedCoat: false, plainCoat: false, largerThanTiger: false, veryFastRunner: false, large: false, fourLegs: true, fur: true, dangerous: true, domestic: false, farm: false },
  'tigre': { feline: true, carnivore: true, spottedCoat: false, stripedCoat: true, plainCoat: false, largerThanTiger: false, veryFastRunner: false, large: true, fourLegs: true, fur: true, dangerous: true, domestic: false, farm: false },
  'leon': { feline: true, carnivore: true, spottedCoat: false, stripedCoat: false, plainCoat: true, largerThanTiger: false, veryFastRunner: false, large: true, fourLegs: true, fur: true, dangerous: true, domestic: false, farm: false },
  'gato': { feline: true, carnivore: true, spottedCoat: false, stripedCoat: 0.5, plainCoat: 0.5, largerThanTiger: false, veryFastRunner: false, large: false, fourLegs: true, fur: true, dangerous: false, domestic: true, farm: false },
  'gato domestico': { feline: true, carnivore: true, spottedCoat: false, stripedCoat: 0.5, plainCoat: 0.5, largerThanTiger: false, veryFastRunner: false, large: false, fourLegs: true, fur: true, dangerous: false, domestic: true, farm: false },
  'panthera leo': { feline: true, carnivore: true, spottedCoat: false, stripedCoat: false, plainCoat: true, largerThanTiger: false, veryFastRunner: false, large: true, fourLegs: true, fur: true, dangerous: true },
  'panthera onca': { feline: true, carnivore: true, spottedCoat: true, stripedCoat: false, plainCoat: false, largerThanTiger: false, veryFastRunner: false, large: false, fourLegs: true, fur: true, dangerous: true },
  'panthera tigris': { feline: true, carnivore: true, spottedCoat: false, stripedCoat: true, plainCoat: false, largerThanTiger: false, veryFastRunner: false, large: true, fourLegs: true, fur: true, dangerous: true },
  'elefante': { largerThanTiger: true, veryFastRunner: false },
  'ballena': { largerThanTiger: true, veryFastRunner: false },
  'oso': { feline: false, carnivore: 0.5, spottedCoat: false, stripedCoat: false, largerThanTiger: 0.5, veryFastRunner: false },
  'perro': { feline: false, carnivore: 0.5, spottedCoat: 0.5, stripedCoat: false, largerThanTiger: false, veryFastRunner: false },
  'caballo': { feline: false, carnivore: false, spottedCoat: 0.5, stripedCoat: false, largerThanTiger: false, veryFastRunner: 0.5 }
}

function normalizedName(name: string): string {
  return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es')
}

export function enrichAnimalCandidate(candidate: Candidate): Candidate {
  const profile = profiles[normalizedName(candidate.name)]
  return profile ? { ...candidate, attributes: { ...candidate.attributes, ...profile } } : candidate
}
