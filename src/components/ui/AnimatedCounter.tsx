"use client"

import { useEffect, useState, useRef } from "react"
import { useInView } from "framer-motion"

function formatNumber(n: number): string {
  return n.toLocaleString("ru-RU").replace(",", " ")
}

export default function AnimatedCounter({
  target,
  suffix = "",
  className = "",
}: {
  target: number
  suffix?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1200
    const steps = 50
    const interval = duration / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (step >= steps) {
        clearInterval(timer)
        setCount(target)
      }
    }, interval)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref} className={className}>
      {formatNumber(count)}{suffix}
    </span>
  )
}
