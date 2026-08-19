import { Sparkles } from '@react-three/drei'

const COUNTS = { low: 0, medium: 40, high: 110 }

export default function Particles({ tier = 'high' }) {
  const count = COUNTS[tier] ?? 60
  if (count === 0) return null

  return (
    <>
      <Sparkles
        count={count}
        scale={[14, 6, 10]}
        size={1.6}
        speed={0.15}
        opacity={0.35}
        color="#a9cbff"
        position={[0, 1, 0]}
      />
      {tier === 'high' && (
        <Sparkles count={30} scale={[10, 4, 8]} size={0.8} speed={0.06} opacity={0.5} color="#c9a961" position={[0, 2.5, 0]} />
      )}
    </>
  )
}
