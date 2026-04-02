'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { bikefestNavItems } from './bikefestNavItems'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [bikefestDesktopOpen, setBikefestDesktopOpen] = useState(false)
  const [bikefestMobileOpen, setBikefestMobileOpen] = useState(false)
  const pathname = usePathname()
  const currentPath = pathname ?? ''
  const bikefestActive = currentPath.startsWith('/bikefest')
  const seuraActive = currentPath.startsWith('/seura')

  useEffect(() => {
    setBikefestMobileOpen(bikefestActive)
    setBikefestDesktopOpen(false)
  }, [bikefestActive, currentPath])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-[#2A2A2A]">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            onClick={() => setOpen(false)}
          >
            <span className="text-[#FF6A00] text-xl font-bold">▲</span>
            <span
              className="font-heading text-white text-xl uppercase tracking-wider group-hover:text-[#FF6A00] transition-colors"
              style={{ fontFamily: 'var(--font-anton), Impact, sans-serif' }}
            >
              Biketrial Hämeenlinna
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/seura"
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                seuraActive ? 'text-white' : 'text-[#B3B3B3] hover:text-white'
              }`}
            >
              Seura
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setBikefestDesktopOpen(true)}
              onMouseLeave={() => setBikefestDesktopOpen(false)}
            >
              <button
                type="button"
                aria-expanded={bikefestDesktopOpen}
                aria-controls="bikefest-desktop-submenu"
                onClick={() => setBikefestDesktopOpen((value) => !value)}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold uppercase tracking-widest transition-colors ${
                  bikefestActive || bikefestDesktopOpen
                    ? 'bg-[#111111] text-white'
                    : 'text-[#B3B3B3] hover:bg-[#111111] hover:text-white'
                }`}
              >
                <span>BikeFest</span>
                <span
                  className={`text-[10px] transition-transform ${
                    bikefestDesktopOpen ? 'rotate-180' : ''
                  }`}
                >
                  ▾
                </span>
              </button>

              {bikefestDesktopOpen && (
                <div className="absolute left-0 top-full pt-3">
                  <div
                    id="bikefest-desktop-submenu"
                    className="min-w-[240px] overflow-hidden rounded-xl border border-[#2A2A2A] bg-[#111111]/95 p-2.5 shadow-2xl backdrop-blur"
                  >
                    <div className="mb-2 h-px w-full bg-gradient-to-r from-[#FF6A00] via-[#FF6A00]/30 to-transparent" />
                    {bikefestNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                          currentPath === item.href
                            ? 'bg-[#FF6A00] text-white'
                            : 'text-[#B3B3B3] hover:bg-black hover:text-white'
                        }`}
                        onClick={() => setBikefestDesktopOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/bikefest/kumppaneille"
              className="btn-primary text-xs px-5 py-2.5"
            >
              Varaa standipaikka
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Sulje valikko' : 'Avaa valikko'}
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-200 ${open ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-[#2A2A2A] py-4">
            <nav className="flex flex-col gap-1.5">
              <Link
                href="/seura"
                className={`rounded-xl px-3 py-3 font-bold uppercase tracking-widest text-sm transition-colors ${
                  seuraActive ? 'bg-[#111111] text-white' : 'text-[#B3B3B3] hover:bg-[#111111] hover:text-white'
                }`}
                onClick={() => setOpen(false)}
              >
                Seura
              </Link>
              <div className="py-1">
                <button
                  type="button"
                  aria-expanded={bikefestMobileOpen}
                  aria-controls="bikefest-mobile-submenu"
                  onClick={() => setBikefestMobileOpen((value) => !value)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left font-bold uppercase tracking-widest text-sm transition-colors ${
                    bikefestActive ? 'bg-[#111111] text-white' : 'text-[#B3B3B3] hover:bg-[#111111] hover:text-white'
                  }`}
                >
                  <span>BikeFest</span>
                  <span
                    className={`text-[10px] transition-transform ${
                      bikefestMobileOpen ? 'rotate-180' : ''
                    }`}
                  >
                    ▾
                  </span>
                </button>

                {bikefestMobileOpen && (
                  <div
                    id="bikefest-mobile-submenu"
                    className="mt-2 flex flex-col gap-2 rounded-xl border border-[#2A2A2A] bg-[#111111] p-3"
                  >
                    {bikefestNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`rounded-lg px-3 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                          currentPath === item.href
                            ? 'bg-[#FF6A00] text-white'
                            : 'text-[#B3B3B3] hover:bg-black hover:text-white'
                        }`}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link
                href="/bikefest/kumppaneille"
                className="btn-primary mt-4 w-full justify-center text-center"
                onClick={() => setOpen(false)}
              >
                Varaa standipaikka
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
