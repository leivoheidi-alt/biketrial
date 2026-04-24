import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import Image from 'next/image'
import { client } from '@/lib/sanity'
import { clubPageQuery, activeCourseQuery } from '@/lib/queries'
import type { ClubPageData, BeginnerCourseRef } from '@/types/sanity'
import SanityImage from '@/components/ui/SanityImage'

export const metadata: Metadata = {
  title: 'Biketrial Hämeenlinna',
  description:
    'Polkupyörätrial kehittää tasapainoa, rohkeutta ja pyöränhallintaa. Tule mukaan Biketrial Hämeenlinnan alkeiskurssille.',
  keywords: ['polkupyörätrial', 'Biketrial Hämeenlinna', 'alkeiskurssi Hämeenlinna', 'trial lapset'],
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
  { icon: '⚖️', skill: 'Tasapaino', description: 'Kehonhallintaa ja varmuutta liikkumiseen.' },
  { icon: '🎯', skill: 'Tarkkuus', description: 'Keskittymistä ja liikkeen hallintaa.' },
  { icon: '🧠', skill: 'Kyky keskittyä', description: 'Yksi este ja yksi yritys kerrallaan.' },
  { icon: '💪', skill: 'Rohkeus', description: 'Uskallusta kokeilla ja ylittää itsensä.' },
  { icon: '🔥', skill: 'Päättäväisyys', description: 'Harjoittelua, epäonnistumisia ja onnistumisia.' },
  { icon: '👥', skill: 'Yhteisö', description: 'Kannustava porukka, jossa jokainen saa kehittyä.' },
]

const defaultFaq = [
  { question: 'Mikä ikäiset voivat aloittaa?', answer: 'Noin 6-vuotiaasta ylöspäin. Myös aikuiset aloittajat sopivat hyvin mukaan.' },
  { question: 'Tarvitseeko omaa pyörää?', answer: 'Ei tarvitse heti. Seuralla on lainapyöriä alkuun, joten lajia voi kokeilla ennen oman trialpyörän hankintaa.' },
  { question: 'Onko laji vaarallinen?', answer: 'Harjoittelu etenee vaiheittain ja turvallisesti. Alkuvaiheessa tehdään pieniä juttuja ja vaikeustasoa nostetaan vasta taitojen karttuessa.' },
  { question: 'Mitä mukaan?', answer: 'Säänmukaiset vaatteet ja reipas mieli. Kypärä kannattaa ottaa mukaan, jos sellainen löytyy.' },
  { question: 'Milloin harjoitellaan?', answer: 'Säännöllisesti viikoittain. Alkeiskurssi alkaa torstaina 7.5. Tarkemmat ajat kerrotaan ilmoittautumisen yhteydessä.' },
]

const quickFacts = [
  { value: 'Et tarvitse aiempaa kokemusta' },
  { value: 'Noin 6-vuotiaasta ylöspäin' },
  { value: 'Seuralla on pyöriä alkuun' },
]

const gettingStartedSteps = [
  {
    step: '1',
    title: 'Ilmoittaudu',
    description: 'Lähetä viesti ja kerro, kuka olisi tulossa mukaan.',
  },
  {
    step: '2',
    title: 'Tule mukaan',
    description: 'Tule harjoituksiin tai alkeiskurssille kokeilemaan.',
  },
  {
    step: '3',
    title: 'Löydä oma tapasi',
    description: 'Jatka omaan tahtiin ja kehity pala kerrallaan.',
  },
]

const audienceCards = [
  {
    title: 'Lapset',
    description: 'Leikin, tasapainon ja pyöränhallinnan kautta.',
    image: '/images/home-club-card-sanity.webp',
    alt: 'Lapsia ja nuoria yhdessä harjoituksissa Biketrial Hämeenlinna -seurassa',
  },
  {
    title: 'Nuoret',
    description: 'Tekniikkaa, rohkeutta ja onnistumisia.',
    image: '/images/nuoret-bikefest.webp',
    alt: 'Nuori ajaja tasapainoilemassa esteellä biketrial-harjoituksissa',
  },
  {
    title: 'Aikuiset',
    description: 'Uusi taitolaji ja hauska tapa haastaa itseään.',
    image: '/images/kisa.webp',
    alt: 'Aikuinen ajaja tasapainoilemassa kivillä biketrial-radalla',
  },
  {
    title: 'Perheet',
    description: 'Yhteinen harrastus ja hyvä syy viettää aikaa yhdessä.',
    image: '/images/trial-family.webp',
    alt: 'Vanhempi ja lapsi matkalla yhdessä harrastuksen pariin',
  },
]

const getClubData = unstable_cache(async () => {
  const [clubPage, activeCourse] = await Promise.all([
    client.fetch<ClubPageData | null>(clubPageQuery).catch(() => null),
    client.fetch<BeginnerCourseRef | null>(activeCourseQuery).catch(() => null),
  ])

  return { clubPage, activeCourse }
}, ['club-page-data'], { revalidate: 300 })

export default async function SeuraPage() {
  const { clubPage, activeCourse } = await getClubData()

  const course = activeCourse ?? clubPage?.beginnerCourseRef ?? fallbackCourse
  const skills = defaultSkills
  const faqs = defaultFaq
  const joinEmail = course.signupCta?.email ?? clubPage?.contactBlock?.email ?? 'info@biketrial.fi'

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-black overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.72) 38%, rgba(0,0,0,0.34) 100%), linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.04) 38%, rgba(0,0,0,0.42) 100%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-10 h-[360px] w-[360px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(255,106,0,0.18) 0%, rgba(255,106,0,0) 68%)' }}
        />

        <div className="section-container relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] gap-10 xl:gap-14 items-center">
            <div>
              <div className="eyebrow mb-4 text-[1rem]">Biketrial-seura Hämeenlinna</div>
              <h1 className="mb-6 max-w-[760px] text-[clamp(3rem,8vw,6.2rem)] leading-[0.96] text-white">
                Mikä on <span className="text-[#FF6A00]">Biketrial?</span>
              </h1>
              <p className="mb-7 max-w-2xl text-[1.18rem] leading-[1.8] text-[#D1D1D1] sm:text-[1.28rem]">
                Polkupyörätrialissa ajetaan haastavia ratoja ilman, että jalka koskee maahan.
                Laji kehittää tasapainoa, rohkeutta, keskittymistä ja pyöränhallintaa tavalla, jota
                harva muu laji tarjoaa.
              </p>
              <p className="mb-6 max-w-2xl text-[1.02rem] leading-[1.72] text-white/74 sm:text-[1.08rem]">
                Biketrial Hämeenlinna toimii osana Tawast Cycling Clubia (Tawast CC).
              </p>
              <div className="mb-9 max-w-2xl rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm">
                <div className="mb-2 text-[0.96rem] font-bold uppercase tracking-[0.08em] text-[#FF6A00]">
                  Parhaimmillaan koko perheen harrastus
                </div>
                <p className="text-[1.08rem] leading-[1.78] text-white/92 sm:text-[1.14rem]">
                  Lapsi ajaa, vanhempi kannustaa ja yhdessä nähdään, miten rohkeus kasvaa viikko viikolta.
                </p>
                <p className="mt-3 text-[1rem] leading-[1.7] text-white/80 sm:text-[1.04rem]">
                  Seuralla on myös lainapyöriä alkuun, joten omaa trialpyörää ei tarvitse hankkia heti.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#aloita" className="btn-primary">
                  Aloita harrastus
                </a>
                <a href="#kurssi" className="btn-outline">
                  Katso alkeiskurssi
                </a>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#111111] shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
              <div className="relative aspect-[4/5] min-h-[420px] w-full">
                <Image
                  src="/images/fillaritrial.webp"
                  alt="Biketrial-seuran harjoituksissa lapsi ajaa ja perhe seuraa vieressä"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.16)_32%,rgba(0,0,0,0.72)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <div className="rounded-2xl border border-white/10 bg-black/45 p-5 backdrop-blur-sm">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                      {quickFacts.map((item, index) => (
                        <div key={item.value} className="space-y-2">
                          <div className="text-[1.6rem] font-black leading-none text-[#FF6A00]">
                            {index + 1}.
                          </div>
                          <div className="text-[1.04rem] leading-[1.64] text-[#E0E0E0]">
                            {item.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MITÄ ON BIKETRIAL ── */}
      <section className="section-padding bg-[#111111]">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] gap-10 items-center">
            <div>
              <div className="eyebrow mb-5 text-[1rem]">Laji</div>
              <h2 className="mb-7 max-w-[720px] text-[clamp(2.25rem,5vw,4rem)] leading-[0.98] text-white">
                Tasapaino, tarkkuus ja <span className="text-[#FF6A00]">hieman hulluutta</span>
              </h2>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <p className="text-[1.14rem] leading-[1.78] text-[#D1D1D1]">
                  Polkupyörätrial on pyöräilyn tekninen taitolaji, jossa vauhti ei ratkaise.
                  Tärkeintä ovat tasapaino, tarkkuus, kehonhallinta ja kyky keskittyä yhteen esteeseen kerrallaan.
                </p>
                <p className="text-[1.14rem] leading-[1.78] text-[#D1D1D1]">
                  Parasta lajissa on se, että onnistumiset näkyvät nopeasti. Ensin opitaan pysymään paikallaan,
                  sitten nousemaan pienelle esteelle ja lopulta selviämään yhä haastavammista kohdista.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-black">
              <div className="relative aspect-[4/5] min-h-[380px] w-full">
                {clubPage?.introImage ? (
                  <SanityImage
                    image={clubPage.introImage}
                    alt="Ajaja tasapainoilee esteellä biketrial-radalla"
                    fill
                    className="object-cover object-center"
                  />
                ) : (
                  <Image
                    src="/images/trial-hulluus.jpg"
                    alt="Ajaja tasapainoilee esteellä biketrial-radalla"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                )}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.12)_24%,rgba(0,0,0,0.82)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="mb-3 text-[0.92rem] font-bold uppercase tracking-[0.12em] text-[#FF6A00]">
                    Lajissa tapahtuu
                  </div>
                  <p className="max-w-md text-[1.04rem] leading-[1.72] text-white/90">
                    Harjoituksissa opetellaan turvallisesti tasapainoa, esteiden ylittämistä ja pyörän hallintaa vaihe vaiheelta.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KENELLE SOPII ── */}
      <section className="section-padding bg-black">
        <div className="section-container">
          <div className="mb-10 max-w-3xl">
            <div className="eyebrow mb-5 text-[1rem]">Kenelle sopii?</div>
            <h2 className="mb-6 text-[clamp(2.25rem,5vw,4rem)] leading-[0.98] text-white">
              Käytännössä <span className="text-[#FF6A00]">kaikille</span>
            </h2>
            <p className="max-w-3xl text-[1.18rem] leading-[1.8] text-[#D1D1D1]">
              Polkupyörätrial ei vaadi aiempaa lajitaustaa. Mukaan voi tulla lapsi, nuori, aikuinen tai koko perhe.
              Tärkeintä on halu kokeilla, oppia ja yrittää uudelleen.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {audienceCards.map((item) => (
              <div key={item.title} className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-[#111111]">
                <div className="relative aspect-[4/5] min-h-[320px] w-full">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.2)_32%,rgba(0,0,0,0.88)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <h3 className="mb-2 text-white">{item.title}</h3>
                    <p className="text-[1.06rem] leading-[1.68] text-[#D1D1D1]">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERHEHARRASTUS ── */}
      <section className="section-padding bg-[#111111]">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] gap-10 items-center">
            <div>
              <div className="eyebrow mb-5 text-[1rem]">Perheille</div>
              <h2 className="mb-7 max-w-[760px] text-[clamp(2.25rem,5vw,4rem)] leading-[0.98] text-white">
                Parhaimmillaan tämä on <span className="text-[#FF6A00]">perheharrastus</span>
              </h2>
              <div className="space-y-5 text-[1.16rem] leading-[1.8] text-[#D1D1D1]">
                <p>
                  Polkupyörätrial ei ole vain lapsen harrastus. Parhaimmillaan se on yhteinen matka, jossa vanhempi
                  pääsee seuraamaan läheltä lapsen onnistumisia, rohkeuden kasvua ja taitojen kehittymistä.
                </p>
                <p>
                  Tässä lajissa lapsi oppii muutakin kuin pyörän hallintaa. Hän oppii yrittämään uudelleen,
                  sietämään epäonnistumisia, keskittymään, olemaan kärsivällinen ja huomaamaan, että vaikeatkin
                  asiat voivat onnistua pala kerrallaan.
                </p>
                <p>
                  Siksi toivomme mukaan vanhempia, jotka haluavat olla toiminnassa mukana. Lajia ei tarvitse osata
                  valmiiksi. Riittää, että jaksaa kannustaa, auttaa ja olla osa yhteistä porukkaa.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-black shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
              <div className="relative aspect-[4/5] min-h-[420px] w-full">
                <Image
                  src="/images/trial-family.webp"
                  alt="Vanhempi ja lapsi yhteisessä biketrial-harrastuksen hetkessä"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.16)_36%,rgba(0,0,0,0.82)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="mb-3 text-[0.92rem] font-bold uppercase tracking-[0.12em] text-[#FF6A00]">
                    Yhdessä mukana
                  </div>
                  <p className="max-w-md text-[1.04rem] leading-[1.7] text-white/92">
                    Harjoituksissa syntyy turvallinen paikka oppia, yrittää ja onnistua yhdessä.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MITÄ OPITAAN ── */}
      <section className="section-padding bg-black">
        <div className="section-container">
          <div className="mb-10 text-center">
            <div className="eyebrow mb-5 text-[1rem]">Mitä harjoituksissa opitaan?</div>
            <h2 className="mb-5 text-[clamp(2.25rem,5vw,4rem)] leading-[0.98] text-white">
              Paljon enemmän kuin <span className="text-[#FF6A00]">pyöräilemistä</span>
            </h2>
            <p className="mx-auto max-w-3xl text-[1.16rem] leading-[1.8] text-[#D1D1D1]">
              Polkupyörätrial kehittää taitoja, jotka näkyvät myös lajin ulkopuolella. Lapsi oppii rauhoittumaan,
              keskittymään, yrittämään uudelleen ja luottamaan omaan tekemiseensä.
            </p>
          </div>

          <div className="mx-auto mb-8 grid max-w-full grid-cols-1 gap-4 md:grid-cols-2 lg:max-w-[70%]">
            {[
              {
                src: '/images/trial-hulluus.jpg',
                alt: 'Nuori ajaja nousemassa kivelle biketrial-harjoituksissa',
                title: 'Tekniikkaa ja tasapainoa',
              },
              {
                src: '/images/trial-friends.webp',
                alt: 'Seuraporukkaa ja yhteistä treenitunnelmaa sisäharjoituksissa',
                title: 'Yhteinen tunnelma',
              },
            ].map((item) => (
              <div key={item.title} className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#111111]">
                <div className="relative aspect-square w-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.24)_30%,rgba(0,0,0,0.48)_100%)]" />
                  <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                    <div className="text-[clamp(1.15rem,2.1vw,1.85rem)] font-bold uppercase tracking-[0.14em] text-white">
                      {item.title}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {skills.map((item) => (
              <div key={item.skill} className="brand-card brand-card-hover p-5 text-center group">
                <div className="mb-4 text-3xl">{item.icon ?? '✅'}</div>
                <div className="mb-2 text-[1.08rem] leading-[1.2] text-white group-hover:text-[#FF6A00]">
                  {item.skill}
                </div>
                <div className="text-[1rem] leading-[1.66] text-[#D1D1D1]">{item.description}</div>
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
              <div className="eyebrow mb-5 text-[1rem]">Miten mukaan?</div>
              <h2 className="mb-6 text-[clamp(2.2rem,5vw,4rem)] leading-[0.98] text-white">
                Aloitus on tehty <span className="text-[#FF6A00]">helpoksi</span>
              </h2>
              <p className="text-[1.16rem] leading-[1.8] text-[#D1D1D1]">
                Helpointa on aloittaa tulemalla mukaan alkeiskurssille. Kurssilla tutustutaan lajiin turvallisesti
                ja rennosti, opetellaan perusasiat ja nähdään, millaiselta polkupyörätrial tuntuu käytännössä.
              </p>
              <p className="mt-4 text-[1.08rem] leading-[1.72] text-white/88">
                Seuralla on lainapyöriä alkuun, joten harrastusta voi kokeilla ennen oman trialpyörän hankintaa.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {gettingStartedSteps.map((item) => (
                <div key={item.step} className="card-hover p-5 sm:p-6">
                  <div className="mb-3 text-[0.96rem] font-bold uppercase tracking-[0.08em] text-[#FF6A00]">
                    Vaihe {item.step}
                  </div>
                  <h3 className="mb-2 text-white">{item.title}</h3>
                  <p className="text-[1.04rem] leading-[1.7] text-[#D1D1D1]">{item.description}</p>
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
                Torstaina
              </div>
              <h2
                className="text-[clamp(2.5rem,7vw,5rem)] text-white leading-none mb-6"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '0' }}
              >
                7.5.2026 klo 17.30
              </h2>

              <p className="text-white/90 text-[1.14rem] leading-[1.78] mb-6 max-w-xl">
                Ensimmäinen kerta on tutustumista, rentoa kokeilua ja turvallista tekemistä. Saat ohjeet paikan päällä,
                ja mukaan voi tulla ilman aiempaa kokemusta.
              </p>

              <div className="flex flex-col gap-2.5 text-white/80 text-base mb-8">
                {[
                  'Ei tarvitse omaa trialpyörää',
                  'Mukaan sään mukaiset vaatteet',
                  'Ensimmäinen kerta maksuton',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <span className="text-lg">✓</span>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
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
              <div className="text-white/60 text-sm font-bold uppercase tracking-[0.08em] mb-1">
                Ensimmäiselle kerralle
              </div>
              {[
                { icon: '⚖️', title: 'Tasapaino ja hallinta', desc: 'Perusteet pyörän päällä ja esteillä.' },
                { icon: '🙂', title: 'Kokeile rennosti', desc: 'Ohjatusti ja turvallisesti omalla tasolla.' },
                { icon: '↘', title: 'Matalan kynnyksen aloitus', desc: 'Sopii myös täysin uusille harrastajille.' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 bg-black/20 rounded-xl px-5 py-4">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="text-white font-bold text-[1rem]">{item.title}</div>
                    <div className="mt-1 text-[0.98rem] leading-[1.58] text-white/78">{item.desc}</div>
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
          <h2 className="mb-10 text-[clamp(2.1rem,5vw,3.2rem)] leading-[0.98] text-white">Usein kysyttyä</h2>
          <div className="flex flex-col gap-3">
            {faqs.map((item, i) => (
              <div key={i} className="bg-black border border-[#2A2A2A] rounded-xl p-6">
                <h3 className="mb-3 text-white text-[1.2rem] leading-[1.22]">{item.question}</h3>
                <p className="text-[1.08rem] leading-[1.76] text-[#D1D1D1]">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── YHTEYSTIEDOT CTA ── */}
      <section className="section-padding bg-black">
        <div className="section-container max-w-2xl text-center">
          <h2 className="mb-5 text-[clamp(2.5rem,6vw,4rem)] leading-[0.98] text-white">
            Kiinnostuitko? <span className="text-[#FF6A00]">Tule mukaan.</span>
          </h2>
          <p className="mb-10 text-[1.16rem] leading-[1.72] text-[#D1D1D1]">
            Tule rohkeasti tutustumaan. Ensimmäiset harjoituskerrat ovat maksuttomia, ja mukaan voi tulla ilman aiempaa kokemusta.
          </p>
          <a
            href={`mailto:${joinEmail}`}
            className="btn-primary text-base"
          >
            ✉️ Lähetä sähköpostia
          </a>

          <div className="mt-8 flex flex-col items-center gap-1.5">
            <a
              href={`mailto:${joinEmail}`}
              className="text-[#FF6A00] hover:text-[#E85C00] text-base font-bold transition-colors"
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
