# Torch Studio

A royalty-free music platform for creators. Browse, preview, and download CC0-licensed tracks across 11 genres — lo-fi, cinematic, ambient, hip-hop, and more.

**Stack:** React 19 · Vite · TypeScript 5.9 · Tailwind CSS v4 · shadcn/ui v4 (@base-ui/react) · React Router v7

See [CHANGELOG.md](./CHANGELOG.md) for a full history of changes.

---

## Project Structure

```
src/
├── App.tsx                        # BrowserRouter + all 13 routes
├── main.tsx                       # Root render: AuthProvider + Toaster
├── index.css                      # Tailwind v4 CSS-first config + design tokens
│
├── context/
│   └── AuthContext.tsx            # Mock auth (localStorage, signIn/signOut)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx             # Sticky nav, auth-aware CTAs, mobile drawer
│   │   ├── PageLayout.tsx         # Shared page wrapper (Navbar + main + Footer)
│   │   └── LegalPageLayout.tsx    # Centered legal page shell with disclaimer
│   ├── sections/
│   │   ├── Hero.tsx               # Homepage hero with 30s audio previews
│   │   ├── Sections.tsx           # Features, CatalogPreview, Pricing, Testimonials, CTABanner, Footer
│   │   └── About.tsx              # About section
│   ├── support/
│   │   └── SupportNav.tsx         # Help / Status / Contact pill nav
│   └── ui/                        # shadcn/ui components (accordion, button, input, slider…)
│
├── data/
│   ├── tracks.ts                  # 150-track catalog (genre, mood, BPM, CC0 license, audioSrc)
│   ├── previewTracks.ts           # 12 hero mosaic preview tracks
│   └── blogPosts.ts               # 6 blog posts (slug, category, full body)
│
├── hooks/
│   └── useAudioPlayer.ts          # Single global audio instance, 30s preview limit
│
├── utils/
│   └── download.ts                # Blob download helper with CC0 filename
│
└── pages/
    ├── HomePage.tsx
    ├── SignInPage.tsx              # Sign-in / register toggle, password strength meter
    ├── CatalogPage.tsx            # 150-track catalog, sidebar filters, auth-gated download
    ├── WhatsNewPage.tsx           # Release notes timeline (v0.1.0–v1.3.0)
    ├── BlogPage.tsx               # Blog index: category filter + card grid
    ├── BlogPostPage.tsx           # Blog post: body renderer + related posts
    ├── legal/
    │   ├── TermsPage.tsx
    │   ├── PrivacyPage.tsx
    │   ├── CookiePage.tsx
    │   └── LicenseFAQPage.tsx     # 15 Q&A accordion items
    └── support/
        ├── HelpCenterPage.tsx     # Searchable FAQ (4 categories, 21 items)
        ├── StatusPage.tsx         # Service status table + past incidents
        └── ContactPage.tsx        # Validated contact form
```

---

## Routes

| Path | Page |
|------|------|
| `/` | HomePage |
| `/sign-in` | SignInPage |
| `/catalog` | CatalogPage |
| `/whats-new` | WhatsNewPage |
| `/blog` | BlogPage |
| `/blog/:slug` | BlogPostPage |
| `/legal/terms` | TermsPage |
| `/legal/privacy` | PrivacyPage |
| `/legal/cookies` | CookiePage |
| `/legal/license-faq` | LicenseFAQPage |
| `/support/help` | HelpCenterPage |
| `/support/status` | StatusPage |
| `/support/contact` | ContactPage |

> **Creator Studio** (`/creator-studio`) lives on `feature/creator-studio` — pending review before merge.

---

## Getting Started

```bash
npm install
npm run dev
```

Key packages used:

```bash
npm install react-router-dom sonner framer-motion
npm install @fontsource/fraunces @fontsource/nunito
npm install tailwindcss-animate
```

---

## Design System

### Fonts
| Role | Family |
|------|--------|
| Display (headings) | Fraunces (400, 600, 700, 900) |
| Body | Nunito (400, 500, 600, 700) |

### Color Tokens (HSL CSS variables)
| Token | Light | Dark | Description |
|-------|-------|------|-------------|
| `--background` | `40 50% 97%` | `18 30% 7%` | Warm cream / deep charcoal |
| `--foreground` | `18 13% 9%` | `37 48% 93%` | Deep charcoal / warm white |
| `--primary` | `22 70% 51%` | `24 74% 55%` | Torch amber `#D96B2B` |
| `--accent` | `17 74% 40%` | `18 69% 45%` | Terracotta (hover states) |
| `--secondary` | `35 32% 89%` | `22 25% 13%` | Warm stone surface |
| `--muted` | `34 26% 84%` | `22 32% 15%` | Disabled / placeholder |

All tokens consumed via `hsl(var(--token))` in Tailwind class names. Dark mode toggled via `.dark` on `<html>`.

Extended palette: `torch-50` through `torch-900` raw amber scale (see `tailwind.config.ts`).

---

## Key Patterns

### Auth (mock)
```tsx
const { user, isAuthenticated, signIn, signOut } = useAuth()
// Accepts any credentials — 800ms delay, persists to localStorage 'torch_auth'
```

### Audio Previews
```tsx
const { toggle, isPlaying, progress } = useAudioPlayer()
// One global HTMLAudioElement — only one track plays at a time, stops at 30s
```

### Downloads (auth-gated)
```tsx
import { downloadTrack } from '@/utils/download'
// Fetches audio as blob → triggers <a> click → filename: Title_TorchStudio_CC0.mp3
```

---

## Branches

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready; all 13 pages complete |
| `feature/creator-studio` | Creator Studio landing page — pending review |

---

## Demo Notice

This is a portfolio/demo project. No real payments, downloads, or emails are processed. Auth uses `localStorage` only. Audio previews use [SoundHelix](https://www.soundhelix.com/) sample MP3s.

---

## Original Vite Setup Notes

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
