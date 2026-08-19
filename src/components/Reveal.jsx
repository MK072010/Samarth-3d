import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Phase 5: section reveals now carry a touch of depth (slight scale-up +
// blur-to-focus) instead of a flat fade/slide, so scroll transitions read
// as "camera pulling into frame" rather than a UI fade. The blur step is
// skipped on coarse-pointer (touch) devices — cheap on desktop GPUs, but
// animated CSS blur is one of the pricier paints on mid-range Android, and
// the fade+lift alone already reads as premium there.
export default function Reveal({
  children,
  className = '',
  y = 32,
  scale = 0.97,
  blur = 5,
  delay = 0,
  reducedMotion = false,
  as: Tag = 'div',
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    if (reducedMotion) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' })
      return undefined
    }

    const isCoarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
    const useBlur = !isCoarse && blur > 0

    gsap.set(el, { opacity: 0, y, scale, filter: useBlur ? `blur(${blur}px)` : 'blur(0px)' })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.1,
            delay,
            ease: 'power3.out',
            onComplete: () => {
              // Drop the will-change hint once settled so idle sections
              // don't keep a compositor layer alive for nothing.
              gsap.set(el, { clearProps: 'filter,will-change' })
            },
          })
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [y, scale, blur, delay, reducedMotion])

  return (
    <Tag ref={ref} className={className} style={{ willChange: 'transform, opacity' }}>
      {children}
    </Tag>
  )
}
