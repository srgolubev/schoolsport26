import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

const PROJECT_ROOT = process.cwd()
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

function transliterate(text: string): string {
  const map: Record<string, string> = {
    'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh',
    'з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o',
    'п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'ts',
    'ч':'ch','ш':'sh','щ':'sch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya',
  }
  return text.toLowerCase().split('').map(c => map[c] || c).join('')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

async function uploadImage(payload: Awaited<ReturnType<typeof getPayload>>, filePath: string, alt: string): Promise<number | undefined> {
  const fullPath = path.join(PROJECT_ROOT, filePath)
  if (!fs.existsSync(fullPath)) return undefined
  try {
    const media = await payload.create({
      collection: 'media',
      data: { alt },
      filePath: fullPath,
    })
    return media.id as number
  } catch {
    return undefined
  }
}

export async function POST() {
  try {
    const payload = await getPayload({ config })
    const log: string[] = []

    // 1. Seed Schedule
    const scheduleData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'main_stage_schedule.json'), 'utf-8'))
    for (let i = 0; i < scheduleData.length; i++) {
      await payload.create({
        collection: 'schedule',
        data: { time: scheduleData[i].time, event_name: scheduleData[i].event, stage: 'main', sortOrder: i },
      })
    }
    log.push(`Seeded ${scheduleData.length} schedule items`)

    // 2. Seed Partners
    const partnersData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'partners.json'), 'utf-8'))
    for (let i = 0; i < partnersData.length; i++) {
      const p = partnersData[i]
      const logoId = await uploadImage(payload, p.logo, p.name)
      if (!logoId) { log.push(`Skipped partner ${p.name} (no logo)`); continue }
      await payload.create({
        collection: 'partners',
        data: { name: p.name, logo: logoId, url: p.link || '', tier: 'silver', sortOrder: i },
      })
    }
    log.push(`Seeded ${partnersData.length} partners`)

    // 3. Seed Activities
    const activitiesData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'activities.json'), 'utf-8'))
    const activities = activitiesData.activities || []
    for (let i = 0; i < activities.length; i++) {
      const a = activities[i]
      const imageIds: number[] = []
      if (a.images) {
        for (const imgPath of a.images.slice(0, 3)) {
          const id = await uploadImage(payload, imgPath, a.title)
          if (id) imageIds.push(id)
        }
      }
      await payload.create({
        collection: 'activities',
        data: { title: a.title, age_range: a.category || '', images: imageIds, sortOrder: i },
      })
    }
    log.push(`Seeded ${activities.length} activities`)

    // 4. Seed Sections
    const sectionsData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'sections.json'), 'utf-8'))
    for (let i = 0; i < sectionsData.length; i++) {
      const s = sectionsData[i]
      const imageIds: number[] = []
      if (s.images) {
        for (const imgPath of s.images.slice(0, 3)) {
          const id = await uploadImage(payload, imgPath, s.title)
          if (id) imageIds.push(id)
        }
      }
      const slug = transliterate(s.title) + '-' + i
      await payload.create({
        collection: 'sections',
        data: {
          title: s.title,
          slug,
          category: categoryMap[s.category] || 'competitions',
          time: s.time || '',
          registration_url: s.registration || '',
          images: imageIds,
          sortOrder: i,
        },
      })
    }
    log.push(`Seeded ${sectionsData.length} sections`)

    return NextResponse.json({ success: true, log })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
