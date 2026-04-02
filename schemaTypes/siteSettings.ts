import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Sivuston asetukset',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Sivuston nimi',
      type: 'string',
      initialValue: 'Biketrial Hämeenlinna',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Sivuston kuvaus (SEO)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'mainNav',
      title: 'Päänavigaatio',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Teksti', type: 'string' }),
            defineField({ name: 'href', title: 'Linkki', type: 'string' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        },
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Sähköposti',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Puhelinnumero',
      type: 'string',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram-linkki',
      type: 'url',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook-linkki',
      type: 'url',
    }),
    defineField({
      name: 'footerText',
      title: 'Alatunnisteen teksti',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'siteTitle' },
  },
})
