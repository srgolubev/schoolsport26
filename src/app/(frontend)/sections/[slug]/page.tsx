import { getPayloadClient } from "@/lib/payload"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Clock } from "lucide-react"
import FadeUp from "@/components/ui/FadeUp"
import JsonLd from "@/components/JsonLd"
import { mediaUrl } from "@/lib/mediaUrl"
import { buildBreadcrumbJsonLd } from "@/lib/structuredData"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const result = await payload.find({ collection: 'sections', limit: 200, select: { slug: true } })
  return result.docs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({ collection: 'sections', where: { slug: { equals: slug } }, limit: 1 })
  const section = result.docs[0]
  if (!section) return { title: "Не найдено" }
  return {
    title: `${section.title} — Фестиваль школьного и студенческого спорта`,
    description: `Секция «${section.title}» на Фестивале школьного спорта 2026`,
  }
}

export default async function SectionPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'sections',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })

  const section = result.docs[0]
  if (!section) notFound()

  const images = Array.isArray(section.images)
    ? section.images
        .filter((img): img is Record<string, unknown> => typeof img === 'object' && img !== null)
        .map((img) => ({ url: mediaUrl(img.url as string | undefined), alt: (img.alt as string) || section.title }))
    : []

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Главная", url: "/" },
    { name: "Соревнования", url: "/sections" },
    { name: section.title, url: `/sections/${section.slug}` },
  ])

  return (
    <div className="py-24 md:py-32 bg-bg">
      <JsonLd data={breadcrumb} id="ld-breadcrumb" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <FadeUp>
          <Link href="/sections" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary-dark transition-colors mb-8">
            <ArrowLeft size={16} /> Все соревнования
          </Link>
        </FadeUp>

        <FadeUp index={1}>
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4">{section.title}</h1>
        </FadeUp>

        {section.time && (
          <FadeUp index={2}>
            <div className="flex items-center gap-2 text-muted mb-6">
              <Clock size={16} />
              <span className="text-sm">{section.time}</span>
            </div>
          </FadeUp>
        )}

        {images.length > 0 && (
          <FadeUp index={3}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {images.map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden aspect-[4/3] relative">
                  <Image src={mediaUrl(img.url)} alt={img.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </FadeUp>
        )}

        {section.registration_url && (
          <FadeUp index={5}>
            <a
              href={section.registration_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-bold bg-accent"
              style={{ boxShadow: "0 6px 24px rgba(249,115,22,0.4)" }}
            >
              Зарегистрироваться <ArrowRight size={18} />
            </a>
          </FadeUp>
        )}
      </div>
    </div>
  )
}
