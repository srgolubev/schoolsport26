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
│   ├── api/
│   │   ├── seed/route.ts    # Seed: JSON → Payload CMS
│   │   └── revalidate/route.ts  # POST: сброс Next.js кэша (требует cookie payload-token)
│   ├── revalidate/page.tsx  # UI-страница с кнопкой применить изменения
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
│   ├── SectionsPreview.tsx   # Превью секций на главной
│   ├── admin/
│   │   └── RevalidateButton.tsx
│   └── ui/
│       ├── AnimatedCounter.tsx
│       ├── FadeUp.tsx
│       └── SectionHeader.tsx
├── lib/
│       ├── payload.ts            # getPayloadClient() хелпер
│       └── mediaUrl.ts           # Ремап /api/media/file/ → /media/
└── payload.config.ts         # Payload конфигурация
```

## Команды
```bash
npm run dev          # Dev сервер (http://localhost:3000)
npm run build        # Production сборка (webpack, skip tsc)
```

## Админка
- URL: http://localhost:3000/admin
- Логин: admin@festival.ru / (пароль из PAYLOAD_INITIAL_PASSWORD env, fallback: changeme123)

## Env-переменные
```
PAYLOAD_SECRET          # Обязательный — JWT signing, падает без него
PAYLOAD_INITIAL_PASSWORD # Пароль первого admin-юзера (fallback: changeme123)
SEED_SECRET             # Секрет для POST /api/seed в production (header x-seed-secret)
NEXT_PUBLIC_SITE_URL    # URL сайта для sitemap/robots/OG (fallback: https://festival.schoolsportmos.ru)
DATABASE_URL            # SQLite путь (fallback: file:./database.db)
```

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

## Production деплой
- **Сервер:** 95.163.234.54 (Ubuntu 20.04, Reg.ru CloudVPS)
- **Путь:** `/var/www/schoolsport26`
- **Процесс:** pm2 `schoolsport26`, порт 3002
- **Nginx:** reverse proxy festival.schoolsportmos.ru + IP → localhost:3002
- **Домен:** festival.schoolsportmos.ru (DNS нужно переключить на 95.163.234.54)
- **SSL:** ожидает DNS
- **Доступ по IP:** http://95.163.234.54
- **Админка прод:** http://95.163.234.54/admin (admin@festival.ru)
- **Деплой:** GitHub Actions (push в main → appleboy/ssh-action)
- **Env:** `.env` на сервере (chmod 600), секреты сгенерированы 2026-04-06

### Деплой обновлений
Автоматический через GitHub Actions `.github/workflows/deploy.yml`:
- `git fetch && git reset --hard origin/main` (не git pull — .env не конфликтует)
- `npm install && npm run build` (webpack, ~7 мин на 2GB RAM)
- `ln -s public/media .next/standalone/public/media` (симлинк для загрузок через админку)
- `pm2 delete && pm2 start`

Ручной деплой (если Actions не работает):
```bash
ssh root@95.163.234.54
cd /var/www/schoolsport26
git fetch origin && git reset --hard origin/main
npm install
nohup npm run build > /tmp/build.log 2>&1 &  # ~7 мин, SSH разрывается
# дождаться: tail -f /tmp/build.log
pm2 delete schoolsport26 || true
PORT=3002 pm2 start npm --name schoolsport26 -- start
```

### Build workarounds (закоммичены в репо)
- Build через webpack (Turbopack несовместим с next start)
- `typescript.ignoreBuildErrors: true` в next.config.ts (OOM на 2GB RAM при tsc)
- `@payloadcms/next/css` → `// @ts-ignore` перед импортом (route.ts, layout.tsx)
- `serverFunction` → `as any` каст (layout.tsx в payload admin)
- `NotFoundPage` → `as any` каст (not-found.tsx в payload admin)
- `sitemap.ts` → `updatedAt as string`
- Перед первым build нужна БД: запустить dev → засидить → остановить → build

### Media URL
- Payload генерирует URL как `/api/media/file/<name>`, но Next.js standalone раздаёт статику из `public/media/` по пути `/media/<name>`
- Хелпер `mediaUrl()` из `src/lib/mediaUrl.ts` ремапит URL — **обязательно** оборачивать любой `src={X.url}` из Payload (иначе новые загрузки через админку не отображаются, т.к. URL будет `/api/media/file/...`)
- `findGlobal` нужно вызывать с `depth: 1` для разворачивания upload-полей
- **Standalone symlink:** Next.js standalone раздаёт статику из `.next/standalone/public/`, а Payload сохраняет загрузки в `public/media/`. Между билдами новые файлы не видны — нужен симлинк `.next/standalone/public/media` → `public/media` (создаётся в deploy.yml)

### Revalidate
- После правок в админке изменения не появляются из-за Next.js кэша Server Components
- Страница `/revalidate` с кнопкой → `POST /api/revalidate` → `revalidatePath('/', 'layout')` + `/sections` + `/sections/[slug]`
- Доступ только для залогиненных (проверка cookie `payload-token`)

## Важные особенности
- Поле `sortOrder` (не `order` — зарезервировано в SQLite)
- Поле `contentHtml` (textarea) для legacy HTML из JSON
- Media staticDir: `path.resolve(process.cwd(), 'public/media')`
- Seed через POST /api/seed (в prod нужен header `x-seed-secret` с SEED_SECRET)
- webpack watchOptions игнорирует public/media и *.db
- Логотип: `/images/logo/mosobr.png` (Московское образование)
- На сервере также запущен edurun (pm2) — не трогать
