import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Reveal from './Reveal.jsx'
import MagneticButton from './MagneticButton.jsx'

export default function FinalCTA({ reducedMotion }) {
  const glowRef = useRef(null)

  useEffect(() => {
    if (!glowRef.current || reducedMotion) return undefined
    const tween = gsap.to(glowRef.current, {
      scale: 1.12,
      opacity: 0.85,
      duration: 5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
    return () => tween.kill()
  }, [reducedMotion])

  return (
    <section className="relative overflow-hidden bg-ink-900 px-6 py-28 sm:py-36">
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-azure-600/20 blur-[130px]"
      />
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-[0.4]" />

      <Reveal reducedMotion={reducedMotion} className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="eyebrow">Admissions — Session 2026–27</span>
        <h2 className="mt-6 font-display text-4xl font-normal leading-tight text-mist-50 sm:text-5xl">
          Give Your Child a Stronger Tomorrow.
        </h2>
        <p className="mt-6 max-w-lg text-base font-light text-mist-300 sm:text-lg">
          A rigorous education, a caring campus, and a faculty who show up for every student —
          every single day.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <MagneticButton
            as="a"
            href="#about"
            reducedMotion={reducedMotion}
            className="glass inline-flex items-center gap-2 rounded-full px-9 py-4 text-sm font-medium text-mist-100 transition-colors duration-300 hover:border-azure-400/40"
          >
            Explore Samarth School
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#enquiry"
            reducedMotion={reducedMotion}
            className="inline-flex items-center gap-2 rounded-full bg-azure-500 px-9 py-4 text-sm font-medium text-ink-950 shadow-glow transition-colors duration-300 hover:bg-azure-400"
          >
            Start Admission Enquiry
          </MagneticButton>
        </div>
      </Reveal>
    </section>
  )
}
