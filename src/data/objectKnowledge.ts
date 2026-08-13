import type { AttributeValue, Candidate } from '../types/game'

const profiles: Record<string, Record<string, AttributeValue>> = {
  'telefono movil': { usedDaily: true, electronic: true, portable: true, indoors: true, screen: true, device: true },
  'ordenador portatil': { usedDaily: true, electronic: true, portable: true, indoors: true, screen: true, computer: true, device: true },
  'silla': { usedDaily: true, furniture: true, indoors: true, large: true, sitOn: true },
  'libro': { usedDaily: true, portable: true, indoors: true },
  'frigorifico': { usedDaily: true, electronic: true, kitchen: true, indoors: true, large: true, machine: true },
  'televisor': { usedDaily: true, electronic: true, indoors: true, large: true, screen: true, device: true },
  'reloj de pulsera': { usedDaily: true, wearable: true, portable: true, tellsTime: true },
  'bicicleta': { vehicle: true, outdoors: true, large: true, gameEquipment: true },
  'coche': { usedDaily: true, electronic: true, vehicle: true, outdoors: true, large: true },
  'automovil': { usedDaily: true, electronic: true, vehicle: true, outdoors: true, large: true, container: true },
  'martillo': { tool: true, portable: true, indoors: true },
  'taladro': { tool: true, electronic: true, portable: true, device: true, machine: true },
  'mesa': { usedDaily: true, furniture: true, indoors: true, large: true },
  'horno': { kitchen: true, electronic: true, indoors: true, large: true, machine: true },
  'sarten': { kitchen: true, portable: true, indoors: true, container: true },
  'gafas': { usedDaily: true, wearable: true, portable: true },
  'camara de fotos': { electronic: true, portable: true, screen: true, device: true },
  'auriculares': { usedDaily: true, electronic: true, wearable: true, portable: true, device: true },
  'cama': { furniture: true, indoors: true, large: true, sitOn: true },
  'microondas': { kitchen: true, electronic: true, device: true, machine: true, indoors: true },
  'smartphone': { usedDaily: true, electronic: true, portable: true, screen: true, device: true, computer: true },
  'tablet': { electronic: true, portable: true, screen: true, device: true, computer: true },
  'piano': { musicalInstrument: true, furniture: true, indoors: true, large: true },
  'guitarra': { musicalInstrument: true, portable: true, indoors: true }
}

function normalizedName(name: string): string {
  return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es')
}

function inferObjectAttributes(attributes: Record<string, AttributeValue>): Record<string, AttributeValue> {
  const device = attributes.device === true
  const machine = attributes.machine === true
  const vehicle = attributes.vehicle === true
  const furniture = attributes.furniture === true
  const wearable = attributes.wearable === true
  const tool = attributes.tool === true
  const kitchen = attributes.kitchen === true
  const weapon = attributes.weapon === true
  const container = attributes.container === true
  const gameEquipment = attributes.gameEquipment === true
  const musicalInstrument = attributes.musicalInstrument === true

  const electronic = attributes.electronic ?? (device || machine)
  const portable = attributes.portable ?? (wearable || tool || weapon || musicalInstrument || (container && !vehicle && !furniture))
  const outdoors = attributes.outdoors ?? (vehicle || gameEquipment)
  const indoors = attributes.indoors ?? (attributes.indoors === undefined && !outdoors
    ? (furniture || kitchen || device || machine || tool || musicalInstrument)
    : attributes.indoors)
  const large = attributes.large ?? (vehicle || furniture || machine)
  const screen = attributes.screen ?? device
  const computer = attributes.computer ?? (device && portable)
  const sitOn = attributes.sitOn ?? (furniture && attributes.sitOn === undefined ? false : attributes.sitOn)
  const usedDaily = attributes.usedDaily ?? (wearable || kitchen || furniture || device)

  return {
    ...attributes,
    electronic,
    portable,
    outdoors,
    indoors,
    large,
    screen,
    computer,
    sitOn,
    usedDaily
  }
}

export function enrichObjectCandidate(candidate: Candidate): Candidate {
  const profile = profiles[normalizedName(candidate.name)]
  const attributes = inferObjectAttributes({ ...candidate.attributes, ...profile })
  return { ...candidate, attributes }
}
