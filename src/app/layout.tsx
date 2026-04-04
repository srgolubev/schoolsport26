import type { Metadata, Viewport } from 'next'
import React from 'react'
import '@payloadcms/next/css'

export const metadata: Metadata = {
  title: 'Фестиваль школьного спорта 2025',
  description: 'Официальный сайт Фестиваля школьного спорта 2025',
}

export const viewport: Viewport = {
  themeColor: '#059669',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
