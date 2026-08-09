import { describe, expect, it } from 'vitest'
import { addGameResult, readStats } from '../src/stats'

describe('estadísticas', () => {
  it('acumula partidas, aciertos y la media de preguntas', () => {
    const first = addGameResult({ games: 0, wins: 0, averageQuestions: 0, recentGames: [] }, true, 8, '2026-01-01')
    const second = addGameResult(first, false, 12, '2026-01-02')
    expect(second).toMatchObject({ games: 2, wins: 1, averageQuestions: 10 })
    expect(second.recentGames).toHaveLength(2)
  })

  it('tolera almacenamiento vacío o corrupto', () => {
    expect(readStats({ getItem: () => '{' })).toMatchObject({ games: 0, wins: 0 })
  })
})
