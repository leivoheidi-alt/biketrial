import type { Metadata } from 'next'
import { Inter, Anton } from 'next/font/google'
import '@/styles/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Biketrial Hämeenlinna — polkupyörätrial & BikeFest',
    template: '%s | Biketrial Hämeenlinna',
  },
  description:
    'Biketrial Hämeenlinna — paikallinen polkupyörätrial-seura sekä BikeFest 2026, biketrialin, skeittauksen ja katukulttuurin suurtapahtuma.',
  keywords: [
    'polkupyörätrial',
    'biketrial Hämeenlinna',
    'bikefest Hämeenlinna',
    'trial pyöräily',
    'alkeiskurssi Hämeenlinna',
  ],
  openGraph: {
    type: 'website',
    locale: 'fi_FI',
    siteName: 'Biketrial Hämeenlinna',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fi" className={`${inter.variable} ${anton.variable}`}>
      <body className="bg-black text-white">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
