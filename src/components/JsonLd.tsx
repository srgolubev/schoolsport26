import { renderJsonLd } from "@/lib/structuredData"

interface Props {
  data: unknown
  id?: string
}

export default function JsonLd({ data, id }: Props) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: renderJsonLd(data) }}
    />
  )
}
