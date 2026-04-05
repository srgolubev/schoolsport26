"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock, X } from "lucide-react"
import SectionHeader from "./ui/SectionHeader"

interface Section {
  title: string
  slug: string
  category: string
  time?: string
  contentHtml?: string
  registration_url?: string
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

export default function SectionsPreview({ sections, totalCount }: { sections: Section[]; totalCount: number }) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null)

  return (
    <section id="sections-preview" className="py-16 md:py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Секции фестиваля" subtitle="Выбери своё направление и зарегистрируйся" />

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {sections.map((section) => {
              const isExpanded = expandedSlug === section.slug
              return (
                <motion.div
                  key={section.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, layout: { type: "spring", stiffness: 300, damping: 30 } }}
                  className={isExpanded ? "sm:col-span-2 lg:col-span-3" : ""}
                >
                  <motion.div
                    layout
                    className="bg-white rounded-2xl overflow-hidden shadow-sm h-full cursor-pointer"
                    whileHover={!isExpanded ? { y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" } : {}}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    onClick={() => setExpandedSlug(isExpanded ? null : section.slug)}
                  >
                    {!isExpanded ? (
                      <>
                        <div className="h-36 bg-gradient-to-br from-primary-light/20 to-primary/10 relative overflow-hidden">
                          {section.images?.[0] && (
                            <Image src={section.images[0].url} alt={section.images[0].alt || section.title} fill className="object-cover" />
                          )}
                          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3.5 py-1.5 text-sm font-semibold text-primary-dark">
                            {categoryLabels[section.category] || section.category}
                          </div>
                        </div>
                        <div className="p-5">
                          <div className="font-bold text-lg text-foreground">{section.title}</div>
                          {section.time && <div className="text-sm text-muted mt-1.5">{section.time}</div>}
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-48 md:h-auto bg-gradient-to-br from-primary-light/20 to-primary/10 relative overflow-hidden flex-shrink-0">
                          {section.images?.[0] && (
                            <Image src={section.images[0].url} alt={section.images[0].alt || section.title} fill className="object-cover" />
                          )}
                        </div>
                        <div className="flex-1 p-6 md:p-8">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                              <div className="inline-block bg-primary-light/20 rounded-full px-3 py-1 text-xs font-semibold text-primary-dark mb-2">
                                {categoryLabels[section.category] || section.category}
                              </div>
                              <h3 className="text-2xl md:text-3xl font-black text-foreground">{section.title}</h3>
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); setExpandedSlug(null) }}
                              className="p-2 rounded-lg hover:bg-bg transition-colors flex-shrink-0"
                            >
                              <X size={20} className="text-muted" />
                            </button>
                          </div>

                          {section.time && (
                            <div className="flex items-center gap-2 text-muted mb-4">
                              <Clock size={14} />
                              <span className="text-sm">{section.time}</span>
                            </div>
                          )}

                          {section.contentHtml && (
                            <div
                              className="text-sm text-foreground/80 leading-relaxed mb-6 prose prose-sm max-w-none [&_p]:mb-2 [&_div]:mb-1"
                              dangerouslySetInnerHTML={{ __html: section.contentHtml }}
                            />
                          )}

                          {section.images && section.images.length > 1 && (
                            <div className="flex gap-2 mb-6 overflow-x-auto">
                              {section.images.slice(1, 5).map((img, i) => (
                                <div key={i} className="w-24 h-24 rounded-xl overflow-hidden relative flex-shrink-0">
                                  <Image src={img.url} alt={img.alt || section.title} fill className="object-cover" />
                                </div>
                              ))}
                            </div>
                          )}

                          {section.registration_url && (
                            <a
                              href={section.registration_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold bg-accent text-sm"
                              style={{ boxShadow: "0 4px 16px rgba(249,115,22,0.3)" }}
                            >
                              Зарегистрироваться <ArrowRight size={16} />
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        <div className="mt-10 text-center">
          <Link
            href="/sections"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white bg-primary hover:bg-primary-dark transition-colors"
            style={{ boxShadow: "0 4px 16px rgba(16,185,129,0.3)" }}
          >
            Все {totalCount} секций <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
