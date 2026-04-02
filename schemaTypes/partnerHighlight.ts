import { defineType, defineField } from 'sanity'

export const partnerHighlight = defineType({
  name: 'partnerHighlight',
  title: 'Yhteistyökumppani',
  type: 'document',
  fields: [
    defineField({
      name: 'partnerName',
      title: 'Kumppanin nimi',
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
      name: 'specialNote',
      title: 'Erityismaininta (näytetään sivulla)',
      type: 'string',
      description: 'Esim. Liikenneturvalle: "Lasten temppurata yhteistyössä Liikenneturvan kanssa"',
    }),
    defineField({
      name: 'website',
      title: 'Verkkosivut',
      type: 'url',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Järjestysnumero',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'partnerName', subtitle: 'specialNote', media: 'logo' },
  },
})
