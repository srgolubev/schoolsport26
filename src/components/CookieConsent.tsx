"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const STORAGE_KEY = "schoolsport26-cookie-consent"

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        const t = window.setTimeout(() => setVisible(true), 600)
        return () => window.clearTimeout(t)
      }
    } catch {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: true, at: Date.now() }))
    } catch {}
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
          className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6 pointer-events-none"
          role="dialog"
          aria-live="polite"
          aria-label="Уведомление об использовании cookies"
        >
          <div className="pointer-events-auto mx-auto max-w-5xl rounded-2xl border border-black/10 bg-white/95 backdrop-blur-md shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8 p-5 md:p-6">
              <div className="flex-1">
                <div className="text-xs uppercase tracking-[0.18em] text-primary font-semibold mb-2">
                  Cookies
                </div>
                <p className="text-base md:text-lg text-foreground/85 leading-snug">
                  Мы используем файлы cookie, чтобы сайт работал корректно и был удобнее.
                  Продолжая пользоваться сайтом, вы соглашаетесь с обработкой cookie и{" "}
                  <a
                    href="https://schoolsportmos.ru/wp-content/uploads/2024/06/personal-data.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-primary/40 underline-offset-4 hover:decoration-primary transition-colors"
                  >
                    политикой обработки персональных данных
                  </a>.
                </p>
              </div>
              <button
                type="button"
                onClick={accept}
                className="shrink-0 inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary-dark text-white text-base font-semibold px-7 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2"
              >
                Хорошо, понятно
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
