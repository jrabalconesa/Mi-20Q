export interface GameSummary {
  won: boolean
  questionCount: number
  playedAt: string
}

export interface GameStats {
  games: number
  wins: number
  averageQuestions: number
  recentGames: GameSummary[]
}

const STORAGE_KEY = '20q:stats'
const emptyStats: GameStats = { games: 0, wins: 0, averageQuestions: 0, recentGames: [] }

export function readStats(storage: Pick<Storage, 'getItem'> = localStorage): GameStats {
  try {
    const value: unknown = JSON.parse(storage.getItem(STORAGE_KEY) ?? 'null')
    if (!value || typeof value !== 'object') return emptyStats
    const stats = value as Partial<GameStats>
    if (!Number.isFinite(stats.games) || !Number.isFinite(stats.wins) || !Array.isArray(stats.recentGames)) {
      return emptyStats
    }
    return {
      games: stats.games ?? 0,
      wins: stats.wins ?? 0,
      averageQuestions: Number.isFinite(stats.averageQuestions) ? stats.averageQuestions ?? 0 : 0,
      recentGames: stats.recentGames.slice(0, 10)
    }
  } catch {
    return emptyStats
  }
}

export function addGameResult(
  current: GameStats,
  won: boolean,
  questionCount: number,
  playedAt = new Date().toISOString()
): GameStats {
  const games = current.games + 1
  const totalQuestions = current.averageQuestions * current.games + questionCount
  return {
    games,
    wins: current.wins + Number(won),
    averageQuestions: totalQuestions / games,
    recentGames: [{ won, questionCount, playedAt }, ...current.recentGames].slice(0, 10)
  }
}

export function writeStats(stats: GameStats, storage: Pick<Storage, 'setItem'> = localStorage): void {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(stats))
  } catch {
    // El juego sigue funcionando si el navegador bloquea el almacenamiento.
  }
}
