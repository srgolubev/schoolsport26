"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import SectionHeader from "./ui/SectionHeader"

interface Partner {
  name: string
  logo: { url: string; alt?: string }
  url?: string
}

interface PartnersGridProps {
  partners: Partner[]
}

export default function PartnersGrid({ partners }: PartnersGridProps) {
  return (
    <section id="partners" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Партнёры" subtitle="Нас поддерживают" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {partners.map((partner, i) => (
            <motion.a
              key={partner.name}
              href={partner.url || "#"}
              target={partner.url ? "_blank" : undefined}
              rel={partner.url ? "noopener noreferrer" : undefined}
              className="bg-bg-white border border-[#f3f4f6] rounded-2xl p-6 flex items-center justify-center h-28 md:h-32"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.05, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
            >
              <Image
                src={partner.logo.url}
                alt={partner.logo.alt || partner.name}
                width={180}
                height={72}
                className="max-h-16 md:max-h-20 w-auto object-contain"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
