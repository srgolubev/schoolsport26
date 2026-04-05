import config from '@payload-config'
import { RootLayout } from '@payloadcms/next/layouts'
import { importMap } from '../importMap'
import React from 'react'
import { serverFunction } from '../serverFunction'

type Args = {
  children: React.ReactNode
}

export default function Layout({ children }: Args) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction as any}>
      {children}
    </RootLayout>
  )
}
