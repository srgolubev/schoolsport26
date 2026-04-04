"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import SectionHeader from "./ui/SectionHeader"

interface HeadlinersProps {
  bannerUrl?: string
}

export default function Headliners({ bannerUrl }: HeadlinersProps) {
  return (
    <section className="py-16 md:py-24 bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Хедлайнеры" subtitle="Главная сцена фестиваля" className="[&_h2]:text-white [&_p]:text-white/60" />
        {bannerUrl && (
          <motion.div
            className="rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <Image src={bannerUrl} alt="Хедлайнеры фестиваля" width={1200} height={400} className="w-full h-auto object-cover" />
          </motion.div>
        )}
      </div>
    </section>
  )
}
