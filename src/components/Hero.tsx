"use client"

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { useRef } from "react"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"
import Image from "next/image"
import AnimatedCounter from "./ui/AnimatedCounter"

function parseBadges(subtitle?: string) {
  if (subtitle && subtitle.includes("•")) {
    const parts = subtitle.split("•").map(s => s.trim())
    return [
      { icon: Calendar, label: parts[0] || "23 мая 2026" },
      { icon: MapPin, label: parts[1] || "Лужники" },
      { icon: Users, label: "30 000+ участников" },
    ]
  }
  return [
    { icon: Calendar, label: subtitle || "23 мая 2026" },
    { icon: MapPin, label: "Лужники" },
    { icon: Users, label: "30 000+ участников" },
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
  stats?: {
    sections: number
    activities: number
    partners: number
  }
}

// Shape: split parallax (outer) and idle floating (inner) onto separate
// motion.div nodes so they don't fight for the same transform.translateY.
// This eliminates the jitter we'd get from combining `style.y` (scroll MotionValue)
// with `animate.y` (keyframes) on the same element.
function Shape({
  src,
  width,
  height,
  posClasses,
  zClass,
  visibility,
  imgClasses,
  parallaxY,
  yAmp = 6,
  rotAmp = 5,
  duration = 5,
  delay = 0,
  priority = false,
}: {
  src: string
  width: number
  height: number
  posClasses: string
  zClass: string
  visibility: string
  imgClasses: string
  parallaxY?: MotionValue<number>
  yAmp?: number
  rotAmp?: number
  duration?: number
  delay?: number
  priority?: boolean
}) {
  return (
    <motion.div
      className={`absolute ${posClasses} ${zClass} pointer-events-none ${visibility}`}
      style={parallaxY ? { y: parallaxY, willChange: "transform" } : { willChange: "transform" }}
    >
      <motion.div
        animate={{ y: [0, -yAmp, 0], rotate: [0, rotAmp, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
        style={{ willChange: "transform" }}
      >
        <Image
          src={src}
          alt=""
          width={width}
          height={height}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className={imgClasses}
        />
      </motion.div>
    </motion.div>
  )
}

export default function Hero({ title, subtitle, description, ctaUrl, ctaText, stats }: HeroProps) {
  const badges = parseBadges(subtitle)
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })

  // Subtle parallax — smaller range than before, only on large/featured shapes.
  // Mid-sized shapes share medY; foreground peeks share fastY. Small decor (stars,
  // drops, mini balls) gets no parallax at all — keeps scroll cheap and steady.
  const slowY = useTransform(scrollYProgress, [0, 1], [0, -30])
  const medY  = useTransform(scrollYProgress, [0, 1], [0, -55])
  const fastY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const circleY = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden lg:min-h-[600px] lg:max-h-[850px]"
      style={{ background: "linear-gradient(135deg, #4F9EDB 0%, #7BBEEA 45%, #A8D8F2 100%)" }}
    >
      {/* Diagonal stripe texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0px, #fff 2px, transparent 2px, transparent 24px)",
        }}
      />

      {/* Soft background blobs */}
      <motion.div
        className="absolute top-[-60px] right-[-40px] w-72 h-72 lg:w-96 lg:h-96 rounded-full bg-white/10"
        style={{ y: circleY, willChange: "transform" }}
      />
      <motion.div
        className="absolute bottom-[-40px] left-[-30px] w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-white/7"
        style={{ y: medY, willChange: "transform" }}
      />

      {/* ───────────────── DESKTOP SHAPES (lg+) ───────────────── */}

      {/* Large featured shapes — get parallax */}
      <Shape
        src="/images/shapes/basket.webp" width={220} height={220} priority
        posClasses="top-[6%] left-[3%]" zClass="z-0" visibility="hidden lg:block"
        imgClasses="w-[180px] xl:w-[220px] h-auto drop-shadow-xl"
        parallaxY={slowY} yAmp={8} rotAmp={4} duration={5.2} delay={0}
      />
      <Shape
        src="/images/shapes/sneaker.webp" width={200} height={200} priority
        posClasses="top-[35%] left-[2%]" zClass="z-10" visibility="hidden lg:block"
        imgClasses="w-[130px] xl:w-[160px] h-auto drop-shadow-lg"
        parallaxY={medY} yAmp={6} rotAmp={-3} duration={4.8} delay={0.7}
      />
      <Shape
        src="/images/shapes/raketka.webp" width={200} height={200} priority
        posClasses="top-[4%] right-[3%]" zClass="z-0" visibility="hidden lg:block"
        imgClasses="w-[160px] xl:w-[200px] h-auto drop-shadow-xl"
        parallaxY={slowY} yAmp={9} rotAmp={-5} duration={6} delay={0.3}
      />
      <Shape
        src="/images/shapes/volley2.webp" width={160} height={160}
        posClasses="top-[40%] right-[2%]" zClass="z-0" visibility="hidden lg:block"
        imgClasses="w-[110px] xl:w-[140px] h-auto drop-shadow-lg"
        parallaxY={medY} yAmp={7} rotAmp={4} duration={5.4} delay={1.0}
      />
      <Shape
        src="/images/shapes/volan.webp" width={120} height={120}
        posClasses="bottom-[22%] right-[6%]" zClass="z-10" visibility="hidden lg:block"
        imgClasses="w-[80px] xl:w-[100px] h-auto drop-shadow-md"
        parallaxY={medY} yAmp={8} rotAmp={5} duration={4.6} delay={0.6}
      />
      <Shape
        src="/images/shapes/ganthele.webp" width={140} height={70}
        posClasses="bottom-[8%] right-[4%]" zClass="z-0" visibility="hidden lg:block"
        imgClasses="w-[90px] xl:w-[120px] h-auto drop-shadow-sm"
        parallaxY={fastY} yAmp={6} rotAmp={-4} duration={5.1} delay={2.4}
      />
      <Shape
        src="/images/shapes/3dshape1.webp" width={140} height={140}
        posClasses="bottom-[10%] left-[5%]" zClass="z-10" visibility="hidden lg:block"
        imgClasses="w-[90px] xl:w-[110px] h-auto drop-shadow-md"
        parallaxY={fastY} yAmp={7} rotAmp={5} duration={5.8} delay={0.4}
      />
      <Shape
        src="/images/shapes/pink_circle.webp" width={110} height={110}
        posClasses="bottom-[5%] right-[22%]" zClass="z-30" visibility="hidden lg:block"
        imgClasses="w-[70px] xl:w-[90px] h-auto"
        parallaxY={slowY} yAmp={7} rotAmp={3} duration={5.5} delay={1.3}
      />

      {/* Small / mid decor — no parallax, only idle floating */}
      <Shape
        src="/images/shapes/orangestar.webp" width={80} height={80}
        posClasses="top-[22%] left-[14%]" zClass="z-0" visibility="hidden lg:block"
        imgClasses="w-[50px] xl:w-[64px] h-auto"
        yAmp={5} rotAmp={8} duration={3.6} delay={1.2}
      />
      <Shape
        src="/images/shapes/pink_drop.webp" width={70} height={70}
        posClasses="top-[55%] left-[10%]" zClass="z-0" visibility="hidden lg:block"
        imgClasses="w-[44px] xl:w-[56px] h-auto"
        yAmp={5} rotAmp={-5} duration={4.2} delay={2.1}
      />
      <Shape
        src="/images/shapes/yellowstar.webp" width={72} height={72}
        posClasses="top-[12%] left-[22%]" zClass="z-0" visibility="hidden lg:block"
        imgClasses="w-[46px] xl:w-[60px] h-auto"
        yAmp={4} rotAmp={-7} duration={3.9} delay={1.8}
      />
      <Shape
        src="/images/shapes/tennis_ball.webp" width={90} height={90}
        posClasses="top-[20%] right-[15%]" zClass="z-10" visibility="hidden lg:block"
        imgClasses="w-[56px] xl:w-[72px] h-auto drop-shadow-sm"
        yAmp={5} rotAmp={10} duration={4.3} delay={1.5}
      />
      <Shape
        src="/images/shapes/3dcross.webp" width={100} height={100}
        posClasses="top-[10%] right-[20%]" zClass="z-10" visibility="hidden lg:block"
        imgClasses="w-[62px] xl:w-[80px] h-auto"
        yAmp={6} rotAmp={-8} duration={4.9} delay={0.9}
      />
      <Shape
        src="/images/shapes/green_drop.webp" width={60} height={60}
        posClasses="bottom-[15%] left-[28%]" zClass="z-10" visibility="hidden lg:block"
        imgClasses="w-[38px] xl:w-[48px] h-auto"
        yAmp={4} rotAmp={6} duration={3.7} delay={2.8}
      />
      <Shape
        src="/images/shapes/blue_ball.webp" width={100} height={100}
        posClasses="top-[8%] left-[26%]" zClass="z-30" visibility="hidden lg:block"
        imgClasses="w-[60px] xl:w-[76px] h-auto drop-shadow-md"
        yAmp={6} rotAmp={-3} duration={6.2} delay={0.2}
      />
      <Shape
        src="/images/shapes/3dshape2.webp" width={100} height={100}
        posClasses="top-[48%] left-[18%]" zClass="z-0" visibility="hidden lg:block"
        imgClasses="w-[62px] xl:w-[78px] h-auto"
        yAmp={5} rotAmp={7} duration={4.5} delay={3.0}
      />
      <Shape
        src="/images/shapes/pink_ball.webp" width={80} height={80}
        posClasses="top-[60%] right-[16%]" zClass="z-0" visibility="hidden lg:block"
        imgClasses="w-[50px] xl:w-[64px] h-auto"
        yAmp={4} rotAmp={-6} duration={4.0} delay={2.2}
      />
      <Shape
        src="/images/shapes/3dshape3.webp" width={100} height={100}
        posClasses="bottom-[18%] right-[18%]" zClass="z-0" visibility="hidden lg:block"
        imgClasses="w-[60px] xl:w-[76px] h-auto"
        yAmp={6} rotAmp={5} duration={5.3} delay={1.7}
      />

      {/* ───────────────── MOBILE SHAPES (no parallax — scroll is short and fast) ───────────────── */}

      <Shape
        src="/images/shapes/basket.webp" width={180} height={180} priority
        posClasses="top-[5%] left-[2%]" zClass="z-0" visibility="lg:hidden"
        imgClasses="w-[100px] sm:w-[130px] h-auto drop-shadow-lg"
        yAmp={6} rotAmp={4} duration={5} delay={0}
      />
      <Shape
        src="/images/shapes/raketka.webp" width={160} height={160} priority
        posClasses="top-[4%] right-[1%]" zClass="z-0" visibility="lg:hidden"
        imgClasses="w-[90px] sm:w-[120px] h-auto drop-shadow-lg"
        yAmp={7} rotAmp={-4} duration={5.5} delay={0.5}
      />
      <Shape
        src="/images/shapes/sneaker.webp" width={160} height={160}
        posClasses="bottom-[5%] left-[2%]" zClass="z-10" visibility="lg:hidden"
        imgClasses="w-[90px] sm:w-[110px] h-auto drop-shadow-md"
        yAmp={6} rotAmp={-3} duration={4.8} delay={0.8}
      />
      <Shape
        src="/images/shapes/volley2.webp" width={140} height={140}
        posClasses="bottom-[6%] right-[2%]" zClass="z-10" visibility="lg:hidden"
        imgClasses="w-[80px] sm:w-[100px] h-auto drop-shadow-md"
        yAmp={6} rotAmp={5} duration={5.2} delay={1.2}
      />
      <Shape
        src="/images/shapes/orangestar.webp" width={64} height={64}
        posClasses="top-[28%] left-[8%]" zClass="z-0" visibility="lg:hidden"
        imgClasses="w-[40px] sm:w-[52px] h-auto"
        yAmp={4} rotAmp={8} duration={3.8} delay={1.6}
      />
      <Shape
        src="/images/shapes/yellowstar.webp" width={60} height={60}
        posClasses="top-[25%] right-[6%]" zClass="z-0" visibility="lg:hidden"
        imgClasses="w-[36px] sm:w-[48px] h-auto"
        yAmp={4} rotAmp={-7} duration={4.0} delay={2.0}
      />
      <Shape
        src="/images/shapes/ganthele.webp" width={120} height={60}
        posClasses="top-[50%] left-[1%]" zClass="z-0" visibility="lg:hidden"
        imgClasses="w-[72px] sm:w-[90px] h-auto"
        yAmp={5} rotAmp={3} duration={4.5} delay={0.3}
      />

      {/* Content */}
      <div className="relative z-20 max-w-3xl 2xl:max-w-4xl mx-auto px-5 sm:px-8 text-center pt-24 pb-48 sm:pb-40 lg:py-20">
        <motion.div
          className="text-sm font-semibold text-white/90 tracking-[2px] uppercase mb-3"
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
        >
          {subtitle || "23 мая 2026 • Лужники"}
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-extrabold leading-tight text-white mb-4"
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
        >
          {title || "Фестиваль школьного и студенческого спорта"}
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-white/85 max-w-xl 2xl:max-w-2xl mx-auto mb-6 leading-relaxed"
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
        >
          {description || "Более 90 спортивных секций, мастер-классы, соревнования и яркие выступления звёзд на главной сцене"}
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
          custom={3} variants={fadeUp} initial="hidden" animate="visible"
        >
          {badges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-sm">
              <Icon size={18} className="text-white" strokeWidth={2.5} />
              <span className="text-base font-semibold text-white">{label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="flex gap-3 justify-center flex-wrap"
          custom={4} variants={fadeUp} initial="hidden" animate="visible"
        >
          <motion.a
            href={ctaUrl || "https://gorizonty.mos.ru/events/31792"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-lg text-white font-bold bg-accent cursor-pointer"
            style={{ boxShadow: "0 6px 24px rgba(255,61,154,0.4)" }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 32px rgba(255,61,154,0.5)" }}
            whileTap={{ scale: 0.97 }}
          >
            {ctaText || "Участвовать"}
            <ArrowRight size={18} />
          </motion.a>
          <motion.a
            href="/sections"
            className="inline-flex items-center px-10 py-4 rounded-full text-lg text-white font-semibold bg-white/20 backdrop-blur-sm cursor-pointer"
            whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.3)" }}
            whileTap={{ scale: 0.97 }}
          >
            Смотреть соревнования
          </motion.a>
        </motion.div>

        <motion.div
          className="flex justify-center gap-6 mt-10"
          custom={5} variants={fadeUp} initial="hidden" animate="visible"
        >
          {[
            { target: stats?.sections ?? 0, label: "соревнований" },
            { target: stats?.activities ?? 0, label: "активностей" },
            { target: stats?.partners ?? 0, label: "партнёров" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/15 backdrop-blur-sm px-6 py-4 rounded-xl text-center">
              <div className="text-3xl font-bold text-white">
                <AnimatedCounter target={stat.target} />
              </div>
              <div className="text-base text-white/85">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
