# Bikefest Studio Repository

Tässä repossa on kaksi eri sovellusta:

- repojuuri: Sanity Studio
- [`web/`](/Users/heidi/Documents/Bikefest 2026/www-sivut/bikefest-studio/web): Next.js-frontend

## Tärkeä deploy-huomio

Verceliin pitää deployata **vain** Next.js-sivusto hakemistosta `web/`.

- Älä deployaa repojuurta, jos tarkoitus on julkaista sivusto
- Repojuuri käynnistää Sanity Studion, ei julkista verkkosivua
- Oikea Vercel `Root Directory` on: `web`

Tarkemmat julkaisuohjeet löytyvät tiedostosta [DEPLOYMENT.md](/Users/heidi/Documents/Bikefest 2026/www-sivut/bikefest-studio/DEPLOYMENT.md).

## Paikallinen kehitys

Sanity Studio repojuuressa:

```bash
npm install
npm run dev
```

Next.js-sivusto `web/`-hakemistossa:

```bash
cd web
npm install
npm run dev
```
