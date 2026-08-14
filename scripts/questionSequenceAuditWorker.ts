import { writeFile } from 'node:fs/promises'
import { loadCategoryKnowledge } from '../src/data/catalog'
import { answerCurrentQuestion, createGame, getCandidateName, getQuestion, resolveGuess } from '../src/engine/gameEngine'
import { expectedValue } from '../src/engine/scoring'
import type { Answer, Candidate, Category, GameKnowledge, GameState } from '../src/types/game'

const outputPath = 'QUESTION_SEQUENCE_AUDIT.md'

const sampleTargets: Record<Category, string[]> = {
  animal: ['Toro', 'Tigre', 'Tiburón', 'Delfín', 'Abeja', 'Águila', 'Lobo', 'Cabra', 'Pato', 'Pulpo'],
  object: ['Cuchara', 'Teléfono móvil', 'Silla', 'Coche', 'Libro', 'Guitarra', 'Lámpara', 'Llave', 'Botella', 'Balón', 'Mochila'],
  place: ['París', 'Murcia', 'Cartagena (España)', 'Madrid', 'Barcelona', 'Sevilla', 'Valencia', 'Zaragoza', 'Bilbao', 'Las Palmas de Gran Canaria', 'Santa Cruz de Tenerife', 'Ceuta', 'Melilla', 'Islas Canarias', 'Islas Baleares', 'Río Amazonas', 'Río Nilo', 'Monte Everest', 'Gran Cañón', 'Taj Mahal'],
  person: ['Mahatma Gandhi', 'Pedro Sánchez', 'Don Quijote de la Mancha', 'Fernando Alonso', 'Rosalía', 'Julio César', 'Elon Musk', 'Hipatia de Alejandría', 'Zeus', 'Poseidón', 'Afrodita', 'Hércules', 'Ulises', 'Cupido', 'Ares', 'Marte', 'Minotauro', 'Atenea', 'Medusa', 'Perseo', 'Orión', 'Casiopea', 'Centauro', 'Sherlock Holmes', 'Harry Potter', 'Mafalda']
}

interface AskedStep {
  index: number
  question: string
  answer: Answer
}

interface GuessStep {
  afterQuestion: number
  guess: string
  correct: boolean
}

interface AuditResult {
  category: Category
  targetName: string
  status: GameState['status']
  questionCount: number
  finalGuess: string | null
  asked: AskedStep[]
  guesses: GuessStep[]
  issues: string[]
}

function answerForTarget(target: Candidate, state: GameState, knowledge: GameKnowledge): Answer {
  const question = getQuestion(state.currentQuestionId, knowledge)
  const value = question ? expectedValue(target, question) : undefined
  if (value === true) return 'yes'
  if (value === false) return 'no'
  if (value === 0.5) return 'sometimes'
  return 'unknown'
}

function auditTarget(category: Category, target: Candidate, knowledge: GameKnowledge): AuditResult {
  let state = createGame(category, knowledge)
  const asked: AskedStep[] = []
  const guesses: GuessStep[] = []
  const issues: string[] = []

  while (state.status === 'playing') {
    const question = getQuestion(state.currentQuestionId, knowledge)
    if (!question) {
      issues.push('No hay pregunta activa durante la fase de preguntas.')
      break
    }

    const answer = answerForTarget(target, state, knowledge)
    asked.push({ index: state.questionCount + 1, question: question.text, answer })
    state = answerCurrentQuestion(state, answer, knowledge)
  }

  while (state.status === 'guessing') {
    const guess = getCandidateName(state.guessCandidateId, knowledge) ?? '(sin candidato)'
    const correct = state.guessCandidateId === target.id
    guesses.push({ afterQuestion: state.questionCount, guess, correct })
    if (correct) {
      state = resolveGuess(state, true, knowledge)
      break
    }
    if (state.questionCount < 20) {
      state = resolveGuess(state, false, knowledge)
      if (state.status === 'lost') issues.push(`Cierra antes de 20 preguntas tras fallar con "${guess}".`)
      while (state.status === 'playing') {
        const question = getQuestion(state.currentQuestionId, knowledge)
        if (!question) {
          issues.push('No hay pregunta activa durante la fase de preguntas.')
          break
        }
        const answer = answerForTarget(target, state, knowledge)
        asked.push({ index: state.questionCount + 1, question: question.text, answer })
        state = answerCurrentQuestion(state, answer, knowledge)
      }
      continue
    }
    state = resolveGuess(state, false, knowledge)
  }

  const finalGuess = guesses.at(-1)?.guess ?? null
  if (state.status === 'lost') issues.push('No llega al candidato correcto.')
  if (guesses.some(guess => !guess.correct)) issues.push('Hace una o más suposiciones incorrectas antes del final.')
  if (asked.length >= 20 && state.status !== 'won') issues.push('Agota las 20 preguntas sin acierto.')

  return {
    category,
    targetName: target.name,
    status: state.status,
    questionCount: state.questionCount,
    finalGuess,
    asked,
    guesses,
    issues
  }
}

function answerLabel(answer: Answer): string {
  const labels: Record<Answer, string> = {
    yes: 'Sí',
    no: 'No',
    sometimes: 'A veces',
    unknown: 'No lo sé'
  }
  return labels[answer]
}

function resultLine(result: AuditResult): string {
  const icon = result.status === 'won' ? 'OK' : 'REVISAR'
  const guesses = result.guesses.length
    ? result.guesses.map(guess => `${guess.guess}${guess.correct ? '' : ' (fallo)'}`).join(', ')
    : 'sin suposición'
  return `| ${result.category} | ${result.targetName} | ${icon} | ${result.questionCount} | ${guesses} | ${result.issues.join('; ') || 'Sin incidencias'} |`
}

function resultSection(result: AuditResult): string {
  const asked = result.asked
    .map(step => `${step.index}. ${step.question} -> ${answerLabel(step.answer)}`)
    .join('\n')
  const guesses = result.guesses
    .map(guess => `- Tras ${guess.afterQuestion}: ${guess.guess} ${guess.correct ? '(acierto)' : '(fallo)'}`)
    .join('\n') || '- Sin suposición'

  return [
    `### ${result.category}: ${result.targetName}`,
    '',
    `Estado: ${result.status}. Preguntas: ${result.questionCount}.`,
    '',
    '**Preguntas**',
    asked || 'Sin preguntas.',
    '',
    '**Suposiciones**',
    guesses,
    '',
    `**Incidencias**: ${result.issues.join('; ') || 'Sin incidencias'}.`
  ].join('\n')
}

async function main(): Promise<void> {
  const categories = Object.keys(sampleTargets) as Category[]
  const results: AuditResult[] = []

  for (const category of categories) {
    const knowledge = await loadCategoryKnowledge(category)
    for (const targetName of sampleTargets[category]) {
      const target = knowledge.candidates.find(candidate => candidate.name === targetName)
      if (!target) {
        results.push({
          category,
          targetName,
          status: 'lost',
          questionCount: 0,
          finalGuess: null,
          asked: [],
          guesses: [],
          issues: ['El candidato no existe en el catálogo cargado.']
        })
        continue
      }
      results.push(auditTarget(category, target, knowledge))
    }
  }

  const summary = [
    '| Categoría | Objetivo | Resultado | Preguntas | Suposiciones | Incidencias |',
    '| --- | --- | --- | ---: | --- | --- |',
    ...results.map(resultLine)
  ].join('\n')

  const content = [
    '# Auditoría de secuencias de preguntas',
    '',
    `Generado con \`npm run audit:questions\` el ${new Date().toISOString()}.`,
    '',
    'El informe simula respuestas exactas para candidatos representativos. Si el motor hace una suposición incorrecta antes de 20 preguntas, la simulación responde que no y comprueba que la partida continúe.',
    '',
    '## Resumen',
    '',
    summary,
    '',
    '## Secuencias',
    '',
    results.map(resultSection).join('\n\n')
  ].join('\n')

  await writeFile(outputPath, `${content}\n`, 'utf8')
  console.log(`Audit written to ${outputPath}`)
}

await main()
