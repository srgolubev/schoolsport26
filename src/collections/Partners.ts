import type { CollectionConfig } from 'payload'

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'tier', 'order'] },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media', required: true },
    { name: 'url', type: 'text' },
    {
      name: 'tier', type: 'select',
      options: [
        { label: 'Золото', value: 'gold' },
        { label: 'Серебро', value: 'silver' },
        { label: 'Бронза', value: 'bronze' },
      ],
      defaultValue: 'silver',
    },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
