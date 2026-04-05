import Image from "next/image"

interface FooterProps {
  orgName?: string
  orgDescription?: string
  vkUrl?: string
  telegramUrl?: string
  websiteUrl?: string
}

export default function Footer({ orgName, orgDescription, vkUrl, telegramUrl, websiteUrl }: FooterProps) {
  return (
    <footer className="py-12 bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Image src="/images/logo/mosobr.png" alt="Московское образование" width={240} height={60} className="h-10 md:h-12 w-auto brightness-0 invert" />
          <div className="text-center md:text-left">
            <div className="text-base text-white/65">{orgDescription || "Московский центр воспитательных практик"}</div>
            <div className="text-sm text-white/50 mt-2">&copy; {new Date().getFullYear()} Все права защищены</div>
          </div>
        </div>
        <div className="flex gap-3">
          {vkUrl && (
            <a href={vkUrl} target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:bg-white/20 transition-colors text-base font-bold">VK</a>
          )}
          {telegramUrl && (
            <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:bg-white/20 transition-colors text-base font-bold">TG</a>
          )}
          {websiteUrl && (
            <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:bg-white/20 transition-colors text-base font-bold">W</a>
          )}
        </div>
      </div>
    </footer>
  )
}
