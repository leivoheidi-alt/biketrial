import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kilpailukutsu',
  description:
    'BikeFest Hämeenlinna 27.6.2026 kilpailukutsu: aikataulu, luokat, osallistumismaksu, lisenssit ja ilmoittautuminen.',
}

const signupUrl = 'https://forms.gle/DAYFxLQ8oaBReWTs9'

const scheduleItems = [
  'Ilmoittautuminen klo 10.00–11.30',
  'Tuomarikokous klo 11.30',
  'Kilpailun avaus klo 11.45',
  'Lähtö klo 12.00, kilpailuaika 4 h',
  'Palkintojen jako kilpailun päätteeksi',
]

export default function KilpailukutsuPage() {
  return (
    <main className="bg-black text-white">
      <div className="mx-auto max-w-[860px] px-4 py-10 sm:px-5 sm:py-14 lg:py-20">
        <article className="border border-white/8 bg-[#0E0E0E] px-5 py-7 sm:px-10 sm:py-10 lg:px-12">
          <header className="border-b border-white/10 pb-8">
            <h1 className="text-[clamp(2.2rem,4.8vw,3.4rem)] leading-[1.02] text-white">
              Kilpailukutsu
            </h1>

            <div className="mt-6 space-y-2 text-[1.02rem] leading-[1.65] text-[#E0E0E0] sm:text-[1.08rem]">
              <p>
                <span className="font-semibold text-white">Järjestäjä:</span> Tawast Cycling Club ry
              </p>
              <p>
                <span className="font-semibold text-white">Päivämäärä:</span> Lauantaina 27.6.2026
              </p>
              <p>
                <span className="font-semibold text-white">Paikka:</span> Hämeensaari, Hämeenlinna
              </p>
            </div>

            <div className="mt-6">
              <a
                href={signupUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] items-center rounded-full border border-white/18 px-5 py-2.5 text-[0.95rem] font-semibold text-white transition duration-200 ease-out hover:border-[#FF6A00] hover:text-[#FF6A00]"
              >
                Ilmoittaudu
              </a>
            </div>
          </header>

          <div className="space-y-10 pt-8 sm:space-y-12">
            <section>
              <h2 className="text-[1.4rem] leading-[1.14] text-white sm:text-[1.55rem]">Aikataulu</h2>
              <ul className="mt-4 space-y-2 text-[1.02rem] leading-[1.75] text-[#D6D6D6] sm:text-[1.08rem]">
                {scheduleItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-[1.4rem] leading-[1.14] text-white sm:text-[1.55rem]">Säännöt</h2>
              <p className="mt-4 text-[1.02rem] leading-[1.75] text-[#D6D6D6] sm:text-[1.08rem]">
                Kaikki ajavat porttisäännöillä.
              </p>
            </section>

            <section>
              <h2 className="text-[1.4rem] leading-[1.14] text-white sm:text-[1.55rem]">Jaksojen lukumäärä</h2>
              <p className="mt-4 text-[1.02rem] leading-[1.75] text-[#D6D6D6] sm:text-[1.08rem]">
                5 jaksoa / 3 kierrosta
              </p>
            </section>

            <section>
              <h2 className="text-[1.4rem] leading-[1.14] text-white sm:text-[1.55rem]">Luokat</h2>
              <div className="mt-4 space-y-3 text-[1.02rem] leading-[1.75] text-[#D6D6D6] sm:text-[1.08rem]">
                <p>
                  <span className="font-semibold text-white">Kilpasarjat:</span> Elite, A, B
                </p>
                <p>
                  <span className="font-semibold text-white">Harrastesarjat:</span> C-Super, C-Yleinen, C-Vapaa
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-[1.4rem] leading-[1.14] text-white sm:text-[1.55rem]">Osallistumismaksu</h2>
              <div className="mt-4 space-y-2 text-[1.02rem] leading-[1.75] text-[#D6D6D6] sm:text-[1.08rem]">
                <p>30 €</p>
                <p>Jälki-ilmoittautuminen 40 €</p>
              </div>
            </section>

            <section>
              <h2 className="text-[1.4rem] leading-[1.14] text-white sm:text-[1.55rem]">Maksaminen</h2>
              <div className="mt-4 space-y-3 text-[1.02rem] leading-[1.75] text-[#D6D6D6] sm:text-[1.08rem]">
                <p className="break-words">
                  <span className="font-semibold text-white">Tilinumero:</span>{' '}
                  FI18 5680 7520 0320 39
                </p>
                <p>
                  <span className="font-semibold text-white">Viesti:</span> Kilpailijan nimi ja luokka
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-[1.4rem] leading-[1.14] text-white sm:text-[1.55rem]">Ilmoittautuminen</h2>
              <div className="mt-4 space-y-4 text-[1.02rem] leading-[1.75] text-[#D6D6D6] sm:text-[1.08rem]">
                <p>
                  Ilmoittautumiset alla olevan lomakkeen kautta viimeistään 23.6.2026 klo 23.59 mennessä.
                </p>
                <p>
                  <span className="font-semibold text-white">Ilmoittautuminen:</span>{' '}
                  <a
                    href={signupUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#FF6A00] underline underline-offset-4 transition duration-200 ease-out hover:text-white"
                  >
                    https://forms.gle/DAYFxLQ8oaBReWTs9
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-[1.4rem] leading-[1.14] text-white sm:text-[1.55rem]">Lisenssi</h2>
              <div className="mt-4 space-y-3 text-[1.02rem] leading-[1.75] text-[#D6D6D6] sm:text-[1.08rem]">
                <p>
                  Elite-, A- ja B-luokissa kilpailijalla tulee olla voimassa oleva Suomen Pyöräilyn lisenssi.
                </p>
                <p>Harrastesarjoissa lisenssiä ei tarvita.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[1.4rem] leading-[1.14] text-white sm:text-[1.55rem]">Pysäköinti</h2>
              <p className="mt-4 text-[1.02rem] leading-[1.75] text-[#D6D6D6] sm:text-[1.08rem]">
                Kilpailijoille ja tapahtumavieraille on pysäköintialueet Hämeensaaren läheisyydessä. Tarkemmat pysäköintiohjeet julkaistaan ennen tapahtumaa.
              </p>
            </section>

            <section>
              <h2 className="text-[1.4rem] leading-[1.14] text-white sm:text-[1.55rem]">Lisätiedot</h2>
              <div className="mt-4 space-y-2 text-[1.02rem] leading-[1.75] text-[#D6D6D6] sm:text-[1.08rem]">
                <p>Mikko Leivo</p>
                <p>
                  <a
                    href="tel:0400973299"
                    className="transition duration-200 ease-out hover:text-white"
                  >
                    040 097 3299
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:info@biketrial.fi"
                    className="transition duration-200 ease-out hover:text-white"
                  >
                    info@biketrial.fi
                  </a>
                </p>
              </div>
            </section>
          </div>
        </article>
      </div>
    </main>
  )
}
