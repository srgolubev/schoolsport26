import { getPayloadClient } from "@/lib/payload"
import Hero from "@/components/Hero"
import FestivalDescription from "@/components/FestivalDescription"
import type { FestivalFeature } from "@/components/FestivalDescription"
import ActivitiesCarousel from "@/components/ActivitiesCarousel"
import SectionsPreview from "@/components/SectionsPreview"
import Headliners from "@/components/Headliners"
import ScheduleTimeline from "@/components/ScheduleTimeline"
import PartnersGrid from "@/components/PartnersGrid"
import YandexMap from "@/components/YandexMap"
import JsonLd from "@/components/JsonLd"
import { mediaUrl } from "@/lib/mediaUrl"
import { buildFestivalJsonLd, buildWebSiteJsonLd } from "@/lib/structuredData"

export default async function HomePage() {
  const payload = await getPayloadClient()

  const [settings, activitiesResult, scheduleResult, partnersResult, sectionsResult] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings', depth: 1 }),
    payload.find({ collection: 'activities', sort: 'sortOrder', limit: 50, depth: 1 }),
    payload.find({ collection: 'schedule', sort: 'sortOrder', limit: 50 }),
    payload.find({ collection: 'partners', sort: 'sortOrder', limit: 50, depth: 1 }),
    payload.find({ collection: 'sections', sort: 'sortOrder', limit: 200, depth: 1 }),
  ])

  const activities = activitiesResult.docs.map((a) => ({
    title: a.title,
    age_range: a.age_range || undefined,
    images: Array.isArray(a.images)
      ? a.images.map((img) => ({
          url: mediaUrl(typeof img === 'object' && img !== null ? (img as { url?: string }).url : undefined),
          alt: typeof img === 'object' && img !== null ? (img as { alt?: string }).alt : undefined,
        }))
      : [],
  }))

  const schedule = scheduleResult.docs.map((s) => ({
    time: s.time,
    event_name: s.event_name,
    description: s.description || undefined,
  }))

  const partners = partnersResult.docs.map((p) => ({
    name: p.name,
    logo: {
      url: mediaUrl(typeof p.logo === 'object' && p.logo !== null ? (p.logo as { url?: string }).url : undefined),
      alt: typeof p.logo === 'object' && p.logo !== null ? (p.logo as { alt?: string }).alt : undefined,
    },
    url: p.url || undefined,
  }))

  const allSections = sectionsResult.docs.map((s) => ({
    title: s.title,
    slug: s.slug,
    category: s.category,
    time: s.time || undefined,
    contentHtml: (s as unknown as Record<string, string>).contentHtml || undefined,
    registration_url: s.registration_url || undefined,
    images: Array.isArray(s.images)
      ? s.images.map((img) => ({
          url: mediaUrl(typeof img === 'object' && img !== null ? (img as { url?: string }).url : undefined),
          alt: typeof img === 'object' && img !== null ? (img as { alt?: string }).alt : undefined,
        }))
      : [],
  }))

  const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5)
  const withReg = allSections.filter((s) => s.registration_url)
  const withoutReg = allSections.filter((s) => !s.registration_url)
  const previewSections = withReg.length >= 3
    ? shuffle(withReg).slice(0, 3)
    : [...shuffle(withReg), ...shuffle(withoutReg).slice(0, 3 - withReg.length)]

  // ── Extract structured festival description fields ──────────────────────────
  const s = settings as unknown as Record<string, unknown>

  const festivalLede = typeof s.festival_lede === 'string' ? s.festival_lede : undefined
  const festivalIntro = typeof s.festival_intro === 'string' ? s.festival_intro : undefined
  const festivalMotto = typeof s.festival_motto === 'string' ? s.festival_motto : undefined
  const festivalBridge = typeof s.festival_bridge === 'string' ? s.festival_bridge : undefined
  const festivalFinale = typeof s.festival_finale === 'string' ? s.festival_finale : undefined
  const festivalClosing = typeof s.festival_closing === 'string' ? s.festival_closing : undefined
  const festivalFinalHook = typeof s.festival_final_hook === 'string' ? s.festival_final_hook : undefined
  const festivalCtaUrl = typeof s.festival_cta_url === 'string' ? s.festival_cta_url : undefined
  const festivalCtaText = typeof s.festival_cta_text === 'string' ? s.festival_cta_text : undefined

  // 3 group-поля festival_feature_1..3 — собираем в массив
  const buildFeature = (group: unknown): FestivalFeature | null => {
    if (!group || typeof group !== 'object') return null
    const g = group as Record<string, unknown>
    const icon = g.icon === 'star' || g.icon === 'music' || g.icon === 'trophy' ? g.icon : 'star'
    const title = typeof g.title === 'string' ? g.title : ''
    const text = typeof g.text === 'string' ? g.text : ''
    if (!title) return null
    return { icon, title, text }
  }
  const festivalFeatures: FestivalFeature[] = [
    buildFeature(s.festival_feature_1),
    buildFeature(s.festival_feature_2),
    buildFeature(s.festival_feature_3),
  ].filter((f): f is FestivalFeature => f !== null)

  const buildHeadliner = (group: unknown) => {
    if (!group || typeof group !== 'object') return null
    const g = group as { photo?: { url?: string } | number | null; name?: string; role?: string }
    const url = typeof g.photo === 'object' && g.photo !== null ? mediaUrl(g.photo.url) : undefined
    if (!url || !g.name) return null
    return { photoUrl: url, name: g.name, role: g.role || '' }
  }
  const headliners = [
    buildHeadliner((settings as unknown as Record<string, unknown>).headliner_1),
    buildHeadliner((settings as unknown as Record<string, unknown>).headliner_2),
  ].filter((h): h is { photoUrl: string; name: string; role: string } => h !== null)

  const festivalJsonLd = buildFestivalJsonLd({
    name: settings.hero?.title || "Фестиваль школьного и студенческого спорта",
    description:
      (settings as unknown as { meta?: { description?: string } }).meta?.description ||
      settings.hero?.description ||
      undefined,
    bannerUrl: "/images/og-festival.jpg",
    ctaUrl: settings.hero?.cta_url || undefined,
    ctaText: settings.hero?.cta_text || undefined,
    address: settings.map?.address || undefined,
    latitude: settings.map?.latitude || undefined,
    longitude: settings.map?.longitude || undefined,
    schedule,
    headliners: headliners.map((h) => ({ name: h.name, photoUrl: h.photoUrl })),
    organizerName: settings.footer?.org_description || undefined,
    organizerUrl: settings.footer?.website_url || undefined,
  })

  return (
    <>
      <JsonLd data={buildWebSiteJsonLd()} id="ld-website" />
      <JsonLd data={festivalJsonLd} id="ld-festival" />
      <Hero
        title={settings.hero?.title || undefined}
        subtitle={settings.hero?.subtitle || undefined}
        description={settings.hero?.description || undefined}
        ctaUrl={settings.hero?.cta_url || undefined}
        ctaText={settings.hero?.cta_text || undefined}
        stats={{
          sections: sectionsResult.totalDocs,
          activities: activitiesResult.totalDocs,
          partners: partnersResult.totalDocs,
        }}
      />
      <FestivalDescription
        lede={festivalLede}
        intro={festivalIntro}
        motto={festivalMotto}
        bridge={festivalBridge}
        features={festivalFeatures.length > 0 ? festivalFeatures : undefined}
        finale={festivalFinale}
        closing={festivalClosing}
        finalHook={festivalFinalHook}
        ctaUrl={festivalCtaUrl}
        ctaText={festivalCtaText}
      />
      <ActivitiesCarousel activities={activities} />
      <SectionsPreview sections={previewSections} totalCount={sectionsResult.totalDocs} />
      <Headliners items={headliners} />
      <ScheduleTimeline items={schedule} />
      <PartnersGrid partners={partners} />
      <YandexMap
        latitude={settings.map?.latitude || undefined}
        longitude={settings.map?.longitude || undefined}
        address={settings.map?.address || undefined}
      />
    </>
  )
}
