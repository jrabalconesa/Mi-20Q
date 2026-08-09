import type { Answer, CandidateExperience, GameKnowledge, GameState } from './types/game'

const STORAGE_KEY = '20q:experience:v1'
const MAX_SAMPLES = 50

function answerValue(answer: Answer): number | undefined {
  if (answer === 'yes') return 1
  if (answer === 'no') return 0
  if (answer === 'sometimes') return 0.5
  return undefined
}

function isExperience(value: unknown): value is CandidateExperience {
  if (!value || typeof value !== 'object') return false
  const experience = value as Partial<CandidateExperience>
  return typeof experience.candidateId === 'string'
    && Boolean(experience.attributes && typeof experience.attributes === 'object')
}

export function readExperience(storage: Pick<Storage, 'getItem'> = localStorage): CandidateExperience[] {
  try {
    const parsed: unknown = JSON.parse(storage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed.filter(isExperience).slice(0, 500) : []
  } catch {
    return []
  }
}

export function writeExperience(
  experiences: CandidateExperience[],
  storage: Pick<Storage, 'setItem'> = localStorage
): void {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(experiences.slice(0, 500)))
  } catch {
    // La adaptación local es opcional si el almacenamiento no está disponible.
  }
}

export function reinforceCandidate(
  experiences: CandidateExperience[],
  state: GameState,
  knowledge: GameKnowledge
): CandidateExperience[] {
  if (!state.guessCandidateId) return experiences
  const current = experiences.find(item => item.candidateId === state.guessCandidateId)
  const attributes = { ...current?.attributes }

  for (const [questionId, answer] of Object.entries(state.answers)) {
    const value = answerValue(answer)
    const question = knowledge.questions.find(item => item.id === questionId)
    if (value === undefined || !question || question.kind === 'nameBefore') continue
    const previous = attributes[question.attribute]
    const samples = Math.min((previous?.samples ?? 0) + 1, MAX_SAMPLES)
    const previousSamples = Math.min(previous?.samples ?? 0, MAX_SAMPLES - 1)
    attributes[question.attribute] = {
      mean: ((previous?.mean ?? 0) * previousSamples + value) / samples,
      samples
    }
  }

  const next = { candidateId: state.guessCandidateId, attributes }
  return [next, ...experiences.filter(item => item.candidateId !== next.candidateId)]
}

export function applyExperience(base: GameKnowledge, experiences: CandidateExperience[]): GameKnowledge {
  const byCandidate = new Map(experiences.map(experience => [experience.candidateId, experience]))
  return {
    ...base,
    candidates: base.candidates.map(candidate => {
      const experience = byCandidate.get(candidate.id)
      if (!experience) return candidate
      const attributes = { ...candidate.attributes }
      for (const [attribute, learned] of Object.entries(experience.attributes)) {
        const prior = attributes[attribute]
        const priorValue = typeof prior === 'boolean' ? Number(prior) : typeof prior === 'number' ? prior : 0.5
        attributes[attribute] = (priorValue * 3 + learned.mean * learned.samples) / (3 + learned.samples)
      }
      return { ...candidate, attributes }
    })
  }
}
