'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { bikefestNavItems } from './bikefestNavItems'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [bikefestDesktopOpen, setBikefestDesktopOpen] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const pathname = usePathname()
  const currentPath = pathname ?? ''
  const bikefestActive = currentPath.startsWith('/bikefest')
  const seuraActive = currentPath.startsWith('/seura')
  const primaryDesktopLinks = [
    { label: 'Seura', href: '/seura', active: seuraActive },
  ] as const
  const standLink = {
    label: 'Varaa standipaikka',
    href: '/bikefest/näytteilleasettajat',
    active: currentPath === '/bikefest/näytteilleasettajat' || currentPath === '/bikefest/naytteilleasettajat',
  } as const
  const mobileNavLinks = [
    ...primaryDesktopLinks,
    ...bikefestNavItems.map((item) => ({ ...item, active: currentPath === item.href })),
    standLink,
  ].filter((item, index, items) => items.findIndex((candidate) => candidate.href === item.href) === index) as const

  useEffect(() => {
    setOpen(false)
    setBikefestDesktopOpen(false)
  }, [currentPath])

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#2A2A2A] bg-black/95 backdrop-blur-sm">
      <div className="section-container">
        <div className="flex h-16 items-center justify-between md:h-24">

          <Link
            href="/"
            className="flex items-center group"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/images/fillaritrial-logo.webp"
              alt="FillariTrial logo"
              width={320}
              height={70}
              priority
              className="h-[2.75rem] w-auto transition-opacity duration-200 group-hover:opacity-85 sm:h-[3.3rem] md:h-[5rem] lg:h-[5.4rem]"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {primaryDesktopLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[1.02rem] font-bold uppercase tracking-[0.14em] transition-colors ${
                  item.active ? 'text-white' : 'text-[#B3B3B3] hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
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
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-[1.02rem] font-bold uppercase tracking-[0.14em] transition-colors ${
                  bikefestActive || bikefestDesktopOpen
                    ? 'bg-[#111111] text-white'
                    : 'text-[#B3B3B3] hover:bg-[#111111] hover:text-white'
                }`}
              >
                <span>BikeFest</span>
                <span
                  className={`text-[20px] leading-none transition-transform ${
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
                        className={`block rounded-lg px-3 py-2.5 text-[0.9rem] font-bold uppercase tracking-[0.14em] transition-colors ${
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
            <Link href={standLink.href} className="btn-primary text-[0.9rem] px-5 py-2.5">
              {standLink.label}
            </Link>
          </nav>

          <button
            type="button"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/10 bg-[#111111] text-white transition-colors hover:border-[#FF6A00] md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Sulje valikko' : 'Avaa valikko'}
          >
            <span className="sr-only">{open ? 'Sulje valikko' : 'Avaa valikko'}</span>
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-5 bg-white transition-all duration-200 ${open ? 'translate-y-2 rotate-45' : ''}`}
              />
              <span
                className={`block h-0.5 w-5 bg-white transition-all duration-200 ${open ? 'opacity-0' : ''}`}
              />
              <span
                className={`block h-0.5 w-5 bg-white transition-all duration-200 ${open ? '-translate-y-2 -rotate-45' : ''}`}
              />
            </div>
          </button>
        </div>

      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[100] h-dvh w-screen overflow-hidden bg-[#000000] transition-all duration-300 ease-out md:hidden ${
          open ? 'pointer-events-auto visible opacity-100' : 'pointer-events-none invisible opacity-0'
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div
          className={`relative z-10 mx-auto flex h-full w-full max-w-[430px] flex-col px-5 pb-7 pt-5 transition-all duration-300 ease-out sm:px-6 ${
            open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <div className="flex items-start justify-between border-b border-white/10 pb-4">
            <Link href="/" className="pr-6" onClick={() => setOpen(false)}>
              <Image
                src="/images/fillaritrial-logo.webp"
                alt="FillariTrial logo"
                width={320}
                height={70}
                className="h-[3.3rem] w-auto sm:h-[3.55rem]"
              />
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Sulje valikko"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center text-[2.15rem] leading-none text-white transition-colors hover:text-[#FF6A00]"
            >
              ×
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center py-6">
            <div className="mx-auto flex w-full flex-col gap-2">
              {mobileNavLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-3 pl-5 pr-2 text-[clamp(1.2rem,5.2vw,1.6rem)] font-bold uppercase tracking-[0.04em] transition-colors duration-200 ${
                    item.active ? 'text-[#FF6A00]' : 'text-white hover:text-[#FF6A00]'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <span
                    aria-hidden
                    className={`absolute left-0 top-1/2 h-8 w-[2px] -translate-y-1/2 bg-[#FF6A00] transition-opacity ${
                      item.active ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="border-t border-white/10 pt-3">
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/biketrial_hameenlinna?utm_source=qr"
                target="_blank"
                rel="noreferrer"
                aria-label="Biketrial Hämeenlinnan Instagram"
                className="flex min-h-[52px] min-w-[52px] items-center justify-center text-[#FF6A00] transition-colors hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/share/1BjGSAQV9E/?mibextid=wwXIfr"
                target="_blank"
                rel="noreferrer"
                aria-label="Biketrial Hämeenlinnan Facebook"
                className="flex min-h-[52px] min-w-[52px] items-center justify-center text-[#FF6A00] transition-colors hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14.5 8H16V4.8c-.73-.2-1.7-.3-2.7-.3-2.7 0-4.3 1.6-4.3 4.5V12H6v3.5h3v6h3.6v-6H15l.5-3.5h-2.9V9.4c0-.95.28-1.4 1.3-1.4Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
