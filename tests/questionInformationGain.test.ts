import { describe, expect, it } from 'vitest'
import { calculateQuestionInformationGain, rankAvailableQuestions } from '../src/engine/questionRanking'
import type { Question, RankedCandidate } from '../src/types/game'

const splitQuestion: Question = {
  id: 'is_red',
  text: '¿Es rojo?',
  attribute: 'red',
  categories: ['object']
}

const commonQuestion: Question = {
  id: 'is_tangible',
  text: '¿Es tangible?',
  attribute: 'tangible',
  categories: ['object']
}

const rareQuestion: Question = {
  id: 'is_fragile',
  text: '¿Es frágil?',
  attribute: 'fragile',
  categories: ['object']
}

const absoluteCommonQuestion: Question = {
  ...commonQuestion,
  id: 'is_tangible_absolute',
  phase: 'absolute'
}

const activeCandidates: RankedCandidate[] = [
  {
    id: 'red_ball',
    name: 'Balón rojo',
    category: 'object',
    score: 0.25,
    attributes: { red: true, tangible: true, fragile: true }
  },
  {
    id: 'red_cup',
    name: 'Taza roja',
    category: 'object',
    score: 0.25,
    attributes: { red: true, tangible: true, fragile: false }
  },
  {
    id: 'blue_book',
    name: 'Libro azul',
    category: 'object',
    score: 0.25,
    attributes: { red: false, tangible: true, fragile: false }
  },
  {
    id: 'blue_box',
    name: 'Caja azul',
    category: 'object',
    score: 0.25,
    attributes: { red: false, tangible: true, fragile: false }
  }
]

function rareSplitCandidates(count: number): RankedCandidate[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `object-${index}`,
    name: `Objeto ${index}`,
    category: 'object',
    score: 1 / count,
    attributes: { rare: index === 0 }
  }))
}

function lowCoverageCandidates(): RankedCandidate[] {
  return Array.from({ length: 10 }, (_, index) => {
    const attributes: RankedCandidate['attributes'] = index < 2 ? { lowCoverage: index === 0 } : {}
    return {
      id: `coverage-object-${index}`,
      name: `Objeto con cobertura ${index}`,
      category: 'object',
      score: 0.1,
      attributes
    }
  })
}

function partialCoverageCandidates(): RankedCandidate[] {
  return Array.from({ length: 10 }, (_, index) => {
    const attributes: RankedCandidate['attributes'] = index < 4 ? { partialCoverage: index < 2 } : {}
    return {
      id: `partial-coverage-object-${index}`,
      name: `Objeto con cobertura parcial ${index}`,
      category: 'object',
      score: 0.1,
      attributes
    }
  })
}

describe('calculateQuestionInformationGain', () => {
  it('calcula alta ganancia para una pregunta que divide el subconjunto activo', () => {
    const metrics = calculateQuestionInformationGain(splitQuestion, activeCandidates)

    expect(metrics.currentEntropy).toBeCloseTo(2)
    expect(metrics.realCoverage).toBe(1)
    expect(metrics.yesProbability).toBeCloseTo(0.5)
    expect(metrics.noProbability).toBeCloseTo(0.5)
    expect(metrics.informationGain).toBeGreaterThan(0.8)
  })

  it('devuelve ganancia cero cuando la pregunta no discrimina candidatos activos', () => {
    const metrics = calculateQuestionInformationGain(commonQuestion, activeCandidates)

    expect(metrics.informationGain).toBeCloseTo(0)
    expect(metrics.expectedEntropy).toBeCloseTo(metrics.currentEntropy)
  })

  it('ordena las preguntas disponibles por ganancia de informacion ponderada', () => {
    const ranked = rankAvailableQuestions(
      [commonQuestion, rareQuestion, splitQuestion],
      activeCandidates,
      ['is_fragile'],
      { is_fragile: 'no' }
    )

    expect(ranked[0].question.id).toBe('is_red')
    expect(ranked.map(score => score.question.id)).not.toContain('is_fragile')
    expect(ranked[0].informationGain).toBeGreaterThan(0.8)
  })

  it('descarta preguntas absolutas sin ganancia de informacion suficiente', () => {
    const ranked = rankAvailableQuestions(
      [absoluteCommonQuestion, splitQuestion],
      activeCandidates,
      [],
      {}
    )

    expect(ranked.map(score => score.question.id)).toEqual(['is_red'])
  })

  it('descarta preguntas que discriminan menos del 5% de candidatos activos', () => {
    const rareHighImportanceQuestion: Question = {
      id: 'rare_high_importance',
      text: '¿Tiene un rasgo extremadamente raro?',
      attribute: 'rare',
      categories: ['object'],
      importance: 100
    }

    const ranked = rankAvailableQuestions([rareHighImportanceQuestion], rareSplitCandidates(100), [], {})

    expect(ranked).toEqual([])
  })

  it('no calcula ganancia para atributos con cobertura menor al 30%', () => {
    const lowCoverageQuestion: Question = {
      id: 'low_coverage',
      text: '¿Tiene un atributo con pocos datos?',
      attribute: 'lowCoverage',
      categories: ['object']
    }

    const metrics = calculateQuestionInformationGain(lowCoverageQuestion, lowCoverageCandidates())
    const ranked = rankAvailableQuestions([lowCoverageQuestion], lowCoverageCandidates(), [], {})

    expect(metrics.knownMass).toBeCloseTo(0.2)
    expect(metrics.realCoverage).toBeCloseTo(0.2)
    expect(metrics.informationGain).toBe(0)
    expect(metrics.expectedEntropy).toBeCloseTo(metrics.currentEntropy)
    expect(ranked).toEqual([])
  })

  it('multiplica la ganancia de informacion por la cobertura real del atributo', () => {
    const partialCoverageQuestion: Question = {
      id: 'partial_coverage',
      text: '¿Tiene un atributo con muchos datos faltantes?',
      attribute: 'partialCoverage',
      categories: ['object']
    }

    const fullCoverageQuestion: Question = {
      id: 'full_coverage',
      text: '¿Tiene un atributo completo?',
      attribute: 'fullCoverage',
      categories: ['object']
    }

    const fullCoverageCandidates = partialCoverageCandidates().map(candidate => ({
      ...candidate,
      attributes: { fullCoverage: Number(candidate.id.split('-').at(-1)) < 5 }
    }))
    const partialMetrics = calculateQuestionInformationGain(partialCoverageQuestion, partialCoverageCandidates())
    const fullMetrics = calculateQuestionInformationGain(fullCoverageQuestion, fullCoverageCandidates)

    expect(partialMetrics.realCoverage).toBeCloseTo(0.4)
    expect(partialMetrics.knownMass).toBeCloseTo(0.4)
    expect(partialMetrics.informationGain).toBeGreaterThan(0)
    expect(partialMetrics.informationGain).toBeLessThan(fullMetrics.informationGain * 0.25)
  })
})
