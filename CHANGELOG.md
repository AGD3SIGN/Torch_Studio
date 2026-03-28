# Torch Studio — Changelog

All notable changes to this project are documented here.

---

## [Unreleased] — feature/creator-studio

### Added
- `src/pages/CreatorStudioPage.tsx` — full landing page for the upcoming Creator Studio feature:
  - Hero section with "coming soon" badge and early access CTA
  - 6-card feature grid (AI track recommendations, usage analytics, project workspaces, license vault, extended previews, bulk download)
  - 3-step workflow stepper with connector lines
  - 2-tier pricing cards (Creator Pro $12.99/mo · Studio $29/mo) with "most popular" badge
  - Amber CTA banner
  - Early access modal with email input, success state, and sonner toast confirmation
- Route `/creator-studio` registered in `App.tsx` on the feature branch

---

## [2024-03-28] — main

### Added — Pages
- `src/pages/WhatsNewPage.tsx` — changelog / release notes page
  - Vertical timeline layout with amber dot + connecting line (hidden on mobile)
  - 8 releases documented: v0.1.0 (Private Beta) through v1.3.0 (Catalog Filters)
  - Major / Minor / Patch badges per release
  - Highlights bullet list + optional "Bug fixes" subsection per release card
- `src/pages/BlogPage.tsx` — blog index page
  - 3-column card grid (1-col mobile, 2-col tablet, 3-col desktop)
  - Category filter pills: All / Guide / Tips / Spotlight / News
  - Each card: colored cover header, category badge, read time, title, excerpt (3-line clamp), date, "Read more →" with hover gap animation
- `src/pages/BlogPostPage.tsx` — individual blog post page
  - Full-width colored hero banner matched to post's `coverColor`
  - Meta row: category badge, clock + read time, formatted date
  - Quoted excerpt lead with left amber border
  - Body renderer: parses `## Heading`, `- list items`, `1. ordered lists`, `**bold**` inline, plain paragraphs
  - Related posts row (3 cards) at page bottom
  - Redirects to `/blog` via `<Navigate>` on unknown slug
- `src/pages/legal/LicenseFAQPage.tsx` — 15 Q&A items in a collapsible Accordion
- `src/pages/support/HelpCenterPage.tsx` — searchable FAQ with 4 categories and 21 items; debounced search (300 ms); empty-state link to Contact
- `src/pages/support/StatusPage.tsx` — service status table (6 services), past incidents list, email subscribe form
- `src/pages/support/ContactPage.tsx` — validated contact form (name / email / subject / message), inline errors, 1 s loading simulation, success confirmation

### Added — Components
- `src/components/layout/PageLayout.tsx` — shared wrapper: Navbar + `<main id="main-content">` + Footer; sets `document.title` via `useEffect`
- `src/components/layout/LegalPageLayout.tsx` — centered max-w-3xl layout, back link, last-updated date, amber demo disclaimer banner; wraps `PageLayout`
- `src/components/support/SupportNav.tsx` — horizontal NavLink pill nav (Help Center / Status / Contact); active pill uses `bg-primary`

### Added — Data
- `src/data/blogPosts.ts` — 6 `BlogPost` objects (slug, title, excerpt, category, date, readTime, coverColor, full body text)
- `src/data/tracks.ts` — 150-track catalog across 11 genres with id, title, artist, genre, mood, duration, BPM, price, color, audioSrc (SoundHelix 1–17 cycling), tags, CC0 license, addedDate
- `src/data/previewTracks.ts` — 12 hero mosaic preview tracks (SoundHelix songs 1–12)

### Added — Auth & Utilities
- `src/context/AuthContext.tsx` — mock auth with `localStorage` persistence (`torch_auth` key); `signIn` accepts any credentials with 800 ms delay; provides `{ user, isAuthenticated, signIn, signOut }`
- `src/hooks/useAudioPlayer.ts` — single global `HTMLAudioElement` shared across all instances; `toggle`, `play`, `pause`, `isPlaying`, `progress` (0–1); auto-stops after 30 s preview limit
- `src/utils/download.ts` — fetches audio as blob, creates object URL, triggers `<a>` download, cleans up; filename pattern: `Title_TorchStudio_CC0.mp3`

### Added — Routing
- `src/App.tsx` — full `BrowserRouter` + `Routes` with 13 routes:
  - `/` · `/sign-in` · `/catalog` · `/whats-new`
  - `/blog` · `/blog/:slug`
  - `/legal/terms` · `/legal/privacy` · `/legal/cookies` · `/legal/license-faq`
  - `/support/help` · `/support/status` · `/support/contact`

### Changed — Navbar (`src/components/layout/Navbar.tsx`)
- Nav links updated: Browse (`/catalog`), Blog (`/blog`), About (`/#about`) — Pricing removed
- Auth-aware CTAs: "Start free" navigates to `/sign-in?mode=register` when logged out, `/catalog` when logged in
- User menu dropdown with avatar initials when authenticated (My account / Downloads / Sign out)
- Mobile drawer mirrors desktop auth state

### Changed — Hero (`src/components/sections/Hero.tsx`)
- Mosaic tiles driven by `previewTracks` data (12 tracks)
- Play/pause button per tile (visible on hover or when playing)
- Waveform bar animation while playing
- SVG progress ring showing 30-second preview countdown
- CTA links to `/catalog` via React Router `<Link>`

### Changed — Sections / Footer (`src/components/sections/Sections.tsx`)
- `CatalogPreview` section ID changed from `catalog` → `catalog-preview`
- Footer rebuilt with typed `footerColumns` array — 4 columns: Product, Company, Legal, Support
- All internal links use `<Link>` (React Router); hash links (`/#about`) use native `<a>`
- Removed all dead placeholder links

### Changed — Entry Points
- `src/main.tsx` — wrapped `<App>` in `<AuthProvider>`; added `<Toaster position="bottom-right" richColors />` from sonner
- `index.html` — full SEO meta tags (Open Graph, Twitter Card, description, keywords, canonical), `lang="en"`, skip-to-content link as first body element
- `public/favicon.svg` — replaced Vite default purple lightning bolt with Torch Studio amber rounded-square flame icon

### Added — Pages: Auth
- `src/pages/SignInPage.tsx`
  - Two-panel layout (amber left with testimonials on desktop, form-only on mobile)
  - Toggle between sign-in and register modes
  - Password strength meter (Weak / Fair / Strong)
  - Show/hide password toggle
  - "Forgot password?" and Google OAuth button both show sonner demo toasts

### Changed — Catalog (`src/pages/CatalogPage.tsx`)
- Full redesign using 150-track data file
- Sidebar filters: debounced search, sort, genre checkboxes, mood pills, BPM slider, price radio, duration radio, reset
- TrackCard: album tile with play/pause, waveform bars, progress ring, genre badge, mood, BPM, CC0 badge, price, download button
- Auth-gated downloads: unauthenticated users see `AuthPromptModal`; authenticated users get blob download + sonner success toast
- `framer-motion` `AnimatePresence` on track list (fade + scale)
- "Load more" pagination (30 tracks per page)
- Mobile: right-side filter drawer with close button

### Fixed
- Navigation links broken from `/catalog` — hash anchors changed to absolute paths (`/#about`, `/#pricing`) so they work cross-page
- `Accordion type="multiple"` replaced with `multiple` boolean prop (base-ui/react v4 API) in `LicenseFAQPage` and `HelpCenterPage`
- Removed unused `useEffect` import in `HelpCenterPage`
- Base UI `Slider` `onValueChange` signature corrected: `(value: number | readonly number[]) => void`
- `LegalPageLayout` unused `title` prop removed from interface
- `Navbar` `NavLinkItem` onClick type loosened to `(e?: any) => void` to match React Router and native anchor callers
- `useAudioPlayer` unused global variable declarations removed (TS6133)
- `App.tsx` restored after being reset to Vite default during `git checkout main`

---

## [2024-03-01] — Initial commit (`ca6461e`)

### Added
- Vite + React 19 + TypeScript 5.9 project scaffold
- Tailwind CSS v4 (CSS-first, `@theme` blocks)
- shadcn/ui v4 components via `@base-ui/react`
- `@fontsource/fraunces` + `@fontsource/nunito` fonts
- Design tokens: warm cream/charcoal palette, torch amber primary, dark mode variants
- Homepage sections: Navbar, Hero, Features, CatalogPreview, Pricing, Testimonials, CTABanner, Footer
- `tailwind.config.ts` with extended brand palette (`torch` scale), custom shadows, animations, and type scale
