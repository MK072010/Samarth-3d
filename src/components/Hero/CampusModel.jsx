import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Edges, Float, MeshReflectorMaterial } from '@react-three/drei'

const AZURE = '#5b8def'
const AZURE_LIGHT = '#a9cbff'
const BRASS = '#c9a961'
const LAMP_WARM = '#ffcf8a'

/**
 * Phase 6 rewrite. The Phase 1-5 building was three boxes, a cone roof and
 * four windows — readable as "architecture" from a distance but unmistakably
 * primitive up close, which is the root cause of the "flat" feedback. This
 * version keeps the same drafting-table visual language (dark volumes, thin
 * azure blueprint edges, warm brass accents) but builds it up from real
 * architectural components: a multi-floor window grid instead of four
 * panes, an entrance portico with a pediment, a stepped plinth, a lit
 * pathway with lamp posts, stylised topiary for scale reference, and an
 * optional reflective plaza. `detail` scales all of this down for lower
 * tiers so mobile keeps a real campus, just a lighter one.
 */

// ---- shared window-grid facade -------------------------------------------------

function useWindowGrid(cols, rows, spanX, spanY, z) {
  return useMemo(() => {
    const pts = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = cols === 1 ? 0 : -spanX / 2 + (spanX / (cols - 1)) * c
        const y = rows === 1 ? 0 : -spanY / 2 + (spanY / (rows - 1)) * r
        pts.push([x, y, z])
      }
    }
    return pts
  }, [cols, rows, spanX, spanY, z])
}

function WindowGrid({ positions, size = [0.34, 0.5], flicker = false }) {
  const refs = useRef([])

  useFrame(({ clock }) => {
    if (!flicker) return
    const t = clock.getElapsedTime()
    refs.current.forEach((m, i) => {
      if (!m) return
      // A couple of windows drift very slightly in brightness — reads as
      // "someone's still in that room" rather than an obvious pulse.
      m.emissiveIntensity = 1.15 + Math.sin(t * 0.6 + i * 2.1) * 0.18
    })
  })

  return (
    <>
      {positions.map((p, i) => (
        <mesh key={i} position={p}>
          <planeGeometry args={size} />
          <meshStandardMaterial
            ref={(m) => (refs.current[i] = m)}
            color={AZURE_LIGHT}
            emissive={AZURE}
            emissiveIntensity={1.2}
            toneMapped={false}
            transparent
            opacity={0.88}
          />
        </mesh>
      ))}
    </>
  )
}

// ---- volumes ---------------------------------------------------------------

function Wing({ position, scale = [1, 1, 1], detail = 3 }) {
  const cols = detail >= 3 ? 3 : detail >= 2 ? 2 : 1
  const rows = detail >= 2 ? 2 : 1
  const windows = useWindowGrid(cols, rows, 1.5, 0.9, 1.31)

  return (
    <group position={position} scale={scale}>
      <mesh castShadow receiveShadow>
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
      {detail >= 2 && <WindowGrid positions={windows} size={[0.3, 0.4]} />}
    </group>
  )
}

function Column({ position, height = 2.1 }) {
  return (
    <mesh position={position} castShadow>
      <cylinderGeometry args={[0.09, 0.1, height, 16]} />
      <meshStandardMaterial color="#dfe6f2" roughness={0.35} metalness={0.2} />
    </mesh>
  )
}

function Colonnade({ count = 7, span = 3.6, z = 1.9 }) {
  const cols = useMemo(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      arr.push(count === 1 ? 0 : -span / 2 + (span / (count - 1)) * i)
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

// Entrance portico: four slender columns carrying a pediment, set forward
// of the main hall's doors — the single element that most reads as
// "a real building" rather than a box, since it breaks the flat facade
// plane with genuine projecting geometry and a triangular roofline.
function Portico({ detail = 3 }) {
  const cols = detail >= 2 ? [-0.75, -0.25, 0.25, 0.75] : [-0.5, 0.5]
  return (
    <group position={[0, -0.3, 2.35]}>
      {cols.map((x, i) => (
        <Column key={i} position={[x, 0, 0]} height={1.7} />
      ))}
      <mesh position={[0, 0.95, -0.05]}>
        <boxGeometry args={[2.1, 0.12, 0.55]} />
        <meshStandardMaterial color="#dfe6f2" roughness={0.4} metalness={0.15} />
      </mesh>
      <mesh position={[0, 1.15, -0.05]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.55, 0.55, 4]} />
        <meshStandardMaterial color="#111826" roughness={0.35} metalness={0.2} />
        <Edges scale={1.001} threshold={10}>
          <lineBasicMaterial color={AZURE} transparent opacity={0.4} />
        </Edges>
      </mesh>
    </group>
  )
}

// Stepped plinth the whole hall sits on — a subtle but important depth
// cue; without it the building appears to float on the plaza disc.
function Plinth() {
  return (
    <group position={[0, -1.0, 1.4]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, -i * 0.14, i * 0.22]} receiveShadow>
          <boxGeometry args={[5.4 - i * 0.5, 0.14, 0.5]} />
          <meshStandardMaterial color="#0c111c" roughness={0.5} metalness={0.15} />
        </mesh>
      ))}
    </group>
  )
}

function MainHall({ detail = 3 }) {
  const cols = detail >= 3 ? 6 : detail >= 2 ? 4 : 2
  const rows = detail >= 2 ? 2 : 1
  const frontWindows = useWindowGrid(cols, rows, 3.6, 1.2, 1.61)

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

      {/* Pitched roof */}
      <mesh position={[0, 1.55, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[3.1, 1.05, 4]} />
        <meshStandardMaterial color="#0c111c" roughness={0.4} metalness={0.25} />
        <Edges scale={1.001} threshold={10}>
          <lineBasicMaterial color={AZURE} transparent opacity={0.4} />
        </Edges>
      </mesh>

      {/* Multi-floor illuminated window grid — replaces the old 4-pane strip */}
      <WindowGrid positions={frontWindows} flicker />

      {detail >= 2 && <Portico detail={detail} />}
      <Plinth />
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

// Stylised topiary — abstract cone-on-trunk shapes carrying the same
// blueprint-edge treatment as the building, so they read as "considered
// landscaping" rather than a mismatched realism upgrade. Purely for scale
// and depth cueing around the plaza.
function Topiary({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.06, 0.36, 8]} />
        <meshStandardMaterial color="#1a2130" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.55, 0]} castShadow>
        <coneGeometry args={[0.32, 0.7, 8]} />
        <meshStandardMaterial color="#0e1a16" roughness={0.55} metalness={0.05} />
        <Edges scale={1.001} threshold={20}>
          <lineBasicMaterial color="#4fd68a" transparent opacity={0.25} />
        </Edges>
      </mesh>
    </group>
  )
}

// Emissive-only lamp post — no live PointLight per post (that would tank
// mobile frame rate); the warm glow comes from Bloom picking up the
// emissive material, same trick as the window grid.
function LampPost({ position }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.025, 0.03, 1.1, 8]} />
        <meshStandardMaterial color="#232b3a" roughness={0.5} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0.58, 0]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color={LAMP_WARM} emissive={LAMP_WARM} emissiveIntensity={1.6} toneMapped={false} />
      </mesh>
    </group>
  )
}

// Reflective plaza on high/medium tiers (the single highest-impact "premium"
// upgrade for relatively low cost); a plain matte disc on low tier so it
// never becomes a performance trap on weak devices.
function Plaza({ detail = 3 }) {
  if (detail >= 2) {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.55, 0]} receiveShadow>
        <circleGeometry args={[8, 64]} />
        <MeshReflectorMaterial
          resolution={detail >= 3 ? 512 : 256}
          mixBlur={1}
          mixStrength={2.2}
          roughness={0.85}
          depthScale={0.4}
          minDepthThreshold={0.85}
          maxDepthThreshold={1.2}
          color="#0a0e16"
          metalness={0.3}
        />
      </mesh>
    )
  }
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.55, 0]} receiveShadow>
      <circleGeometry args={[8, 32]} />
      <meshStandardMaterial color="#0a0e16" roughness={0.55} metalness={0.2} />
    </mesh>
  )
}

// A lighter path from plaza edge toward the entrance — cheap depth cue that
// gives the eye a line to travel along toward the building.
function Pathway() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.53, 4.6]} receiveShadow>
      <planeGeometry args={[1.1, 3.2]} />
      <meshStandardMaterial color="#141c2a" roughness={0.6} metalness={0.1} />
    </mesh>
  )
}

const LAMP_POSITIONS = [
  [-1.1, -1.0, 5.6],
  [1.1, -1.0, 5.6],
  [-1.1, -1.0, 3.4],
  [1.1, -1.0, 3.4],
]

const TOPIARY_POSITIONS = [
  [-3.6, -1.0, 3.6],
  [3.6, -1.0, 3.6],
  [-4.3, -1.0, 1.2],
  [4.3, -1.0, 1.2],
]

// `detail` (1 low, 2 medium, 3 high) scales geometry count so mobile/low-tier
// devices keep a recognisably detailed campus, just with fewer windows,
// no reflective floor, and no lamp/topiary dressing. `autoRotate` defaults on
// for the Hero; the scroll-driven Campus Experience passes it off since
// camera movement there is authored against fixed geometry. `children` lets
// callers anchor hotspot markers so they move/rotate with the building.
export default function CampusModel({ reducedMotion, autoRotate = true, tier = 'high', children }) {
  const groupRef = useRef()
  const detail = tier === 'high' ? 3 : tier === 'medium' ? 2 : 1

  useFrame((_, delta) => {
    if (reducedMotion || !autoRotate || !groupRef.current) return
    groupRef.current.rotation.y += delta * 0.035
  })

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      <MainHall detail={detail} />
      <Wing position={[-3.1, -0.15, -0.3]} scale={[1, 0.85, 1]} detail={detail} />
      <Wing position={[3.1, -0.15, -0.3]} scale={[1, 0.85, 1]} detail={detail} />
      <Colonnade count={detail >= 3 ? 7 : detail >= 2 ? 5 : 3} />
      <Crest />

      <Plaza detail={detail} />
      {detail >= 2 && <Pathway />}
      {detail >= 2 && LAMP_POSITIONS.map((p, i) => <LampPost key={i} position={p} />)}
      {detail >= 3 && TOPIARY_POSITIONS.map((p, i) => <Topiary key={i} position={p} />)}

      {children}
    </group>
  )
}
