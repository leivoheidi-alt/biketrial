import type { Metadata } from 'next'
import Image from 'next/image'
import SanityImage from '@/components/ui/SanityImage'
import {
  bikefestVisitorFallbackImages,
  catLabel,
  catStyle,
  fallbackCompetitorInfo,
  getBikefestData,
  resolvePublicImage,
} from '../_data'

export const metadata: Metadata = {
  title: 'BikeFest Kilpailijoille',
  description:
    'BikeFest Kilpailijoille: kilpailuinfo, kilpailukutsu, ilmoittautuneet, tulokset, aikataulu, saapuminen ja yhteystiedot.',
}

function CompetitorImageLayer({
  sanityImage,
  fallbackSrc,
  alt,
  className,
  priority = false,
}: {
  sanityImage?: { asset?: { _ref: string; _type: 'reference' } }
  fallbackSrc: string
  alt: string
  className: string
  priority?: boolean
}) {
  if (sanityImage?.asset) {
    return (
      <SanityImage
        image={sanityImage as any}
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
          'radial-gradient(circle at 18% 18%, rgba(255,106,0,0.3) 0%, transparent 28%), radial-gradient(circle at 82% 20%, rgba(255,255,255,0.1) 0%, transparent 18%), linear-gradient(145deg, #181818 0%, #090909 68%, #101010 100%)',
      }}
    />
  )
}

export default async function BikefestCompetitorsPage() {
  const { bikefest, program } = await getBikefestData()

  const competitorInfo = bikefest?.competitorInfoBlock ?? fallbackCompetitorInfo
  const contactEmail =
    competitorInfo.contact?.email ?? bikefest?.contactCta?.email ?? fallbackCompetitorInfo.contact.email
  const contactPhone = competitorInfo.contact?.phone
  const contactName = competitorInfo.contact?.name ?? fallbackCompetitorInfo.contact.name

  const quickActions = [
    {
      id: 'kilpailukutsu',
      label: 'Kilpailukutsu',
      href: competitorInfo.kilpailukutsuUrl || '#kilpailukutsu',
    },
    {
      id: 'ilmoittautuneet',
      label: 'Ilmoittautuneet',
      href: competitorInfo.ilmoittautuneetUrl || '#ilmoittautuneet',
    },
    {
      id: 'tulokset',
      label: 'Tulokset',
      href: competitorInfo.tuloksetUrl || '#tulokset',
    },
  ]

  return (
    <>
      <section className="relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <CompetitorImageLayer
            sanityImage={bikefest?.heroImage}
            fallbackSrc={bikefestVisitorFallbackImages.heroImage}
            alt="BikeFest kilpailijasivun hero"
            className="absolute inset-0 object-cover object-center opacity-20"
            priority
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.84) 48%, rgba(0,0,0,0.92) 100%)',
            }}
          />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 h-[560px] w-[560px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #FF6A00 0%, transparent 70%)' }}
        />

        <div className="section-container relative z-10 py-20 sm:py-28">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF6A00]/30 bg-[#FF6A00]/15 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#FF6A00]">
            🏁 {bikefest?.eventLocation ?? 'Hämeensaari, Hämeenlinna'} — {bikefest?.eventDate ?? 'Kesä 2026'}
          </div>
          <div className="eyebrow mb-5">BikeFest / Kilpailijoille</div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 items-end">
            <div>
              <h1
                className="text-[clamp(3rem,9vw,6.5rem)] text-white leading-none mb-6"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
              >
                {competitorInfo.heroTitle ?? fallbackCompetitorInfo.heroTitle}
              </h1>
              <p className="text-[#B3B3B3] text-xl max-w-2xl leading-relaxed mb-8">
                {competitorInfo.intro ?? fallbackCompetitorInfo.intro}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {quickActions.map((item) => {
                  const external = item.href.startsWith('http')
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      className={`${item.id === 'kilpailukutsu' ? 'btn-primary' : 'btn-outline'} w-full justify-center sm:w-auto`}
                    >
                      {item.label}
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-[#2A2A2A] bg-[#111111] p-6 sm:p-7">
              <div className="text-[#FF6A00] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                Kisainfo nopeasti
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Päivä', value: bikefest?.eventDate ?? 'Kesä 2026' },
                  { label: 'Paikka', value: bikefest?.eventLocation ?? 'Hämeensaari, Hämeenlinna' },
                  { label: 'Kilpailu', value: competitorInfo.competitionName ?? fallbackCompetitorInfo.competitionName },
                ].map((item) => (
                  <div key={item.label} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                    <div className="text-white text-xs font-bold uppercase tracking-widest mb-1.5">{item.label}</div>
                    <div className="text-[#B3B3B3] text-sm leading-relaxed">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#111111]">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {quickActions.map((item) => {
              const external = item.href.startsWith('http')
              const noteMap: Record<string, string> = {
                kilpailukutsu: 'Viralliset luokat, säännöt, tarkemmat kisapäivän ohjeet ja käytännöt.',
                ilmoittautuneet: 'Tarkista, että nimesi löytyy listalta ja että ilmoittautuminen on varmasti kunnossa.',
                tulokset: 'Tulokset julkaistaan kilpailupäivän jälkeen samaan paikkaan heti vahvistuksen jälkeen.',
              }

              return (
                <section key={item.id} id={item.id} className="card p-6 scroll-mt-24">
                  <div className="text-[#FF6A00] text-xs font-bold uppercase tracking-[0.2em] mb-3">{item.label}</div>
                  <div className="text-white font-bold text-lg mb-2">{noteMap[item.id]}</div>
                  <a
                    href={item.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                    className="btn-outline mt-4 inline-flex w-full justify-center text-xs sm:w-auto"
                  >
                    Avaa {item.label.toLowerCase()}
                  </a>
                </section>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-black">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_320px] gap-10 items-start">
            <div>
              <div className="eyebrow mb-5">Kilpailun perusteet</div>
              <h2
                className="text-[clamp(2.2rem,5vw,4rem)] text-white mb-6 leading-none"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
              >
                Kaikki tärkein<br />
                <span className="text-[#FF6A00]">yhdellä silmäyksellä</span>
              </h2>
              <p className="text-[#B3B3B3] text-lg leading-relaxed max-w-2xl">
                Tämä sivu kokoaa kilpailijan kannalta olennaiset asiat yhteen paikkaan: mitä ajetaan, missä kisataan ja mitä pitää tarkistaa ennen paikalle saapumista.
              </p>
            </div>

            <div className="rounded-2xl border border-[#2A2A2A] bg-[#111111] p-6">
              <div className="text-[#FF6A00] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                Kenelle kilpailu on?
              </div>
              <p className="text-[#B3B3B3] text-sm leading-relaxed">
                {competitorInfo.whoIsItFor ?? fallbackCompetitorInfo.whoIsItFor}
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                title: 'Mikä kilpailu?',
                text: competitorInfo.competitionName ?? fallbackCompetitorInfo.competitionName,
              },
              {
                title: 'Missä?',
                text: bikefest?.eventLocation ?? 'Hämeensaari, Hämeenlinna',
              },
              {
                title: 'Kenelle?',
                text: competitorInfo.whoIsItFor ?? fallbackCompetitorInfo.whoIsItFor,
              },
            ].map((item) => (
              <div key={item.title} className="card p-6">
                <div className="text-[#FF6A00] text-xs font-bold uppercase tracking-[0.2em] mb-3">{item.title}</div>
                <p className="text-[#B3B3B3] text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#111111]">
        <div className="section-container">
          <div className="eyebrow mb-5">Aikataulu</div>
          <h2
            className="text-[clamp(2.2rem,5vw,4rem)] text-white mb-10 leading-none"
            style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
          >
            Kilpailupäivän<br />
            <span className="text-[#FF6A00]">aikataulu</span>
          </h2>

          <div className="max-w-4xl flex flex-col gap-3">
            {program.map((item, index) => (
              <div
                key={`${item.time}-${index}`}
                className={`rounded-xl px-5 py-4 ${
                  item.featured ? 'bg-[#1A1A1A] border-l-4 border-[#FF6A00]' : 'bg-black border border-[#2A2A2A]'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 flex-shrink-0 pt-0.5 text-sm font-bold tabular-nums text-[#FF6A00]">
                    {item.time}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-white font-bold text-sm">{item.title}</span>
                      {item.category && (
                        <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${catStyle[item.category] ?? 'bg-[#2A2A2A] text-[#B3B3B3]'}`}>
                          {catLabel[item.category] ?? item.category}
                        </span>
                      )}
                    </div>
                    {item.description && <p className="text-[#B3B3B3] text-xs leading-relaxed">{item.description}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-black">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10 items-start">
            <div>
              <div className="eyebrow mb-5">Luokat ja osallistuminen</div>
              <h2
                className="text-[clamp(2rem,5vw,3.5rem)] text-white mb-6 leading-none"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
              >
                Luokat ja<br />
                <span className="text-[#FF6A00]">osallistumisinfo</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(competitorInfo.classes?.length ? competitorInfo.classes : fallbackCompetitorInfo.classes).map((item) => (
                  <div key={item.title} className="card p-6">
                    <div className="text-white font-bold text-sm uppercase tracking-wide mb-2">{item.title}</div>
                    <div className="text-[#B3B3B3] text-sm leading-relaxed">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#2A2A2A] bg-[#111111] p-6">
              <div className="text-[#FF6A00] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                Osallistumisinfo
              </div>
              <div className="space-y-4">
                {(competitorInfo.participationNotes?.length
                  ? competitorInfo.participationNotes
                  : fallbackCompetitorInfo.participationNotes).map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 text-[#FF6A00]">▸</span>
                    <p className="text-[#B3B3B3] text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#111111]">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="eyebrow mb-5">Saapuminen ja sijainti</div>
              <h2
                className="text-[clamp(2rem,5vw,3.5rem)] text-white mb-6 leading-none"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
              >
                Hämeensaari,<br />
                <span className="text-[#FF6A00]">Hämeenlinna</span>
              </h2>
              <p className="text-[#B3B3B3] text-lg leading-relaxed max-w-2xl">
                Kilpailu ajetaan alueella {bikefest?.eventLocation ?? 'Hämeensaari, Hämeenlinna'}. Käytännön ajo-, huoltoalue- ja pysäköintiohjeet löytyvät kilpailukutsusta, mutta perusasiat on koottu myös tähän.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {(competitorInfo.arrivalNotes?.length ? competitorInfo.arrivalNotes : fallbackCompetitorInfo.arrivalNotes).map((item, index) => (
                <div key={`${item}-${index}`} className="card p-5 flex items-start gap-4">
                  <span className="text-xl flex-shrink-0">{index === 0 ? '📍' : index === 1 ? '🧭' : '⏰'}</span>
                  <div>
                    <div className="text-white font-bold text-sm mb-0.5">
                      {index === 0 ? 'Kilpailupaikka' : index === 1 ? 'Saapuminen' : 'Paikalle ajoissa'}
                    </div>
                    <div className="text-[#B3B3B3] text-xs leading-relaxed">{item}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-black">
        <div className="section-container">
          <div className="rounded-2xl border border-[#FF6A00]/35 bg-[#FF6A00]/10 p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 items-start">
              <div>
                <div className="text-[#FF6A00] text-xs font-bold uppercase tracking-[0.2em] mb-3">
                  Kilpailijan muistilista
                </div>
                <h2
                  className="text-[clamp(2rem,5vw,3.3rem)] text-white leading-none mb-4"
                  style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
                >
                  Tarkista nämä<br />
                  <span className="text-[#FF6A00]">ennen kisapäivää</span>
                </h2>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111111] p-6">
                <div className="space-y-3">
                  {(competitorInfo.checklist?.length ? competitorInfo.checklist : fallbackCompetitorInfo.checklist).map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 text-[#FF6A00]">✓</span>
                      <p className="text-[#D0D0D0] text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#FF6A00]">
        <div className="section-container max-w-2xl text-center">
          <h2
            className="text-[clamp(2.5rem,6vw,4rem)] text-white leading-none mb-5"
            style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
          >
            Kilpailuinfo ja<br />
            yhteystiedot
          </h2>
          <p className="text-white/85 text-lg mb-8 leading-relaxed">
            Jos tarvitset lisätietoja kilpailusta, ilmoittautumisesta tai kisapäivän käytännöistä, ota yhteyttä vastuuhenkilöön.
          </p>

          <div className="rounded-2xl border border-black/20 bg-black p-8 text-left">
            <div className="text-[#FF6A00] text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Yhteyshenkilö
            </div>
            <div className="text-white font-bold text-xl mb-2">{contactName}</div>
            <div className="flex flex-col gap-2 text-sm">
              <a href={`mailto:${contactEmail}`} className="text-white/80 transition-colors hover:text-white">
                {contactEmail}
              </a>
              {contactPhone ? <div className="text-white/80">{contactPhone}</div> : null}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
