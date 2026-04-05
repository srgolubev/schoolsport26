# schoolsport26 — Фестиваль школьного спорта

## Стек
- **Frontend:** Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, Framer Motion 12
- **CMS:** Payload CMS 3 (встроенная в Next.js, SQLite dev / Postgres prod)
- **Карусель:** Embla Carousel, **Иконки:** Lucide React
- **Шрифт:** Golos Text (variable 400–900)
- **Деплой:** Docker multi-stage (node:22-alpine, standalone output)

## Структура проекта
```
src/
├── app/
│   ├── (frontend)/          # Публичные страницы
│   │   ├── layout.tsx       # Header + Footer + PageTransition
│   │   ├── page.tsx         # Главная (Server Component → Payload Local API)
│   │   ├── globals.css      # Tailwind тема «Изумруд + огонь»
│   │   └── sections/
│   │       ├── page.tsx     # Каталог секций с фильтрацией
│   │       └── [slug]/page.tsx  # Детальная страница секции
│   ├── (payload)/           # Payload CMS админка
│   │   ├── admin/           # /admin UI
│   │   └── api/             # REST API (/api/*)
│   ├── api/seed/route.ts    # Seed: JSON → Payload CMS
│   ├── layout.tsx           # Root layout (metadata, Payload CSS)
│   ├── robots.ts
│   └── sitemap.ts
├── collections/             # Payload коллекции
│   ├── Media.ts             # Изображения (public/media/)
│   ├── Sections.ts          # Секции фестиваля (20 шт.)
│   ├── Activities.ts        # Активные зоны (13 шт.)
│   ├── Partners.ts          # Партнёры (10 шт.)
│   ├── Schedule.ts          # Расписание сцены (10 шт.)
│   └── Users.ts             # Авторизация админки
├── globals/
│   └── SiteSettings.ts      # Hero, карта, футер, SEO (singleton)
├── components/
│   ├── Header.tsx            # Sticky nav, scroll-spy, mobile menu
│   ├── Hero.tsx              # Параллакс, счётчики, персонажи
│   ├── FestivalDescription.tsx
│   ├── ActivitiesCarousel.tsx  # Embla + spring hover
│   ├── Headliners.tsx        # Тёмный блок с баннером
│   ├── ScheduleTimeline.tsx  # Вертикальный таймлайн
│   ├── PartnersGrid.tsx      # Сетка логотипов
│   ├── YandexMap.tsx         # Яндекс Карты
│   ├── Footer.tsx
│   ├── PageTransition.tsx    # AnimatePresence
│   ├── SectionsFilter.tsx    # Фильтр + раскрывающиеся карточки
│   └── ui/
│       ├── AnimatedCounter.tsx
│       ├── FadeUp.tsx
│       └── SectionHeader.tsx
├── lib/payload.ts            # getPayloadClient() хелпер
├── seed/index.ts             # Legacy seed (не работает без Next.js)
└── payload.config.ts         # Payload конфигурация
```

## Команды
```bash
npm run dev          # Dev сервер (http://localhost:3000)
npm run build        # Production сборка
npm run seed         # Не работает напрямую — используй POST /api/seed
```

## Админка
- URL: http://localhost:3000/admin
- Логин: admin@festival.ru / changeme123

## Цветовая палитра
```
primary:      #10b981 (изумруд)
primary-dark: #059669
primary-light:#34d399
accent:       #f97316 (оранжевый)
bg:           #EFEFEF
foreground:   #1a1a1a
muted:        #6B7280
dark:         #1a1a1a
```

## Важные особенности
- Поле `sortOrder` (не `order` — зарезервировано в SQLite)
- Поле `contentHtml` (textarea) для legacy HTML из JSON
- Media staticDir: `path.resolve(process.cwd(), 'public/media')`
- Seed только через API route POST /api/seed (Payload требует Next.js контекст)
- webpack watchOptions игнорирует public/media и *.db
- Логотип: `/images/logo/mosobr.png` (Московское образование)
