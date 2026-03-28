# Security Audit Report
**Personal Portfolio Website**
**Date:** February 26, 2026
**Auditor:** Security Specialist
**Site Type:** React + Vite Static Portfolio (GitHub Pages)

---

## Executive Summary

This security audit examined a React-based personal portfolio website deployed as a static site on GitHub Pages. The assessment focused on client-side vulnerabilities, dependency security, analytics script safety, form handling, and deployment practices.

**Overall Risk Level:** LOW-MEDIUM

The site exhibits good security fundamentals for a static portfolio but has several areas requiring attention, primarily around dependency vulnerabilities and missing security headers.

---

## Findings Summary

| Severity | Count | Category |
|----------|-------|----------|
| Critical | 0 | - |
| High | 3 | Dependencies, Deployment |
| Medium | 2 | Security Headers, Form Handling |
| Low | 3 | Analytics, Error Handlers, Configuration |
| Info | 2 | Best Practices |

---

## Critical Findings

**None identified.**

---

## High Severity Findings

### H-1: Vulnerable Dependencies in Production Build

**Severity:** HIGH
**Component:** Dependencies (rollup, minimatch, ajv)
**CVSS Score:** 7.5 (High)

**Description:**
Three high/moderate severity vulnerabilities were detected in npm dependencies:

1. **rollup** (4.0.0 - 4.58.0): Arbitrary File Write via Path Traversal (GHSA-mw96-cpmx-2vgc)
   - Affects: Build process
   - Risk: Malicious packages could write files outside intended directories during build

2. **minimatch** (<=3.1.3): Multiple ReDoS vulnerabilities
   - GHSA-3ppc-4f35-3m26 (High)
   - GHSA-7r86-cg39-jmmj (High, CVSS 7.5)
   - GHSA-23c5-xmqv-rm74 (High, CVSS 7.5)
   - Risk: Denial of Service via catastrophic backtracking in glob patterns

3. **ajv** (<6.14.0): ReDoS when using $data option (GHSA-2g4f-4pwh-qvx6, Moderate)

**Location:**
- /Users/brandontorres/Documents/GitHub/Personal-Portfolio/package-lock.json
- Detected via `npm audit`

**Impact:**
While these are build-time dependencies and don't directly affect the deployed static site, they pose risks:
- Compromised build pipeline security
- Supply chain attack vectors
- CI/CD environment vulnerabilities

**Recommendation:**
```bash
npm audit fix
```

If automatic fixes aren't available:
```bash
npm update minimatch rollup ajv
```

**Fix Complexity:** Easy (automated)
**Breaking Changes:** Unlikely - these are indirect dependencies

---

### H-2: Missing Content Security Policy (CSP)

**Severity:** HIGH
**Component:** index.html, deployment configuration

**Description:**
The site lacks a Content Security Policy, which is the primary defense against XSS attacks for static sites. While no XSS vulnerabilities were found in the code, CSP provides defense-in-depth protection.

**Location:**
- /Users/brandontorres/Documents/GitHub/Personal-Portfolio/index.html (lines 1-62)

**Current State:**
- No CSP meta tag or HTTP headers
- Third-party scripts (Google Analytics, Microsoft Clarity) loaded without restrictions
- External fonts from Google Fonts allowed without explicit policy

**Risk:**
- No protection against injected malicious scripts
- No control over resource loading origins
- Analytics scripts could be compromised (supply chain attack)

**Recommendation:**

Add CSP meta tag to `index.html` (before closing `</head>`):

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' https://www.googletagmanager.com https://www.clarity.ms 'sha256-<HASH1>' 'sha256-<HASH2>';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://www.google-analytics.com https://www.clarity.ms;
  frame-src 'none';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
">
```

**Hash Generation for Inline Scripts:**
```bash
# For Google Analytics inline script
cat <<'EOF' | openssl dgst -sha256 -binary | openssl base64
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-DPVMEMCP3F');
EOF

# For Clarity inline script
cat <<'EOF' | openssl dgst -sha256 -binary | openssl base64
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script","ryi97n2xhu");
EOF
```

**Fix Complexity:** Medium
**Breaking Changes:** Possible - may need to adjust CSP if analytics stops working

---

### H-3: 404 Fallback Exposes Client-Side Routing Pattern

**Severity:** HIGH (for SEO/UX), MEDIUM (for security)
**Component:** GitHub Actions deployment workflow

**Description:**
The deployment workflow copies `index.html` to `404.html` to enable client-side routing for the SPA. This is a common pattern but has security implications:

**Location:**
- .github/workflows/deploy.yml (line 32)

**Risks:**
1. **Information Disclosure:** Reveals that the site is an SPA with client-side routing
2. **Route Enumeration:** Attackers can probe for routes without getting true 404s
3. **SEO Impact:** Search engines may index all paths as valid pages
4. **No Rate Limiting:** All non-existent routes serve the full app bundle

**Current Implementation:**
```yaml
- run: cp dist/index.html dist/404.html
```

**Recommendation:**

**Option 1 (Preferred):** Use a dedicated 404 page with minimal JavaScript that checks if the route is valid:

```html
<!-- public/404.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found | Brandon Torres</title>
  <script>
    // Valid routes in your SPA
    const validRoutes = ['/', '/about', '/works', '/contact', '/works/'];
    const path = window.location.pathname.replace('/Personal-Portfolio', '');

    // Check if path matches a case study route pattern
    const isCaseStudy = path.match(/^\/works\/[a-z0-9-]+$/);

    if (validRoutes.includes(path) || isCaseStudy) {
      // Redirect to app for valid routes
      window.location.replace('/Personal-Portfolio/');
    }
    // Otherwise show 404 content
  </script>
</head>
<body>
  <h1>404 - Page Not Found</h1>
  <p><a href="/Personal-Portfolio/">Return Home</a></p>
</body>
</html>
```

**Option 2:** Add rate limiting via GitHub Pages + Cloudflare (if using CDN)

**Fix Complexity:** Medium
**Breaking Changes:** No - improves UX and security

---

## Medium Severity Findings

### M-1: Form Submission Has No Server-Side Validation or Protection

**Severity:** MEDIUM
**Component:** Contact form (Contact.jsx)

**Description:**
The contact form performs client-side validation only and has a TODO comment indicating no actual submission endpoint is implemented. When implemented, this could be vulnerable to:

**Location:**
- src/pages/Contact.jsx (lines 45-61)

**Current Code:**
```javascript
const handleSubmit = (e) => {
  e.preventDefault()
  const newErrors = {}
  if (!formData.name.trim()) newErrors.name = 'Name is required'
  if (!formData.email.trim()) newErrors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
    newErrors.email = 'Please enter a valid email'
  if (!formData.message.trim()) newErrors.message = 'Message is required'

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors)
    return
  }

  setErrors({})
  // TODO: Replace with actual form submission (e.g. EmailJS, Formspree, or API endpoint)
}
```

**Vulnerabilities When Implemented:**
1. **No CSRF Protection:** No tokens to prevent cross-site request forgery
2. **No Rate Limiting:** Susceptible to spam/DoS when backend is added
3. **Client-Side Validation Only:** Can be bypassed
4. **No Input Sanitization:** Message field accepts any content
5. **No Maximum Length Validation:** Could allow excessive data submission

**Recommendation:**

When implementing the form submission:

1. **Use a reputable third-party service with built-in protections:**
   - **Formspree** (has rate limiting, spam filtering)
   - **EmailJS** (has quota limits)
   - **Netlify Forms** (if migrating to Netlify)

2. **If building custom backend, implement:**

```javascript
// Add max length validation
const MAX_MESSAGE_LENGTH = 5000;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;

const handleSubmit = async (e) => {
  e.preventDefault()
  const newErrors = {}

  // Length validation
  if (!formData.name.trim()) {
    newErrors.name = 'Name is required'
  } else if (formData.name.length > MAX_NAME_LENGTH) {
    newErrors.name = `Name must be less than ${MAX_NAME_LENGTH} characters`
  }

  if (!formData.email.trim()) {
    newErrors.email = 'Email is required'
  } else if (formData.email.length > MAX_EMAIL_LENGTH) {
    newErrors.email = 'Email is too long'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = 'Please enter a valid email'
  }

  if (!formData.message.trim()) {
    newErrors.message = 'Message is required'
  } else if (formData.message.length > MAX_MESSAGE_LENGTH) {
    newErrors.message = `Message must be less than ${MAX_MESSAGE_LENGTH} characters`
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors)
    return
  }

  try {
    // Use Formspree or similar service with honeypot and rate limiting
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        message: formData.message.trim(),
        services: selectedServices,
        budget: selectedBudget,
        _subject: 'New Portfolio Contact Form Submission',
      }),
    })

    if (response.ok) {
      // Show success message
      setFormData({ name: '', email: '', company: '', message: '' })
      setSelectedServices([])
      setSelectedBudget('')
    } else {
      setErrors({ submit: 'Failed to send message. Please try again.' })
    }
  } catch (error) {
    setErrors({ submit: 'Network error. Please try again later.' })
  }
}
```

3. **Add honeypot field** (invisible to users, catches bots):

```jsx
{/* Add hidden honeypot field */}
<input
  type="text"
  name="_gotcha"
  style={{ display: 'none' }}
  tabIndex="-1"
  autoComplete="off"
/>
```

**Fix Complexity:** Easy (with Formspree), Medium (custom backend)
**Breaking Changes:** No - adds functionality

---

### M-2: Missing Security Headers

**Severity:** MEDIUM
**Component:** Deployment configuration

**Description:**
GitHub Pages doesn't allow custom HTTP headers, but several important security headers are missing that would normally be recommended:

**Missing Headers:**
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: geolocation=(), microphone=(), camera=()`

**Impact:**
- **No X-Frame-Options:** Site could be embedded in malicious iframes (clickjacking)
- **No X-Content-Type-Options:** MIME sniffing attacks possible
- **No Permissions-Policy:** Unnecessary browser features not restricted

**Recommendation:**

Since GitHub Pages doesn't support custom headers, consider:

**Option 1:** Migrate to a platform that supports custom headers:
- **Netlify** (free tier, custom headers via `_headers` file)
- **Vercel** (custom headers via `vercel.json`)
- **Cloudflare Pages** (custom headers via `_headers`)

**Example `_headers` file for Netlify:**
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()
  X-XSS-Protection: 1; mode=block
```

**Option 2:** Use Cloudflare as a CDN in front of GitHub Pages to add headers

**Option 3:** Accept the limitation (acceptable for a portfolio site)

**Fix Complexity:** Medium (requires platform change)
**Breaking Changes:** No (if migrating platforms correctly)

---

## Low Severity Findings

### L-1: Image Error Handlers Use Inline Event Handlers

**Severity:** LOW
**Component:** Multiple components with image tags

**Description:**
Multiple components use `onError` inline event handlers to set fallback images. While not a vulnerability in this controlled context, inline event handlers can be risky if the handler code is ever dynamically generated.

**Location:**
- src/pages/CaseStudy.jsx (lines 51, 145, 157, 172, 238)
- src/components/shared/ProjectCard.jsx (line 20)
- src/pages/About.jsx (line 151)

**Current Pattern:**
```jsx
onError={(e) => { e.target.src = asset('/images/placeholder.svg') }}
```

**Risk:**
- Low risk in current implementation (hardcoded fallback)
- Could become XSS vector if fallback path is ever user-controlled
- Violates CSP if `'unsafe-inline'` for scripts is not allowed

**Recommendation:**

**Option 1:** Create a reusable hook for error handling:

```javascript
// src/hooks/useImageFallback.js
import { asset } from '@/lib/utils'

export function useImageFallback(fallback = '/images/placeholder.svg') {
  return (e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = asset(fallback);
  }
}

// Usage in components
import { useImageFallback } from '@/hooks/useImageFallback'

export function CaseStudy() {
  const handleImageError = useImageFallback()

  return (
    <img
      src={project.image}
      alt={`${project.title} hero image`}
      onError={handleImageError}
    />
  )
}
```

**Option 2:** Use a wrapper component:

```jsx
// src/components/shared/SafeImage.jsx
import { useState } from 'react'
import { asset } from '@/lib/utils'

export function SafeImage({ src, alt, fallback = '/images/placeholder.svg', ...props }) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(asset(fallback))}
      {...props}
    />
  )
}
```

**Fix Complexity:** Easy
**Breaking Changes:** No

---

### L-2: Analytics Scripts Loaded from Third-Party Origins

**Severity:** LOW
**Component:** Google Analytics and Microsoft Clarity scripts

**Description:**
Third-party analytics scripts are loaded directly from external origins without Subresource Integrity (SRI) checks. This creates a potential supply chain risk.

**Location:**
- index.html (lines 40-46, 49-55)

**Current Implementation:**
```html
<!-- Google Analytics (GA4) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-DPVMEMCP3F"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-DPVMEMCP3F');
</script>

<!-- Microsoft Clarity -->
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window,document,"clarity","script","ryi97n2xhu");
</script>
```

**Risks:**
- **CDN Compromise:** If Google/Microsoft CDNs are compromised, malicious code could be injected
- **Network MITM:** Scripts could be modified in transit (mitigated by HTTPS)
- **Privacy:** Third-party tracking without explicit user consent (GDPR concern)

**Recommendation:**

**Option 1:** Add Subresource Integrity (SRI) for GA4:

*Note: GA4 and Clarity don't support SRI because their scripts are dynamically updated. This is an accepted trade-off.*

**Option 2:** Implement a privacy-friendly consent banner:

```jsx
// src/components/CookieConsent.jsx
import { useState, useEffect } from 'react'

export function CookieConsent() {
  const [consent, setConsent] = useState(null)

  useEffect(() => {
    const storedConsent = localStorage.getItem('analytics-consent')
    setConsent(storedConsent)

    if (storedConsent === 'accepted') {
      // Enable analytics
      window.gtag?.('consent', 'update', {
        analytics_storage: 'granted'
      })
    }
  }, [])

  if (consent !== null) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-card border border-border rounded-lg p-4 shadow-lg z-50">
      <p className="text-sm text-foreground mb-3">
        This site uses cookies for analytics to improve your experience.
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => {
            localStorage.setItem('analytics-consent', 'accepted')
            setConsent('accepted')
            window.gtag?.('consent', 'update', { analytics_storage: 'granted' })
          }}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Accept
        </button>
        <button
          onClick={() => {
            localStorage.setItem('analytics-consent', 'rejected')
            setConsent('rejected')
          }}
          className="px-4 py-2 border border-border rounded"
        >
          Decline
        </button>
      </div>
    </div>
  )
}
```

**Option 3:** Use privacy-focused alternatives:
- Plausible Analytics (GDPR-compliant, no cookies)
- Fathom Analytics (privacy-first)
- Simple Analytics (GDPR-friendly)

**Fix Complexity:** Medium (for consent banner), Easy (for alternative analytics)
**Breaking Changes:** No

---

### L-3: Base URL Configuration Exposes Repository Name

**Severity:** LOW (Information Disclosure)
**Component:** Vite configuration

**Description:**
The base URL in `vite.config.js` exposes the GitHub repository name in all URLs, which reveals the project structure.

**Location:**
- vite.config.js (line 6)

**Current Configuration:**
```javascript
export default defineConfig({
  base: '/Personal-Portfolio/',
  // ...
})
```

**Impact:**
- URLs contain `/Personal-Portfolio/` prefix: `https://brandonjosephtorres.com/Personal-Portfolio/about`
- Reveals repository naming convention
- Creates awkward URLs

**Recommendation:**

**Option 1:** Use a custom domain without base path:

1. Set up custom domain in GitHub Pages settings
2. Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/',  // Root path for custom domain
  // ...
})
```

**Option 2:** Rename repository to use GitHub Pages user site format:
- Rename repo to: `yourusername.github.io`
- This makes it available at root path automatically

**Current Evidence:** Your domain `brandonjosephtorres.com` appears to be configured, so this should be fixable.

**Fix Complexity:** Easy
**Breaking Changes:** Yes - existing bookmarks/links will break (set up redirects)

---

## Informational Findings

### I-1: localStorage Usage Without Error Handling

**Severity:** INFO
**Component:** Theme persistence (useTheme hook)

**Description:**
The `useTheme` hook uses `localStorage` without try-catch blocks. If localStorage is disabled (private browsing, browser settings), the app will crash.

**Location:**
- src/hooks/useTheme.js (lines 5, 19, 25)

**Current Code:**
```javascript
const stored = localStorage.getItem('theme')
// ...
localStorage.setItem('theme', theme)
```

**Recommendation:**

Add error handling:

```javascript
import { useState, useEffect } from 'react'

function safeLocalStorage() {
  try {
    const test = '__localStorage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch {
    return false
  }
}

const hasLocalStorage = safeLocalStorage()

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (hasLocalStorage) {
      const stored = localStorage.getItem('theme')
      if (stored) return stored
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }

    if (hasLocalStorage) {
      try {
        localStorage.setItem('theme', theme)
      } catch {
        console.warn('Failed to save theme preference')
      }
    }
  }, [theme])

  // ... rest of hook
}
```

**Fix Complexity:** Easy
**Breaking Changes:** No

---

### I-2: No robots.txt Restrictions for Dynamic Routes

**Severity:** INFO
**Component:** SEO configuration

**Description:**
The `robots.txt` file allows all bots to crawl all pages, but doesn't account for the fact that case study routes are dynamically generated.

**Location:**
- public/robots.txt

**Current Content:**
```
User-agent: *
Allow: /

Sitemap: https://www.brandonjosephtorres.com/sitemap.xml
```

**Recommendation:**

This is fine for a portfolio site. However, consider:

1. **Verify sitemap.xml includes all case study routes:**
```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.brandonjosephtorres.com/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.brandonjosephtorres.com/about</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.brandonjosephtorres.com/works</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.brandonjosephtorres.com/contact</loc>
    <priority>0.7</priority>
  </url>
  <!-- Add each case study -->
  <url>
    <loc>https://www.brandonjosephtorres.com/works/Safe%20Space</loc>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://www.brandonjosephtorres.com/works/wepay</loc>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://www.brandonjosephtorres.com/works/payrole</loc>
    <priority>0.6</priority>
  </url>
</urlset>
```

2. **Generate sitemap dynamically during build:**

```javascript
// scripts/generate-sitemap.js
import { projects } from './src/lib/data.js'
import fs from 'fs'

const baseUrl = 'https://www.brandonjosephtorres.com'
const staticPages = ['/', '/about', '/works', '/contact']

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page}</loc>
    <priority>${page === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
${projects.map(project => `  <url>
    <loc>${baseUrl}/works/${encodeURIComponent(project.slug)}</loc>
    <priority>0.6</priority>
  </url>`).join('\n')}
</urlset>`

fs.writeFileSync('public/sitemap.xml', sitemap)
console.log('Sitemap generated!')
```

Add to package.json:
```json
"scripts": {
  "build": "node scripts/generate-sitemap.js && vite build"
}
```

**Fix Complexity:** Easy
**Breaking Changes:** No

---

## Positive Security Findings

### What's Done Right

1. **No XSS Vulnerabilities:**
   - No use of `dangerouslySetInnerHTML` anywhere in the codebase
   - No use of `innerHTML` directly
   - All user-facing content is properly escaped by React

2. **No Exposed Secrets:**
   - No API keys, tokens, or secrets in source code
   - `.env` files properly ignored in `.gitignore`
   - No secrets found in git history
   - Analytics IDs (GA4, Clarity) are public by design - safe to expose

3. **Dependency Integrity:**
   - `package-lock.json` contains integrity hashes for all packages
   - npm ci uses lockfile in CI/CD workflow (line 28: `npm ci --legacy-peer-deps`)

4. **Safe Routing:**
   - React Router handles all client-side navigation safely
   - No eval() or Function() constructor usage found (except in safe toast library)
   - URL params are validated before use (CaseStudy.jsx returns <Navigate> for invalid slugs)

5. **Proper Input Validation:**
   - Email regex validation on contact form
   - Form fields trimmed before validation
   - Error states properly managed

6. **HTTPS Enforced:**
   - GitHub Pages enforces HTTPS by default
   - External resources (fonts, analytics) loaded via HTTPS

7. **No SQL Injection Risk:**
   - Static site with no database
   - All data comes from hardcoded `/lib/data.js`

8. **Secure CI/CD:**
   - GitHub Actions uses official actions with version pinning
   - Minimal permissions granted (`contents: read, pages: write, id-token: write`)
   - No secrets exposed in workflow file

---

## Compliance Considerations

### GDPR / Privacy Concerns

**Current State:**
- Google Analytics and Microsoft Clarity track users without explicit consent
- No cookie banner or privacy policy visible

**Recommendation:**
- Add cookie consent banner (see L-2)
- Create privacy policy page
- Implement "Do Not Track" support

### Accessibility (Security-Adjacent)

**Current State:**
- Semantic HTML used throughout
- Alt text present on images
- ARIA labels on icon buttons

**Recommendation:**
- Run automated accessibility audit:
```bash
npm install -D @axe-core/cli
npx axe https://brandonjosephtorres.com --save audit.json
```

---

## Risk Assessment Matrix

| Finding | Likelihood | Impact | Risk Score |
|---------|------------|--------|------------|
| H-1: Vulnerable Dependencies | Medium | Medium | 6/10 |
| H-2: Missing CSP | Low | High | 5/10 |
| H-3: 404 Fallback Pattern | Low | Low | 3/10 |
| M-1: Form Validation | Medium (when implemented) | Medium | 5/10 |
| M-2: Missing Headers | Low | Low | 2/10 |
| L-1: Inline Event Handlers | Very Low | Low | 1/10 |
| L-2: Third-Party Scripts | Low | Medium | 3/10 |
| L-3: Base URL Exposure | Low | Very Low | 1/10 |

---

## Remediation Roadmap

### Immediate (Fix Now)

1. Run `npm audit fix` to update vulnerable dependencies
2. Add Content Security Policy meta tag to `index.html`
3. Review and update form submission implementation with proper service

### Short-Term (Next Sprint)

4. Implement cookie consent banner for GDPR compliance
5. Create custom 404 page with route validation
6. Add privacy policy page
7. Fix base URL configuration for cleaner URLs

### Long-Term (Consider for Future)

8. Migrate to Netlify/Vercel for better security header support
9. Implement server-side rendering for improved SEO and security
10. Add E2E security testing in CI/CD pipeline

---

## Testing Performed

1. **Static Analysis:**
   - Grep scanned all source files for `dangerouslySetInnerHTML`, `innerHTML`, `eval()`
   - Searched for exposed secrets (API_KEY, SECRET, PASSWORD, TOKEN)
   - Checked git history for accidentally committed secrets

2. **Dependency Audit:**
   - `npm audit` identified 3 vulnerabilities (1 moderate, 2 high)

3. **Manual Code Review:**
   - Reviewed all pages and components for XSS vectors
   - Examined form handling logic
   - Inspected routing implementation
   - Analyzed third-party script integration

4. **Configuration Review:**
   - Examined Vite build configuration
   - Reviewed GitHub Actions workflow
   - Checked `.gitignore` for proper secret exclusion

---

## Tools Used

- `npm audit` - Dependency vulnerability scanning
- `grep` / `ripgrep` - Pattern matching for security anti-patterns
- Manual code review - React component security analysis
- Git log analysis - Secret leak detection

---

## Conclusion

This personal portfolio website demonstrates good security fundamentals for a static React application. The most pressing issues are:

1. **Vulnerable dependencies** (easily fixable with `npm audit fix`)
2. **Missing Content Security Policy** (medium effort, high security value)
3. **Form implementation gap** (needs proper backend integration)

The codebase is free of common web vulnerabilities like XSS, SQL injection (N/A for static sites), and exposed secrets. With the recommended fixes applied, this site will have strong security posture appropriate for a public-facing portfolio.

**Overall Grade:** B+ (Good security, minor improvements needed)

---

## Appendix A: Quick Fix Commands

```bash
# Fix vulnerable dependencies
npm audit fix

# If auto-fix doesn't work, update manually
npm update minimatch rollup ajv

# Verify fixes
npm audit

# Test build after updates
npm run build
npm run preview
```

---

## Appendix B: CSP Testing

After adding CSP, test with:

1. Browser DevTools Console - Look for CSP violation errors
2. Chrome CSP Evaluator - https://csp-evaluator.withgoogle.com/
3. Manual testing - Verify analytics still works

---

## Appendix C: Contact Information

For questions about this audit, contact the Security Specialist agent.

**Report Version:** 1.0
**Last Updated:** February 26, 2026
