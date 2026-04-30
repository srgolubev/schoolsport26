"use client"

import { motion } from "framer-motion"
import { Star, Music, Trophy, ArrowRight, Quote } from "lucide-react"
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

// Each feature card gets a visual identity: accent (orange), primary (green), primary-light
const FEATURE_STYLES = [
  {
    iconBg: "bg-accent/10 border-accent/25",
    iconColor: "text-accent",
    border: "border-accent/20",
    badge: "bg-accent/10 text-accent",
  },
  {
    iconBg: "bg-primary/10 border-primary/25",
    iconColor: "text-primary",
    border: "border-primary/20",
    badge: "bg-primary/10 text-primary",
  },
  {
    iconBg: "bg-primary-light/15 border-primary-light/30",
    iconColor: "text-primary-dark",
    border: "border-primary-light/25",
    badge: "bg-primary-light/15 text-primary-dark",
  },
]

// Container stagger: children fade-up one after another
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
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
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 md:mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {features.map((feat, i) => {
              const Icon = ICON_MAP[feat.icon] ?? Star
              const style = FEATURE_STYLES[i % FEATURE_STYLES.length]
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className={`relative bg-white rounded-2xl p-6 border ${style.border} shadow-sm hover:shadow-md transition-shadow`}
                >
                  {/* Icon badge */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border ${style.iconBg} mb-4`}>
                    <Icon size={24} className={style.iconColor} strokeWidth={2} aria-hidden />
                  </div>

                  <h3 className="text-xl font-extrabold text-foreground mb-2 leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-base text-foreground/70 leading-relaxed">
                    {feat.text}
                  </p>
                </motion.div>
              )
            })}
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
