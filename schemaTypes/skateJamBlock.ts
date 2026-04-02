import { defineType, defineField } from 'sanity'

export const skateJamBlock = defineType({
  name: 'skateJamBlock',
  title: 'Skate Jam',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Otsikko',
      type: 'string',
      initialValue: 'Skeittikisat — Skate Jam',
    }),
    defineField({
      name: 'organizer',
      title: 'Järjestäjä',
      type: 'string',
      initialValue: 'Hämeenlinnan Skeitti Ry',
    }),
    defineField({
      name: 'startTime',
      title: 'Alkamisaika (teksti)',
      type: 'string',
      initialValue: 'noin klo 14:00',
    }),
    defineField({
      name: 'intro',
      title: 'Esittelyteksti',
      type: 'text',
      rows: 4,
      initialValue: 'Hämeenlinnan Skeitti Ry järjestää BikeFestissä puoliputkikisat ja avoimen jam-tapahtuman. Tuleva tunnelma, vapaa ilmaiseminen ja live-musiikki tekevät tästä yhden päivän kohokohdista.',
    }),
    defineField({
      name: 'categories',
      title: 'Kilpailukategoriat',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Nimi', type: 'string' }),
            defineField({ name: 'description', title: 'Kuvaus (valinnainen)', type: 'string' }),
          ],
          preview: { select: { title: 'name' } },
        },
      ],
    }),
    defineField({
      name: 'bestTrickDescription',
      title: 'Best Trick -kuvaus',
      type: 'text',
      rows: 2,
      initialValue: 'Best Trick -kilpailu: kuka tekee päivän parhaan tempun?',
    }),
    defineField({
      name: 'liveMusicDescription',
      title: 'Live-musiikki',
      type: 'string',
      initialValue: 'Live-musiikkia koko illan',
    }),
    defineField({
      name: 'image',
      title: 'Kuva',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'organizer' },
  },
})
