import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useProgress } from '@react-three/drei'

// Real asset progress (HDRI environment, fonts) blended with a time floor so
// the bar never stalls at 0% and never insta-jumps to 100%. Hard-capped so a
// slow network never turns this into "unnecessary waiting time" — Phase 5
// spec is explicit that the loader must not stall the experience.
const MIN_DISPLAY_MS = 700
const MAX_WAIT_MS = 2400

export default function LoadingScreen({ reducedMotion, onDone }) {
  const { progress } = useProgress()
  const [displayProgress, setDisplayProgress] = useState(0)
  const rootRef = useRef(null)
  const contentRef = useRef(null)
  const startedAt = useRef(Date.now())
  const finishedRef = useRef(false)
  const progressRef = useRef(0)

  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  useEffect(() => {
    let raf

    const finish = () => {
      setDisplayProgress(100)
      const el = rootRef.current
      if (!el) {
        onDone?.()
        return
      }
      if (reducedMotion) {
        gsap.to(el, { opacity: 0, duration: 0.3, onComplete: onDone })
        return
      }
      const tl = gsap.timeline({ onComplete: onDone })
      tl.to(contentRef.current, { opacity: 0, y: -16, duration: 0.5, ease: 'power2.inOut' })
        .to(
          el,
          {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 0.95,
            ease: 'power4.inOut',
          },
          '-=0.15'
        )
    }

    const loop = () => {
      const elapsed = Date.now() - startedAt.current
      const timeFloor = Math.min(94, (elapsed / MAX_WAIT_MS) * 100)
      const target = reducedMotion ? 100 : Math.max(progressRef.current, timeFloor)

      setDisplayProgress((d) => {
        const next = d + (target - d) * 0.15
        return next > 99.4 ? 100 : next
      })

      const readyToClose =
        (progressRef.current >= 100 || elapsed >= MAX_WAIT_MS) && elapsed >= MIN_DISPLAY_MS

      if (readyToClose && !finishedRef.current) {
        finishedRef.current = true
        finish()
        return
      }
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  const pct = Math.round(displayProgress)

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-[0.35]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(7,10,16,0.85)_100%)]" />

      <div ref={contentRef} className="relative flex flex-col items-center px-6">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-brass-500/50">
          <span className="font-display text-xl text-brass-500">S</span>
        </div>

        <span className="eyebrow mb-3 !text-mist-400">Samarth School</span>

        <div className="h-px w-40 overflow-hidden bg-mist-400/15 sm:w-56">
          <div
            className="h-full bg-gradient-to-r from-azure-500 to-brass-500 transition-[width] duration-150 ease-linear"
            style={{ width: `${displayProgress}%` }}
          />
        </div>

        <span className="mt-4 font-mono text-[11px] tabular-nums tracking-widest2 text-mist-400/70">
          {pct.toString().padStart(2, '0')}%
        </span>
      </div>
    </div>
  )
}
