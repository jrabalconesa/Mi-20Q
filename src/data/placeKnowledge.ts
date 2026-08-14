import type { AttributeValue, Candidate } from '../types/game'

type SpanishRegionAttribute =
  | 'inAndalusia'
  | 'inAragon'
  | 'inAsturias'
  | 'inBalearicIslands'
  | 'inBasqueCountry'
  | 'inCanaryIslands'
  | 'inCantabria'
  | 'inCastileLeon'
  | 'inCastileLaMancha'
  | 'inCatalonia'
  | 'inCeutaMelilla'
  | 'inExtremadura'
  | 'inGalicia'
  | 'inLaRioja'
  | 'inMadridRegion'
  | 'inMurciaRegion'
  | 'inNavarre'
  | 'inValencianCommunity'

interface SpanishPlaceConfig {
  id: string
  name: string
  region: SpanishRegionAttribute
  provinceCapital?: boolean
  autonomousCommunityCapital?: boolean
  autonomousCity?: boolean
  capital?: boolean
  coastal?: boolean
  largeCity?: boolean
  islandOrArchipelago?: boolean
  archipelago?: boolean
  southOf40?: boolean
  easternHemisphere?: boolean
  europe?: boolean
  africa?: boolean
  natural?: boolean
  urban?: boolean
  famous?: boolean
  extraAttributes?: Record<string, AttributeValue>
}

const spanishRegionAttributes: SpanishRegionAttribute[] = [
  'inAndalusia',
  'inAragon',
  'inAsturias',
  'inBalearicIslands',
  'inBasqueCountry',
  'inCanaryIslands',
  'inCantabria',
  'inCastileLeon',
  'inCastileLaMancha',
  'inCatalonia',
  'inCeutaMelilla',
  'inExtremadura',
  'inGalicia',
  'inLaRioja',
  'inMadridRegion',
  'inMurciaRegion',
  'inNavarre',
  'inValencianCommunity'
]

function spanishPlace(config: SpanishPlaceConfig): Candidate {
  const isAfricanSpanishPlace = config.region === 'inCanaryIslands' || config.region === 'inCeutaMelilla'
  const isIslandOrArchipelago = config.islandOrArchipelago ?? false
  const urban = config.urban ?? !isIslandOrArchipelago
  const attrs: Record<string, AttributeValue> = {
    natural: config.natural ?? isIslandOrArchipelago,
    urban,
    famous: config.famous ?? true,
    largeCity: config.largeCity ?? false,
    megaCity: false,
    capital: config.capital ?? false,
    regionalCapital: config.autonomousCommunityCapital ?? config.autonomousCity ?? false,
    provinceCapital: config.provinceCapital ?? false,
    autonomousCommunityCapital: config.autonomousCommunityCapital ?? false,
    autonomousCity: config.autonomousCity ?? false,
    islandOrArchipelago: isIslandOrArchipelago,
    archipelago: config.archipelago ?? false,
    mountain: false,
    desert: false,
    building: false,
    europe: config.europe ?? !isAfricanSpanishPlace,
    americas: false,
    asia: false,
    africa: config.africa ?? isAfricanSpanishPlace,
    oceania: false,
    northernHemisphere: true,
    southernHemisphere: false,
    easternHemisphere: config.easternHemisphere ?? false,
    westernHemisphere: config.easternHemisphere === true ? false : true,
    iberianPeninsula: !isAfricanSpanishPlace && config.region !== 'inBalearicIslands',
    inSpain: true,
    inFrance: false,
    inItaly: false,
    inUnitedKingdom: false,
    northOf45: false,
    southOf40: config.southOf40 ?? false,
    coastal: config.coastal ?? isIslandOrArchipelago,
    before1900: true,
    politicalDivision: true,
    geographicOrBuilt: true,
    waterPlace: false,
    elevation: false,
    famousMonument: false,
    religious: false
  }
  for (const regionAttribute of spanishRegionAttributes) {
    attrs[regionAttribute] = regionAttribute === config.region
  }
  Object.assign(attrs, config.extraAttributes)
  return { id: config.id, name: config.name, category: 'place', attributes: attrs }
}

export const curatedPlaceCandidates: Candidate[] = [
  spanishPlace({ id: 'geonames-2513416', name: 'Murcia', region: 'inMurciaRegion', provinceCapital: true, autonomousCommunityCapital: true, largeCity: true, southOf40: true }),
  spanishPlace({ id: 'geonames-2520058', name: 'Cartagena (España)', region: 'inMurciaRegion', coastal: true, southOf40: true, famous: false }),
  spanishPlace({ id: 'curated-place-madrid', name: 'Madrid', region: 'inMadridRegion', provinceCapital: true, autonomousCommunityCapital: true, capital: true, largeCity: true, southOf40: true }),
  spanishPlace({ id: 'curated-place-barcelona', name: 'Barcelona', region: 'inCatalonia', provinceCapital: true, autonomousCommunityCapital: true, coastal: true, largeCity: true, easternHemisphere: true }),
  spanishPlace({ id: 'curated-place-a-coruna', name: 'A Coruña', region: 'inGalicia', provinceCapital: true, coastal: true }),
  spanishPlace({ id: 'curated-place-albacete', name: 'Albacete', region: 'inCastileLaMancha', provinceCapital: true, southOf40: true }),
  spanishPlace({ id: 'curated-place-alicante', name: 'Alicante', region: 'inValencianCommunity', provinceCapital: true, coastal: true, largeCity: true, southOf40: true, easternHemisphere: true }),
  spanishPlace({ id: 'curated-place-almeria', name: 'Almería', region: 'inAndalusia', provinceCapital: true, coastal: true, southOf40: true }),
  spanishPlace({ id: 'curated-place-avila', name: 'Ávila', region: 'inCastileLeon', provinceCapital: true }),
  spanishPlace({ id: 'curated-place-badajoz', name: 'Badajoz', region: 'inExtremadura', provinceCapital: true, southOf40: true }),
  spanishPlace({ id: 'curated-place-bilbao', name: 'Bilbao', region: 'inBasqueCountry', provinceCapital: true, coastal: true }),
  spanishPlace({ id: 'curated-place-burgos', name: 'Burgos', region: 'inCastileLeon', provinceCapital: true }),
  spanishPlace({ id: 'curated-place-caceres', name: 'Cáceres', region: 'inExtremadura', provinceCapital: true }),
  spanishPlace({ id: 'curated-place-cadiz', name: 'Cádiz', region: 'inAndalusia', provinceCapital: true, coastal: true, southOf40: true }),
  spanishPlace({ id: 'curated-place-castellon', name: 'Castellón de la Plana', region: 'inValencianCommunity', provinceCapital: true, coastal: true, easternHemisphere: true }),
  spanishPlace({ id: 'curated-place-ciudad-real', name: 'Ciudad Real', region: 'inCastileLaMancha', provinceCapital: true, southOf40: true }),
  spanishPlace({ id: 'curated-place-cordoba', name: 'Córdoba', region: 'inAndalusia', provinceCapital: true, largeCity: true, southOf40: true }),
  spanishPlace({ id: 'curated-place-cuenca', name: 'Cuenca', region: 'inCastileLaMancha', provinceCapital: true }),
  spanishPlace({ id: 'curated-place-girona', name: 'Girona', region: 'inCatalonia', provinceCapital: true, easternHemisphere: true }),
  spanishPlace({ id: 'curated-place-granada', name: 'Granada', region: 'inAndalusia', provinceCapital: true, largeCity: true, southOf40: true }),
  spanishPlace({ id: 'curated-place-guadalajara', name: 'Guadalajara', region: 'inCastileLaMancha', provinceCapital: true }),
  spanishPlace({ id: 'curated-place-huelva', name: 'Huelva', region: 'inAndalusia', provinceCapital: true, coastal: true, southOf40: true }),
  spanishPlace({ id: 'curated-place-huesca', name: 'Huesca', region: 'inAragon', provinceCapital: true, easternHemisphere: true }),
  spanishPlace({ id: 'curated-place-jaen', name: 'Jaén', region: 'inAndalusia', provinceCapital: true, southOf40: true }),
  spanishPlace({ id: 'curated-place-las-palmas', name: 'Las Palmas de Gran Canaria', region: 'inCanaryIslands', provinceCapital: true, autonomousCommunityCapital: true, coastal: true, largeCity: true, southOf40: true, europe: false, africa: true, extraAttributes: { onGranCanaria: true, onTenerife: false } }),
  spanishPlace({ id: 'curated-place-leon', name: 'León', region: 'inCastileLeon', provinceCapital: true }),
  spanishPlace({ id: 'curated-place-lleida', name: 'Lleida', region: 'inCatalonia', provinceCapital: true, easternHemisphere: true }),
  spanishPlace({ id: 'curated-place-logrono', name: 'Logroño', region: 'inLaRioja', provinceCapital: true, autonomousCommunityCapital: true }),
  spanishPlace({ id: 'curated-place-lugo', name: 'Lugo', region: 'inGalicia', provinceCapital: true }),
  spanishPlace({ id: 'curated-place-malaga', name: 'Málaga', region: 'inAndalusia', provinceCapital: true, coastal: true, largeCity: true, southOf40: true }),
  spanishPlace({ id: 'curated-place-ourense', name: 'Ourense', region: 'inGalicia', provinceCapital: true }),
  spanishPlace({ id: 'curated-place-oviedo', name: 'Oviedo', region: 'inAsturias', provinceCapital: true, autonomousCommunityCapital: true }),
  spanishPlace({ id: 'curated-place-palencia', name: 'Palencia', region: 'inCastileLeon', provinceCapital: true }),
  spanishPlace({ id: 'curated-place-palma', name: 'Palma', region: 'inBalearicIslands', provinceCapital: true, autonomousCommunityCapital: true, coastal: true, largeCity: true, easternHemisphere: true }),
  spanishPlace({ id: 'curated-place-pamplona', name: 'Pamplona', region: 'inNavarre', provinceCapital: true, autonomousCommunityCapital: true }),
  spanishPlace({ id: 'curated-place-pontevedra', name: 'Pontevedra', region: 'inGalicia', provinceCapital: true, coastal: true }),
  spanishPlace({ id: 'curated-place-salamanca', name: 'Salamanca', region: 'inCastileLeon', provinceCapital: true }),
  spanishPlace({ id: 'curated-place-san-sebastian', name: 'San Sebastián', region: 'inBasqueCountry', provinceCapital: true, coastal: true }),
  spanishPlace({ id: 'curated-place-santa-cruz-tenerife', name: 'Santa Cruz de Tenerife', region: 'inCanaryIslands', provinceCapital: true, autonomousCommunityCapital: true, coastal: true, largeCity: true, southOf40: true, europe: false, africa: true, extraAttributes: { onGranCanaria: false, onTenerife: true } }),
  spanishPlace({ id: 'curated-place-santander', name: 'Santander', region: 'inCantabria', provinceCapital: true, autonomousCommunityCapital: true, coastal: true }),
  spanishPlace({ id: 'curated-place-segovia', name: 'Segovia', region: 'inCastileLeon', provinceCapital: true }),
  spanishPlace({ id: 'curated-place-sevilla', name: 'Sevilla', region: 'inAndalusia', provinceCapital: true, autonomousCommunityCapital: true, largeCity: true, southOf40: true }),
  spanishPlace({ id: 'curated-place-soria', name: 'Soria', region: 'inCastileLeon', provinceCapital: true }),
  spanishPlace({ id: 'curated-place-tarragona', name: 'Tarragona', region: 'inCatalonia', provinceCapital: true, coastal: true, easternHemisphere: true }),
  spanishPlace({ id: 'curated-place-teruel', name: 'Teruel', region: 'inAragon', provinceCapital: true, easternHemisphere: true }),
  spanishPlace({ id: 'curated-place-toledo', name: 'Toledo', region: 'inCastileLaMancha', provinceCapital: true, autonomousCommunityCapital: true, southOf40: true }),
  spanishPlace({ id: 'curated-place-valencia', name: 'Valencia', region: 'inValencianCommunity', provinceCapital: true, autonomousCommunityCapital: true, coastal: true, largeCity: true, southOf40: true, easternHemisphere: true }),
  spanishPlace({ id: 'curated-place-valladolid', name: 'Valladolid', region: 'inCastileLeon', provinceCapital: true, autonomousCommunityCapital: true }),
  spanishPlace({ id: 'curated-place-vitoria', name: 'Vitoria-Gasteiz', region: 'inBasqueCountry', provinceCapital: true, autonomousCommunityCapital: true }),
  spanishPlace({ id: 'curated-place-zamora', name: 'Zamora', region: 'inCastileLeon', provinceCapital: true }),
  spanishPlace({ id: 'curated-place-zaragoza', name: 'Zaragoza', region: 'inAragon', provinceCapital: true, autonomousCommunityCapital: true, largeCity: true, easternHemisphere: true }),
  spanishPlace({ id: 'curated-place-ceuta', name: 'Ceuta', region: 'inCeutaMelilla', provinceCapital: false, autonomousCity: true, coastal: true, southOf40: true, europe: false, africa: true, extraAttributes: { nearGibraltarStrait: true } }),
  spanishPlace({ id: 'curated-place-melilla', name: 'Melilla', region: 'inCeutaMelilla', provinceCapital: false, autonomousCity: true, coastal: true, southOf40: true, europe: false, africa: true, extraAttributes: { nearGibraltarStrait: false } }),
  spanishPlace({ id: 'curated-place-canary-islands', name: 'Islas Canarias', region: 'inCanaryIslands', autonomousCommunityCapital: false, islandOrArchipelago: true, archipelago: true, southOf40: true, europe: false, africa: true, urban: false }),
  spanishPlace({ id: 'curated-place-balearic-islands', name: 'Islas Baleares', region: 'inBalearicIslands', autonomousCommunityCapital: false, islandOrArchipelago: true, archipelago: true, easternHemisphere: true, urban: false }),
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
