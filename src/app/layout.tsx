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
    url: '/',
    images: [{ url: '/images/og-festival-2026.jpg', width: 1200, height: 630, alt: 'Фестиваль школьного и студенческого спорта — главная сцена', type: 'image/jpeg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Фестиваль школьного и студенческого спорта 2026',
    description: 'Соревнования, мастер-классы, активные зоны для детей и всей семьи',
    images: [{ url: '/images/og-festival-2026.jpg', alt: 'Фестиваль школьного и студенческого спорта — главная сцена' }],
  },
  other: {
    'vk:image': 'https://festival.schoolsportmos.ru/images/og-festival-2026.jpg',
  },
  icons: {
    icon: [
      { url: '/images/favicon/favicon.ico', sizes: 'any' },
      { url: '/images/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/images/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/images/favicon/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#4F9EDB',
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
