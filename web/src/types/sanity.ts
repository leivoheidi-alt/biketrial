export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number }
}

export interface PortableTextBlock {
  _type: 'block'
  _key: string
  style: string
  children: Array<{ _type: 'span'; text: string; marks: string[] }>
  markDefs: unknown[]
}

export interface SiteSettings {
  siteTitle: string
  siteDescription?: string
  mainNav?: Array<{ label: string; href: string }>
  contactEmail?: string
  contactPhone?: string
  instagramUrl?: string
  facebookUrl?: string
  footerText?: string
}

export interface EntryCard {
  title: string
  description: string
  href: string
  ctaLabel: string
  image?: SanityImage
}

export interface HomepageData {
  heroTitle: string
  heroSubtitle: string
  heroImage?: SanityImage
  entryCards: EntryCard[]
  introText?: string
  highlightStrip?: Array<{ icon?: string; label: string; href?: string }>
}

export interface SkillItem {
  skill: string
  description?: string
  icon?: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface BeginnerCourseRef {
  title: string
  startDateText: string
  weekday: string
  time: string
  location: string
  locationDetail?: string
  ageRange?: string
  price?: string
  signupCta?: { label?: string; href?: string; email?: string }
  contactInfo?: string
  isActive: boolean
}

export interface ClubPageData {
  heroTitle: string
  heroText: string
  heroImage?: SanityImage
  introImage?: SanityImage
  whatIsBiketrial: PortableTextBlock[]
  whoIsItFor: PortableTextBlock[]
  whatDoYouLearn: SkillItem[]
  howToJoin: PortableTextBlock[]
  beginnerCourseRef?: BeginnerCourseRef
  faqItems: FaqItem[]
  ctaBlock?: { title: string; text: string; buttonLabel: string; buttonHref: string }
  contactBlock?: { name?: string; email?: string; phone?: string; additionalInfo?: string }
}

export interface SponsorPackage {
  tier?: 'main' | 'gold' | 'silver' | 'bronze'
  name: string
  price: string
  tagline?: string
  shortDescription: string
  benefits: string[]
  ctaLabel: string
  highlighted: boolean
  availableSlots?: number
  sortOrder?: number
}

export interface SkateJam {
  title: string
  organizer: string
  startTime: string
  intro: string
  categories: Array<{ name: string; description?: string }>
  bestTrickDescription: string
  liveMusicDescription: string
}

export interface BikefestPageData {
  heroTitle: string
  heroSubtitle: string
  heroImage?: SanityImage
  eventDate: string
  eventLocation: string
  introText?: PortableTextBlock[]
  whyAttend?: Array<{ title: string; description: string; icon?: string }>
  highlights?: Array<{ title: string; description: string; image?: SanityImage }>
  familyAreaBlock?: {
    title: string
    description: PortableTextBlock[]
    familyAreaImage?: SanityImage
    kidsAreaTitle?: string
    kidsAreaPartner?: {
      displayNote?: string
    }
    liikenneturvaNote?: string
  }
  skateJamImage?: SanityImage
  skateJamRef?: SkateJam
  companySalesBlock?: {
    title: string
    intro: string
    sponsorSectionImage?: SanityImage
    packages: SponsorPackage[]
  }
  competitorInfoBlock?: {
    heroTitle?: string
    intro?: string
    competitionName?: string
    whoIsItFor?: string
    kilpailukutsuUrl?: string
    ilmoittautuneetUrl?: string
    tuloksetUrl?: string
    classes?: Array<{
      title: string
      description?: string
    }>
    participationNotes?: string[]
    arrivalNotes?: string[]
    checklist?: string[]
    contact?: {
      name?: string
      email?: string
      phone?: string
    }
  }
  contactCta?: { title: string; text: string; email: string; buttonLabel: string }
}

export interface ProgramItem {
  time: string
  title: string
  description?: string
  category: 'competition' | 'demo' | 'skate' | 'family' | 'music' | 'sponsor'
  featured: boolean
  sortOrder?: number
}

export interface Partner {
  partnerName: string
  logo?: SanityImage
  description?: string
  specialNote?: string
  website?: string
}
