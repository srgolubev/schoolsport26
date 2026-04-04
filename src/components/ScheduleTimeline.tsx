"use client"

import { motion } from "framer-motion"
import SectionHeader from "./ui/SectionHeader"

interface ScheduleItem {
  time: string
  event_name: string
  description?: string
}

interface ScheduleTimelineProps {
  items: ScheduleItem[]
}

export default function ScheduleTimeline({ items }: ScheduleTimelineProps) {
  return (
    <section id="schedule" className="py-16 md:py-24 bg-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionHeader title="Расписание главной сцены" />
        <div className="relative">
          <div className="absolute left-[11px] top-4 bottom-4 w-[3px] bg-primary-dark rounded-full" />
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="relative flex gap-0 mb-3 last:mb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
            >
              <div className="relative z-10 mt-5 w-[25px] flex-shrink-0">
                <div
                  className="w-3 h-3 rounded-full border-2 border-white"
                  style={{
                    background: i < items.length / 2 ? "#059669" : "#f97316",
                    boxShadow: `0 0 8px ${i < items.length / 2 ? "rgba(5,150,105,0.4)" : "rgba(249,115,22,0.4)"}`,
                  }}
                />
              </div>
              <motion.div
                className="bg-white rounded-xl p-4 flex-1 shadow-sm"
                whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className={`text-xs font-bold ${i < items.length / 2 ? "text-primary-dark" : "text-accent"}`}>
                  {item.time}
                </div>
                <div className="text-sm text-foreground mt-1">{item.event_name}</div>
                {item.description && (
                  <div className="text-xs text-muted mt-1">{item.description}</div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
