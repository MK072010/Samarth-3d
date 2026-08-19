import { useRef } from 'react'
import gsap from 'gsap'

// Phase 5: adds subtle 3D hover depth (rotateX/Y tied to pointer position,
// not just translate) and a tactile press state for mouse + touch, so every
// CTA across the site — hero, nav, admissions, contact — picks up the same
// premium micro-interaction without each section reimplementing it.
export default function MagneticButton({
  as: Tag = 'button',
  children,
  className = '',
  reducedMotion = false,
  strength = 1,
  depth = true,
  ...props
}) {
  const ref = useRef(null)

  const handleMove = (e) => {
    if (reducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    gsap.to(ref.current, {
      x: relX * 0.28 * strength,
      y: relY * 0.35 * strength,
      rotateX: depth ? (-relY / (rect.height / 2)) * 8 * strength : 0,
      rotateY: depth ? (relX / (rect.width / 2)) * 10 * strength : 0,
      duration: 0.5,
      ease: 'power3.out',
      transformPerspective: 600,
    })
  }

  const handleLeave = () => {
    if (reducedMotion || !ref.current) return
    gsap.to(ref.current, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
  }

  const handlePressIn = () => {
    if (reducedMotion || !ref.current) return
    gsap.to(ref.current, { scale: 0.96, duration: 0.15, ease: 'power2.out' })
  }

  const handlePressOut = () => {
    if (reducedMotion || !ref.current) return
    gsap.to(ref.current, { scale: 1, duration: 0.45, ease: 'power3.out' })
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseDown={handlePressIn}
      onMouseUp={handlePressOut}
      onTouchStart={handlePressIn}
      onTouchEnd={handlePressOut}
      onTouchCancel={handlePressOut}
      className={className}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      {...props}
    >
      {children}
    </Tag>
  )
}
