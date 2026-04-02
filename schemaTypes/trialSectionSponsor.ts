import { defineType, defineField } from 'sanity'

export const trialSectionSponsor = defineType({
  name: 'trialSectionSponsor',
  title: 'Trial-sektori / mainospaikka',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionName',
      title: 'Sektorin nimi',
      type: 'string',
      description: 'Esim. "Sektori 1 — Kaupunkitrial"',
    }),
    defineField({
      name: 'sponsorName',
      title: 'Sponsorin nimi',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Kuvaus',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'visibilityBenefits',
      title: 'Näkyvyysedut',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'image',
      title: 'Kuva (valinnainen)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'isActive',
      title: 'Aktiivinen / saatavilla',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Järjestysnumero',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'sectionName', subtitle: 'sponsorName' },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Nimetön sektori',
        subtitle: subtitle ? `Sponsori: ${subtitle}` : 'Vapaa',
      }
    },
  },
})
