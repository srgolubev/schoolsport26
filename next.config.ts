import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Ignore media uploads and DB files from triggering recompilation
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/public/media/**',
        '**/media/**',
        '**/*.db',
        '**/*.db-shm',
        '**/*.db-wal',
        '**/node_modules/**',
      ],
    }
    return config
  },
}

export default withPayload(nextConfig)
