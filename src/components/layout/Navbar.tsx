import { useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Flame, Menu, X, ChevronDown, Download, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Browse',  href: '/catalog',  isHash: false },
  { label: 'Blog',    href: '/blog',     isHash: false },
  { label: 'About',   href: '/#about',   isHash: true  },
]

function NavLinkItem({ label, href, isHash, onClick }: {
  label: string
  href: string
  isHash: boolean
  onClick?: (e: React.MouseEvent) => void
}) {
  /* Restrained, formal nav link styling — no pill/rounded background */
  const cls =
    'px-3 py-1.5 text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-150 border-b-2 border-transparent hover:border-primary/40'

  if (isHash) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {label}
      </a>
    )
  }

  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        cn(cls, isActive && 'text-foreground border-primary')
      }
      onClick={onClick}
    >
      {label}
    </NavLink>
  )
}

function UserMenu() {
  const [open, setOpen] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  if (!user) return null

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-1.5 hover:bg-secondary transition-colors duration-150"
        aria-label="Account menu"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
          {initials}
        </div>
        <span className="hidden sm:block text-sm font-medium text-foreground">{user.name.split(' ')[0]}</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="absolute right-0 top-full mt-1 z-50 w-48 border border-border bg-background shadow-warm-md py-1">
            <div className="px-3 py-2 border-b border-border">
              <p className="text-xs font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            <button
              onClick={() => { setOpen(false); navigate('/catalog') }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
            >
              <User className="h-4 w-4" /> My account
            </button>
            <button
              onClick={() => { setOpen(false); navigate('/catalog') }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
            >
              <Download className="h-4 w-4" /> Downloads
            </button>
            <div className="border-t border-border mt-1 pt-1">
              <button
                onClick={() => { setOpen(false); signOut() }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-secondary transition-colors"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleStartFree = () => {
    if (isAuthenticated) {
      navigate('/catalog')
    } else {
      navigate('/sign-in?mode=register')
    }
  }

  const closeMobile = () => setMobileOpen(false)

  /* Smart Browse: scroll on homepage, navigate on other pages */
  const handleBrowseClick = (e: React.MouseEvent, href: string) => {
    if (href === '/catalog') return
    if (href.startsWith('/#')) {
      if (location.pathname === '/') {
        e.preventDefault()
        const id = href.slice(2)
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="section-container">
        <div className="flex h-14 items-center justify-between">
          {/* Logo — wordmark with flame icon */}
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="Torch Studio home">
            <div className="flex h-8 w-8 items-center justify-center bg-primary transition-colors duration-200 group-hover:bg-accent">
              <Flame className="h-4.5 w-4.5 text-primary-foreground" strokeWidth={1.75} />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-foreground uppercase letter-spacing-wider">
              Torch Studio
            </span>
          </Link>

          {/* Desktop nav — flat link row, no pill backgrounds */}
          <nav className="hidden md:flex items-center gap-6 h-full" aria-label="Main navigation">
            {navLinks.map((link) => (
              <NavLinkItem
                key={link.label}
                {...link}
                onClick={(e: React.MouseEvent) => handleBrowseClick(e, link.href)}
              />
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <>
                <button
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150 px-2 py-1"
                  onClick={() => navigate('/sign-in')}
                >
                  Sign in
                </button>
                {/* Primary CTA — sharp corners, formal feel */}
                <button
                  className="h-9 px-5 bg-primary text-primary-foreground hover:bg-accent font-semibold text-sm transition-colors duration-200 tracking-wide"
                  onClick={handleStartFree}
                >
                  Start free
                </button>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile nav drawer */}
        <div
          id="mobile-nav"
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-out',
            mobileOpen ? 'max-h-96 pb-4' : 'max-h-0'
          )}
        >
          <nav className="flex flex-col gap-1 pt-2 border-t border-border" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <NavLinkItem
                key={link.label}
                {...link}
                onClick={(e: React.MouseEvent) => {
                  handleBrowseClick(e, link.href)
                  closeMobile()
                }}
              />
            ))}
            <div className="flex flex-col gap-2 pt-3 border-t border-border mt-2">
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="w-full font-medium rounded-none"
                    onClick={() => { navigate('/sign-in'); closeMobile() }}
                  >
                    Sign in
                  </Button>
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-accent font-semibold rounded-none"
                    onClick={() => { handleStartFree(); closeMobile() }}
                  >
                    Start free
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
