import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

const supportLinks = [
  { label: 'Help Center', href: '/support/help' },
  { label: 'Status', href: '/support/status' },
  { label: 'Contact', href: '/support/contact' },
]

export function SupportNav() {
  return (
    <div className="border-b border-border bg-secondary/30">
      <div className="section-container">
        <nav
          className="flex gap-1 py-2"
          aria-label="Support navigation"
        >
          {supportLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                cn(
                  'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}
