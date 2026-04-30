import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Настройки сайта',
  admin: { group: 'Настройки' },
  fields: [
    {
      name: 'hero', type: 'group', label: 'Hero-секция',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Фестиваль школьного и студенческого спорта' },
        { name: 'subtitle', type: 'text', defaultValue: '23 мая 2026 • Лужники' },
        { name: 'description', type: 'textarea' },
        { name: 'cta_url', type: 'text', defaultValue: 'https://gorizonty.mos.ru/events/31792' },
        { name: 'cta_text', type: 'text', defaultValue: 'Участвовать' },
      ],
    },
    // Legacy field — keep hidden so existing data is not lost
    { name: 'festival_description', type: 'textarea', label: 'Описание фестиваля (HTML, устаревшее)', admin: { hidden: true } },
    // Structured festival description fields
    {
      name: 'festival_lede',
      type: 'textarea',
      label: 'О фестивале — Крюк (большой заголовок)',
      admin: { rows: 2, description: 'Пример: «Большие победы начинаются с маленького шага!»' },
    },
    {
      name: 'festival_intro',
      type: 'textarea',
      label: 'О фестивале — Вводный абзац',
      admin: { description: 'Краткое описание фестиваля, 1–3 предложения.' },
    },
    {
      name: 'festival_motto',
      type: 'text',
      label: 'О фестивале — Девиз сезона (pull-quote)',
      admin: { description: 'Слоган сезона, например «Важен каждый шаг». Отображается крупно по центру.' },
    },
    {
      name: 'festival_bridge',
      type: 'textarea',
      label: 'О фестивале — Связующий абзац',
    },
    // 3 фичи — каждая отдельной group (плоские колонки в БД, без array-таблицы)
    {
      name: 'festival_feature_1', type: 'group', label: 'О фестивале — Фича 1',
      fields: [
        { name: 'icon', type: 'select', label: 'Иконка', defaultValue: 'star',
          options: [
            { label: 'Звезда (гости)', value: 'star' },
            { label: 'Музыка (драйв)', value: 'music' },
            { label: 'Кубок (активности)', value: 'trophy' },
          ],
        },
        { name: 'title', type: 'text', label: 'Заголовок' },
        { name: 'text', type: 'textarea', label: 'Описание' },
      ],
    },
    {
      name: 'festival_feature_2', type: 'group', label: 'О фестивале — Фича 2',
      fields: [
        { name: 'icon', type: 'select', label: 'Иконка', defaultValue: 'music',
          options: [
            { label: 'Звезда (гости)', value: 'star' },
            { label: 'Музыка (драйв)', value: 'music' },
            { label: 'Кубок (активности)', value: 'trophy' },
          ],
        },
        { name: 'title', type: 'text', label: 'Заголовок' },
        { name: 'text', type: 'textarea', label: 'Описание' },
      ],
    },
    {
      name: 'festival_feature_3', type: 'group', label: 'О фестивале — Фича 3',
      fields: [
        { name: 'icon', type: 'select', label: 'Иконка', defaultValue: 'trophy',
          options: [
            { label: 'Звезда (гости)', value: 'star' },
            { label: 'Музыка (драйв)', value: 'music' },
            { label: 'Кубок (активности)', value: 'trophy' },
          ],
        },
        { name: 'title', type: 'text', label: 'Заголовок' },
        { name: 'text', type: 'textarea', label: 'Описание' },
      ],
    },
    {
      name: 'festival_finale',
      type: 'textarea',
      label: 'О фестивале — Большой финал (callout)',
      admin: { description: 'Текст про подведение итогов сезона.' },
    },
    {
      name: 'festival_closing',
      type: 'textarea',
      label: 'О фестивале — Завершающий абзац',
    },
    {
      name: 'festival_final_hook',
      type: 'text',
      label: 'О фестивале — Финальная фраза (жирно)',
      admin: { description: 'Например: «Твой шаг может стать решающим. Ждём тебя!»' },
    },
    { name: 'festival_cta_url', type: 'text', label: 'Ссылка на регистрацию (О фестивале)' },
    { name: 'festival_cta_text', type: 'text', defaultValue: 'Зарегистрироваться', label: 'Текст кнопки регистрации' },
    { name: 'headliners_banner', type: 'upload', relationTo: 'media', label: 'Баннер хедлайнеров (legacy, не используется)', admin: { hidden: true } },
    {
      name: 'headliner_1', type: 'group', label: 'Хедлайнер 1',
      fields: [
        { name: 'photo', type: 'upload', relationTo: 'media' },
        { name: 'name', type: 'text', label: 'Имя' },
        { name: 'role', type: 'text', label: 'Роль / подпись', defaultValue: 'Артист' },
      ],
    },
    {
      name: 'headliner_2', type: 'group', label: 'Хедлайнер 2',
      fields: [
        { name: 'photo', type: 'upload', relationTo: 'media' },
        { name: 'name', type: 'text', label: 'Имя' },
        { name: 'role', type: 'text', label: 'Роль / подпись', defaultValue: 'Артист' },
      ],
    },
    {
      name: 'map', type: 'group', label: 'Карта',
      fields: [
        { name: 'latitude', type: 'number', defaultValue: 55.717574 },
        { name: 'longitude', type: 'number', defaultValue: 37.550701 },
        { name: 'address', type: 'text', defaultValue: 'Олимпийский комплекс «Лужники», площадь перед малой спортивной ареной' },
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
