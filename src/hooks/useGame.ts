import { useCallback, useMemo, useState } from 'react'
import type { Answer, Category, GameKnowledge, GameState } from '../types/game'
import { loadCategoryKnowledge } from '../data/catalog'
import { answerCurrentQuestion, canUndoLastAnswer, createGame, resolveGuess, undoLastAnswer } from '../engine/gameEngine'
import { applyExperience, readExperience, reinforceCandidate, writeExperience } from '../experience'
import { buildKnowledge, createLearningRecord, readLearning, writeLearning } from '../learning'
import { addGameResult, readStats, writeStats } from '../stats'

export function useGame() {
  const [state, setState] = useState<GameState | null>(null)
  const [stats, setStats] = useState(readStats)
  const [learning, setLearning] = useState(readLearning)
  const [experience, setExperience] = useState(readExperience)
  const [baseKnowledge, setBaseKnowledge] = useState<GameKnowledge | null>(null)
  const [loading, setLoading] = useState(false)
  const knowledge = useMemo(
    () => applyExperience(
      buildKnowledge(learning, baseKnowledge ?? { candidates: [], questions: [] }),
      experience
    ),
    [learning, experience, baseKnowledge]
  )

  const start = useCallback(async (category: Category) => {
    setLoading(true)
    try {
      const base = await loadCategoryKnowledge(category)
      const nextKnowledge = applyExperience(buildKnowledge(learning, base), experience)
      setBaseKnowledge(base)
      setState(createGame(category, nextKnowledge))
    } finally {
      setLoading(false)
    }
  }, [learning, experience])

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

  const learn = useCallback((name: string, question: string, learnedAnswer: boolean) => {
    if (!state || state.status !== 'lost') return
    const record = createLearningRecord(state, name, question, learnedAnswer, new Date().toISOString(), knowledge.questions)
    setLearning(current => {
      const next = [record, ...current.filter(item => item.id !== record.id)]
      writeLearning(next)
      return next
    })
  }, [state, knowledge.questions])

  const undo = useCallback(() => setState(current => {
    if (!current || !canUndoLastAnswer(current)) return current
    return undoLastAnswer(current, knowledge)
  }), [knowledge])

  return useMemo(() => ({
    state,
    stats,
    knowledge,
    loading,
    learnedCount: learning.length,
    experienceCount: experience.length,
    learning,
    experience,
    canUndo: state ? canUndoLastAnswer(state) : false,
    start,
    answer: (answer: Answer) => setState(current => current ? answerCurrentQuestion(current, answer, knowledge) : current),
    resolve,
    learn,
    undo,
    reset: () => setState(null)
  }), [state, stats, knowledge, loading, learning, experience, start, resolve, learn, undo])
}
