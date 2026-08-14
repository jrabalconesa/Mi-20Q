import type { AttributeValue, Candidate } from '../types/game'

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

function normalizedName(name: string): string {
  return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es')
}

function inferPlaceAttributes(name: string, attributes: Record<string, AttributeValue>): Record<string, AttributeValue> {
  const building = attributes.building === true
  const urban = attributes.urban === true
  const natural = attributes.natural === true
  const normalized = normalizedName(name)
  const waterName = ['rio ', 'río ', 'lago ', 'mar ', 'oceano ', 'océano ', 'bahia ', 'bahía '].some(token => normalized.includes(token))
  const religiousName = ['catedral', 'templo', 'mezquita', 'iglesia', 'basilica', 'basílica', 'vaticano', 'meca'].some(token => normalized.includes(token))

  return {
    ...attributes,
    realPlace: attributes.realPlace ?? true,
    artificialOrFictional: attributes.artificialOrFictional ?? (building || urban),
    indoors: attributes.indoors ?? building,
    largerThanShoebox: true,
    digitalOrElectronic: false,
    tangible: true,
    before1900: attributes.before1900 ?? attributes.ancientCity,
    politicalDivision: attributes.politicalDivision ?? (urban || attributes.capital === true || attributes.regionalCapital === true || attributes.largeCity === true),
    geographicOrBuilt: true,
    westernHemisphere: attributes.westernHemisphere ?? (attributes.americas === true || (attributes.europe === true && attributes.easternHemisphere !== true)),
    natural: attributes.natural ?? (!building && !urban && natural),
    waterPlace: attributes.waterPlace ?? waterName,
    elevation: attributes.elevation ?? attributes.mountain,
    famousMonument: attributes.famousMonument ?? (building && attributes.famous === true),
    religious: attributes.religious ?? religiousName
  }
}

export function enrichPlaceCandidate(candidate: Candidate): Candidate {
  const profile = profilesById[candidate.id]
  if (!profile) return { ...candidate, attributes: inferPlaceAttributes(candidate.name, candidate.attributes) }
  const name = candidate.id === 'geonames-3687238' ? 'Cartagena de Indias (Colombia)' : candidate.name
  return {
    ...candidate,
    name,
    attributes: inferPlaceAttributes(name, { ...candidate.attributes, ...profile })
  }
}
