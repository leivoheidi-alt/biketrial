import type { NextPageContext } from 'next'

type ErrorPageProps = {
  statusCode?: number
}

function ErrorPage({ statusCode }: ErrorPageProps) {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        color: '#fff',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: "var(--font-anton), 'Bebas Neue', 'Oswald', Impact, sans-serif",
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
            lineHeight: 1.05,
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            marginBottom: '1rem',
          }}
        >
          Tapahtui virhe
        </h1>
        <p style={{ color: '#D1D1D1', fontSize: '1rem', lineHeight: 1.6 }}>
          {statusCode ? `Virhekoodi ${statusCode}.` : 'Jotain meni pieleen.'}
        </p>
      </div>
    </main>
  )
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 500
  return { statusCode }
}

export default ErrorPage
