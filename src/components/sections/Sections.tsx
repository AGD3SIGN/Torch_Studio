/**
 * Torch Studio — Section Components
 * Features · CatalogPreview · Pricing · Testimonials · CTABanner · Footer
 */

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Music, DollarSign, Zap, Play, Pause, Download, Star, Flame, X, Camera, PlayCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────────────────────
// FEATURES SECTION
// ─────────────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: Music,
    title: 'Massive catalog',
    description:
      'Over 100 handpicked tracks across every genre, growing weekly. Lo-fi, cinematic, hip-hop, ambient — find the sound you need.',
    highlight: '100+ tracks',
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
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl font-bold text-foreground mb-4">
            Built for people on a budget,<br className="hidden sm:block" /> not just on paper.
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            We built Torch Studio because music licensing shouldn't require a corporate budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="bg-background border-border shadow-warm hover:-translate-y-1 transition-all duration-300 group"
              >
                <CardHeader className="pb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/15 transition-colors duration-200">
                    <Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
                  </div>
                  <Badge
                    variant="outline"
                    className="w-fit text-xs font-semibold border-primary/20 text-primary bg-primary/5 mb-1"
                  >
                    {feature.highlight}
                  </Badge>
                  <CardTitle className="font-display text-xl font-bold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
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

const tracks = [
  { id: 1,  title: 'Summer Glow',      genre: 'Lo-Fi',      duration: '3:42', price: '$0.99', bpm: 87,  color: '#2D1B69' },
  { id: 2,  title: 'Late Night Drive', genre: 'Ambient',    duration: '4:15', price: '$0.99', bpm: 72,  color: '#0F3460' },
  { id: 3,  title: 'Rooftop Sessions', genre: 'Hip-Hop',    duration: '2:58', price: '$1.99', bpm: 95,  color: '#533483' },
  { id: 4,  title: 'Golden Hour',      genre: 'Indie Pop',  duration: '3:31', price: '$0.99', bpm: 110, color: '#7C2D12' },
  { id: 5,  title: 'Deep Roots',       genre: 'Soul',       duration: '4:44', price: '$1.99', bpm: 82,  color: '#1B4332' },
  { id: 6,  title: 'Neon Fade',        genre: 'Electronic', duration: '5:02', price: '$2.99', bpm: 128, color: '#6B2D8B' },
  { id: 7,  title: 'Midnight Smoke',   genre: 'Jazz',       duration: '4:28', price: '$1.99', bpm: 74,  color: '#1A3A4A' },
  { id: 8,  title: 'Block Party',      genre: 'Trap',       duration: '2:44', price: '$1.99', bpm: 142, color: '#3B1F5E' },
  { id: 9,  title: 'Open Road',        genre: 'Folk',       duration: '3:55', price: '$0.99', bpm: 90,  color: '#1F3D2B' },
  { id: 10, title: 'Gravity Well',     genre: 'Cinematic',  duration: '5:30', price: '$2.99', bpm: 65,  color: '#1C2B4A' },
  { id: 11, title: 'Velvet Season',    genre: 'R&B',        duration: '3:18', price: '$1.99', bpm: 88,  color: '#4A1A2C' },
  { id: 12, title: 'Café Static',      genre: 'Lo-Fi',      duration: '2:51', price: '$0.99', bpm: 83,  color: '#2A3A1A' },
]

const genres = ['All', 'Lo-Fi', 'Hip-Hop', 'Ambient', 'Indie Pop', 'Soul', 'Electronic', 'Jazz', 'Trap', 'Folk', 'Cinematic', 'R&B']

// Pre-compute stable waveform heights per track — deterministic, no Math.random()
const waveformHeights: Record<number, number[]> = Object.fromEntries(
  tracks.map((t) => [
    t.id,
    Array.from({ length: 20 }, (_, i) => 20 + Math.sin(i * 1.2 + t.id) * 14 + ((i * 7 + t.id * 3) % 8)),
  ])
)

export function CatalogPreview() {
  const [activeGenre, setActiveGenre] = useState('All')
  const [playingId, setPlayingId] = useState<number | null>(null)

  const filtered = useMemo(
    () => activeGenre === 'All' ? tracks : tracks.filter((t) => t.genre === activeGenre),
    [activeGenre]
  )

  return (
    <section className="bg-background section-padding" id="catalog-preview">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display text-4xl font-bold text-foreground mb-2">
              What's in the catalog
            </h2>
            <p className="text-muted-foreground text-base">
              Preview any track free. Download the ones you love.
            </p>
          </div>
          <a
            href="#browse"
            className="inline-flex items-center px-4 py-2 rounded-lg border border-border text-sm font-semibold text-foreground hover:bg-secondary transition-colors duration-200 shrink-0"
          >
            View full catalog →
          </a>
        </div>

        {/* Genre filter pills */}
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by genre">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGenre(g)}
              aria-pressed={activeGenre === g}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200',
                activeGenre === g
                  ? 'bg-primary text-primary-foreground border-primary shadow-amber'
                  : 'bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
              )}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Track list */}
        <div className="flex flex-col gap-2" role="list" aria-label="Tracks">
          {filtered.map((track) => (
            <div
              key={track.id}
              role="listitem"
              className="flex items-center gap-4 p-3 sm:p-4 rounded-xl border border-border bg-background hover:bg-secondary transition-all duration-200 group"
            >
              {/* Play/Pause button — the only interactive element in the row */}
              <button
                onClick={() => setPlayingId(playingId === track.id ? null : track.id)}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-opacity"
                style={{ backgroundColor: track.color }}
                aria-label={playingId === track.id ? `Pause ${track.title}` : `Play ${track.title}`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/20 hover:bg-white/30 transition-colors">
                  {playingId === track.id ? (
                    <Pause className="h-3.5 w-3.5 text-white fill-white" strokeWidth={0} />
                  ) : (
                    <Play className="h-3.5 w-3.5 text-white fill-white ml-0.5" strokeWidth={0} />
                  )}
                </span>
              </button>

              {/* Track info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{track.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant="outline" className="text-xs py-0 border-border text-muted-foreground">
                    {track.genre}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{track.bpm} BPM</span>
                </div>
              </div>

              {/* Waveform (decorative, stable heights) */}
              <div className="hidden sm:flex items-end gap-0.5 h-8 w-20" aria-hidden="true">
                {waveformHeights[track.id].map((height, i) => (
                  <div
                    key={i}
                    className={cn(
                      'w-0.5 rounded-full bg-muted transition-all duration-200',
                      playingId === track.id && 'bg-primary waveform-bar',
                    )}
                    style={{
                      height: `${height}%`,
                      animationDelay: `${(i % 10) * 0.06}s`,
                    }}
                  />
                ))}
              </div>

              {/* Duration */}
              <span className="hidden sm:block text-xs text-muted-foreground font-mono w-8">
                {track.duration}
              </span>

              {/* Price + download */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-sm font-bold text-primary">{track.price}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-primary hover:text-primary-foreground"
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
    description: 'Preview everything, buy what you love.',
    features: [
      '5 track previews per day',
      'Browse full catalog',
      'Save to wishlist',
      'Buy individual tracks',
      'Community access',
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
    <section className="bg-secondary section-padding" id="pricing">
      <div className="section-container">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl font-bold text-foreground mb-4">
            Simple, honest pricing.
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            No tricks. No hidden fees. Cancel anytime — no questions asked.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                'relative flex flex-col bg-background border transition-all duration-300',
                plan.highlighted
                  ? 'border-primary shadow-amber ring-1 ring-primary/20 -translate-y-2'
                  : 'border-border shadow-warm hover:-translate-y-1'
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground font-bold px-4 py-0.5 shadow-amber">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="pt-7 pb-4">
                <CardTitle className="font-display text-xl font-bold text-foreground">
                  {plan.name}
                </CardTitle>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className={cn('font-display text-4xl font-bold', plan.highlighted ? 'text-primary' : 'text-foreground')}>
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">{plan.period}</span>
                </div>
                <CardDescription className="text-sm text-muted-foreground mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col flex-1 gap-6">
                <ul className="flex flex-col gap-2.5 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-foreground">
                      <span className={cn('mt-0.5 shrink-0', plan.highlighted ? 'text-primary' : 'text-muted-foreground')} aria-hidden="true">✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.highlighted ? 'default' : 'outline'}
                  className={cn(
                    'w-full font-semibold transition-all duration-200',
                    plan.highlighted && 'bg-primary text-primary-foreground hover:bg-accent shadow-amber'
                  )}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          All plans include a 14-day free trial. No credit card required for Free tier.
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
    <section className="bg-background section-padding">
      <div className="section-container">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl font-bold text-foreground mb-4">
            Loved by creators on a budget.
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Real people, real projects, real savings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card
              key={t.author}
              className="bg-secondary border-border shadow-warm hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <CardContent className="flex flex-col flex-1 gap-4 pt-6">
                <div className="flex gap-0.5" aria-label={`${t.stars} out of 5 stars`}>
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />
                  ))}
                </div>

                <blockquote className="text-sm text-foreground leading-relaxed flex-1">
                  "{t.quote}"
                </blockquote>

                <div className="flex items-center gap-3 pt-2 border-t border-border">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                      {t.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-none">{t.author}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA BANNER SECTION
// ─────────────────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function CTABanner() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!EMAIL_RE.test(trimmed)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <section className="section-padding bg-primary">
      <div className="section-container text-center">
        <div className="flex justify-center mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 border border-white/20">
            <Flame className="h-7 w-7 text-white" strokeWidth={1.75} />
          </div>
        </div>

        <h2 className="font-display text-4xl font-bold text-white mb-4 max-w-2xl mx-auto">
          Start listening for free today.
        </h2>
        <p className="text-lg text-white/80 mb-10 max-w-md mx-auto">
          No credit card required. 5 free track previews every day.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-xl px-6 py-4">
            <span className="text-white font-semibold" role="status">
              You're in! We'll be in touch shortly.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 max-w-md mx-auto"
            aria-label="Sign up for Torch Studio"
            noValidate
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
                aria-describedby={error ? 'cta-email-error' : undefined}
                aria-invalid={!!error}
                className="bg-white/15 border-white/30 text-white placeholder:text-white/50 focus:border-white focus:ring-white/30 flex-1"
              />
              <Button
                type="submit"
                className="bg-white text-primary hover:bg-white/90 font-bold px-6 shrink-0 transition-colors duration-200"
              >
                Create your account
              </Button>
            </div>
            {error && (
              <p id="cta-email-error" className="text-sm text-white/90 font-medium text-left" role="alert">
                {error}
              </p>
            )}
          </form>
        )}
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
      { label: 'Browse Catalog',   to: '/catalog' },
      { label: 'Creator Studio',   to: '/creator-studio' },
      { label: "What's New",       to: '/whats-new' },
    ],
  },
  {
    category: 'Company',
    links: [
      { label: 'About Us',  to: '/#about' },
      { label: 'Blog',      to: '/blog' },
      { label: 'Contact',   to: '/support/contact' },
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
  return (
    <footer className="bg-foreground text-secondary pt-16 pb-8">
      <div className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Flame className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold text-white">Torch Studio</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Quality music at honest prices. For everyone.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-muted-foreground hover:bg-primary hover:text-white transition-all duration-200"
                  aria-label={label}
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map(({ category, links }) => (
            <div key={category}>
              <h3 className="font-display text-sm font-semibold text-white mb-4">{category}</h3>
              <ul className="flex flex-col gap-2.5">
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

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Torch Studio, Inc. All rights reserved.
          </p>
          <Badge variant="outline" className="border-white/20 text-muted-foreground text-xs">
            Made for music, priced for people
          </Badge>
        </div>
      </div>
    </footer>
  )
}
