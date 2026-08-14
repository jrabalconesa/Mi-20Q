import type { AttributeValue, Candidate } from '../types/game'

function inferPersonAttributes(attributes: Record<string, AttributeValue>): Record<string, AttributeValue> {
  const artist = attributes.artist === true
  const sports = attributes.sports === true
  const writer = attributes.writer === true
  const scientist = attributes.scientist === true
  const politician = attributes.politician === true
  const americas = attributes.americas === true
  const europe = attributes.europe === true

  return {
    ...attributes,
    artificialOrFictional: attributes.realPerson === false,
    indoors: 0.5,
    largerThanShoebox: true,
    digitalOrElectronic: false,
    tangible: attributes.realPerson ?? true,
    before1900: attributes.bornBefore1900,
    artEntertainmentSport: attributes.artEntertainmentSport ?? (artist || sports || writer),
    westernHemisphere: attributes.westernHemisphere ?? (americas || europe),
    sciencePoliticsLeadership: attributes.sciencePoliticsLeadership ?? (scientist || politician)
  }
}

export function enrichPersonCandidate(candidate: Candidate): Candidate {
  return { ...candidate, attributes: inferPersonAttributes(candidate.attributes) }
}
