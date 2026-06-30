import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage }              from '@/pages/HomePage'
import { SignInPage }            from '@/pages/SignInPage'
import { CatalogPage }           from '@/pages/CatalogPage'
import { WhatsNewPage }          from '@/pages/WhatsNewPage'
import { BlogPage }              from '@/pages/BlogPage'
import { BlogPostPage }          from '@/pages/BlogPostPage'
import { TermsPage }             from '@/pages/legal/TermsPage'
import { PrivacyPage }           from '@/pages/legal/PrivacyPage'
import { CookiePage }            from '@/pages/legal/CookiePage'
import { LicenseFAQPage }        from '@/pages/legal/LicenseFAQPage'
import { MusicAttributionPage }  from '@/pages/legal/MusicAttributionPage'
import { HelpCenterPage }        from '@/pages/support/HelpCenterPage'
import { StatusPage }            from '@/pages/support/StatusPage'
import { ContactPage }           from '@/pages/support/ContactPage'
import { CreatorStudioPage }     from '@/pages/CreatorStudioPage'

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/"                   element={<HomePage />} />
          <Route path="/sign-in"            element={<SignInPage />} />
          <Route path="/catalog"            element={<CatalogPage />} />
          <Route path="/whats-new"          element={<WhatsNewPage />} />
          <Route path="/blog"               element={<BlogPage />} />
          <Route path="/blog/:slug"         element={<BlogPostPage />} />
          <Route path="/legal/terms"        element={<TermsPage />} />
          <Route path="/legal/privacy"      element={<PrivacyPage />} />
          <Route path="/legal/cookies"      element={<CookiePage />} />
          <Route path="/legal/license-faq"  element={<LicenseFAQPage />} />
          <Route path="/legal/music"        element={<MusicAttributionPage />} />
          <Route path="/support/help"       element={<HelpCenterPage />} />
          <Route path="/support/status"     element={<StatusPage />} />
          <Route path="/support/contact"    element={<ContactPage />} />
          <Route path="/creator-studio"     element={<CreatorStudioPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
