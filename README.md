# Samarth School — Phase 1 + Phase 2

A cinematic, 3D-driven marketing site for Samarth School. Built with React,
Vite, Tailwind, React Three Fiber, Drei, GSAP and Lenis.

## Design direction

- **Palette** — near-black ink (`#0a0e16`), cool mist grays for body text, a
  restrained "sophisticated blue" (`#5b8def` / `#7fb3ff`) for interactive
  accents, and a **brass** accent (`#c9a961`) reserved for heraldic touches
  (the nav mark, the crest above the 3D building, section eyebrows).
- **Type** — Fraunces (display serif) paired with Inter (body/UI) and IBM
  Plex Mono (eyebrows/labels — a nod to the blueprint/architectural motif).
- **Signature element** — the 3D centerpiece is a procedural building
  rendered as if lifted from an architect's blueprint: solid glass-like
  volumes with faint azure edge-outlines, a colonnade, lit window bands,
  and a slowly rotating brass crest. Built entirely from primitives, so it
  can be swapped for a real GLTF model later without restructuring the
  scene graph.

## Getting started

```bash
npm install
npm run dev
```

`npm run build` produces a production bundle in `dist/`.

## Phase 1 (foundation)

- **Navbar** — glass backdrop on scroll, full link set, animated mobile menu.
- **Cinematic hero** (`src/components/Hero/`) — lighting/fog/postprocessing,
  the procedural campus model, atmospheric particles, a GSAP entrance
  fly-in plus pointer parallax, and a static blueprint-styled fallback for
  devices without WebGL.
- **CTA section** and **Footer**.
- **Motion system** — Lenis smooth scroll wired to the GSAP ticker, a
  magnetic-button component, and a `useReducedMotion` hook threaded through
  every animated component.
- **Performance scaling** (`lib/deviceCapability.js`) — a cheap heuristic
  picks a `low` / `medium` / `high` quality tier controlling DPR, shadows,
  particle count and whether postprocessing runs. Drei's
  `PerformanceMonitor` downgrades the tier live if a device struggles.

## Phase 2 (added this pass)

- **About Samarth** (`src/components/About/AboutSection.jsx`) — extended
  with layered parallax glow (`ParallaxLayer.jsx`) and animated count-up
  statistics (`AnimatedCounter.jsx`).
- **Our Campus** (`src/components/Campus/`) — a large, scroll-driven 3D
  experience:
  - `CampusExperience.jsx` pins a full-height canvas inside a 300vh
    scroll region (CSS `position: sticky`, no ScrollTrigger pinning, so it
    plays nicely with Lenis).
  - `useScrollProgress.js` tracks scroll progress through that region via
    GSAP ScrollTrigger and exposes both a mutable ref (read every R3F
    frame, no re-renders) and a bucketed React state for caption swaps.
  - `ScrollCameraRig.jsx` scrubs the camera between three authored shots
    (wide establishing → library wing → entrance) as progress advances,
    with pointer parallax layered on top.
  - `ScrollLightingRig.jsx` subtly shifts key-light color/intensity from
    cool to warm as progress advances — a "day easing toward dusk" feel.
  - `Hotspot.jsx` — tap/hover markers (via Drei's `Html`) anchored to the
    Library wing, Labs wing, Main Academic Block and Founders Plaza, each
    with a glass tooltip. Reuses Phase 1's `CampusModel` unmodified aside
    from an additive `autoRotate` / `children` prop so hotspots can be
    anchored to it without touching the Hero's usage.
- **Academic Excellence** (`AcademicsSection.jsx`) — Primary / Secondary /
  Senior Secondary cards using the new shared `TiltCard.jsx` (mouse **and**
  touch 3D tilt).
- **Facilities** (`FacilitiesSection.jsx`) — six tilt cards (Smart
  Classrooms, Science Labs, Library, Sports, Computer Lab, Activity Rooms).
- **Why Samarth** (`WhySamarth.jsx`) — cinematic strengths section with
  animated numbers and parallax glow.
- **Reduced motion & performance** — every new section takes
  `reducedMotion` and behaves accordingly (parallax layers freeze, counters
  snap to final value, the Campus Experience becomes a static full-height
  panel instead of a pinned scroll region). The quality-tier heuristic in
  `lib/deviceCapability.js` was recalibrated this pass — it no longer
  penalizes a device just for being mobile/touch, so ordinary phones land
  on `medium` (shadows, particles and hotspots stay on; only bloom
  postprocessing is reserved for `high`/desktop) rather than being dropped
  to a bare `low` scene.

## Verified this pass

- Every `.jsx`/`.js` file transforms cleanly through esbuild (JSX +
  syntax check) — `npm install` could not be run in the build sandbox (no
  network access), so this stands in for a full type/build check. Run
  `npm run build` yourself before deploying.
- No duplicate section `id`s; every nav link except `#gallery` (out of
  scope for Phase 2) resolves to a real section.

## Notes for Phase 3

- Add the Gallery section/page the nav already links to.
- Real Admissions flow and Contact form (explicitly out of scope this
  phase — no backend, login, or admin panel yet).
- Swap the procedural `CampusModel` for a real GLTF campus model.
- Real photography once available, replacing the gradient/blueprint
  placeholder art direction on Facilities/Academics cards.
