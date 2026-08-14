import { useState } from 'react'
import { AnswerButtons } from './components/AnswerButtons'
import { HowToPlay } from './components/HowToPlay'
import { QuestionHistory } from './components/QuestionHistory'
import { getCandidateName, getQuestion } from './engine/gameEngine'
import { useAppUpdate } from './hooks/useAppUpdate'
import { useGame } from './hooks/useGame'
import type { Category } from './types/game'
import { APP_VERSION } from './version'
import './styles.css'

const categories: Array<{ id: Category; label: string }> = [
  { id: 'animal', label: 'Animal' },
  { id: 'object', label: 'Objeto' },
  { id: 'place', label: 'Lugar' },
  { id: 'person', label: 'Persona o personaje' }
]

const brandLogoUrl = `${import.meta.env.BASE_URL}brand/20q-logo.png`

function App() {
  const game = useGame()
  const state = game.state
  const [selectedCategory, setSelectedCategory] = useState<Category>('animal')
  const updateAvailable = useAppUpdate()
  const activeCategoryLabel = categories.find(category => category.id === state?.category)?.label

  const startGame = () => {
    game.start(selectedCategory)
  }

  const resetGame = () => {
    game.reset()
  }

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
          <div className="hero-intro">
            <h1 className="brand-title">
              <img className="hero-logo" src={brandLogoUrl} alt="20Q" />
            </h1>
            <div className="hero-copy">
              <span className="badge">Juego de deducción</span>
              <p className="hero-lead">Piensa en un animal, objeto, lugar o persona. Intentaré descubrirlo en veinte preguntas.</p>
            </div>
          </div>
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
          <div className="hero-actions">
            <p className="knowledge-note">Elige la opción más cercana. Después responde con sinceridad, aunque alguna respuesta sea «A veces» o «No lo sé».</p>
            <button className="start-button" disabled={game.loading} onClick={startGame}>
              {game.loading ? 'Preparando preguntas…' : 'Comenzar partida'}
            </button>
            <HowToPlay />
            <small className="version">Versión {APP_VERSION}</small>
          </div>
        </section>
      </main>
    )
  }

  const question = getQuestion(state.currentQuestionId, game.knowledge)
  const guess = getCandidateName(state.guessCandidateId, game.knowledge)

  return (
    <main className="shell">
      {updateNotice}
      <section className={`card game-card status-${state.status}`}>
        <header className="game-header">
          <img className="game-logo" src={brandLogoUrl} alt="" aria-hidden="true" />
          <div className="game-meta">
            <div className="topline">
              <span>{activeCategoryLabel} · {state.status === 'playing' ? `Pregunta ${Math.min(state.questionCount + 1, 20)} de 20` : `${state.questionCount} preguntas`}</span>
              <button className="link-button" onClick={resetGame}>Salir</button>
            </div>

            <div className="progress" aria-hidden="true">
              <div style={{ width: `${Math.min((state.questionCount / 20) * 100, 100)}%` }} />
            </div>
          </div>
        </header>

        {state.status === 'playing' && question && (
          <>
            <QuestionHistory
              canUndo={game.canUndo}
              knowledge={game.knowledge}
              onUndo={game.undo}
              state={state}
            />
            <h2>{question.text}</h2>
            <AnswerButtons onAnswer={game.answer} />
          </>
        )}

        {state.status === 'guessing' && (
          <>
            <QuestionHistory
              canUndo={false}
              knowledge={game.knowledge}
              onUndo={game.undo}
              state={state}
            />
            <p className="eyebrow">Mi respuesta</p>
            <h2>¿Estabas pensando en {guess}?</h2>
            <div className="answer-grid two">
              <button onClick={() => game.resolve(true)}>Sí, acertaste</button>
              <button onClick={() => game.resolve(false)}>{state.questionCount < 20 ? 'No, sigue preguntando' : 'No'}</button>
            </div>
          </>
        )}

        {(state.status === 'won' || state.status === 'lost') && (
          <>
            <p className="eyebrow">{state.status === 'won' ? '¡Acerté!' : 'No lo conseguí'}</p>
            <h2>{state.status === 'won' ? `Era ${guess}.` : 'Esta vez no lo he acertado.'}</h2>
            <p>He utilizado {state.questionCount} preguntas.</p>
            {state.status === 'lost' && <p>La partida queda registrada en las estadísticas locales, pero ya no guardo preguntas manuales en el navegador.</p>}
            <button className="play-again" onClick={resetGame}>Jugar otra vez</button>
          </>
        )}

      </section>
    </main>
  )
}

export default App
