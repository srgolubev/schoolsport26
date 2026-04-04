"use client"

import FadeUp from "./ui/FadeUp"
import SectionHeader from "./ui/SectionHeader"

interface FestivalDescriptionProps {
  content?: string
}

export default function FestivalDescription({ content }: FestivalDescriptionProps) {
  return (
    <section id="about" className="py-16 md:py-24 bg-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <SectionHeader title="О фестивале" />
        <FadeUp index={1}>
          <div
            className="text-base md:text-lg text-foreground/80 leading-relaxed prose prose-lg mx-auto"
            dangerouslySetInnerHTML={{
              __html: content || "Каждый школьник — это супергерой. Приходи и покажи свою суперсилу!",
            }}
          />
        </FadeUp>
      </div>
    </section>
  )
}
