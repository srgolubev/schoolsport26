import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs'
import path from 'path'

const PROJECT_ROOT = path.resolve(__dirname, '../..')
const DATA_DIR = path.join(PROJECT_ROOT, 'data')

const categoryMap: Record<string, string> = {
  'Соревнования': 'competitions',
  'Семейные': 'family',
  'Выступления': 'performances',
  'Киберспорт': 'esports',
  'Творчество': 'creative',
  'Мастер-классы': 'masterclass',
  'Скейт-парк': 'skatepark',
  'Беговелы': 'balance-bikes',
}

/**
 * Upload an image file to the Media collection.
 * Returns the created media document ID, or undefined if the file does not exist.
 */
async function uploadImage(
  payload: Awaited<ReturnType<typeof getPayload>>,
  filePath: string,
  alt: string,
): Promise<number | undefined> {
  const absolutePath = path.join(PROJECT_ROOT, filePath)
  if (!fs.existsSync(absolutePath)) {
    console.warn(`  [skip] file not found: ${absolutePath}`)
    return undefined
  }
  const media = await payload.create({
    collection: 'media',
    data: { alt },
    filePath: absolutePath,
  })
  return media.id as number
}

/**
 * Upload up to `limit` images and return an array of media IDs.
 */
async function uploadImages(
  payload: Awaited<ReturnType<typeof getPayload>>,
  images: string[] | undefined,
  alt: string,
  limit = 5,
): Promise<number[]> {
  const ids: number[] = []
  if (!images) return ids
  for (const imgPath of images.slice(0, limit)) {
    const id = await uploadImage(payload, imgPath, alt)
    if (id !== undefined) {
      ids.push(id)
    }
  }
  return ids
}

async function seedSchedule(payload: Awaited<ReturnType<typeof getPayload>>) {
  const filePath = path.join(DATA_DIR, 'main_stage_schedule.json')
  const scheduleData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

  for (let i = 0; i < scheduleData.length; i++) {
    const item = scheduleData[i]
    await payload.create({
      collection: 'schedule',
      data: {
        time: item.time,
        event_name: item.event,
        stage: 'main',
        order: i,
      },
    })
  }

  console.log(`Seeded ${scheduleData.length} schedule items`)
}

async function seedPartners(payload: Awaited<ReturnType<typeof getPayload>>) {
  const filePath = path.join(DATA_DIR, 'partners.json')
  const partnersData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

  for (let i = 0; i < partnersData.length; i++) {
    const partner = partnersData[i]
    const logoId = await uploadImage(payload, partner.logo, partner.name)

    await payload.create({
      collection: 'partners',
      data: {
        name: partner.name,
        logo: logoId,
        url: partner.link || '',
        tier: 'silver',
        order: i,
      },
    })
  }

  console.log(`Seeded ${partnersData.length} partners`)
}

async function seedActivities(payload: Awaited<ReturnType<typeof getPayload>>) {
  const filePath = path.join(DATA_DIR, 'activities.json')
  const activitiesData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  const activities = activitiesData.activities || []

  for (let i = 0; i < activities.length; i++) {
    const activity = activities[i]
    const imageIds = await uploadImages(payload, activity.images, activity.title)

    await payload.create({
      collection: 'activities',
      data: {
        title: activity.title,
        age_range: activity.category || '',
        images: imageIds,
        order: i,
      },
    })
  }

  console.log(`Seeded ${activities.length} activities`)
}

async function seedSections(payload: Awaited<ReturnType<typeof getPayload>>) {
  const filePath = path.join(DATA_DIR, 'sections.json')
  const sectionsData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

  for (let i = 0; i < sectionsData.length; i++) {
    const section = sectionsData[i]
    const imageIds = await uploadImages(payload, section.images, section.title)

    // Transliterate title to create a unique slug
    const slug = transliterate(section.title) + '-' + i

    await payload.create({
      collection: 'sections',
      data: {
        title: section.title,
        slug,
        category: categoryMap[section.category] || 'competitions',
        time: section.time || '',
        registration_url: section.registration || '',
        images: imageIds,
        order: i,
      },
    })
  }

  console.log(`Seeded ${sectionsData.length} sections`)
}

/**
 * Transliterate a Russian string to Latin characters and produce a URL-safe slug.
 */
function transliterate(text: string): string {
  const map: Record<string, string> = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
    'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
  }

  return text
    .toLowerCase()
    .split('')
    .map((char) => map[char] ?? char)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function seed() {
  console.log('Starting seed...')
  const payload = await getPayload({ config })

  await seedSchedule(payload)
  await seedPartners(payload)
  await seedActivities(payload)
  await seedSections(payload)

  console.log('Seed complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
