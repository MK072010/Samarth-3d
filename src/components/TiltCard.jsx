import { useRef } from 'react'
import gsap from 'gsap'

// Shared tilt-on-hover/touch interaction so Academics and Facilities cards
// feel like the same physical material as the Phase 1 campus cards.
export default function TiltCard({ children, className = '', reducedMotion = false, intensity = 1 }) {
  const ref = useRef(null)

  const applyTilt = (relX, relY) => {
    if (reducedMotion || !ref.current) return
    gsap.to(ref.current, {
      rotateX: relY * -7 * intensity,
      rotateY: relX * 9 * intensity,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 750,
    })
  }

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    applyTilt((e.clientX - rect.left) / rect.width - 0.5, (e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleTouch = (e) => {
    const t = e.touches?.[0]
    if (!t) return
    const rect = ref.current.getBoundingClientRect()
    applyTilt((t.clientX - rect.left) / rect.width - 0.5, (t.clientY - rect.top) / rect.height - 0.5)
  }

  const handleLeave = () => {
    if (reducedMotion || !ref.current) return
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'power3.out' })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onTouchMove={handleTouch}
      onTouchEnd={handleLeave}
      className={className}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {children}
    </div>
  )
}
