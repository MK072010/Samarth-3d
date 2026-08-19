import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import DuotoneImage from '../DuotoneImage.jsx'
import { IconClose, IconChevronLeft, IconChevronRight } from '../icons.jsx'

const SWIPE_THRESHOLD = 50

export default function GalleryLightbox({ items, index, onClose, onPrev, onNext, reducedMotion }) {
  const frameRef = useRef(null)
  const touchStart = useRef(null)

  const item = items[index]

  // Entrance + per-slide crossfade
  useEffect(() => {
    if (!frameRef.current) return undefined
    if (reducedMotion) {
      gsap.set(frameRef.current, { opacity: 1, scale: 1 })
      return undefined
    }
    gsap.fromTo(
      frameRef.current,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' }
    )
    return undefined
  }, [index, reducedMotion])

  // Keyboard support
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return
    const delta = e.changedTouches[0].clientX - touchStart.current
    if (delta > SWIPE_THRESHOLD) onPrev()
    else if (delta < -SWIPE_THRESHOLD) onNext()
    touchStart.current = null
  }

  if (!item) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-950/96 px-4 backdrop-blur-sm sm:px-8"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        aria-label="Close gallery"
        onClick={onClose}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-mist-100 transition-colors duration-300 hover:border-azure-400/50 hover:text-azure-300 sm:right-8 sm:top-8"
      >
        <IconClose className="h-5 w-5" />
      </button>

      <span className="absolute left-4 top-4 font-mono text-xs text-mist-400 sm:left-8 sm:top-8">
        {index + 1} / {items.length}
      </span>

      <button
        aria-label="Previous image"
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-mist-100 transition-colors duration-300 hover:border-azure-400/50 hover:text-azure-300 sm:left-6"
      >
        <IconChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Next image"
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-mist-100 transition-colors duration-300 hover:border-azure-400/50 hover:text-azure-300 sm:right-6"
      >
        <IconChevronRight className="h-5 w-5" />
      </button>

      <div
        ref={frameRef}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[82vh] w-full max-w-4xl flex-col items-center"
      >
        <DuotoneImage
          src={item.src}
          alt={item.title}
          eager
          fit="contain"
          className="flex max-h-[68vh] w-full items-center justify-center rounded-xl border border-white/10"
          imgClassName="max-h-[68vh] w-auto"
        />
        <div className="mt-5 text-center">
          <span className="eyebrow">{item.category}</span>
          <h3 className="mt-2 font-display text-lg text-mist-50 sm:text-xl">{item.title}</h3>
        </div>
      </div>
    </div>
  )
}
