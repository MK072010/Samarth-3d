import { useState } from 'react'

// Every photo on the site — faculty portraits, gallery frames, event
// thumbnails — runs through the same treatment so stock/placeholder
// photography reads as one deliberate palette instead of raw stock imagery.
// A CSS-only duotone (no canvas/JS filter cost) plus a shimmer skeleton
// while the image loads, so slow connections never show a flash of white.
export default function DuotoneImage({ src, alt = '', className = '', imgClassName = '', sizes, eager = false, fit = 'cover' }) {
  const [loaded, setLoaded] = useState(false)
  const sizeClass = fit === 'contain' ? '' : 'h-full w-full'
  const fitClass = fit === 'contain' ? 'object-contain' : 'object-cover'

  return (
    <div className={`relative overflow-hidden bg-ink-800 ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900" />
      )}
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={`${sizeClass} ${fitClass} transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        style={{ filter: 'grayscale(0.35) contrast(1.05) brightness(0.92)' }}
      />
      {/* Azure/ink duotone wash — ties any photo into the palette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-azure-700/25 via-ink-900/10 to-ink-950/55 mix-blend-multiply" />
      <div className="pointer-events-none absolute inset-0 bg-azure-500/10 mix-blend-color" />
    </div>
  )
}
