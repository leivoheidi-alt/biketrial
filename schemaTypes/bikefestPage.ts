import { defineType, defineField } from 'sanity'

export const bikefestPage = defineType({
  name: 'bikefestPage',
  title: 'BikeFest-sivu',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    // ── Hero ──────────────────────────────────────────────────
    defineField({
      name: 'heroTitle',
      title: 'Hero-otsikko',
      type: 'string',
      initialValue: 'BikeFest Hämeenlinna 2026',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero-alaotsikko',
      type: 'string',
      initialValue: 'Biketrialin, skeittauksen ja katukulttuurin suurtapahtuma',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero-kuva',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'eventDate',
      title: 'Tapahtumapäivä (teksti)',
      type: 'string',
      initialValue: 'Kesä 2026',
    }),
    defineField({
      name: 'eventLocation',
      title: 'Tapahtumapaikka',
      type: 'string',
      initialValue: 'Hämeensaari, Hämeenlinna',
    }),

    // ── Intro ─────────────────────────────────────────────────
    defineField({
      name: 'introText',
      title: 'Johdantoteksti',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'whyAttend',
      title: 'Miksi tulla paikalle? (korttirivi)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'icon', title: 'Ikoni (emoji)', type: 'string' }),
            defineField({ name: 'title', title: 'Otsikko', type: 'string' }),
            defineField({ name: 'description', title: 'Kuvaus', type: 'text', rows: 2 }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),

    // ── Program highlights ────────────────────────────────────
    defineField({
      name: 'highlights',
      title: 'Ohjelmanostot',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Otsikko', type: 'string' }),
            defineField({ name: 'description', title: 'Kuvaus', type: 'text', rows: 2 }),
            defineField({ name: 'image', title: 'Kuva', type: 'image', options: { hotspot: true } }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),

    // ── Family area / kids obstacle course ───────────────────
    defineField({
      name: 'familyAreaBlock',
      title: 'Perhe- ja lapsialue',
      type: 'object',
      description: 'Sisältää lasten temppuradan ja muut perheaktiviteetit',
      fields: [
        defineField({
          name: 'title',
          title: 'Osion otsikko',
          type: 'string',
          initialValue: 'Koko perheelle',
        }),
        defineField({
          name: 'description',
          title: 'Kuvaus',
          type: 'array',
          of: [{ type: 'block' }],
        }),
        defineField({
          name: 'familyAreaImage',
          title: 'Perhealueen kuva',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'kidsAreaTitle',
          title: 'Lasten temppuradan otsikko',
          type: 'string',
          initialValue: 'Lasten temppurata',
          description: 'Näkyy sivulla suoraan',
        }),
        defineField({
          name: 'kidsAreaPartner',
          title: 'Lasten temppuradan vastuukumppani',
          type: 'object',
          description: 'Kumppani joka vastaa lasten temppuradasta (esim. Liikenneturva)',
          fields: [
            defineField({
              name: 'partnerRef',
              title: 'Kumppani (viittaus)',
              type: 'reference',
              to: [{ type: 'partnerHighlight' }],
              description: 'Valitse Yhteistyökumppanit-listasta',
            }),
            defineField({
              name: 'displayNote',
              title: 'Näytettävä teksti',
              type: 'string',
              initialValue: 'yhteistyössä Liikenneturvan kanssa',
              description: 'Esim. "yhteistyössä Liikenneturvan kanssa" — näkyy sivulla otsikon perässä',
            }),
          ],
        }),
      ],
    }),

    // ── Skate Jam ─────────────────────────────────────────────
    defineField({
      name: 'skateJamRef',
      title: 'Skate Jam -viittaus',
      type: 'reference',
      to: [{ type: 'skateJamBlock' }],
    }),
    defineField({
      name: 'skateJamImage',
      title: 'Skate Jam -kuva',
      type: 'image',
      options: { hotspot: true },
    }),

    // ── Company / sponsor sales ───────────────────────────────
    defineField({
      name: 'companySalesBlock',
      title: 'Yritysmyynti ja sponsorointi',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Otsikko',
          type: 'string',
          initialValue: 'Näkyvyyttä oikealle yleisölle',
        }),
        defineField({
          name: 'intro',
          title: 'Myyntiviesti',
          type: 'text',
          rows: 5,
        }),
        defineField({
          name: 'sponsorSectionImage',
          title: 'Sponsoriosion kuva',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'packages',
          title: 'Sponsoripaketit',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'sponsorPackage' }] }],
          description: 'Järjestä tärkeysjärjestykseen',
        }),
      ],
    }),

    // ── Competitor info ──────────────────────────────────────
    defineField({
      name: 'competitorInfoBlock',
      title: 'Kilpailijoiden info',
      type: 'object',
      fields: [
        defineField({
          name: 'heroTitle',
          title: 'Hero-otsikko',
          type: 'string',
          initialValue: 'Biketrial SM-Cup Hämeenlinna',
        }),
        defineField({
          name: 'intro',
          title: 'Lyhyt intro',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'competitionName',
          title: 'Kilpailun nimi',
          type: 'string',
          initialValue: 'Biketrial SM-Cup osakilpailu',
        }),
        defineField({
          name: 'whoIsItFor',
          title: 'Kenelle kilpailu on',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'kilpailukutsuUrl',
          title: 'Kilpailukutsu URL',
          type: 'url',
        }),
        defineField({
          name: 'ilmoittautuneetUrl',
          title: 'Ilmoittautuneet URL',
          type: 'url',
        }),
        defineField({
          name: 'tuloksetUrl',
          title: 'Tulokset URL',
          type: 'url',
        }),
        defineField({
          name: 'classes',
          title: 'Kilpailuluokat',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Luokan nimi', type: 'string' }),
                defineField({ name: 'description', title: 'Kuvaus', type: 'text', rows: 2 }),
              ],
              preview: { select: { title: 'title' } },
            },
          ],
        }),
        defineField({
          name: 'participationNotes',
          title: 'Osallistumisinfo',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'arrivalNotes',
          title: 'Saapumisohjeet',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'checklist',
          title: 'Kilpailijan muistilista',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'contact',
          title: 'Yhteyshenkilö',
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Nimi', type: 'string' }),
            defineField({ name: 'email', title: 'Sähköposti', type: 'string' }),
            defineField({ name: 'phone', title: 'Puhelin', type: 'string' }),
          ],
        }),
      ],
    }),

    // ── Contact CTA ───────────────────────────────────────────
    defineField({
      name: 'contactCta',
      title: 'Yhteydenotto-CTA',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Otsikko', type: 'string', initialValue: 'Kiinnostunut? Ota yhteyttä.' }),
        defineField({ name: 'text', title: 'Teksti', type: 'text', rows: 2 }),
        defineField({ name: 'email', title: 'Sähköposti', type: 'string' }),
        defineField({ name: 'buttonLabel', title: 'Painikkeen teksti', type: 'string', initialValue: 'Lähetä viesti' }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'BikeFest-sivu' }),
  },
})
