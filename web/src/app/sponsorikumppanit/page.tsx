import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Sponsorikumppanit',
  description:
    'BikeFest sponsorikumppanit: selkeät sponsoripaketit, näkyvyysvaihtoehdot ja yhteystiedot kumppanuuksille.',
}

type SimpleCard = {
  title: string
  text: string
}

type SponsorPackage = {
  title: string[]
  price: string
  text: string
  items: string[]
  featured?: boolean
  ctaLabel: string
  badgeLabel?: string
}

function BenefitIcon({ kind }: { kind: 'meeting' | 'audience' | 'experience' | 'content' }) {
  if (kind === 'meeting') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="brand-icon" stroke="currentColor">
        <path d="M8.5 12.5 11 15l4-4" />
        <path d="M4.5 10.5 8 7l3.5 3.5" />
        <path d="M12.5 16.5 16 20l3.5-3.5" />
        <path d="M9 9l6 6" />
      </svg>
    )
  }

  if (kind === 'audience') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="brand-icon" stroke="currentColor">
        <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path d="M16.5 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
        <path d="M3.5 18.5c.8-2.3 2.9-3.5 4.5-3.5s3.7 1.2 4.5 3.5" />
        <path d="M13.5 18.5c.5-1.6 2-2.7 3.6-2.7 1.1 0 2.5.4 3.4 2.7" />
      </svg>
    )
  }

  if (kind === 'experience') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="brand-icon" stroke="currentColor">
        <path d="M6.5 15.5 12 4l5.5 11.5" />
        <path d="M8.5 15.5h7" />
        <path d="M9.5 19.5h5" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="brand-icon" stroke="currentColor">
      <rect x="4" y="5" width="16" height="12" rx="2" />
      <path d="m10 9 5 3-5 3Z" />
      <path d="M7 19h10" />
    </svg>
  )
}

const whyCards: SimpleCard[] = [
  { title: 'Kohtaamiset', text: 'Tapaa yleisö paikan päällä.' },
  { title: 'Kohderyhmä', text: 'Perheet, nuoret ja harrastajat.' },
  { title: 'Kokemus', text: 'Brändi osana elämystä.' },
  { title: 'Sisältö', text: 'Materiaalia someen ja markkinointiin.' },
]

const sponsorPackages: SponsorPackage[] = [
  {
    title: ['PÄÄYHTEISTYÖ-', 'KUMPPANI'],
    price: '1000 €',
    text: 'Te olette tapahtuman ytimessä.',
    items: [
      'Mahdollisuus ottaa oma alue tai ohjelma haltuun',
      'Näkyvyys tapahtumassa ja somessa',
      'Osa BikeFestin elämyksiä ja sisältöä',
    ],
    featured: true,
    ctaLabel: 'Ota yhteyttä',
    badgeLabel: 'Rajattu määrä',
  },
  {
    title: ['BOOST-', 'PAKETTI'],
    price: '300 €',
    text: 'Helppo tapa olla mukana ja näkyä.',
    items: [
      'Näkyvyys tapahtuman somessa',
      'Logo kisaohjelmassa',
      'Yritys mukana tapahtuman fiiliksessä',
    ],
    ctaLabel: 'Ota yhteyttä',
  },
  {
    title: ['STARTER-', 'PAKETTI'],
    price: '150 €',
    text: 'Kevyt tapa tukea tapahtumaa ja saada näkyvyyttä.',
    items: ['Logo verkkosivuilla', 'Logo kisaohjelmassa'],
    ctaLabel: 'Kysy lisää',
  },
]

function ImagePanel({
  src,
  alt,
  badge,
  className = '',
}: {
  src: string
  alt: string
  badge: string
  className?: string
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[16px] border border-white/10 bg-[#111111] shadow-[0_20px_50px_rgba(0,0,0,0.32)] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes="(min-width: 1024px) 40vw, 100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.84)_0%,rgba(0,0,0,0.58)_34%,rgba(0,0,0,0.12)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.06)_40%,rgba(0,0,0,0.28)_100%)]" />
      <div className="absolute inset-y-0 right-0 w-[42%] bg-[radial-gradient(circle_at_70%_30%,rgba(255,106,0,0.18)_0%,rgba(255,106,0,0.06)_24%,rgba(255,106,0,0)_64%)] blur-[18px]" />
      <div className="absolute left-5 top-5 rounded-full border border-[#FF6A00]/50 bg-black/35 px-4 py-1 text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-[#FF6A00] backdrop-blur-sm">
        {badge}
      </div>
    </div>
  )
}

export default function SponsorikumppanitPage() {
  const sponsorMail = 'mailto:info@biketrial.fi?subject=BikeFest%202026%20-%20Sponsorikumppanuus'

  return (
    <>
      <section className="relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image
            src="/images/tapahtuma.webp"
            alt="BikeFest-tapahtumakuva sponsorisivun herossa"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(6,6,6,0.88) 0%, rgba(6,6,6,0.76) 28%, rgba(10,10,10,0.56) 55%, rgba(10,10,10,0.34) 100%)',
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.08) 35%, rgba(0,0,0,0.14) 65%, rgba(0,0,0,0.42) 100%)',
            }}
          />
          <div
            aria-hidden
            className="absolute -right-16 top-8 h-[420px] w-[420px] rounded-full blur-[40px]"
            style={{
              background:
                'radial-gradient(circle, rgba(255,102,0,0.22) 0%, rgba(255,102,0,0.10) 22%, rgba(255,102,0,0.00) 60%)',
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.05] mix-blend-soft-light"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255,255,255,0.12) 0.7px, transparent 0.7px)',
              backgroundSize: '10px 10px',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-[840px] text-center">
            <div className="mb-5 text-[0.92rem] font-bold uppercase tracking-[0.08em] text-[#FF6A00] sm:text-[1rem]">
              BIKEFEST 2026
            </div>

            <h1
              className="mb-8 text-[clamp(3rem,6vw,5.15rem)] font-black leading-[0.9] text-white"
              style={{
                fontFamily: 'var(--font-montserrat), var(--font-anton), Impact, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '-0.03em',
              }}
            >
              <span className="block">Ole osa</span>
              <span className="block text-[#FF6A00]">BikeFestiä</span>
            </h1>

            <p className="mx-auto max-w-[640px] text-[1.18rem] leading-[1.58] text-[#B0B0B0] sm:text-[1.24rem]">
              Kohtaa perheet, nuoret ja harrastajat siellä, missä tapahtuu.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:info@biketrial.fi?subject=BikeFest%202026%20-%20Sponsorikumppanuus"
                className="btn-primary w-full justify-center sm:w-auto"
              >
                Kysy kumppanuudesta
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-[76px]">
        <div className="section-container">
          <div className="mb-12 text-center">
            <h2 className="text-[clamp(2.5rem,5vw,4.2rem)] uppercase leading-[0.95] text-white">
              Miksi sponsoriksi
            </h2>
            <div className="mx-auto mt-5 h-[5px] w-[210px] rounded-full bg-[#FF6A00] shadow-[0_0_18px_rgba(255,106,0,0.26)]" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {whyCards.map((card) => {
              const iconKind =
                card.title === 'Kohtaamiset'
                  ? 'meeting'
                  : card.title === 'Kohderyhmä'
                    ? 'audience'
                    : card.title === 'Kokemus'
                      ? 'experience'
                      : 'content'

              return (
                <div
                  key={card.title}
                  className="brand-card brand-card-hover group rounded-[6px] px-8 py-12 text-center shadow-[0_14px_34px_rgba(0,0,0,0.32)]"
                >
                  <div className="mb-9 flex justify-center">
                    <div className="flex h-[130px] w-[130px] items-center justify-center rounded-full border border-[#FF6A00]/45 bg-[radial-gradient(circle_at_center,rgba(255,106,0,0.13)_0%,rgba(255,106,0,0.05)_38%,rgba(0,0,0,0)_72%)] shadow-[0_0_32px_rgba(255,106,0,0.18)] transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:shadow-[0_0_42px_rgba(255,106,0,0.26)]">
                      <BenefitIcon kind={iconKind} />
                    </div>
                  </div>

                  <h3 className="text-[1.56rem] uppercase leading-[1.02] text-white">{card.title}</h3>
                  <p className="mx-auto mt-6 max-w-[250px] text-[1rem] leading-[1.72] text-[#D0D0D0]">
                    {card.text}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#050505] py-[84px]">
        <div className="section-container">
          <div className="mx-auto mb-14 max-w-[860px] text-center">
            <h2 className="text-[clamp(2.7rem,5.4vw,4.6rem)] uppercase leading-[0.95] text-white">
              Valitse roolisi BikeFestissä
            </h2>
            <p className="mt-5 text-[1.06rem] leading-[1.65] text-[#CFCFCF] sm:text-[1.12rem]">
              Sponsorina voit näkyä, omistaa osan tapahtumaa tai olla mukana ohjelmassa ja sisällöissä.
            </p>
          </div>

          <div className="my-[60px] grid grid-cols-1 gap-[30px] md:grid-cols-2 xl:grid-cols-3">
            {sponsorPackages.map((pkg) => (
              <div
                key={pkg.title}
                className={`relative flex min-h-[620px] flex-col border p-12 text-left ${
                  pkg.featured
                    ? 'border-[#FF6A00] bg-[#1A1A1A]'
                    : 'border-[#222] bg-[#111]'
                }`}
              >
                {pkg.badgeLabel ? (
                  <div className="absolute right-5 top-5 bg-[#FF6A00] px-3 py-1 text-[0.7rem] font-black uppercase text-white">
                    {pkg.badgeLabel}
                  </div>
                ) : null}

                <h3
                  className="mt-8 max-w-[290px] text-[1.44rem] leading-[1.06] text-white sm:text-[1.5rem]"
                  style={{
                    fontFamily: 'var(--font-montserrat), var(--font-anton), Impact, sans-serif',
                    letterSpacing: '0',
                  }}
                >
                  {pkg.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
                <div
                  className="my-5 text-[3rem] font-black leading-none text-[#FF6A00]"
                  style={{
                    fontFamily: 'var(--font-montserrat), var(--font-anton), Impact, sans-serif',
                  }}
                >
                  {pkg.price}
                </div>

                <p className="mb-10 max-w-[320px] text-[1.06rem] leading-[1.72] text-[#D0D0D0]">
                  {pkg.text}
                </p>

                <ul className="mb-0 space-y-5 text-[#B0B0B0]">
                  {pkg.items.map((item) => (
                    <li key={item} className="relative pl-5 text-[1.05rem] leading-[1.72] text-white">
                      <span className="absolute left-0 text-[#FF6A00]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={sponsorMail}
                  className={`mt-auto inline-flex w-full items-center justify-center rounded-full px-8 py-4 text-center text-sm font-extrabold uppercase tracking-[0.12em] transition duration-300 hover:scale-[1.03] ${
                    pkg.featured
                      ? 'bg-[linear-gradient(135deg,#ff6a00_0%,#ff8c00_100%)] text-white'
                      : 'border-2 border-white text-white'
                  }`}
                >
                  {pkg.ctaLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-[76px]">
        <div className="section-container">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
            <div>
              <h2 className="text-[clamp(2.5rem,5vw,4rem)] uppercase leading-[0.96] text-white">
                Mitä kumppani saa
              </h2>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  'Näkyvyyttä tapahtumassa',
                  'Oma rooli tai alue',
                  'Kohtaamisia yleisön kanssa',
                  'Sisältöä markkinointiin',
                ].map((item) => (
                  <li key={item} className="brand-card rounded-[12px] px-6 py-5 text-[1.02rem] text-white">
                    <span className="mr-2 text-[#FF6A00]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <ImagePanel
              src="/images/harrastajat-bikefest.webp"
              alt="BikeFestin harrastajia sponsorisivun tukikuvassa"
              badge="Yleisö ja energia"
              className="min-h-[360px]"
            />
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(135deg,#ff6a00_0%,#ff8c00_100%)] py-[96px]">
        <div className="section-container">
          <div className="mx-auto max-w-[880px] text-center">
            <h2 className="text-[clamp(2.8rem,5.5vw,4.7rem)] uppercase leading-[0.95] text-white">
              Rakennetaanko yhteinen juttu?
            </h2>
            <p className="mx-auto mt-5 max-w-[680px] text-[1.08rem] leading-[1.65] text-white/92">
              Kerro lyhyesti, millainen näkyvyys tai rooli sopisi teille.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="mailto:info@biketrial.fi?subject=BikeFest%202026%20-%20Sponsorikumppanuus"
                className="inline-flex items-center justify-center rounded-full bg-black px-8 py-4 text-sm font-extrabold uppercase tracking-[0.12em] text-white transition duration-300 hover:scale-[1.03]"
              >
                Ota yhteyttä
              </a>
              <a
                href="mailto:info@biketrial.fi?subject=BikeFest%202026%20-%20Sponsorikumppanuus"
                className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-4 text-sm font-extrabold uppercase tracking-[0.12em] text-white transition duration-300 hover:scale-[1.03]"
              >
                Lähetä sähköposti
              </a>
            </div>

            <div className="mt-8 space-y-2 text-[1.08rem] font-medium text-white">
              <div>info@biketrial.fi</div>
              <div>Heidi Leivo 040 521 3914</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
