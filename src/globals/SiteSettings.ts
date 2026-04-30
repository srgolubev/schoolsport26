import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Настройки сайта',
  admin: { group: 'Настройки' },
  fields: [
    {
      name: 'hero', type: 'group', label: 'Hero-секция',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Фестиваль школьного спорта!' },
        { name: 'subtitle', type: 'text', defaultValue: '24 мая 2025 • Лужники' },
        { name: 'description', type: 'textarea' },
        { name: 'cta_url', type: 'text', defaultValue: 'https://gorizonty.mos.ru/events/18948' },
        { name: 'cta_text', type: 'text', defaultValue: 'Хочу участвовать' },
      ],
    },
    { name: 'festival_description', type: 'textarea', label: 'Описание фестиваля (HTML)', admin: { rows: 12 } },
    { name: 'festival_cta_url', type: 'text', label: 'Ссылка на регистрацию (О фестивале)' },
    { name: 'festival_cta_text', type: 'text', defaultValue: 'Зарегистрироваться', label: 'Текст кнопки регистрации' },
    { name: 'headliners_banner', type: 'upload', relationTo: 'media', label: 'Баннер хедлайнеров' },
    {
      name: 'map', type: 'group', label: 'Карта',
      fields: [
        { name: 'latitude', type: 'number', defaultValue: 55.715527 },
        { name: 'longitude', type: 'number', defaultValue: 37.561301 },
        { name: 'address', type: 'text', defaultValue: 'Олимпийский комплекс «Лужники», Южное спортивное ядро' },
      ],
    },
    {
      name: 'meta', type: 'group', label: 'SEO',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'footer', type: 'group', label: 'Футер',
      fields: [
        { name: 'org_name', type: 'text', defaultValue: 'МЦВП' },
        { name: 'org_description', type: 'text', defaultValue: 'Московский центр воспитательных практик' },
        { name: 'vk_url', type: 'text' },
        { name: 'telegram_url', type: 'text' },
        { name: 'website_url', type: 'text' },
      ],
    },
  ],
}
