import { useEffect } from 'react'

export function useDelay(handler: () => void, delayMS = 500) {
  return useEffect(() => {
    const timeout = setTimeout(handler, delayMS)
    return () => clearTimeout(timeout)
  }, [])
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
