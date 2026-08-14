import type { AttributeValue, Candidate } from '../types/game'

function personAttributes(attributes: Record<string, AttributeValue>): Record<string, AttributeValue> {
  return attributes
}

export const curatedPersonCandidates: Candidate[] = [
  { id: 'spanish-cervantes', name: 'Miguel de Cervantes', category: 'person', attributes: personAttributes({ realPerson: true, historical: true, artist: true, sports: false, scientist: false, politician: false, writer: true, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: true, bornAfter1950: false }) },
  { id: 'spanish-velazquez', name: 'Diego Velázquez', category: 'person', attributes: personAttributes({ realPerson: true, historical: true, artist: true, sports: false, scientist: false, politician: false, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: true, bornAfter1950: false }) },
  { id: 'spanish-goya', name: 'Francisco de Goya', category: 'person', attributes: personAttributes({ realPerson: true, historical: true, artist: true, sports: false, scientist: false, politician: false, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: true, bornAfter1950: false }) },
  { id: 'spanish-isabel-catolica', name: 'Isabel la Católica', category: 'person', attributes: personAttributes({ realPerson: true, historical: true, artist: false, sports: false, scientist: false, politician: true, writer: false, woman: true, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: true, bornAfter1950: false }) },
  { id: 'spanish-carlos-i', name: 'Carlos I de España', category: 'person', attributes: personAttributes({ realPerson: true, historical: true, artist: false, sports: false, scientist: false, politician: true, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: true, bornAfter1950: false }) },
  { id: 'spanish-felipe-ii', name: 'Felipe II', category: 'person', attributes: personAttributes({ realPerson: true, historical: true, artist: false, sports: false, scientist: false, politician: true, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: true, bornAfter1950: false }) },
  { id: 'spanish-teresa-jesus', name: 'Teresa de Jesús', category: 'person', attributes: personAttributes({ realPerson: true, historical: true, artist: true, sports: false, scientist: false, politician: false, writer: true, woman: true, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: true, bornAfter1950: false }) },
  { id: 'spanish-ramon-y-cajal', name: 'Santiago Ramón y Cajal', category: 'person', attributes: personAttributes({ realPerson: true, historical: true, artist: false, sports: false, scientist: true, politician: false, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: false, bornAfter1950: false }) },
  { id: 'spanish-clara-campoamor', name: 'Clara Campoamor', category: 'person', attributes: personAttributes({ realPerson: true, historical: true, artist: false, sports: false, scientist: false, politician: true, writer: true, woman: true, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: false, bornAfter1950: false }) },
  { id: 'spanish-lorca', name: 'Federico García Lorca', category: 'person', attributes: personAttributes({ realPerson: true, historical: true, artist: true, sports: false, scientist: false, politician: false, writer: true, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: false, bornAfter1950: false }) },
  { id: 'spanish-dali', name: 'Salvador Dalí', category: 'person', attributes: personAttributes({ realPerson: true, historical: true, artist: true, sports: false, scientist: false, politician: false, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: false, bornAfter1950: false }) },
  { id: 'spanish-montserrat-caballe', name: 'Montserrat Caballé', category: 'person', attributes: personAttributes({ realPerson: true, historical: false, artist: true, sports: false, scientist: false, politician: false, writer: false, woman: true, europe: true, americas: false, asia: false, africa: false, bornBefore1900: false, bornBefore1800: false, bornAfter1950: false }) },
  { id: 'spanish-amancio-ortega', name: 'Amancio Ortega', category: 'person', attributes: personAttributes({ realPerson: true, historical: false, artist: false, sports: false, scientist: false, politician: false, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: false, bornBefore1800: false, bornAfter1950: false }) },
  { id: 'spanish-pedro-sanchez', name: 'Pedro Sánchez', category: 'person', attributes: personAttributes({ realPerson: true, historical: false, artist: false, sports: false, scientist: false, politician: true, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: false, bornBefore1800: false, bornAfter1950: true }) },
  { id: 'spanish-rafa-nadal', name: 'Rafa Nadal', category: 'person', attributes: personAttributes({ realPerson: true, historical: false, artist: false, sports: true, scientist: false, politician: false, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: false, bornBefore1800: false, bornAfter1950: true }) },
  { id: 'spanish-carlos-alcaraz', name: 'Carlos Alcaraz', category: 'person', attributes: personAttributes({ realPerson: true, historical: false, artist: false, sports: true, scientist: false, politician: false, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: false, bornBefore1800: false, bornAfter1950: true }) },
  { id: 'spanish-penelope-cruz', name: 'Penélope Cruz', category: 'person', attributes: personAttributes({ realPerson: true, historical: false, artist: true, sports: false, scientist: false, politician: false, writer: false, woman: true, europe: true, americas: false, asia: false, africa: false, bornBefore1900: false, bornBefore1800: false, bornAfter1950: true }) },
  { id: 'spanish-almodovar', name: 'Pedro Almodóvar', category: 'person', attributes: personAttributes({ realPerson: true, historical: false, artist: true, sports: false, scientist: false, politician: false, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: false, bornBefore1800: false, bornAfter1950: true }) },
  { id: 'spanish-rosalia', name: 'Rosalía', category: 'person', attributes: personAttributes({ realPerson: true, historical: false, artist: true, sports: false, scientist: false, politician: false, writer: false, woman: true, europe: true, americas: false, asia: false, africa: false, bornBefore1900: false, bornBefore1800: false, bornAfter1950: true }) },
  { id: 'spanish-aitana-bonmati', name: 'Aitana Bonmatí', category: 'person', attributes: personAttributes({ realPerson: true, historical: false, artist: false, sports: true, scientist: false, politician: false, writer: false, woman: true, europe: true, americas: false, asia: false, africa: false, bornBefore1900: false, bornBefore1800: false, bornAfter1950: true }) },
  { id: 'spanish-ana-obregon', name: 'Ana Obregón', category: 'person', attributes: personAttributes({ realPerson: true, historical: false, artist: true, sports: false, scientist: false, politician: false, writer: false, woman: true, europe: true, americas: false, asia: false, africa: false, bornBefore1900: false, bornBefore1800: false, bornAfter1950: true }) }
]

const spanishCommonNames: Record<string, string> = {
  'aristotle': 'Aristóteles',
  'plato': 'Platón',
  'jesus christ': 'Jesucristo',
  'socrates': 'Sócrates',
  'alexander the great': 'Alejandro Magno',
  'confucius': 'Confucio',
  'julius caesar': 'Julio César',
  'homer': 'Homero',
  'pythagoras': 'Pitágoras',
  'archimedes': 'Arquímedes',
  'moses': 'Moisés',
  'muhammad': 'Mahoma',
  'abraham': 'Abraham',
  'charlemagne': 'Carlomagno',
  'christopher columbus': 'Cristóbal Colón',
  'cleopatra vii of egypt': 'Cleopatra',
  'galileo galilei': 'Galileo Galilei',
  'herodotus': 'Heródoto',
  'paul of tarsus': 'Pablo de Tarso',
  'augustine of hippo': 'Agustín de Hipona',
  'euclid': 'Euclides',
  'virgil': 'Virgilio',
  'thales': 'Tales de Mileto',
  'cicero': 'Cicerón',
  'sophocles': 'Sófocles',
  'genghis khan': 'Gengis Kan',
  'hannibal barca': 'Aníbal Barca',
  'hippocrates': 'Hipócrates',
  "jeanne d'arc": 'Juana de Arco',
  'aesop': 'Esopo',
  'epicurus': 'Epicuro',
  'thomas aquinas': 'Tomás de Aquino',
  'tutankhamun': 'Tutankamón',
  'mary': 'Virgen María',
  'marcus aurelius': 'Marco Aurelio',
  'ovid': 'Ovidio',
  'niccolò machiavelli': 'Nicolás Maquiavelo',
  'attila the hun': 'Atila',
  'raphael': 'Rafael Sanzio',
  'saint peter': 'San Pedro',
  'sappho': 'Safo',
  'aeschylus': 'Esquilo',
  'ptolemy': 'Claudio Ptolomeo',
  'john the baptist': 'Juan el Bautista',
  'trajan': 'Trajano',
  'mary magdalene': 'María Magdalena',
  'heraclitus': 'Heráclito',
  'gilgamesh': 'Gilgamesh',
  'seneca the younger': 'Séneca',
  'pericles': 'Pericles',
  'sun tzu': 'Sun Tzu',
  'hadrian': 'Adriano',
  'judas iscariot': 'Judas Iscariote',
  'mark antony': 'Marco Antonio',
  'hammurabi': 'Hammurabi',
  'democritus': 'Demócrito',
  'aristophanes': 'Aristófanes',
  'plutarch': 'Plutarco'
}

function normalizedName(name: string): string {
  return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es')
}

function commonSpanishName(name: string): string {
  return spanishCommonNames[normalizedName(name)] ?? name
}

function inferPersonAttributes(name: string, attributes: Record<string, AttributeValue>): Record<string, AttributeValue> {
  const artist = attributes.artist === true
  const sports = attributes.sports === true
  const writer = attributes.writer === true
  const scientist = attributes.scientist === true
  const politician = attributes.politician === true
  const americas = attributes.americas === true
  const europe = attributes.europe === true
  const spanishOrigin = attributes.spanishOrigin === true
  const normalized = normalizedName(name)
  const musicName = [
    'rosalia', 'caballe', 'iglesias', 'sanz', 'sabina', 'serrat', 'falla', 'bisbal',
    'aitana', 'flores', 'jurado', 'sesto', 'alboran', 'tangana', 'jackson', 'swift',
    'madonna', 'beyonce', 'shakira', 'miguel'
  ].some(token => normalized.includes(token))
  const screenName = [
    'cruz', 'almodovar', 'bardem', 'banderas', 'bunuel', 'amenabar', 'segura',
    'corbero', 'casas', 'paco leon', 'morgan', 'montiel', 'cruise', 'pitt',
    'streep', 'dicaprio', 'jolie', 'obregon'
  ].some(token => normalized.includes(token))
  const pseudonym = ['c. tangana', 'bad bunny', 'madonna', 'shakira', 'beyonce'].some(token => normalized.includes(token))
  const billionaire = ['amancio ortega', 'elon musk', 'bill gates', 'steve jobs'].some(token => normalized.includes(token))

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
    spanishOrigin,
    hispanic: attributes.hispanic ?? (spanishOrigin || normalized.includes('borges') || normalized.includes('cortazar') || normalized.includes('shakira') || normalized.includes('luis miguel') || normalized.includes('bad bunny')),
    music: attributes.music ?? musicName,
    screenPerformer: attributes.screenPerformer ?? screenName,
    politicalPower: attributes.politicalPower ?? politician,
    worksInGroup: attributes.worksInGroup ?? (sports ? 0.5 : undefined),
    pseudonym: attributes.pseudonym ?? pseudonym,
    billionaire: attributes.billionaire ?? billionaire,
    sciencePoliticsLeadership: attributes.sciencePoliticsLeadership ?? (scientist || politician)
  }
}

export function enrichPersonCandidate(candidate: Candidate): Candidate {
  const name = commonSpanishName(candidate.name)
  return { ...candidate, name, attributes: inferPersonAttributes(name, candidate.attributes) }
}
