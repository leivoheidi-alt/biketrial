import { defineType, defineField } from 'sanity'

export const clubPage = defineType({
  name: 'clubPage',
  title: 'Seurasivu',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero-otsikko',
      type: 'string',
      initialValue: 'Mikä on polkupyörätrial?',
    }),
    defineField({
      name: 'heroText',
      title: 'Hero-teksti',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero-kuva',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'introImage',
      title: 'Intro-kuva',
      description: 'Kuva etusivun "Mikä on biketrial?" -osioon.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'whatIsBiketrial',
      title: 'Mitä on biketrial? (rikasteksti)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'whoIsItFor',
      title: 'Kenelle laji sopii?',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'whatDoYouLearn',
      title: 'Mitä harjoituksissa opitaan?',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'skill', title: 'Taito / ominaisuus', type: 'string' }),
            defineField({ name: 'description', title: 'Lyhyt kuvaus', type: 'string' }),
            defineField({ name: 'icon', title: 'Ikoni (emoji)', type: 'string' }),
          ],
          preview: { select: { title: 'skill' } },
        },
      ],
    }),
    defineField({
      name: 'howToJoin',
      title: 'Miten mukaan?',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'beginnerCourseRef',
      title: 'Alkeiskurssi-viittaus',
      type: 'reference',
      to: [{ type: 'beginnerCourse' }],
    }),
    defineField({
      name: 'faqItems',
      title: 'Usein kysyttyä',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Kysymys', type: 'string' }),
            defineField({ name: 'answer', title: 'Vastaus', type: 'text', rows: 4 }),
          ],
          preview: { select: { title: 'question' } },
        },
      ],
    }),
    defineField({
      name: 'ctaBlock',
      title: 'CTA-lohko',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Otsikko', type: 'string' }),
        defineField({ name: 'text', title: 'Teksti', type: 'text', rows: 2 }),
        defineField({ name: 'buttonLabel', title: 'Painikkeen teksti', type: 'string' }),
        defineField({ name: 'buttonHref', title: 'Painikkeen linkki', type: 'string' }),
      ],
    }),
    defineField({
      name: 'contactBlock',
      title: 'Yhteystiedot',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Yhteyshenkilö', type: 'string' }),
        defineField({ name: 'email', title: 'Sähköposti', type: 'string' }),
        defineField({ name: 'phone', title: 'Puhelin', type: 'string' }),
        defineField({ name: 'additionalInfo', title: 'Lisätietoja', type: 'text', rows: 2 }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Seurasivu' }),
  },
})
