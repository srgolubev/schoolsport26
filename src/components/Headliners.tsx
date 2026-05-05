"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import SectionHeader from "./ui/SectionHeader"

interface Headliner {
  photoUrl: string
  name: string
  role: string
}

interface HeadlinersProps {
  items?: Headliner[]
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export default function Headliners({ items }: HeadlinersProps) {
  if (!items || items.length === 0) return null

  return (
    <section
      className="py-16 md:py-24 text-foreground"
      style={{
        background:
          "linear-gradient(180deg, #F4F8FB 0%, #E6EFF7 60%, #DCE9F4 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Хедлайнеры"
          subtitle="Главная сцена фестиваля"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {items.map((headliner, i) => (
            <motion.div
              key={headliner.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-foreground/0 hover:ring-accent/40 transition-shadow"
              whileHover={{
                scale: 1.025,
                transition: { type: "spring", stiffness: 300, damping: 22 },
              }}
            >
              {/* Photo */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={headliner.photoUrl}
                  alt={headliner.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>

              {/* Text below photo */}
              <div className="p-5 md:p-7">
                {headliner.role && (
                  <p className="text-sm md:text-base font-semibold tracking-widest uppercase text-accent mb-2 leading-none">
                    {headliner.role}
                  </p>
                )}
                <h3 className="text-3xl md:text-4xl font-extrabold leading-tight text-foreground">
                  {headliner.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
