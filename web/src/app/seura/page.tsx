import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/lib/sanity'
import { clubPageQuery, activeCourseQuery } from '@/lib/queries'
import type { ClubPageData, BeginnerCourseRef } from '@/types/sanity'
import PortableTextRenderer from '@/components/ui/PortableText'

export const metadata: Metadata = {
  title: 'Biketrial-seura Hämeenlinna',
  description:
    'Polkupyörätrial kehittää tasapainoa, rohkeutta ja ketteryyttä. Alkeiskurssi alkaa torstaina 7.5 klo 17.30 — liity mukaan.',
  keywords: ['polkupyörätrial', 'biketrial seura', 'alkeiskurssi Hämeenlinna', 'trial lapset'],
}

const fallbackCourse: BeginnerCourseRef = {
  title: 'Biketrial-alkeiskurssi',
  startDateText: 'Torstaina 7.5.2026 klo 17.30',
  weekday: 'Torstai',
  time: '17.30',
  location: 'Hämeenlinna',
  ageRange: '6–16 v. — myös aikuiset tervetulleita',
  price: 'Ensimmäinen kerta ilmainen',
  signupCta: { label: 'Ilmoittaudu mukaan', email: 'info@biketrial.fi' },
  isActive: true,
}

const defaultSkills = [
  { icon: '⚖️', skill: 'Tasapaino', description: 'Kehon hallinta kehittyy jokaisessa harjoituksessa' },
  { icon: '🎯', skill: 'Tarkkuus', description: 'Senttien tarkkuudella pyörällä liikkuminen' },
  { icon: '💪', skill: 'Fyysinen kunto', description: 'Koko kehon lihasvoima ja koordinaatio' },
  { icon: '🧠', skill: 'Rohkeus', description: 'Haasteiden voittaminen kasvattaa itseluottamusta' },
  { icon: '🚴', skill: 'Pyörätaidot', description: 'Maailman parhaat kaksipyöräiset refleksit' },
  { icon: '👥', skill: 'Yhteisö', description: 'Kannustava ryhmä, oma tahti' },
]

const defaultFaq = [
  { question: 'Minkä ikäiset voivat aloittaa?', answer: 'Noin 6-vuotiaasta ylöspäin. Myös aikuiset aloittelijat sopivat — seurassa on kaikenikäisiä.' },
  { question: 'Tarvitaanko erityinen pyörä?', answer: 'Ei. Alkeiskurssille voi tulla omalla pyörällä. Trial-pyörä on kapeampi ja kevyempi, mutta se ei ole edellytys aloittamiselle.' },
  { question: 'Onko laji vaarallinen?', answer: 'Harjoittelu on ohjattua ja etenee taitojen mukaan. Alkuvaiheessa tehdään pieniä juttuja — rohkeus kasvaa omassa tahdissa.' },
  { question: 'Mitä maksaa?', answer: 'Ensimmäinen kerta on ilmainen. Seuran jäsenmaksu on edullinen ja sisältää kaikki ohjatut harjoitukset.' },
  { question: 'Milloin ja missä harjoitellaan?', answer: 'Säännöllisesti viikoittain. Alkeiskurssi alkaa torstaisin klo 17.30. Tarkempi sijainti kerrotaan ilmoittautumisen yhteydessä.' },
]

const quickFacts = [
  { label: 'Aloittelijalle sopii', value: 'Et tarvitse aiempaa trial-kokemusta' },
  { label: 'Ikä', value: 'Noin 6-vuotiaasta ylöspäin' },
  { label: 'Kynnys', value: 'Ensimmäinen kerta on maksuton' },
]

const gettingStartedSteps = [
  {
    step: '1',
    title: 'Ota yhteyttä',
    description: 'Lähetä lyhyt viesti, niin kerromme seuraavan alkeiskurssin tai harjoituksen käytännöt.',
  },
  {
    step: '2',
    title: 'Tule paikalle omalla pyörällä',
    description: 'Trial-pyörää ei tarvita alkuun. Tavallinen toimiva pyörä ja mukavat vaatteet riittävät.',
  },
  {
    step: '3',
    title: 'Aloita rauhassa ohjatusti',
    description: 'Ensimmäisellä kerralla opetellaan perusasiat turvallisesti ja oman tason mukaan.',
  },
]

export default async function SeuraPage() {
  const [clubPage, activeCourse] = await Promise.all([
    client.fetch<ClubPageData | null>(clubPageQuery).catch(() => null),
    client.fetch<BeginnerCourseRef | null>(activeCourseQuery).catch(() => null),
  ])

  const course = activeCourse ?? clubPage?.beginnerCourseRef ?? fallbackCourse
  const skills = clubPage?.whatDoYouLearn?.length ? clubPage.whatDoYouLearn : defaultSkills
  const faqs = clubPage?.faqItems?.length ? clubPage.faqItems : defaultFaq
  const joinEmail = course.signupCta?.email ?? clubPage?.contactBlock?.email ?? 'info@biketrial.fi'

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-black overflow-hidden">
        {/* Orange glow bottom-right */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #FF6A00 0%, transparent 70%)' }}
        />

        <div className="section-container relative z-10 py-20 sm:py-28 lg:py-32">
          <Link href="/" className="eyebrow flex items-center gap-2 mb-8 hover:text-white transition-colors">
            ← Etusivu
          </Link>

          <div className="eyebrow mb-4">Biketrial-seura Hämeenlinna</div>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 items-end">
            <div>
              <h1
                className="text-[clamp(3rem,9vw,6.5rem)] text-white mb-6 leading-none"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
              >
                {clubPage?.heroTitle ?? (
                  <>
                    Mikä on<br />
                    <span className="text-[#FF6A00]">polkupyörätrial?</span>
                  </>
                )}
              </h1>
              <p className="text-[#B3B3B3] text-xl max-w-2xl leading-relaxed mb-8">
                {clubPage?.heroText ??
                  'Laji, jossa selvitään haastavan radan yli koskettamatta jaloilla maahan. Tasapaino, rohkeus ja pyörätaidot kehittyvät nopeasti, mutta alkuun pääsee matalalla kynnyksellä.'}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#aloita" className="btn-primary">
                  Aloita harrastus
                </a>
                <a href="#kurssi" className="btn-outline">
                  Katso alkeiskurssi
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-[#2A2A2A] bg-[#111111] p-5 sm:p-6">
              <div className="text-[#FF6A00] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                Nopea yhteenveto
              </div>
              <div className="space-y-4">
                {quickFacts.map((item) => (
                  <div key={item.label} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                    <div className="text-white text-xs font-bold uppercase tracking-widest mb-1.5">
                      {item.label}
                    </div>
                    <div className="text-[#B3B3B3] text-sm leading-relaxed">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MITÄ ON BIKETRIAL ── */}
      <section className="section-padding bg-[#111111]">
        <div className="section-container max-w-4xl">
          <div className="eyebrow mb-5">Laji</div>
          <h2
            className="text-[clamp(2rem,5vw,3.5rem)] text-white mb-8 leading-none"
            style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
          >
            Tasapaino, tarkkuus<br />ja hieman hulluutta
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_320px] gap-10 items-start">
            <div>
              {clubPage?.whatIsBiketrial ? (
                <PortableTextRenderer value={clubPage.whatIsBiketrial} />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-[#B3B3B3] text-lg leading-relaxed">
                  <p>
                    Polkupyörätrial on pyöräilylaji, jossa selvitään määritelty rata yli
                    ilman jalkojen maahan laskemista. Rata koostuu kiviesteistä, puupukeista
                    ja muista luovista esteistä, jotka ratkaistaan pyörää hallitsemalla.
                  </p>
                  <p>
                    Hämeenlinnassa lajia harrastetaan kaikenikäisistä: pienimmistä lapsista
                    aikuisiin. Tunnelma on kannustava, eteneminen oman tason mukaista
                    ja kehitys näkyy nopeasti.
                  </p>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-[#2A2A2A] bg-black p-6">
              <div className="eyebrow mb-4">Lajissa tapahtuu</div>
              <div className="space-y-4">
                {[
                  'Ajetaan esteiden yli ilman jalkojen maahan laittamista.',
                  'Harjoitellaan kehonhallintaa, jarrutusta, ponnistuksia ja tarkkuutta.',
                  'Edetään pienistä onnistumisista kohti näyttävämpiä suorituksia.',
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

      {/* ── KENELLE SOPII ── */}
      <section className="section-padding bg-black">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <div className="eyebrow mb-5">Kenelle sopii?</div>
              <h2
                className="text-[clamp(2rem,5vw,3.5rem)] text-white mb-6 leading-none"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
              >
                Käytännössä<br />
                <span className="text-[#FF6A00]">kaikille</span>
              </h2>
              {clubPage?.whoIsItFor ? (
                <PortableTextRenderer value={clubPage.whoIsItFor} />
              ) : (
                <p className="text-[#B3B3B3] text-lg leading-relaxed">
                  Biketrial ei vaadi tiettyä ikää, fysiikkaa tai aiempaa kokemusta.
                  Harjoittelu etenee jokaisen omalla tasolla. Seurassa on lapsia, nuoria
                  ja aikuisia — monet vanhemmat aloittavat lapsen mukana ja jäävät itse koukkuun.
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: '🧒', label: 'Lapset 6–12 v.', desc: 'Tasapaino ja hienomotoriikka kehittyvät nopeasti' },
                { icon: '🧑', label: 'Nuoret 13–18 v.', desc: 'Tekniikka, kilpailumotivaatio ja kaveriyhteisö' },
                { icon: '🧑‍🦱', label: 'Aikuiset', desc: 'Haastava harrastus myös kokeneillekin' },
                { icon: '👨‍👩‍👧', label: 'Perheet', desc: 'Treenataan yhdessä — myös vanhemmat aloittavat' },
              ].map((item) => (
                <div key={item.label} className="card-hover p-5">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <div className="text-white font-bold text-sm uppercase tracking-wide mb-1">{item.label}</div>
                  <div className="text-[#B3B3B3] text-xs leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MITÄ OPITAAN ── */}
      <section className="section-padding bg-[#111111]">
        <div className="section-container">
          <div className="eyebrow mb-5 text-center">Mitä harjoituksissa opitaan?</div>
          <h2
            className="text-[clamp(2rem,5vw,3.5rem)] text-white mb-10 leading-none text-center"
            style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
          >
            Paljon enemmän<br />kuin pyöräilemistä
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {skills.map((item) => (
              <div key={item.skill} className="bg-black border border-[#2A2A2A] hover:border-[#FF6A00]/40 rounded-xl p-5 text-center transition-colors group">
                <div className="text-3xl mb-3">{item.icon ?? '✅'}</div>
                <div className="text-white font-bold text-xs uppercase tracking-wide mb-1.5 group-hover:text-[#FF6A00] transition-colors">
                  {item.skill}
                </div>
                <div className="text-[#B3B3B3] text-[10px] leading-snug hidden sm:block">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MITEN ALOITAT ── */}
      <section id="aloita" className="section-padding bg-black scroll-mt-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_1.15fr] gap-12 items-start">
            <div>
              <div className="eyebrow mb-5">Miten mukaan?</div>
              <h2
                className="text-[clamp(2rem,5vw,3.5rem)] text-white mb-6 leading-none"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
              >
                Aloitus on tehty<br />
                <span className="text-[#FF6A00]">helpoksi</span>
              </h2>
              {clubPage?.howToJoin ? (
                <PortableTextRenderer value={clubPage.howToJoin} />
              ) : (
                <p className="text-[#B3B3B3] text-lg leading-relaxed">
                  Helpoin tapa aloittaa on tulla mukaan alkeiskurssille. Et tarvitse aiempaa kokemusta,
                  trial-pyörää tai erikoisvarusteita. Ilmoittaudu viestillä etukäteen, niin odotamme sinut paikalle.
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {gettingStartedSteps.map((item) => (
                <div key={item.step} className="card-hover p-5 sm:p-6">
                  <div className="text-[#FF6A00] text-xs font-bold uppercase tracking-[0.2em] mb-3">
                    Vaihe {item.step}
                  </div>
                  <h3 className="text-white text-lg mb-2 leading-tight">{item.title}</h3>
                  <p className="text-[#B3B3B3] text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          ALKEISKURSSI — iso, orange, ei voi jäädä huomaamatta
      ════════════════════════════════════════════════════════ */}
      <section id="kurssi" className="bg-[#FF6A00] scroll-mt-20">
        <div className="section-container py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-white/70 text-xs font-bold uppercase tracking-[0.2em] mb-5">
                Seuraava alkeiskurssi
              </div>
              <h2
                className="text-[clamp(2.5rem,7vw,5rem)] text-white leading-none mb-6"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
              >
                {course.startDateText ?? 'Torstaina 7.5 klo 17.30'}
              </h2>

              <p className="text-white/90 text-lg leading-relaxed mb-6 max-w-xl">
                Ensimmäinen kerta on tarkoitettu nimenomaan aloittelijoille. Tavoite ei ole näyttää valmiilta trialistilta,
                vaan päästä turvallisesti kiinni lajiin ja huomata heti, miksi tämä koukuttaa.
              </p>

              <div className="flex flex-col gap-2.5 text-white/80 text-base mb-8">
                {course.location && (
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">📍</span>
                    <span className="font-medium">
                      {course.location}{course.locationDetail ? ` — ${course.locationDetail}` : ''}
                    </span>
                  </div>
                )}
                {course.ageRange && (
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">👶</span>
                    <span>{course.ageRange}</span>
                  </div>
                )}
                {course.price && (
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">💰</span>
                    <span className="font-bold">{course.price}</span>
                  </div>
                )}
              </div>

              <a
                href={`mailto:${joinEmail}`}
                className="inline-flex items-center gap-3 bg-black text-white font-bold text-sm uppercase tracking-widest px-7 py-3.5 rounded-full hover:bg-[#111111] transition-colors"
              >
                {course.signupCta?.label ?? 'Ilmoittaudu mukaan'}
                <span>→</span>
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">
                Ensimmäiselle kerralle
              </div>
              {[
                { icon: '🚲', title: 'Toimiva pyörä', desc: 'Tavallinen pyörä riittää alkuun hyvin' },
                { icon: '🪖', title: 'Kypärä ja mukavat vaatteet', desc: 'Rennot ulkovaatteet ja liikkumiseen sopivat kengät' },
                { icon: '📩', title: 'Ilmoittautuminen etukäteen', desc: 'Lähetä viesti, niin tiedät minne tulla ja mitä odottaa' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 bg-black/20 rounded-xl px-5 py-4">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="text-white font-bold text-sm">{item.title}</div>
                    <div className="text-white/70 text-xs mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-padding bg-[#111111]">
        <div className="section-container max-w-3xl">
          <h2
            className="text-[clamp(2rem,5vw,3rem)] text-white mb-10 leading-none"
            style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
          >
            Usein kysyttyä
          </h2>
          <div className="flex flex-col gap-3">
            {faqs.map((item, i) => (
              <div key={i} className="bg-black border border-[#2A2A2A] rounded-xl p-6">
                <h3 className="text-white font-bold mb-2.5">{item.question}</h3>
                <p className="text-[#B3B3B3] text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── YHTEYSTIEDOT CTA ── */}
      <section className="section-padding bg-black">
        <div className="section-container max-w-2xl text-center">
          <h2
            className="text-[clamp(2.5rem,6vw,4rem)] text-white mb-5 leading-none"
            style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
          >
            {clubPage?.ctaBlock?.title ?? (
              <>
                Kiinnostuitko?<br />
                <span className="text-[#FF6A00]">Ota yhteyttä.</span>
              </>
            )}
          </h2>
          <p className="text-[#B3B3B3] text-lg mb-10 leading-relaxed">
            {clubPage?.ctaBlock?.text ??
              'Tule tutustumaan — ensimmäinen harjoituskerta on maksuton. Vastataan nopeasti.'}
          </p>
          <a
            href={`mailto:${joinEmail}`}
            className="btn-primary text-base"
          >
            ✉️ {clubPage?.ctaBlock?.buttonLabel ?? 'Lähetä sähköpostia'}
          </a>

          <div className="mt-8 flex flex-col items-center gap-1.5">
            {clubPage?.contactBlock?.name && (
              <span className="text-[#B3B3B3] text-sm">
                Yhteyshenkilö:{' '}
                <span className="text-white">{clubPage.contactBlock.name}</span>
              </span>
            )}
            <a
              href={`mailto:${joinEmail}`}
              className="text-[#FF6A00] hover:text-[#E85C00] text-sm font-bold transition-colors"
            >
              {joinEmail}
            </a>
            {clubPage?.contactBlock?.phone && (
              <span className="text-white text-sm">{clubPage.contactBlock.phone}</span>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
