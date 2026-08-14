import { questions as builtInQuestions } from './data/questions'
import { SMOOTHED_NO, SMOOTHED_SOMETIMES, SMOOTHED_YES } from './engine/scoring'
import type { Answer, Candidate, GameKnowledge, GameState, LearningRecord, Question } from './types/game'

const STORAGE_KEY = '20q:learning:v1'

function isLearningRecord(value: unknown): value is LearningRecord {
  if (!value || typeof value !== 'object') return false
  const record = value as Partial<LearningRecord>
  return typeof record.id === 'string'
    && typeof record.name === 'string'
    && ['animal', 'object', 'place', 'person'].includes(record.category ?? '')
    && Boolean(record.attributes && typeof record.attributes === 'object')
    && typeof record.distinguishingQuestion === 'string'
    && typeof record.learnedAnswer === 'boolean'
    && typeof record.guessedCandidateId === 'string'
}

function sanitizeQuestion(text: string): string {
  return text.trim().replace(/\s*\)+\s*\?*$/, '?').replace(/\?*$/, '?')
}

function normalizedText(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es')
}

function isCoveredByBuiltInQuestion(record: LearningRecord): boolean {
  const question = normalizedText(record.distinguishingQuestion)
  return record.category === 'animal' && (
    question.includes('cornamenta') ||
    question.includes('cuerno') ||
    question.includes('asta')
  )
}

export function readLearning(storage: Pick<Storage, 'getItem'> = localStorage): LearningRecord[] {
  try {
    const parsed: unknown = JSON.parse(storage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed)
      ? parsed.filter(isLearningRecord).slice(0, 250).map(record => ({
        ...record,
        distinguishingQuestion: sanitizeQuestion(record.distinguishingQuestion)
      }))
      : []
  } catch {
    return []
  }
}

export function writeLearning(records: LearningRecord[], storage: Pick<Storage, 'setItem'> = localStorage): void {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(records.slice(0, 250)))
  } catch {
    // El aprendizaje es opcional si el navegador bloquea el almacenamiento.
  }
}

export function clearLearning(storage: Pick<Storage, 'removeItem'> = localStorage): void {
  try {
    storage.removeItem(STORAGE_KEY)
  } catch {
    // La limpieza es opcional si el navegador bloquea el almacenamiento.
  }
}

function answerToAttribute(answer: Answer): number | boolean | undefined {
  if (answer === 'yes') return SMOOTHED_YES
  if (answer === 'no') return SMOOTHED_NO
  if (answer === 'sometimes') return SMOOTHED_SOMETIMES
  return undefined
}

export function createLearningRecord(
  state: GameState,
  name: string,
  distinguishingQuestion: string,
  learnedAnswer: boolean,
  now = new Date().toISOString(),
  availableQuestions: Question[] = builtInQuestions
): LearningRecord {
  const attributes: Record<string, number | boolean> = {}
  for (const [questionId, answer] of Object.entries(state.answers)) {
    const question = availableQuestions.find(item => item.id === questionId)
    const value = answerToAttribute(answer)
    if (question && value !== undefined) attributes[question.attribute] = value
  }

  const normalized = name.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es')
  return {
    id: `learned-${state.category}-${normalized.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || Date.now()}`,
    name: name.trim(),
    category: state.category,
    attributes,
    distinguishingQuestion: sanitizeQuestion(distinguishingQuestion),
    learnedAnswer,
    guessedCandidateId: state.guessCandidateId ?? '',
    createdAt: now
  }
}

export function buildKnowledge(
  records: LearningRecord[],
  base: GameKnowledge = { candidates: [], questions: builtInQuestions }
): GameKnowledge {
  const candidatesById = new Map<string, Candidate>(base.candidates.map(candidate => [
    candidate.id,
    { ...candidate, attributes: { ...candidate.attributes } }
  ]))
  const customQuestions = []
  const categories = new Set(base.candidates.map(candidate => candidate.category))

  for (const record of records) {
    if (!categories.has(record.category)) continue
    const attribute = `learned:${record.id}`
    const isCovered = isCoveredByBuiltInQuestion(record)
    const existing = candidatesById.get(record.id)
    candidatesById.set(record.id, {
      id: record.id,
      name: record.name,
      category: record.category,
      attributes: {
        ...existing?.attributes,
        ...record.attributes,
        ...(isCovered ? {} : { [attribute]: record.learnedAnswer })
      }
    })
    const guessed = candidatesById.get(record.guessedCandidateId)
    if (isCovered) continue
    if (guessed) guessed.attributes[attribute] = !record.learnedAnswer
    customQuestions.push({
      id: `question:${record.id}`,
      text: sanitizeQuestion(record.distinguishingQuestion),
      attribute,
      categories: [record.category],
      phase: 'closing' as const
    })
  }

  return { candidates: [...candidatesById.values()], questions: [...base.questions, ...customQuestions] }
}
