import { defineType, defineField } from 'sanity'

/**
 * Neljä sponsoritasoa (intentional business decision):
 *
 * PÄÄSPONSORI  – maksimaalinen näkyvyys, tapauskohtainen hinta
 * KULTA        – standipaikka + laaja medianäkyvyys, 1 500 €
 * HOPEA        – standipaikka + perustason näkyvyys, 950 €
 * PRONSSI      – nimetty trial-sektori tai pelkkä some/web-näkyvyys, 400 €
 *
 * Neljä tasoa koska:
 * - Pääsponsori on räätälöity / neuvoteltava → ei kiinteää hintaa
 * - Kulta erottuu Hopeasta lisä-mediapanostuksen ja isomman standin myötä
 * - Pronssi on matalan kynnyksen tapa osallistua pienemmällä budjetilla
 */
export const sponsorPackage = defineType({
  name: 'sponsorPackage',
  title: 'Sponsoripaketti',
  type: 'document',
  fields: [
    defineField({
      name: 'tier',
      title: 'Taso',
      type: 'string',
      options: {
        list: [
          { title: '🏅 Pääsponsori (räätälöity)', value: 'main' },
          { title: '🥇 Kulta', value: 'gold' },
          { title: '🥈 Hopea', value: 'silver' },
          { title: '🥉 Pronssi', value: 'bronze' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Paketin nimi (näytetään sivulla)',
      type: 'string',
      description: 'Esim. "Kulta — Standikumppani" tai pelkkä "Pääsponsori"',
    }),
    defineField({
      name: 'price',
      title: 'Hinta (teksti)',
      type: 'string',
      description: 'Esim. "1 500 €", "950 €" tai "Pyydä tarjous"',
    }),
    defineField({
      name: 'tagline',
      title: 'Lyhyt tagline (1 rivi)',
      type: 'string',
      description: 'Esim. "Suora kontakti satoihin kävijöihin"',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Lyhyt kuvaus',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'benefits',
      title: 'Sisältyvät edut',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Listaa edut yksitellen — näytetään checklistana',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Painikkeen teksti',
      type: 'string',
      initialValue: 'Kysy lisää',
    }),
    defineField({
      name: 'highlighted',
      title: 'Korostettu paketti',
      type: 'boolean',
      initialValue: false,
      description: 'Nosta yksi paketti esiin "Suosituin"-merkinnällä',
    }),
    defineField({
      name: 'availableSlots',
      title: 'Saatavilla olevat paikat (valinnainen)',
      type: 'number',
      description: 'Esim. 1 pääsponsori, 3 Kulta-paikkaa jne. Luo niukkuusvaikutelman.',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Järjestysnumero',
      type: 'number',
      description: 'Pääsponsori=1, Kulta=2, Hopea=3, Pronssi=4',
    }),
  ],
  orderings: [
    {
      title: 'Tärkeysjärjestys',
      name: 'sortOrderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'price', tier: 'tier' },
    prepare({ title, subtitle, tier }) {
      const tierEmoji: Record<string, string> = {
        main: '🏅',
        gold: '🥇',
        silver: '🥈',
        bronze: '🥉',
      }
      return {
        title: `${tierEmoji[tier] ?? ''} ${title ?? ''}`,
        subtitle: subtitle ?? '',
      }
    },
  },
})
