import type { Candidate } from '../types/game'

export const curatedPlaceCandidates: Candidate[] = [
  {
    id: 'geonames-2513416',
    name: 'Murcia',
    category: 'place',
    attributes: {
      natural: false, urban: true, famous: false, largeCity: false, megaCity: false,
      capital: false, regionalCapital: true, mountain: false, desert: false, building: false,
      europe: true, americas: false, asia: false, africa: false, oceania: false,
      northernHemisphere: true, southernHemisphere: false,
      easternHemisphere: false, westernHemisphere: true,
      iberianPeninsula: true, inSpain: true, inFrance: false, inItaly: false,
      inUnitedKingdom: false, northOf45: false, southOf40: true, coastal: false
    }
  },
  {
    id: 'geonames-2520058',
    name: 'Cartagena (España)',
    category: 'place',
    attributes: {
      natural: false, urban: true, famous: false, largeCity: false, megaCity: false,
      capital: false, regionalCapital: false, mountain: false, desert: false, building: false,
      europe: true, americas: false, asia: false, africa: false, oceania: false,
      northernHemisphere: true, southernHemisphere: false,
      easternHemisphere: false, westernHemisphere: true,
      iberianPeninsula: true, inSpain: true, inFrance: false, inItaly: false,
      inUnitedKingdom: false, northOf45: false, southOf40: true, coastal: true
    }
  }
]

const profilesById: Record<string, Record<string, boolean>> = {
  paris: {
    iberianPeninsula: false, inSpain: false, inFrance: true, inItaly: false,
    inUnitedKingdom: false, regionalCapital: false, northOf45: true, southOf40: false
  },
  rome: {
    iberianPeninsula: false, inSpain: false, inFrance: false, inItaly: true,
    inUnitedKingdom: false, regionalCapital: false, northOf45: false, southOf40: false,
    capital: true, largeCity: true, megaCity: false, northernHemisphere: true,
    southernHemisphere: false, easternHemisphere: true, westernHemisphere: false
  },
  'geonames-3687238': {
    iberianPeninsula: false, inSpain: false, inFrance: false, inItaly: false,
    inUnitedKingdom: false, regionalCapital: false, northOf45: false, southOf40: true,
    coastal: true
  }
}

export function enrichPlaceCandidate(candidate: Candidate): Candidate {
  const profile = profilesById[candidate.id]
  if (!profile) return candidate
  return {
    ...candidate,
    name: candidate.id === 'geonames-3687238' ? 'Cartagena de Indias (Colombia)' : candidate.name,
    attributes: { ...candidate.attributes, ...profile }
  }
}
