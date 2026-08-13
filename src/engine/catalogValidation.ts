import type { Candidate, Category, Question } from '../types/game'

export interface CatalogIssue {
  category: Category
  code: 'low_count' | 'duplicate_name' | 'low_coverage' | 'sparse_attributes'
  message: string
  details?: string[]
}

export interface CatalogValidationOptions {
  minCandidates?: number
  minCoverage?: number
  minKnownAttributes?: number
}

const defaultOptions: Required<CatalogValidationOptions> = {
  minCandidates: 1_000,
  minCoverage: 0.08,
  minKnownAttributes: 2
}

function normalizedName(name: string): string {
  return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es')
}

function attributeCoverage(candidates: Candidate[], attribute: string): number {
  if (!candidates.length) return 0
  const known = candidates.filter(candidate => candidate.attributes[attribute] !== undefined).length
  return known / candidates.length
}

function averageKnownAttributes(candidates: Candidate[], questionAttributes: string[]): number {
  if (!candidates.length || !questionAttributes.length) return 0
  const total = candidates.reduce((sum, candidate) => {
    const known = questionAttributes.filter(attribute => candidate.attributes[attribute] !== undefined).length
    return sum + known
  }, 0)
  return total / candidates.length
}

export function validateCategoryCatalog(
  category: Category,
  candidates: Candidate[],
  questions: Question[],
  options: CatalogValidationOptions = {}
): CatalogIssue[] {
  const config = { ...defaultOptions, ...options }
  const issues: CatalogIssue[] = []
  const categoryCandidates = candidates.filter(candidate => candidate.category === category)
  const categoryQuestions = questions.filter(question => question.categories.includes(category))

  if (categoryCandidates.length < config.minCandidates) {
    issues.push({
      category,
      code: 'low_count',
      message: `${category}: solo ${categoryCandidates.length} candidatos (mínimo ${config.minCandidates}).`
    })
  }

  const names = categoryCandidates.map(candidate => normalizedName(candidate.name))
  const duplicates = names.filter((name, index) => names.indexOf(name) !== index)
  if (duplicates.length) {
    issues.push({
      category,
      code: 'duplicate_name',
      message: `${category}: nombres duplicados detectados.`,
      details: [...new Set(duplicates)].slice(0, 10)
    })
  }

  const lowCoverage = categoryQuestions
    .filter(question => attributeCoverage(categoryCandidates, question.attribute) < config.minCoverage)
    .map(question => `${question.id} (${Math.round(attributeCoverage(categoryCandidates, question.attribute) * 100)}%)`)

  if (lowCoverage.length) {
    issues.push({
      category,
      code: 'low_coverage',
      message: `${category}: ${lowCoverage.length} preguntas con cobertura inferior al ${Math.round(config.minCoverage * 100)}%.`,
      details: lowCoverage.slice(0, 12)
    })
  }

  const questionAttributes = categoryQuestions.map(question => question.attribute)
  const averageKnown = averageKnownAttributes(categoryCandidates, questionAttributes)
  if (averageKnown < config.minKnownAttributes) {
    issues.push({
      category,
      code: 'sparse_attributes',
      message: `${category}: media de ${averageKnown.toFixed(1)} atributos conocidos por candidato (mínimo ${config.minKnownAttributes}).`
    })
  }

  return issues
}

export function validateCatalog(
  candidates: Candidate[],
  questions: Question[],
  categories: Category[] = ['animal', 'object', 'place', 'person'],
  options?: CatalogValidationOptions
): CatalogIssue[] {
  return categories.flatMap(category => validateCategoryCatalog(category, candidates, questions, options))
}
