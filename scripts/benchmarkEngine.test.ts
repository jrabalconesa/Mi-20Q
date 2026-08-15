import { writeFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { loadCategoryKnowledge } from '../src/data/catalog'
import { answerCurrentQuestion, createGame, getCandidateName, getQuestion, resolveGuess } from '../src/engine/gameEngine'
import { expectedValue } from '../src/engine/scoring'
import type { Answer, AttributeValue, Candidate, Category, GameKnowledge, GameState } from '../src/types/game'

const categories: Category[] = ['animal', 'object', 'place', 'person']
const benchmarkSize = 50
const certaintyThreshold = 0.9
const reportPath = 'BENCHMARK_ENGINE_REPORT.md'

interface BenchmarkCase {
  category: Category
  candidateId: string
  candidateName: string
  status: GameState['status']
  questionCount: number
  totalTurns: number
  successBeforeQuestion20: boolean
  requiresMoreThan20Turns: boolean
  certaintyQuestion: number | null
  finalGuess: string | null
  wrongGuesses: string[]
  askedQuestions: string[]
}

function seededRandom(seed: number): () => number {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 0x100000000
  }
}

function shuffled<T>(items: T[], random: () => number): T[] {
  const result = [...items]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    const current = result[index]
    result[index] = result[swapIndex]
    result[swapIndex] = current
  }
  return result
}

function answerForAttributeValue(value: AttributeValue | undefined): Answer {
  if (value === true) return 'yes'
  if (value === false) return 'no'
  if (value === undefined) return 'unknown'
  if (value >= 0.75) return 'yes'
  if (value <= 0.25) return 'no'
  return 'sometimes'
}

function answerForTarget(target: Candidate, state: GameState, knowledge: GameKnowledge): Answer {
  const question = getQuestion(state.currentQuestionId, knowledge)
  const value = question ? expectedValue(target, question) : undefined
  return answerForAttributeValue(value)
}

function leaderScore(state: GameState): number {
  return state.rankedCandidates[0]?.score ?? 0
}

function simulateTarget(category: Category, target: Candidate, knowledge: GameKnowledge): BenchmarkCase {
  let state = createGame(category, knowledge)
  const askedQuestions: string[] = []
  const wrongGuesses: string[] = []
  let totalTurns = 0
  let certaintyQuestion: number | null = leaderScore(state) > certaintyThreshold ? 0 : null

  while (state.status === 'playing' && totalTurns < 20) {
    const question = getQuestion(state.currentQuestionId, knowledge)
    if (!question) break

    askedQuestions.push(question.text)
    totalTurns += 1
    state = answerCurrentQuestion(state, answerForTarget(target, state, knowledge), knowledge)
    if (certaintyQuestion === null && leaderScore(state) > certaintyThreshold) {
      certaintyQuestion = state.questionCount
    }
  }

  while (state.status === 'guessing' && totalTurns < 20) {
    const guessedName = getCandidateName(state.guessCandidateId, knowledge)
    const correct = state.guessCandidateId === target.id
    totalTurns += 1
    if (correct) {
      state = resolveGuess(state, true, knowledge)
      break
    }

    if (guessedName) wrongGuesses.push(guessedName)
    state = resolveGuess(state, false, knowledge)

    while (state.status === 'playing' && totalTurns < 20) {
      const question = getQuestion(state.currentQuestionId, knowledge)
      if (!question) break

      askedQuestions.push(question.text)
      totalTurns += 1
      state = answerCurrentQuestion(state, answerForTarget(target, state, knowledge), knowledge)
      if (certaintyQuestion === null && leaderScore(state) > certaintyThreshold) {
        certaintyQuestion = state.questionCount
      }
    }
  }

  return {
    category,
    candidateId: target.id,
    candidateName: target.name,
    status: state.status,
    questionCount: state.questionCount,
    totalTurns,
    successBeforeQuestion20: state.status === 'won' && state.questionCount < 20 && totalTurns <= 20,
    requiresMoreThan20Turns: state.status !== 'won' && totalTurns >= 20,
    certaintyQuestion,
    finalGuess: getCandidateName(state.guessCandidateId, knowledge),
    wrongGuesses,
    askedQuestions
  }
}

async function buildBenchmarkSample(): Promise<Array<{ category: Category; target: Candidate; knowledge: GameKnowledge }>> {
  const random = seededRandom(20260815)
  const basePerCategory = Math.floor(benchmarkSize / categories.length)
  let extra = benchmarkSize % categories.length
  const sample: Array<{ category: Category; target: Candidate; knowledge: GameKnowledge }> = []

  for (const category of categories) {
    const knowledge = await loadCategoryKnowledge(category)
    const count = basePerCategory + (extra > 0 ? 1 : 0)
    extra -= 1
    for (const target of shuffled(knowledge.candidates, random).slice(0, count)) {
      sample.push({ category, target, knowledge })
    }
  }

  return shuffled(sample, random)
}

function average(values: number[]): number {
  if (!values.length) return Number.NaN
  return values.reduce((total, value) => total + value, 0) / values.length
}

function markdownCell(value: string | number): string {
  return String(value).replace(/\|/g, '/')
}

function buildBenchmarkReport(
  results: BenchmarkCase[],
  successRate: number,
  averageCertaintyQuestion: number,
  certaintyReachedCount: number,
  failingOrSlow: BenchmarkCase[]
): string {
  const summary = [
    '| Métrica | Valor |',
    '| --- | ---: |',
    `| Partidas simuladas | ${results.length} |`,
    `| Éxito antes de la pregunta 20 | ${(successRate * 100).toFixed(1)}% |`,
    `| Promedio de preguntas hasta certeza > 90% | ${Number.isNaN(averageCertaintyQuestion) ? 'sin casos' : averageCertaintyQuestion.toFixed(2)} |`,
    `| Casos que alcanzan certeza > 90% | ${certaintyReachedCount} |`,
    `| Candidatos fallidos o que requieren más de 20 turnos | ${failingOrSlow.length} |`
  ].join('\n')

  const failingRows = failingOrSlow.length
    ? [
        '| Categoría | Candidato | Estado | Preguntas | Turnos | Certeza >90% en pregunta | Suposición final | Fallos previos |',
        '| --- | --- | --- | ---: | ---: | --- | --- | --- |',
        ...failingOrSlow.map(result => [
          result.category,
          result.candidateName,
          result.status,
          result.questionCount,
          result.totalTurns,
          result.certaintyQuestion ?? 'no alcanzada',
          result.finalGuess ?? '',
          result.wrongGuesses.length > 5
            ? `${result.wrongGuesses.slice(0, 5).join(', ')}... (+${result.wrongGuesses.length - 5})`
            : result.wrongGuesses.join(', ')
        ].map(markdownCell).join(' | ')).map(row => `| ${row} |`)
      ].join('\n')
    : 'No hay candidatos fallidos ni casos que requieran más de 20 turnos.'

  return [
    '# Benchmark del motor 20Q',
    '',
    `Generado por \`npm run test -- scripts/benchmarkEngine.test.ts\` el ${new Date().toISOString()}.`,
    '',
    'La muestra usa una semilla fija para escoger 50 candidatos repartidos entre animal, objeto, lugar y persona. Cada partida responde con los atributos reales del candidato objetivo y se corta en 20 turnos de interacción.',
    '',
    '## Resumen',
    '',
    summary,
    '',
    '## Candidatos fallidos o lentos',
    '',
    failingRows,
    ''
  ].join('\n')
}

describe('benchmarkEngine', () => {
  it('responde con la verdad exacta del atributo objetivo', () => {
    expect(answerForAttributeValue(true)).toBe('yes')
    expect(answerForAttributeValue(false)).toBe('no')
    expect(answerForAttributeValue(undefined)).toBe('unknown')
    expect(answerForAttributeValue(0.9)).toBe('yes')
    expect(answerForAttributeValue(0.75)).toBe('yes')
    expect(answerForAttributeValue(0.5)).toBe('sometimes')
    expect(answerForAttributeValue(0.25)).toBe('no')
    expect(answerForAttributeValue(0.1)).toBe('no')
  })

  it('simula 50 partidas aleatorias y reporta exito y certeza', async () => {
    const sample = await buildBenchmarkSample()
    const results = sample.map(({ category, target, knowledge }) => simulateTarget(category, target, knowledge))
    const successesBefore20 = results.filter(result => result.successBeforeQuestion20)
    const certaintyReached = results.filter(result => result.certaintyQuestion !== null)
    const failingOrSlow = results.filter(result => result.status !== 'won' || result.requiresMoreThan20Turns)

    const successRate = successesBefore20.length / results.length
    const averageCertaintyQuestion = average(certaintyReached.map(result => result.certaintyQuestion ?? 0))

    console.log('\nBenchmark motor 20Q')
    console.table([{
      partidas: results.length,
      porcentajeExitoAntesDe20: `${(successRate * 100).toFixed(1)}%`,
      promedioPreguntasHastaCerteza90: Number.isNaN(averageCertaintyQuestion)
        ? 'sin casos'
        : averageCertaintyQuestion.toFixed(2),
      casosConCerteza90: certaintyReached.length,
      candidatosFallidosOLentos: failingOrSlow.length
    }])

    if (failingOrSlow.length) {
      console.table(failingOrSlow.map(result => ({
        categoria: result.category,
        candidato: result.candidateName,
        estado: result.status,
        preguntas: result.questionCount,
        turnos: result.totalTurns,
        certeza90En: result.certaintyQuestion ?? 'no alcanzada',
        suposicionFinal: result.finalGuess ?? '',
        fallosPrevios: result.wrongGuesses.length > 5
          ? `${result.wrongGuesses.slice(0, 5).join(', ')}... (+${result.wrongGuesses.length - 5})`
          : result.wrongGuesses.join(', ')
      })))
    }

    writeFileSync(
      reportPath,
      buildBenchmarkReport(results, successRate, averageCertaintyQuestion, certaintyReached.length, failingOrSlow),
      'utf8'
    )

    expect(results).toHaveLength(benchmarkSize)
    expect(results.every(result => result.questionCount <= 20)).toBe(true)
    expect(results.every(result => result.totalTurns <= 20)).toBe(true)
  }, 120_000)
})
