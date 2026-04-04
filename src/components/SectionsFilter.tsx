"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

interface Section {
  title: string
  slug: string
  category: string
  time?: string
  images?: { url: string; alt?: string }[]
}

const categoryLabels: Record<string, string> = {
  competitions: "Соревнования",
  family: "Семейные",
  performances: "Выступления",
  esports: "Киберспорт",
  creative: "Творчество",
  masterclass: "Мастер-классы",
  skatepark: "Скейт-парк",
  "balance-bikes": "Беговелы",
  extreme: "Экстрим",
  press: "Пресс-центр",
  titans: "Титаны",
}

export default function SectionsFilter({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState<string | null>(null)
  const categories = [...new Set(sections.map((s) => s.category))]
  const filtered = active ? sections.filter((s) => s.category === active) : sections

  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        <motion.button
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            !active ? "bg-primary-dark text-white" : "bg-white text-foreground hover:bg-primary-light/20"
          }`}
          onClick={() => setActive(null)}
          whileTap={{ scale: 0.95 }}
        >
          Все
        </motion.button>
        {categories.map((cat) => (
          <motion.button
            key={cat}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              active === cat ? "bg-primary-dark text-white" : "bg-white text-foreground hover:bg-primary-light/20"
            }`}
            onClick={() => setActive(cat)}
            whileTap={{ scale: 0.95 }}
          >
            {categoryLabels[cat] || cat}
          </motion.button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((section) => (
            <motion.div
              key={section.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/sections/${section.slug}`}>
                <motion.div
                  className="bg-white rounded-2xl overflow-hidden shadow-sm h-full"
                  whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                >
                  <div className="h-36 bg-gradient-to-br from-primary-light/20 to-primary/10 relative overflow-hidden">
                    {section.images?.[0] && (
                      <Image src={section.images[0].url} alt={section.images[0].alt || section.title} fill className="object-cover" />
                    )}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-primary-dark">
                      {categoryLabels[section.category] || section.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="font-bold text-foreground">{section.title}</div>
                    {section.time && <div className="text-xs text-muted mt-1">{section.time}</div>}
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
