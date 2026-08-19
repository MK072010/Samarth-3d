// Graceful, still-premium fallback for environments without WebGL
// (old devices, disabled GPU, some in-app browsers). Pure CSS/SVG so it
// never blocks render and carries no runtime cost.
export default function Fallback() {
  return (
    <div className="absolute inset-0 bg-blueprint overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900/95 to-ink-950" />
      <svg
        className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[130%] max-w-[1100px] opacity-70"
        viewBox="0 0 800 420"
        fill="none"
        aria-hidden="true"
      >
        <g stroke="#7fb3ff" strokeOpacity="0.5" strokeWidth="1">
          <rect x="260" y="140" width="280" height="180" />
          <path d="M260 140 L400 60 L540 140" />
          <line x1="180" y1="220" x2="260" y2="220" />
          <line x1="540" y1="220" x2="620" y2="220" />
          <rect x="150" y="220" width="110" height="100" />
          <rect x="540" y="220" width="110" height="100" />
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1={330 + i * 30} y1="200" x2={330 + i * 30} y2="300" stroke="#c9a961" strokeOpacity="0.5" />
          ))}
        </g>
        <circle cx="400" cy="20" r="14" stroke="#c9a961" strokeOpacity="0.8" />
      </svg>
      <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.65)]" />
    </div>
  )
}
