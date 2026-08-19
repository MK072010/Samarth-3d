import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Scene from './Scene.jsx'
import Fallback from './Fallback.jsx'
import MagneticButton from '../MagneticButton.jsx'
import { getQualityTier, detectWebGL } from '../../lib/deviceCapability.js'

const TIER_DOWNGRADE = { high: 'medium', medium: 'low', low: 'low' }

export default function Hero({ reducedMotion }) {
  const [webglOK, setWebglOK] = useState(true)
  const [tier, setTier] = useState('high')
  const rootRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const scrollCueRef = useRef(null)

  useEffect(() => {
    setWebglOK(detectWebGL())
    setTier(getQualityTier())
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([eyebrowRef.current, titleRef.current, subRef.current, ctaRef.current], {
          opacity: 1,
          y: 0,
          clearProps: 'transform',
        })
        return
      }

      const tl = gsap.timeline({ delay: 0.5, defaults: { ease: 'power4.out' } })
      tl.fromTo(eyebrowRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 })
        .fromTo(
          titleRef.current.children,
          { opacity: 0, y: 48, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, stagger: 0.12 },
          '-=0.55'
        )
        .fromTo(subRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.6')
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.55')
        .fromTo(scrollCueRef.current, { opacity: 0 }, { opacity: 1, duration: 1 }, '-=0.3')
    }, rootRef)

    return () => ctx.revert()
  }, [reducedMotion])

  const handleTierDrop = () => {
    setTier((t) => TIER_DOWNGRADE[t] || 'low')
  }

  return (
    <section ref={rootRef} id="home" className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-ink-900">
      {/* 3D layer */}
      <div className="absolute inset-0">
        {webglOK ? (
          <Scene tier={tier} reducedMotion={reducedMotion} onTierDrop={handleTierDrop} />
        ) : (
          <Fallback />
        )}
      </div>

      {/* Cinematic vignette + grade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-ink-900/40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(7,10,16,0.55)_100%)]" />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <span ref={eyebrowRef} className="eyebrow mb-6 opacity-0">
          Samarth School &nbsp;·&nbsp; Est. 1962
        </span>

        <h1
          ref={titleRef}
          className="max-w-4xl text-gradient-azure font-display text-[2.6rem] font-normal leading-[1.05] sm:text-6xl md:text-7xl"
        >
          <span className="block">Where ambition</span>
          <span className="block">is given a foundation.</span>
        </h1>

        <p ref={subRef} className="mt-7 max-w-xl text-balance text-base font-light text-mist-300 sm:text-lg opacity-0">
          A school built on rigorous academics, considered design, and a campus engineered
          for how students actually think — from their first classroom to their last exam.
        </p>

        <div ref={ctaRef} className="mt-10 flex flex-col items-center gap-4 opacity-0 sm:flex-row">
          <MagneticButton
            as="a"
            href="#about"
            reducedMotion={reducedMotion}
            className="group relative inline-flex items-center gap-2 rounded-full bg-azure-500 px-8 py-3.5 text-sm font-medium text-ink-950 shadow-glow transition-colors duration-300 hover:bg-azure-400"
          >
            Explore Our School
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </MagneticButton>

          <MagneticButton
            as="a"
            href="#campus"
            reducedMotion={reducedMotion}
            className="glass inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-mist-100 transition-colors duration-300 hover:border-azure-400/40"
          >
            Discover Campus
          </MagneticButton>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 opacity-0"
      >
        <span className="eyebrow !text-mist-400">Scroll</span>
        <div className="h-9 w-[1px] bg-gradient-to-b from-mist-400/70 to-transparent" />
      </div>
    </section>
  )
}
