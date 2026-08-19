import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Two or three softly-blurred glow layers that drift at different speeds
 * as the section scrolls past, giving flat sections a sense of depth
 * without touching WebGL. Speeds < 1 drift slower than scroll (feels far),
 * speeds > 1 drift faster (feels near).
 */
export default function ParallaxLayer({ reducedMotion = false, className = '', speed = 0.3, children }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion) return undefined

    const trigger = ScrollTrigger.create({
      trigger: el.parentElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(el, { yPercent: self.progress * 100 * speed - 50 * speed })
      },
    })

    return () => trigger.kill()
  }, [reducedMotion, speed])

  return (
    <div ref={ref} className={`pointer-events-none absolute ${className}`}>
      {children}
    </div>
  )
}
