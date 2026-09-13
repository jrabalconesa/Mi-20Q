import type { Category, GameState } from '../types/game'

const categoryOpenings: Record<Category, string> = {
  animal: 'Piensa en cómo es, dónde vive y cómo se desplaza. Empezaré por lo esencial.',
  object: 'Piensa para qué sirve, cómo se usa y de qué está hecho. Empezaré por lo esencial.',
  place: 'Piensa dónde está y qué tipo de lugar es. Empezaré por lo esencial.',
  person: 'Piensa en su época, su origen y por qué es conocido. Empezaré por lo esencial.'
}

const progressMessages = new Map<number, string>([
  [6, 'Creo que empiezo a verlo…'],
  [11, 'Sé bastante más. Voy a separar las posibilidades que quedan…'],
  [16, 'Ya quedan pocas opciones. Necesito afinar un poco más…']
])

export function playingInteractionMessage(state: GameState): string | null {
  const nextQuestionNumber = state.questionCount + 1
  if (nextQuestionNumber === 1) return categoryOpenings[state.category]
  if (state.lastRejectedGuessAt === state.questionCount) {
    return 'Esa opción no era. Volveré a intentarlo con otra pregunta…'
  }
  return progressMessages.get(nextQuestionNumber) ?? null
}

export function guessingInteractionMessage(state: GameState): string {
  return state.excludedCandidateIds.length === 0
    ? 'Estoy pensando… Creo que ya lo tengo.'
    : 'He descartado mi respuesta anterior. Voy a probar de nuevo…'
}

export function outcomeInteractionMessage(state: GameState): string {
  return state.status === 'won'
    ? '¡Te he leído la mente! ¿Volvemos a intentarlo?'
    : '¡Has ganado! Esta vez has tenido suerte. ¿Volvemos a intentarlo?'
}
