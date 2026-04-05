import type { CollectionConfig } from 'payload'
import path from 'path'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: path.resolve(process.cwd(), 'public/media'),
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumbnail', width: 200, height: undefined, position: 'centre' },
      { name: 'card', width: 600, height: undefined, position: 'centre' },
      { name: 'hero', width: 1200, height: undefined, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    crop: true,
  },
  access: { read: () => true },
  fields: [
    { name: 'alt', type: 'text', required: true },
  ],
}
