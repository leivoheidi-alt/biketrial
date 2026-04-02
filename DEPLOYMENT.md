# Vercel deployment: julkaise vain `web/`

Tässä repossa on:

- repojuuressa Sanity Studio
- [`web/`](/Users/heidi/Documents/Bikefest 2026/www-sivut/bikefest-studio/web) hakemistossa Next.js-sivusto

Jos Vercel deployaa repojuuren, se voi tunnistaa projektin väärin Sanity Studioksi. Siksi julkaisu pitää kohdistaa vain `web/`-hakemistoon.

## Oikeat Vercel-asetukset

Projektia luodessa tai korjatessa Vercelissä käytä näitä:

- Framework Preset: `Next.js`
- Root Directory: `web`
- Install Command: jätä oletus tai käytä `npm install`
- Build Command: jätä oletus tai käytä `npm run build`
- Output Directory: jätä tyhjäksi

## Ympäristömuuttujat

Lisää Verceliin nämä frontendin ympäristömuuttujat:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=37jgdll0
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

Valinnainen vain jos frontend tarvitsee myöhemmin draft-sisältöä:

```bash
SANITY_API_READ_TOKEN=
```

## Käytännön julkaisuohje

1. Luo uusi Vercel-projekti tai avaa nykyinen projekti
2. Aseta `Root Directory` arvoon `web`
3. Varmista että framework on `Next.js`
4. Lisää yllä olevat ympäristömuuttujat
5. Tee uusi deploy

## Suositus

Jos nykyinen Vercel-projekti on aiemmin deployannut Sanity Studion repojuuresta, turvallisin ratkaisu on:

1. luoda frontendille uusi Vercel-projekti
2. asettaa heti `Root Directory = web`
3. lisätä ympäristömuuttujat uudelleen

Tämä vähentää riskiä, että vanha root-projekti tai välimuisti käyttää vääriä asetuksia.
