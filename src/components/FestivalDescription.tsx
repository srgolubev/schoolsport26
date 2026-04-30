"use client"

import FadeUp from "./ui/FadeUp"
import SectionHeader from "./ui/SectionHeader"

interface FestivalDescriptionProps {
  content?: string
  ctaUrl?: string
  ctaText?: string
}

export default function FestivalDescription({ content, ctaUrl, ctaText }: FestivalDescriptionProps) {
  return (
    <section id="about" className="py-16 md:py-24 bg-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <SectionHeader title="О фестивале" />
        <FadeUp index={1}>
          <div
            className="text-base md:text-lg text-foreground/80 leading-relaxed prose prose-lg mx-auto text-left"
            dangerouslySetInnerHTML={{
              __html: content || "Каждый школьник — это супергерой. Приходи и покажи свою суперсилу!",
            }}
          />
        </FadeUp>
        {ctaUrl && (
          <FadeUp index={2}>
            <div className="mt-10">
              <a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-lg md:text-xl font-bold rounded-2xl bg-primary text-white hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
              >
                {ctaText || "Зарегистрироваться"}
              </a>
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  )
}
