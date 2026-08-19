import { useMemo, useState } from 'react'
import Reveal from '../Reveal.jsx'
import ParallaxLayer from '../ParallaxLayer.jsx'
import AnimatedCounter from '../AnimatedCounter.jsx'
import { IconMedal, IconAward, IconTrophy, IconStar } from '../icons.jsx'

const STATS = [
  { value: 62, suffix: '+', label: 'Awards & honours since 2015' },
  { value: 18, suffix: '', label: 'National-level titles' },
  { value: 34, suffix: '', label: 'Years of continuous excellence' },
  { value: 9, suffix: '', label: 'International recognitions' },
]

const FILTERS = ['All', 'Academic', 'Sports', 'Milestones']

const MILESTONES = [
  { year: '2025', category: 'Academic', title: 'National Science Olympiad — Gold', desc: 'Samarth students swept the senior category for the third consecutive year.', icon: IconAward },
  { year: '2024', category: 'Sports', title: 'State Athletics Championship', desc: 'The u-17 athletics team brought home the state trophy for the first time.', icon: IconTrophy },
  { year: '2023', category: 'Milestones', title: 'New Science & Robotics Wing', desc: 'A dedicated four-lab wing opened, doubling our practical-hours capacity.', icon: IconStar },
  { year: '2022', category: 'Academic', title: '100% Board Pass Rate', desc: 'Every Grade 12 student cleared boards, with 61% scoring above 90%.', icon: IconAward },
  { year: '2021', category: 'Sports', title: 'Inter-School Swimming Cup', desc: 'Won across five of six age categories at the regional meet.', icon: IconTrophy },
  { year: '2019', category: 'Milestones', title: 'Green Campus Certification', desc: 'Recognised for solar power, water recycling and zero-waste dining.', icon: IconStar },
  { year: '2016', category: 'Academic', title: 'Model United Nations — Best Delegation', desc: 'First Indian school delegation to place at the international round.', icon: IconAward },
]

export default function AchievementsSection({ reducedMotion }) {
  const [filter, setFilter] = useState('All')

  const visible = useMemo(
    () => (filter === 'All' ? MILESTONES : MILESTONES.filter((m) => m.category === filter)),
    [filter]
  )

  return (
    <section id="achievements" className="relative overflow-hidden bg-ink-950 px-6 py-28 sm:py-36">
      <ParallaxLayer
        reducedMotion={reducedMotion}
        speed={0.28}
        className="right-[-10%] top-[15%] h-[420px] w-[420px] rounded-full bg-brass-500/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal reducedMotion={reducedMotion} className="flex max-w-xl items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-brass-400">
            <IconMedal className="h-4 w-4" />
          </span>
          <span className="eyebrow">Achievements &amp; Awards</span>
        </Reveal>

        <Reveal reducedMotion={reducedMotion} delay={0.08} className="mt-5 max-w-xl">
          <h2 className="font-display text-3xl font-normal leading-tight text-mist-50 sm:text-4xl">
            Three decades of results we didn&rsquo;t have to inflate.
          </h2>
        </Reveal>

        {/* Animated stat counters */}
        <Reveal
          reducedMotion={reducedMotion}
          delay={0.12}
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-y border-white/10 py-10 sm:grid-cols-4"
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl text-mist-50 sm:text-4xl">
                <AnimatedCounter value={s.value} suffix={s.suffix} reducedMotion={reducedMotion} />
              </div>
              <div className="mt-1.5 text-xs font-medium uppercase tracking-wide text-mist-400">{s.label}</div>
            </div>
          ))}
        </Reveal>

        {/* Category filters */}
        <div className="mt-14 flex flex-wrap gap-2.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-5 py-2 text-xs font-medium uppercase tracking-wide transition-colors duration-300 ${
                filter === f
                  ? 'border-azure-400/60 bg-azure-500/15 text-mist-50'
                  : 'border-white/12 text-mist-400 hover:border-white/25 hover:text-mist-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative mt-14">
          <div className="absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-azure-400/50 via-white/10 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

          <div className="flex flex-col gap-10">
            {visible.map((m, i) => {
              const Icon = m.icon
              const alignRight = i % 2 === 1
              return (
                <Reveal
                  key={m.title}
                  reducedMotion={reducedMotion}
                  delay={(i % 4) * 0.06}
                  className={`relative flex items-start gap-6 pl-14 sm:w-1/2 sm:pl-0 ${
                    alignRight ? 'sm:ml-auto sm:flex-row sm:pl-10' : 'sm:flex-row-reverse sm:pr-10 sm:text-right'
                  }`}
                >
                  <span
                    className={`absolute left-0 top-0.5 flex h-11 w-11 items-center justify-center rounded-full border border-brass-500/40 bg-ink-900 text-brass-400 sm:top-0 ${
                      alignRight ? 'sm:-left-5' : 'sm:-right-5 sm:left-auto'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="rounded-2xl border border-white/8 bg-ink-900/70 p-6">
                    <span className="font-mono text-xs text-azure-300">{m.year}</span>
                    <h3 className="mt-2 font-display text-lg text-mist-50">{m.title}</h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-mist-300">{m.desc}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
