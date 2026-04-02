import { defineType, defineField } from 'sanity'

export const exhibitor = defineType({
  name: 'exhibitor',
  title: 'Näytteilleasettaja / yritys',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Yrityksen nimi',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Kuvaus',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'website',
      title: 'Verkkosivut',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Nosta esiin',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'standPackage',
      title: 'Standipaketti',
      type: 'reference',
      to: [{ type: 'sponsorPackage' }],
    }),
  ],
  preview: {
    select: { title: 'companyName', media: 'logo' },
  },
})
