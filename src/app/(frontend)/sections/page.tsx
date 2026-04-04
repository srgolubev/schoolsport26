import { getPayloadClient } from "@/lib/payload"
import SectionsFilter from "@/components/SectionsFilter"
import SectionHeader from "@/components/ui/SectionHeader"

export const metadata = {
  title: "Секции — Фестиваль школьного спорта 2025",
  description: "Каталог всех секций фестиваля: соревнования, мастер-классы, семейные активности и многое другое.",
}

export default async function SectionsPage() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'sections',
    sort: 'sortOrder',
    limit: 200,
    depth: 1,
  })

  const sections = result.docs.map((s) => ({
    title: s.title,
    slug: s.slug,
    category: s.category,
    time: s.time || undefined,
    contentHtml: (s as unknown as Record<string, string>).contentHtml || undefined,
    registration_url: s.registration_url || undefined,
    images: Array.isArray(s.images)
      ? s.images.map((img) => ({
          url: typeof img === 'object' && img !== null ? (img as { url?: string }).url || '' : '',
          alt: typeof img === 'object' && img !== null ? (img as { alt?: string }).alt : undefined,
        }))
      : [],
  }))

  return (
    <div className="py-24 md:py-32 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Секции фестиваля" subtitle={`${sections.length} секций`} />
        <SectionsFilter sections={sections} />
      </div>
    </div>
  )
}
