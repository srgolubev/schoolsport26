"use client"

import { motion } from "framer-motion"

export default function SectionHeader({
  title,
  subtitle,
  className = "",
}: {
  title: string
  subtitle?: string
  className?: string
}) {
  return (
    <div className={`text-center mb-8 md:mb-12 ${className}`}>
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="text-lg md:text-xl text-muted max-w-2xl mx-auto mt-4 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
