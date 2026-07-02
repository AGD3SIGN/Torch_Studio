import { PageLayout } from '@/components/layout/PageLayout'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    q: 'What does CC0 mean?',
    a: 'CC0 stands for Creative Commons Zero. It is a public domain dedication — the creator has waived all copyright and related rights worldwide to the fullest extent permitted by law. Tracks released under CC0 are effectively in the public domain, which means you can copy, modify, distribute, and use them for any purpose — commercial or non-commercial — without asking permission or providing attribution.',
  },
  {
    q: 'Can I use tracks in YouTube videos?',
    a: 'Yes. CC0 tracks are safe to use on YouTube. Because the copyright has been waived, there is no valid basis for a Content ID claim. However, some third parties occasionally register CC0 tracks without authorization. If you receive a Content ID claim on a CC0 track from Torch Studio, dispute it and provide the CC0 license documentation. Most disputes on legitimately CC0 tracks are resolved within 30 days.',
  },
  {
    q: 'Can I use these tracks in commercial projects?',
    a: 'Yes. CC0 explicitly permits use in commercial projects. This includes advertisements, branded content, products for sale, paid client work, and anything else with a commercial purpose. There are no additional fees or permissions required.',
  },
  {
    q: 'Do I need to credit Torch Studio?',
    a: 'No. Attribution is not required under CC0. You are free to use the tracks without any credit. That said, if you enjoy the music and want to support the platform, a mention in your video description or podcast notes is always appreciated — though entirely optional.',
  },
  {
    q: 'Can I use tracks in a podcast?',
    a: 'Yes. There are no restrictions on podcast use. You can use tracks as intro music, outro music, transition cues, or background beds in any podcast — monetized, sponsored, or otherwise. CC0 covers all of these uses.',
  },
  {
    q: 'What about films and documentaries?',
    a: 'Yes. There are no restrictions on the type of project or medium. CC0 means the work is effectively in the public domain, so you can use tracks in short films, feature films, documentaries, branded films, and any other video production without limitation.',
  },
  {
    q: 'Can I remix or modify the tracks?',
    a: 'Yes. CC0 explicitly allows modification, remixing, and the creation of derivative works. You can edit the audio, change the tempo, add your own elements, or incorporate tracks into original compositions. There are no restrictions on how you modify the work.',
  },
  {
    q: 'What if I receive a copyright claim on YouTube?',
    a: "Dispute the claim. In the dispute form, state that the music is released under Creative Commons CC0 1.0 Universal and was sourced from Torch Studio. You can reference the original track in your Torch Studio account downloads. Most platforms resolve these disputes within 30 days. If the claim is persistent, contact us and we'll provide written confirmation of the CC0 status.",
  },
  {
    q: 'Is there a difference between the Free and Creator plan license?',
    a: "No. All tracks in the Torch Studio catalog use the same CC0 license regardless of which plan you're on. The difference between plans is how you access downloads — Free users buy individual tracks per-track; Creator gets 30 downloads/month; Pro gets unlimited downloads plus WAV files in addition to MP3. The license terms are identical across all plans.",
  },
  {
    q: 'Can I use tracks in paid client work?',
    a: "Yes. CC0 permits use in any commercial project including work you're paid to produce for clients — promotional videos, brand films, social media content, app demos, and anything else. You don't need to disclose that the music is CC0 licensed or get any additional sign-off from your client.",
  },
  {
    q: 'Can I use tracks in mobile apps?',
    a: 'Yes. There are no restrictions on app use. You can include CC0 tracks in free apps, paid apps, apps with in-app purchases, and enterprise software. No additional licensing steps are required.',
  },
  {
    q: 'What audio formats are available?',
    a: 'Free and Creator plan users receive MP3 files at 320kbps. Pro plan users receive both MP3 (320kbps) and WAV (24-bit/48kHz) files. All formats carry the same CC0 license.',
  },
  {
    q: 'Can I use tracks in broadcast TV or radio?',
    a: "Yes. CC0 has no medium restrictions. If your broadcaster requires formal documentation for their records, contact us and we'll provide a written letter confirming the CC0 status of any tracks you've licensed.",
  },
  {
    q: 'Are stems or individual instrument tracks available?',
    a: 'Stems are available for select tracks on the Pro plan. Look for the "Stems available" badge when browsing the catalog. Stems are delivered as individual WAV files (drums, bass, melody, etc.) and carry the same CC0 license as the full track.',
  },
  {
    q: "What if a track I downloaded is later removed from the catalog?",
    a: "Your license is perpetual. If a track is removed from the catalog, your right to use files you've already downloaded is unaffected. We recommend keeping local copies of all downloaded tracks for this reason. Removal from the catalog does not revoke any rights already granted.",
  },
]

export function LicenseFAQPage() {
  return (
    <PageLayout title="License FAQ — Torch Studio">
      <div className="bg-secondary/40 border-b border-border">
        <div className="section-container py-12">
          <h1 className="text-4xl font-bold text-foreground">License FAQ</h1>
          <p className="text-muted-foreground mt-2 max-w-xl">
            Everything you need to know about using Torch Studio tracks in your projects.
            All tracks are CC0 — the simplest license available.
          </p>
        </div>
      </div>

      <div className="section-container py-12">
        <div className="max-w-3xl">
          <Accordion multiple className="flex flex-col gap-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl border border-border px-5 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="py-4 text-sm font-medium text-foreground hover:no-underline text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </PageLayout>
  )
}
