import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { PageLayout } from '@/components/layout/PageLayout'
import { SupportNav } from '@/components/support/SupportNav'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'

interface QA { q: string; a: string }
interface Category { name: string; items: QA[] }

const categories: Category[] = [
  {
    name: 'Billing',
    items: [
      { q: 'How do I upgrade to the Creator or Pro plan?', a: "You can upgrade from your account settings under 'Plan & Billing.' Changes take effect immediately and you'll be charged a prorated amount for the remainder of your billing cycle." },
      { q: 'Can I cancel my subscription at any time?', a: 'Yes. You can cancel anytime from your account settings. Your plan remains active until the end of the current billing period.' },
      { q: 'Do you offer refunds?', a: 'We offer refunds within 7 days of purchase if you have not downloaded any tracks during that period. Contact us via the Contact page to request a refund.' },
      { q: 'What payment methods are accepted?', a: 'We accept all major credit and debit cards. PayPal and bank transfer options are listed at checkout. (Demo note: no real payments are processed on this site.)' },
      { q: 'Will I be charged automatically each month?', a: "Yes, subscriptions renew automatically. You'll receive an email reminder 3 days before each renewal." },
    ],
  },
  {
    name: 'Downloads',
    items: [
      { q: 'How do I download a track?', a: 'Click the download icon on any track card. You must be signed in to download. Files are delivered as MP3 (320kbps) or WAV (24-bit) depending on your plan.' },
      { q: 'What audio formats are available?', a: 'Free and Creator plans include MP3. Pro plan includes both MP3 (320kbps) and WAV (24-bit/48kHz).' },
      { q: 'How many tracks can I download per month?', a: 'Free accounts can buy individual tracks at $0.99–$2.99 per track — no monthly download limit, but no subscription credits. Creator: 30 downloads/month included. Pro: Unlimited.' },
      { q: "Do my downloads roll over if I don't use them?", a: "No. Download credits reset on your billing date each month. Unused credits do not carry over." },
      { q: "Where do my downloaded files go?", a: "Files download directly to your device's default downloads folder. File names follow the format: TrackTitle_TorchStudio_CC0.mp3." },
      { q: "Can I re-download a track I've already purchased?", a: "Yes. All purchased and downloaded tracks are accessible from your account under 'My Downloads' for 12 months." },
    ],
  },
  {
    name: 'Account',
    items: [
      { q: 'How do I create an account?', a: "Click 'Start free' or 'Sign in' from any page and select 'Create an account.' You only need an email address and password." },
      { q: 'How do I reset my password?', a: "On the sign-in page, click 'Forgot password?' and enter your email. A reset link will be sent within a few minutes. (Demo note: password reset is not functional on this demo site.)" },
      { q: 'Can I change my email address?', a: "Yes. Go to account settings and update your email. You'll receive a confirmation email at both your old and new address." },
      { q: 'How do I delete my account?', a: "You can request account deletion from account settings under 'Privacy.' Deletion is permanent and removes all download history." },
    ],
  },
  {
    name: 'Licensing',
    items: [
      { q: 'What license do Torch Studio tracks use?', a: 'All tracks in the Torch Studio catalog are released under the Creative Commons CC0 1.0 Universal license. This means they are free to use for any purpose — personal, commercial, or otherwise — with no attribution required.' },
      { q: 'Can I use these tracks on YouTube?', a: 'Yes. CC0 tracks are safe for YouTube. However, some original recordings may still trigger Content ID claims from third parties. If this happens, dispute the claim and provide the CC0 license information.' },
      { q: 'Do I need to credit Torch Studio?', a: 'No attribution is required under CC0. However, we appreciate a mention if you share your project publicly.' },
      { q: 'Can I use tracks in paid client work?', a: 'Yes. CC0 permits use in commercial projects including paid client work, advertising, and products for sale.' },
      { q: 'Can I use tracks in a film or documentary?', a: 'Yes. There are no restrictions on the type of project. CC0 means the work is effectively in the public domain.' },
      { q: 'Can I remix or modify the tracks?', a: 'Yes. CC0 allows modification, remixing, and derivative works with no restrictions.' },
    ],
  },
]

// Flat list for search
const allItems: (QA & { category: string })[] = categories.flatMap((c) =>
  c.items.map((item) => ({ ...item, category: c.name }))
)

export function HelpCenterPage() {
  const [rawSearch, setRawSearch] = useState('')
  const [search, setSearch] = useState('')

  const debouncedSetSearch = useDebouncedCallback((v: string) => setSearch(v), 300)

  const handleSearch = (v: string) => {
    setRawSearch(v)
    debouncedSetSearch(v)
  }

  const filtered = search
    ? allItems.filter((item) => item.q.toLowerCase().includes(search.toLowerCase()))
    : []

  return (
    <PageLayout title="Help Center — Torch Studio">
      <SupportNav />

      <div className="bg-secondary/40 border-b border-border">
        <div className="section-container py-10">
          <h1 className="font-display text-3xl font-bold text-foreground">Help Center</h1>
          <p className="text-muted-foreground mt-1 mb-5">Find answers to common questions.</p>
          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={rawSearch}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search questions..."
              className="pl-9 h-10"
              aria-label="Search help articles"
            />
            {rawSearch && (
              <button
                onClick={() => { setRawSearch(''); setSearch('') }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="section-container py-12 max-w-4xl">
        {search ? (
          <div>
            {filtered.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-foreground font-medium">No results for "{search}"</p>
                <p className="text-muted-foreground text-sm mt-1">
                  Try different keywords or{' '}
                  <Link to="/support/contact" className="text-primary hover:underline">contact us</Link>.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground mb-2">{filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{search}"</p>
                {filtered.map((item, i) => (
                  <div key={i} className="rounded-xl border border-border p-5">
                    <p className="font-medium text-sm text-foreground">{item.q}</p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.a}</p>
                    <p className="text-xs text-muted-foreground/60 mt-3">{item.category}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {categories.map((cat) => (
              <div key={cat.name}>
                <h2 className="font-display text-lg font-semibold text-foreground mb-3">{cat.name}</h2>
                <Accordion multiple className="flex flex-col gap-2">
                  {cat.items.map((item, i) => (
                    <AccordionItem
                      key={i}
                      value={`${cat.name}-${i}`}
                      className="rounded-xl border border-border px-5 data-[state=open]:border-primary/30"
                    >
                      <AccordionTrigger className="py-4 text-sm font-medium text-foreground hover:no-underline text-left">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 text-sm text-muted-foreground leading-relaxed">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  )
}
