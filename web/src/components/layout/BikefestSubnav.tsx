'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { bikefestNavItems } from './bikefestNavItems'

export default function BikefestSubnav() {
  const pathname = usePathname()

  return (
    <section className="bg-[#111111] border-b border-[#2A2A2A]">
      <div className="section-container">
        <nav className="-mx-1 flex gap-2 overflow-x-auto py-3 sm:flex-wrap sm:overflow-visible">
          {bikefestNavItems.map((item) => {
            const active = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                  active
                    ? 'bg-[#FF6A00] text-white'
                    : 'bg-black text-[#B3B3B3] hover:text-white border border-[#2A2A2A]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </section>
  )
}
