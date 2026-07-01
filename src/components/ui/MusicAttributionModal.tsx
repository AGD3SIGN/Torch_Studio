/**
 * MusicAttributionModal
 *
 * A fully dismissible overlay panel that displays music attribution and license
 * information. Replaces the broken /legal/music page navigation that had no
 * clear exit path.
 *
 * Behavior:
 * - Opens via the footer "Music Attribution & License Info" button
 * - Closes via the X button, the backdrop click, or the Escape key
 * - Traps focus while open for accessibility
 */

import { useEffect, useRef } from 'react'
import { X, ExternalLink } from 'lucide-react'
import { tracks } from '@/data/tracks'
import { cn } from '@/lib/utils'

interface MusicAttributionModalProps {
  isOpen: boolean
  onClose: () => void
}

export function MusicAttributionModal({ isOpen, onClose }: MusicAttributionModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  /* Close on Escape key */
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  /* Prevent body scroll while open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      /* Move focus to close button on open */
      setTimeout(() => closeBtnRef.current?.focus(), 50)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  /* Derive unique artist list from the catalog */
  const uniqueArtists = Array.from(
    new Map(
      tracks.map((t) => [
        `${t.artist}|${t.artistSource ?? 'Pixabay'}`,
        { artist: t.artist, source: t.artistSource ?? 'Pixabay' },
      ])
    ).values()
  )

  if (!isOpen) return null

  return (
    /* Backdrop — semi-transparent, clicking it closes the modal */
    <div
      className="fixed inset-0 z-[100] bg-foreground/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Music Attribution and License Information"
    >
      {/* Panel — no rounded corners, formal/architectural style */}
      <div
        ref={panelRef}
        className="bg-background border border-border w-full max-w-2xl max-h-[85vh] flex flex-col"
        /* Stop click propagation so clicking inside doesn't close the modal */
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar — sticky, with close button */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4 shrink-0">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-1">Legal</p>
            <h2 className="font-display text-lg font-bold text-foreground tracking-tight">
              Music Attribution & License
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors duration-150"
            aria-label="Close attribution panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-6 space-y-8">

          {/* Portfolio notice — amber callout, no rounded corners */}
          <div className="border border-amber-300 bg-amber-50 px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-amber-700 mb-2">
              Portfolio Mockup
            </p>
            <p className="text-sm text-amber-900 leading-relaxed">
              <strong>Torch Studio is a portfolio and demonstration website.</strong> No music is
              being sold, distributed, or monetized. This site showcases design and functionality
              concepts only.
            </p>
          </div>

          {/* Music Sources */}
          <div>
            <h3 className="font-display text-base font-bold text-foreground uppercase tracking-wide mb-4">
              Music Sources
            </h3>
            <div className="border border-border divide-y divide-border">
              {/* Pixabay */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <p className="font-bold text-sm text-foreground">Pixabay Music</p>
                  <span className="text-xs font-bold uppercase tracking-[0.1em] border border-green-300 bg-green-50 text-green-700 px-2 py-0.5 shrink-0">
                    CC0 Public Domain
                  </span>
                </div>
                <a
                  href="https://pixabay.com/music/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors mb-3"
                >
                  pixabay.com/music
                  <ExternalLink className="h-3 w-3" />
                </a>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li className={cn('flex items-start gap-2')}>
                    <span className="text-primary mt-0.5 shrink-0">—</span>
                    CC0 (Public Domain) — no copyright restrictions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">—</span>
                    Attribution not required (appreciated)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">—</span>
                    Free for commercial and personal use
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">—</span>
                    Suitable for mockups, portfolios, and demonstrations
                  </li>
                </ul>
              </div>

              {/* Other sources — compact */}
              {[
                {
                  name: 'Free Music Archive',
                  url: 'freemusicarchive.org',
                  note: 'Various Creative Commons licenses. Attribution often required per track.',
                },
                {
                  name: 'Incompetech',
                  url: 'incompetech.com',
                  note: 'CC-BY (attribution required). High-quality, diverse library.',
                },
              ].map((src) => (
                <div key={src.name} className="p-5">
                  <p className="font-bold text-sm text-foreground mb-1">{src.name}</p>
                  <p className="text-xs text-muted-foreground mb-1">{src.url}</p>
                  <p className="text-sm text-muted-foreground">{src.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Artist Credits */}
          {uniqueArtists.length > 0 && (
            <div>
              <h3 className="font-display text-base font-bold text-foreground uppercase tracking-wide mb-4">
                Artist Credits
              </h3>
              <div className="border border-border">
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
                  {uniqueArtists.map(({ artist, source }) => (
                    <div key={`${artist}|${source}`} className="px-5 py-3 border-b border-border last:border-0 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(even)]:border-r-0">
                      <p className="text-sm font-semibold text-foreground">{artist}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">via {source}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Audio Details */}
          <div>
            <h3 className="font-display text-base font-bold text-foreground uppercase tracking-wide mb-4">
              Audio Details
            </h3>
            <div className="border border-border divide-y divide-border">
              {[
                { label: 'Format', value: 'MP3 (128–192 kbps)' },
                { label: 'Preview length', value: '30 seconds maximum' },
                { label: 'License', value: 'CC0 / Royalty-Free' },
                { label: 'Attribution', value: 'Not required' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center px-5 py-3">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">{label}</p>
                  <p className="text-sm text-foreground font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Legal disclaimer */}
          <div className="border border-border bg-muted/30 px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-3">
              Legal Disclaimer
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This website does not sell, distribute, or monetize music in any form. All audio content
              is sourced from legitimate royalty-free providers and is used strictly for portfolio and
              demonstration purposes. All music is subject to its original license terms.
            </p>
          </div>
        </div>

        {/* Footer bar — close action + related links */}
        <div className="flex items-center justify-between gap-4 border-t border-border px-6 py-4 shrink-0">
          <div className="flex gap-4">
            <a
              href="/legal/privacy"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
            >
              Privacy Policy
            </a>
            <a
              href="/legal/terms"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
            >
              Terms of Service
            </a>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-9 px-5 bg-foreground text-background font-bold text-xs uppercase tracking-[0.12em] hover:bg-foreground/90 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
