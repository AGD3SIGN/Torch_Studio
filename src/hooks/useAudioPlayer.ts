import { useCallback, useEffect, useRef, useState } from 'react'

const PREVIEW_LIMIT_SECS = 30

interface UseAudioPlayerReturn {
  playingId: number | null
  progress: number // 0–1
  play: (id: number, src: string) => void
  pause: () => void
  toggle: (id: number, src: string) => void
  isPlaying: (id: number) => boolean
}

// Single global Audio instance shared across the app
let globalAudio: HTMLAudioElement | null = null

export function useAudioPlayer(): UseAudioPlayerReturn {
  const [playingId, setPlayingId] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(0)


  const stopAll = useCallback(() => {
    if (globalAudio) {
      globalAudio.pause()
      globalAudio.currentTime = 0
    }
    if (timerRef.current) clearInterval(timerRef.current)
    setPlayingId(null)
    setProgress(0)
  }, [])

  const play = useCallback((id: number, src: string) => {
    // Stop any existing playback
    if (globalAudio) {
      globalAudio.pause()
      globalAudio.currentTime = 0
    }
    if (timerRef.current) clearInterval(timerRef.current)

    const audio = new Audio(src)
    audio.crossOrigin = 'anonymous'
    globalAudio = audio

    audio.play().catch(() => {
      // Autoplay blocked or network error
      setPlayingId(null)
    })

    startTimeRef.current = Date.now()
    setPlayingId(id)
    setProgress(0)

    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000
      const p = Math.min(elapsed / PREVIEW_LIMIT_SECS, 1)
      setProgress(p)
      if (p >= 1) {
        if (timerRef.current) clearInterval(timerRef.current)
        audio.pause()
        setPlayingId(null)
        setProgress(0)
      }
    }, 200)

    audio.addEventListener('ended', () => {
      if (timerRef.current) clearInterval(timerRef.current)
      setPlayingId(null)
      setProgress(0)
    })
  }, [])

  const pause = useCallback(() => {
    if (globalAudio) {
      globalAudio.pause()
    }
    if (timerRef.current) clearInterval(timerRef.current)
    setPlayingId(null)
    setProgress(0)
  }, [])

  const toggle = useCallback((id: number, src: string) => {
    if (playingId === id) {
      pause()
    } else {
      play(id, src)
    }
  }, [playingId, play, pause])

  const isPlaying = useCallback((id: number) => playingId === id, [playingId])

  useEffect(() => {
    return () => {
      stopAll()
    }
  }, [stopAll])

  return { playingId, progress, play, pause, toggle, isPlaying }
}
