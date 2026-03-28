import { LegalPageLayout } from '@/components/layout/LegalPageLayout'
import { Link } from 'react-router-dom'

export function TermsPage() {
  return (
    <LegalPageLayout pageTitle="Terms of Service" lastUpdated="March 2024">
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using the Torch Studio website and services (the "Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service. Your continued use of the Service following any changes to these terms constitutes your acceptance of the revised terms.
      </p>

      <h2>2. Use of Service</h2>
      <p>
        Torch Studio grants you a limited, non-exclusive, non-transferable license to access and use the Service for personal and commercial purposes in accordance with these Terms. You may not use the Service for any unlawful purpose or in any way that could damage, disable, or impair the Service.
      </p>
      <p>
        You must be at least 13 years of age to use the Service. By using the Service, you represent that you meet this requirement.
      </p>

      <h2>3. Content Licensing</h2>
      <p>
        All music tracks available through the Torch Studio catalog are released under the Creative Commons CC0 1.0 Universal Public Domain Dedication (CC0). Under CC0, creators have waived all copyright and related rights worldwide to the fullest extent permitted by law. This means:
      </p>
      <ul>
        <li>You may copy, modify, distribute, and perform the tracks, even for commercial purposes, without asking permission.</li>
        <li>No attribution is required, though it is appreciated.</li>
        <li>You may use tracks in videos, podcasts, films, apps, advertisements, and any other media.</li>
        <li>There are no royalties or licensing fees beyond the initial purchase price.</li>
      </ul>
      <p>
        The purchase price for tracks covers access to the audio files and the administrative costs of the platform. It does not represent a traditional licensing fee, as CC0 works require no license to use.
      </p>

      <h2>4. Account Responsibilities</h2>
      <p>
        You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You agree to notify Torch Studio immediately of any unauthorized use of your account. Torch Studio is not liable for any loss resulting from unauthorized use of your account.
      </p>
      <p>
        You may not create multiple accounts to circumvent plan limitations or download quotas.
      </p>

      <h2>5. Prohibited Uses</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Resell, redistribute, or sublicense the audio files themselves as standalone music files (using them in a project is permitted; selling the raw audio file is not).</li>
        <li>Use the Service to infringe upon any intellectual property rights.</li>
        <li>Attempt to gain unauthorized access to any part of the Service.</li>
        <li>Use automated tools to scrape, download, or collect data from the Service without permission.</li>
        <li>Misrepresent your identity or affiliation when using the Service.</li>
      </ul>

      <h2>6. Disclaimer of Warranties</h2>
      <p>
        The Service is provided "as is" and "as available" without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. Torch Studio does not warrant that the Service will be uninterrupted, error-free, or free of viruses or other harmful components.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by applicable law, Torch Studio shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your use of or inability to use the Service, even if Torch Studio has been advised of the possibility of such damages.
      </p>
      <p>
        Our total liability to you for any claims arising from the use of the Service shall not exceed the amount you paid to Torch Studio in the 12 months preceding the claim.
      </p>

      <h2>8. Changes to Terms</h2>
      <p>
        Torch Studio reserves the right to modify these Terms at any time. We will notify users of material changes by posting a notice on the website or sending an email to the address associated with your account. Your continued use of the Service after such changes constitutes your acceptance of the revised Terms.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        If you have questions about these Terms, please <Link to="/support/contact" className="text-primary hover:underline">contact us</Link>. We aim to respond to all inquiries within 2 business days.
      </p>
    </LegalPageLayout>
  )
}
