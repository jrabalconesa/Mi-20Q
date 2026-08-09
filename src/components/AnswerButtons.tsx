import type { Answer } from '../types/game'

const answers: Array<{ value: Answer; label: string }> = [
  { value: 'yes', label: 'Sí' },
  { value: 'no', label: 'No' },
  { value: 'sometimes', label: 'A veces' },
  { value: 'unknown', label: 'No lo sé' }
]

export function AnswerButtons({ onAnswer }: { onAnswer: (answer: Answer) => void }) {
  return (
    <div className="answer-grid" aria-label="Opciones de respuesta">
      {answers.map(({ value, label }) => (
        <button className={`answer answer-${value}`} key={value} onClick={() => onAnswer(value)}>{label}</button>
      ))}
    </div>
  )
}
