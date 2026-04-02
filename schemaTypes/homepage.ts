import { defineType, defineField } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Etusivu',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero-otsikko',
      type: 'string',
      initialValue: 'Biketrial Hämeenlinna',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero-alaotsikko',
      type: 'string',
      initialValue: 'Polkupyörätrial — tasapaino, rohkeus, yhteisö.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero-kuva',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'entryCards',
      title: 'Pääkortit (tarkalleen 2)',
      type: 'array',
      validation: (Rule) => Rule.min(2).max(2),
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Otsikko', type: 'string' }),
            defineField({ name: 'description', title: 'Kuvaus', type: 'text', rows: 2 }),
            defineField({ name: 'href', title: 'Linkki', type: 'string' }),
            defineField({ name: 'ctaLabel', title: 'Painikkeen teksti', type: 'string' }),
            defineField({ name: 'image', title: 'Kuva', type: 'image', options: { hotspot: true } }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        },
      ],
    }),
    defineField({
      name: 'introText',
      title: 'Lyhyt esittelyteksti',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'highlightStrip',
      title: 'Nopeat nostot (3–4 kpl)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'icon', title: 'Ikoni (emoji tai koodi)', type: 'string' }),
            defineField({ name: 'label', title: 'Teksti', type: 'string' }),
            defineField({ name: 'href', title: 'Linkki (valinnainen)', type: 'string' }),
          ],
          preview: { select: { title: 'label' } },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Etusivu' }),
  },
})
