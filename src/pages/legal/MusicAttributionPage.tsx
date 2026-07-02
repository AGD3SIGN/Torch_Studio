/**
 * MusicAttributionPage — /legal/music
 *
 * Direct URL version of the attribution information.
 * Uses LegalPageLayout so it has a clear "Back to home" navigation link.
 * The same content is also available via MusicAttributionModal from the footer
 * without needing to navigate away.
 */

import { ExternalLink } from 'lucide-react'
import { LegalPageLayout } from '@/components/layout/LegalPageLayout'
import { tracks } from '@/data/tracks'

export function MusicAttributionPage() {
  const uniqueArtists = Array.from(
    new Map(
      tracks.map((t) => [
        `${t.artist}|${t.artistSource ?? 'Pixabay'}`,
        { artist: t.artist, source: t.artistSource ?? 'Pixabay' },
      ])
    ).values()
  )

  return (
    <LegalPageLayout pageTitle="Music Attribution & License" lastUpdated="June 2026">
      <div className="space-y-8">

        {/* Mockup notice */}
        <div className="border border-amber-300 bg-amber-50 px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-amber-700 mb-2">
            Portfolio Mockup
          </p>
          <p className="text-sm text-amber-900 leading-relaxed">
            <strong>Torch Studio is a portfolio and demonstration website.</strong> No music is being
            sold, distributed, or monetized. This site showcases design and functionality concepts only.
          </p>
          <p className="text-sm text-amber-900 leading-relaxed mt-2">
            All audio tracks are sourced from royalty-free providers with appropriate licenses for
            demonstration and mockup use.
          </p>
        </div>

        {/* Music Sources */}
        <div>
          <h2>Music Sources</h2>

          <div className="border border-border divide-y divide-border mt-4">
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
                <li>— CC0 (Public Domain) — no copyright restrictions</li>
                <li>— Attribution not required (but appreciated)</li>
                <li>— Free for commercial and personal use</li>
                <li>— Can be used in mockups, portfolios, and demonstrations</li>
                <li>— No royalties or licensing fees required</li>
              </ul>
            </div>

            {/* Free Music Archive */}
            <div className="p-5">
              <p className="font-bold text-sm text-foreground mb-1">Free Music Archive</p>
              <p className="text-xs text-muted-foreground mb-2">freemusicarchive.org</p>
              <p className="text-sm text-muted-foreground">
                Various Creative Commons licenses. Each track specifies its license. Attribution often required.
              </p>
            </div>

            {/* Incompetech */}
            <div className="p-5">
              <p className="font-bold text-sm text-foreground mb-1">Incompetech</p>
              <p className="text-xs text-muted-foreground mb-2">incompetech.com</p>
              <p className="text-sm text-muted-foreground">
                Creative Commons CC-BY (attribution required). High-quality library with great diversity.
              </p>
            </div>
          </div>
        </div>

        {/* Artist Credits */}
        <div>
          <h2>Artist Credits</h2>
          <div className="border border-border mt-4">
            {uniqueArtists.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y divide-border">
                {uniqueArtists.map(({ artist, source }) => (
                  <div
                    key={`${artist}|${source}`}
                    className="px-5 py-3 border-b border-border last:border-0"
                  >
                    <p className="font-semibold text-sm text-foreground">{artist}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">via {source}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="p-5 text-sm text-muted-foreground">
                Artist credits will appear here when music is added to the catalog.
              </p>
            )}
          </div>
        </div>

        {/* Audio Details */}
        <div>
          <h2>Audio Details</h2>
          <div className="border border-border divide-y divide-border mt-4">
            {[
              { label: 'Format',          value: 'MP3 (128–192 kbps)' },
              { label: 'Preview length',  value: '30 seconds maximum' },
              { label: 'License',         value: 'CC0 / Royalty-Free' },
              { label: 'Attribution',     value: 'Not required' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center px-5 py-3">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">{label}</p>
                <p className="text-sm text-foreground font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="border border-border bg-muted/30 px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-3">
            Legal Disclaimer
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            This website does not sell, distribute, or monetize music in any form. All audio content
            is sourced from legitimate royalty-free providers and is used strictly for portfolio and
            demonstration purposes.
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>— This is a mockup/portfolio site, not a real music distribution platform</li>
            <li>— No actual purchase or download of music occurs</li>
            <li>— All music is subject to its original license terms</li>
            <li>— The site owner respects all copyright and intellectual property rights</li>
          </ul>
        </div>
      </div>
    </LegalPageLayout>
  )
}
