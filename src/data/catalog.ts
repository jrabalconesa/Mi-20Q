import { compareCandidateNames } from '../engine/nameComparison'
import type { Candidate, Category, GameKnowledge, Question } from '../types/game'
import { questions } from './questions'

const categoryLoaders: Record<Category, () => Promise<Candidate[]>> = {
  animal: async () => {
    const [core, generated] = await Promise.all([import('./core/animal'), import('./generated/animal')])
    return [...core.coreCandidates, ...generated.generatedCandidates]
  },
  object: async () => {
    const [core, generated] = await Promise.all([import('./core/object'), import('./generated/object')])
    return [...core.coreCandidates, ...generated.generatedCandidates]
  },
  place: async () => {
    const [core, generated] = await Promise.all([import('./core/place'), import('./generated/place')])
    return [...core.coreCandidates, ...generated.generatedCandidates]
  },
  person: async () => {
    const [core, generated] = await Promise.all([import('./core/person'), import('./generated/person')])
    return [...core.coreCandidates, ...generated.generatedCandidates]
  }
}

function normalizedName(candidate: Candidate): string {
  return candidate.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es')
}

function uniqueCandidates(candidates: Candidate[]): Candidate[] {
  const seen = new Set<string>()
  return candidates.filter(candidate => {
    const normalized = normalizedName(candidate)
    if (seen.has(normalized)) return false
    seen.add(normalized)
    return true
  })
}

export function createAlphabeticalQuestions(category: Category, candidates: Candidate[]): Question[] {
  return [...candidates]
    .sort((left, right) => compareCandidateNames(left.name, right.name))
    .slice(0, -1)
    .map(candidate => ({
      id: `${category}_name_before_${candidate.id}`,
      text: `Al ordenar alfabéticamente, ¿su nombre va antes de «${candidate.name}» o es «${candidate.name}»?`,
      attribute: '__name_before__',
      categories: [category],
      kind: 'nameBefore',
      pivotName: candidate.name
    }))
}

export async function loadCategoryKnowledge(category: Category): Promise<GameKnowledge> {
  const candidates = uniqueCandidates(await categoryLoaders[category]())
  const categoryQuestions = questions.filter(question => question.categories.includes(category))
  return {
    candidates,
    questions: [...categoryQuestions, ...createAlphabeticalQuestions(category, candidates)]
  }
}

export async function loadAllCandidates(): Promise<Candidate[]> {
  const knowledge = await Promise.all((['animal', 'object', 'place', 'person'] as const).map(loadCategoryKnowledge))
  return knowledge.flatMap(category => category.candidates)
}
