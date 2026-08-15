import { writeFile } from 'node:fs/promises'
import { loadCategoryKnowledge } from '../src/data/catalog'
import { expectedValue } from '../src/engine/scoring'
import type { AttributeValue, Candidate, Category, Question } from '../src/types/game'

const outputPath = 'CANDIDATE_SIGNATURE_AUDIT.md'
const categories: Category[] = ['animal', 'object', 'place', 'person']
const previewLimit = 20

interface SignatureGroup {
  signature: string
  candidates: Candidate[]
}

interface CategorySignatureAudit {
  category: Category
  questionCount: number
  candidateCount: number
  duplicateGroups: SignatureGroup[]
  indistinguishableCandidateCount: number
  indistinguishablePairCount: number
}

function encodeAttributeValue(value: AttributeValue | undefined): string {
  if (value === undefined) return '?'
  if (value === true) return '1'
  if (value === false) return '0'
  return `n:${Number(value).toFixed(3)}`
}

function candidateSignature(candidate: Candidate, questions: Question[]): string {
  return questions
    .map(question => `${question.id}=${encodeAttributeValue(expectedValue(candidate, question))}`)
    .join(';')
}

function combinationsOfTwo(count: number): number {
  return count * (count - 1) / 2
}

function auditCategory(category: Category, candidates: Candidate[], questions: Question[]): CategorySignatureAudit {
  const groupsBySignature = new Map<string, Candidate[]>()
  for (const candidate of candidates) {
    const signature = candidateSignature(candidate, questions)
    groupsBySignature.set(signature, [...(groupsBySignature.get(signature) ?? []), candidate])
  }

  const duplicateGroups = [...groupsBySignature.entries()]
    .filter(([, group]) => group.length > 1)
    .map(([signature, group]) => ({
      signature,
      candidates: group.sort((left, right) => left.name.localeCompare(right.name, 'es'))
    }))
    .sort((left, right) =>
      right.candidates.length - left.candidates.length ||
      left.candidates[0].name.localeCompare(right.candidates[0].name, 'es')
    )
  const indistinguishableCandidateCount = duplicateGroups.reduce(
    (total, group) => total + group.candidates.length,
    0
  )
  const indistinguishablePairCount = duplicateGroups.reduce(
    (total, group) => total + combinationsOfTwo(group.candidates.length),
    0
  )

  return {
    category,
    questionCount: questions.length,
    candidateCount: candidates.length,
    duplicateGroups,
    indistinguishableCandidateCount,
    indistinguishablePairCount
  }
}

function markdownCell(value: string | number): string {
  return String(value).replace(/\|/g, '/')
}

function summarizeValues(values: string[]): string {
  if (values.length <= previewLimit) return values.join(', ')
  const visibleValues = values.slice(0, previewLimit).join(', ')
  return `${visibleValues}, ... (+${values.length - previewLimit})`
}

function summaryTable(results: CategorySignatureAudit[]): string {
  return [
    '| Categoría | Candidatos | Preguntas activas | Grupos indistinguibles | Candidatos en grupos | Pares indistinguibles |',
    '| --- | ---: | ---: | ---: | ---: | ---: |',
    ...results.map(result => [
      result.category,
      result.candidateCount,
      result.questionCount,
      result.duplicateGroups.length,
      result.indistinguishableCandidateCount,
      result.indistinguishablePairCount
    ].map(markdownCell).join(' | ')).map(row => `| ${row} |`)
  ].join('\n')
}

function groupTable(result: CategorySignatureAudit): string {
  if (!result.duplicateGroups.length) return 'No hay grupos indistinguibles.'

  return [
    '| Tamaño | Pares | Candidatos | IDs |',
    '| ---: | ---: | --- | --- |',
    ...result.duplicateGroups.map(group => [
      group.candidates.length,
      combinationsOfTwo(group.candidates.length),
      summarizeValues(group.candidates.map(candidate => candidate.name)),
      summarizeValues(group.candidates.map(candidate => candidate.id))
    ].map(markdownCell).join(' | ')).map(row => `| ${row} |`)
  ].join('\n')
}

async function main(): Promise<void> {
  const results: CategorySignatureAudit[] = []
  for (const category of categories) {
    const knowledge = await loadCategoryKnowledge(category)
    results.push(auditCategory(category, knowledge.candidates, knowledge.questions))
  }

  const totalGroups = results.reduce((total, result) => total + result.duplicateGroups.length, 0)
  const totalPairs = results.reduce((total, result) => total + result.indistinguishablePairCount, 0)
  const content = [
    '# Auditoría de firmas indistinguibles',
    '',
    `Generado con \`npm run audit:signatures\` el ${new Date().toISOString()}.`,
    '',
    'La firma compara, para cada candidato, las respuestas esperadas a todas las preguntas activas de su categoría. Dos candidatos en el mismo grupo son indistinguibles con el cuestionario actual.',
    '',
    `Las tablas muestran hasta ${previewLimit} candidatos e IDs por grupo; los totales de tamaño y pares se calculan con el grupo completo.`,
    '',
    '## Resumen',
    '',
    summaryTable(results),
    '',
    '## Grupos por categoría',
    '',
    ...results.flatMap(result => [
      `### ${result.category}`,
      '',
      groupTable(result),
      ''
    ])
  ].join('\n')

  await writeFile(outputPath, `${content}\n`, 'utf8')
  console.log(`Audit written to ${outputPath}`)
  console.log(`Indistinguishable groups: ${totalGroups}`)
  console.log(`Indistinguishable pairs: ${totalPairs}`)
  for (const result of results) {
    console.log(`${result.category}: ${result.duplicateGroups.length} groups, ${result.indistinguishablePairCount} pairs`)
  }
}

await main()
