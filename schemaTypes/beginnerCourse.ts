import { defineType, defineField } from 'sanity'

export const beginnerCourse = defineType({
  name: 'beginnerCourse',
  title: 'Alkeiskurssi',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Otsikko',
      type: 'string',
      initialValue: 'Biketrial-alkeiskurssi',
    }),
    defineField({
      name: 'startDateText',
      title: 'Aloituspäivä (teksti, näytetään sivulla)',
      type: 'string',
      description: 'Esim. "Torstaina 7.5.2026 klo 17:30"',
      initialValue: 'Torstaina 7.5.2026 klo 17:30',
    }),
    defineField({
      name: 'startDate',
      title: 'Aloituspäivä (päivämäärä)',
      type: 'date',
    }),
    defineField({
      name: 'weekday',
      title: 'Viikonpäivä',
      type: 'string',
      initialValue: 'Torstai',
    }),
    defineField({
      name: 'time',
      title: 'Kellonaika',
      type: 'string',
      initialValue: '17:30',
    }),
    defineField({
      name: 'location',
      title: 'Paikka',
      type: 'string',
      initialValue: 'Hämeenlinna',
    }),
    defineField({
      name: 'locationDetail',
      title: 'Tarkempi paikka / osoite',
      type: 'string',
    }),
    defineField({
      name: 'suitability',
      title: 'Kenelle sopii',
      type: 'string',
      initialValue: 'Lapsille ja nuorille, myös aikuisille sopii',
    }),
    defineField({
      name: 'ageRange',
      title: 'Ikäsuositus',
      type: 'string',
      initialValue: '6–16 v. (myös vanhemmat tervetulleita)',
    }),
    defineField({
      name: 'price',
      title: 'Hinta / maksu',
      type: 'string',
      initialValue: 'Ilmainen ensimmäinen kerta',
    }),
    defineField({
      name: 'description',
      title: 'Kuvaus',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'signupCta',
      title: 'Ilmoittautumis-CTA',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Painikkeen teksti', type: 'string', initialValue: 'Ilmoittaudu mukaan' }),
        defineField({ name: 'href', title: 'Linkki', type: 'string' }),
        defineField({ name: 'email', title: 'Sähköposti-ilmoittautuminen', type: 'string' }),
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Yhteystieto kurssille',
      type: 'string',
    }),
    defineField({
      name: 'isActive',
      title: 'Aktiivinen (näytetään sivulla)',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'startDateText' },
  },
})
