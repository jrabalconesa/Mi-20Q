import { useRef, useState, type ChangeEvent } from 'react'
import {
  createKnowledgeExport,
  downloadKnowledgeExport,
  parseKnowledgeImport
} from '../knowledgeTransfer'
import type { CandidateExperience } from '../types/game'
import type { LearningRecord } from '../types/game'

interface KnowledgeTransferProps {
  learning: LearningRecord[]
  experience: CandidateExperience[]
  onImport: (learning: LearningRecord[], experience: CandidateExperience[]) => void
}

export function KnowledgeTransfer({ learning, experience, onImport }: KnowledgeTransferProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState<string | null>(null)
  const totalEntries = learning.length + experience.length

  const exportKnowledge = () => {
    const data = createKnowledgeExport(learning, experience)
    downloadKnowledgeExport(data)
    setMessage('Conocimiento exportado correctamente.')
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    try {
      const raw = await file.text()
      const result = parseKnowledgeImport(raw)
      if (!result.ok) {
        setMessage(result.error)
        return
      }
      onImport(result.learning, result.experience)
      setMessage(`Importado: ${result.learning.length} aprendizajes y ${result.experience.length} experiencias.`)
    } catch {
      setMessage('No se pudo leer el archivo seleccionado.')
    }
  }

  return (
    <section aria-label="Copia de seguridad del conocimiento" className="knowledge-transfer">
      <h3>Conocimiento local</h3>
      <p>
        {totalEntries > 0
          ? `${learning.length} aprendizajes y ${experience.length} refuerzos guardados en este navegador.`
          : 'Aún no hay conocimiento personalizado guardado.'}
      </p>
      <div className="knowledge-transfer-actions">
        <button className="secondary" onClick={exportKnowledge} type="button">
          Exportar
        </button>
        <button className="secondary" onClick={() => inputRef.current?.click()} type="button">
          Importar
        </button>
        <input
          accept="application/json,.json"
          aria-hidden="true"
          className="sr-only"
          onChange={handleFileChange}
          ref={inputRef}
          tabIndex={-1}
          type="file"
        />
      </div>
      {message && (
        <p className="knowledge-transfer-message" role="status">
          {message}
        </p>
      )}
    </section>
  )
}
