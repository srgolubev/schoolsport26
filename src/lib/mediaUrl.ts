export function mediaUrl(url: string | undefined): string {
  if (!url) return ''
  return url.replace('/api/media/file/', '/media/')
}
