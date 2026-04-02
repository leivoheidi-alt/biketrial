import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import BikefestHeroMedia from '@/components/sections/BikefestHeroMedia'
import SanityImage from '@/components/ui/SanityImage'
import type { SanityImage as SanityImageType } from '@/types/sanity'
import {
  bikefestVisitorFallbackImages,
  getBikefestData,
  resolvePublicImage,
} from './_data'

export const metadata: Metadata = {
  title: 'BikeFest Hämeenlinna 2026 – Biketrial SM, Skate Jam & BMX',
  description:
    'BikeFest Hämeenlinna 27.6.2026. Biketrialin SM-osakilpailu, skeittijamit, BMX-demot ja koko perheen pyöräilytapahtuma Hämeensaaressa.',
  keywords: [
    'bikefest hämeenlinna',
    'bikefest 2026',
    'biketrial hämeenlinna',
    'biketrial',
    'fillaritrial',
    'polkupyörätrial',
    'polkupyöräily',
    'pyöräilytapahtuma hämeenlinna',
  ],
  alternates: {
    canonical: '/bikefest',
  },
  openGraph: {
    title: 'BikeFest Hämeenlinna 2026 – Biketrial SM, Skate Jam & BMX',
    description:
      'BikeFest Hämeenlinna 27.6.2026. Biketrialin SM-osakilpailu, skeittijamit, BMX-demot ja koko perheen pyöräilytapahtuma Hämeensaaressa.',
    type: 'website',
    images: [
      {
        url: '/images/tapahtuma.webp',
        alt: 'BikeFest Hämeenlinna 2026 tapahtumatunnelma',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BikeFest Hämeenlinna 2026 – Biketrial SM, Skate Jam & BMX',
    description:
      'BikeFest Hämeenlinna 27.6.2026. Biketrialin SM-osakilpailu, skeittijamit, BMX-demot ja koko perheen pyöräilytapahtuma Hämeensaaressa.',
    images: ['/images/tapahtuma.webp'],
  },
}

type ScheduleItem = {
  segment: 'AAMU' | 'PÄIVÄ' | 'ILTA'
  time: string
  category: 'BIKETRIAL' | 'SKEITTI' | 'BMX' | 'MUSIIKKI'
  title: string
  description?: string
  emphasis: 'primary' | 'secondary' | 'meta'
}

function BikefestImageLayer({
  sanityImage,
  fallbackSrc,
  alt,
  className,
  priority = false,
}: {
  sanityImage?: SanityImageType
  fallbackSrc: string
  alt: string
  className: string
  priority?: boolean
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
          'radial-gradient(circle at 18% 18%, rgba(255,106,0,0.32) 0%, transparent 28%), radial-gradient(circle at 82% 18%, rgba(255,255,255,0.12) 0%, transparent 18%), linear-gradient(145deg, #181818 0%, #0A0A0A 62%, #101010 100%)',
      }}
    />
  )
}

export default async function BikeFestLandingPage() {
  const { bikefest, highlights } = await getBikefestData()
  const eventDate = '27.6.2026'
  const eventLocation = bikefest?.eventLocation ?? 'Hämeensaari, Hämeenlinna'
  const heroDescription =
    'BikeFest Hämeenlinna on urbaanin pyöräilyn tapahtuma, jossa yhdistyvät biketrial eli polkupyörätrial, skeittaus sekä BMX.'
  const heroDescriptionSecondary =
    'Tapahtuma tuo yhteen lajin harrastajat, kilpailijat ja katsojat ympäri Suomen.'
  const heroLocationLine =
    (bikefest?.heroTitle ?? 'BikeFest Hämeenlinna 2026')
      .replace(/^BikeFest\s*/i, '')
      .replace(/\s*2026\b/i, '')
      .trim() || 'Hämeenlinna'

  const quickNavItems = [
    { label: 'BikeFest?', href: '#tapahtuma-tiiviisti' },
    { label: 'Miksi?', href: '#miksi-tulla' },
    { label: 'Ohjelma', href: '#ohjelma' },
    { label: 'Perheille', href: '#perheille' },
    { label: 'Saapuminen', href: '#saapuminen' },
    { label: 'Yrityksille', href: '#yrityksille' },
    { label: 'Kilpailijoille', href: '#kilpailijoille' },
  ] as const
  const fullSchedule: ScheduleItem[] = [
    {
      segment: 'AAMU',
      time: '10.00–11.00',
      category: 'BIKETRIAL',
      title: 'Ilmoittautuminen ja jaksoihin tutustuminen',
      emphasis: 'meta',
    },
    {
      segment: 'AAMU',
      time: '10.45–11.00',
      category: 'BIKETRIAL',
      title: 'Kilpailun avaus ja info',
      emphasis: 'secondary',
    },
    {
      segment: 'AAMU',
      time: '11.00–14.00',
      category: 'BIKETRIAL',
      title: 'Elite-luokkien semifinaalit',
      emphasis: 'primary',
    },
    {
      segment: 'AAMU',
      time: '11.30',
      category: 'BMX',
      title: 'BMX-näytös 1',
      emphasis: 'secondary',
    },
    {
      segment: 'PÄIVÄ',
      time: '12.00–15.00',
      category: 'BIKETRIAL',
      title: 'Muut luokat',
      description: 'Kilpailuaika 3 h',
      emphasis: 'secondary',
    },
    {
      segment: 'PÄIVÄ',
      time: '13.00',
      category: 'BMX',
      title: 'BMX-näytös 2',
      emphasis: 'secondary',
    },
    {
      segment: 'PÄIVÄ',
      time: '14.00',
      category: 'SKEITTI',
      title: 'Skate Jam käynnistyy, ilmoittautuminen ja vapaa ajo alkaa',
      emphasis: 'primary',
    },
    {
      segment: 'PÄIVÄ',
      time: '14.30',
      category: 'BMX',
      title: 'BMX-näytös 3',
      emphasis: 'secondary',
    },
    {
      segment: 'PÄIVÄ',
      time: '15.00–17.00',
      category: 'BIKETRIAL',
      title: 'Elite-luokkien finaalit, naiset aloittavat',
      emphasis: 'primary',
    },
    {
      segment: 'PÄIVÄ',
      time: '15.00',
      category: 'SKEITTI',
      title: 'Naiset + muunsukupuoliset',
      emphasis: 'secondary',
    },
    {
      segment: 'PÄIVÄ',
      time: '16.00',
      category: 'SKEITTI',
      title: 'Juniorit',
      emphasis: 'secondary',
    },
    {
      segment: 'PÄIVÄ',
      time: '17.00',
      category: 'BIKETRIAL',
      title: 'Palkintojenjako',
      emphasis: 'secondary',
    },
    {
      segment: 'PÄIVÄ',
      time: '17.00',
      category: 'SKEITTI',
      title: 'Miehet',
      emphasis: 'secondary',
    },
    {
      segment: 'ILTA',
      time: '19.00',
      category: 'SKEITTI',
      title: 'Best Trick, koko parkki',
      description: 'Cash for Tricks',
      emphasis: 'primary',
    },
    {
      segment: 'ILTA',
      time: '20.00 alkaen',
      category: 'MUSIIKKI',
      title: 'Live-musiikkia',
      description: 'View, Neal Low, Ooni Damus, Kessu',
      emphasis: 'primary',
    },
  ]
  const scheduleCategoryStyles: Record<ScheduleItem['category'], string> = {
    BIKETRIAL: 'border-[#FF6A00]/35 bg-[#FF6A00]/12 text-[#FFB066]',
    SKEITTI: 'border-white/18 bg-white/8 text-white',
    BMX: 'border-sky-400/25 bg-sky-400/10 text-sky-200',
    MUSIIKKI: 'border-fuchsia-400/25 bg-fuchsia-400/10 text-fuchsia-200',
  }
  const scheduleRowStyles: Record<ScheduleItem['category'], string> = {
    BIKETRIAL: 'bg-[#FF6A00]/[0.035]',
    SKEITTI: 'bg-violet-300/[0.035]',
    BMX: 'bg-sky-400/[0.04]',
    MUSIIKKI: 'bg-white/[0.03]',
  }
  const scheduleEmphasisStyles: Record<ScheduleItem['emphasis'], string> = {
    primary: 'border-l-2 border-[#FF6A00]/70 bg-white/[0.02]',
    secondary: '',
    meta: '',
  }
  const scheduleSections = [
    { label: 'AAMU', items: fullSchedule.filter((item) => item.segment === 'AAMU') },
    { label: 'PÄIVÄ', items: fullSchedule.filter((item) => item.segment === 'PÄIVÄ') },
    { label: 'ILTA', items: fullSchedule.filter((item) => item.segment === 'ILTA') },
  ]

  const visitorHighlights = [
    {
      image: '/images/kisa.webp',
      title: 'Biketrial SM-Cup osakilpailu',
      alt: 'Biketrial ja fillaritrial kilpailu Hämeenlinnassa BikeFest-tapahtumassa',
      description:
        highlights.find((item) => item.title.toLowerCase().includes('sm') || item.title.toLowerCase().includes('biketrial'))?.description ??
        'Suomen parhaat biketrial-ajajat kilpailevat Hämeensaaressa päivän aikana.',
    },
    {
      image: '/images/minijamit.webp',
      title: 'Hämeenlinnan Skeitti Ry jamit',
      alt: 'Skeittijamit BikeFestissä Hämeenlinnassa',
      description:
        highlights.find((item) => item.title.toLowerCase().includes('skate'))?.description ??
        'Skate Jam tuo tapahtumaan kisat, best trickin ja vahvan paikallisen skeittitunnelman.',
    },
    {
      image: '/images/bmx.webp',
      title: 'BMX-demot',
      alt: 'BMX-demo BikeFest pyöräilytapahtumassa Hämeenlinnassa',
      description:
        highlights.find((item) => item.title.toLowerCase().includes('bmx'))?.description ??
        'Näyttävät BMX-esitykset tekevät päivästä vauhdikkaan myös yleisölle.',
    },
    {
      image: '/images/lastenrata.webp',
      title: 'Lasten temppurata yhteistyössä Liikenneturvan kanssa',
      alt: 'Lasten pyörärata ja polkupyöräilyharjoittelu BikeFestissä',
      description: 'Maksuton perhealue, jossa lapset pääsevät kokeilemaan pyörätaitoja ohjatusti ja turvallisesti.',
    },
  ]

  return (
    <>
      <div className="sticky top-16 z-40 bg-[#FF6A00] border-b border-black/10">
        <div className="section-container py-4 sm:py-5">
          <nav aria-label="BikeFest pikanavigaatio" className="flex flex-wrap justify-center gap-2.5">
            {quickNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex items-center justify-center rounded-full border border-white/55 bg-black/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-black/18 hover:border-white/80"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <section className="relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <BikefestImageLayer
            sanityImage={bikefest?.heroImage}
            fallbackSrc={bikefestVisitorFallbackImages.heroImage}
            alt="BikeFest Hämeenlinna pyöräilytapahtuman tunnelma"
            className="absolute inset-0 object-cover object-center opacity-20"
            priority
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.82) 46%, rgba(0,0,0,0.9) 100%)',
            }}
          />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 h-[560px] w-[560px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #FF6A00 0%, transparent 70%)' }}
        />

        <div className="section-container relative z-10 pt-[50px] pb-[50px]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10 items-stretch">
            <div className="flex h-full flex-col justify-start">
              <h1
                className="text-[clamp(3rem,9vw,5rem)] text-white leading-none mb-6"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
              >
                <>
                  BikeFest<br />
                  <span className="text-[#FF6A00]">{heroLocationLine}</span>
                  <br />
                  <span className="text-white text-[0.52em] leading-[1.08]">{eventDate}</span>
                </>
              </h1>
              <p className="text-[#B3B3B3] text-xl max-w-2xl leading-relaxed mb-4">
                {heroDescription}
              </p>
              <p className="text-[#B3B3B3] text-xl max-w-2xl leading-relaxed mb-0">
                {heroDescriptionSecondary}
              </p>
            </div>

            <div className="relative flex h-full min-h-[420px] items-stretch justify-center overflow-hidden rounded-2xl lg:min-h-0">
              <BikefestHeroMedia
                fallbackSrc="/images/tapahtuma.webp"
                fallbackAlt="BikeFest Hämeenlinna 2026 pyöräilytapahtuman tunnelmaa"
                videoSrc="/images/bikefest-2026-promovideo.mp4"
              />
            </div>
          </div>

        </div>
      </section>

      <section id="tapahtuma-tiiviisti" className="section-padding bg-[#111111]">
        <div className="section-container">
          <div id="miksi-tulla" className="scroll-mt-20" />
          <div className="eyebrow mb-5 text-center">Nostot</div>
          <h2
            className="text-[clamp(2.2rem,5vw,4rem)] text-white mb-10 leading-none text-center"
            style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
          >
            Neljä syytä tulla<br />
            <span className="text-[#FF6A00]">paikan päälle</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {visitorHighlights.map((item) => (
              <div key={item.title} className="card overflow-hidden p-0">
                <div className="relative aspect-square w-full overflow-hidden rounded-t-2xl">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.22) 100%)',
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-[0.94rem] font-bold uppercase tracking-wide text-[#FF6A00] sm:text-[0.98rem]">
                    {item.title}
                  </h3>
                  <div className="text-[0.96rem] leading-[1.72] text-[#D0D0D0]">
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ohjelma" className="section-padding bg-black scroll-mt-20">
        <div className="section-container">
          <div className="mb-10">
            <div className="eyebrow mb-5">Ohjelma</div>
            <h2
              className="text-[clamp(2.2rem,5vw,4rem)] text-white leading-none"
              style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
            >
              Päivän ohjelma
            </h2>
            <p className="mt-5 max-w-3xl text-[#B3B3B3] text-lg leading-relaxed">
              BikeFestissä päivän aikana nähdään biketrialin SM-osakilpailu, skeittijamit, BMX-näytöksiä ja iltaohjelmaa.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 items-start">
            <div className="max-w-4xl overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#111111]">
              {scheduleSections.map((section, sectionIndex) => (
                <div key={section.label} className={sectionIndex > 0 ? 'border-t border-white/10' : ''}>
                  <div className="border-b border-white/10 bg-black/45 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF6A00] md:px-6">
                    {section.label}
                  </div>

                  <div className="divide-y divide-white/8">
                    {section.items.map((item) => (
                      <div
                        key={`${item.time}-${item.category}-${item.title}`}
                        className={`grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-[152px_minmax(0,1fr)] md:gap-6 md:px-6 ${scheduleRowStyles[item.category]} ${scheduleEmphasisStyles[item.emphasis]}`}
                      >
                        <div className="flex flex-col gap-1">
                          <span className="text-[#FF6A00] text-[0.95rem] font-bold leading-none tabular-nums sm:text-[1.05rem]">
                            {item.time}
                          </span>
                        </div>
                        <div>
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div className="text-white text-[1.02rem] font-semibold leading-snug sm:text-[1.08rem]">
                              {item.title}
                            </div>
                            <span
                              className={`inline-flex shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${scheduleCategoryStyles[item.category]}`}
                            >
                              {item.category}
                            </span>
                          </div>
                          {item.description ? (
                            <p className="mt-1.5 text-[#B3B3B3] text-sm leading-relaxed">
                              {item.description}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <aside className="rounded-2xl border border-[#2A2A2A] bg-[#111111] p-6">
              <h3 className="mb-4 text-[#FF6A00] text-[0.9rem] font-bold uppercase tracking-[0.2em]">
                Oheisohjelma
              </h3>
              <div className="space-y-4">
                {[
                  'Päivän aikana ohjelmaa on useassa paikassa samanaikaisesti, joten alueella riittää nähtävää koko ajan.',
                  'Liikenneturvan lasten fillarirata tarjoaa perheen pienimmille turvallisen ja hauskan paikan kokeilla ajamista.',
                  'Alueella toimii kahvila, joten voit viettää tapahtumassa helposti koko päivän.',
                  'Tapahtumassa on laadukas juonto, joka pitää yleisön mukana päivän tapahtumissa.',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 text-[#FF6A00]">▸</span>
                    <p className="text-[#B3B3B3] text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-black/30 p-4">
                <Image
                  src="/images/liikenneturva.jpg"
                  alt="Liikenneturvan logo"
                  width={480}
                  height={160}
                  className="h-auto w-full object-contain"
                />
              </div>

              <Link href="/bikefest/kilpailijoille" className="btn-outline mt-6 w-full justify-center text-xs">
                Kilpailijoiden tiedot
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section id="perheille" className="section-padding bg-[#111111]">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="max-w-2xl">
              <div className="eyebrow mb-5">Perheille</div>
              <h2
                className="text-[clamp(2rem,5vw,3.5rem)] text-white mb-6 leading-none"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
              >
                Päivä, jossa riittää<br />
                <span className="text-[#FF6A00]">tekemistä ja nähtävää</span>
              </h2>
              <p className="max-w-xl text-[1.04rem] leading-[1.72] text-[#D0D0D0]">
                BikeFest on avoin kaikille. Tapahtuma-alue on suunniteltu niin, että perheiden on helppo tulla ja viihtyä koko päivä. Pienimmille löytyy tekemistä, isommille katsottavaa ja kaikille muistettavaa.
              </p>

              <div className="mt-8 overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#131313]">
                <div className="flex items-start justify-between gap-5 border-b border-white/6 px-6 py-5">
                  <div>
                    <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#FF6A00]">
                      Kumppanina mukana
                    </div>
                    <div className="max-w-md text-base font-bold leading-snug text-white">
                      Lasten fillarirata yhteistyössä Liikenneturvan kanssa
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2">
                    <Image
                      src="/images/liikenneturva.jpg"
                      alt="Liikenneturvan logo"
                      width={132}
                      height={36}
                      className="h-6 w-auto object-contain opacity-90"
                    />
                  </div>
                </div>
                <div className="px-6 py-5">
                  <div className="mb-3 flex items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
                    <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
                    Turvallinen kokeilu ensikertalaisille
                  </div>
                  <p className="max-w-xl text-[0.98rem] leading-[1.68] text-[#CFCFCF]">
                    Liikenneturva on mukana toteuttamassa perheen pienimmille turvallista ja matalan kynnyksen ajokokemusta tapahtumapäivän aikana.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <div className="overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#141414]">
                <div className="relative min-h-[248px] overflow-hidden">
                  <BikefestImageLayer
                    sanityImage={bikefest?.familyAreaBlock?.familyAreaImage}
                    fallbackSrc={bikefestVisitorFallbackImages.familyAreaImage}
                    alt="Lasten pyörärata ja polkupyöräilyharjoittelu BikeFestissä"
                    className="absolute inset-0 object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#FF6A00]">
                    Perhealue
                  </div>
                  <h3 className="mb-2 text-[1.12rem] font-bold leading-snug text-white">
                    Lasten fillarirata ja turvallista tekemistä
                  </h3>
                  <p className="text-[0.98rem] leading-[1.7] text-[#D0D0D0]">
                    Perheen pienimmille oma alue, jossa voi kokeilla, oppia ja viihtyä turvallisesti.
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#141414]">
                <div className="relative min-h-[248px] overflow-hidden">
                  <BikefestImageLayer
                    sanityImage={bikefest?.heroImage}
                    fallbackSrc="/images/tapahtuma.webp"
                    alt="Kahvila ja makkaramyynti BikeFest-tapahtuma-alueella Hämeenlinnassa"
                    className="absolute inset-0 object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#FF6A00]">
                    Alueella
                  </div>
                  <h3 className="mb-2 text-[1.12rem] font-bold leading-snug text-white">
                    Kahvila ja makkaramyynti
                  </h3>
                  <p className="text-[0.98rem] leading-[1.7] text-[#D0D0D0]">
                    Alueella toimii kahvila ja makkarapiste, joten voit viettää tapahtumassa helposti koko päivän ilman kiirettä.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="saapuminen" className="section-padding bg-black">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 items-start">
            <div>
              <div className="eyebrow mb-5">Saapuminen ja info</div>
              <h2
                className="text-[clamp(2rem,5vw,3.5rem)] text-white mb-6 leading-none"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
              >
                Helppo tulla,<br />
                <span className="text-[#FF6A00]">helppo viihtyä</span>
              </h2>
              <p className="text-[#B3B3B3] text-lg leading-relaxed max-w-2xl">
                Tapahtuma järjestetään alueella {eventLocation}.
                Tarkemmat pysäköinti-, aluekartta- ja päivän käytännöt julkaistaan lähempänä tapahtumaa, mutta kävijän näkökulmasta päivä on rakennettu helposti lähestyttäväksi.
              </p>
            </div>

            <div className="rounded-2xl border border-[#2A2A2A] bg-[#111111] p-6">
              <div className="text-[#FF6A00] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                Kävijälle nopeasti
              </div>
              <div className="space-y-4">
                {[
                  'Ohjelmassa on sekä kilpailua että vapaammin seurattavaa sisältöä.',
                  'Perheet ja ensikertalaiset voivat tulla paikalle ilman lajitaustaa.',
                  'Jos haluat tarkempaa kilpailutietoa, siirry kilpailijoiden omalle sivulle.',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 text-[#FF6A00]">▸</span>
                    <p className="text-[#B3B3B3] text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/bikefest/kilpailijoille" className="btn-outline w-full justify-center text-xs">
                  Kilpailijoiden tarkemmat tiedot
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-[#2A2A2A] bg-[#111111]">
        <div className="section-container">
          <div className="max-w-4xl">
            <div className="eyebrow mb-5">Laji ja tapahtuma</div>
            <h2
              className="mb-6 text-[clamp(2rem,4.8vw,3.4rem)] leading-none text-white"
              style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
            >
              Mitä on biketrial<br />
              <span className="text-[#FF6A00]">eli polkupyörätrial?</span>
            </h2>

            <div className="space-y-5 text-[1.02rem] leading-[1.82] text-[#D0D0D0]">
              <p>
                Biketrial, eli polkupyörätrial, on laji jossa pyörällä tasapainoillaan ja ylitetään esteitä ilman jalkojen maahan koskemista.
              </p>
              <p>
                Biketrial, eli fillaritrial tai polkupyörätrial, on laji jossa pyörällä tasapainoillaan ja ylitetään esteitä ilman jalkojen maahan koskemista. Laji vaatii taitoa, tasapainoa ja kehonhallintaa.
              </p>
              <p>
                BikeFest Hämeenlinna tuo yhteen biketrialin, fillaritrialin ja polkupyörätrialin harrastajat sekä kaikki urbaanista pyöräilystä kiinnostuneet.
              </p>
              <p>
                Tapahtuma on yksi harvoista Suomessa, jossa voi nähdä korkeatasoista polkupyörätrialia ja kokea samaan aikaan skeittijameja, BMX-demoja ja koko perheen pyöräilytapahtuman tunnelmaa. Jos haluat tutustua lajiin tarkemmin, voit lukea myös{' '}
                <Link href="/seura" className="text-white underline decoration-[#FF6A00]/60 underline-offset-4 transition hover:text-[#FFB066]">
                  Biketrial Hämeenlinnan seuratoiminnasta
                </Link>
                . Yrityksille ja kilpailijoille löytyvät omat lisätiedot sivuilta{' '}
                <Link href="/bikefest/kumppaneille" className="text-white underline decoration-[#FF6A00]/60 underline-offset-4 transition hover:text-[#FFB066]">
                  Kumppaneille
                </Link>{' '}
                ja{' '}
                <Link href="/bikefest/kilpailijoille" className="text-white underline decoration-[#FF6A00]/60 underline-offset-4 transition hover:text-[#FFB066]">
                  Kilpailijoille
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-[#2A2A2A] bg-black">
        <div className="section-container">
          <div className="eyebrow mb-5 text-center">Lisätiedot</div>
          <h2
            className="text-[clamp(2.2rem,5vw,4rem)] text-white mb-10 leading-none text-center"
            style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
          >
            Etsitkö tarkempaa<br />
            <span className="text-[#FF6A00]">BikeFest-infoa?</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Link id="yrityksille" href="/bikefest/kumppaneille" className="group rounded-2xl border border-[#2A2A2A] bg-[#111111] p-8 transition-colors hover:border-[#FF6A00]/50">
              <div className="eyebrow mb-4">Yrityksille</div>
              <h3
                className="text-4xl text-white leading-none mb-4"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
              >
                Standit,<br />
                sponsorointi ja<br />
                <span className="text-[#FF6A00]">näkyvyys</span>
              </h3>
              <p className="text-[#B3B3B3] text-sm leading-relaxed">
                Yrityksille oma sivu: standipaikat, sponsoripaketit, trial-sektorimainonta ja yhteydenotto.
              </p>
            </Link>

            <Link id="kilpailijoille" href="/bikefest/kilpailijoille" className="group rounded-2xl border border-[#2A2A2A] bg-[#111111] p-8 transition-colors hover:border-[#FF6A00]/50">
              <div className="eyebrow mb-4">Kilpailijoille</div>
              <h3
                className="text-4xl text-white leading-none mb-4"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
              >
                Aikataulu,<br />
                kilpailuinfo ja<br />
                <span className="text-[#FF6A00]">yhteystiedot</span>
              </h3>
              <p className="text-[#B3B3B3] text-sm leading-relaxed">
                Kilpailijoille oma sivu: kilpailukutsu, ilmoittautuneet, tulokset, luokat ja saapumisohjeet.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
