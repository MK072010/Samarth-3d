import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function MobileMenu({ open, onClose, links, reducedMotion }) {
  const panelRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    if (!panelRef.current) return

    if (open) {
      document.body.style.overflow = 'hidden'
      if (reducedMotion) {
        gsap.set(panelRef.current, { autoAlpha: 1 })
        gsap.set(listRef.current.children, { opacity: 1, y: 0 })
        return
      }
      gsap.set(panelRef.current, { autoAlpha: 1 })
      gsap.fromTo(panelRef.current, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'power4.out' })
      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, delay: 0.2, ease: 'power3.out' }
      )
    } else {
      document.body.style.overflow = ''
      if (reducedMotion) {
        gsap.set(panelRef.current, { autoAlpha: 0 })
        return
      }
      gsap.to(panelRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.45,
        ease: 'power3.in',
        onComplete: () => gsap.set(panelRef.current, { autoAlpha: 0 }),
      })
    }
  }, [open, reducedMotion])

  return (
    <div
      ref={panelRef}
      className="invisible fixed inset-0 z-[60] flex flex-col bg-ink-950/98 px-6 pt-6 opacity-0 lg:hidden"
      style={{ clipPath: 'inset(0 0 100% 0)' }}
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-lg text-mist-50">Samarth</span>
        <button aria-label="Close menu" onClick={onClose} className="flex h-10 w-10 items-center justify-center text-2xl text-mist-100">
          ×
        </button>
      </div>

      <ul ref={listRef} className="mt-16 flex flex-col gap-1">
        {links.map((link) => (
          <li key={link.href} className="border-b border-white/5 py-4">
            <a
              href={link.href}
              onClick={onClose}
              className="font-display text-3xl text-mist-100 transition-colors duration-300 hover:text-azure-300"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#admissions"
        onClick={onClose}
        className="mt-auto mb-10 inline-flex items-center justify-center rounded-full bg-azure-500 py-4 text-sm font-medium text-ink-950"
        style={{ marginBottom: 'max(2.5rem, env(safe-area-inset-bottom))' }}
      >
        Apply Now
      </a>
    </div>
  )
}
