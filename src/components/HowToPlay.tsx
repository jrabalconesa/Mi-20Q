import { useRef, useState } from 'react'
import type { KeyboardEvent, MouseEvent } from 'react'
import { createPortal } from 'react-dom'

export function HowToPlay() {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const close = () => {
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  const closeFromBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) close()
  }

  const closeFromKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      close()
      return
    }

    if (event.key !== 'Tab') return
    const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button'))
    const first = focusable[0]
    const last = focusable.at(-1)

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }

  return (
    <>
      <button
        aria-expanded={isOpen}
        className="how-to-trigger secondary"
        onClick={() => setIsOpen(true)}
        ref={triggerRef}
        type="button"
      >
        Cómo jugar
      </button>

      {isOpen && createPortal((
        <div
          aria-labelledby="how-to-title"
          aria-modal="true"
          className="how-to-backdrop"
          onClick={closeFromBackdrop}
          onKeyDown={closeFromKeyboard}
          role="dialog"
        >
          <article className="how-to-dialog">
            <header className="how-to-header">
              <div>
                <span className="badge">Guía rápida</span>
                <h2 id="how-to-title">Cómo jugar a Mi 20Q</h2>
              </div>
              <button autoFocus className="how-to-close" onClick={close} type="button">
                <span aria-hidden="true">×</span>
                <span className="sr-only">Cerrar instrucciones</span>
              </button>
            </header>

            <div className="how-to-content">
              <section>
                <h3>1. Piensa en algo</h3>
                <p>Elige algo concreto que el juego pueda reconocer, pero evita casos excesivamente particulares. Por ejemplo, piensa en «un gato» en lugar de «mi gato llamado Michi».</p>
                <p>Antes de empezar, selecciona la categoría que mejor corresponda: <strong>Animal</strong>, <strong>Objeto</strong>, <strong>Lugar</strong> o <strong>Persona o personaje</strong>.</p>
              </section>

              <section>
                <h3>2. Responde a las preguntas</h3>
                <p>Mi 20Q intentará descubrir en qué estás pensando mediante un máximo de veinte preguntas.</p>
                <dl className="answer-guide">
                  <div><dt>Sí</dt><dd>La afirmación es correcta.</dd></div>
                  <div><dt>No</dt><dd>La afirmación es incorrecta.</dd></div>
                  <div><dt>A veces</dt><dd>Depende del caso o solo se cumple parcialmente.</dd></div>
                  <div><dt>No lo sé</dt><dd>No conoces la respuesta o la pregunta no resulta aplicable.</dd></div>
                </dl>
                <p>Responde pensando en las características habituales de aquello que elegiste. El juego tolera cierta incertidumbre.</p>
                <p>Puedes revisar las preguntas anteriores durante la partida y, si te equivocaste, usar <strong>Deshacer última</strong>.</p>
              </section>

              <section>
                <h3>3. Mi 20Q hará una suposición</h3>
                <p>Cuando crea tener suficiente información, intentará adivinar tu respuesta. Si acierta, elige <strong>Sí, acertaste</strong>. Si falla y aún quedan preguntas, elige <strong>No, sigue preguntando</strong>.</p>
                <p>La opción incorrecta se descartará y la partida continuará hasta alcanzar el límite de veinte preguntas.</p>
              </section>

              <section>
                <h3>4. Si Mi 20Q no acierta</h3>
                <p>La partida termina y puedes volver a jugar con otra opción. Las respuestas fallidas sirven para mejorar el catálogo en futuras versiones del juego.</p>
              </section>

              <section>
                <h3>5. Datos locales</h3>
                <p>Mi 20Q guarda estadísticas y refuerzos automáticos de partidas acertadas únicamente en este navegador. No se envían a ningún servidor ni se comparten automáticamente con otros dispositivos.</p>
              </section>

              <aside className="how-to-tips">
                <h3>Consejos</h3>
                <ul>
                  <li>Escoge una sola respuesta y mantén la misma interpretación durante la partida.</li>
                  <li>Usa «A veces» cuando una característica pueda variar.</li>
                  <li>Usa «No lo sé» cuando no puedas responder con seguridad.</li>
                </ul>
              </aside>
            </div>

            <button className="how-to-done" onClick={close} type="button">Entendido</button>
          </article>
        </div>
      ), document.body)}
    </>
  )
}
