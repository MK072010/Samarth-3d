import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Drives Lenis off GSAP's ticker so scroll-triggered GSAP animations and
// smooth-scroll stay perfectly in sync, and keeps ScrollTrigger's internal
// scroll position in lockstep with Lenis (needed for the scroll-scrubbed
// camera work and Facilities/Academics reveals in Phase 2). Disabled
// entirely when the user prefers reduced motion, falling back to native
// scrolling and instant-state animations.
export default function useLenis(reducedMotion) {
  useEffect(() => {
    if (reducedMotion) return undefined

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const onTick = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    // Nav/footer anchor links (#about, #campus, etc.) are plain <a> tags, so
    // without this they'd hard-jump via native browser scroll and skip past
    // Lenis entirely — jarring against everything else on the page being
    // smoothed. Route them through Lenis instead, offset for the fixed navbar.
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const id = anchor.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      const navOffset = window.innerWidth >= 1280 ? 88 : 0
      lenis.scrollTo(target, { offset: -navOffset, duration: 1.4 })
    }
    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      gsap.ticker.remove(onTick)
      lenis.off('scroll', ScrollTrigger.update)
      lenis.destroy()
    }
  }, [reducedMotion])
}
