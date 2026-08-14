import type { AttributeValue, Candidate } from '../types/game'

const profiles: Record<string, Record<string, AttributeValue>> = {
  'telefono movil': { usedDaily: true, electronic: true, portable: true, indoors: true, screen: true, device: true, largerThanShoebox: false },
  'ordenador portatil': { usedDaily: true, electronic: true, portable: true, indoors: true, screen: true, computer: true, device: true, largerThanShoebox: true },
  'silla': { usedDaily: true, furniture: true, indoors: true, large: true, sitOn: true, largerThanShoebox: true },
  'libro': { usedDaily: true, portable: true, indoors: true, largerThanShoebox: false },
  'frigorifico': { usedDaily: true, electronic: true, kitchen: true, indoors: true, large: true, machine: true, largerThanShoebox: true },
  'televisor': { usedDaily: true, electronic: true, indoors: true, large: true, screen: true, device: true, largerThanShoebox: true },
  'reloj de pulsera': { usedDaily: true, wearable: true, portable: true, tellsTime: true, largerThanShoebox: false },
  'bicicleta': { vehicle: true, outdoors: true, large: true, gameEquipment: true, largerThanShoebox: true },
  'coche': { usedDaily: true, electronic: true, vehicle: true, outdoors: true, large: true, largerThanShoebox: true },
  'automovil': { usedDaily: true, electronic: true, vehicle: true, outdoors: true, large: true, container: true, largerThanShoebox: true },
  'martillo': { tool: true, portable: true, indoors: true, largerThanShoebox: false },
  'taladro': { tool: true, electronic: true, portable: true, device: true, machine: true, largerThanShoebox: false },
  'mesa': { usedDaily: true, furniture: true, indoors: true, large: true, largerThanShoebox: true },
  'horno': { kitchen: true, electronic: true, indoors: true, large: true, machine: true, largerThanShoebox: true },
  'sarten': { kitchen: true, portable: true, indoors: true, container: true, largerThanShoebox: false },
  'gafas': { usedDaily: true, wearable: true, portable: true, largerThanShoebox: false },
  'camara de fotos': { electronic: true, portable: true, screen: true, device: true, largerThanShoebox: false },
  'auriculares': { usedDaily: true, electronic: true, wearable: true, portable: true, device: true, largerThanShoebox: false },
  'cama': { furniture: true, indoors: true, large: true, sitOn: true, largerThanShoebox: true },
  'microondas': { kitchen: true, electronic: true, device: true, machine: true, indoors: true, largerThanShoebox: true },
  'smartphone': { usedDaily: true, electronic: true, portable: true, screen: true, device: true, computer: true, largerThanShoebox: false },
  'tablet': { electronic: true, portable: true, screen: true, device: true, computer: true, largerThanShoebox: false },
  'piano': { musicalInstrument: true, furniture: true, indoors: true, large: true, largerThanShoebox: true },
  'guitarra': { musicalInstrument: true, portable: true, indoors: true, largerThanShoebox: true }
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
  const largerThanShoebox = attributes.largerThanShoebox ?? (large || vehicle || furniture || machine)

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
    usedDaily,
    largerThanShoebox
  }
}

export function enrichObjectCandidate(candidate: Candidate): Candidate {
  const profile = profiles[normalizedName(candidate.name)]
  const attributes = inferObjectAttributes({ ...candidate.attributes, ...profile })
  return { ...candidate, attributes }
}
