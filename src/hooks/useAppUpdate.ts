import { useEffect, useState } from 'react'

const CHECK_INTERVAL_MS = 60_000

function currentBundlePath(): string | null {
  const source = document.querySelector<HTMLScriptElement>('script[type="module"][src]')?.src
  return source ? new URL(source).pathname : null
}

async function latestBundlePath(): Promise<string | null> {
  const baseUrl = new URL(import.meta.env.BASE_URL, window.location.origin)
  baseUrl.searchParams.set('update', Date.now().toString())
  const response = await fetch(baseUrl, { cache: 'no-store' })
  if (!response.ok) return null
  const html = await response.text()
  const documentCopy = new DOMParser().parseFromString(html, 'text/html')
  const source = documentCopy.querySelector<HTMLScriptElement>('script[type="module"][src]')?.getAttribute('src')
  return source ? new URL(source, window.location.origin).pathname : null
}

export function useAppUpdate(): boolean {
  const [updateAvailable, setUpdateAvailable] = useState(false)

  useEffect(() => {
    const check = async () => {
      try {
        const [current, latest] = [currentBundlePath(), await latestBundlePath()]
        if (current && latest && current !== latest) setUpdateAvailable(true)
      } catch {
        // Una comprobación de actualización nunca debe interrumpir una partida.
      }
    }
    const checkWhenVisible = () => {
      if (document.visibilityState === 'visible') void check()
    }
    const refreshWhenRestored = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload()
        return
      }
      void check()
    }
    const interval = window.setInterval(() => void check(), CHECK_INTERVAL_MS)
    document.addEventListener('visibilitychange', checkWhenVisible)
    window.addEventListener('pageshow', refreshWhenRestored)
    void check()
    return () => {
      window.clearInterval(interval)
      document.removeEventListener('visibilitychange', checkWhenVisible)
      window.removeEventListener('pageshow', refreshWhenRestored)
    }
  }, [])

  return updateAvailable
}
