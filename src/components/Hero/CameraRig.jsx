import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import * as THREE from 'three'

// Cinematic entrance: camera starts high, distant and slightly off-axis,
// then eases into its resting shot. After the entrance, subtle parallax
// tracks pointer position so the model feels alive without being gamey.
export default function CameraRig({ reducedMotion, restPosition = [0, 1.4, 9.5], lookAt = [0, 0.6, 0] }) {
  const { camera } = useThree()
  const pointer = useRef({ x: 0, y: 0 })
  const target = useRef(new THREE.Vector3(...restPosition))
  const lookTarget = useRef(new THREE.Vector3(...lookAt))
  const entranceDone = useRef(false)

  useEffect(() => {
    const startPos = reducedMotion
      ? restPosition
      : [restPosition[0] + 3.5, restPosition[1] + 5.5, restPosition[2] + 6]

    camera.position.set(...startPos)
    camera.lookAt(...lookAt)

    if (reducedMotion) {
      entranceDone.current = true
      return undefined
    }

    const tl = gsap.timeline({
      delay: 0.35,
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        entranceDone.current = true
      },
    })

    const proxy = { x: startPos[0], y: startPos[1], z: startPos[2] }
    tl.to(proxy, {
      x: restPosition[0],
      y: restPosition[1],
      z: restPosition[2],
      duration: 2.6,
      onUpdate: () => camera.position.set(proxy.x, proxy.y, proxy.z),
    })

    return () => tl.kill()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    if (reducedMotion || !entranceDone.current) return

    const offsetX = pointer.current.x * 0.55
    const offsetY = -pointer.current.y * 0.28

    target.current.set(restPosition[0] + offsetX, restPosition[1] + offsetY, restPosition[2])

    camera.position.lerp(target.current, Math.min(1, delta * 1.6))
    camera.lookAt(lookTarget.current)
  })

  return null
}
