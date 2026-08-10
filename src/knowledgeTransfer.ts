import type { CandidateExperience, LearningRecord } from './types/game'
import { readExperience } from './experience'
import { readLearning } from './learning'
import { APP_VERSION } from './version'

export const KNOWLEDGE_EXPORT_VERSION = 1 as const

export interface KnowledgeExport {
  version: typeof KNOWLEDGE_EXPORT_VERSION
  appVersion: string
  exportedAt: string
  learning: LearningRecord[]
  experience: CandidateExperience[]
}

export type KnowledgeImportResult =
  | { ok: true; learning: LearningRecord[]; experience: CandidateExperience[] }
  | { ok: false; error: string }

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

function isCandidateExperience(value: unknown): value is CandidateExperience {
  if (!value || typeof value !== 'object') return false
  const experience = value as Partial<CandidateExperience>
  return typeof experience.candidateId === 'string'
    && Boolean(experience.attributes && typeof experience.attributes === 'object')
}

export function createKnowledgeExport(
  learning: LearningRecord[],
  experience: CandidateExperience[],
  exportedAt = new Date().toISOString()
): KnowledgeExport {
  return {
    version: KNOWLEDGE_EXPORT_VERSION,
    appVersion: APP_VERSION,
    exportedAt,
    learning: learning.slice(0, 250),
    experience: experience.slice(0, 500)
  }
}

export function serializeKnowledgeExport(data: KnowledgeExport): string {
  return JSON.stringify(data, null, 2)
}

export function parseKnowledgeImport(raw: string): KnowledgeImportResult {
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return { ok: false, error: 'El archivo no contiene JSON válido.' }
  }

  if (!parsed || typeof parsed !== 'object') {
    return { ok: false, error: 'El formato del archivo no es reconocible.' }
  }

  const payload = parsed as Partial<KnowledgeExport>
  if (payload.version !== KNOWLEDGE_EXPORT_VERSION) {
    return { ok: false, error: 'Versión de exportación no compatible.' }
  }

  if (!Array.isArray(payload.learning) || !Array.isArray(payload.experience)) {
    return { ok: false, error: 'Faltan datos de aprendizaje o experiencia.' }
  }

  const learning = payload.learning.filter(isLearningRecord).slice(0, 250)
  const experience = payload.experience.filter(isCandidateExperience).slice(0, 500)

  if (!learning.length && !experience.length) {
    return { ok: false, error: 'El archivo no incluye entradas válidas.' }
  }

  return { ok: true, learning, experience }
}

export function mergeLearningRecords(
  current: LearningRecord[],
  imported: LearningRecord[]
): LearningRecord[] {
  const byId = new Map<string, LearningRecord>()
  for (const record of [...current, ...imported]) byId.set(record.id, record)
  return [...byId.values()].slice(0, 250)
}

export function mergeExperienceRecords(
  current: CandidateExperience[],
  imported: CandidateExperience[]
): CandidateExperience[] {
  const byId = new Map<string, CandidateExperience>()
  for (const record of [...current, ...imported]) byId.set(record.candidateId, record)
  return [...byId.values()].slice(0, 500)
}

export function readStoredKnowledge(storage: Pick<Storage, 'getItem'> = localStorage): KnowledgeExport {
  return createKnowledgeExport(readLearning(storage), readExperience(storage))
}

export function downloadKnowledgeExport(data: KnowledgeExport, filename?: string): void {
  const blob = new Blob([serializeKnowledgeExport(data)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename ?? `20q-conocimiento-${data.exportedAt.slice(0, 10)}.json`
  anchor.click()
  URL.revokeObjectURL(url)
}
