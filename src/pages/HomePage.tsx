/**
 * Torch Studio — HomePage
 * Assembles all sections in page order.
 * Import into App.tsx as the root route.
 */

import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import {
  Features,
  CatalogPreview,
  Pricing,
  Testimonials,
  CTABanner,
  Footer,
} from '@/components/sections/Sections'

export function HomePage() {
  return (
    <>
      {/* ── Navigation ─────────────────────────────────────────────── */}
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <main id="main-content">
        <Hero />

        {/* ── Features (3-col cards on secondary bg) ─────────────── */}
        <Features />

        {/* ── Catalog preview with genre filter + track list ─────── */}
        <CatalogPreview />

        {/* ── Pricing (3 tiers, Creator highlighted) ─────────────── */}
        <Pricing />

        {/* ── Testimonials (3 quotes) ─────────────────────────────── */}
        <Testimonials />

        {/* ── About (mission, values, stats) ──────────────────────── */}
        <About />

        {/* ── CTA Banner (amber bg, email capture) ────────────────── */}
        <CTABanner />
      </main>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <Footer />
    </>
  )
}
