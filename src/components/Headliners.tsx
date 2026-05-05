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
              className="group relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: "4 / 5" }}
              whileHover={{
                scale: 1.025,
                transition: { type: "spring", stiffness: 300, damping: 22 },
              }}
            >
              {/* Photo */}
              <Image
                src={headliner.photoUrl}
                alt={headliner.name}
                fill
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />

              {/* Cinematic gradient overlay — bottom 60% */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.55) 40%, transparent 70%)",
                }}
              />

              {/* Subtle top vignette to separate from section bg */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(10,10,10,0.20) 0%, transparent 25%)",
                }}
              />

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                {headliner.role && (
                  <p className="text-base font-semibold tracking-widest uppercase text-primary mb-2 leading-none">
                    {headliner.role}
                  </p>
                )}
                <h3 className="text-4xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-md">
                  {headliner.name}
                </h3>
              </div>

              {/* Hover accent ring */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-foreground/0 group-hover:ring-accent/40 transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
