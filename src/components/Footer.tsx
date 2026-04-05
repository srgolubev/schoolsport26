interface FooterProps {
  orgName?: string
  orgDescription?: string
  vkUrl?: string
  telegramUrl?: string
  websiteUrl?: string
}

export default function Footer({ orgName, orgDescription, vkUrl, telegramUrl, websiteUrl }: FooterProps) {
  return (
    <footer className="py-10 bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <div className="text-xl font-bold">{orgName || "МЦВП"}</div>
          <div className="text-sm text-white/65 mt-1">{orgDescription || "Московский центр воспитательных практик"}</div>
          <div className="text-xs text-white/50 mt-3">&copy; {new Date().getFullYear()} Все права защищены</div>
        </div>
        <div className="flex gap-3">
          {vkUrl && (
            <a href={vkUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:bg-white/20 transition-colors text-sm font-semibold">VK</a>
          )}
          {telegramUrl && (
            <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:bg-white/20 transition-colors text-sm font-semibold">TG</a>
          )}
          {websiteUrl && (
            <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:bg-white/20 transition-colors text-sm font-semibold">W</a>
          )}
        </div>
      </div>
    </footer>
  )
}
