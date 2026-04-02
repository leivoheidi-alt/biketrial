'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

type BikefestHeroMediaProps = {
  fallbackSrc: string
  fallbackAlt: string
  videoSrc: string
}

export default function BikefestHeroMedia({
  fallbackSrc,
  fallbackAlt,
  videoSrc,
}: BikefestHeroMediaProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [hasVideoError, setHasVideoError] = useState(false)

  const handleToggleMuted = async () => {
    const video = videoRef.current
    if (!video) return

    const nextMuted = !video.muted
    video.muted = nextMuted
    setIsMuted(nextMuted)

    try {
      await video.play()
    } catch {
      video.muted = true
      setIsMuted(true)
    }
  }

  return (
    <div className="relative flex h-full w-full items-stretch justify-center overflow-hidden rounded-2xl border border-[#2A2A2A] bg-black">
      <Image
        src={fallbackSrc}
        alt={fallbackAlt}
        fill
        className="object-cover object-center"
        sizes="(min-width: 1024px) 360px, 100vw"
        priority
      />

      {!hasVideoError ? (
        <video
          ref={videoRef}
          className="relative z-10 h-full w-full object-contain object-center bg-black"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={fallbackSrc}
          aria-label="BikeFest Hämeenlinna promovideo"
          onError={() => setHasVideoError(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-black/60 via-black/22 to-transparent"
      />

      {!hasVideoError ? (
        <button
          type="button"
          onClick={handleToggleMuted}
          aria-label={isMuted ? 'Ota videon ääni käyttöön' : 'Mykistä video'}
          className="absolute bottom-4 right-4 z-30 inline-flex items-center justify-center rounded-full border border-white/14 bg-black/55 px-4 py-2 text-xs font-bold tracking-[0.04em] text-white shadow-[0_10px_30px_rgba(0,0,0,0.28)] transition hover:border-white/28 hover:bg-black/72"
        >
          {isMuted ? '🔊 Kuuntele fiilis' : '🔇 Mykistä'}
        </button>
      ) : null}
    </div>
  )
}
