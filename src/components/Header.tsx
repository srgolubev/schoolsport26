"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"

const navLinks = [
  { label: "О фестивале", href: "#about" },
  { label: "Активности", href: "#activities" },
  { label: "Расписание", href: "#schedule" },
  { label: "Соревнования", href: "/sections", isPage: true },
  { label: "Партнёры", href: "#partners" },
  { label: "Как добраться", href: "#map" },
]

interface HeaderProps {
  ctaUrl?: string
  ctaText?: string
}

export default function Header({ ctaUrl, ctaText }: HeaderProps = {}) {
  const ctaHref = ctaUrl || "https://gorizonty.mos.ru/events/31792"
  const ctaLabel = ctaText || "Участвовать"
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [isScrolled, setIsScrolled] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let lastY = window.scrollY
    const handleScroll = () => {
      const y = window.scrollY
      setIsScrolled(y > 20)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const atBottom = y >= maxScroll - 5
      if (y > lastY && y > 80 && !atBottom) {
        setHeaderVisible(false)
        setMobileOpen(false)
      } else if (y < lastY && !atBottom) {
        setHeaderVisible(true)
      }
      lastY = y
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string, isPage?: boolean) => {
    setMobileOpen(false)
    if (isPage) return
    if (!isHome) {
      // Navigate to homepage with hash
      window.location.href = "/" + href
      return
    }
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-[transform,shadow] duration-300 ease-out ${
        isScrolled ? "shadow-[0_1px_8px_rgba(0,0,0,0.08)]" : ""
      } ${headerVisible ? "translate-y-0" : "-translate-y-full"}`}
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="/" className="flex items-center gap-2">
            <Image src="/images/logo/mosobr.png" alt="Московское образование" width={200} height={50} className="h-8 md:h-10 w-auto" priority />
          </a>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const resolvedHref = link.isPage ? link.href : (isHome ? link.href : "/" + link.href)
              return (
              <a
                key={link.href}
                href={resolvedHref}
                onClick={(e) => {
                  if (!link.isPage) {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }
                }}
                className={`relative text-base font-semibold transition-colors duration-200 ${
                  activeSection === link.href
                    ? "text-primary-dark"
                    : "text-foreground/70 hover:text-primary-dark"
                }`}
              >
                {link.label}
                {activeSection === link.href && (
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-dark rounded-full"
                    layoutId="activeNav"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <motion.a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center px-7 py-3 rounded-full text-base font-bold text-white bg-accent cursor-pointer"
              style={{ boxShadow: "0 4px 16px rgba(255,61,154,0.3)" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {ctaLabel}
            </motion.a>

            <button
              className="md:hidden p-2 rounded-lg text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Меню"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-bg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="flex flex-col px-4 pb-4 pt-2 gap-1">
              {navLinks.map((link) => {
                const resolvedHref = link.isPage ? link.href : (isHome ? link.href : "/" + link.href)
                return (
                <a
                  key={link.href}
                  href={resolvedHref}
                  onClick={(e) => {
                    if (!link.isPage) {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }
                  }}
                  className="block py-3 px-2 text-base font-semibold text-foreground/80 hover:text-primary-dark border-b border-bg last:border-0"
                >
                  {link.label}
                </a>
                )
              })}
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full py-3 rounded-full text-white font-semibold text-center bg-accent block"
              >
                {ctaLabel}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
