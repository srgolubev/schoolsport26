/**
 * Schema.org JSON-LD builders для сайта фестиваля.
 *
 * Дата фестиваля — единый источник правды для микроразметки.
 * Обновлять перед каждым сезоном (используется в startDate/endDate).
 */

export const FESTIVAL_START_ISO = "2026-05-23T10:00:00+03:00"
export const FESTIVAL_END_ISO = "2026-05-23T21:00:00+03:00"

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://festival.schoolsportmos.ru").replace(/\/$/, "")

const absUrl = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`)

/** Минимальный безопасный JSON-encode для встраивания JSON-LD в HTML (XSS-безопасно). */
export const renderJsonLd = (data: unknown): string =>
  JSON.stringify(data).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026")

interface ScheduleItem {
  time: string
  event_name: string
  description?: string
}

interface Headliner {
  name: string
  photoUrl?: string
}

interface FestivalArgs {
  name: string
  description?: string
  bannerUrl: string
  ctaUrl?: string
  ctaText?: string
  address?: string
  latitude?: number
  longitude?: number
  schedule?: ScheduleItem[]
  headliners?: Headliner[]
  organizerName?: string
  organizerUrl?: string
}

const ORGANIZER_DEFAULT = {
  name: "Московский центр воспитательных практик",
  url: "https://schoolsportmos.ru",
}

/** Парсит "10:00" → ISO datetime в день фестиваля. */
const timeToIso = (time: string): string | null => {
  const m = /^(\d{1,2}):(\d{2})/.exec(time.trim())
  if (!m) return null
  const hh = m[1].padStart(2, "0")
  const mm = m[2]
  return `2026-05-23T${hh}:${mm}:00+03:00`
}

export const buildFestivalJsonLd = (args: FestivalArgs) => {
  const location = {
    "@type": "Place",
    name: "Олимпийский комплекс «Лужники»",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Лужники, 24",
      addressLocality: "Москва",
      postalCode: "119048",
      addressCountry: "RU",
    },
    ...(args.address ? { description: args.address } : {}),
    ...(args.latitude && args.longitude
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: args.latitude,
            longitude: args.longitude,
          },
        }
      : {}),
  }

  const performer = (args.headliners ?? []).map((h) => ({
    "@type": "Person",
    name: h.name,
    ...(h.photoUrl ? { image: absUrl(h.photoUrl) } : {}),
  }))

  const subEvents = (args.schedule ?? [])
    .map((s) => {
      const iso = timeToIso(s.time)
      if (!iso) return null
      return {
        "@type": "Event",
        name: s.event_name,
        startDate: iso,
        ...(s.description ? { description: s.description } : {}),
        location,
      }
    })
    .filter((e): e is NonNullable<typeof e> => e !== null)

  return {
    "@context": "https://schema.org",
    "@type": "Festival",
    name: args.name,
    ...(args.description ? { description: args.description } : {}),
    startDate: FESTIVAL_START_ISO,
    endDate: FESTIVAL_END_ISO,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: [absUrl(args.bannerUrl)],
    location,
    organizer: {
      "@type": "Organization",
      name: args.organizerName ?? ORGANIZER_DEFAULT.name,
      url: args.organizerUrl ?? ORGANIZER_DEFAULT.url,
    },
    ...(performer.length > 0 ? { performer } : {}),
    ...(args.ctaUrl
      ? {
          offers: {
            "@type": "Offer",
            url: args.ctaUrl,
            price: "0",
            priceCurrency: "RUB",
            availability: "https://schema.org/InStock",
            validFrom: "2026-01-01T00:00:00+03:00",
            ...(args.ctaText ? { name: args.ctaText } : {}),
          },
        }
      : {}),
    ...(subEvents.length > 0 ? { subEvent: subEvents } : {}),
    url: SITE_URL,
  }
}

interface OrgArgs {
  name?: string
  description?: string
  vkUrl?: string
  telegramUrl?: string
  websiteUrl?: string
}

export const buildOrganizationJsonLd = (args: OrgArgs = {}) => {
  const sameAs = [args.vkUrl, args.telegramUrl, args.websiteUrl].filter((u): u is string => Boolean(u))
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: args.name || ORGANIZER_DEFAULT.name,
    url: args.websiteUrl || ORGANIZER_DEFAULT.url,
    logo: absUrl("/images/logo/mosobr.png"),
    ...(args.description ? { description: args.description } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }
}

export const buildWebSiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Фестиваль школьного и студенческого спорта",
  url: SITE_URL,
  inLanguage: "ru-RU",
})

export const buildBreadcrumbJsonLd = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absUrl(it.url),
  })),
})
