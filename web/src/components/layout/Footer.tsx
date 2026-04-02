import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-[#2A2A2A]">
      <div className="section-container py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#FF6A00] text-lg font-bold">▲</span>
              <span
                className="text-white text-lg uppercase"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', letterSpacing: '0.05em' }}
              >
                Biketrial Hämeenlinna
              </span>
            </div>
            <p className="text-[#B3B3B3] text-sm leading-relaxed">
              Paikallinen polkupyörätrial-seura ja BikeFest-tapahtuman järjestäjä.
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
