import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://festival.example.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient()
  const sections = await payload.find({ collection: 'sections', limit: 200, select: { slug: true, updatedAt: true } })

  const sectionUrls = sections.docs.map((s) => ({
    url: `${SITE_URL}/sections/${s.slug}`,
    lastModified: s.updatedAt,
  }))

  return [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/sections`, lastModified: new Date() },
    ...sectionUrls,
  ]
}
