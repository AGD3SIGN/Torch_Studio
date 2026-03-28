import { useState } from 'react'
import { CheckCircle, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { PageLayout } from '@/components/layout/PageLayout'
import { SupportNav } from '@/components/support/SupportNav'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const services = [
  { name: 'Music Catalog',          status: 'Operational', uptime: '99.98%' },
  { name: 'Audio Streaming',        status: 'Operational', uptime: '99.95%' },
  { name: 'File Downloads',         status: 'Operational', uptime: '99.97%' },
  { name: 'User Authentication',    status: 'Operational', uptime: '100%'   },
  { name: 'Payment Processing',     status: 'Operational', uptime: '99.99%' },
  { name: 'Creator Upload Portal',  status: 'Operational', uptime: '99.91%' },
] as const

const incidents = [
  {
    date: 'March 10, 2024',
    service: 'Audio Streaming',
    description: 'Degraded performance — 45 minutes',
    detail: 'Some users experienced buffering on preview playback. Root cause: CDN misconfiguration. Resolved by rolling back edge node config.',
  },
  {
    date: 'February 22, 2024',
    service: 'File Downloads',
    description: 'Elevated error rate — 12 minutes',
    detail: 'A subset of download requests returned 500 errors. Resolved by scaling up download processing workers.',
  },
  {
    date: 'February 8, 2024',
    service: 'User Authentication',
    description: 'Login failures — 8 minutes',
    detail: 'OAuth token validation service experienced a brief interruption. Resolved by restarting the auth service cluster.',
  },
  {
    date: 'January 30, 2024',
    service: 'Music Catalog',
    description: 'Search latency elevated — 1 hour 20 minutes',
    detail: 'Catalog search response times exceeded normal thresholds. Resolved by clearing a corrupted search index cache.',
  },
  {
    date: 'January 12, 2024',
    service: 'Payment Processing',
    description: 'Stripe webhook delays — 30 minutes',
    detail: 'Subscription renewals were delayed due to a Stripe webhook backlog. All renewals completed successfully after the delay.',
  },
]

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
      status === 'Operational' && 'bg-green-100 text-green-700',
      status === 'Degraded'    && 'bg-amber-100 text-amber-700',
      status === 'Outage'      && 'bg-red-100 text-red-700',
    )}>
      <span className={cn(
        'h-1.5 w-1.5 rounded-full',
        status === 'Operational' && 'bg-green-500',
        status === 'Degraded'    && 'bg-amber-500',
        status === 'Outage'      && 'bg-red-500',
      )} />
      {status}
    </span>
  )
}

export function StatusPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setSubscribed(true)
    toast.info("You'll be notified of any future incidents. (Demo — no emails will be sent.)")
  }

  return (
    <PageLayout title="System Status — Torch Studio">
      <SupportNav />

      <div className="section-container py-12 max-w-3xl">
        {/* Overall status */}
        <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-4 mb-8">
          <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
          <div className="flex-1">
            <p className="font-medium text-green-800">All systems operational</p>
            <p className="text-sm text-green-600">Last checked: just now</p>
          </div>
        </div>

        {/* Service table */}
        <div className="rounded-xl border border-border overflow-hidden mb-12">
          <div className="px-5 py-4 border-b border-border bg-secondary/30">
            <h2 className="font-display text-base font-semibold text-foreground">Service Status</h2>
          </div>
          {services.map((s, i) => (
            <div
              key={s.name}
              className={cn(
                'flex items-center justify-between px-5 py-4',
                i < services.length - 1 && 'border-b border-border'
              )}
            >
              <p className="text-sm font-medium text-foreground">{s.name}</p>
              <div className="flex items-center gap-6">
                <span className="text-xs text-muted-foreground">{s.uptime} uptime</span>
                <StatusBadge status={s.status} />
              </div>
            </div>
          ))}
        </div>

        {/* Incident history */}
        <h2 className="font-display text-xl font-semibold text-foreground mb-5">Past Incidents</h2>
        <div className="flex flex-col gap-4 mb-12">
          {incidents.map((inc, i) => (
            <div key={i} className="rounded-xl border border-border p-5">
              <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                <div>
                  <p className="font-medium text-sm text-foreground">{inc.service} — {inc.description}</p>
                  <span className="inline-block text-xs bg-secondary text-muted-foreground rounded px-2 py-0.5 mt-1">{inc.date}</span>
                </div>
                <Badge variant="secondary" className="text-xs shrink-0">Resolved</Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{inc.detail}</p>
            </div>
          ))}
        </div>

        <Separator className="mb-8" />

        {/* Subscribe */}
        <div>
          <h2 className="font-display text-base font-semibold text-foreground mb-1">Subscribe to updates</h2>
          <p className="text-sm text-muted-foreground mb-4">Get notified when incidents are created or resolved.</p>
          {subscribed ? (
            <p className="text-sm text-green-700 font-medium">You're subscribed. (Demo — no emails will be sent.)</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-sm">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={loading}
                className="bg-primary text-primary-foreground hover:bg-accent shrink-0"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Notify me'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
