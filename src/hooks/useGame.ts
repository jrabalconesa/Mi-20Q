import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Answer, Category, GameKnowledge, GameState } from '../types/game'
import { loadCategoryKnowledge } from '../data/catalog'
import { answerCurrentQuestion, canUndoLastAnswer, createGame, resolveGuess, undoLastAnswer } from '../engine/gameEngine'
import { applyExperience, readExperience, reinforceCandidate, writeExperience } from '../experience'
import { clearLearning } from '../learning'
import { addGameResult, readStats, writeStats } from '../stats'

export function useGame() {
  const [state, setState] = useState<GameState | null>(null)
  const [stats, setStats] = useState(readStats)
  const [experience, setExperience] = useState(readExperience)
  const [baseKnowledge, setBaseKnowledge] = useState<GameKnowledge | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    clearLearning()
  }, [])

  const knowledge = useMemo(
    () => applyExperience(baseKnowledge ?? { candidates: [], questions: [] }, experience),
    [experience, baseKnowledge]
  )

  const start = useCallback(async (category: Category) => {
    setLoading(true)
    try {
      const base = await loadCategoryKnowledge(category)
      const nextKnowledge = applyExperience(base, experience)
      setBaseKnowledge(base)
      setState(createGame(category, nextKnowledge))
    } finally {
      setLoading(false)
    }
  }, [experience])

  const resolve = useCallback((correct: boolean) => setState(current => {
    if (!current || current.status !== 'guessing') return current
    const next = resolveGuess(current, correct, knowledge)
    if (next.status === 'won') {
      setExperience(currentExperience => {
        const reinforced = reinforceCandidate(currentExperience, next, knowledge)
        writeExperience(reinforced)
        return reinforced
      })
    }
    if (next.status === 'won' || next.status === 'lost') {
      setStats(currentStats => {
        const nextStats = addGameResult(currentStats, next.status === 'won', next.questionCount)
        writeStats(nextStats)
        return nextStats
      })
    }
    return next
  }), [knowledge])

  const undo = useCallback(() => setState(current => {
    if (!current || !canUndoLastAnswer(current)) return current
    return undoLastAnswer(current, knowledge)
  }), [knowledge])

  return useMemo(() => ({
    state,
    stats,
    knowledge,
    loading,
    experienceCount: experience.length,
    experience,
    canUndo: state ? canUndoLastAnswer(state) : false,
    start,
    answer: (answer: Answer) => setState(current => current ? answerCurrentQuestion(current, answer, knowledge) : current),
    resolve,
    undo,
    reset: () => setState(null)
  }), [state, stats, knowledge, loading, experience, start, resolve, undo])
}
