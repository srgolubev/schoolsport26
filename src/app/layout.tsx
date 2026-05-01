import type { Metadata, Viewport } from 'next'
import React from 'react'
// @ts-ignore
import '@payloadcms/next/css'

export const metadata: Metadata = {
  title: 'Фестиваль школьного и студенческого спорта 2026',
  description: 'Официальный сайт Фестиваля школьного спорта 2026 — соревнования, мастер-классы, активные зоны для детей и всей семьи',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://festival.schoolsportmos.ru'),
  openGraph: {
    title: 'Фестиваль школьного и студенческого спорта 2026',
    description: 'Соревнования, мастер-классы, активные зоны для детей и всей семьи',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Фестиваль школьного и студенческого спорта',
    url: '/',
    images: [{ url: '/images/og-festival.jpg?v=2', width: 1200, height: 630, alt: 'Фестиваль школьного и студенческого спорта — главная сцена', type: 'image/jpeg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Фестиваль школьного и студенческого спорта 2026',
    description: 'Соревнования, мастер-классы, активные зоны для детей и всей семьи',
    images: [{ url: '/images/og-festival.jpg?v=2', alt: 'Фестиваль школьного и студенческого спорта — главная сцена' }],
  },
  other: {
    'vk:image': '/images/og-festival.jpg?v=2',
  },
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
