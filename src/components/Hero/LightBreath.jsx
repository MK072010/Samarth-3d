import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// Subtle "environmental movement": the two accent point lights (cool blue
// fill, warm brass kicker) breathe in intensity on slow, offset sine waves.
// The amplitude is tiny on purpose — this should read as "the scene is
// alive" at a subconscious level, not as an obvious pulsing light. Skipped
// on 'low' tier and reduced motion, where the lights just hold steady.
export default function LightBreath({ tier = 'high', reducedMotion = false }) {
  const blueRef = useRef()
  const brassRef = useRef()
  const animate = tier !== 'low' && !reducedMotion

  useFrame(({ clock }) => {
    if (!animate) return
    const t = clock.getElapsedTime()
    if (blueRef.current) blueRef.current.intensity = 12 + Math.sin(t * 0.35) * 1.4
    if (brassRef.current) brassRef.current.intensity = 6 + Math.sin(t * 0.5 + 1.3) * 0.9
  })

  return (
    <>
      <pointLight ref={blueRef} position={[-4, 2, -3]} intensity={12} color="#5b8def" distance={12} />
      <pointLight ref={brassRef} position={[3, 1.2, 3.5]} intensity={6} color="#c9a961" distance={8} />
    </>
  )
}
