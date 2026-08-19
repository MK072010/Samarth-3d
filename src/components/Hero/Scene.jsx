import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, PerformanceMonitor } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, DepthOfField } from '@react-three/postprocessing'
import CampusModel from './CampusModel.jsx'
import Particles from './Particles.jsx'
import CameraRig from './CameraRig.jsx'
import LightBreath from './LightBreath.jsx'

export default function Scene({ tier, reducedMotion, onTierDrop }) {
  const dpr = tier === 'low' ? [1, 1] : tier === 'medium' ? [1, 1.5] : [1, 2]
  const shadows = tier !== 'low'

  return (
    <Canvas
      shadows={shadows ? 'soft' : false}
      dpr={dpr}
      gl={{ antialias: tier !== 'low', powerPreference: 'high-performance', alpha: false }}
      camera={{ fov: 38, near: 0.1, far: 60 }}
      onCreated={({ gl }) => {
        gl.setClearColor('#0a0e16', 1)
      }}
    >
      <PerformanceMonitor onDecline={onTierDrop} />

      <fog attach="fog" args={['#0a0e16', 9, 22]} />

      <ambientLight intensity={0.35} color="#a9cbff" />
      <directionalLight
        position={[6, 8, 4]}
        intensity={1.4}
        color="#eaf1ff"
        castShadow={shadows}
        shadow-mapSize={[1024, 1024]}
        shadow-radius={shadows ? 4 : undefined}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />
      {/* Soft rim from behind to separate the building silhouette from the fog */}
      <directionalLight position={[-5, 3, -6]} intensity={0.45} color="#7fb3ff" />
      <LightBreath tier={tier} reducedMotion={reducedMotion} />

      <Suspense fallback={null}>
        <CampusModel reducedMotion={reducedMotion} />
        <Particles tier={tier} />
        {tier !== 'low' && (
          <ContactShadows position={[0, -1.54, 0]} opacity={0.55} scale={16} blur={2.4} far={4} color="#000000" />
        )}
        <Environment preset="night" />
      </Suspense>

      <CameraRig reducedMotion={reducedMotion} />

      {tier === 'high' && (
        <EffectComposer multisampling={0}>
          <DepthOfField focusDistance={0.045} focalLength={0.035} bokehScale={2.2} height={480} />
          <Bloom intensity={0.55} luminanceThreshold={0.32} luminanceSmoothing={0.25} mipmapBlur />
          <Vignette eskil={false} offset={0.2} darkness={0.65} />
        </EffectComposer>
      )}
    </Canvas>
  )
}
