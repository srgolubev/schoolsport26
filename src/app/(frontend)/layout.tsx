import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { getPayloadClient } from "@/lib/payload"

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings' })

  return (
    <>
      <Header />
      <main className="pt-16 md:pt-20">{children}</main>
      <Footer
        orgName={settings.footer?.org_name || undefined}
        orgDescription={settings.footer?.org_description || undefined}
        vkUrl={settings.footer?.vk_url || undefined}
        telegramUrl={settings.footer?.telegram_url || undefined}
        websiteUrl={settings.footer?.website_url || undefined}
      />
    </>
  )
}
