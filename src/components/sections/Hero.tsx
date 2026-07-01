import { useEffect, useRef, useState, useCallback } from 'react'
import { Pause, ChevronLeft, ChevronRight, Music2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { heroPreviewTracks } from '@/data/previewTracks'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import { generateWaveformHeights } from '@/utils/waveform'
import { cn } from '@/lib/utils'

/* Pre-compute waveform bar heights per track — deterministic, no shift on re-render */
const WAVEFORM_HEIGHTS: Record<number, number[]> = Object.fromEntries(
  heroPreviewTracks.map((t) => [t.id, generateWaveformHeights(t.id, 28)])
)

/* Auto-advance interval in ms */
const AUTO_ADVANCE_MS = 6000

/* SVG progress ring geometry */
const RING_RADIUS = 88
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

/* Derive a plausible BPM from the track seed (range 70–140) */
function deriveBpm(seedId: number): number {
  return 70 + ((seedId * 23 + 37) % 71)
}

export function Hero() {
  const { toggle, isPlaying, progress, playingId } = useAudioPlayer()

  /* Currently featured track index (not necessarily playing) */
  const [featuredIndex, setFeaturedIndex] = useState(0)

  /* Cross-fade: track the previous color so we can fade between them */
  const [prevIndex, setPrevIndex] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)

  /* Entrance animation trigger — set to true 50ms after mount */
  const [mounted, setMounted] = useState(false)

  /* Auto-advance timer ref — cleared and restarted on user interaction */
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const featuredTrack = heroPreviewTracks[featuredIndex]

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(id)
  }, [])

  const goTo = useCallback(
    (nextIndex: number) => {
      if (nextIndex === featuredIndex) return
      setPrevIndex(featuredIndex)
      setTransitioning(true)
      setFeaturedIndex(nextIndex)
      setTimeout(() => {
        setPrevIndex(null)
        setTransitioning(false)
      }, 600)
    },
    [featuredIndex]
  )

  const goNext = useCallback(
    () => goTo((featuredIndex + 1) % heroPreviewTracks.length),
    [featuredIndex, goTo]
  )

  const goPrev = useCallback(
    () => goTo((featuredIndex - 1 + heroPreviewTracks.length) % heroPreviewTracks.length),
    [featuredIndex, goTo]
  )

  const resetTimer = useCallback(() => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current)
    if (playingId !== null) return
    autoTimerRef.current = setTimeout(() => goNext(), AUTO_ADVANCE_MS)
  }, [goNext, playingId])

  useEffect(() => {
    resetTimer()
    return () => { if (autoTimerRef.current) clearTimeout(autoTimerRef.current) }
  }, [resetTimer])

  useEffect(() => {
    if (playingId === null) resetTimer()
  }, [playingId, resetTimer])

  const handleSelectorClick = (index: number) => goTo(index)
  const handlePlayPause = () => toggle(featuredTrack.id, featuredTrack.audioSrc)

  const isFeaturedPlaying = isPlaying(featuredTrack.id)
  const waveHeights = WAVEFORM_HEIGHTS[featuredTrack.id]
  const trackBpm = deriveBpm(featuredTrack.id)
  const ringProgress = isFeaturedPlaying ? progress : 0

  /* Scroll the selector strip so the active pill stays visible */
  const selectorRef = useRef<HTMLDivElement>(null)
  const activePillRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    activePillRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }, [featuredIndex])

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: 'min(92vh, 780px)' }}
      aria-label="Featured track hero"
    >
      {/* ── Color crossfade backgrounds ── */}
      {prevIndex !== null && (
        <div
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-600 ease-in-out"
          style={{ backgroundColor: heroPreviewTracks[prevIndex].color, opacity: transitioning ? 0 : 1 }}
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-opacity duration-600 ease-in-out"
        style={{ backgroundColor: featuredTrack.color, opacity: 1 }}
      />

      {/* Dark overlay — keeps text legible across all track colors */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.65)' }}
      />

      {/* ── Decorative background layer ── */}
      {/*
        Diagonal ruled lines — fine parallel strokes at 15° create editorial texture
        consistent with the formal, sharp-corner design language. A slow keyframe
        pulse animates the opacity between 7% and 10% to give the hero a subtle
        sense of life without competing with content. The animation is suppressed
        for users who prefer reduced motion.
      */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Keyframe pulse — slow, meditative cycle between 7% and 10% opacity */}
          <style>{`
            @keyframes hero-line-pulse {
              0%, 100% { opacity: 0.07; }
              50%       { opacity: 0.10; }
            }
            .hero-lines-rect {
              animation: hero-line-pulse 3.5s ease-in-out infinite;
            }
            @media (prefers-reduced-motion: reduce) {
              .hero-lines-rect {
                animation: none;
                opacity: 0.07;
              }
            }
          `}</style>

          {/* Diagonal line tile — 40×40px cell, line at 15° */}
          <pattern
            id="hero-diagonal-lines"
            x="0" y="0"
            width="40" height="40"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(15)"
          >
            <line
              x1="0" y1="0"
              x2="0" y2="40"
              stroke="white"
              strokeWidth="0.75"
            />
          </pattern>
        </defs>

        {/* Fill the entire hero with the diagonal line texture.
            Opacity is controlled by the pulse animation on the element itself
            so the keyframe drives a single composited layer rather than
            animating each individual stroke. */}
        <rect className="hero-lines-rect" width="100%" height="100%" fill="url(#hero-diagonal-lines)" />
      </svg>

      {/* Bottom edge fade into next section */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 100%)' }}
      />

      {/* ── Main content ── */}
      <div
        className="relative z-10 flex flex-col h-full"
        style={{ minHeight: 'min(92vh, 780px)' }}
      >
        <div className="flex-1 flex items-center section-container">
          <div className="grid grid-cols-1 gap-12 py-24 lg:py-28 lg:grid-cols-2 lg:items-center lg:gap-20 w-full">

            {/* ── Left — editorial headline copy ── */}
            {/* w-full ensures this column never shrinks to text width, preventing layout shift on title change */}
            <div className="flex flex-col gap-8 w-full min-w-0">

              {/* Overline — genre + "now featuring" in small caps */}
              <div
                className="flex items-center gap-3 transition-all duration-500 ease-out"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                  transitionDelay: '0ms',
                }}
              >
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                  Now featuring
                </span>
                <span className="inline-block h-px w-8 bg-white/25" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  {featuredTrack.genre}
                </span>
              </div>

              {/* Primary headline — maximum typographic drama */}
              {/* w-full + min-h reserve a stable block height so switching tracks never shifts the layout */}
              <div
                className="w-full transition-all duration-500 ease-out"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(16px)',
                  transitionDelay: '80ms',
                }}
              >
                {/* Track count — small contextual number */}
                <p className="text-white/35 text-sm font-mono tracking-widest mb-4 uppercase">
                  {String(heroPreviewTracks.indexOf(featuredTrack) + 1).padStart(2, '0')} / {String(heroPreviewTracks.length).padStart(2, '0')}
                </p>

                {/* The main headline — fixed min-h prevents height shift when line count changes */}
                <h1
                  className="hero-headline text-white w-full"
                  style={{
                    fontSize: 'clamp(3.25rem, 8vw, 6.5rem)',
                    fontWeight: 900,
                    lineHeight: 0.9,
                    letterSpacing: '-0.045em',
                    /* Two lines at max size (6.5rem × 0.9 lh × 2) + 0.5rem breathing room */
                    minHeight: 'calc((6.5rem * 0.9 * 2) + 0.5rem)',
                  }}
                >
                  {featuredTrack.label}
                </h1>
              </div>

              {/* Catalog pitch — subordinate, restrained */}
              <p
                className="text-white/55 text-base leading-relaxed max-w-sm transition-all duration-500 ease-out border-l-2 border-primary/50 pl-4"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                  transitionDelay: '160ms',
                }}
              >
                150+ handpicked tracks across every genre. From{' '}
                <strong className="text-white font-semibold">$0.99</strong> — no subscription required.
              </p>

              {/* CTA row — sharp, architectural buttons */}
              <div
                className="flex flex-col sm:flex-row gap-3 transition-all duration-500 ease-out"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                  transitionDelay: '240ms',
                }}
              >
                <Link
                  to="/catalog"
                  className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-primary text-primary-foreground font-bold text-sm hover:bg-accent transition-colors duration-200 tracking-wide uppercase"
                >
                  Browse catalog
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="/#pricing"
                  className="inline-flex items-center justify-center h-12 px-8 border border-white/25 text-white font-semibold text-sm hover:bg-white/10 transition-colors duration-200 tracking-wide"
                >
                  See pricing
                </a>
              </div>

              {/* Social proof — anchors the click decision */}
              <p
                className="text-white/35 text-xs tracking-[0.12em] uppercase transition-all duration-500 ease-out"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                  transitionDelay: '320ms',
                }}
              >
                <span className="text-white/65 font-bold">1,200+</span> creators already licensed tracks
              </p>
            </div>

            {/* ── Right — visualizer stage ── */}
            <div
              className="flex flex-col items-center gap-6 transition-all duration-600 ease-out"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(28px)',
                transitionDelay: '160ms',
              }}
            >
              {/* SVG progress ring + play button */}
              <div className="relative flex items-center justify-center">
                <svg
                  viewBox="0 0 200 200"
                  className="h-56 w-56 lg:h-68 lg:w-68 -rotate-90"
                  aria-hidden="true"
                >
                  <circle
                    cx="100" cy="100" r={RING_RADIUS}
                    fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="2"
                  />
                  <circle
                    cx="100" cy="100" r={RING_RADIUS}
                    fill="none" stroke="rgba(255,255,255,0.90)" strokeWidth="2"
                    strokeLinecap="square"
                    strokeDasharray={RING_CIRCUMFERENCE}
                    strokeDashoffset={RING_CIRCUMFERENCE * (1 - ringProgress)}
                    style={{ transition: 'stroke-dashoffset 0.2s linear' }}
                  />
                </svg>

                {/* Play/pause button — centered inside the ring */}
                <button
                  onClick={handlePlayPause}
                  aria-label={isFeaturedPlaying ? `Pause ${featuredTrack.label}` : `Preview ${featuredTrack.label}`}
                  className="absolute flex h-20 w-20 lg:h-24 lg:w-24 items-center justify-center border border-white/25 bg-white/10 backdrop-blur-sm hover:bg-white/20 active:scale-95 transition-all duration-150"
                >
                  {isFeaturedPlaying ? (
                    <Pause className="h-8 w-8 text-white fill-white" strokeWidth={0} />
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-8 w-8 text-white fill-white ml-1" aria-hidden="true">
                      <polygon points="5,3 21,12 5,21" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Waveform bars */}
              <div
                className="flex items-end justify-center gap-0.5"
                style={{ height: '52px', width: '100%', maxWidth: '300px' }}
                aria-hidden="true"
              >
                {waveHeights.map((h, i) => (
                  <div
                    key={i}
                    className={cn(
                      'rounded-none flex-1',
                      isFeaturedPlaying ? 'waveform-bar bg-white' : 'bg-white/25'
                    )}
                    style={{
                      height: isFeaturedPlaying
                        ? `${h}%`
                        : `${20 + ((featuredTrack.id * 7 + i * 11) % 40)}%`,
                      transition: 'height 0.3s ease',
                      animationDelay: isFeaturedPlaying ? `${(i * 0.04).toFixed(2)}s` : '0s',
                    }}
                  />
                ))}
              </div>

              {/* Track identity card — clean, formal */}
              <div className="w-full max-w-xs">
                <div className="flex items-center gap-3 border border-white/12 bg-black/30 backdrop-blur-sm px-4 py-3">
                  {/* Color swatch acts as artwork placeholder */}
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center"
                    style={{ backgroundColor: `${featuredTrack.color}cc` }}
                    aria-hidden="true"
                  >
                    <Music2 className="h-4 w-4 text-white/80" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-bold leading-snug truncate tracking-wide">
                      {featuredTrack.label}
                    </p>
                    <p className="text-white/40 text-xs mt-0.5 uppercase tracking-[0.1em]">
                      {featuredTrack.genre}
                    </p>
                  </div>

                  <span className="flex-shrink-0 text-xs font-mono text-white/40 border border-white/12 px-1.5 py-0.5">
                    {trackBpm} BPM
                  </span>
                </div>

                <p className="text-white/25 text-xs mt-2 tracking-[0.1em] uppercase text-center">
                  {isFeaturedPlaying ? '30-second preview playing' : '30-second preview — no login needed'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Selector strip — flat, architectural ── */}
        <div className="relative z-10 border-t border-white/10 bg-black/25 backdrop-blur-sm">
          <div className="section-container">
            <div className="flex items-center gap-2 py-3">

              <button
                onClick={() => { goPrev(); resetTimer() }}
                aria-label="Previous track"
                className="flex-shrink-0 flex h-8 w-8 items-center justify-center border border-white/15 text-white/40 hover:text-white hover:border-white/30 transition-colors duration-150"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div
                ref={selectorRef}
                className="flex items-center gap-2 overflow-x-auto scrollbar-none flex-1 py-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {heroPreviewTracks.map((track, index) => {
                  const isFeatured = index === featuredIndex
                  const isActive = isPlaying(track.id)

                  return (
                    <button
                      key={track.id}
                      ref={isFeatured ? activePillRef : null}
                      onClick={() => { handleSelectorClick(index); resetTimer() }}
                      aria-label={`Feature ${track.label}`}
                      aria-pressed={isFeatured}
                      className={cn(
                        /* Sharp corners instead of pills — matches Noize/Reluxe aesthetic */
                        'flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 border text-xs font-bold whitespace-nowrap transition-all duration-200 uppercase tracking-[0.1em]',
                        isFeatured
                          ? 'bg-white/15 border-white/40 text-white'
                          : 'bg-transparent border-white/10 text-white/35 hover:text-white/60 hover:border-white/20'
                      )}
                    >
                      <span
                        className="inline-block h-1.5 w-1.5 flex-shrink-0"
                        style={{ backgroundColor: isActive ? '#ffffff' : track.color }}
                        aria-hidden="true"
                      />
                      {track.genre}
                      {isActive && (
                        <span className="live-dot inline-block h-1.5 w-1.5 bg-primary flex-shrink-0" aria-hidden="true" />
                      )}
                    </button>
                  )
                })}
              </div>

              <button
                onClick={() => { goNext(); resetTimer() }}
                aria-label="Next track"
                className="flex-shrink-0 flex h-8 w-8 items-center justify-center border border-white/15 text-white/40 hover:text-white hover:border-white/30 transition-colors duration-150"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
