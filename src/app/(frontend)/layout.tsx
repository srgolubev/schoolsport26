import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import PageTransition from "@/components/PageTransition"
import CookieConsent from "@/components/CookieConsent"
import JsonLd from "@/components/JsonLd"
import { buildOrganizationJsonLd } from "@/lib/structuredData"
import { getPayloadClient } from "@/lib/payload"

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings' })

  const orgJsonLd = buildOrganizationJsonLd({
    name: settings.footer?.org_name || undefined,
    description: settings.footer?.org_description || undefined,
    vkUrl: settings.footer?.vk_url || undefined,
    telegramUrl: settings.footer?.telegram_url || undefined,
    websiteUrl: settings.footer?.website_url || undefined,
  })

  return (
    <>
      <JsonLd data={orgJsonLd} id="ld-organization" />
      <Header
        ctaUrl={settings.hero?.cta_url || undefined}
        ctaText={settings.hero?.cta_text || undefined}
      />
      <main className="pt-16 md:pt-20"><PageTransition>{children}</PageTransition></main>
      <Footer
        orgName={settings.footer?.org_name || undefined}
        orgDescription={settings.footer?.org_description || undefined}
        vkUrl={settings.footer?.vk_url || undefined}
        telegramUrl={settings.footer?.telegram_url || undefined}
        websiteUrl={settings.footer?.website_url || undefined}
      />
      <CookieConsent />
    </>
  )
}
