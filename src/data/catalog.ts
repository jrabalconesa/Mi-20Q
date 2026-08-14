import type { Candidate, Category, GameKnowledge } from '../types/game'
import { questions } from './questions'

const categoryLoaders: Record<Category, () => Promise<Candidate[]>> = {
  animal: async () => {
    const [core, generated, knowledge] = await Promise.all([
      import('./core/animal'),
      import('./generated/animal'),
      import('./animalKnowledge')
    ])
    return [...core.coreCandidates, ...generated.generatedCandidates].map(knowledge.enrichAnimalCandidate)
  },
  object: async () => {
    const [core, generated, knowledge] = await Promise.all([
      import('./core/object'),
      import('./generated/object'),
      import('./objectKnowledge')
    ])
    return [...core.coreCandidates, ...generated.generatedCandidates].map(knowledge.enrichObjectCandidate)
  },
  place: async () => {
    const [core, generated, knowledge] = await Promise.all([
      import('./core/place'),
      import('./generated/place'),
      import('./placeKnowledge')
    ])
    return [...core.coreCandidates, ...knowledge.curatedPlaceCandidates, ...generated.generatedCandidates]
      .map(knowledge.enrichPlaceCandidate)
  },
  person: async () => {
    const [core, generated, knowledge] = await Promise.all([
      import('./core/person'),
      import('./generated/person'),
      import('./personKnowledge')
    ])
    return [...core.coreCandidates, ...generated.generatedCandidates].map(knowledge.enrichPersonCandidate)
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

export async function loadCategoryKnowledge(category: Category): Promise<GameKnowledge> {
  const candidates = uniqueCandidates(await categoryLoaders[category]())
  const categoryQuestions = questions.filter(question => question.categories.includes(category))
  return {
    candidates,
    questions: categoryQuestions
  }
}

export async function loadAllCandidates(): Promise<Candidate[]> {
  const knowledge = await Promise.all((['animal', 'object', 'place', 'person'] as const).map(loadCategoryKnowledge))
  return knowledge.flatMap(category => category.candidates)
}
