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
  },
  {
    id: 'curated-place-madrid',
    name: 'Madrid',
    category: 'place',
    attributes: {
      natural: false, urban: true, famous: true, largeCity: true, megaCity: false,
      capital: true, regionalCapital: true, mountain: false, desert: false, building: false,
      europe: true, americas: false, asia: false, africa: false, oceania: false,
      northernHemisphere: true, southernHemisphere: false,
      easternHemisphere: false, westernHemisphere: true,
      iberianPeninsula: true, inSpain: true, inFrance: false, inItaly: false,
      inUnitedKingdom: false, northOf45: false, southOf40: true, coastal: false,
      before1900: true
    }
  },
  {
    id: 'curated-place-barcelona',
    name: 'Barcelona',
    category: 'place',
    attributes: {
      natural: false, urban: true, famous: true, largeCity: true, megaCity: false,
      capital: false, regionalCapital: true, mountain: false, desert: false, building: false,
      europe: true, americas: false, asia: false, africa: false, oceania: false,
      northernHemisphere: true, southernHemisphere: false,
      easternHemisphere: true, westernHemisphere: true,
      iberianPeninsula: true, inSpain: true, inFrance: false, inItaly: false,
      inUnitedKingdom: false, northOf45: false, southOf40: false, coastal: true,
      before1900: true
    }
  },
  {
    id: 'curated-place-amazonas',
    name: 'Río Amazonas',
    category: 'place',
    attributes: {
      natural: true, urban: false, famous: true, largeCity: false, megaCity: false,
      capital: false, regionalCapital: false, mountain: false, desert: false, building: false,
      europe: false, americas: true, asia: false, africa: false, oceania: false,
      northernHemisphere: false, southernHemisphere: true,
      easternHemisphere: false, westernHemisphere: true,
      iberianPeninsula: false, inSpain: false, inFrance: false, inItaly: false,
      inUnitedKingdom: false, northOf45: false, southOf40: true, coastal: false,
      waterPlace: true, politicalDivision: false, geographicOrBuilt: true
    }
  },
  {
    id: 'curated-place-nilo',
    name: 'Río Nilo',
    category: 'place',
    attributes: {
      natural: true, urban: false, famous: true, largeCity: false, megaCity: false,
      capital: false, regionalCapital: false, mountain: false, desert: false, building: false,
      europe: false, americas: false, asia: false, africa: true, oceania: false,
      northernHemisphere: true, southernHemisphere: false,
      easternHemisphere: true, westernHemisphere: false,
      iberianPeninsula: false, inSpain: false, inFrance: false, inItaly: false,
      inUnitedKingdom: false, northOf45: false, southOf40: true, coastal: false,
      waterPlace: true, politicalDivision: false, geographicOrBuilt: true
    }
  }
]

const profilesById: Record<string, Record<string, boolean>> = {
  paris: {
    iberianPeninsula: false, inSpain: false, inFrance: true, inItaly: false,
    inUnitedKingdom: false, regionalCapital: false, capital: true, largeCity: true,
    megaCity: true, northOf45: true, southOf40: false, northernHemisphere: true,
    southernHemisphere: false, easternHemisphere: true, westernHemisphere: true,
    before1900: true
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

const spanishPlaceNames: Record<string, string> = {
  'mexico city': 'Ciudad de México',
  'new york city': 'Nueva York',
  'london': 'Londres',
  'moscow': 'Moscú',
  'beijing': 'Pekín',
  'cairo': 'El Cairo',
  'saint petersburg': 'San Petersburgo',
  'genoa': 'Génova'
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
  if (!profile) {
    const name = spanishPlaceNames[normalizedName(candidate.name)] ?? candidate.name
    return { ...candidate, name, attributes: inferPlaceAttributes(name, candidate.attributes) }
  }
  const name = candidate.id === 'geonames-3687238'
    ? 'Cartagena de Indias (Colombia)'
    : spanishPlaceNames[normalizedName(candidate.name)] ?? candidate.name
  return {
    ...candidate,
    name,
    attributes: inferPlaceAttributes(name, { ...candidate.attributes, ...profile })
  }
}
