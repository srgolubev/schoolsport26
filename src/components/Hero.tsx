"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"
import Image from "next/image"
import AnimatedCounter from "./ui/AnimatedCounter"

const badges = [
  { icon: Calendar, label: "24 мая 2025" },
  { icon: MapPin, label: "Лужники" },
  { icon: Users, label: "10 000+ участников" },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
}

interface HeroProps {
  title?: string
  subtitle?: string
  description?: string
  ctaUrl?: string
  ctaText?: string
}

export default function Hero({ title, subtitle, description, ctaUrl, ctaText }: HeroProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const circleY1 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const circleY2 = useTransform(scrollYProgress, [0, 1], [0, -120])
  const illustrationY = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #059669 0%, #10b981 40%, #34d399 100%)" }}
    >
      {/* Parallax circles */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 rounded-full bg-white/10"
        style={{ y: circleY1 }}
      />
      <motion.div
        className="absolute bottom-20 left-8 w-48 h-48 rounded-full bg-white/7"
        style={{ y: circleY2 }}
      />

      {/* Character illustrations (desktop) */}
      <motion.div
        className="absolute bottom-0 left-0 z-10 pointer-events-none hidden lg:block"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
        style={{ y: illustrationY }}
      >
        <Image src="/images/girl3.webp" alt="Участница" width={300} height={450} className="w-48 xl:w-60 h-auto" />
      </motion.div>
      <motion.div
        className="absolute bottom-0 right-0 z-10 pointer-events-none hidden lg:block"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.7, ease: "easeOut" }}
        style={{ y: illustrationY }}
      >
        <Image src="/images/boy2.webp" alt="Участник" width={300} height={450} className="w-48 xl:w-60 h-auto" />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 max-w-3xl mx-auto px-5 sm:px-8 text-center py-24">
        <motion.div
          className="text-xs font-semibold text-white/80 tracking-[2px] uppercase mb-3"
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
        >
          {subtitle || "24 мая 2025 • Лужники"}
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white mb-4"
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
        >
          {title || "Фестиваль школьного спорта!"}
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-white/85 max-w-xl mx-auto mb-6 leading-relaxed"
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
        >
          {description || "Более 90 спортивных секций, мастер-классы, соревнования и яркие выступления звёзд на главной сцене"}
        </motion.p>

        {/* Badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
          custom={3} variants={fadeUp} initial="hidden" animate="visible"
        >
          {badges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm">
              <Icon size={14} className="text-white" strokeWidth={2.5} />
              <span className="text-sm font-semibold text-white">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex gap-3 justify-center flex-wrap"
          custom={4} variants={fadeUp} initial="hidden" animate="visible"
        >
          <motion.a
            href={ctaUrl || "https://gorizonty.mos.ru/events/18948"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-bold bg-accent cursor-pointer"
            style={{ boxShadow: "0 6px 24px rgba(249,115,22,0.4)" }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 32px rgba(249,115,22,0.5)" }}
            whileTap={{ scale: 0.97 }}
          >
            {ctaText || "Хочу участвовать"}
            <ArrowRight size={18} />
          </motion.a>
          <motion.a
            href="/sections"
            className="inline-flex items-center px-8 py-3.5 rounded-full text-white font-semibold bg-white/20 backdrop-blur-sm cursor-pointer"
            whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.3)" }}
            whileTap={{ scale: 0.97 }}
          >
            Смотреть секции
          </motion.a>
        </motion.div>

        {/* Stats counters */}
        <motion.div
          className="flex justify-center gap-6 mt-10"
          custom={5} variants={fadeUp} initial="hidden" animate="visible"
        >
          {[
            { target: 96, label: "секций" },
            { target: 14, label: "активностей" },
            { target: 12, label: "партнёров" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/15 backdrop-blur-sm px-5 py-3 rounded-xl text-center">
              <div className="text-2xl font-black text-white">
                <AnimatedCounter target={stat.target} />
              </div>
              <div className="text-xs text-white/70">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
