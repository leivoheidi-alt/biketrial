import { defineType, defineField } from 'sanity'

export const programItem = defineType({
  name: 'programItem',
  title: 'Ohjelmanumero',
  type: 'document',
  fields: [
    defineField({
      name: 'time',
      title: 'Aika',
      type: 'string',
      description: 'Esim. "10:00" tai "10:00–12:00"',
    }),
    defineField({
      name: 'title',
      title: 'Otsikko',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Kuvaus',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'category',
      title: 'Kategoria',
      type: 'string',
      options: {
        list: [
          { title: 'Kilpailu', value: 'competition' },
          { title: 'Demo', value: 'demo' },
          { title: 'Skate', value: 'skate' },
          { title: 'Perhe', value: 'family' },
          { title: 'Musiikki', value: 'music' },
          { title: 'Sponsori', value: 'sponsor' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'sortOrder',
      title: 'Järjestysnumero',
      type: 'number',
      description: 'Pieni numero = ensimmäinen',
    }),
    defineField({
      name: 'featured',
      title: 'Nosta esiin',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Ajan mukaan',
      name: 'timeAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'time', category: 'category' },
    prepare({ title, subtitle, category }) {
      return {
        title: title,
        subtitle: `${subtitle ?? ''} — ${category ?? ''}`,
      }
    },
  },
})
