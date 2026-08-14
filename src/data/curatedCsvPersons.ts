import type { AttributeValue, Candidate } from '../types/game'

type CsvPersonCategory = 'Música' | 'Deportes' | 'Literatura' | 'Política e Historia' | 'Ciencia y Tecnología' | 'Cine y Espectáculo'
type CsvGender = 'Femenino' | 'Masculino'
type CsvEpoch = 'Actual' | 'Histórico'
type CsvContinent = 'Europa' | 'América del Norte' | 'América del Sur' | 'Asia' | 'África'

interface CsvPersonRow {
  name: string
  category: CsvPersonCategory
  gender: CsvGender
  epoch: CsvEpoch
  living: boolean
  realPerson: boolean
  spanishOrigin: boolean
  continent: CsvContinent
}

const rows: CsvPersonRow[] = [
  { name: 'Julio Iglesias', category: 'Música', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Alejandro Sanz', category: 'Música', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Joaquín Sabina', category: 'Música', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Joan Manuel Serrat', category: 'Música', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Manuel de Falla', category: 'Música', gender: 'Masculino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Plácido Domingo', category: 'Música', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'David Bisbal', category: 'Música', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Aitana', category: 'Música', gender: 'Femenino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Enrique Iglesias', category: 'Música', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Lola Flores', category: 'Música', gender: 'Femenino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Rocío Jurado', category: 'Música', gender: 'Femenino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Camilo Sesto', category: 'Música', gender: 'Masculino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Pablo Alborán', category: 'Música', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'C. Tangana', category: 'Música', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Michael Jackson', category: 'Música', gender: 'Masculino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: false, continent: 'América del Norte' },
  { name: 'Taylor Swift', category: 'Música', gender: 'Femenino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: false, continent: 'América del Norte' },
  { name: 'Madonna', category: 'Música', gender: 'Femenino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: false, continent: 'América del Norte' },
  { name: 'Beyoncé', category: 'Música', gender: 'Femenino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: false, continent: 'América del Norte' },
  { name: 'Shakira', category: 'Música', gender: 'Femenino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: false, continent: 'América del Sur' },
  { name: 'Luis Miguel', category: 'Música', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: false, continent: 'América del Norte' },
  { name: 'Bad Bunny', category: 'Música', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: false, continent: 'América del Norte' },
  { name: 'Fernando Alonso', category: 'Deportes', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Pau Gasol', category: 'Deportes', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Andrés Iniesta', category: 'Deportes', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Iker Casillas', category: 'Deportes', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Marc Márquez', category: 'Deportes', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Carlos Sainz', category: 'Deportes', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Mireia Belmonte', category: 'Deportes', gender: 'Femenino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Carolina Marín', category: 'Deportes', gender: 'Femenino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Alexia Putellas', category: 'Deportes', gender: 'Femenino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Miguel Induráin', category: 'Deportes', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Xavi Hernández', category: 'Deportes', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Cristiano Ronaldo', category: 'Deportes', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: false, continent: 'Europa' },
  { name: 'Michael Jordan', category: 'Deportes', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: false, continent: 'América del Norte' },
  { name: 'Diego Maradona', category: 'Deportes', gender: 'Masculino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: false, continent: 'América del Sur' },
  { name: 'Roger Federer', category: 'Deportes', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: false, continent: 'Europa' },
  { name: 'Lewis Hamilton', category: 'Deportes', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: false, continent: 'Europa' },
  { name: 'Usain Bolt', category: 'Deportes', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: false, continent: 'América del Norte' },
  { name: 'LeBron James', category: 'Deportes', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: false, continent: 'América del Norte' },
  { name: 'Lope de Vega', category: 'Literatura', gender: 'Masculino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Francisco de Quevedo', category: 'Literatura', gender: 'Masculino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Rosalía de Castro', category: 'Literatura', gender: 'Femenino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Antonio Machado', category: 'Literatura', gender: 'Masculino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Benito Pérez Galdós', category: 'Literatura', gender: 'Masculino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Arturo Pérez-Reverte', category: 'Literatura', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Carlos Ruiz Zafón', category: 'Literatura', gender: 'Masculino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Javier Marías', category: 'Literatura', gender: 'Masculino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Almudena Grandes', category: 'Literatura', gender: 'Femenino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Camilo José Cela', category: 'Literatura', gender: 'Masculino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Jorge Luis Borges', category: 'Literatura', gender: 'Masculino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: false, continent: 'América del Sur' },
  { name: 'Julio Cortázar', category: 'Literatura', gender: 'Masculino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: false, continent: 'América del Sur' },
  { name: 'Don Quijote de la Mancha', category: 'Literatura', gender: 'Masculino', epoch: 'Histórico', living: false, realPerson: false, spanishOrigin: true, continent: 'Europa' },
  { name: 'Sherlock Holmes', category: 'Literatura', gender: 'Masculino', epoch: 'Histórico', living: false, realPerson: false, spanishOrigin: false, continent: 'Europa' },
  { name: 'Adolfo Suárez', category: 'Política e Historia', gender: 'Masculino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Felipe VI', category: 'Política e Historia', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Barack Obama', category: 'Política e Historia', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: false, continent: 'América del Norte' },
  { name: 'Severo Ochoa', category: 'Ciencia y Tecnología', gender: 'Masculino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Margarita Salas', category: 'Ciencia y Tecnología', gender: 'Femenino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Isaac Peral', category: 'Ciencia y Tecnología', gender: 'Masculino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Juan de la Cierva', category: 'Ciencia y Tecnología', gender: 'Masculino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Mateo Seoane', category: 'Ciencia y Tecnología', gender: 'Masculino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Alan Turing', category: 'Ciencia y Tecnología', gender: 'Masculino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: false, continent: 'Europa' },
  { name: 'Ada Lovelace', category: 'Ciencia y Tecnología', gender: 'Femenino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: false, continent: 'Europa' },
  { name: 'Steve Jobs', category: 'Ciencia y Tecnología', gender: 'Masculino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: false, continent: 'América del Norte' },
  { name: 'Elon Musk', category: 'Ciencia y Tecnología', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: false, continent: 'América del Norte' },
  { name: 'Javier Bardem', category: 'Cine y Espectáculo', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Antonio Banderas', category: 'Cine y Espectáculo', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Luis Buñuel', category: 'Cine y Espectáculo', gender: 'Masculino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Alejandro Amenábar', category: 'Cine y Espectáculo', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Santiago Segura', category: 'Cine y Espectáculo', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Úrsula Corberó', category: 'Cine y Espectáculo', gender: 'Femenino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Mario Casas', category: 'Cine y Espectáculo', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Paco León', category: 'Cine y Espectáculo', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Lina Morgan', category: 'Cine y Espectáculo', gender: 'Femenino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Sara Montiel', category: 'Cine y Espectáculo', gender: 'Femenino', epoch: 'Histórico', living: false, realPerson: true, spanishOrigin: true, continent: 'Europa' },
  { name: 'Tom Cruise', category: 'Cine y Espectáculo', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: false, continent: 'América del Norte' },
  { name: 'Brad Pitt', category: 'Cine y Espectáculo', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: false, continent: 'América del Norte' },
  { name: 'Meryl Streep', category: 'Cine y Espectáculo', gender: 'Femenino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: false, continent: 'América del Norte' },
  { name: 'Leonardo DiCaprio', category: 'Cine y Espectáculo', gender: 'Masculino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: false, continent: 'América del Norte' },
  { name: 'Angelina Jolie', category: 'Cine y Espectáculo', gender: 'Femenino', epoch: 'Actual', living: true, realPerson: true, spanishOrigin: false, continent: 'América del Norte' }
]

function sourceId(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function continentAttributes(continent: CsvContinent): Record<string, boolean> {
  return {
    europe: continent === 'Europa',
    americas: continent === 'América del Norte' || continent === 'América del Sur',
    asia: continent === 'Asia',
    africa: continent === 'África'
  }
}

function categoryAttributes(category: CsvPersonCategory): Record<string, AttributeValue> {
  return {
    artist: category === 'Música' || category === 'Cine y Espectáculo',
    sports: category === 'Deportes',
    scientist: category === 'Ciencia y Tecnología',
    politician: category === 'Política e Historia',
    writer: category === 'Literatura',
    music: category === 'Música',
    screenPerformer: category === 'Cine y Espectáculo',
    politicalPower: category === 'Política e Historia',
    sciencePoliticsLeadership: category === 'Política e Historia' || category === 'Ciencia y Tecnología'
  }
}

function toCandidate(row: CsvPersonRow): Candidate {
  return {
    id: `csv-person-${sourceId(row.name)}`,
    name: row.name,
    category: 'person',
    attributes: {
      realPerson: row.realPerson,
      living: row.living,
      historical: row.epoch === 'Histórico',
      woman: row.gender === 'Femenino',
      bornBefore1900: row.epoch === 'Histórico',
      bornBefore1800: false,
      bornAfter1950: row.epoch === 'Actual',
      spanishOrigin: row.spanishOrigin,
      hispanic: row.spanishOrigin || row.continent === 'América del Sur' || ['Shakira', 'Luis Miguel', 'Bad Bunny'].includes(row.name),
      ...continentAttributes(row.continent),
      ...categoryAttributes(row.category)
    }
  }
}

export const csvPersonCandidates: Candidate[] = rows.map(toCandidate)
