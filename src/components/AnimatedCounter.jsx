import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

// Counts from 0 to `value` when scrolled into view. Reduced motion snaps
// straight to the final value instead of animating.
export default function AnimatedCounter({ value, suffix = '', prefix = '', reducedMotion = false, duration = 1.6 }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(reducedMotion ? value : 0)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    if (reducedMotion) {
      setDisplay(value)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        const proxy = { v: 0 }
        gsap.to(proxy, {
          v: value,
          duration,
          ease: 'power2.out',
          onUpdate: () => setDisplay(Math.round(proxy.v)),
        })
        observer.disconnect()
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration, reducedMotion])

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
