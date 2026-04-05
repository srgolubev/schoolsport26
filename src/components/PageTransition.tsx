"use client"

import { motion, useAnimation } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import type { ReactNode } from "react"

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const controls = useAnimation()

  useEffect(() => {
    controls.set({ opacity: 0, y: 12 })
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } })
  }, [pathname, controls])

  return (
    <motion.div animate={controls}>
      {children}
    </motion.div>
  )
}
