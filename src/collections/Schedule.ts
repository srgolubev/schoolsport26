import type { CollectionConfig } from 'payload'

export const Schedule: CollectionConfig = {
  slug: 'schedule',
  admin: { useAsTitle: 'event_name', defaultColumns: ['time', 'event_name', 'stage', 'order'] },
  access: { read: () => true },
  fields: [
    { name: 'time', type: 'text', required: true },
    { name: 'event_name', type: 'text', required: true },
    { name: 'description', type: 'text' },
    { name: 'stage', type: 'text', defaultValue: 'main' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
