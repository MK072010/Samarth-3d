import { useState } from 'react'
import { Html } from '@react-three/drei'

export default function Hotspot({ position, label, description }) {
  const [open, setOpen] = useState(false)

  return (
    <Html position={position} center distanceFactor={8} zIndexRange={[20, 0]} occlude={false}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setOpen((o) => !o)
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="group relative flex h-6 w-6 items-center justify-center"
        aria-label={`${label} — campus hotspot`}
      >
        <span className="absolute h-6 w-6 animate-ping rounded-full bg-azure-400/40" />
        <span className="relative h-2.5 w-2.5 rounded-full border border-white/70 bg-azure-400 shadow-glow-sm" />

        <div
          className={`glass absolute bottom-full left-1/2 mb-3 w-48 -translate-x-1/2 rounded-xl px-4 py-3 text-left transition-all duration-300 ${
            open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
          }`}
        >
          <div className="font-display text-sm text-mist-50">{label}</div>
          <p className="mt-1 text-[11px] font-light leading-snug text-mist-300">{description}</p>
        </div>
      </button>
    </Html>
  )
}
