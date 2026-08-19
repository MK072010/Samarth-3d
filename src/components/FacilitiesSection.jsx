import Reveal from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'
import { IconMonitor, IconFlask, IconLibrary, IconTrophy, IconCpu, IconPalette } from './icons.jsx'

const FACILITIES = [
  { icon: IconMonitor, name: 'Smart Classrooms', desc: 'Interactive panels and adaptive lighting in every room.', hue: 'from-azure-700/30' },
  { icon: IconFlask, name: 'Science Labs', desc: 'Dedicated physics, chemistry and biology laboratories.', hue: 'from-brass-600/20' },
  { icon: IconLibrary, name: 'Library', desc: 'A 40,000-volume collection with quiet-hours reading rooms.', hue: 'from-azure-600/25' },
  { icon: IconTrophy, name: 'Sports', desc: 'Full-size athletics track, courts, and a covered swimming pool.', hue: 'from-ink-600/50' },
  { icon: IconCpu, name: 'Computer Lab', desc: 'Modern workstations with dedicated coding and robotics tracks.', hue: 'from-azure-700/30' },
  { icon: IconPalette, name: 'Activity Rooms', desc: 'Music, art and drama studios open through the school day.', hue: 'from-brass-600/20' },
]

export default function FacilitiesSection({ reducedMotion }) {
  return (
    <section id="facilities" className="relative bg-ink-950 px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal reducedMotion={reducedMotion} className="max-w-xl">
          <span className="eyebrow">Facilities</span>
          <h2 className="mt-5 font-display text-3xl font-normal leading-tight text-mist-50 sm:text-4xl">
            Spaces built for what actually happens in them.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FACILITIES.map((f, i) => {
            const Icon = f.icon
            return (
              <Reveal key={f.name} reducedMotion={reducedMotion} delay={(i % 3) * 0.08}>
                <TiltCard
                  reducedMotion={reducedMotion}
                  className={`group relative overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br ${f.hue} via-ink-800 to-ink-900 bg-blueprint p-7 transition-shadow duration-500 hover:shadow-glow-sm`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-mist-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-display text-xl text-mist-50">{f.name}</h3>
                  <p className="mt-2.5 text-sm font-light leading-relaxed text-mist-300">{f.desc}</p>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
