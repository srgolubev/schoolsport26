import type { CollectionConfig } from 'payload'

export const Activities: CollectionConfig = {
  slug: 'activities',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'age_range', 'order'] },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'richText' },
    { name: 'images', type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'age_range', type: 'text' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
