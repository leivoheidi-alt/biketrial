import type { PortableTextBlock } from '@/types/sanity'

interface Props {
  value: PortableTextBlock[]
  className?: string
}

export default function PortableTextRenderer({ value, className }: Props) {
  if (!value?.length) return null

  return (
    <div className={`space-y-4 ${className ?? ''}`}>
      {value.map((block) => {
        if (block._type !== 'block') return null

        const text = block.children
          .map((child) => child.text)
          .join('')

        switch (block.style) {
          case 'h2':
            return (
              <h2
                key={block._key}
                className="text-3xl text-white mt-8 mb-3 leading-none"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
              >
                {text}
              </h2>
            )
          case 'h3':
            return (
              <h3
                key={block._key}
                className="text-2xl text-white mt-6 mb-2 leading-none"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
              >
                {text}
              </h3>
            )
          case 'blockquote':
            return (
              <blockquote
                key={block._key}
                className="border-l-4 border-[#FF6A00] pl-5 text-[#B3B3B3] italic text-lg my-5"
              >
                {text}
              </blockquote>
            )
          default:
            return (
              <p key={block._key} className="text-[#B3B3B3] leading-relaxed text-lg">
                {text}
              </p>
            )
        }
      })}
    </div>
  )
}
