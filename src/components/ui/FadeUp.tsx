"use client"

import { motion, type Variants } from "framer-motion"
import type { ReactNode } from "react"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
}

export default function FadeUp({
  children,
  index = 0,
  className = "",
  viewport = true,
}: {
  children: ReactNode
  index?: number
  className?: string
  viewport?: boolean
}) {
  return (
    <motion.div
      className={className}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      {...(viewport
        ? { whileInView: "visible", viewport: { once: true, margin: "-80px" } }
        : { animate: "visible" })}
    >
      {children}
    </motion.div>
  )
}
