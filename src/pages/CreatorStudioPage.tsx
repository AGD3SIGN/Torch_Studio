import { useState } from 'react'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'
import {
  Flame,
  Wand2,
  BarChart3,
  Globe,
  ShieldCheck,
  Headphones,
  Zap,
  Check,
  ArrowRight,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PageLayout } from '@/components/layout/PageLayout'
import { cn } from '@/lib/utils'

/* ── Features ─────────────────────────────────────────────────────────────── */
const features = [
  {
    icon: Wand2,
    title: 'Smart Track Recommendations',
    description:
      'Describe your project and our AI suggests tracks that match your tone, pacing, and genre — no manual browsing required.',
  },
  {
    icon: BarChart3,
    title: 'Usage Analytics',
    description:
      "See which tracks you've used across projects, how often, and in which contexts. Stay organized as your library grows.",
  },
  {
    icon: Globe,
    title: 'Project Workspaces',
    description:
      'Create dedicated workspaces per project — film, podcast, game, brand — and keep track assets organized.',
  },
  {
    icon: ShieldCheck,
    title: 'License Vault',
    description:
      'Every download you make is stored with its CC0 certificate in your License Vault — ready to produce in any dispute.',
  },
  {
    icon: Headphones,
    title: 'Extended Previews',
    description:
      'Full-length previews (up to 3 minutes) so you can hear exactly how a track fits before you download.',
  },
  {
    icon: Zap,
    title: 'Bulk Download',
    description:
      'Download entire genre collections or curated playlists with one click. No more downloading one track at a time.',
  },
]

/* ── Pricing ──────────────────────────────────────────────────────────────── */
const plans = [
  {
    name: 'Creator Pro',
    price: '$12.99',
    period: '/mo',
    description: 'For serious solo creators who want the full Torch Studio experience.',
    features: [
      'All 150+ catalog tracks',
      'Full-length previews',
      'License Vault',
      'Track recommendations',
      'Up to 3 project workspaces',
    ],
    highlighted: false,
    cta: 'Get Creator Pro',
  },
  {
    name: 'Studio',
    price: '$29',
    period: '/mo',
    description: 'For teams and professional studios with high-volume needs.',
    features: [
      'Everything in Creator Pro',
      'Unlimited project workspaces',
      'Bulk download',
      'Usage analytics dashboard',
      'Priority support',
      'Early access to new tracks',
    ],
    highlighted: true,
    cta: 'Get Studio',
  },
]

/* ── Steps ────────────────────────────────────────────────────────────────── */
const steps = [
  {
    number: '01',
    title: 'Create your workspace',
    description: 'Name your project and pick a genre focus. Creator Studio sets up a tailored environment.',
  },
  {
    number: '02',
    title: 'Discover tracks',
    description: 'Browse recommendations, search by mood and BPM, or describe your scene and let AI suggest.',
  },
  {
    number: '03',
    title: 'Download & go',
    description: 'One click to download with your CC0 license automatically added to your License Vault.',
  },
]

/* ── Early Access Modal ───────────────────────────────────────────────────── */
function EarlyAccessModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
    toast.success("You're on the list! We'll be in touch soon.")
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Early access sign-up"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-background border border-border shadow-warm-lg p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-display text-xl font-bold text-foreground mb-2">You're on the list!</h2>
            <p className="text-muted-foreground text-sm">
              We'll email you at <strong>{email}</strong> when Creator Studio early access opens.
            </p>
            <button
              onClick={onClose}
              className="mt-6 text-sm text-primary hover:underline"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
                <Flame className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold text-foreground">Creator Studio</span>
            </div>
            <h2 className="font-display text-xl font-bold text-foreground mb-2">
              Join the Early Access List
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Be the first to try Creator Studio when it launches. Early access members get 30 days free on any paid plan.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address"
              />
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-accent font-semibold"
              >
                Request early access
              </Button>
            </form>
            <p className="mt-4 text-xs text-muted-foreground text-center">
              No spam. Unsubscribe any time. See our{' '}
              <Link to="/legal/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </>
        )}
      </div>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export function CreatorStudioPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <PageLayout title="Creator Studio — Torch Studio">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-secondary/60 to-background border-b border-border">
        <div className="section-container py-20 lg:py-28 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-6">
            <Zap className="h-3.5 w-3.5" aria-hidden="true" />
            Coming soon — join the early access list
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight max-w-3xl mx-auto">
            A smarter workspace for serious creators
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Creator Studio brings AI-assisted track discovery, project workspaces, license management, and analytics — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-accent font-semibold"
              onClick={() => setModalOpen(true)}
            >
              Request early access <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center h-9 gap-1.5 px-2.5 rounded-lg border border-border bg-background text-sm font-medium hover:bg-muted transition-colors"
            >
              Browse catalog
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Everything you need, nothing you don't
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
              Creator Studio is designed for the way creative professionals actually work.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-background p-6 shadow-warm-sm hover:shadow-warm transition-shadow duration-200"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-secondary/30 border-y border-border">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground">How it works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <div key={step.number} className="flex flex-col items-center text-center relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-6 left-[calc(50%+2rem)] right-[-2rem] h-px bg-border"
                    aria-hidden="true"
                  />
                )}
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-mono text-sm font-bold mb-4 z-10">
                  {step.number}
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground">Simple pricing</h2>
            <p className="mt-3 text-muted-foreground">Start free, upgrade when you're ready.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  'relative rounded-2xl border p-7 flex flex-col',
                  plan.highlighted
                    ? 'border-primary shadow-amber bg-background'
                    : 'border-border bg-background shadow-warm-sm'
                )}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                    Most popular
                  </div>
                )}
                <h3 className="font-display text-xl font-bold text-foreground">{plan.name}</h3>
                <div className="mt-2 flex items-end gap-0.5">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground text-sm mb-1">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>

                <ul className="mt-5 flex flex-col gap-2 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    'mt-7 w-full font-semibold',
                    plan.highlighted
                      ? 'bg-primary text-primary-foreground hover:bg-accent'
                      : ''
                  )}
                  variant={plan.highlighted ? 'default' : 'outline'}
                  onClick={() => setModalOpen(true)}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Early access members get 30 days free on any plan.{' '}
            <button onClick={() => setModalOpen(true)} className="text-primary hover:underline">
              Join the list →
            </button>
          </p>
        </div>
      </section>

      {/* ── Early Access CTA Banner ───────────────────────────────────────── */}
      <section className="bg-primary">
        <div className="section-container py-16 text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-3">
            Be first in the door
          </h2>
          <p className="text-primary-foreground/80 max-w-md mx-auto mb-8">
            Early access members get 30 days free, exclusive founding-member pricing, and a direct line to the team.
          </p>
          <Button
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-secondary font-semibold"
            onClick={() => setModalOpen(true)}
          >
            Request early access
          </Button>
        </div>
      </section>

      {/* Modal */}
      <EarlyAccessModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </PageLayout>
  )
}
