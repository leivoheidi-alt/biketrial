import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-[#2A2A2A]">
      <div className="section-container py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/fillaritrial-logo.webp"
                alt="Biketrial Hämeenlinna logo"
                width={300}
                height={66}
                className="h-11 w-auto"
              />
            </div>
            <p className="max-w-sm text-[#B8B8B8] text-sm leading-[1.72]">
              Biketrial Hämeenlinna on osa Tawast Cycling Clubia (Tawast CC) ja toimii seuran trialjaostona. Järjestämme BikeFest-tapahtuman.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="eyebrow mb-5">Sivut</div>
            <nav className="flex flex-col gap-2.5">
              {[
                { label: 'Etusivu', href: '/' },
                { label: 'Biketrial-seura', href: '/seura' },
                { label: 'BikeFest 2026', href: '/bikefest' },
                { label: 'Ohjelma', href: '/bikefest#ohjelma' },
                { label: 'Yrityksille', href: '/bikefest#yrityksille' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#B3B3B3] hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <div className="eyebrow mb-5">Yhteystiedot</div>
            <div className="flex flex-col gap-2.5 text-sm">
              <a
                href="mailto:info@biketrial.fi"
                className="text-[#B3B3B3] hover:text-[#FF6A00] transition-colors"
              >
                info@biketrial.fi
              </a>
              <div className="flex gap-4 mt-2">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B3B3B3] hover:text-[#FF6A00] font-bold uppercase text-xs tracking-widest transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B3B3B3] hover:text-[#FF6A00] font-bold uppercase text-xs tracking-widest transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="divider mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-[#B3B3B3] text-xs">
            © {new Date().getFullYear()} Biketrial Hämeenlinna
          </span>
          <span className="text-[#B3B3B3] text-xs">biketrial.fi</span>
        </div>
      </div>
    </footer>
  )
}
