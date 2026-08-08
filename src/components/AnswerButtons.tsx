import type { Answer } from '../types/game'

const answers: Array<{ value: Answer; label: string }> = [
  { value: 'yes', label: 'Sí' },
  { value: 'probably_yes', label: 'Probablemente sí' },
  { value: 'unknown', label: 'No sé' },
  { value: 'probably_no', label: 'Probablemente no' },
  { value: 'no', label: 'No' }
]

export function AnswerButtons({ onAnswer }: { onAnswer: (answer: Answer) => void }) {
  return (
    <div className="answer-grid" aria-label="Opciones de respuesta">
      {answers.map(({ value, label }) => (
        <button key={value} onClick={() => onAnswer(value)}>{label}</button>
      ))}
    </div>
  )
}
