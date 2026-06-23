import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-[#2A2A2A]">
      <div className="section-container py-12 sm:py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">

          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/fillaritrial-logo.webp"
                alt="Biketrial Hämeenlinna logo"
                width={300}
                height={66}
                className="h-10 w-auto sm:h-11"
              />
            </div>
            <p className="max-w-sm text-[0.96rem] leading-[1.72] text-[#B8B8B8] sm:text-sm">
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
          <div id="footer-contact">
            <div className="eyebrow mb-5">Yhteystiedot</div>
            <div className="flex flex-col gap-2.5 text-[0.96rem] sm:text-sm">
              <a
                href="mailto:info@biketrial.fi"
                className="text-[#B3B3B3] hover:text-[#FF6A00] transition-colors"
              >
                info@biketrial.fi
              </a>
              <div className="mt-2 flex flex-wrap gap-4">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.82rem] font-bold uppercase tracking-[0.14em] text-[#B3B3B3] transition-colors hover:text-[#FF6A00]"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.82rem] font-bold uppercase tracking-[0.14em] text-[#B3B3B3] transition-colors hover:text-[#FF6A00]"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="divider mt-10 flex flex-col items-center justify-between gap-2 pt-6 sm:mt-12 sm:flex-row">
          <span className="text-xs text-[#B3B3B3]">
            © {new Date().getFullYear()} Biketrial Hämeenlinna
          </span>
          <span className="text-xs text-[#B3B3B3]">biketrial.fi</span>
        </div>
      </div>
    </footer>
  )
}
