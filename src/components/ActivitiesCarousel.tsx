"use client"

import { useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import SectionHeader from "./ui/SectionHeader"

interface Activity {
  title: string
  age_range?: string
  images?: { url: string; alt?: string }[]
}

interface ActivitiesCarouselProps {
  activities: Activity[]
}

export default function ActivitiesCarousel({ activities }: ActivitiesCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    dragFree: true,
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section id="activities" className="py-16 md:py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Активные зоны" subtitle="Развлечения и спорт для каждого" />

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {activities.map((activity, i) => (
                <motion.div
                  key={activity.title}
                  className="min-w-[280px] md:min-w-[320px] flex-shrink-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <motion.div
                    className="bg-white rounded-2xl overflow-hidden shadow-sm h-full"
                    whileHover={{ y: -6, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  >
                    <div className="h-40 bg-gradient-to-br from-primary-light/20 to-primary/10 relative overflow-hidden">
                      {activity.images?.[0] && (
                        <Image
                          src={activity.images[0].url}
                          alt={activity.images[0].alt || activity.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="p-5">
                      <div className="font-bold text-lg text-foreground">{activity.title}</div>
                      {activity.age_range && (
                        <div className="text-sm text-muted mt-1.5">{activity.age_range}</div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-foreground hover:bg-bg transition-colors hidden md:flex"
            aria-label="Назад"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-foreground hover:bg-bg transition-colors hidden md:flex"
            aria-label="Вперёд"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
