import { getQuestion } from '../engine/gameEngine'
import type { Answer, GameKnowledge, GameState } from '../types/game'

const answerLabels: Record<Answer, string> = {
  yes: 'Sí',
  no: 'No',
  sometimes: 'A veces',
  unknown: 'No lo sé'
}

interface QuestionHistoryProps {
  state: GameState
  knowledge: GameKnowledge
  canUndo: boolean
  onUndo: () => void
}

export function QuestionHistory({ state, knowledge, canUndo, onUndo }: QuestionHistoryProps) {
  if (!state.askedQuestionIds.length) return null

  return (
    <section aria-label="Historial de preguntas" className="question-history">
      <div className="question-history-header">
        <h3>Preguntas anteriores</h3>
        {canUndo && (
          <button className="link-button" onClick={onUndo} type="button">
            Deshacer última
          </button>
        )}
      </div>
      <ol className="question-history-list">
        {state.askedQuestionIds.map((questionId, index) => {
          const question = getQuestion(questionId, knowledge)
          const answer = state.answers[questionId]
          if (!question || !answer) return null
          return (
            <li key={questionId}>
              <span className="question-history-index">{index + 1}.</span>
              <span className="question-history-text">{question.text}</span>
              <span className={`question-history-answer answer-${answer}`}>{answerLabels[answer]}</span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
