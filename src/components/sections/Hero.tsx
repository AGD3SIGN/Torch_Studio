import { ArrowRight, Pause } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import { heroPreviewTracks } from '@/data/previewTracks'
import { generateWaveformHeights } from '@/utils/waveform'
import { cn } from '@/lib/utils'

// Pre-computed waveform heights for hero tiles (10 bars instead of 20)
const heroWaveHeights: Record<number, number[]> = Object.fromEntries(
  heroPreviewTracks.map((t) => [t.id, generateWaveformHeights(t.id, 10)])
)

export function Hero() {
  const { toggle, isPlaying, progress } = useAudioPlayer()

  return (
    <section className="relative overflow-hidden bg-background section-padding">
      {/* Subtle warm radial glow */}
      <div
        className="pointer-events-none absolute -top-24 right-0 h-[600px] w-[600px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, hsl(22 70% 51% / 0.4) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="section-container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">

          {/* Left — copy */}
          <div className="flex flex-col items-start gap-6 animate-fade-in">
            <Badge
              variant="outline"
              className="border-primary/30 text-primary bg-primary/8 font-semibold text-xs tracking-wide px-3 py-1"
            >
              150+ tracks available
            </Badge>

            <h1 className="font-display text-5xl font-bold leading-tight text-foreground lg:text-display">
              Every beat, at a{' '}
              <span className="text-primary">price that<br className="hidden sm:block" /> makes sense.</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Handpicked tracks, loops, and stems across every genre — starting at{' '}
              <strong className="font-semibold text-foreground">$0.99</strong>.
              No subscription required unless you want one.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center h-11 gap-1.5 px-8 rounded-lg bg-primary text-primary-foreground hover:bg-accent font-semibold text-base transition-all duration-200 shadow-amber"
              >
                Browse the catalog
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="/#pricing"
                className="inline-flex items-center justify-center h-11 px-8 rounded-lg border border-border hover:bg-secondary font-semibold text-base transition-all duration-200"
              >
                See pricing
              </a>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2" aria-hidden="true">
                {['MT', 'YS', 'PM'].map((initials) => (
                  <div
                    key={initials}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary border-2 border-background text-xs font-semibold text-foreground"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">1,200+</span> creators already on board
              </p>
            </div>
          </div>

          {/* Right — interactive album mosaic */}
          <div
            className="relative animate-slide-up"
            style={{ animationDelay: '0.15s' }}
            aria-label="Genre previews — click to play 30-second samples"
          >
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              {heroPreviewTracks.map((track) => {
                const playing = isPlaying(track.id)
                const heights = heroWaveHeights[track.id]

                return (
                  <div
                    key={track.id}
                    className="group relative aspect-square rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-warm-md"
                    style={{ backgroundColor: track.color }}
                  >
                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0 opacity-60"
                      style={{ background: `linear-gradient(135deg, ${track.color}cc 0%, ${track.color}44 100%)` }}
                    />

                    {/* Waveform animation when playing */}
                    {playing && (
                      <div className="absolute inset-0 flex items-end justify-center gap-px pb-2 px-2 z-10">
                        {heights.map((h, i) => (
                          <div
                            key={i}
                            className="waveform-bar w-1 rounded-full bg-white"
                            style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>
                    )}

                    {/* Progress ring */}
                    {playing && (
                      <svg
                        className="absolute inset-0 h-full w-full z-20 pointer-events-none"
                        viewBox="0 0 100 100"
                        aria-hidden="true"
                      >
                        <circle
                          cx="50" cy="50" r="42"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          strokeOpacity="0.4"
                          strokeDasharray={`${2 * Math.PI * 42}`}
                          strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress)}`}
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                    )}

                    {/* Label */}
                    <div className="absolute inset-0 flex flex-col justify-end p-2 z-10">
                      <p className={cn(
                        'text-white text-xs font-semibold leading-tight transition-opacity duration-200 line-clamp-2',
                        playing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      )}>
                        {track.label}
                      </p>
                    </div>

                    {/* Play/Pause button */}
                    <button
                      onClick={() => toggle(track.id, track.audioSrc)}
                      className={cn(
                        'absolute inset-0 flex items-center justify-center z-30 transition-opacity duration-200',
                        playing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      )}
                      aria-label={playing ? `Pause ${track.label}` : `Preview ${track.label}`}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors">
                        {playing ? (
                          <Pause className="h-4 w-4 text-white fill-white" strokeWidth={0} />
                        ) : (
                          <svg viewBox="0 0 16 16" className="h-4 w-4 text-white fill-white ml-0.5" aria-hidden="true">
                            <polygon points="3,1 14,8 3,15" />
                          </svg>
                        )}
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Floating price badge */}
            <div className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-2xl bg-background border border-border shadow-warm-md px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <span className="font-display text-sm font-bold text-primary-foreground">$</span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Starting at just</p>
                <p className="text-lg font-display font-bold text-foreground leading-none">$0.99 / track</p>
              </div>
            </div>

            {/* Preview label */}
            <p className="absolute -bottom-10 right-0 text-xs text-muted-foreground">
              Click any tile to preview · 30s samples
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
