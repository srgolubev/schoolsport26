"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"
import Image from "next/image"
import AnimatedCounter from "./ui/AnimatedCounter"

function parseBadges(subtitle?: string) {
  // subtitle format: "17 мая 2026 • Садовое кольцо" or similar
  if (subtitle && subtitle.includes("•")) {
    const parts = subtitle.split("•").map(s => s.trim())
    return [
      { icon: Calendar, label: parts[0] || "24 мая 2025" },
      { icon: MapPin, label: parts[1] || "Лужники" },
      { icon: Users, label: "10 000+ участников" },
    ]
  }
  return [
    { icon: Calendar, label: subtitle || "24 мая 2025" },
    { icon: MapPin, label: "Лужники" },
    { icon: Users, label: "10 000+ участников" },
  ]
}

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
  const badges = parseBadges(subtitle)
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const circleY1 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const circleY2 = useTransform(scrollYProgress, [0, 1], [0, -120])
  const circleY3 = useTransform(scrollYProgress, [0, 1], [0, -60])
  const circleY4 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const illustrationY = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <section
      ref={ref}
      className="relative min-h-screen lg:min-h-[600px] lg:max-h-[850px] flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #059669 0%, #10b981 40%, #34d399 100%)" }}
    >
      {/* Diagonal stripe texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0px, #fff 2px, transparent 2px, transparent 24px)",
        }}
      />

      {/* Parallax circles — large background blobs */}
      <motion.div
        className="absolute top-[-60px] right-[-40px] w-72 h-72 lg:w-96 lg:h-96 rounded-full bg-white/10"
        style={{ y: circleY1 }}
      />
      <motion.div
        className="absolute bottom-[-40px] left-[-30px] w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-white/7"
        style={{ y: circleY2 }}
      />

      {/* Additional decorative circles */}
      <motion.div
        className="absolute top-1/4 left-[15%] w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-white/10"
        style={{ y: circleY3 }}
      />
      <motion.div
        className="absolute bottom-1/3 right-[18%] w-20 h-20 lg:w-32 lg:h-32 rounded-full bg-white/8"
        style={{ y: circleY4 }}
      />
      <motion.div
        className="absolute top-[55%] left-[5%] w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-accent/30"
        style={{ y: circleY1 }}
      />
      <motion.div
        className="absolute top-[20%] right-[22%] w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-accent/25"
        style={{ y: circleY3 }}
      />

      {/* Floating sport decorations */}
      <motion.div
        className="absolute top-[12%] left-[8%] text-2xl lg:text-4xl select-none pointer-events-none"
        animate={{ y: [0, -10, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        ⚽
      </motion.div>
      <motion.div
        className="absolute top-[18%] right-[10%] text-xl lg:text-3xl select-none pointer-events-none"
        animate={{ y: [0, -8, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        🏀
      </motion.div>
      <motion.div
        className="absolute bottom-[28%] left-[12%] text-lg lg:text-2xl select-none pointer-events-none"
        animate={{ y: [0, -6, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        🏆
      </motion.div>

      {/* Character illustrations — desktop: absolute sides, mobile: bottom row */}
      <motion.div
        className="absolute bottom-0 left-8 2xl:left-16 z-10 pointer-events-none hidden lg:block"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
        style={{ y: illustrationY }}
      >
        <Image src="/images/girl3.webp" alt="Участница" width={300} height={450} className="w-48 xl:w-64 2xl:w-80 h-auto" />
      </motion.div>
      <motion.div
        className="absolute bottom-0 right-8 2xl:right-16 z-10 pointer-events-none hidden lg:block"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.7, ease: "easeOut" }}
        style={{ y: illustrationY }}
      >
        <Image src="/images/boy2.webp" alt="Участник" width={300} height={450} className="w-48 xl:w-64 2xl:w-80 h-auto" />
      </motion.div>

      {/* Mobile characters — large, clipped at bottom/sides */}
      <motion.div
        className="absolute -bottom-16 -left-12 z-10 pointer-events-none lg:hidden"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
      >
        <Image src="/images/girl3.webp" alt="Участница" width={500} height={750} className="w-[240px] sm:w-[300px] h-auto" />
      </motion.div>
      <motion.div
        className="absolute -bottom-16 -right-12 z-10 pointer-events-none lg:hidden"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
      >
        <Image src="/images/boy2.webp" alt="Участник" width={500} height={750} className="w-[240px] sm:w-[300px] h-auto" />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 max-w-3xl 2xl:max-w-4xl mx-auto px-5 sm:px-8 text-center pt-16 pb-48 sm:pb-56 lg:py-20">
        <motion.div
          className="text-xs font-semibold text-white/80 tracking-[2px] uppercase mb-3"
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
        >
          {subtitle || "24 мая 2025 • Лужники"}
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-black leading-tight text-white mb-4"
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
        >
          {title || "Фестиваль школьного спорта!"}
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-white/85 max-w-xl 2xl:max-w-2xl mx-auto mb-6 leading-relaxed"
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
