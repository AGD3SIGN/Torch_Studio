/**
 * Torch Studio — About Section
 * Pattern: Mission Statement → Values Grid → Stats Row
 *
 * Redesigned for formal, editorial aesthetic:
 * — Overline labels + bold section headlines
 * — Borderless card-free layout for values (column dividers, not card shadows)
 * — Stats row with large typographic numbers
 */

import { Flame, Heart, Users, Globe, Music, Zap } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const values = [
  {
    icon: Music,
    title: 'Music for everyone',
    description:
      "Great soundtracks shouldn't be gated behind industry budgets. We built a catalog priced low enough for bedroom creators and curated well enough for big productions.",
    badge: 'Open access',
  },
  {
    icon: Heart,
    title: 'Fair for artists',
    description:
      'Every track comes from an independent artist who deserves to be paid. We keep licensing straightforward so creators on both sides of the deal can just make things.',
    badge: 'Creator-first',
  },
  {
    icon: Zap,
    title: 'Built with heart',
    description:
      "No dark patterns, no surprise fees, no upsells mid-checkout. Torch Studio is built the way we'd want a music platform to be built — with honesty baked in from day one.",
    badge: 'No nonsense',
  },
]

const stats = [
  { value: '150+',   label: 'Tracks in the catalog', icon: Music },
  { value: '1,200+', label: 'Creators served',         icon: Users },
  { value: '$0.99',  label: 'Starting price per track', icon: Flame },
  { value: '12',     label: 'Genres and counting',      icon: Globe },
]

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function About() {
  return (
    <section className="bg-secondary section-padding" id="about">
      <div className="section-container">

        {/* ── 1. Mission / Brand Story ───────────────────────────────────── */}
        <div className="mb-20">
          <p className="overline-label mb-5">Our story</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left — editorial headline */}
            <div>
              <h2
                className="text-foreground mb-8"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  lineHeight: 0.92,
                  letterSpacing: '-0.04em',
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                }}
              >
                We made this because music licensing was{' '}
                <span className="text-primary">broken</span>{' '}
                for the rest of us.
              </h2>

              <div className="border-l-2 border-primary/50 pl-5 mb-6">
                <p className="text-base text-muted-foreground leading-relaxed">
                  Torch Studio started as a frustration. We kept watching talented filmmakers,
                  podcasters, and indie creators either skip music altogether or burn hours hunting
                  for royalty-free loops that sounded like elevator hold music.
                </p>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                So we built a platform where the prices are honest, the catalog is deep, and the
                whole experience feels less like filing a legal brief and more like asking a friend
                who always has great music recs.
              </p>
            </div>

            {/* Right — brand mission block — architectural, no decorative gradients */}
            <div
              className="border border-border bg-background p-8 lg:p-10"
              aria-hidden="true"
            >
              {/* Flame icon — flat, no shadow */}
              <div className="flex h-12 w-12 items-center justify-center bg-primary mb-7">
                <Flame className="h-6 w-6 text-primary-foreground" strokeWidth={1.75} />
              </div>

              <blockquote
                className="font-display font-bold text-foreground leading-tight mb-6"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', letterSpacing: '-0.02em' }}
              >
                "Quality music at honest prices. For everyone."
              </blockquote>

              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                That's the whole mission. We measure every decision against it —
                whether it's a pricing tier, a new catalog section, or how we handle
                a licensing question at 11pm on a Friday.
              </p>

              <div className="border-t border-border pt-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center border border-border">
                  <span className="font-display text-xs font-bold text-primary">TS</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground leading-none tracking-wide">
                    The Torch Studio team
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 uppercase tracking-[0.1em]">
                    Building in the open since 2024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. Values Grid ─────────────────────────────────────────────── */}
        <div className="mb-16">
          <p className="overline-label mb-4">What we believe</p>
          <p className="text-muted-foreground text-base mb-10 max-w-md">
            Three things we won't compromise on, no matter how fast we grow.
          </p>

          {/* Values as bordered columns — no individual card shadows */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border divide-y md:divide-y-0 md:divide-x divide-border">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <div key={value.title} className="p-8 lg:p-10 group">
                  <p className="text-xs font-mono text-muted-foreground/40 mb-5 tracking-[0.15em]">
                    0{i + 1}
                  </p>

                  <div className="flex h-11 w-11 items-center justify-center bg-primary/10 mb-5 group-hover:bg-primary/15 transition-colors duration-200">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary mb-3">
                    {value.badge}
                  </p>

                  <h4 className="font-display text-xl font-bold text-foreground mb-3 leading-snug">
                    {value.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── 3. Stats Row — large typographic numbers ──────────────────── */}
        <div className="border border-border bg-background overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x divide-border">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center gap-1 px-6 py-10 text-center group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex h-9 w-9 items-center justify-center bg-primary/10 mb-2 group-hover:bg-primary/15 transition-colors duration-200">
                    <Icon className="h-4 w-4 text-primary" strokeWidth={1.75} />
                  </div>
                  {/* Large dramatic number */}
                  <span
                    className="font-display font-black text-foreground tracking-tight"
                    style={{ fontSize: 'clamp(2rem, 3vw, 2.75rem)', letterSpacing: '-0.035em' }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-[0.1em] leading-snug max-w-[12ch] mx-auto mt-1">
                    {stat.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
