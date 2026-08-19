import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COOL = new THREE.Color('#eaf1ff')
const WARM = new THREE.Color('#ffd9a8')

export default function ScrollLightingRig({ progressRef, reducedMotion }) {
  const keyRef = useRef()
  const rimRef = useRef()

  useFrame(() => {
    const t = reducedMotion ? 0.5 : progressRef.current
    if (keyRef.current) {
      keyRef.current.color.copy(COOL).lerp(WARM, t * 0.6)
      keyRef.current.intensity = THREE.MathUtils.lerp(1.5, 1.9, t)
    }
    if (rimRef.current) {
      rimRef.current.intensity = THREE.MathUtils.lerp(6, 11, t)
    }
  })

  return (
    <>
      <ambientLight intensity={0.32} color="#a9cbff" />
      <directionalLight
        ref={keyRef}
        position={[6, 8, 4]}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-radius={4}
      />
      <directionalLight position={[-5, 3, -6]} intensity={0.4} color="#7fb3ff" />
      <pointLight ref={rimRef} position={[-4.5, 2, -3]} color="#5b8def" distance={13} />
      <pointLight position={[3, 1.2, 3.5]} intensity={6} color="#c9a961" distance={8} />
    </>
  )
}
