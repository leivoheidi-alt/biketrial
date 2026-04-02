import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-8xl mb-6">🚲</div>
        <h1
          className="text-[8rem] text-[#FF6A00] leading-none mb-2"
          style={{ fontFamily: 'var(--font-anton), Impact, sans-serif' }}
        >
          404
        </h1>
        <p className="text-[#B3B3B3] text-lg mb-8">
          Sivua ei löydy — ehkä pyörä meni väärään suuntaan.
        </p>
        <Link href="/" className="btn-primary">
          Takaisin etusivulle
        </Link>
      </div>
    </div>
  )
}
