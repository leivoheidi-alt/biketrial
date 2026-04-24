import type { Metadata } from 'next'
import Image from 'next/image'
import SanityImage from '@/components/ui/SanityImage'
import type { SanityImage as SanityImageType } from '@/types/sanity'
import {
  bikefestSponsorFallbackImages,
  bikefestVisitorFallbackImages,
  getBikefestData,
  resolvePublicImage,
} from '../_data'

export const metadata: Metadata = {
  title: 'BikeFest Näytteilleasettajille',
  description:
    'BikeFest Näytteilleasettajille: ständipaikat, myyntipaikat ja kaupalliset osallistumistavat yrityksille, brändeille ja paikallisille toimijoille.',
}

function VisualLayer({
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
          'radial-gradient(circle at 20% 20%, rgba(255,106,0,0.25) 0%, transparent 28%), linear-gradient(145deg, #1a1a1a 0%, #0b0b0b 70%, #120700 100%)',
      }}
    />
  )
}

type PackageCard = {
  title: string
  price: string
  summary?: string
  items: string[]
  ctaLabel: string
  ctaHref: string
  featured?: boolean
}

function BenefitIcon({ kind }: { kind: 'growth' | 'audience' | 'meeting' | 'content' }) {
  if (kind === 'growth') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="brand-icon" stroke="currentColor">
        <path d="M4 16l5-5 4 4 7-7" />
        <path d="M14 8h6v6" />
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

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="brand-icon" stroke="currentColor">
      <rect x="4" y="5" width="16" height="12" rx="2" />
      <path d="m10 9 5 3-5 3Z" />
      <path d="M7 19h10" />
    </svg>
  )
}

function TargetCard({
  title,
  sanityImage,
  fallbackSrc,
  alt,
}: {
  title: string
  sanityImage?: SanityImageType
  fallbackSrc: string
  alt: string
}) {
  return (
    <div className="group relative h-[420px] overflow-hidden rounded-[6px] border border-white/10 bg-[#111111] shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#FF6A00]/70 hover:shadow-[0_20px_46px_rgba(255,106,0,0.16)]">
      <VisualLayer
        sanityImage={sanityImage}
        fallbackSrc={fallbackSrc}
        alt={alt}
        className="absolute inset-0 object-cover object-center transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF6A00] to-transparent opacity-85" />
      <div className="absolute inset-x-0 bottom-0 z-10 p-6">
        <h3
          className="text-[1.72rem] leading-[1.02] text-white drop-shadow-[0_3px_14px_rgba(0,0,0,0.55)]"
          style={{
            fontFamily: 'var(--font-montserrat), var(--font-anton), Impact, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0',
          }}
        >
          {title}
        </h3>
      </div>
    </div>
  )
}

export default async function BikefestPartnersPage() {
  const { bikefest, salesEmail } = await getBikefestData()

  const partnerMail = `mailto:${salesEmail}?subject=BikeFest%202026%20-%20Kumppanuus`
  const mediaCardMail = `mailto:${salesEmail}?subject=BikeFest%202026%20-%20Mediakortti`
  const exhibitorBookingMail =
    'mailto:info@biketrial.fi?subject=BikeFest%202026%20-%20Osastovaraus'

  const benefitCards = [
    {
      title: 'Kasvu',
      body: 'Tapahtuma rakentaa vuosi vuodelta vahvempaa roolia Hämeenlinnassa.',
      icon: 'growth',
    },
    {
      title: 'Yleisö',
      body: 'Perheet, nuoret, harrastajat ja aktiiviset vapaa-ajan viettäjät samassa paikassa.',
      icon: 'audience',
    },
    {
      title: 'Kohtaaminen',
      body: 'Täällä näkyvyys muuttuu keskusteluiksi, demoiksi ja muistijäljiksi.',
      icon: 'meeting',
    },
    {
      title: 'Sisältö',
      body: 'Show, kilpailut ja yleisö tuottavat materiaalia markkinointiin.',
      icon: 'content',
    },
  ] as const satisfies ReadonlyArray<{
    title: string
    body: string
    icon: 'growth' | 'audience' | 'meeting' | 'content'
  }>

  const packageCards: PackageCard[] = [
    {
      title: 'Pikkuständi',
      price: '300 €',
      summary: 'Kompakti ja kevyt tapa tulla mukaan tapahtumapäivään.',
      items: [
        'Kompakti ständipaikka',
        'Esittelyyn tai kevyelle myynnille',
        'Nimi mukaan listaukseen',
      ],
      ctaLabel: 'Varaa osasto',
      ctaHref: exhibitorBookingMail,
    },
    {
      title: 'Iso ständi',
      price: '500 €',
      summary: 'Lisää tilaa kohtaamisiin, esittelyyn ja näkyvämpään toteutukseen.',
      items: [
        'Isompi ja näkyvämpi paikka',
        'Tilaa demolle ja myynnille',
        'Nimi mukaan listaukseen',
      ],
      ctaLabel: 'Varaa osasto',
      ctaHref: exhibitorBookingMail,
    },
    {
      title: 'Ständi ja näkyvyys',
      price: '800 €',
      summary: 'Paras vaihtoehto, kun haluat sekä läsnäoloa että ennakkonäkyvyyttä.',
      items: [
        'Hyvä sijainti',
        'Näkyvyys ennakossa ja sivuilla',
        'Ständi ja markkinointituki',
      ],
      ctaLabel: 'Kysy lisää',
      ctaHref: exhibitorBookingMail,
      featured: true,
    },
  ]

  return (
    <>
      <section className="relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <VisualLayer
            fallbackSrc="/images/bikefest-osasto-1.webp"
            alt="BikeFest näytteilleasettajien hero taustakuva"
            className="absolute inset-0 object-cover object-center [filter:saturate(0.9)_contrast(1.05)_brightness(0.82)]"
            priority
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

        <div className="relative z-10 mx-auto max-w-[1280px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-[940px] text-center">
            <div className="mx-auto max-w-[840px]">
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
                <span className="block">Näkyvyyttä</span>
                <span className="block">
                  ja <span className="text-[#FF6A00]">aitoa</span>
                </span>
                <span className="block text-[#FF6A00]">läsnäoloa</span>
              </h1>

              <p className="mx-auto max-w-[760px] text-[1.14rem] leading-[1.62] text-[#B0B0B0] sm:text-[1.22rem]">
                Liity BikeFestin näytteilleasettajiin ja kohtaa yleisö
                ympäristössä, jossa tuotteet, palvelut ja kokemukset tuntuvat
                oikeilta.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href="#paketit" className="btn-primary w-full justify-center sm:w-auto">
                  Tutustu paketteihin
                </a>
                <a href={partnerMail} className="btn-outline w-full justify-center sm:w-auto">
                  Ota yhteyttä
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-[84px]">
        <div className="section-container">
          <div className="mb-12 flex flex-col items-center text-center">
            <h2
              className="text-[clamp(2.9rem,5.6vw,4.8rem)] uppercase leading-[0.95] text-white"
              style={{
                fontFamily: 'var(--font-montserrat), var(--font-anton), Impact, sans-serif',
                letterSpacing: '-0.03em',
              }}
            >
              Miksi BikeFest toimii?
            </h2>
            <div className="mt-4 h-[5px] w-[150px] rounded-full bg-[#FF6A00] shadow-[0_0_24px_rgba(255,106,0,0.35)]" />
          </div>

          <div className="my-[60px] grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-4">
            {benefitCards.map((item) => (
              <div
                key={item.title}
                className="brand-card brand-card-hover group rounded-[6px] px-8 py-12 text-center shadow-[0_14px_34px_rgba(0,0,0,0.32)]"
              >
                <div className="mb-7 flex justify-center">
                  <div className="flex h-[130px] w-[130px] items-center justify-center rounded-full border border-[#FF6A00]/45 bg-[radial-gradient(circle_at_center,rgba(255,106,0,0.13)_0%,rgba(255,106,0,0.05)_38%,rgba(0,0,0,0)_72%)] shadow-[0_0_32px_rgba(255,106,0,0.18)] transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:shadow-[0_0_42px_rgba(255,106,0,0.26)]">
                    <BenefitIcon kind={item.icon} />
                  </div>
                </div>
                <h3
                  className="mb-4 text-[1.52rem] uppercase text-white"
                  style={{
                    fontFamily: 'var(--font-montserrat), var(--font-anton), Impact, sans-serif',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {item.title}
                </h3>
                <p className="text-[1.04rem] leading-[1.72] text-[#B8B8B8]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#050505] py-[84px]">
        <div className="section-container">
          <div className="mb-14 flex flex-col items-center text-center">
            <h2
              className="text-[clamp(2.7rem,5.8vw,4.9rem)] uppercase leading-[0.96] text-white"
              style={{
                fontFamily: 'var(--font-montserrat), var(--font-anton), Impact, sans-serif',
                letterSpacing: '-0.03em',
              }}
            >
              Ketkä tavoitat?
            </h2>
            <div className="mt-4 h-[5px] w-[148px] rounded-full bg-[#FF6A00] shadow-[0_0_24px_rgba(255,106,0,0.42)]" />
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            <TargetCard
              title="Lapsiperheet"
              sanityImage={bikefest?.familyAreaBlock?.familyAreaImage}
              fallbackSrc="/images/lapsiperheet-bikefest.webp"
              alt="Lapsiperheet BikeFestissä"
            />
            <TargetCard
              title="Nuoret & aktiivit"
              sanityImage={bikefest?.skateJamImage}
              fallbackSrc="/images/nuoret-bikefest.webp"
              alt="Nuoret ja aktiivit BikeFestissä"
            />
            <TargetCard
              title="Harrastajat"
              sanityImage={bikefest?.heroImage}
              fallbackSrc="/images/harrastajat-bikefest.webp"
              alt="Harrastajat BikeFestissä"
            />
          </div>
        </div>
      </section>

      <section className="bg-black py-[84px]">
        <div className="section-container" id="paketit">
          <div className="mx-auto mb-14 max-w-[880px] text-center">
            <h2
              className="text-[clamp(2.6rem,5.8vw,4.5rem)] uppercase leading-[0.96] text-white"
              style={{
                fontFamily: 'var(--font-montserrat), var(--font-anton), Impact, sans-serif',
                letterSpacing: '-0.03em',
              }}
            >
              Näytteilleasettajien hinnat
            </h2>
            <p className="mx-auto mt-5 max-w-[760px] text-[1.08rem] leading-[1.7] text-[#B8B8B8] sm:text-[1.16rem]">
              Valitse yrityksellesi sopiva tapa tulla mukaan BikeFestiin. Kaikki
              paikat sovitaan tapahtuman sopiviin toiminta-alueisiin.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-[30px] lg:grid-cols-3">
            {packageCards.map((item) => (
              <div
                key={item.title}
                className={`relative border p-12 text-left ${
                  item.featured
                    ? 'border-[#FF6A00] bg-[#1A1A1A]'
                    : 'border-[#222] bg-[#111]'
                }`}
              >
                {item.featured ? (
                  <div className="absolute right-5 top-5 bg-[#FF6A00] px-3 py-1 text-[0.7rem] font-black uppercase text-white">
                    Suosituin
                  </div>
                ) : null}

                <h3
                  className="max-w-[280px] text-[1.52rem] leading-[1.08] text-white"
                  style={{
                    fontFamily: 'var(--font-montserrat), var(--font-anton), Impact, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0',
                  }}
                >
                  {item.title}
                </h3>

                <div
                  className="my-5 text-[3rem] font-black leading-none text-[#FF6A00]"
                  style={{
                    fontFamily: 'var(--font-montserrat), var(--font-anton), Impact, sans-serif',
                  }}
                >
                  {item.price}
                </div>

                {item.summary ? (
                  <p className="mb-6 text-[1.04rem] leading-[1.72] text-[#D0D0D0]">
                    {item.summary}
                  </p>
                ) : null}

                <ul className="mb-0 space-y-3 text-[#B0B0B0]">
                  {item.items.map((point) => (
                    <li key={point} className="relative pl-5 text-[1.03rem] leading-[1.72] text-white">
                      <span className="absolute left-0 text-[#FF6A00]">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>

                <a
                  href={item.ctaHref}
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-8 py-4 text-center text-sm font-extrabold uppercase tracking-[0.12em] transition duration-300 hover:scale-[1.03] ${
                    item.featured
                      ? 'bg-[linear-gradient(135deg,#ff6a00_0%,#ff8c00_100%)] text-white'
                      : 'border-2 border-white text-white'
                  }`}
                >
                  {item.ctaLabel}
                </a>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-14 max-w-[860px] rounded-[10px] border border-white/10 bg-[linear-gradient(180deg,#1a1a1a_0%,#111111_100%)] px-8 py-10 text-center shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
            <h3
              className="text-[1.9rem] uppercase text-white"
              style={{
                fontFamily: 'var(--font-montserrat), var(--font-anton), Impact, sans-serif',
                letterSpacing: '-0.03em',
              }}
            >
              Varaa osasto
            </h3>
            <p className="mx-auto mt-4 max-w-[620px] text-[1.04rem] leading-[1.7] text-[#C4C4C4]">
              Kysy vapaata paikkaa ja yrityksellesi sopivaa toteutusta.
            </p>
            <div className="mt-6 space-y-2 text-[1.18rem] font-medium text-white">
              <div>info@biketrial.fi</div>
              <div>Mikko Leivo 040 973 2939</div>
            </div>
            <a
              href={exhibitorBookingMail}
              className="btn-primary mt-8 inline-flex items-center justify-center"
            >
              Lähetä sähköpostia
            </a>
          </div>
        </div>
      </section>

      <section className="mt-[84px] bg-[linear-gradient(135deg,#ff6a00_0%,#ff8c00_100%)] px-5 py-[88px] text-center">
        <div className="section-container">
          <h2
            className="mb-3 text-[clamp(2.6rem,6vw,3.5rem)] uppercase text-white"
            style={{
              fontFamily: 'var(--font-montserrat), var(--font-anton), Impact, sans-serif',
              letterSpacing: '-0.03em',
            }}
          >
            Kiinnostaako näkyvyys?
          </h2>
          <p className="mb-10 text-[1.2rem] font-semibold leading-[1.6] text-white/90">
            Ota yhteyttä ja rakennetaan teille sopiva kokonaisuus.
          </p>
          <a
            href={partnerMail}
            className="inline-flex items-center justify-center rounded-full bg-black px-10 py-4 text-sm font-extrabold uppercase tracking-[0.12em] text-white transition duration-300 hover:scale-[1.05]"
          >
            Ota yhteyttä myyntiin
          </a>
        </div>
      </section>
    </>
  )
}
