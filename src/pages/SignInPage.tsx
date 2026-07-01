import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Flame, Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/context/AuthContext'
import { isValidEmail } from '@/lib/validation'
import { toast } from 'sonner'

function getPasswordStrength(pw: string): { label: string; color: string; width: string } {
  if (pw.length === 0) return { label: '', color: '', width: '0%' }
  let score = 0
  if (pw.length >= 8) score++
  if (pw.length >= 12) score++
  if (/[^a-zA-Z0-9]/.test(pw)) score++
  if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) score++
  if (score <= 1) return { label: 'Weak', color: 'bg-red-400', width: '33%' }
  if (score <= 2) return { label: 'Fair', color: 'bg-amber-400', width: '66%' }
  return { label: 'Strong', color: 'bg-green-500', width: '100%' }
}

const testimonials = [
  { quote: "Found the perfect lo-fi track for my study channel in under 5 minutes.", author: "Yuki S.", role: "Content Creator" },
  { quote: "CC0 licensing means I never worry about copyright strikes. Game changer.", author: "Marcus T.", role: "Freelance Filmmaker" },
  { quote: "Incredible value. $0.99 for a track I've used in 12 client videos.", author: "Priya M.", role: "Podcast Producer" },
]

export function SignInPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { signIn, isAuthenticated } = useAuth()

  const [mode, setMode] = useState<'signin' | 'register'>(
    params.get('mode') === 'register' ? 'register' : 'signin'
  )
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    document.title = mode === 'register' ? 'Create Account — Torch Studio' : 'Sign In — Torch Studio'
  }, [mode])

  useEffect(() => {
    if (isAuthenticated) navigate('/catalog', { replace: true })
  }, [isAuthenticated, navigate])

  const validate = () => {
    const e: Record<string, string> = {}
    if (mode === 'register' && !name.trim()) e.name = 'Full name is required'
    if (!email.trim()) e.email = 'Email is required'
    else if (!isValidEmail(email)) e.email = 'Enter a valid email'
    if (!password) e.password = 'Password is required'
    else if (password.length < 12) e.password = 'Password must be at least 12 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await signIn(email, password)
      toast.success(mode === 'register' ? 'Account created! Welcome to Torch Studio.' : 'Welcome back!')
      navigate('/catalog')
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const strength = getPasswordStrength(password)

  return (
    <div className="min-h-screen flex">
      {/* Left panel — desktop only */}
      <div className="hidden lg:flex lg:w-[480px] bg-primary flex-col items-center justify-center p-12 shrink-0">
        <Link to="/" className="flex items-center gap-2.5 mb-12">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <Flame className="h-6 w-6 text-white" strokeWidth={1.75} />
          </div>
          <span className="font-display text-2xl font-bold text-white">Torch Studio</span>
        </Link>

        <div className="w-full max-w-sm">
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Quality music at honest prices.
          </h2>
          <p className="text-primary-foreground/75 text-sm mb-10">
            150+ CC0 tracks across 12 genres. Download once, use forever.
          </p>

          <div className="flex flex-col gap-4">
            {testimonials.map((t) => (
              <div key={t.author} className="rounded-xl bg-white/10 p-4">
                <p className="text-white/90 text-sm leading-relaxed">"{t.quote}"</p>
                <p className="text-white/60 text-xs mt-2">{t.author} · {t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center bg-background px-6 py-12">
        {/* Mobile logo */}
        <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Flame className="h-5 w-5 text-primary-foreground" strokeWidth={1.75} />
          </div>
          <span className="font-display text-xl font-bold text-foreground">Torch Studio</span>
        </Link>

        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground">
              {mode === 'register' ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              {mode === 'register'
                ? 'Already have an account? '
                : "Don't have an account? "}
              <button
                onClick={() => { setMode(mode === 'register' ? 'signin' : 'register'); setErrors({}) }}
                className="text-primary font-medium hover:underline"
              >
                {mode === 'register' ? 'Sign in' : 'Create one'}
              </button>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            {mode === 'register' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                  Full name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && <p id="name-error" className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && <p id="email-error" className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                  Password
                </label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => toast.info('Password reset is not available in demo mode.')}
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                  className="pr-10"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p id="password-error" className="mt-1 text-xs text-destructive">{errors.password}</p>}

              {mode === 'register' && password.length > 0 && (
                <div className="mt-2">
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                      style={{ width: strength.width }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Password strength: <span className="font-medium text-foreground">{strength.label}</span>
                  </p>
                </div>
              )}
            </div>

            {mode === 'signin' && (
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-border accent-primary"
                />
                Remember me
              </label>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground hover:bg-accent font-semibold h-11 mt-1"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : mode === 'register' ? (
                'Create account'
              ) : (
                'Sign in'
              )}
            </Button>

            <div className="relative flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or continue with</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <button
              type="button"
              onClick={() => toast.info('OAuth is not available in demo mode.')}
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-border px-4 h-11 text-sm font-medium text-foreground hover:bg-secondary transition-colors duration-150"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.583c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.583 9 3.583z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            {mode === 'register' && (
              <p className="text-center text-xs text-muted-foreground mt-2">
                By creating an account you agree to our{' '}
                <Link to="/legal/terms" className="text-primary hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/legal/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
