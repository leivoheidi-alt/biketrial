import type { Metadata } from 'next'
import Image from 'next/image'
import SanityImage from '@/components/ui/SanityImage'
import type { SanityImage as SanityImageType } from '@/types/sanity'
import {
  bikefestSponsorFallbackImages,
  exhibitorReasons,
  getBikefestData,
  resolvePackageTier,
  resolvePublicImage,
  salesHighlights,
  tierConfig,
} from '../_data'

export const metadata: Metadata = {
  title: 'BikeFest Kumppaneille',
  description:
    'BikeFest Kumppaneille: ständipaikat, sponsoripaketit, trial-sektorin mainospaikat ja yhteydenotto.',
}

function SalesImageLayer({
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
          'radial-gradient(circle at 18% 18%, rgba(255,106,0,0.28) 0%, transparent 28%), radial-gradient(circle at 82% 20%, rgba(255,255,255,0.1) 0%, transparent 18%), linear-gradient(145deg, #181818 0%, #090909 68%, #101010 100%)',
      }}
    />
  )
}

export default async function BikefestPartnersPage() {
  const { bikefest, packages, salesEmail } = await getBikefestData()

  const companyIntro =
    bikefest?.companySalesBlock?.intro ??
    'BikeFest tuo Hämeensaareen perheitä, nuoria, harrastajia ja paikallista yleisöä. Yritykselle tämä tarkoittaa näkyvyyttä, aitoja kohtaamisia ja brändiä oikeassa ympäristössä.'

  return (
    <>
      <section className="relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <SalesImageLayer
            sanityImage={bikefest?.heroImage}
            fallbackSrc={bikefestSponsorFallbackImages.heroImage}
            alt="BikeFest kumppanisivun hero"
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
          className="pointer-events-none absolute -top-40 -right-40 h-[620px] w-[620px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #FF6A00 0%, transparent 66%)' }}
        />

        <div className="section-container relative z-10 py-20 sm:py-28">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF6A00]/30 bg-[#FF6A00]/15 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#FF6A00]">
            🏁 {bikefest?.eventLocation ?? 'Hämeensaari, Hämeenlinna'} — {bikefest?.eventDate ?? 'Kesä 2026'}
          </div>
          <div className="eyebrow mb-5">BikeFest / Kumppaneille</div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10 items-end">
            <div>
              <h1
                className="text-[clamp(3rem,9vw,6.5rem)] text-white leading-none mb-6"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
              >
                Näkyvyyttä,<br />
                kohtaamisia ja<br />
                <span className="text-[#FF6A00]">paikka alueella</span>
              </h1>
              <p className="text-[#B3B3B3] text-xl max-w-2xl leading-relaxed mb-10">
                {companyIntro}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={`mailto:${salesEmail}?subject=BikeFest%202026%20-%20St%C3%A4ndipaikka`} className="btn-primary w-full justify-center sm:w-auto">
                  Varaa ständipaikka
                </a>
                <a href={`mailto:${salesEmail}?subject=BikeFest%202026%20-%20Sponsoritarjous`} className="btn-outline w-full justify-center sm:w-auto">
                  Pyydä sponsoritarjous
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-[#2A2A2A] bg-[#111111] p-6 sm:p-7">
              <div className="text-[#FF6A00] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                Yrityksille nopeasti
              </div>
              <div className="space-y-4">
                {[
                  ...salesHighlights,
                  {
                    label: 'Ajankohta',
                    value: `${bikefest?.eventDate ?? 'Kesä 2026'} · ${bikefest?.eventLocation ?? 'Hämeensaari, Hämeenlinna'}`,
                  },
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
          <div className="eyebrow mb-5 text-center">Miksi mukaan?</div>
          <h2
            className="text-[clamp(2.2rem,5vw,4rem)] text-white mb-10 leading-none text-center"
            style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
          >
            Miksi BikeFest on<br />
            <span className="text-[#FF6A00]">yritykselle hyvä paikka</span>
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: 'Näkyvyys',
                desc: 'Brändi näkyy ennakkomarkkinoinnissa, tapahtumapäivässä ja jälkiviestinnässä.',
              },
              {
                title: 'Yleisökontakti',
                desc: 'Ständi ja aktivoinnit tuovat kasvokkain kohtaamisia oikeiden ihmisten kanssa.',
              },
              {
                title: 'Paikallinen aitous',
                desc: 'Mukanaolo tuntuu paikalliselta yhteistyöltä, ei irralliselta mainospinnalta.',
              },
              {
                title: 'Elämyksellinen brändi',
                desc: 'Tapahtumaympäristö tekee näkyvyydestä muistettavaa ja konkreettista.',
              },
            ].map((item, index) => (
              <div key={item.title} className={`rounded-2xl border p-6 ${index === 0 ? 'border-[#FF6A00]/40 bg-[#1A1A1A]' : 'border-[#2A2A2A] bg-black'}`}>
                <div className="text-[#FF6A00] text-[11px] font-bold uppercase tracking-[0.18em] mb-3">
                  0{index + 1}
                </div>
                <div className="text-white font-bold uppercase tracking-wide text-sm mb-2">{item.title}</div>
                <div className="text-[#B3B3B3] text-sm leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-black">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_minmax(0,1fr)] items-start">
            <div>
              <div className="eyebrow mb-5">Kohderyhmät</div>
              <h2
                className="text-[clamp(2rem,5vw,3.5rem)] text-white mb-6 leading-none"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
              >
                Ketä BikeFestissä<br />
                <span className="text-[#FF6A00]">tapaat?</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: 'Perheet', text: 'Koko päivän tapahtumaa etsivät lapsiperheet ja yhdessä liikkuvat aikuiset.' },
                { label: 'Nuoret', text: 'Skate-, BMX- ja tapahtumakulttuurista kiinnostunut yleisö.' },
                { label: 'Harrastajat', text: 'Pyöräilyn, trialin ja skeittauksen aktiivinen yhteisö.' },
                { label: 'Paikallinen yleisö', text: 'Hämeenlinnan seudun kävijät, jotka arvostavat paikallisia tapahtumia.' },
              ].map((item) => (
                <div key={item.label} className="card p-6">
                  <div className="text-[#FF6A00] text-xs font-bold uppercase tracking-[0.2em] mb-3">{item.label}</div>
                  <p className="text-[#B3B3B3] text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#111111]">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.1fr)_380px] lg:gap-10 items-start">
            <div>
              <div className="eyebrow mb-5">Näkyvyysvaihtoehdot</div>
              <h2
                className="text-[clamp(2.2rem,5vw,4rem)] text-white mb-6 leading-none"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
              >
                Kolme tapaa<br />
                <span className="text-[#FF6A00]">olla mukana</span>
              </h2>
              <p className="text-[#B3B3B3] text-lg leading-relaxed max-w-2xl">
                Sivu on rakennettu niin, että voit valita nopeasti sopivan tavan tulla mukaan: laajempi sponsorointi, myyvä ständipaikka tai kilpailualueen trial-sektorin näkyvyys.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {[
                  {
                    title: 'Sponsoripaketit',
                    text: 'Laajempi näkyvyys ennen tapahtumaa, paikan päällä ja jälkisisällöissä.',
                  },
                  {
                    title: 'Ständipaikat',
                    text: 'Suora kontakti kävijöihin, tuotteiden esittely ja kohtaamiset alueella.',
                  },
                  {
                    title: 'Trial-sektorin mainospaikat',
                    text: 'Yrityksen nimi kiinni kilpailun näkyvimmässä suoritusympäristössä.',
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-[#2A2A2A] bg-black p-6">
                    <div className="text-white font-bold text-base mb-2">{item.title}</div>
                    <p className="text-[#B3B3B3] text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-[#2A2A2A]">
              <SalesImageLayer
                sanityImage={bikefest?.companySalesBlock?.sponsorSectionImage}
                fallbackSrc={bikefestSponsorFallbackImages.sponsorSectionImage}
                alt="BikeFest sponsorointi ja yritysnäkyvyys"
                className="absolute inset-0 object-cover object-center opacity-45"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
              <div className="relative z-10 flex h-full flex-col justify-end p-7">
                <div className="text-[#FF6A00] text-xs font-bold uppercase tracking-[0.2em] mb-3">
                  Yrityksille näkyvästi
                </div>
                <div className="text-white font-bold text-xl mb-3">
                  Näy siellä, missä tapahtuma tuntuu
                </div>
                <p className="text-[#D0D0D0] text-sm leading-relaxed">
                  Sponsori- ja ständipaikat toimivat parhaiten silloin, kun brändi on osa itse tapahtumakokemusta eikä vain sen reunalla.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="paketit" className="section-padding bg-black scroll-mt-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_340px] gap-10 items-start mb-16">
            <div>
              <div className="eyebrow mb-5">Sponsoripaketit</div>
              <h2
                className="text-[clamp(2.2rem,5vw,4rem)] text-white mb-6 leading-none"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
              >
                Valitse paketti,<br />
                joka sopii<br />
                <span className="text-[#FF6A00]">tavoitteeseesi</span>
              </h2>
              <p className="text-[#B3B3B3] text-lg leading-relaxed">
                Jos pakettidata löytyy Sanitysta, sivu käyttää sitä suoraan. Erot tasojen välillä näkyvät selkeästi hinnassa, hyödyissä ja paikkamäärissä.
              </p>
            </div>

            <div className="rounded-2xl border border-[#FF6A00]/25 bg-[#1A1A1A] p-6">
              <div className="text-[#FF6A00] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                Mikä erottaa tasot?
              </div>
              <div className="space-y-4">
                {exhibitorReasons.map((item) => (
                  <div key={item.title}>
                    <div className="text-white font-bold text-sm mb-1">{item.title}</div>
                    <div className="text-[#B3B3B3] text-sm leading-relaxed">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg, index) => {
              const tier = resolvePackageTier(pkg)
              const cfg = tierConfig[tier] ?? tierConfig.silver

              return (
                <div
                  key={`${pkg.name}-${index}`}
                  className={`relative flex flex-col rounded-2xl border-2 ${cfg.borderColor} bg-[#1A1A1A] p-6`}
                >
                  {pkg.highlighted && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#FF6A00] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white whitespace-nowrap">
                      Suosituin
                    </div>
                  )}

                  <span className={`self-start rounded-full px-3 py-1 text-[10px] font-bold mb-4 ${cfg.badgeClass}`}>
                    {cfg.badgeLabel}
                  </span>

                  {pkg.availableSlots && (
                    <div className="text-[#B3B3B3] text-[10px] uppercase tracking-wider mb-1.5">
                      {pkg.availableSlots === 1 ? '1 paikka' : `Max. ${pkg.availableSlots} paikkaa`}
                    </div>
                  )}

                  <h3 className="text-white font-bold text-base mb-1">{pkg.name}</h3>
                  <div
                    className="text-2xl font-bold mb-2"
                    style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', color: '#FF6A00' }}
                  >
                    {pkg.price}
                  </div>
                  {pkg.tagline && <p className="text-[#B3B3B3] text-xs italic mb-3">{pkg.tagline}</p>}
                  <p className="text-[#B3B3B3] text-sm leading-relaxed mb-5 flex-grow">{pkg.shortDescription}</p>

                  <ul className="flex flex-col gap-2 mb-6">
                    {pkg.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-xs text-[#B3B3B3]">
                        <span className="mt-0.5 flex-shrink-0 font-bold text-[#FF6A00]">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <a href="#yhteys" className={`${cfg.btnClass} text-center text-xs`}>
                    {pkg.ctaLabel}
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="sektorit" className="section-padding bg-[#111111] scroll-mt-20">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
            <div className="rounded-2xl border border-[#FF6A00]/30 bg-[#1A1A1A] p-8">
              <div className="text-[#FF6A00] font-bold uppercase tracking-wide text-sm mb-3">
                Trial-sektorin mainospaikat
              </div>
              <h2
                className="text-[clamp(2rem,5vw,3.4rem)] text-white leading-none mb-5"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
              >
                Nimeä oma jakso<br />
                <span className="text-[#FF6A00]">SM-Cupissa</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: 'Mitä tämä on?',
                    text: 'Yrityksen nimi sidotaan kilpailun yksittäiseen trial-sektoriin tai estekokonaisuuteen.',
                  },
                  {
                    title: 'Miksi tämä toimii?',
                    text: 'Katse kohdistuu sektoreihin koko kilpailun ajan, joten näkyvyys on suoraan kiinni itse lajissa.',
                  },
                  {
                    title: 'Miksi ajoissa?',
                    text: 'Näkyvimmät jaksot ja parhaat sijoittelut menevät ensin, joten päätös kannattaa tehdä varhain.',
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-white/10 bg-black p-5">
                    <div className="text-white font-bold text-sm mb-2">{item.title}</div>
                    <p className="text-[#B3B3B3] text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#2A2A2A] bg-black p-6">
              <div className="text-[#FF6A00] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                Sopii hyvin kun
              </div>
              <div className="space-y-4">
                {[
                  'haluat näkyä suoraan kilpailun ytimessä',
                  'etsit kustannustehokasta mutta tunnistettavaa ratkaisua',
                  'haluat maininnan kuulutuksissa ja sektorin nimeämisen ympärille sisältöä',
                ].map((item) => (
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

      <section id="standit" className="section-padding bg-black scroll-mt-20">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.05fr)_380px] lg:gap-10 items-start">
            <div>
              <div className="eyebrow mb-5">Ständipaikat</div>
              <h2
                className="text-[clamp(2rem,5vw,3.5rem)] text-white mb-6 leading-none"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
              >
                Ständi on myyntiä,<br />
                ei vain<br />
                <span className="text-[#FF6A00]">näkyvyyttä</span>
              </h2>
              <p className="text-[#B3B3B3] text-lg leading-relaxed mb-8 max-w-2xl">
                Ständipaketti sopii yritykselle, joka haluaa esitellä tuotteita, tavata kävijöitä ja tehdä läsnäolostaan konkreettista tapahtumapäivänä.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: 'Mitä ständi sisältää?',
                    text: 'Paikan tapahtuma-alueella, yrityksen näkyvyyden tapahtumaviestinnässä ja mahdollisuuden kohdata yleisöä koko päivän.',
                  },
                  {
                    title: 'Kenelle tämä sopii?',
                    text: 'Paikallisille yrityksille, urheilubrändeille, palveluntarjoajille ja toimijoille, joille kasvokkainen kontakti on tärkeä.',
                  },
                  {
                    title: 'Miksi varata ajoissa?',
                    text: 'Näkyvimmät paikat ja toimivimmat virrat yleisön keskellä varataan ensin.',
                  },
                ].map((item) => (
                  <div key={item.title} className="card p-6">
                    <div className="text-white font-bold text-sm mb-2">{item.title}</div>
                    <p className="text-[#B3B3B3] text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#2A2A2A] bg-[#111111] p-6">
              <div className="text-[#FF6A00] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                Miksi ständi toimii?
              </div>
              <div className="space-y-4">
                {exhibitorReasons.map((item) => (
                  <div key={item.title} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                    <div className="text-white font-bold text-sm mb-1">{item.title}</div>
                    <div className="text-[#B3B3B3] text-sm leading-relaxed">{item.description}</div>
                  </div>
                ))}
              </div>
              <a href={`mailto:${salesEmail}?subject=BikeFest%202026%20-%20St%C3%A4ndipaikka`} className="btn-primary mt-6 w-full justify-center text-xs">
                Kysy vapaat ständipaikat
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#111111]">
        <div className="section-container">
          <div className="rounded-2xl border border-[#FF6A00]/35 bg-[#FF6A00]/10 p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-8 items-center">
              <div>
                <div className="text-[#FF6A00] text-xs font-bold uppercase tracking-[0.2em] mb-3">
                  Rajallinen määrä
                </div>
                <h2
                  className="text-[clamp(2rem,5vw,3.3rem)] text-white leading-none mb-4"
                  style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
                >
                  Näkyvimmät paikat<br />
                  <span className="text-[#FF6A00]">varataan ensin</span>
                </h2>
                <p className="text-[#D0D0D0] text-base leading-relaxed max-w-2xl">
                  Pääyhteistyö, parhaat ständisijainnit ja kilpailun näkyvimmät trial-sektorit ovat rajallisia. Kun ne on varattu, samantasoinen näkyvyys ei enää ole saatavilla.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black p-6">
                <div className="text-white font-bold text-lg mb-2">Suositus</div>
                <p className="text-[#B3B3B3] text-sm leading-relaxed mb-5">
                  Jos harkitset näkyvyyttä BikeFestissä, kannattaa kysyä vapaat vaihtoehdot nyt eikä vasta ohjelman julkaisun jälkeen.
                </p>
                <a href={`mailto:${salesEmail}?subject=BikeFest%202026%20-%20Vapaat%20n%C3%A4kyvyysratkaisut`} className="btn-primary w-full justify-center text-xs">
                  Kysy vapaat ratkaisut
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="yhteys" className="section-padding bg-[#FF6A00] scroll-mt-20">
        <div className="section-container max-w-2xl text-center">
          <h2
            className="text-[clamp(2.5rem,6vw,4rem)] text-white leading-none mb-5"
            style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
          >
            {bikefest?.contactCta?.title ?? 'Kiinnostuitko? Ota yhteyttä.'}
          </h2>
          <p className="text-white/85 text-lg mb-10 leading-relaxed">
            {bikefest?.contactCta?.text ??
              'Kerro, kiinnostaako ständipaikka, sponsoripaketti tai trial-sektorin mainospaikka. Vastaamme nopeasti ja kerromme, mitä on vielä vapaana.'}
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={`mailto:${salesEmail}?subject=BikeFest%202026%20-%20St%C3%A4ndipaikka`}
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-black px-9 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#111111] sm:w-auto"
            >
              Varaa ständipaikka
            </a>
            <a
              href={`mailto:${salesEmail}?subject=BikeFest%202026%20-%20Sponsoritarjous`}
              className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-black px-9 py-4 text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-white/10 sm:w-auto"
            >
              Pyydä sponsoritarjous
            </a>
          </div>
          <div className="mt-6">
            <a href={`mailto:${salesEmail}`} className="text-sm text-white/75 transition-colors hover:text-white">
              {salesEmail}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
