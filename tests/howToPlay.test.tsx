import { act } from 'react'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import { afterEach, describe, expect, it } from 'vitest'
import { HowToPlay } from '../src/components/HowToPlay'

const mounted: Array<{ container: HTMLDivElement; root: Root }> = []

;(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true

afterEach(() => {
  mounted.splice(0).forEach(({ container, root }) => {
    act(() => root.unmount())
    container.remove()
  })
})

function renderHowToPlay() {
  const container = document.createElement('div')
  document.body.append(container)
  const root = createRoot(container)
  mounted.push({ container, root })

  act(() => root.render(<HowToPlay />))
  return container
}

describe('HowToPlay', () => {
  it('abre y cierra las instrucciones desde botones independientes', () => {
    const container = renderHowToPlay()
    const openButton = container.querySelector<HTMLButtonElement>('.how-to-trigger')

    expect(openButton?.textContent).toBe('Cómo jugar')
    expect(document.querySelector('[role="dialog"]')).toBeNull()

    act(() => openButton?.click())
    expect(document.querySelector('[role="dialog"]')?.textContent).toContain('Cómo jugar a Mi 20Q')
    expect(document.querySelector('[role="dialog"]')?.textContent).toContain('No lo sé')

    act(() => document.querySelector<HTMLButtonElement>('.how-to-done')?.click())
    expect(document.querySelector('[role="dialog"]')).toBeNull()
    expect(document.activeElement).toBe(openButton)
  })
})
