import { existsSync } from 'node:fs'
import path from 'node:path'
import { unstable_cache } from 'next/cache'
import { client } from '@/lib/sanity'
import { bikefestPageQuery, programItemsQuery, partnersQuery } from '@/lib/queries'
import type { BikefestPageData, Partner, ProgramItem, SponsorPackage } from '@/types/sanity'

export const bikefestVisitorFallbackImages = {
  heroImage: '/images/bikefest-hero.jpg',
  familyAreaImage: '/images/bikefest-family.jpg',
  skateJamImage: '/images/bikefest-skate.jpg',
} as const

export const bikefestSponsorFallbackImages = {
  heroImage: '/images/bikefest-hero.jpg',
  sponsorSectionImage: '/images/bikefest-sponsor.jpg',
} as const

export const fallbackCompetitorInfo = {
  heroTitle: 'Biketrial SM-Cup Hämeenlinna',
  intro:
    'BikeFestissä ajetaan biketrialin SM-Cupin osakilpailu. Tältä sivulta löytyvät kilpailijoiden tärkeimmät linkit, aikataulut, saapumisinfo ja yhteystiedot.',
  competitionName: 'Biketrial SM-Cup osakilpailu osana BikeFest 2026 -tapahtumaa',
  whoIsItFor:
    'Kilpailu on tarkoitettu lisenssi- ja harrastajataustaisille ajajille kilpailukutsussa vahvistettavien luokkien mukaisesti.',
  kilpailukutsuUrl: '',
  ilmoittautuneetUrl: '',
  tuloksetUrl: '',
  classes: [
    {
      title: 'Nuorten luokat',
      description: 'Nuoremmille kilpailijoille vahvistettavat luokat julkaistaan virallisessa kilpailukutsussa.',
    },
    {
      title: 'Harrastajaluokat',
      description: 'Matalamman kynnyksen osallistuminen kilpailukutsun ehtojen mukaisesti.',
    },
    {
      title: 'Kilpaluokat',
      description: 'Kokeneemmille kilpailijoille vahvistetut SM-Cup-luokat ja päivän kilpailurakenne.',
    },
  ],
  participationNotes: [
    'Tutustu kilpailukutsuun ennen ilmoittautumista.',
    'Tarkista, että ilmoittautuminen on vahvistettu ennen kilpailupäivää.',
    'Varmista oma varustus, pyörän kunto ja kilpailupäivän käytännöt etukäteen.',
  ],
  arrivalNotes: [
    'Kilpailupaikka on Hämeensaaressa, Hämeenlinnassa.',
    'Tarkemmat pysäköinti-, huoltoalue- ja ajo-ohjeet julkaistaan kilpailukutsussa.',
    'Paikalle kannattaa tulla ajoissa kisainfoa ja valmistautumista varten.',
  ],
  checklist: [
    'Tutustu kilpailukutsuun',
    'Tarkista ilmoittautuminen',
    'Saavu ajoissa',
    'Seuraa tuloksia',
  ],
  contact: {
    name: 'Kilpailuinfo',
    email: 'info@biketrial.fi',
    phone: '',
  },
} as const

export const fallbackPackages: SponsorPackage[] = [
  {
    tier: 'main',
    name: 'Pääsponsori',
    price: 'Pyydä tarjous',
    tagline: 'Räätälöity. Maksimaalinen.',
    shortDescription: 'Brändisi integroituna koko tapahtumaan. Lavalla, nimessä, kaikessa viestinnässä.',
    benefits: [
      'Logo tai nimi tapahtuman nimessä',
      'Iso standi parhaalla sijainnilla',
      'Kaikki some- ja painomateriaalit',
      'Kuulutukset koko päivän',
      'Maininta kaikissa tiedotteissa',
      'Edustus palkintojenjaossa',
    ],
    ctaLabel: 'Ota yhteyttä',
    highlighted: false,
    availableSlots: 1,
    sortOrder: 1,
  },
  {
    tier: 'gold',
    name: 'Kulta',
    price: '1 500 €',
    tagline: 'Standi + laaja näkyvyys.',
    shortDescription: 'Oma standi, logo kaikessa viestinnässä ja some-näkyvyys ennen ja jälkeen tapahtuman.',
    benefits: [
      '4×4 m standi prime-sijainnissa',
      'Logo verkkosivulla, julisteessa ja ohjelmalehdessä',
      'Maininta 3+ some-julkaisussa',
      'Kuulutusmaininnat tapahtumapäivänä',
      '4 sisäänpääsyranneketta',
    ],
    ctaLabel: 'Varaa Kulta-paikka',
    highlighted: true,
    availableSlots: 3,
    sortOrder: 2,
  },
  {
    tier: 'silver',
    name: 'Hopea',
    price: '950 €',
    tagline: 'Standi + perusnäkyvyys.',
    shortDescription: 'Standipaikka tapahtuma-alueella, logo verkkosivulla ja some-maininta.',
    benefits: [
      '3×3 m standipaikka',
      'Logo tapahtuman verkkosivulla',
      'Maininta ennen/jälkeen some-julkaisuissa',
      '2 sisäänpääsyranneketta',
    ],
    ctaLabel: 'Varaa Hopea-paikka',
    highlighted: false,
    availableSlots: 5,
    sortOrder: 3,
  },
  {
    tier: 'bronze',
    name: 'Pronssi — Sektorimainos',
    price: '400 €',
    tagline: 'Nimeä SM-Cup -sektori.',
    shortDescription: 'Yrityksesi nimi SM-Cup -kilpailun estekokonaisuudessa — kuulutuksissa, julisteissa ja kentän kyltissä.',
    benefits: [
      'Sektori nimetty yrityksesi nimellä',
      'Kuulutusmaininnat kisan aikana',
      'Näkyy kisaohjelmassa ja kyltissä',
      'Some-maininta jälkeen',
    ],
    ctaLabel: 'Nimeä sektori',
    highlighted: false,
    availableSlots: 6,
    sortOrder: 4,
  },
]

export const fallbackProgram: ProgramItem[] = [
  { time: '10:00', title: 'Tapahtuma-alue avautuu', description: 'Yritysstandit, näyttelyt ja aktiviteetit käynnissä', category: 'family', featured: false, sortOrder: 1 },
  { time: '10:30', title: 'Biketrial SM-Cup — alkulähdöt', description: 'Suomen parhaat trialistit SM-Cup osakilpailussa', category: 'competition', featured: true, sortOrder: 2 },
  { time: '12:00', title: 'BMX-demot', description: 'Show-esityksiä BMX-pyöräilijöiltä', category: 'demo', featured: false, sortOrder: 3 },
  { time: '13:00', title: 'Lasten temppurata auki', description: 'Yhteistyössä Liikenneturvan kanssa — maksuton lapsille', category: 'family', featured: false, sortOrder: 4 },
  { time: '14:00', title: 'Skate Jam — kisat alkavat', description: 'Hämeenlinnan Skeitti Ry: junnut, naiset + nonbinary, avoin, Best Trick', category: 'skate', featured: true, sortOrder: 5 },
  { time: '15:00', title: 'Biketrial SM-Cup — finaalit', description: 'Finaaliajot — tule ajoissa', category: 'competition', featured: true, sortOrder: 6 },
  { time: '17:00', title: 'Live-musiikki', description: 'Skatekisat jatkuvat musiikin säestyksellä', category: 'music', featured: false, sortOrder: 7 },
  { time: '18:00', title: 'Palkintojenjakotilaisuus', description: 'SM-Cup ja Skate Jam voittajat palkitaan', category: 'competition', featured: false, sortOrder: 8 },
]

export const fallbackHighlights = [
  { icon: '🏆', title: 'Biketrial SM-Cup osakilpailu', description: 'Suomen parhaat biketrial-ajajat kilpailevat Hämeensaaressa päivän aikana.' },
  { icon: '🛹', title: 'Hämeenlinnan Skeitti Ry jamit', description: 'Skate Jam tuo tapahtumaan kisat, best trickin ja vahvan paikallisen skeittitunnelman.' },
  { icon: '🚲', title: 'BMX-demot', description: 'Näyttävät BMX-esitykset tekevät päivästä vauhdikkaan myös yleisölle.' },
  { icon: '🚦', title: 'Lasten temppurata yhteistyössä Liikenneturvan kanssa', description: 'Perheille suunnattu maksuton alue, jossa pyörätaitoja kokeillaan turvallisesti.' },
]

export const tierConfig: Record<string, {
  borderColor: string
  badgeClass: string
  badgeLabel: string
  btnClass: string
}> = {
  main: {
    borderColor: 'border-yellow-500/50',
    badgeClass: 'bg-yellow-500 text-black',
    badgeLabel: '🏅 Pääsponsori',
    btnClass: 'btn-outline-orange',
  },
  gold: {
    borderColor: 'border-[#FF6A00]',
    badgeClass: 'bg-[#FF6A00] text-white',
    badgeLabel: '🥇 Kulta',
    btnClass: 'btn-primary',
  },
  silver: {
    borderColor: 'border-[#2A2A2A]',
    badgeClass: 'bg-[#2A2A2A] text-[#B3B3B3]',
    badgeLabel: '🥈 Hopea',
    btnClass: 'btn-outline',
  },
  bronze: {
    borderColor: 'border-[#2A2A2A]',
    badgeClass: 'bg-amber-900/40 text-amber-400 border border-amber-800/50',
    badgeLabel: '🥉 Pronssi',
    btnClass: 'btn-outline',
  },
}

export const catStyle: Record<string, string> = {
  competition: 'bg-blue-900/50 text-blue-300 border border-blue-800/50',
  demo: 'bg-[#2A2A2A] text-[#B3B3B3] border border-[#3A3A3A]',
  skate: 'bg-yellow-900/50 text-yellow-300 border border-yellow-800/50',
  family: 'bg-green-900/50 text-green-300 border border-green-800/50',
  music: 'bg-pink-900/50 text-pink-300 border border-pink-800/50',
  sponsor: 'bg-[#2A2A2A] text-[#B3B3B3]',
}

export const catLabel: Record<string, string> = {
  competition: 'Kilpailu',
  demo: 'Demo',
  skate: 'Skate',
  family: 'Perhe',
  music: 'Musiikki',
  sponsor: 'Sponsori',
}

export const salesHighlights = [
  { label: 'Yleisö', value: 'Perheet, nuoret, urheiluväki ja paikallinen yhteisö' },
  { label: 'Kohtaaminen', value: 'Standi tuo kasvokkain kontaktin, ei pelkkää logonäkyvyyttä' },
  { label: 'Paikat', value: 'Rajoitettu määrä sponsoritasoja ja näkyvimpiä standisijainteja' },
]

export const exhibitorReasons = [
  {
    title: 'Standi toimii paremmin kuin banneri',
    description: 'Kävijä pysähtyy, kysyy ja kohtaa yrityksen suoraan tapahtumassa.',
  },
  {
    title: 'Paikallinen yleisö, oikea konteksti',
    description: 'BikeFestissä brändi näkyy aidossa ympäristössä eikä irrallisena mainospintana.',
  },
  {
    title: 'Sama panostus, enemmän sisältöä',
    description: 'Standi, kuulutukset, some, verkkosivu ja tapahtumapäivän näkyvyys samassa paketissa.',
  },
]

export const competitorActions = [
  {
    id: 'kilpailukutsu',
    label: 'Kilpailukutsu',
    note: 'Viralliset kilpailuohjeet ja tarkennukset',
  },
  {
    id: 'ilmoittautuneet',
    label: 'Ilmoittautuneet',
    note: 'Ajantasainen osallistujalista julkaistaan tähän',
  },
  {
    id: 'tulokset',
    label: 'Tulokset',
    note: 'Tulokset julkaistaan kilpailupäivän jälkeen',
  },
]

export const competitorInfoCards = [
  {
    title: 'Luokat',
    description: 'Viralliset kilpailuluokat vahvistetaan kilpailukutsussa. Rakenne palvelee nuorempia, harrastavia ja kokeneempia kilpailijoita.',
  },
  {
    title: 'Ilmoittautuminen',
    description: 'Ilmoittautuminen avautuu kilpailukutsun yhteydessä. Lähtölistat ja viimeiset ohjeet julkaistaan ennen kisapäivää.',
  },
  {
    title: 'Varustus',
    description: 'Kilpailija vastaa oman kaluston kunnosta ja omista kilpailuvarusteistaan. Tarkemmat varusteohjeet ilmoitetaan kutsussa.',
  },
  {
    title: 'Kilpailupäivä',
    description: 'Paikalle kannattaa tulla ajoissa. Kisainfo, sektorit ja mahdolliset harjoitteluajat käydään läpi ennen lähtöjä.',
  },
]

export function resolvePackageTier(pkg: SponsorPackage) {
  const name = pkg.name?.toLowerCase() ?? ''

  if (pkg.tier) return pkg.tier
  if (name.includes('pääsponsor')) return 'main'
  if (name.includes('kulta')) return 'gold'
  if (name.includes('hopea')) return 'silver'
  if (name.includes('pronssi') || name.includes('sektori')) return 'bronze'
  if (pkg.sortOrder === 1) return 'main'
  if (pkg.sortOrder === 2 || pkg.highlighted) return 'gold'
  if (pkg.sortOrder === 3) return 'silver'
  if (pkg.sortOrder === 4) return 'bronze'

  return 'silver'
}

export const getBikefestData = unstable_cache(async () => {
  const [bikefest, programItems, partners] = await Promise.all([
    client.fetch<BikefestPageData | null>(bikefestPageQuery).catch(() => null),
    client.fetch<ProgramItem[]>(programItemsQuery).catch(() => []),
    client.fetch<Partner[]>(partnersQuery).catch(() => []),
  ])

  return {
    bikefest,
    partners,
    program: programItems?.length ? programItems : fallbackProgram,
    packages: bikefest?.companySalesBlock?.packages?.length ? bikefest.companySalesBlock.packages : fallbackPackages,
    highlights: bikefest?.whyAttend?.length ? bikefest.whyAttend : fallbackHighlights,
    kidsAreaTitle: bikefest?.familyAreaBlock?.kidsAreaTitle ?? 'Lasten temppurata',
    kidsAreaNote: bikefest?.familyAreaBlock?.kidsAreaPartner?.displayNote ?? 'yhteistyössä Liikenneturvan kanssa',
    salesEmail: bikefest?.contactCta?.email ?? 'info@biketrial.fi',
  }
}, ['bikefest-page-data'], { revalidate: 300 })

export function resolvePublicImage(src: string) {
  return existsSync(path.join(process.cwd(), 'public', src.replace(/^\//, ''))) ? src : null
}
