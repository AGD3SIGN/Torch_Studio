import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'

interface LegalPageLayoutProps {
  pageTitle: string
  lastUpdated: string
  children: React.ReactNode
}

export function LegalPageLayout({ pageTitle, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <PageLayout title={`${pageTitle} — Torch Studio`}>
      <div className="bg-secondary/40 border-b border-border">
        <div className="section-container py-12">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to home
          </Link>
          <h1 className="text-4xl font-bold text-foreground">{pageTitle}</h1>
          <p className="text-sm text-muted-foreground mt-2">Last updated: {lastUpdated}</p>
        </div>
      </div>

      <div className="section-container py-12">
        <div className="max-w-3xl">
          <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <strong>Demo notice:</strong> This is a demonstration website for design purposes only.
            Torch Studio is not a real company. The following content is sample copy only.
          </div>
          <div className="prose prose-sm max-w-none text-foreground [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:text-muted-foreground [&_ul]:mb-4 [&_li]:mb-1">
            {children}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
