import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteTitle,
    siteDescription,
    mainNav,
    contactEmail,
    contactPhone,
    instagramUrl,
    facebookUrl,
    footerText
  }
`

export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    heroTitle,
    heroSubtitle,
    heroImage,
    entryCards,
    introText,
    highlightStrip
  }
`

export const clubPageQuery = groq`
  *[_type == "clubPage"][0] {
    heroTitle,
    heroText,
    heroImage,
    introImage,
    whatIsBiketrial,
    whoIsItFor,
    whatDoYouLearn,
    howToJoin,
    beginnerCourseRef-> {
      title,
      startDateText,
      weekday,
      time,
      location,
      locationDetail,
      ageRange,
      price,
      signupCta,
      contactInfo,
      isActive
    },
    faqItems,
    ctaBlock,
    contactBlock
  }
`

export const clubIntroImageQuery = groq`
  *[_type == "clubPage"][0] {
    introImage
  }
`

export const activeCourseQuery = groq`
  *[_type == "beginnerCourse" && isActive == true][0] {
    title,
    startDateText,
    weekday,
    time,
    location,
    locationDetail,
    suitability,
    ageRange,
    price,
    description,
    signupCta,
    contactInfo
  }
`

export const bikefestPageQuery = groq`
  *[_type == "bikefestPage"][0] {
    heroTitle,
    heroSubtitle,
    heroImage,
    eventDate,
    eventLocation,
    introText,
    whyAttend,
    highlights,
    familyAreaBlock,
    skateJamImage,
    skateJamRef-> {
      title,
      organizer,
      startTime,
      intro,
      categories,
      bestTrickDescription,
      liveMusicDescription
    },
    companySalesBlock {
      title,
      intro,
      sponsorSectionImage,
      packages[]-> {
        tier,
        name,
        price,
        tagline,
        shortDescription,
        benefits,
        ctaLabel,
        highlighted,
        availableSlots,
        sortOrder
      }
    },
    competitorInfoBlock {
      heroTitle,
      intro,
      competitionName,
      whoIsItFor,
      kilpailukutsuUrl,
      ilmoittautuneetUrl,
      tuloksetUrl,
      classes,
      participationNotes,
      arrivalNotes,
      checklist,
      contact
    },
    contactCta
  }
`

export const programItemsQuery = groq`
  *[_type == "programItem"] | order(sortOrder asc) {
    time,
    title,
    description,
    category,
    featured,
    sortOrder
  }
`

export const partnersQuery = groq`
  *[_type == "partnerHighlight"] | order(sortOrder asc) {
    partnerName,
    logo,
    description,
    specialNote,
    website
  }
`
