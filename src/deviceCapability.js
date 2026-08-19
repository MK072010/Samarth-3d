// Cheap, synchronous heuristics used to pick a quality tier for the 3D scene.
// We avoid heavy GPU benchmarking — a few signals are enough to keep the
// hero smooth on mid-range phones without punishing desktop users.

export function getQualityTier() {
  if (typeof window === 'undefined') return 'high'

  const ua = navigator.userAgent || ''
  const isMobileUA = /Android|iPhone|iPad|iPod|Mobile/i.test(ua)
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches
  const cores = navigator.hardwareConcurrency
  const mem = navigator.deviceMemory // undefined on iOS Safari — don't penalize unknowns
  const verySmallViewport = Math.min(window.innerWidth, window.innerHeight) < 380

  // Only count signals we actually have reliable readings for, so an
  // ordinary modern phone (8 cores, deviceMemory unreported, 390-430px
  // viewport) doesn't get flagged as weak just for being a touch device.
  let score = 0
  if (typeof cores === 'number' && cores <= 4) score -= 1
  if (typeof mem === 'number' && mem <= 2) score -= 1
  if (verySmallViewport) score -= 1

  let tier = score <= -2 ? 'low' : score <= -1 ? 'medium' : 'high'

  // Touch/mobile devices are capped at 'medium' — no bloom/postprocessing —
  // but keep shadows, particles and hotspots so the experience still reads
  // as premium, just lighter, rather than falling back to a bare scene.
  if ((isMobileUA || coarsePointer) && tier === 'high') tier = 'medium'

  return tier
}

export function detectWebGL() {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch (e) {
    return false
  }
}
