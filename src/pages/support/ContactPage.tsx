import { useState } from 'react'
import { CheckCircle, Loader2, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PageLayout } from '@/components/layout/PageLayout'
import { SupportNav } from '@/components/support/SupportNav'
import { cn } from '@/lib/utils'

const SUBJECTS = [
  'General inquiry',
  'Billing',
  'Download issue',
  'Licensing question',
  'Bug report',
  'Other',
]

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!name.trim()) e.name = 'Full name is required.'
    if (!email.trim()) e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email address.'
    if (!subject) e.subject = 'Please select a subject.'
    if (!message.trim()) e.message = 'Message is required.'
    else if (message.trim().length < 20) e.message = 'Message must be at least 20 characters.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  const reset = () => {
    setName(''); setEmail(''); setSubject(''); setMessage('')
    setErrors({}); setSubmitted(false)
  }

  const inputCls = (hasError: boolean) => cn(
    'w-full mt-1 px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors',
    hasError ? 'border-destructive' : 'border-border'
  )

  return (
    <PageLayout title="Contact Us — Torch Studio">
      <SupportNav />

      <div className="bg-secondary/40 border-b border-border">
        <div className="section-container py-10">
          <h1 className="font-display text-3xl font-bold text-foreground">Contact Us</h1>
        </div>
      </div>

      <div className="section-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="text-center py-16">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h2 className="font-display text-xl font-bold text-foreground mb-2">Message received.</h2>
                <p className="text-muted-foreground text-sm">We'll get back to you within 2 business days.</p>
                <p className="text-muted-foreground text-xs mt-1">(Demo note: this form does not send real emails.)</p>
                <button
                  onClick={reset}
                  className="mt-6 text-sm text-primary hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground" htmlFor="contact-name">Full name</label>
                  <Input
                    id="contact-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground" htmlFor="contact-email">Email</label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-foreground" htmlFor="contact-subject">Subject</label>
                  <select
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={cn(inputCls(!!errors.subject), 'mt-1')}
                    aria-invalid={!!errors.subject}
                  >
                    <option value="">Select a subject…</option>
                    {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-foreground" htmlFor="contact-message">Message</label>
                    <span className="text-xs text-muted-foreground">{message.length} / 1000</span>
                  </div>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
                    rows={5}
                    placeholder="Describe your question or issue…"
                    className={cn(inputCls(!!errors.message), 'resize-y mt-1')}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground hover:bg-accent font-semibold h-11"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send message'}
                </Button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6 text-sm">
            <div>
              <p className="font-medium text-foreground">Response time</p>
              <p className="text-muted-foreground mt-1">Typically within 2 business days.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Support hours</p>
              <p className="text-muted-foreground mt-1">Monday – Friday, 9am – 6pm CT.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Before you write</p>
              <p className="text-muted-foreground mt-1">Check the Help Center — most questions are answered there.</p>
              <Link
                to="/support/help"
                className="inline-flex items-center gap-1 text-primary hover:underline mt-2 text-sm font-medium"
              >
                Go to Help Center <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="rounded-lg bg-secondary/60 border border-border px-4 py-3">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Demo notice.</strong> This is a demo site. No messages are actually sent or received.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
