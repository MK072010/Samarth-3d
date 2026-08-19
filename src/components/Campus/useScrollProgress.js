import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Tracks scroll progress (0 -> 1) as `containerRef` moves through the
 * viewport. Exposes both a mutable ref (read every R3F frame, zero
 * re-renders) and a bucketed React state value (0 / 1 / 2) for UI that
 * needs to re-render, like hotspot emphasis.
 */
export default function useScrollProgress(containerRef, reducedMotion) {
  const progressRef = useRef(0)
  const [bucket, setBucket] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return undefined

    if (reducedMotion) {
      progressRef.current = 0.5
      setBucket(1)
      return undefined
    }

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress
        const next = self.progress < 0.33 ? 0 : self.progress < 0.66 ? 1 : 2
        setBucket((prev) => (prev === next ? prev : next))
      },
    })

    return () => trigger.kill()
  }, [containerRef, reducedMotion])

  return { progressRef, bucket }
}
