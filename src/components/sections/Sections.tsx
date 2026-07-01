/**
 * Torch Studio — Section Components
 * Features · CatalogPreview · Pricing · Testimonials · CTABanner · Footer
 *
 * Design system: formal, architectural, bold typography.
 * Inspired by Reluxe (geometric minimalism) and Noize (bold dramatic type).
 */

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Music, DollarSign, Zap, Play, Pause, Download, Star, Flame, X,
  Camera, PlayCircle, ArrowUpRight, CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { tracks as canonicalTracks } from '@/data/tracks'
import { isValidEmail } from '@/lib/validation'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import { cn } from '@/lib/utils'
import { MusicAttributionModal } from '@/components/ui/MusicAttributionModal'

// ─────────────────────────────────────────────────────────────────────────────
// FEATURES SECTION
// ─────────────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: Music,
    title: 'Massive catalog',
    description:
      '150+ handpicked tracks across every genre, growing weekly. Lo-fi, cinematic, hip-hop, ambient — find the sound you need.',
    highlight: '150+ tracks',
  },
  {
    icon: DollarSign,
    title: 'Honest pricing',
    description:
      'Pay per track or subscribe for less than a coffee. No surprise fees, no lock-in, no upsells after checkout.',
    highlight: 'From $0.99',
  },
  {
    icon: Zap,
    title: 'Instant download',
    description:
      'Buy it, download it, use it. Files delivered instantly in studio-quality WAV and MP3 formats.',
    highlight: 'WAV + MP3',
  },
]

export function Features() {
  return (
    <section className="bg-secondary section-padding" id="features">
      <div className="section-container">
        {/* Section header — overline + large headline */}
        <div className="mb-16">
          <p className="overline-label mb-4">Why Torch Studio</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="section-headline text-foreground max-w-xl"
              style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4rem)' }}
            >
              Built for people on a budget, not just on paper.
            </h2>
            <p className="text-base text-muted-foreground max-w-xs leading-relaxed">
              We built Torch Studio because music licensing shouldn't require a corporate budget.
            </p>
          </div>
        </div>

        {/* Horizontal rule — structural accent */}
        <div className="border-t border-border mb-12" aria-hidden="true" />

        {/* Feature grid — clean, card-free layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-border border border-border">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="p-8 lg:p-10 group">
                {/* Index number — Reluxe-style numbering */}
                <p className="text-xs font-mono text-muted-foreground/50 mb-6 tracking-[0.15em]">
                  0{i + 1}
                </p>

                {/* Icon */}
                <div className="flex h-11 w-11 items-center justify-center bg-primary/10 mb-5 group-hover:bg-primary/15 transition-colors duration-200">
                  <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                </div>

                {/* Highlight badge — amber accent */}
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary mb-3">
                  {feature.highlight}
                </p>

                <h3 className="font-display text-xl font-bold text-foreground mb-3 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CATALOG PREVIEW SECTION
// ─────────────────────────────────────────────────────────────────────────────

const tracks = canonicalTracks.slice(0, 12)

const genres = [
  'All', 'Lo-Fi', 'Hip-Hop', 'Ambient', 'Indie Pop',
  'Soul', 'Electronic', 'Jazz', 'Trap', 'Folk', 'Cinematic', 'R&B',
]

const waveformHeights: Record<number, number[]> = Object.fromEntries(
  tracks.map((t) => [
    t.id,
    Array.from({ length: 20 }, (_, i) => 20 + Math.sin(i * 1.2 + t.id) * 14 + ((i * 7 + t.id * 3) % 8)),
  ])
)

export function CatalogPreview() {
  const [activeGenre, setActiveGenre] = useState('All')
  const { toggle, isPlaying } = useAudioPlayer()

  const filtered = useMemo(
    () => (activeGenre === 'All' ? tracks : tracks.filter((t) => t.genre === activeGenre)),
    [activeGenre]
  )

  return (
    <section className="bg-background section-padding" id="catalog-preview">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-16">
          <p className="overline-label mb-4">Catalog</p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h2
              className="section-headline text-foreground"
              style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4rem)' }}
            >
              What's in the catalog
            </h2>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.12em] text-foreground hover:text-primary transition-colors duration-200 shrink-0 group"
            >
              View full catalog
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
            </Link>
          </div>
        </div>

        <div className="border-t border-border mb-10" aria-hidden="true" />

        {/* Genre filter — sharp tag buttons, no pills */}
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by genre">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGenre(g)}
              aria-pressed={activeGenre === g}
              className={cn(
                'px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] border transition-all duration-200',
                activeGenre === g
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
              )}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Track list */}
        <div className="flex flex-col border border-border" role="list" aria-label="Tracks">
          {filtered.map((track, i) => (
            <div
              key={track.id}
              role="listitem"
              className={cn(
                'flex items-center gap-4 p-4 sm:p-5 hover:bg-secondary transition-all duration-150 group',
                i !== 0 && 'border-t border-border'
              )}
            >
              {/* Play/Pause */}
              <button
                onClick={() => toggle(track.id, track.audioSrc)}
                className="flex h-11 w-11 shrink-0 items-center justify-center transition-all"
                style={{ backgroundColor: track.color }}
                aria-label={isPlaying(track.id) ? `Pause ${track.title}` : `Play ${track.title}`}
              >
                <span className="flex h-7 w-7 items-center justify-center bg-white/20 hover:bg-white/30 transition-colors">
                  {isPlaying(track.id) ? (
                    <Pause className="h-3 w-3 text-white fill-white" strokeWidth={0} />
                  ) : (
                    <Play className="h-3 w-3 text-white fill-white ml-0.5" strokeWidth={0} />
                  )}
                </span>
              </button>

              {/* Track info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground truncate tracking-wide">{track.title}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
                    {track.genre}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">{track.bpm} BPM</span>
                </div>
              </div>

              {/* Waveform — decorative */}
              <div className="hidden sm:flex items-end gap-0.5 h-7 w-16" aria-hidden="true">
                {waveformHeights[track.id].map((height, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      'w-0.5 bg-muted transition-all duration-200',
                      isPlaying(track.id) && 'bg-primary waveform-bar',
                    )}
                    style={{ height: `${height}%`, animationDelay: `${(idx % 10) * 0.06}s` }}
                  />
                ))}
              </div>

              {/* Duration */}
              <span className="hidden sm:block text-xs text-muted-foreground font-mono w-8 text-right">
                {track.duration}
              </span>

              {/* Price + download */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-bold text-primary">{track.price}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-primary hover:text-primary-foreground rounded-none"
                  aria-label={`Download ${track.title}`}
                >
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PRICING SECTION
// ─────────────────────────────────────────────────────────────────────────────

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Preview everything, buy individual tracks when you need them.',
    features: [
      'Unlimited track previews',
      'Browse full catalog',
      'Buy individual tracks ($0.99–$2.99)',
      'CC0 license on every download',
      'No subscription required',
    ],
    cta: 'Get started free',
    highlighted: false,
  },
  {
    name: 'Creator',
    price: '$4.99',
    period: '/month',
    description: 'Everything you need for regular creative work.',
    features: [
      '30 downloads per month',
      'Commercial license included',
      'HD quality (WAV + MP3)',
      'Priority search filters',
      'Email support',
    ],
    cta: 'Start Creator plan',
    highlighted: true,
    badge: 'Most popular',
  },
  {
    name: 'Pro',
    price: '$12.99',
    period: '/month',
    description: 'Unlimited access for power users.',
    features: [
      'Unlimited downloads',
      'Stems & remix packs',
      'Exclusive catalog sections',
      'Priority support',
      'Early access to new drops',
    ],
    cta: 'Go Pro',
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section className="bg-foreground section-padding" id="pricing">
      <div className="section-container">
        {/* Section header — inverted colors */}
        <div className="mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-4">Pricing</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="text-secondary"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-0.035em',
                fontSize: 'clamp(2.25rem, 4.5vw, 4rem)',
              }}
            >
              Simple, honest pricing.
            </h2>
            <p className="text-muted-foreground text-base max-w-xs leading-relaxed">
              No tricks. No hidden fees. Cancel anytime — no questions asked.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mb-12" aria-hidden="true" />

        {/* Pricing cards — architectural, formal layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'flex flex-col p-8 lg:p-10 relative',
                plan.highlighted
                  ? 'bg-primary'
                  : 'bg-transparent'
              )}
            >
              {/* Most popular badge */}
              {plan.badge && (
                <div className="absolute top-6 right-6">
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground bg-white/15 border border-white/20 px-2.5 py-1">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan name */}
              <p className={cn(
                'text-xs font-bold uppercase tracking-[0.2em] mb-6',
                plan.highlighted ? 'text-primary-foreground/70' : 'text-muted-foreground'
              )}>
                {plan.name}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-4">
                <span className={cn(
                  'font-display text-5xl font-black leading-none tracking-tight',
                  plan.highlighted ? 'text-primary-foreground' : 'text-secondary'
                )}>
                  {plan.price}
                </span>
                <span className={cn(
                  'text-sm font-medium',
                  plan.highlighted ? 'text-primary-foreground/60' : 'text-muted-foreground'
                )}>
                  {plan.period}
                </span>
              </div>

              <p className={cn(
                'text-sm mb-8 leading-relaxed',
                plan.highlighted ? 'text-primary-foreground/70' : 'text-muted-foreground'
              )}>
                {plan.description}
              </p>

              {/* Feature list */}
              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2
                      className={cn(
                        'h-4 w-4 mt-0.5 shrink-0',
                        plan.highlighted ? 'text-primary-foreground/80' : 'text-primary'
                      )}
                      strokeWidth={2}
                    />
                    <span className={plan.highlighted ? 'text-primary-foreground/80' : 'text-secondary/70'}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA button */}
              <Link
                to="/sign-in?mode=register"
                className={cn(
                  'inline-flex items-center justify-center w-full h-11 font-bold text-sm transition-all duration-200 uppercase tracking-[0.1em]',
                  plan.highlighted
                    ? 'bg-primary-foreground text-primary hover:bg-primary-foreground/90'
                    : 'border border-white/20 text-secondary hover:bg-white/5'
                )}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          No credit card required for the Free tier. Cancel paid plans anytime.
        </p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS SECTION
// ─────────────────────────────────────────────────────────────────────────────

const testimonials = [
  {
    quote: "I've tried every music platform out there. Torch Studio is the only one that doesn't make me feel broke for using it.",
    author: 'Marcus T.',
    role: 'Freelance filmmaker',
    initials: 'MT',
    stars: 5,
  },
  {
    quote: 'The lo-fi section alone is worth it. Found tracks for three client projects in one afternoon. Genuinely surprised by the quality.',
    author: 'Yuki S.',
    role: 'Content creator',
    initials: 'YS',
    stars: 5,
  },
  {
    quote: 'Finally, a music platform that gets it. Great selection, fair prices, no drama. The Creator plan basically pays for itself.',
    author: 'Priya M.',
    role: 'Podcast producer',
    initials: 'PM',
    stars: 5,
  },
]

export function Testimonials() {
  return (
    <section className="bg-secondary section-padding">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-16">
          <p className="overline-label mb-4">Testimonials</p>
          <h2
            className="section-headline text-foreground max-w-2xl"
            style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4rem)' }}
          >
            Loved by creators on a budget.
          </h2>
        </div>

        <div className="border-t border-border mb-12" aria-hidden="true" />

        {/* Testimonial grid — large quote, minimal decoration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-border border border-border">
          {testimonials.map((t, i) => (
            <div key={t.author} className="flex flex-col p-8 lg:p-10">
              {/* Star rating */}
              <div className="flex gap-0.5 mb-6" aria-label={`${t.stars} out of 5 stars`}>
                {Array.from({ length: t.stars }).map((_, starIdx) => (
                  <Star key={starIdx} className="h-3.5 w-3.5 fill-primary text-primary" aria-hidden="true" />
                ))}
              </div>

              {/* Large quote number — Reluxe geometric accent */}
              <p className="text-xs font-mono text-muted-foreground/40 mb-4 tracking-[0.15em]">
                0{i + 1}
              </p>

              {/* Quote text — larger, more editorial */}
              <blockquote className="font-display text-lg font-semibold text-foreground leading-snug flex-1 mb-8">
                "{t.quote}"
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center gap-3 pt-6 border-t border-border">
                <Avatar className="h-9 w-9 rounded-none">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs rounded-none">
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-bold text-foreground leading-none tracking-wide">{t.author}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 uppercase tracking-[0.1em]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA BANNER SECTION
// ─────────────────────────────────────────────────────────────────────────────

export function CTABanner() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!isValidEmail(trimmed)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <section className="section-padding bg-primary">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — large editorial headline */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/60 mb-5">
              Stay in the loop
            </p>
            <h2
              className="text-primary-foreground mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: '-0.04em',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              }}
            >
              Get early access to new drops.
            </h2>
            <p className="text-primary-foreground/70 text-base leading-relaxed max-w-sm">
              New tracks added weekly. Be the first to hear them — no spam, unsubscribe anytime.
            </p>
          </div>

          {/* Right — email form */}
          <div>
            {submitted ? (
              <div className="flex items-start gap-3 border border-white/20 bg-white/10 px-6 py-5">
                <CheckCircle2 className="h-5 w-5 text-primary-foreground mt-0.5 shrink-0" />
                <p className="text-primary-foreground font-semibold" role="status">
                  You're on the list. We'll notify you when new tracks drop.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
                aria-label="Sign up for Torch Studio"
                noValidate
              >
                <div className="flex flex-col sm:flex-row gap-0">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError('') }}
                    aria-describedby={error ? 'cta-email-error' : undefined}
                    aria-invalid={!!error}
                    className="bg-white/15 border border-white/30 text-white placeholder:text-white/40 focus:border-white focus:ring-white/20 flex-1 h-12 rounded-none border-r-0 text-sm"
                  />
                  <Button
                    type="submit"
                    className="bg-foreground text-background hover:bg-foreground/90 font-bold px-7 shrink-0 h-12 rounded-none tracking-wide uppercase text-sm"
                  >
                    Notify me
                  </Button>
                </div>
                {error && (
                  <p id="cta-email-error" className="text-sm text-primary-foreground/80 font-medium" role="alert">
                    {error}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────

type FooterLink = { label: string; to: string }

const footerColumns: { category: string; links: FooterLink[] }[] = [
  {
    category: 'Product',
    links: [
      { label: 'Browse Catalog', to: '/catalog' },
      { label: 'Creator Studio', to: '/creator-studio' },
      { label: "What's New",     to: '/whats-new' },
    ],
  },
  {
    category: 'Company',
    links: [
      { label: 'About Us', to: '/#about' },
      { label: 'Blog',     to: '/blog' },
      { label: 'Contact',  to: '/support/contact' },
    ],
  },
  {
    category: 'Legal',
    links: [
      { label: 'Terms of Service', to: '/legal/terms' },
      { label: 'Privacy Policy',   to: '/legal/privacy' },
      { label: 'Cookie Policy',    to: '/legal/cookies' },
      { label: 'License FAQ',      to: '/legal/license-faq' },
    ],
  },
  {
    category: 'Support',
    links: [
      { label: 'Help Center', to: '/support/help' },
      { label: 'Status',      to: '/support/status' },
      { label: 'Contact',     to: '/support/contact' },
    ],
  },
]

const socialLinks = [
  { Icon: X,           label: 'X (Twitter)' },
  { Icon: Camera,      label: 'Instagram' },
  { Icon: PlayCircle,  label: 'YouTube' },
]

export function Footer() {
  /* Music attribution modal state — replaces the broken /legal/music page link */
  const [attributionOpen, setAttributionOpen] = useState(false)

  return (
    <footer className="bg-foreground text-secondary pt-16 pb-8">
      <div className="section-container">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-5 group" aria-label="Torch Studio home">
              <div className="flex h-8 w-8 items-center justify-center bg-primary group-hover:bg-accent transition-colors duration-200">
                <Flame className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-base font-bold text-white uppercase tracking-wide">
                Torch Studio
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Quality music at honest prices. For everyone.
            </p>
            {/* Social icons — flat, no rounded corners */}
            <div className="flex gap-2">
              {socialLinks.map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  className="flex h-8 w-8 items-center justify-center bg-white/8 text-muted-foreground hover:bg-primary hover:text-white transition-all duration-200"
                  aria-label={label}
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map(({ category, links }) => (
            <div key={category}>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/50 mb-5">
                {category}
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    {to.startsWith('/#') ? (
                      <a
                        href={to}
                        className="text-sm text-muted-foreground hover:text-white transition-colors duration-150"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        to={to}
                        className="text-sm text-muted-foreground hover:text-white transition-colors duration-150"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Torch Studio, Inc. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Portfolio/mockup site. All music is royalty-free (CC0).{' '}
              {/* Button opens the attribution modal — no broken page navigation */}
              <button
                type="button"
                onClick={() => setAttributionOpen(true)}
                className="underline hover:text-white transition-colors duration-150 text-xs"
              >
                Music Attribution &amp; License Info
              </button>
            </p>
          </div>

          <p className="text-xs text-muted-foreground border border-white/10 px-3 py-1.5 whitespace-nowrap">
            Made for music, priced for people
          </p>
        </div>
      </div>

      {/* Attribution modal — fully dismissible, no broken navigation */}
      <MusicAttributionModal
        isOpen={attributionOpen}
        onClose={() => setAttributionOpen(false)}
      />
    </footer>
  )
}
