import type { CollectionConfig } from 'payload'

export const Sections: CollectionConfig = {
  slug: 'sections',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'category', 'time', 'order'] },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug', type: 'text', required: true, unique: true,
      admin: { position: 'sidebar' },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title.toLowerCase().replace(/[^a-zа-яё0-9]+/gi, '-').replace(/^-|-$/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'category', type: 'select', required: true,
      options: [
        { label: 'Соревнования', value: 'competitions' },
        { label: 'Семейные', value: 'family' },
        { label: 'Выступления', value: 'performances' },
        { label: 'Киберспорт', value: 'esports' },
        { label: 'Творчество', value: 'creative' },
        { label: 'Мастер-классы', value: 'masterclass' },
        { label: 'Скейт-парк', value: 'skatepark' },
        { label: 'Беговелы', value: 'balance-bikes' },
        { label: 'Экстрим', value: 'extreme' },
        { label: 'Пресс-центр', value: 'press' },
        { label: 'Титаны', value: 'titans' },
      ],
    },
    { name: 'content', type: 'richText' },
    { name: 'images', type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'time', type: 'text' },
    { name: 'registration_url', type: 'text' },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
