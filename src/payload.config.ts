import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Sections } from './collections/Sections'
import { Activities } from './collections/Activities'
import { Partners } from './collections/Partners'
import { Schedule } from './collections/Schedule'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    components: {
      beforeDashboard: ['@/components/admin/RevalidateButton'],
    },
  },
  collections: [Users, Media, Sections, Activities, Partners, Schedule],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-do-not-use-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./database.db',
    },
  }),
  onInit: async (payload) => {
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (existingUsers.totalDocs === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@festival.ru',
          password: 'Yana2026',
        },
      })
      payload.logger.info('Default admin user created: admin@festival.ru')
    }
  },
})
