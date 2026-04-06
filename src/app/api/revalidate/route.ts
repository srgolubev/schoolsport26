import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const cookies = req.headers.get('cookie') || ''
  if (!cookies.includes('payload-token=')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  revalidatePath('/', 'layout')
  revalidatePath('/sections', 'page')
  revalidatePath('/sections/[slug]', 'page')

  return NextResponse.json({ revalidated: true, timestamp: Date.now() })
}
