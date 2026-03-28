import { PageLayout } from '@/components/layout/PageLayout'
import { cn } from '@/lib/utils'

interface Release {
  version: string
  date: string
  label: 'Major' | 'Minor' | 'Patch'
  title: string
  highlights: string[]
  fixes?: string[]
}

const releases: Release[] = [
  {
    version: 'v1.3.0',
    date: 'March 2024',
    label: 'Minor',
    title: 'Catalog Filters & BPM Range',
    highlights: [
      'Added BPM range slider to catalog sidebar filters.',
      'New mood-tag filter pills — quickly find tracks by Energy, Chill, Dark, Uplifting, and more.',
      'Sort by Newest, Price (low–high), and BPM.',
      'Catalog now loads 30 tracks at a time with a "Load more" button for faster initial paint.',
    ],
    fixes: [
      'Fixed audio preview not stopping when a second track is played.',
      'Fixed mobile filter drawer overlapping the navbar on small screens.',
    ],
  },
  {
    version: 'v1.2.0',
    date: 'February 2024',
    label: 'Minor',
    title: 'Blog & Creator Spotlights',
    highlights: [
      'Launched the Torch Studio Blog with guides, tips, and creator spotlights.',
      'Six launch articles covering royalty-free licensing, lo-fi productivity, YouTube copyright, and more.',
      'Category filter on the blog index page.',
    ],
    fixes: [
      'Fixed incorrect read-time estimates on long articles.',
    ],
  },
  {
    version: 'v1.1.0',
    date: 'January 2024',
    label: 'Minor',
    title: 'Cinematic Genre Expansion',
    highlights: [
      'Added 40 new cinematic tracks — tension, epic, melancholic, and action sub-genres.',
      'New "Cinematic" genre tag and filter in the catalog.',
      'Updated homepage catalog preview to showcase the new genre.',
    ],
  },
  {
    version: 'v1.0.1',
    date: 'December 2023',
    label: 'Patch',
    title: 'Accessibility & Performance',
    highlights: [
      'Added skip-to-content link for keyboard and screen reader users.',
      'Improved focus ring visibility across all interactive elements.',
      'Reduced homepage bundle size by 18% via dynamic imports.',
    ],
    fixes: [
      'Fixed missing alt text on hero mosaic tiles.',
      'Fixed color contrast on muted-foreground text in dark mode.',
    ],
  },
  {
    version: 'v1.0.0',
    date: 'November 2023',
    label: 'Major',
    title: 'Public Launch',
    highlights: [
      'Torch Studio launches publicly with 110 tracks across 11 genres.',
      'CC0 licensing on every track — no attribution, no royalties, no restrictions.',
      'Hero audio previews — 30-second clips directly on the homepage.',
      'Full catalog page with genre, mood, duration, and price filters.',
      'Pricing tiers: Starter ($4.99/mo), Creator ($12.99/mo), Studio ($29/mo).',
    ],
  },
  {
    version: 'v0.3.0',
    date: 'October 2023',
    label: 'Minor',
    title: 'Dark Mode & Legal Pages',
    highlights: [
      'Added dark mode with full design token support.',
      'New legal pages: Terms of Service, Privacy Policy, Cookie Policy, License FAQ.',
      'Support section with Help Center, Status page, and Contact form.',
      'Accordion-based Help Center with 21 Q&A items across 4 categories.',
    ],
  },
  {
    version: 'v0.2.0',
    date: 'September 2023',
    label: 'Minor',
    title: 'Auth & Download Flow',
    highlights: [
      'Sign-in and registration with password strength indicator.',
      'Account-gated downloads — free accounts can download any CC0 track.',
      'Download progress indicator with checkmark confirmation.',
      'Auth-aware Navbar with user menu (initials avatar, sign out).',
    ],
    fixes: [
      'Fixed page title not updating on navigation.',
    ],
  },
  {
    version: 'v0.1.0',
    date: 'August 2023',
    label: 'Major',
    title: 'Private Beta',
    highlights: [
      'Initial private beta with 40 lo-fi and ambient tracks.',
      'Static homepage with hero, features, pricing, and testimonials.',
      'Basic catalog page with genre filter.',
      'Warm amber brand identity — Fraunces display font, Nunito body font.',
    ],
  },
]

const labelColors: Record<Release['label'], string> = {
  Major: 'bg-primary text-primary-foreground',
  Minor: 'bg-secondary text-secondary-foreground',
  Patch: 'bg-muted text-muted-foreground',
}

export function WhatsNewPage() {
  return (
    <PageLayout title="What's New — Torch Studio">
      {/* Header */}
      <div className="bg-secondary/40 border-b border-border">
        <div className="section-container py-10">
          <h1 className="font-display text-3xl font-bold text-foreground">What's New</h1>
          <p className="mt-2 text-muted-foreground text-sm">
            Release notes and changelog for Torch Studio.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="section-container py-14">
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-0 top-2 bottom-2 w-px bg-border hidden sm:block"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-12">
            {releases.map((release) => (
              <div key={release.version} className="sm:pl-10 relative">
                {/* Dot */}
                <div
                  className="absolute left-0 top-1.5 h-2.5 w-2.5 -translate-x-[5px] rounded-full bg-primary ring-4 ring-background hidden sm:block"
                  aria-hidden="true"
                />

                <div className="flex flex-col gap-3">
                  {/* Version + label + date */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-foreground">
                      {release.version}
                    </span>
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-xs font-semibold',
                        labelColors[release.label]
                      )}
                    >
                      {release.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{release.date}</span>
                  </div>

                  {/* Card */}
                  <div className="rounded-xl border border-border bg-background p-5 shadow-warm-sm">
                    <h2 className="font-display text-lg font-bold text-foreground mb-4">
                      {release.title}
                    </h2>

                    {/* Highlights */}
                    <ul className="flex flex-col gap-1.5 mb-0">
                      {release.highlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Fixes */}
                    {release.fixes && release.fixes.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                          Bug fixes
                        </p>
                        <ul className="flex flex-col gap-1.5">
                          {release.fixes.map((fix, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" aria-hidden="true" />
                              {fix}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
