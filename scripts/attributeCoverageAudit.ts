import { writeFile } from 'node:fs/promises'
import { loadCategoryKnowledge } from '../src/data/catalog'
import { questions } from '../src/data/questions'
import type { AttributeValue, Candidate, Category, Question } from '../src/types/game'

const outputPath = 'ATTRIBUTE_COVERAGE_AUDIT.md'
const categories: Category[] = ['animal', 'object', 'place', 'person']
const placeMissingThreshold = 0.5

interface AttributeAuditRow {
  category: Category
  attribute: string
  questionIds: string[]
  totalCandidates: number
  knownCount: number
  yesCount: number
  noCount: number
  coverage: number
  affirmativeRate: number
}

interface CandidateMissingRow {
  id: string
  name: string
  category: Category
  totalAttributes: number
  missingCount: number
  missingRate: number
  missingAttributes: string[]
}

function uniqueValues(values: string[]): string[] {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right, 'es'))
}

function categoryQuestions(category: Category): Question[] {
  return questions.filter(question => question.categories.includes(category))
}

function categoryAttributes(category: Category): string[] {
  return uniqueValues(categoryQuestions(category).map(question => question.attribute))
}

function questionsByAttribute(category: Category): Map<string, string[]> {
  const byAttribute = new Map<string, string[]>()
  for (const question of categoryQuestions(category)) {
    byAttribute.set(question.attribute, [...(byAttribute.get(question.attribute) ?? []), question.id])
  }
  return byAttribute
}

function attributeValue(candidate: Candidate, attribute: string): AttributeValue | undefined {
  const value = candidate.attributes[attribute] as AttributeValue | null | undefined
  return value === null ? undefined : value
}

function isKnown(value: AttributeValue | undefined): boolean {
  return value !== undefined
}

function isAffirmative(value: AttributeValue): boolean {
  if (typeof value === 'boolean') return value
  return value > 0.5
}

function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}

function auditExtremeAffirmativeRates(
  category: Category,
  candidates: Candidate[]
): AttributeAuditRow[] {
  const questionIdsByAttribute = questionsByAttribute(category)

  return categoryAttributes(category)
    .map(attribute => {
      const values = candidates
        .map(candidate => attributeValue(candidate, attribute))
        .filter(isKnown)
      const yesCount = values.filter(isAffirmative).length
      const knownCount = values.length
      const affirmativeRate = knownCount > 0 ? yesCount / knownCount : 0

      return {
        category,
        attribute,
        questionIds: questionIdsByAttribute.get(attribute) ?? [],
        totalCandidates: candidates.length,
        knownCount,
        yesCount,
        noCount: knownCount - yesCount,
        coverage: candidates.length > 0 ? knownCount / candidates.length : 0,
        affirmativeRate
      }
    })
    .filter(row => row.knownCount > 0 && (row.affirmativeRate === 0 || row.affirmativeRate === 1))
}

function auditPlaceCandidatesWithMissingAttributes(candidates: Candidate[]): CandidateMissingRow[] {
  const attributes = categoryAttributes('place')

  return candidates
    .map(candidate => {
      const missingAttributes = attributes.filter(attribute => !isKnown(attributeValue(candidate, attribute)))
      const missingRate = attributes.length > 0 ? missingAttributes.length / attributes.length : 0
      return {
        id: candidate.id,
        name: candidate.name,
        category: candidate.category,
        totalAttributes: attributes.length,
        missingCount: missingAttributes.length,
        missingRate,
        missingAttributes
      }
    })
    .filter(row => row.missingRate > placeMissingThreshold)
    .sort((left, right) =>
      right.missingRate - left.missingRate ||
      right.missingCount - left.missingCount ||
      left.name.localeCompare(right.name, 'es')
    )
}

function extremeRateTable(rows: AttributeAuditRow[]): string {
  if (!rows.length) return 'No se han encontrado atributos con 0% o 100% de respuestas afirmativas.'

  return [
    '| Categoría | Atributo | Preguntas | Candidatos | Con dato | Cobertura | Sí | No | % Sí |',
    '| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |',
    ...rows.map(row => [
      row.category,
      row.attribute,
      row.questionIds.join(', '),
      row.totalCandidates,
      row.knownCount,
      formatPercent(row.coverage),
      row.yesCount,
      row.noCount,
      formatPercent(row.affirmativeRate)
    ].join(' | ')).map(line => `| ${line} |`)
  ].join('\n')
}

function missingPlacesTable(rows: CandidateMissingRow[]): string {
  if (!rows.length) return 'No se han encontrado lugares con más del 50% de atributos sin rellenar.'

  return [
    '| Candidato | ID | Atributos | Sin rellenar | % sin rellenar | Atributos sin rellenar |',
    '| --- | --- | ---: | ---: | ---: | --- |',
    ...rows.map(row => [
      row.name,
      row.id,
      row.totalAttributes,
      row.missingCount,
      formatPercent(row.missingRate),
      row.missingAttributes.join(', ')
    ].join(' | ')).map(line => `| ${line} |`)
  ].join('\n')
}

async function main(): Promise<void> {
  const knowledgeByCategory = new Map<Category, Awaited<ReturnType<typeof loadCategoryKnowledge>>>()
  for (const category of categories) {
    knowledgeByCategory.set(category, await loadCategoryKnowledge(category))
  }

  const extremeRows = categories.flatMap(category => {
    const knowledge = knowledgeByCategory.get(category)
    return knowledge ? auditExtremeAffirmativeRates(category, knowledge.candidates) : []
  })
  const placeKnowledge = knowledgeByCategory.get('place')
  const missingPlaceRows = placeKnowledge
    ? auditPlaceCandidatesWithMissingAttributes(placeKnowledge.candidates)
    : []

  const content = [
    '# Auditoría de cobertura de atributos',
    '',
    `Generado con \`npm run audit:attributes\` el ${new Date().toISOString()}.`,
    '',
    '## Atributos con 0% o 100% de respuestas afirmativas',
    '',
    'La tasa se calcula solo sobre candidatos que tienen el atributo rellenado. Los atributos sin ningún dato se excluyen de esta tabla.',
    '',
    extremeRateTable(extremeRows),
    '',
    '## Lugares con más del 50% de atributos sin rellenar',
    '',
    `Universo de atributos: atributos usados por las preguntas de la categoría Lugar. Umbral: > ${formatPercent(placeMissingThreshold)}.`,
    '',
    missingPlacesTable(missingPlaceRows)
  ].join('\n')

  await writeFile(outputPath, `${content}\n`, 'utf8')
  console.log(`Audit written to ${outputPath}`)
  console.log(`Extreme affirmative attributes: ${extremeRows.length}`)
  console.log(`Place candidates over missing threshold: ${missingPlaceRows.length}`)
}

await main()
