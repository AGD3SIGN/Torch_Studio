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
let endedHandler: (() => void) | null = null

export function useAudioPlayer(): UseAudioPlayerReturn {
  const [playingId, setPlayingId] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(0)


  const stopAll = useCallback(() => {
    if (globalAudio) {
      globalAudio.pause()
      globalAudio.currentTime = 0
      if (endedHandler) {
        globalAudio.removeEventListener('ended', endedHandler)
        endedHandler = null
      }
    }
    if (timerRef.current) clearInterval(timerRef.current)
    setPlayingId(null)
    setProgress(0)
  }, [])

  const play = useCallback((id: number, src: string) => {
    console.log('🎵 play() called with id:', id, 'src:', src)

    // Stop any existing playback
    if (globalAudio) {
      globalAudio.pause()
      globalAudio.currentTime = 0
      if (endedHandler) {
        globalAudio.removeEventListener('ended', endedHandler)
      }
    }
    if (timerRef.current) clearInterval(timerRef.current)

    const audio = new Audio(src)
    audio.volume = 1
    audio.crossOrigin = 'anonymous'
    globalAudio = audio

    console.log('🎵 Audio element created, src:', src, 'volume:', audio.volume)

    audio.onloadstart = () => console.log('🎵 Loading started')
    audio.oncanplay = () => console.log('🎵 Can play')
    audio.onplay = () => console.log('🎵 Play event fired')

    audio.onerror = (e) => {
      console.error('🎵 Audio load error for:', src, 'error:', e)
      setPlayingId(null)
    }

    const playPromise = audio.play()
    console.log('🎵 play() method called, promise:', playPromise)

    if (playPromise !== undefined) {
      playPromise
        .then(() => console.log('🎵 Audio playing successfully'))
        .catch((err) => {
          console.error('🎵 Audio play error:', err.name, err.message)
          setPlayingId(null)
        })
    }

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

    const onEnded = () => {
      if (timerRef.current) clearInterval(timerRef.current)
      setPlayingId(null)
      setProgress(0)
    }
    endedHandler = onEnded
    audio.addEventListener('ended', onEnded)
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
