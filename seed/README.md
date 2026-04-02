# Seed-sisältö — BikeFest / biketrial.fi

Tämä kansio sisältää valmiin sisältödatan Sanity-projektille.

## Dokumentit

| _id | Tyyppi | Sisältö |
|-----|--------|---------|
| `siteSettings` | siteSettings | Sivuston nimi, nav, yhteystieto |
| `homepage` | homepage | Hero, 2 entrykorttia, nostot |
| `clubPage` | clubPage | Seurasivu kaikilla kentillä, FAQ, CTA |
| `beginner-course-2026` | beginnerCourse | Torstaina 7.5.2026 klo 17.30 |
| `bikefestPage` | bikefestPage | Koko tapahtumusivu, viittaukset paketeihin ja kumppaneihin |
| `liikenneturva-partner` | partnerHighlight | Liikenneturva yhteistyökumppanina |
| `skate-jam-2026` | skateJamBlock | Hämeenlinnan Skeitti Ry, sarjat, best trick |
| `sponsor-main` | sponsorPackage | 🏅 Pääsponsori — pyydä tarjous |
| `sponsor-gold` | sponsorPackage | 🥇 Kulta — 1 500 € |
| `sponsor-silver` | sponsorPackage | 🥈 Hopea — 950 € |
| `sponsor-bronze` | sponsorPackage | 🥉 Pronssi — 400 € |
| `program-1` … `program-8` | programItem | Päiväohjelma klo 10–18 |

## Asennus

```bash
# 1. Mene studio-kansioon
cd /Users/heidi/Documents/Bikefest\ 2026/www-sivut/bikefest-studio

# 2. Tuo seed-data tuotantotietokantaan
npx sanity dataset import seed/seed.ndjson production

# Jos haluat korvata olemassaolevat dokumentit:
npx sanity dataset import seed/seed.ndjson production --replace
```

## Huomio

- Liikenneturva on mallinnettu `partnerHighlight`-dokumenttina (`liikenneturva-partner`)
- BikeFest-sivun `familyAreaBlock.kidsAreaPartner` viittaa siihen
- Sponsoripaketit on järjestetty `sortOrder`-kentällä (1–4)
- Kulta-paketti on merkitty `highlighted: true` → näkyy "Suosituin"-merkinnällä
