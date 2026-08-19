import { useEffect, useRef, useState } from 'react'
import CampusScrollScene from './CampusScrollScene.jsx'
import Fallback from '../Hero/Fallback.jsx'
import useScrollProgress from './useScrollProgress.js'
import { getQualityTier, detectWebGL } from '../../lib/deviceCapability.js'

const TIER_DOWNGRADE = { high: 'medium', medium: 'low', low: 'low' }

const CAPTIONS = [
  { eyebrow: 'Arrival', title: 'A campus built to be walked, not just visited.' },
  { eyebrow: 'The Library Wing', title: 'Sixty acres of quiet, purposeful space.' },
  { eyebrow: 'The Academic Block', title: 'Every classroom is a five-minute walk away.' },
]

export default function CampusExperience({ reducedMotion }) {
  const containerRef = useRef(null)
  const [webglOK, setWebglOK] = useState(true)
  const [tier, setTier] = useState('high')
  const { progressRef, bucket } = useScrollProgress(containerRef, reducedMotion)

  useEffect(() => {
    setWebglOK(detectWebGL())
    setTier(getQualityTier())
  }, [])

  const handleTierDrop = () => setTier((t) => TIER_DOWNGRADE[t] || 'low')

  return (
    <section id="campus" ref={containerRef} className="relative bg-ink-950" style={{ height: reducedMotion ? 'auto' : '300vh' }}>
      <div className={reducedMotion ? 'relative h-[100svh] min-h-[560px] w-full' : 'sticky top-0 h-[100svh] min-h-[560px] w-full'}>
        <div className="absolute inset-0">
          {webglOK ? (
            <CampusScrollScene tier={tier} reducedMotion={reducedMotion} progressRef={progressRef} onTierDrop={handleTierDrop} />
          ) : (
            <Fallback />
          )}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/50" />

        <div className="relative z-10 flex h-full w-full flex-col justify-between px-6 py-16 sm:px-10">
          <div className="max-w-md">
            <span className="eyebrow">Our Campus</span>
            <h2 className="mt-4 font-display text-3xl font-normal leading-tight text-mist-50 sm:text-4xl">
              Walk the grounds before you ever set foot on them.
            </h2>
            <p className="mt-4 max-w-sm text-sm font-light text-mist-300 sm:text-base">
              {reducedMotion
                ? 'Explore the library wing, science and computer labs, main academic block, and Founders Plaza — tap any marker for details.'
                : 'Scroll to move through campus. Tap or hover any glowing marker for details on that space.'}
            </p>
          </div>

          {!reducedMotion && (
            <div className="max-w-xs self-end text-right transition-opacity duration-500">
              <span className="eyebrow !text-brass-500">{CAPTIONS[bucket].eyebrow}</span>
              <p className="mt-2 font-display text-xl text-mist-50 sm:text-2xl">{CAPTIONS[bucket].title}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
