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
  'guitarra': { musicalInstrument: true, portable: true, indoors: true, largerThanShoebox: true },
  'cuchara': { kitchen: true, kitchenFood: true, cutlery: true, hasHandle: true, concave: true, portable: true, container: false, metalOrPlastic: true, largerThanShoebox: false },
  'cuchillo': { kitchen: true, kitchenFood: true, cutlery: true, hasHandle: true, concave: false, portable: true, metalOrPlastic: true, largerThanShoebox: false },
  'tenedor': { kitchen: true, kitchenFood: true, cutlery: true, hasHandle: true, concave: false, portable: true, metalOrPlastic: true, largerThanShoebox: false },
  'plato': { kitchen: true, kitchenFood: true, cutlery: false, hasHandle: false, concave: 0.5, portable: true, container: true, metalOrPlastic: false, largerThanShoebox: 0.5 },
  'taza': { kitchen: true, kitchenFood: true, cutlery: false, hasHandle: true, concave: true, portable: true, container: true, metalOrPlastic: false, largerThanShoebox: false },
  'vaso': { kitchen: true, kitchenFood: true, cutlery: false, hasHandle: false, concave: true, portable: true, container: true, metalOrPlastic: false, largerThanShoebox: false },
  'copa': { kitchen: true, kitchenFood: true, cutlery: false, hasHandle: true, concave: true, portable: true, container: true, metalOrPlastic: false, largerThanShoebox: false },
  'jarra': { kitchen: true, kitchenFood: true, cutlery: false, hasHandle: true, concave: true, portable: true, container: true, metalOrPlastic: false, largerThanShoebox: 0.5 },
  'jarro': { kitchen: true, kitchenFood: true, cutlery: false, hasHandle: true, concave: true, portable: true, container: true, metalOrPlastic: false, largerThanShoebox: 0.5 },
  'embudo': { kitchen: true, kitchenFood: 0.5, cutlery: false, hasHandle: false, concave: true, portable: true, container: false, tool: true, metalOrPlastic: 0.5, largerThanShoebox: false }
}

function normalizedName(name: string): string {
  return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es')
}

function genericObjectName(name: string, id: string): string {
  const normalized = normalizedName(name)
  if (normalized.includes('botella')) return 'Botella'
  if (normalized === 'jarro' || normalized.includes('jarra')) return 'Jarra'
  if (normalized === 'vaso') return 'Vaso'
  if (normalized === 'embudo') return 'Embudo'
  if (normalized === 'copa' && id !== 'wn-object-crown-n-05') return 'Copa'
  return name
}

function inferObjectAttributes(name: string, attributes: Record<string, AttributeValue>): Record<string, AttributeValue> {
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
  const cleaningName = ['escoba', 'fregona', 'jabon', 'detergente', 'aspiradora', 'bayeta'].some(token => name.includes(token))
  const liquidName = ['agua', 'aceite', 'leche', 'vino', 'zumo', 'gasolina'].some(token => name.includes(token))
  const edibleName = ['pan', 'queso', 'manzana', 'platano', 'arroz', 'pasta', 'pizza', 'chocolate'].some(token => name.includes(token))
  const cutleryName = ['cuchara', 'cuchillo', 'tenedor'].some(token => name.includes(token))
  const handleName = ['cuchara', 'cuchillo', 'tenedor', 'taza', 'sarten', 'martillo', 'taladro', 'paraguas', 'guitarra'].some(token => name.includes(token))
  const concaveName = ['cuchara', 'taza', 'vaso', 'cuenco', 'bol', 'sarten', 'olla'].some(token => name.includes(token))

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
  const digitalOrElectronic = attributes.digitalOrElectronic ?? (electronic === true || device || screen === true || computer === true)
  const movingMechanicalElectronic = attributes.movingMechanicalElectronic ?? (electronic === true || device || machine || vehicle)
  const workStudyTool = attributes.workStudyTool ?? (tool || computer === true || attributes.screen === true)
  const storeContainTransport = attributes.storeContainTransport ?? (container || vehicle)
  const kitchenFood = attributes.kitchenFood ?? kitchen
  const metalOrPlastic = attributes.metalOrPlastic ?? (device || machine || vehicle || tool || weapon)
  const softFlexible = attributes.softFlexible ?? (wearable || name.includes('almohada') || name.includes('toalla'))
  const liquid = attributes.liquid ?? liquidName
  const edible = attributes.edible ?? edibleName
  const cleaning = attributes.cleaning ?? cleaningName
  const cutlery = attributes.cutlery ?? cutleryName
  const hasHandle = attributes.hasHandle ?? handleName
  const concave = attributes.concave ?? concaveName

  return {
    ...attributes,
    artificialOrFictional: true,
    tangible: true,
    electronic,
    portable,
    outdoors,
    indoors,
    large,
    screen,
    computer,
    sitOn,
    usedDaily,
    largerThanShoebox,
    digitalOrElectronic,
    movingMechanicalElectronic,
    workStudyTool,
    storeContainTransport,
    kitchenFood,
    metalOrPlastic,
    vehicle,
    wearable,
    gameEquipment,
    softFlexible,
    liquid,
    edible,
    cleaning,
    cutlery,
    hasHandle,
    concave
  }
}

export function enrichObjectCandidate(candidate: Candidate): Candidate {
  const genericName = genericObjectName(candidate.name, candidate.id)
  const name = normalizedName(genericName)
  const profile = profiles[name]
  const attributes = inferObjectAttributes(name, { ...candidate.attributes, ...profile })
  return { ...candidate, name: genericName, attributes }
}
