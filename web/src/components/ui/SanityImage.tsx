import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { SanityImage as SanityImageType } from '@/types/sanity'

interface Props {
  image: SanityImageType
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
}

export default function SanityImage({
  image,
  alt,
  width = 800,
  height = 600,
  className,
  priority = false,
  fill = false,
}: Props) {
  if (!image?.asset) return null

  const src = urlFor(image).width(width).height(height).auto('format').url()

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  )
}
