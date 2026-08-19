import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, PerformanceMonitor } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, DepthOfField } from '@react-three/postprocessing'
import CampusModel from '../Hero/CampusModel.jsx'
import Particles from '../Hero/Particles.jsx'
import ScrollCameraRig from './ScrollCameraRig.jsx'
import ScrollLightingRig from './ScrollLightingRig.jsx'
import Hotspot from './Hotspot.jsx'

const HOTSPOTS = [
  {
    id: 'library',
    position: [-3.1, 0.4, -0.3],
    label: 'Hartwell Library',
    description: 'Quiet-hours reading rooms and the senior research collection.',
  },
  {
    id: 'labs',
    position: [3.1, 0.4, -0.3],
    label: 'Science & Computer Labs',
    description: 'Physics, chemistry, biology and computer labs share this wing.',
  },
  {
    id: 'hall',
    position: [0, 1.1, 1.7],
    label: 'Main Academic Block',
    description: 'Primary, Secondary and Senior Secondary classrooms.',
  },
  {
    id: 'plaza',
    position: [0, -1.4, 3.4],
    label: 'Founders Plaza',
    description: 'Morning assembly and the colonnade entrance.',
  },
]

export default function CampusScrollScene({ tier, reducedMotion, progressRef, onTierDrop }) {
  const dpr = tier === 'low' ? [1, 1] : tier === 'medium' ? [1, 1.5] : [1, 2]
  const shadows = tier !== 'low'

  return (
    <Canvas
      shadows={shadows ? 'soft' : false}
      dpr={dpr}
      gl={{ antialias: tier !== 'low', powerPreference: 'high-performance', alpha: false }}
      camera={{ fov: 40, near: 0.1, far: 60 }}
      onCreated={({ gl }) => gl.setClearColor('#0a0e16', 1)}
    >
      <PerformanceMonitor onDecline={onTierDrop} />
      <fog attach="fog" args={['#0a0e16', 9, 22]} />

      <ScrollLightingRig progressRef={progressRef} reducedMotion={reducedMotion} />

      <Suspense fallback={null}>
        <CampusModel reducedMotion={reducedMotion} autoRotate={false} tier={tier}>
          {tier !== 'low' &&
            HOTSPOTS.map((h) => (
              <Hotspot key={h.id} position={h.position} label={h.label} description={h.description} />
            ))}
        </CampusModel>

        <Particles tier={tier} />
        {tier !== 'low' && (
          <ContactShadows position={[0, -1.54, 0]} opacity={0.5} scale={16} blur={2.4} far={4} color="#000000" />
        )}
        <Environment preset="night" />
      </Suspense>

      <ScrollCameraRig progressRef={progressRef} reducedMotion={reducedMotion} />

      {tier === 'high' && (
        <EffectComposer multisampling={0}>
          <DepthOfField focusDistance={0.05} focalLength={0.03} bokehScale={2} height={480} />
          <Bloom intensity={0.38} luminanceThreshold={0.4} luminanceSmoothing={0.28} mipmapBlur />
          <Vignette eskil={false} offset={0.2} darkness={0.6} />
        </EffectComposer>
      )}
    </Canvas>
  )
}
