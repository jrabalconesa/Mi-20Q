import { coreCandidates as animalCandidates } from './core/animal'
import { coreCandidates as objectCandidates } from './core/object'
import { coreCandidates as personCandidates } from './core/person'
import { coreCandidates as placeCandidates } from './core/place'

// Agregado para pruebas y herramientas de generación; la aplicación carga cada módulo bajo demanda.
export const coreCandidates = [
  ...animalCandidates,
  ...objectCandidates,
  ...placeCandidates,
  ...personCandidates
]
