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
  { id: 'spanish-ana-obregon', name: 'Ana Obregón', category: 'person', attributes: personAttributes({ realPerson: true, historical: false, artist: true, sports: false, scientist: false, politician: false, writer: false, woman: true, europe: true, americas: false, asia: false, africa: false, bornBefore1900: false, bornBefore1800: false, bornAfter1950: true }) },
  { id: 'myth-ulises', name: 'Ulises', category: 'person', attributes: personAttributes({ realPerson: false, living: false, historical: true, artist: false, sports: false, scientist: false, politician: false, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: true, bornAfter1950: false, greekMythology: true, ancientClassical: true, deity: false, mythicHero: true, legendaryVoyage: true, exceptionalStrength: false, slaysMonster: false, seaAssociation: 0.5, loveBeauty: false }) },
  { id: 'myth-hercules', name: 'Hércules', category: 'person', attributes: personAttributes({ realPerson: false, living: false, historical: true, artist: false, sports: false, scientist: false, politician: false, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: true, bornAfter1950: false, greekMythology: true, ancientClassical: true, deity: false, mythicHero: true, legendaryVoyage: false, exceptionalStrength: true, slaysMonster: true, seaAssociation: false, loveBeauty: false }) },
  { id: 'myth-zeus', name: 'Zeus', category: 'person', attributes: personAttributes({ realPerson: false, living: false, historical: true, artist: false, sports: false, scientist: false, politician: false, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: true, bornAfter1950: false, greekMythology: true, ancientClassical: true, religiousSpiritual: true, deity: true, olympianLeader: true, mythicHero: false, seaAssociation: false, loveBeauty: false }) },
  { id: 'myth-poseidon', name: 'Poseidón', category: 'person', attributes: personAttributes({ realPerson: false, living: false, historical: true, artist: false, sports: false, scientist: false, politician: false, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: true, bornAfter1950: false, greekMythology: true, ancientClassical: true, religiousSpiritual: true, deity: true, olympianLeader: false, mythicHero: false, seaAssociation: true, loveBeauty: false }) },
  { id: 'myth-afrodita', name: 'Afrodita', category: 'person', attributes: personAttributes({ realPerson: false, living: false, historical: true, artist: false, sports: false, scientist: false, politician: false, writer: false, woman: true, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: true, bornAfter1950: false, greekMythology: true, ancientClassical: true, religiousSpiritual: true, deity: true, olympianLeader: false, mythicHero: false, seaAssociation: false, loveBeauty: true }) },
  { id: 'myth-cupido', name: 'Cupido', category: 'person', attributes: personAttributes({ realPerson: false, living: false, historical: true, artist: false, sports: false, scientist: false, politician: false, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: true, bornAfter1950: false, romanMythology: true, ancientClassical: true, religiousSpiritual: true, deity: true, loveBeauty: true, wingedMythic: true }) },
  { id: 'myth-ares', name: 'Ares', category: 'person', attributes: personAttributes({ realPerson: false, living: false, historical: true, artist: false, sports: false, scientist: false, politician: false, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: true, bornAfter1950: false, greekMythology: true, ancientClassical: true, religiousSpiritual: true, deity: true, warAssociation: true }) },
  { id: 'myth-marte', name: 'Marte', category: 'person', attributes: personAttributes({ realPerson: false, living: false, historical: true, artist: false, sports: false, scientist: false, politician: false, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: true, bornAfter1950: false, romanMythology: true, ancientClassical: true, religiousSpiritual: true, deity: true, warAssociation: true }) },
  { id: 'myth-minotauro', name: 'Minotauro', category: 'person', attributes: personAttributes({ realPerson: false, living: false, historical: true, artist: false, sports: false, scientist: false, politician: false, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: true, bornAfter1950: false, greekMythology: true, ancientClassical: true, deity: false, mythicMonster: true }) },
  { id: 'myth-atenea', name: 'Atenea', category: 'person', attributes: personAttributes({ realPerson: false, living: false, historical: true, artist: false, sports: false, scientist: false, politician: false, writer: false, woman: true, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: true, bornAfter1950: false, greekMythology: true, ancientClassical: true, religiousSpiritual: true, deity: true, wisdomAssociation: true }) },
  { id: 'myth-apolo', name: 'Apolo', category: 'person', attributes: personAttributes({ realPerson: false, living: false, historical: true, artist: true, sports: false, scientist: false, politician: false, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: true, bornAfter1950: false, greekMythology: true, ancientClassical: true, religiousSpiritual: true, deity: true }) },
  { id: 'myth-hades', name: 'Hades', category: 'person', attributes: personAttributes({ realPerson: false, living: false, historical: true, artist: false, sports: false, scientist: false, politician: false, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: true, bornAfter1950: false, greekMythology: true, ancientClassical: true, religiousSpiritual: true, deity: true, underworldAssociation: true }) },
  { id: 'myth-medusa', name: 'Medusa', category: 'person', attributes: personAttributes({ realPerson: false, living: false, historical: true, artist: false, sports: false, scientist: false, politician: false, writer: false, woman: true, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: true, bornAfter1950: false, greekMythology: true, ancientClassical: true, deity: false, mythicMonster: true }) },
  { id: 'myth-perseo', name: 'Perseo', category: 'person', attributes: personAttributes({ realPerson: false, living: false, historical: true, artist: false, sports: false, scientist: false, politician: false, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: true, bornAfter1950: false, greekMythology: true, ancientClassical: true, deity: false, mythicHero: true, legendaryVoyage: false, exceptionalStrength: false, slaysMonster: true }) },
  { id: 'myth-orion', name: 'Orión', category: 'person', attributes: personAttributes({ realPerson: false, living: false, historical: true, artist: false, sports: false, scientist: false, politician: false, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: true, bornAfter1950: false, greekMythology: true, ancientClassical: true, deity: false, mythicHero: true, hunterAssociation: true, constellationAssociation: true }) },
  { id: 'myth-casiopea', name: 'Casiopea', category: 'person', attributes: personAttributes({ realPerson: false, living: false, historical: true, artist: false, sports: false, scientist: false, politician: false, writer: false, woman: true, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: true, bornAfter1950: false, greekMythology: true, ancientClassical: true, deity: false, constellationAssociation: true }) },
  { id: 'myth-centauro', name: 'Centauro', category: 'person', attributes: personAttributes({ realPerson: false, living: false, historical: true, artist: false, sports: false, scientist: false, politician: false, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: true, bornAfter1950: false, greekMythology: true, ancientClassical: true, deity: false, mythicMonster: true, halfHumanHalfAnimal: true }) },
  { id: 'fiction-sherlock-holmes', name: 'Sherlock Holmes', category: 'person', attributes: personAttributes({ realPerson: false, living: false, historical: false, artist: false, sports: false, scientist: false, politician: false, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: true, bornBefore1800: false, bornAfter1950: false, artificialOrFictional: true, detective: true, screenPerformer: true }) },
  { id: 'fiction-harry-potter', name: 'Harry Potter', category: 'person', attributes: personAttributes({ realPerson: false, living: true, historical: false, artist: false, sports: false, scientist: false, politician: false, writer: false, woman: false, europe: true, americas: false, asia: false, africa: false, bornBefore1900: false, bornBefore1800: false, bornAfter1950: true, artificialOrFictional: true, magicalCharacter: true, screenPerformer: true }) },
  { id: 'fiction-mafalda', name: 'Mafalda', category: 'person', attributes: personAttributes({ realPerson: false, living: true, historical: false, artist: false, sports: false, scientist: false, politician: false, writer: false, woman: true, europe: false, americas: true, asia: false, africa: false, bornBefore1900: false, bornBefore1800: false, bornAfter1950: true, artificialOrFictional: true, hispanic: true, comicCharacter: true }) }
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
  'elizabeth i of england': 'Isabel I de Inglaterra',
  'louis xiv of france': 'Luis XIV de Francia',
  'xerxes i of persia': 'Jerjes I de Persia',
  'diogenes of sinope': 'Diógenes de Sinope',
  'henry viii of england': 'Enrique VIII de Inglaterra',
  'cyrus the great': 'Ciro el Grande',
  'darius i of persia': 'Darío I de Persia',
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
  'nero': 'Nerón',
  'hypatia of alexandria': 'Hipatia de Alejandría',
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
  'suleiman the magnificent': 'Solimán el Magnífico',
  'francis of assisi': 'Francisco de Asís',
  'zeno of elea': 'Zenón de Elea',
  'philip ii of macedon': 'Filipo II de Macedonia',
  'charles v, holy roman emperor': 'Carlos V',
  'pliny the elder': 'Plinio el Viejo',
  'peter i of russia': 'Pedro I de Rusia',
  'saint andrew': 'San Andrés',
  'saint george': 'San Jorge',
  'louis xvi of france': 'Luis XVI de Francia',
  'saint james the great': 'Santiago el Mayor',
  'pyrrhus of epirus': 'Pirro de Epiro',
  'queen of sheba': 'Reina de Saba',
  'richard i of england': 'Ricardo I de Inglaterra',
  'mary i of scotland': 'María I de Escocia',
  'darius iii of persia': 'Darío III de Persia',
  'cato the elder': 'Catón el Viejo',
  'nicholas ii of russia': 'Nicolás II de Rusia',
  'vlad iii the impaler': 'Vlad el Empalador',
  'catherine ii of russia': 'Catalina II de Rusia',
  'napoleon iii of france': 'Napoleón III de Francia',
  'pope john paul ii': 'Juan Pablo II',
  'hero of alexandria': 'Herón de Alejandría',
  'herod the great': 'Herodes el Grande',
  'pippin the younger': 'Pipino el Breve',
  'anaximenes of miletus': 'Anaxímenes de Mileto',
  'benedict of nursia': 'Benito de Nursia',
  'elizabeth ii of the united kingdom': 'Isabel II del Reino Unido',
  'philip ii of spain': 'Felipe II de España',
  'ivan iv of russia': 'Iván el Terrible',
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
  const scienceName = ['hipatia'].some(token => normalized.includes(token))
  const living = attributes.living ?? (
    normalized.includes('caballe') ? false :
    attributes.bornAfter1950 === true ? true :
    attributes.bornBefore1900 === true ? false :
    undefined
  )
  const religiousSpiritual = [
    'abraham', 'afrodita', 'agustin de hipona', 'apolo', 'ares', 'atenea', 'confucio',
    'cupido', 'gandhi', 'hades', 'hercules', 'jesucristo', 'juan el bautista',
    'mahoma', 'marte', 'moises', 'pablo de tarso', 'poseidon', 'san pedro',
    'santo', 'virgen maria', 'zeus'
  ].some(token => normalized.includes(token))
  const ancientClassical = [
    'alejandro magno', 'aristoteles', 'arquimedes', 'ciceron', 'cleopatra', 'euclides',
    'hercules', 'herodoto', 'hipatia', 'hipocrates', 'homero', 'julio cesar',
    'marco aurelio', 'minotauro', 'neron', 'ovidio', 'pericles', 'platon',
    'poseidon', 'ptolomeo', 'socrates', 'sofocles', 'tales de mileto', 'ulises',
    'virgilio', 'zeus'
  ].some(token => normalized.includes(token))
  const civicLeader = politician || [
    'adolf suarez', 'barack obama', 'clara campoamor', 'felipe vi', 'gandhi',
    'isabel la catolica', 'pedro sanchez'
  ].some(token => normalized.includes(token))
  const romanWorld = [
    'agustin de hipona', 'ciceron', 'julio cesar', 'marco antonio', 'marco aurelio', 'neron',
    'ovidio', 'pablo de tarso', 'pertinax', 'plutarco', 'seneca', 'trajan', 'virgilio'
  ].some(token => normalized.includes(token))
  const greekMythology = ['afrodita', 'apolo', 'ares', 'atenea', 'casiopea', 'centauro', 'hades', 'hercules', 'medusa', 'minotauro', 'orion', 'perseo', 'poseidon', 'ulises', 'zeus'].some(token => normalized.includes(token))
  const romanMythology = ['cupido', 'marte'].some(token => normalized.includes(token))
  const deity = ['afrodita', 'apolo', 'ares', 'atenea', 'cupido', 'hades', 'marte', 'poseidon', 'zeus'].some(token => normalized.includes(token))
  const olympianLeader = ['zeus'].some(token => normalized.includes(token))
  const mythicHero = ['hercules', 'orion', 'perseo', 'ulises'].some(token => normalized.includes(token))
  const mythicMonster = ['centauro', 'medusa', 'minotauro'].some(token => normalized.includes(token))
  const legendaryVoyage = ['ulises'].some(token => normalized.includes(token))
  const exceptionalStrength = ['hercules'].some(token => normalized.includes(token))
  const slaysMonster = ['hercules', 'perseo'].some(token => normalized.includes(token))
  const seaAssociation = ['poseidon'].some(token => normalized.includes(token))
  const loveBeauty = ['afrodita', 'cupido'].some(token => normalized.includes(token))
  const warAssociation = ['ares', 'marte'].some(token => normalized.includes(token))
  const constellationAssociation = ['casiopea', 'orion'].some(token => normalized.includes(token))
  const hunterAssociation = ['orion'].some(token => normalized.includes(token))
  const halfHumanHalfAnimal = ['centauro'].some(token => normalized.includes(token))

  return {
    ...attributes,
    artificialOrFictional: attributes.realPerson === false,
    living,
    indoors: 0.5,
    largerThanShoebox: true,
    digitalOrElectronic: false,
    tangible: attributes.realPerson ?? true,
    before1900: attributes.bornBefore1900,
    historical: attributes.historical ?? attributes.bornBefore1900,
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
    scientist: attributes.scientist === true || scienceName,
    sciencePoliticsLeadership: attributes.sciencePoliticsLeadership ?? (scientist || scienceName || politician),
    religiousSpiritual: attributes.religiousSpiritual ?? religiousSpiritual,
    ancientClassical: attributes.ancientClassical ?? ancientClassical,
    civicLeader: attributes.civicLeader ?? civicLeader,
    romanWorld: attributes.romanWorld ?? romanWorld,
    greekMythology: attributes.greekMythology ?? greekMythology,
    romanMythology: attributes.romanMythology ?? romanMythology,
    deity: attributes.deity ?? deity,
    olympianLeader: attributes.olympianLeader ?? olympianLeader,
    mythicHero: attributes.mythicHero ?? mythicHero,
    mythicMonster: attributes.mythicMonster ?? mythicMonster,
    legendaryVoyage: attributes.legendaryVoyage ?? legendaryVoyage,
    exceptionalStrength: attributes.exceptionalStrength ?? exceptionalStrength,
    slaysMonster: attributes.slaysMonster ?? slaysMonster,
    seaAssociation: attributes.seaAssociation ?? seaAssociation,
    loveBeauty: attributes.loveBeauty ?? loveBeauty,
    warAssociation: attributes.warAssociation ?? warAssociation,
    constellationAssociation: attributes.constellationAssociation ?? constellationAssociation,
    hunterAssociation: attributes.hunterAssociation ?? hunterAssociation,
    halfHumanHalfAnimal: attributes.halfHumanHalfAnimal ?? halfHumanHalfAnimal
  }
}

export function enrichPersonCandidate(candidate: Candidate): Candidate {
  const name = commonSpanishName(candidate.name)
  return { ...candidate, name, attributes: inferPersonAttributes(name, candidate.attributes) }
}
