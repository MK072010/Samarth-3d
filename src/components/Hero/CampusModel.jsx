import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Edges, Float } from '@react-three/drei'
import * as THREE from 'three'

const AZURE = '#5b8def'
const AZURE_LIGHT = '#a9cbff'
const BRASS = '#c9a961'

/**
 * A stylized institutional building — main hall, flanking wings, a
 * colonnade and a floating brass crest. Every solid volume carries a
 * faint blueprint edge outline, so the model reads as "architecture
 * rendered from a drafting table," which is the signature idea for
 * this hero rather than a generic rotating primitive.
 */
function Wing({ position, scale = [1, 1, 1] }) {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <boxGeometry args={[2.2, 1.6, 2.6]} />
      <meshPhysicalMaterial
        color="#0f1520"
        roughness={0.25}
        metalness={0.1}
        transmission={0.08}
        clearcoat={0.6}
        clearcoatRoughness={0.3}
        envMapIntensity={0.9}
      />
      <Edges scale={1.001} threshold={15}>
        <lineBasicMaterial color={AZURE_LIGHT} transparent opacity={0.35} />
      </Edges>
    </mesh>
  )
}

function Column({ position }) {
  return (
    <mesh position={position} castShadow>
      <cylinderGeometry args={[0.09, 0.09, 2.1, 16]} />
      <meshStandardMaterial color="#dfe6f2" roughness={0.35} metalness={0.2} />
    </mesh>
  )
}

function Colonnade({ count = 7, span = 3.6, z = 1.9 }) {
  const cols = useMemo(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      const x = -span / 2 + (span / (count - 1)) * i
      arr.push(x)
    }
    return arr
  }, [count, span])

  return (
    <group position={[0, -0.35, z]}>
      {cols.map((x, i) => (
        <Column key={i} position={[x, 0, 0]} />
      ))}
    </group>
  )
}

function MainHall() {
  return (
    <group>
      {/* Base block */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.4, 2.4, 3.2]} />
        <meshPhysicalMaterial
          color="#111826"
          roughness={0.2}
          metalness={0.15}
          transmission={0.12}
          thickness={1.2}
          clearcoat={0.8}
          clearcoatRoughness={0.25}
          envMapIntensity={1.1}
        />
        <Edges scale={1.001} threshold={15}>
          <lineBasicMaterial color={AZURE_LIGHT} transparent opacity={0.45} />
        </Edges>
      </mesh>

      {/* Pitched roof (low-poly cone flattened to a ridge look via scale) */}
      <mesh position={[0, 1.55, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[3.1, 1.05, 4]} />
        <meshStandardMaterial color="#0c111c" roughness={0.4} metalness={0.25} />
        <Edges scale={1.001} threshold={10}>
          <lineBasicMaterial color={AZURE} transparent opacity={0.4} />
        </Edges>
      </mesh>

      {/* Illuminated window bands */}
      {[-1.35, -0.45, 0.45, 1.35].map((x, i) => (
        <mesh key={i} position={[x, 0.15, 1.61]}>
          <planeGeometry args={[0.4, 1.3]} />
          <meshStandardMaterial
            color={AZURE_LIGHT}
            emissive={AZURE}
            emissiveIntensity={1.4}
            toneMapped={false}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  )
}

function Crest() {
  const ref = useRef()
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.25
  })

  return (
    <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.6}>
      <group ref={ref} position={[0, 3.0, 0]}>
        <mesh>
          <torusGeometry args={[0.42, 0.035, 16, 48]} />
          <meshStandardMaterial color={BRASS} roughness={0.3} metalness={0.85} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <octahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial color={BRASS} roughness={0.25} metalness={0.9} emissive={BRASS} emissiveIntensity={0.15} />
        </mesh>
      </group>
    </Float>
  )
}

// `autoRotate` defaults on (Phase 1 hero behaviour). Phase 2's scroll-driven
// Campus Experience passes autoRotate={false} since camera movement there
// is authored explicitly against fixed model geometry. `children` lets
// callers anchor extra content (e.g. hotspot markers) so it moves/rotates
// together with the building instead of drifting independently.
export default function CampusModel({ reducedMotion, autoRotate = true, children }) {
  const groupRef = useRef()

  useFrame((_, delta) => {
    if (reducedMotion || !autoRotate || !groupRef.current) return
    // Extremely slow ambient rotation — a held shot, not a spin.
    groupRef.current.rotation.y += delta * 0.035
  })

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      <MainHall />
      <Wing position={[-3.1, -0.15, -0.3]} scale={[1, 0.85, 1]} />
      <Wing position={[3.1, -0.15, -0.3]} scale={[1, 0.85, 1]} />
      <Colonnade />
      <Crest />

      {/* Ground disc, faintly reflective, reads as a plaza */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.55, 0]} receiveShadow>
        <circleGeometry args={[8, 64]} />
        <meshStandardMaterial color="#0a0e16" roughness={0.55} metalness={0.2} />
      </mesh>

      {children}
    </group>
  )
}
