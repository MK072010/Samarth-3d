import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Three authored shots: wide establishing view, a pass along the library
// wing, and a close approach toward the entrance/crest. Progress scrubs
// smoothly between them so the camera move feels directed rather than
// free-roaming — deliberately not an orbit control.
const KEYFRAMES = [
  { p: 0, pos: [0, 3.4, 12.5], look: [0, 0.2, 0] },
  { p: 0.5, pos: [-5.4, 1.5, 6.2], look: [-2.2, 0.1, 0] },
  { p: 1, pos: [3.6, 0.9, 4.4], look: [1.2, 0.4, 0.6] },
]

function sampleKeyframes(t) {
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    const a = KEYFRAMES[i]
    const b = KEYFRAMES[i + 1]
    if (t >= a.p && t <= b.p) {
      const local = (t - a.p) / (b.p - a.p)
      const eased = local * local * (3 - 2 * local) // smoothstep
      return {
        pos: a.pos.map((v, idx) => THREE.MathUtils.lerp(v, b.pos[idx], eased)),
        look: a.look.map((v, idx) => THREE.MathUtils.lerp(v, b.look[idx], eased)),
      }
    }
  }
  const last = KEYFRAMES[KEYFRAMES.length - 1]
  return { pos: last.pos, look: last.look }
}

export default function ScrollCameraRig({ progressRef, reducedMotion }) {
  const { camera } = useThree()
  const pointer = useRef({ x: 0, y: 0 })
  const current = useRef(new THREE.Vector3(...KEYFRAMES[0].pos))
  const currentLook = useRef(new THREE.Vector3(...KEYFRAMES[0].look))

  useEffect(() => {
    if (reducedMotion) return undefined
    const handleMove = (e) => {
      const cx = e.touches ? e.touches[0].clientX : e.clientX
      const cy = e.touches ? e.touches[0].clientY : e.clientY
      pointer.current.x = (cx / window.innerWidth) * 2 - 1
      pointer.current.y = (cy / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('touchmove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('touchmove', handleMove)
    }
  }, [reducedMotion])

  useFrame((_, delta) => {
    const t = reducedMotion ? 0.5 : progressRef.current
    const { pos, look } = sampleKeyframes(t)

    const parallaxX = reducedMotion ? 0 : pointer.current.x * 0.35
    const parallaxY = reducedMotion ? 0 : -pointer.current.y * 0.2

    current.current.lerp(
      new THREE.Vector3(pos[0] + parallaxX, pos[1] + parallaxY, pos[2]),
      Math.min(1, delta * 3.2)
    )
    currentLook.current.lerp(new THREE.Vector3(...look), Math.min(1, delta * 3.2))

    camera.position.copy(current.current)
    camera.lookAt(currentLook.current)
  })

  return null
}
