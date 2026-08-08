import { AnswerButtons } from './components/AnswerButtons'
import { getCandidateName, getQuestion } from './engine/gameEngine'
import { useGame } from './hooks/useGame'
import type { Category } from './types/game'
import './styles.css'

const categories: Array<{ id: Category; label: string }> = [
  { id: 'animal', label: 'Animales' },
  { id: 'object', label: 'Objetos' },
  { id: 'place', label: 'Lugares' },
  { id: 'person', label: 'Personas' }
]

function App() {
  const game = useGame()
  const state = game.state
  const [selectedCategory, setSelectedCategory] = useState<Category>('animal')

  if (!state) {
    return (
      <main className="shell">
        <section className="card hero">
          <span className="badge">Juego de deducción</span>
          <h1>20Q</h1>
          <p>Piensa en algo. Intentaré adivinarlo haciendo como máximo veinte preguntas.</p>
          <fieldset className="category-picker">
            <legend>¿En qué categoría estás pensando?</legend>
            <div className="category-grid">
            {categories.map(category => (
              <button
                aria-pressed={selectedCategory === category.id}
                className={selectedCategory === category.id ? 'selected' : 'secondary'}
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                type="button"
              >
                {category.label}
              </button>
            ))}
            </div>
          </fieldset>
          <button className="start-button" onClick={() => game.start(selectedCategory)}>Comenzar partida</button>
          {game.stats.games > 0 && (
            <section className="stats" aria-label="Estadísticas de juego">
              <div><strong>{game.stats.games}</strong><span>Partidas</span></div>
              <div><strong>{game.stats.wins}</strong><span>Aciertos</span></div>
              <div><strong>{game.stats.averageQuestions.toFixed(1)}</strong><span>Preguntas de media</span></div>
            </section>
          )}
        </section>
      </main>
    )
  }

  const question = getQuestion(state.currentQuestionId)
  const guess = getCandidateName(state.guessCandidateId)

  return (
    <main className="shell">
      <section className="card">
        <div className="topline">
          <span>{state.status === 'playing' ? `Pregunta ${Math.min(state.questionCount + 1, 20)} de 20` : `${state.questionCount} preguntas`}</span>
          <button className="link-button" onClick={game.reset}>Salir</button>
        </div>

        <div className="progress" aria-hidden="true">
          <div style={{ width: `${Math.min((state.questionCount / 20) * 100, 100)}%` }} />
        </div>

        {state.status === 'playing' && question && (
          <>
            <h2>{question.text}</h2>
            <AnswerButtons onAnswer={game.answer} />
          </>
        )}

        {state.status === 'guessing' && (
          <>
            <p className="eyebrow">Mi respuesta</p>
            <h2>¿Estabas pensando en {guess}?</h2>
            <div className="answer-grid two">
              <button onClick={() => game.resolve(true)}>Sí, acertaste</button>
              <button onClick={() => game.resolve(false)}>No</button>
            </div>
          </>
        )}

        {(state.status === 'won' || state.status === 'lost') && (
          <>
            <p className="eyebrow">{state.status === 'won' ? '¡Acerté!' : 'No lo conseguí'}</p>
            <h2>{state.status === 'won' ? `Era ${guess}.` : 'Necesito seguir aprendiendo.'}</h2>
            <p>He utilizado {state.questionCount} preguntas.</p>
            <button onClick={game.reset}>Jugar otra vez</button>
          </>
        )}

        {state.status === 'playing' && <details>
          <summary>Ver candidatos más probables</summary>
          <ol>
            {state.rankedCandidates.slice(0, 5).map(candidate => (
              <li key={candidate.id}>{candidate.name}: {(candidate.score * 100).toFixed(0)}%</li>
            ))}
          </ol>
        </details>}
      </section>
    </main>
  )
}

export default App
import { useState } from 'react'
