"use client"

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Star, Music, Trophy, ArrowRight, Quote } from "lucide-react"
import { useRef, useState } from "react"
import SectionHeader from "./ui/SectionHeader"
import FadeUp from "./ui/FadeUp"

export interface FestivalFeature {
  icon: "star" | "music" | "trophy"
  title: string
  text: string
}

interface FestivalDescriptionProps {
  lede?: string
  intro?: string
  motto?: string
  bridge?: string
  features?: FestivalFeature[]
  finale?: string
  closing?: string
  finalHook?: string
  ctaUrl?: string
  ctaText?: string
}

const ICON_MAP = {
  star: Star,
  music: Music,
  trophy: Trophy,
}

// Each feature card gets a full editorial identity
const FEATURE_STYLES = [
  {
    // Card 1 — Stars: deep orange-to-crimson
    gradient: "linear-gradient(145deg, #1a0a00 0%, #3d1500 45%, #7c2d12 100%)",
    stripeColor: "#f97316",
    glowColor: "rgba(249,115,22,0.55)",
    ghostColor: "rgba(249,115,22,0.07)",
    iconRingFrom: "#f97316",
    iconRingTo: "#fb923c",
    iconColor: "#f97316",
    label: "01",
  },
  {
    // Card 2 — Music: deep emerald-to-teal
    gradient: "linear-gradient(145deg, #001a0e 0%, #003d21 45%, #065f46 100%)",
    stripeColor: "#10b981",
    glowColor: "rgba(16,185,129,0.55)",
    ghostColor: "rgba(16,185,129,0.07)",
    iconRingFrom: "#10b981",
    iconRingTo: "#34d399",
    iconColor: "#10b981",
    label: "02",
  },
  {
    // Card 3 — Activities: deep indigo-to-emerald
    gradient: "linear-gradient(145deg, #050d1a 0%, #0c1f3d 45%, #134e4a 100%)",
    stripeColor: "#34d399",
    glowColor: "rgba(52,211,153,0.55)",
    ghostColor: "rgba(52,211,153,0.07)",
    iconRingFrom: "#34d399",
    iconRingTo: "#10b981",
    iconColor: "#34d399",
    label: "03",
  },
]

// Container stagger: children fade-up one after another
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

// Individual tilt card component — isolates motion values per card
function FeatureCard({
  feat,
  index,
}: {
  feat: FestivalFeature
  index: number
}) {
  const style = FEATURE_STYLES[index % FEATURE_STYLES.length]
  const Icon = ICON_MAP[feat.icon] ?? Star
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Raw pointer position relative to card center
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  // Spring-smoothed tilt values
  const springConfig = { stiffness: 200, damping: 30, mass: 0.5 }
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]), springConfig)
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]), springConfig)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    rawX.set(nx)
    rawY.set(ny)
  }

  function handleMouseLeave() {
    rawX.set(0)
    rawY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-3xl overflow-hidden cursor-default"
    >
      {/* Main card background */}
      <div
        className="absolute inset-0"
        style={{ background: style.gradient }}
        aria-hidden
      />

      {/* Diagonal accent stripe — top-left corner slash */}
      <div
        className="absolute top-0 left-0 w-24 h-24 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${style.stripeColor}33 0%, transparent 60%)`,
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
        }}
        aria-hidden
      />

      {/* Thin top border line in accent color */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
        style={{
          background: `linear-gradient(90deg, ${style.stripeColor}, transparent 80%)`,
        }}
        aria-hidden
      />

      {/* Ghost number — editorial depth layer */}
      <div
        className="absolute bottom-3 right-4 font-black leading-none select-none pointer-events-none"
        style={{
          fontSize: "clamp(6rem, 14vw, 10rem)",
          color: style.ghostColor,
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "-0.05em",
        }}
        aria-hidden
      >
        {style.label}
      </div>

      {/* Shimmer sweep on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: "-110%" }}
        animate={{ x: isHovered ? "110%" : "-110%" }}
        transition={{ duration: 0.65, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.07) 50%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* Card content — lifted in z so it floats over decorations */}
      <div className="relative z-10 p-7 md:p-8 flex flex-col min-h-[240px] md:min-h-[280px]">

        {/* Icon with glow halo */}
        <motion.div
          className="mb-6 w-16 h-16 rounded-2xl flex items-center justify-center relative"
          animate={isHovered ? { scale: 1.12, rotate: 8 } : { scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 20 }}
          style={{
            background: `radial-gradient(circle at 30% 30%, ${style.iconRingFrom}22, ${style.iconRingTo}11)`,
            boxShadow: isHovered
              ? `0 0 0 1px ${style.iconRingFrom}55, 0 0 28px ${style.glowColor}`
              : `0 0 0 1px ${style.iconRingFrom}33, 0 0 12px ${style.glowColor}66`,
          }}
        >
          <Icon
            size={32}
            strokeWidth={1.75}
            aria-hidden
            style={{ color: style.iconColor }}
          />
        </motion.div>

        {/* Title */}
        <h3
          className="text-2xl md:text-3xl font-extrabold leading-tight text-white mb-3"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
        >
          {feat.title}
        </h3>

        {/* Body text */}
        <p
          className="text-base md:text-lg leading-relaxed font-medium"
          style={{ color: "rgba(255,255,255,0.72)" }}
        >
          {feat.text}
        </p>

        {/* Bottom accent line — grows on hover */}
        <motion.div
          className="mt-auto pt-6"
          initial={false}
        >
          <motion.div
            className="h-[3px] rounded-full"
            style={{ background: style.stripeColor }}
            animate={{ width: isHovered ? "100%" : "32px" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function FestivalDescription({
  lede,
  intro,
  motto,
  bridge,
  features,
  finale,
  closing,
  finalHook,
  ctaUrl,
  ctaText,
}: FestivalDescriptionProps) {
  // Render nothing if there is no meaningful content
  const hasContent = lede || intro || motto || bridge || (features && features.length > 0) || finale || closing || finalHook
  if (!hasContent) return null

  return (
    <section id="about" className="py-16 md:py-24 bg-bg overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Section label */}
        <SectionHeader title="О фестивале" />

        {/* Lede — large emotional hook */}
        {lede && (
          <FadeUp index={0}>
            <p className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-6 md:mb-8">
              {lede}
            </p>
          </FadeUp>
        )}

        {/* Intro paragraph */}
        {intro && (
          <FadeUp index={1}>
            <p className="text-center text-base md:text-lg text-foreground/75 leading-relaxed max-w-2xl mx-auto mb-10 md:mb-14">
              {intro}
            </p>
          </FadeUp>
        )}

        {/* ── Motto pull-quote — visual centrepiece ── */}
        {motto && (
          <FadeUp index={2}>
            <div className="relative my-12 md:my-16 flex flex-col items-center text-center">
              {/* Decorative top bar */}
              <motion.div
                className="w-16 h-1 rounded-full bg-accent mb-6"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 }}
                style={{ transformOrigin: "center" }}
              />

              {/* Large opening quotation mark */}
              <Quote
                className="text-primary/20 mb-2"
                size={56}
                strokeWidth={1.5}
                aria-hidden
              />

              {/* The motto itself */}
              <motion.p
                className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-none tracking-tight"
                style={{
                  background: "linear-gradient(135deg, #10b981 0%, #059669 50%, #f97316 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              >
                {motto}
              </motion.p>

              {/* Decorative bottom underline */}
              <motion.div
                className="mt-5 w-24 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.35 }}
                style={{ transformOrigin: "center" }}
              />
            </div>
          </FadeUp>
        )}

        {/* Bridge paragraph */}
        {bridge && (
          <FadeUp index={3}>
            <p className="text-center text-base md:text-lg text-foreground/75 leading-relaxed max-w-2xl mx-auto mb-12 md:mb-16">
              {bridge}
            </p>
          </FadeUp>
        )}

        {/* ── Feature cards ── */}
        {features && features.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-12 md:mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {features.map((feat, i) => (
              <FeatureCard key={i} feat={feat} index={i} />
            ))}
          </motion.div>
        )}

        {/* ── Finale callout — climax of the block ── */}
        {finale && (
          <FadeUp index={4}>
            <div className="relative rounded-3xl overflow-hidden mb-10 md:mb-12">
              {/* Gradient background */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, #059669 0%, #10b981 55%, #f97316 100%)",
                }}
                aria-hidden
              />
              {/* Subtle noise overlay for texture */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='40' height='40' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
                }}
                aria-hidden
              />

              <div className="relative px-6 py-8 md:px-10 md:py-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                {/* Trophy icon */}
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center">
                  <Trophy size={28} className="text-white" strokeWidth={2} aria-hidden />
                </div>

                <p className="text-white text-lg md:text-xl font-extrabold leading-snug">
                  {finale}
                </p>
              </div>
            </div>
          </FadeUp>
        )}

        {/* Closing paragraph */}
        {closing && (
          <FadeUp index={5}>
            <p className="text-center text-base md:text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto mb-6">
              {closing}
            </p>
          </FadeUp>
        )}

        {/* Final hook — emotional last line */}
        {finalHook && (
          <FadeUp index={6}>
            <p className="text-center text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground mb-10 md:mb-12">
              {finalHook}
            </p>
          </FadeUp>
        )}

        {/* CTA button */}
        {ctaUrl && (
          <FadeUp index={7}>
            <div className="flex justify-center">
              <a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 text-lg md:text-xl font-extrabold rounded-2xl bg-primary text-white hover:bg-primary-dark active:scale-[0.97] transition-all shadow-lg hover:shadow-xl"
              >
                {ctaText || "Зарегистрироваться"}
                <ArrowRight size={20} strokeWidth={2.5} aria-hidden />
              </a>
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  )
}
