import { useCallback, useMemo, useState } from 'react'
import type { Answer, Category, GameState } from '../types/game'
import { answerCurrentQuestion, createGame, resolveGuess } from '../engine/gameEngine'
import { addGameResult, readStats, writeStats } from '../stats'

export function useGame() {
  const [state, setState] = useState<GameState | null>(null)
  const [stats, setStats] = useState(readStats)

  const resolve = useCallback((correct: boolean) => setState(current => {
    if (!current || current.status !== 'guessing') return current
    const nextStats = addGameResult(stats, correct, current.questionCount)
    writeStats(nextStats)
    setStats(nextStats)
    return resolveGuess(current, correct)
  }), [stats])

  return useMemo(() => ({
    state,
    stats,
    start: (category: Category) => setState(createGame(category)),
    answer: (answer: Answer) => setState(current => current ? answerCurrentQuestion(current, answer) : current),
    resolve,
    reset: () => setState(null)
  }), [state, stats, resolve])
}
