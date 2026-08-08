import { useState } from 'react'
import { AnswerButtons } from './components/AnswerButtons'
import { candidates } from './data/candidates'
import { getCandidateName, getQuestion } from './engine/gameEngine'
import { useAppUpdate } from './hooks/useAppUpdate'
import { useGame } from './hooks/useGame'
import type { Category } from './types/game'
import './styles.css'

const categories: Array<{ id: Category; label: string }> = [
  { id: 'animal', label: 'Animales' },
  { id: 'object', label: 'Objetos' },
  { id: 'place', label: 'Lugares' },
  { id: 'person', label: 'Personas' }
]

const APP_VERSION = '0.4.0'
const brandLogoUrl = `${import.meta.env.BASE_URL}brand/20q-logo.png`

function App() {
  const game = useGame()
  const state = game.state
  const [selectedCategory, setSelectedCategory] = useState<Category>('animal')
  const updateAvailable = useAppUpdate()
  const knownCandidates = candidates.filter(candidate => candidate.category === selectedCategory)
  const activeCategoryLabel = categories.find(category => category.id === state?.category)?.label

  const updateNotice = updateAvailable && (
    <aside className="update-notice" role="status">
      <span>Hay una versión nueva disponible.</span>
      <button onClick={() => window.location.reload()}>Actualizar ahora</button>
    </aside>
  )

  if (!state) {
    return (
      <main className="shell">
        {updateNotice}
        <section className="card hero">
          <h1 className="brand-title">
            <img className="hero-logo" src={brandLogoUrl} alt="20Q" />
          </h1>
          <span className="badge">Juego de deducción</span>
          <p className="hero-lead">Piensa en algo. Intentaré adivinarlo haciendo como máximo veinte preguntas.</p>
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
          <p className="knowledge-note">
            Piensa en una de las {knownCandidates.length} opciones que conozco en esta categoría.
          </p>
          <details className="known-candidates" key="known-candidates">
            <summary>Ver las opciones que puedo adivinar</summary>
            <ul>
              {knownCandidates.map(candidate => <li key={candidate.id}>{candidate.name}</li>)}
            </ul>
          </details>
          <button className="start-button" onClick={() => game.start(selectedCategory)}>Comenzar partida</button>
          {game.stats.games > 0 && (
            <section className="stats" aria-label="Estadísticas de juego">
              <div><strong>{game.stats.games}</strong><span>Partidas</span></div>
              <div><strong>{game.stats.wins}</strong><span>Aciertos</span></div>
              <div><strong>{game.stats.averageQuestions.toFixed(1)}</strong><span>Preguntas de media</span></div>
            </section>
          )}
          <small className="version">Versión {APP_VERSION}</small>
        </section>
      </main>
    )
  }

  const question = getQuestion(state.currentQuestionId)
  const guess = getCandidateName(state.guessCandidateId)

  return (
    <main className="shell">
      {updateNotice}
      <section className={`card game-card status-${state.status}`}>
        <header className="game-header">
          <img className="game-logo" src={brandLogoUrl} alt="" aria-hidden="true" />
          <div className="game-meta">
            <div className="topline">
              <span>{activeCategoryLabel} · {state.status === 'playing' ? `Pregunta ${Math.min(state.questionCount + 1, 20)} de 20` : `${state.questionCount} preguntas`}</span>
              <button className="link-button" onClick={game.reset}>Salir</button>
            </div>

            <div className="progress" aria-hidden="true">
              <div style={{ width: `${Math.min((state.questionCount / 20) * 100, 100)}%` }} />
            </div>
          </div>
        </header>

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
            {state.status === 'lost' && <p>Esta versión solo puede adivinar las opciones indicadas al comenzar.</p>}
            <button onClick={game.reset}>Jugar otra vez</button>
          </>
        )}

        {state.status === 'playing' && <details key="ranked-candidates">
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
