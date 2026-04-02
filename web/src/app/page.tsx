import { existsSync } from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import { homepageQuery, activeCourseQuery, clubIntroImageQuery } from '@/lib/queries'
import SanityImage from '@/components/ui/SanityImage'
import type { HomepageData, BeginnerCourseRef, ClubPageData } from '@/types/sanity'

export const metadata: Metadata = {
  title: 'BikeFest Hämeenlinna 2026 – Biketrial SM, Skate Jam & BMX',
  description:
    'BikeFest Hämeenlinna 27.6.2026. Biketrialin SM-osakilpailu, skeittijamit, BMX-demot ja koko perheen pyöräilytapahtuma Hämeensaaressa.',
  keywords: [
    'bikefest hämeenlinna',
    'bikefest 2026',
    'biketrial hämeenlinna',
    'biketrial',
    'polkupyörätrial',
    'fillaritrial',
    'pyöräilytapahtuma hämeenlinna',
  ],
  openGraph: {
    title: 'BikeFest Hämeenlinna 2026 – Biketrial SM, Skate Jam & BMX',
    description:
      'BikeFest Hämeenlinna 27.6.2026. Biketrialin SM-osakilpailu, skeittijamit, BMX-demot ja koko perheen pyöräilytapahtuma Hämeensaaressa.',
    type: 'website',
    images: [
      {
        url: '/images/home-hero.jpg',
        alt: 'BikeFest Hämeenlinna 2026 hero-kuva',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BikeFest Hämeenlinna 2026 – Biketrial SM, Skate Jam & BMX',
    description:
      'BikeFest Hämeenlinna 27.6.2026. Biketrialin SM-osakilpailu, skeittijamit, BMX-demot ja koko perheen pyöräilytapahtuma Hämeensaaressa.',
    images: ['/images/home-hero.jpg'],
  },
}

const homepageFallbackImages = {
  heroImage: '/images/home-hero.jpg',
  clubCardImage: '/images/home-club-card.jpg',
  bikefestCardImage: '/images/home-bikefest-card.jpg',
  clubIntroImage: '/images/fillaritrial.webp',
} as const

function resolvePublicImage(src: string) {
  return existsSync(path.join(process.cwd(), 'public', src.replace(/^\//, ''))) ? src : null
}

function getSanityImageDimensions(assetRef?: string) {
  if (!assetRef) return null

  const match = assetRef.match(/-(\d+)x(\d+)-/)
  if (!match) return null

  const width = Number(match[1])
  const height = Number(match[2])

  if (!width || !height) return null

  return { width, height }
}

function HomepageImageLayer({
  sanityImage,
  fallbackSrc,
  alt,
  priority = false,
  className,
}: {
  sanityImage?: HomepageData['heroImage']
  fallbackSrc: string
  alt: string
  priority?: boolean
  className: string
}) {
  if (sanityImage?.asset) {
    return (
      <SanityImage
        image={sanityImage}
        alt={alt}
        fill
        priority={priority}
        className={className}
      />
    )
  }

  const localFallback = resolvePublicImage(fallbackSrc)
  if (localFallback) {
    return (
      <Image
        src={localFallback}
        alt={alt}
        fill
        priority={priority}
        className={className}
        sizes="100vw"
      />
    )
  }

  return (
    <div
      aria-hidden
      className={className}
      style={{
        background:
          'radial-gradient(circle at 20% 20%, rgba(255,106,0,0.35) 0%, transparent 28%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.12) 0%, transparent 22%), linear-gradient(145deg, #1A1A1A 0%, #0A0A0A 58%, #111111 100%)',
      }}
    />
  )
}

export default async function HomePage() {
  const [homepage, activeCourse, clubIntroImageData] = await Promise.all([
    client.fetch<HomepageData | null>(homepageQuery).catch(() => null),
    client.fetch<BeginnerCourseRef | null>(activeCourseQuery).catch(() => null),
    client.fetch<Pick<ClubPageData, 'introImage'> | null>(clubIntroImageQuery).catch(() => null),
  ])

  const clubCard = homepage?.entryCards?.[0]
  const bikefestCard = homepage?.entryCards?.[1]

  const homepageHeroTitle = homepage?.heroTitle?.trim() ?? 'BikeFest 27.6.2026'
  const bikefestTitleMatch = homepageHeroTitle.match(/^bikefest\b\s*(.*)$/i)
  const heroPrimaryTitle = bikefestTitleMatch ? 'BIKEFEST' : homepageHeroTitle.toUpperCase()

  const homepageHeroDimensions = getSanityImageDimensions(homepage?.heroImage?.asset?._ref) ?? {
    width: 1920,
    height: 1080,
  }

  const homepageHeroImageSrc = homepage?.heroImage?.asset
    ? urlFor(homepage.heroImage).width(2600).auto('format').url()
    : resolvePublicImage(homepageFallbackImages.heroImage)

  const clubIntroImageSrc = clubIntroImageData?.introImage?.asset
    ? urlFor(clubIntroImageData.introImage).width(1800).auto('format').url()
    : resolvePublicImage(homepageFallbackImages.clubIntroImage)

  const heroSupportingLine = 'Mm. Biketrialin SM-Cup, skeittauksen minijamit ja BMX-näytökset'

  return (
    <>
      {/* ── FEATURED BANNER IMAGE ───────────────────────────── */}
      <section className="bg-black">
        <div className="section-container pb-5 pt-10 sm:pb-6 sm:pt-12">
          <div className="relative overflow-hidden rounded-[28px] border border-[#2A2A2A] bg-[#111111]">
            {homepageHeroImageSrc ? (
              <Image
                src={homepageHeroImageSrc}
                alt="BMX, biketrial ja polkupyörätrial osana BikeFest-kulttuuria Hämeenlinnassa"
                width={homepageHeroDimensions.width}
                height={homepageHeroDimensions.height}
                priority
                className="h-auto w-full object-contain object-center"
                sizes="100vw"
              />
            ) : (
              <div
                aria-hidden
                className="aspect-[16/9] w-full"
                style={{
                  background:
                    'radial-gradient(circle at 20% 20%, rgba(255,106,0,0.22) 0%, transparent 28%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.12) 0%, transparent 22%), linear-gradient(145deg, #1A1A1A 0%, #0A0A0A 58%, #111111 100%)',
                }}
              />
            )}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,106,0,0.08) 0%, rgba(0,0,0,0.02) 30%, rgba(255,106,0,0.07) 100%)',
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -left-20 h-[420px] w-[420px] rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #FF6A00 0%, transparent 72%)' }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage:
                  'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '80px 80px',
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[68%]"
              style={{
                background:
                  'linear-gradient(90deg, rgba(0,0,0,0.42) 0%, rgba(255,106,0,0.16) 24%, rgba(0,0,0,0.12) 48%, rgba(255,106,0,0.04) 62%, transparent 82%)',
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-[28%] top-1/2 z-[1] h-[260px] w-[420px] -translate-y-1/2 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(0,0,0,0.28) 0%, rgba(255,106,0,0.08) 34%, rgba(0,0,0,0.04) 58%, transparent 78%)',
                filter: 'blur(16px)',
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 right-0 h-28 w-40"
              style={{
                background:
                  'linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.04) 44%, rgba(0,0,0,0.18) 100%)',
              }}
            />

            <div className="absolute inset-0 z-10 flex items-center justify-start">
              <div className="max-w-[min(540px,48%)] px-6 py-7 text-left sm:px-10 sm:py-10 lg:px-12 lg:py-12">
                <div className="flex flex-col items-start [&>*]:ml-0 [&>*]:pl-0">
                  <div className="mb-2 block text-[clamp(0.76rem,1.28vw,1.02rem)] font-medium uppercase tracking-[0.3em] text-white/88">
                    27.6.2026 — Hämeensaari
                  </div>

                  <h1
                    className="mb-2 block w-full text-white leading-[0.92]"
                    style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
                  >
                    <span className="-ml-[0.045em] block text-[clamp(3.6rem,9vw,7.2rem)]">{heroPrimaryTitle}</span>
                  </h1>

                  <p className="max-w-xl text-[1.02rem] leading-[1.35] text-white/90 sm:text-[1.2rem]">
                    {heroSupportingLine}
                  </p>

                  <div className="mt-6 flex">
                    <Link
                      href="/bikefest"
                      className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-white/92 transition-colors hover:text-white"
                    >
                      <span>Tutustu BikeFestiin</span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6A00] text-white">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 14 14">
                          <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENTRY CARDS ─────────────────────────────────────── */}
      <section className="bg-black">
        <div className="section-container pb-16 sm:pb-20">

          {/* ── THE TWO ENTRY CARDS ────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">

            {/* ─── Card 1 — Alkeiskurssi ─────────────────────── */}
            <Link
              href="/seura#kurssi"
              className="group relative flex min-h-[400px] flex-col overflow-hidden rounded-2xl transition-all duration-300"
            >
              <div className="relative h-[190px] overflow-hidden rounded-t-2xl sm:h-[210px]">
                <HomepageImageLayer
                  sanityImage={bikefestCard?.image}
                  fallbackSrc={homepageFallbackImages.bikefestCardImage}
                  alt="Polkupyörätrialin alkeiskurssi Hämeenlinnassa"
                  className="absolute inset-0 scale-[1.05] object-cover object-center contrast-110 saturate-110 transition-transform duration-500 group-hover:scale-[1.08]"
                />
                <div className="absolute right-0 top-0 z-20 flex min-h-[56px] min-w-[88px] flex-col items-center justify-center rounded-[10px] bg-[#FF6A00] px-4 py-2 text-center text-[12px] font-bold uppercase leading-[1.05] tracking-[0.08em] text-white shadow-[0_8px_20px_rgba(0,0,0,0.2)] sm:min-h-[60px] sm:min-w-[96px] sm:text-[13px]">
                  <span className="block">ALOITA</span>
                  <span className="block">TRIAL!</span>
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 via-black/18 to-transparent"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-1"
                  style={{ background: 'linear-gradient(90deg, rgba(255,106,0,0) 0%, rgba(255,106,0,0.92) 45%, rgba(255,106,0,0) 100%)' }}
                />
                <div className="absolute inset-x-0 bottom-0 z-10 px-8 pb-7 sm:px-10 sm:pb-8">
                  <h2
                    className="text-4xl leading-none text-white sm:text-5xl"
                    style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
                  >
                    Alkeiskurssi 7.5.2026
                  </h2>
                </div>
              </div>

              <div
                className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-b-2xl p-8 sm:p-10"
                style={{ background: 'linear-gradient(145deg, #1C1C1C 0%, #0A0A0A 60%, #111111 100%)' }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 12px)',
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(255,106,0,0.25) 0%, transparent 70%)' }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-12 -right-12 h-52 w-52 rounded-full border-[20px] border-white/5 group-hover:border-[#FF6A00]/25 transition-colors duration-500"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-6 -right-6 h-28 w-28 rounded-full border-[10px] border-white/5 group-hover:border-[#FF6A00]/20 transition-colors duration-500"
                />

                <div className="relative z-10">
                  <p className="max-w-sm text-base leading-relaxed text-white/80">
                    Alkeiskurssi on tarkoitettu kaikille aloittelijoille. Et tarvitse aiempaa kokemusta – riittää, että tulet paikalle.
                    <br />
                    <br />
                    Seuralla on lainapyöriä alkuun, ja harjoittelemme rennosti yhdessä.
                    <br />
                    Toiminta pyörii talkoohengellä vanhempien ja ohjaajien kanssa.
                    <br />
                    <br />
                    Tavoitteena on päästä turvallisesti kiinni lajiin ja saada hyvä fiilis ensimmäisestä kerrasta.
                  </p>

                  {activeCourse?.isActive && (
                    <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#FF6A00] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                      <span>📅</span>
                      <span>Alkeiskurssi {activeCourse.startDateText}</span>
                    </div>
                  )}
                </div>
                <div className="relative z-10 mt-8 flex items-center gap-3">
                  <span className="text-sm font-bold uppercase tracking-widest text-white">
                    ILMOITTAUDU MUKAAN
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6A00] transition-colors duration-200 group-hover:bg-[#E85C00]">
                    <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 14 14">
                      <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl border border-[#2A2A2A] group-hover:border-[#FF6A00]/50 transition-colors duration-300"
              />
            </Link>

            {/* ─── Card 2 — Biketrial-seura ───────────────────── */}
            <Link
              href="/seura"
              className="group relative flex min-h-[400px] flex-col overflow-hidden rounded-2xl bg-[#FF6A00] transition-all duration-300 hover:bg-[#E85C00]"
            >
              <div className="relative h-[190px] overflow-hidden sm:h-[210px]">
                <HomepageImageLayer
                  sanityImage={clubCard?.image}
                  fallbackSrc={homepageFallbackImages.clubCardImage}
                  alt="Biketrial- ja polkupyörätrialharjoittelua Hämeenlinnassa"
                  className="absolute inset-0 scale-[1.05] object-cover object-center contrast-110 saturate-110 transition-transform duration-500 group-hover:scale-[1.08]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/38 via-black/10 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 z-10 px-8 pb-7 sm:px-10 sm:pb-8">
                  <h2
                    className="text-4xl leading-none text-white sm:text-5xl"
                    style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
                  >
                    Mitä on Biketrial?
                  </h2>
                </div>
              </div>

              <div className="relative flex flex-1 flex-col justify-between p-8 sm:p-10">
                <div
                  aria-hidden
                  className="absolute bottom-0 left-0 h-56 w-56 rounded-tr-full bg-black/10"
                />
                <div
                  aria-hidden
                  className="absolute top-0 right-0 h-28 w-28 rounded-bl-full bg-black/08"
                />

                <div className="relative z-10">
                  <p className="max-w-sm text-base leading-relaxed text-white/90">
                    Polkupyörätrialissa opetellaan tasapainoa, kehonhallintaa ja rohkeutta, jokainen omalla tasollaan.
                    <br />
                    <br />
                    Olemme Tawast Cycling Club ry:n trialjaosto.
                    <br />
                    Harjoittelemme yhdessä ja rakennamme lajia eteenpäin Hämeenlinnassa.
                    <br />
                    <br />
                    Kesäisin treenaamme Hämeensaaren trialparkissa ja talvisin Kantolan skeitti- ja biketrialhallissa.
                  </p>
                </div>

                <div className="relative z-10 mt-8 flex items-center gap-3">
                  <span className="text-sm font-bold uppercase tracking-widest text-white">
                    TULE MUKAAN
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/20 transition-all duration-200 group-hover:bg-black/35">
                    <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 14 14">
                      <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl border border-black/10"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ── MIKÄ ON BIKETRIAL ── */}
      <section className="section-padding bg-[#111111]">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div>
              <div className="eyebrow mb-5">Mitä on biketrial eli polkupyörätrial?</div>
              <h2
                className="text-[clamp(2.5rem,6vw,4.5rem)] text-white mb-6 leading-[1.12]"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
              >
                Tasapainoa.<br />
                Tarkkuutta.<br />
                <span className="text-[#FF6A00]">Rohkeutta.</span>
              </h2>
              <p className="text-[#B3B3B3] text-lg leading-relaxed mb-4">
                Biketrial, eli polkupyörätrial, on laji jossa pyörällä tasapainoillaan ja ylitetään esteitä ilman jalkojen maahan koskemista.
              </p>
              <p className="text-[#B3B3B3] leading-relaxed mb-8">
                Hämeenlinnan seura on avoin kaikille. Harjoitukset ovat ohjattuja, tunnelma kannustava ja kynnys matala myös aloittelijoille. Laji kehittää tasapainoa, ketteryyttä ja kehonhallintaa turvallisesti Hämeenlinnassa, Suomessa.
              </p>
              <Link href="/seura" className="btn-primary">
                Lue lisää seurasta
              </Link>
            </div>

            <div className="relative min-h-[360px] overflow-hidden rounded-[28px] border border-[#2A2A2A] bg-black sm:min-h-[420px] lg:min-h-[540px]">
              {clubIntroImageSrc ? (
                <Image
                  src={clubIntroImageSrc}
                  alt="Biketrial-harjoittelua Hämeenlinnassa"
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                />
              ) : (
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(circle at 18% 18%, rgba(255,106,0,0.22) 0%, transparent 30%), radial-gradient(circle at 82% 0%, rgba(255,255,255,0.1) 0%, transparent 24%), linear-gradient(150deg, #1A1A1A 0%, #090909 58%, #111111 100%)',
                  }}
                />
              )}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0) 38%, rgba(0,0,0,0.14) 100%)',
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage:
                    'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                  backgroundSize: '72px 72px',
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-12"
                style={{ background: 'radial-gradient(circle, #FF6A00 0%, transparent 72%)' }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1"
                style={{ background: 'linear-gradient(90deg, rgba(255,106,0,0) 0%, rgba(255,106,0,0.7) 50%, rgba(255,106,0,0) 100%)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── BIKEFEST SALES TEASER ── */}
      <section className="section-padding bg-black relative overflow-hidden">
        {/* Large background text */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.04] select-none leading-none"
          style={{
            fontFamily: 'var(--font-anton), Impact, sans-serif',
            fontSize: 'clamp(8rem, 20vw, 18rem)',
            textTransform: 'uppercase',
            color: 'white',
          }}
        >
          BIKEFEST
        </div>

        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="eyebrow mb-5">BikeFest 2026</div>
              <h2
                className="text-[clamp(2.5rem,6vw,4.5rem)] text-white mb-6 leading-[1.12]"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
              >
                Tavoita satoja<br />
                kävijöitä<br />
                <span className="text-[#FF6A00]">standin kautta</span>
              </h2>
              <p className="text-[#B3B3B3] text-lg leading-relaxed mb-4">
                BikeFest tuo Hämeensaareen perheitä, nuoria ja urheiluyhteisön väkeä.
                Standipaikka on suoraa kontaktia — ei bannerimainos, vaan aito kohtaaminen.
              </p>
              <p className="text-[#B3B3B3] text-sm leading-relaxed mb-8">
                Neljä tasoa: Pääsponsori, Kulta, Hopea ja Pronssi — budjetista riippumatta.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/bikefest#yrityksille" className="btn-primary">
                  Katso sponsoripaketit
                </Link>
                <Link href="/bikefest#ohjelma" className="btn-outline">
                  Katso ohjelma
                </Link>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-[#B3B3B3]">
                Haluatko nähdä koko BikeFest tapahtuman sisällön?{' '}
                <Link href="/bikefest" className="text-white underline decoration-[#FF6A00]/60 underline-offset-4 transition hover:text-[#FFB066]">
                  Tutustu BikeFestiin
                </Link>
                .
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-[#2A2A2A] bg-[#111111]">
              <Image
                src="/images/standi.webp"
                alt="BikeFestin ständialue sponsorille ja näytteilleasettajalle"
                width={1200}
                height={1500}
                className="h-full w-full object-cover object-center"
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0) 38%, rgba(0,0,0,0.12) 100%)',
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage:
                    'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                  backgroundSize: '72px 72px',
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-12 -right-12 h-44 w-44 rounded-full border-[18px] border-white/6"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
