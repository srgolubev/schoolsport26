"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import SectionHeader from "./ui/SectionHeader"

interface YandexMapProps {
  latitude?: number
  longitude?: number
  address?: string
}

export default function YandexMap({
  latitude = 55.715527,
  longitude = 37.561301,
  address = "Олимпийский комплекс «Лужники», Южное спортивное ядро",
}: YandexMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (loaded) return
    const script = document.createElement("script")
    script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU`
    script.onload = () => {
      const ymaps = (window as unknown as Record<string, unknown>).ymaps as {
        ready: (fn: () => void) => void
        Map: new (el: HTMLElement, opts: Record<string, unknown>) => unknown
        Placemark: new (coords: number[], props: Record<string, string>) => unknown
      }
      ymaps.ready(() => {
        if (!mapRef.current) return
        const map = new ymaps.Map(mapRef.current, {
          center: [latitude, longitude],
          zoom: 15,
        })
        const placemark = new ymaps.Placemark([latitude, longitude], { balloonContent: address })
        ;(map as Record<string, { add: (p: unknown) => void }>).geoObjects.add(placemark)
        setLoaded(true)
      })
    }
    document.head.appendChild(script)
  }, [latitude, longitude, address, loaded])

  return (
    <section
      id="map"
      className="py-16 md:py-24"
      style={{
        background: "linear-gradient(135deg, #4F9EDB 0%, #7BBEEA 45%, #A8D8F2 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Как добраться"
          subtitle={address}
          className="[&_h2]:text-white [&_p]:text-white/80"
        />
        <motion.div
          className="rounded-2xl overflow-hidden h-[400px]"
          ref={mapRef}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </section>
  )
}
