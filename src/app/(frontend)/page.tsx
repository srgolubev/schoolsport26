import { getPayloadClient } from "@/lib/payload"
import Hero from "@/components/Hero"
import FestivalDescription from "@/components/FestivalDescription"
import ActivitiesCarousel from "@/components/ActivitiesCarousel"
import Headliners from "@/components/Headliners"
import ScheduleTimeline from "@/components/ScheduleTimeline"
import PartnersGrid from "@/components/PartnersGrid"
import YandexMap from "@/components/YandexMap"

export default async function HomePage() {
  const payload = await getPayloadClient()

  const [settings, activitiesResult, scheduleResult, partnersResult] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.find({ collection: 'activities', sort: 'order', limit: 50, depth: 1 }),
    payload.find({ collection: 'schedule', sort: 'order', limit: 50 }),
    payload.find({ collection: 'partners', sort: 'order', limit: 50, depth: 1 }),
  ])

  const activities = activitiesResult.docs.map((a) => ({
    title: a.title,
    age_range: a.age_range || undefined,
    images: Array.isArray(a.images)
      ? a.images.map((img) => ({
          url: typeof img === 'object' && img !== null ? (img as { url?: string }).url || '' : '',
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
      url: typeof p.logo === 'object' && p.logo !== null ? (p.logo as { url?: string }).url || '' : '',
      alt: typeof p.logo === 'object' && p.logo !== null ? (p.logo as { alt?: string }).alt : undefined,
    },
    url: p.url || undefined,
  }))

  const bannerUrl = typeof settings.headliners_banner === 'object' && settings.headliners_banner !== null
    ? (settings.headliners_banner as { url?: string }).url
    : undefined

  return (
    <>
      <Hero
        title={settings.hero?.title || undefined}
        subtitle={settings.hero?.subtitle || undefined}
        description={settings.hero?.description || undefined}
        ctaUrl={settings.hero?.cta_url || undefined}
        ctaText={settings.hero?.cta_text || undefined}
      />
      <FestivalDescription />
      <ActivitiesCarousel activities={activities} />
      <Headliners bannerUrl={bannerUrl} />
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
