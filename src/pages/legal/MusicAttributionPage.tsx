import { Link } from 'react-router-dom'
import { PageLayout } from '@/components/layout/PageLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function MusicAttributionPage() {
  return (
    <PageLayout title="Music Attribution & License — Torch Studio">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div>
            <h1 className="font-display text-4xl font-bold mb-2">Music Attribution & License</h1>
            <p className="text-lg text-muted-foreground">
              All music on Torch Studio is sourced from royalty-free providers. This is a portfolio/mockup site.
            </p>
          </div>
        </div>

        {/* Mockup Notice */}
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-amber-900">Portfolio Mockup Notice</CardTitle>
          </CardHeader>
          <CardContent className="text-amber-900 space-y-3">
            <p>
              <strong>Torch Studio is a portfolio/demonstration website.</strong> No music is being sold,
              distributed, or monetized. This site showcases design and functionality concepts only.
            </p>
            <p>
              All audio tracks are sourced from royalty-free providers with appropriate licenses for
              demonstration and mockup use.
            </p>
          </CardContent>
        </Card>

        {/* License Info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Music Sources</h2>

            {/* Pixabay */}
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Pixabay Music
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    CC0 Public Domain
                  </Badge>
                </CardTitle>
                <CardDescription>https://pixabay.com/music/</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold text-sm mb-2">License Terms:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>CC0 (Public Domain) - No copyright restrictions</li>
                    <li>Attribution not required (but appreciated)</li>
                    <li>Free for commercial and personal use</li>
                    <li>Can be used in mockups, portfolios, and demonstrations</li>
                    <li>No royalties or licensing fees required</li>
                  </ul>
                </div>
                <p className="text-sm">
                  Pixabay Music is ideal for portfolio sites because all tracks are CC0, requiring no attribution
                  or licensing agreements.
                </p>
              </CardContent>
            </Card>

            {/* Alternative Sources */}
            <Card>
              <CardHeader>
                <CardTitle>Alternative Sources</CardTitle>
                <CardDescription>Other royalty-free providers we use or recommend</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold text-sm mb-2">Free Music Archive (freemusicarchive.org)</p>
                  <p className="text-sm text-muted-foreground">
                    Various Creative Commons licenses. Each track specifies its license. Attribution often required.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-sm mb-2">Incompetech (incompetech.com)</p>
                  <p className="text-sm text-muted-foreground">
                    Creative Commons CC-BY (attribution required). High-quality library with great diversity.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-sm mb-2">YouTube Audio Library</p>
                  <p className="text-sm text-muted-foreground">
                    Free audio for YouTube creators. Some tracks require attribution. Sign in with Google account.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Audio Details */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Audio Details</h2>
          <Card>
            <CardHeader>
              <CardTitle>Track Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-muted-foreground">Format</p>
                  <p>MP3 (128-192 kbps)</p>
                </div>
                <div>
                  <p className="font-semibold text-muted-foreground">Preview Length</p>
                  <p>30 seconds maximum</p>
                </div>
                <div>
                  <p className="font-semibold text-muted-foreground">License</p>
                  <p>CC0 / Royalty-Free</p>
                </div>
                <div>
                  <p className="font-semibold text-muted-foreground">Attribution</p>
                  <p>Not required</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Legal Disclaimer */}
        <Card className="border-slate-200 bg-slate-50">
          <CardHeader>
            <CardTitle className="text-lg">Legal Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <p>
              This website does not sell, distribute, or monetize music in any form. All audio content is sourced
              from legitimate royalty-free providers and is used strictly for portfolio and demonstration purposes.
            </p>
            <p>
              Users accessing this site agree that:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>This is a mockup/portfolio site, not a real music distribution platform</li>
              <li>No actual purchase or download of music occurs</li>
              <li>All music is subject to its original license terms</li>
              <li>The site owner respects all copyright and intellectual property rights</li>
            </ul>
            <p className="pt-2">
              For questions about music licensing or use, please refer to the original source's license terms.
            </p>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="flex gap-3 pt-4">
          <Link to="/legal/privacy">
            <Button variant="outline">Privacy Policy</Button>
          </Link>
          <Link to="/legal/terms">
            <Button variant="outline">Terms of Service</Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
