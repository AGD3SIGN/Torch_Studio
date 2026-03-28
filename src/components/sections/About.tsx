/**
 * Torch Studio — About Section
 * Pattern: Mission Statement → Values Grid → Stats Row
 *
 * Structure:
 *  1. Brand story / mission block (editorial, warm, personal)
 *  2. 3-column values/beliefs grid with icon cards
 *  3. Stats row (4 key numbers)
 */

import { Flame, Heart, Users, Globe, Music, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

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
  { value: '100+',  label: 'Tracks in the catalog', icon: Music },
  { value: '1,200+', label: 'Independent creators', icon: Users },
  { value: '$0.99', label: 'Starting price per track', icon: Flame },
  { value: '12',    label: 'Genres and counting', icon: Globe },
]

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function About() {
  return (
    <section className="bg-secondary section-padding" id="about">
      <div className="section-container">

        {/* ── 1. Mission / Brand Story ───────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">

          {/* Left — editorial headline */}
          <div className="animate-fade-in">
            <Badge
              variant="outline"
              className="border-primary/30 text-primary bg-primary/8 font-semibold text-xs tracking-wide px-3 py-1 mb-6"
            >
              Our story
            </Badge>
            <h2 className="font-display text-4xl font-bold text-foreground leading-tight mb-6">
              We made this because{' '}
              <span className="text-primary">music licensing was broken</span>{' '}
              for the rest of us.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-4">
              Torch Studio started as a frustration. We kept watching talented filmmakers,
              podcasters, and indie creators either skip music altogether or burn hours hunting
              for royalty-free loops that sounded like elevator hold music.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              So we built a platform where the prices are honest, the catalog is deep, and the
              whole experience feels less like filing a legal brief and more like asking a friend
              who always has great music recs. That's Torch Studio — a torch passed between
              artists and the people who love what they make.
            </p>
          </div>

          {/* Right — decorative brand card */}
          <div
            className="animate-slide-up"
            style={{ animationDelay: '0.15s' }}
            aria-hidden="true"
          >
            <div className="relative rounded-2xl bg-background border border-border shadow-warm-md overflow-hidden">
              {/* Warm radial background glow */}
              <div
                className="absolute -top-16 -right-16 h-64 w-64 rounded-full opacity-20 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, hsl(22 70% 51% / 0.5) 0%, transparent 70%)',
                }}
              />

              <div className="relative p-8">
                {/* Flame icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-amber mb-6">
                  <Flame className="h-7 w-7 text-primary-foreground" strokeWidth={1.75} />
                </div>

                <blockquote className="font-display text-2xl font-semibold text-foreground leading-snug mb-4">
                  "Quality music at honest prices. For everyone."
                </blockquote>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  That's the whole mission. We measure every decision against it —
                  whether it's a pricing tier, a new catalog section, or how we handle
                  a licensing question at 11pm on a Friday.
                </p>

                <Separator className="mb-6 bg-border" />

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                    <span className="font-display text-sm font-bold text-primary">TS</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-none">The Torch Studio team</p>
                    <p className="text-xs text-muted-foreground mt-1">Building in the open since 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. Values Grid ─────────────────────────────────────────────── */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="font-display text-3xl font-semibold text-foreground mb-3">
              What we believe
            </h3>
            <p className="text-muted-foreground text-base max-w-md mx-auto">
              Three things we won't compromise on, no matter how fast we grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <Card
                  key={value.title}
                  className="bg-background border-border shadow-warm hover:-translate-y-1 transition-all duration-300 group"
                >
                  <CardContent className="pt-6 pb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/15 transition-colors duration-200">
                      <Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
                    </div>
                    <Badge
                      variant="outline"
                      className="w-fit text-xs font-semibold border-primary/20 text-primary bg-primary/5 mb-3"
                    >
                      {value.badge}
                    </Badge>
                    <h4 className="font-display text-xl font-bold text-foreground mb-2 leading-snug">
                      {value.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* ── 3. Stats Row ───────────────────────────────────────────────── */}
        <div className="rounded-2xl bg-background border border-border shadow-warm overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x divide-border">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center gap-2 px-6 py-8 text-center group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 mb-1 group-hover:bg-primary/15 transition-colors duration-200">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                  </div>
                  <span className="font-display text-3xl font-bold text-foreground tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium leading-snug max-w-[10ch] mx-auto">
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
