import { LegalPageLayout } from '@/components/layout/LegalPageLayout'
import { Link } from 'react-router-dom'

export function CookiePage() {
  return (
    <LegalPageLayout pageTitle="Cookie Policy" lastUpdated="March 2024">
      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a website. They allow the website to remember information about your visit — such as your login status or preferences — so you don't have to re-enter it on each visit. Cookies cannot access other data on your device or execute programs.
      </p>
      <p>
        Similar technologies include local storage, session storage, and pixels. We refer to all of these collectively as "cookies" in this policy.
      </p>

      <h2>2. Types of Cookies We Use</h2>
      <p><strong>Essential cookies</strong></p>
      <p>
        These cookies are necessary for the Service to function and cannot be switched off. They are typically set in response to actions you take, such as signing in or making a purchase. Without these cookies, you cannot use core features of the Service.
      </p>
      <ul>
        <li><strong>Authentication:</strong> Keeps you signed in across page visits.</li>
        <li><strong>Session:</strong> Maintains your cart and current session state.</li>
        <li><strong>Security:</strong> Helps detect and prevent fraud.</li>
      </ul>

      <p><strong>Analytics cookies</strong></p>
      <p>
        These cookies help us understand how visitors interact with the Service by collecting and reporting usage statistics. The data is aggregated and does not identify individual users.
      </p>
      <ul>
        <li><strong>Usage patterns:</strong> Which pages are visited most, how long users spend on the catalog, which search terms are most common.</li>
        <li><strong>Performance:</strong> How quickly pages load and where errors occur.</li>
      </ul>

      <p><strong>Preference cookies</strong></p>
      <p>
        These cookies remember choices you make to give you a more personalized experience.
      </p>
      <ul>
        <li><strong>Theme:</strong> Your light/dark mode preference.</li>
        <li><strong>Language and region:</strong> Your locale settings.</li>
        <li><strong>Filter state:</strong> Your last-used catalog filters.</li>
      </ul>

      <h2>3. How to Manage Cookies</h2>
      <p>
        You can control and manage cookies through your browser settings. Most browsers allow you to:
      </p>
      <ul>
        <li>View cookies currently stored on your device.</li>
        <li>Delete individual cookies or all cookies.</li>
        <li>Block cookies from specific sites or third parties.</li>
        <li>Set your browser to notify you when a cookie is being set.</li>
      </ul>
      <p>
        Note that disabling essential cookies will prevent you from signing in or completing purchases. Disabling analytics cookies will not affect your ability to use the Service, but it limits our ability to improve it.
      </p>

      <h2>4. Third-Party Cookies</h2>
      <p>
        Some features of the Service use third-party services that may set their own cookies. These include our payment processor (Stripe) and analytics providers. These third-party cookies are governed by the respective privacy policies of those services. We do not have direct control over them. See our <Link to="/legal/privacy" className="text-primary hover:underline">Privacy Policy</Link> for details on third-party services we use.
      </p>
    </LegalPageLayout>
  )
}
