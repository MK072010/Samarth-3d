import Reveal from './Reveal.jsx'
import ParallaxLayer from './ParallaxLayer.jsx'
import AnimatedCounter from './AnimatedCounter.jsx'

const PILLARS = [
  { value: 12, suffix: ' acres', label: 'Secure, green campus' },
  { value: 45, suffix: '+', label: 'Co-curricular & sports programs' },
  { value: 100, suffix: '%', label: 'Faculty with postgraduate degrees' },
  { value: 20, suffix: '+', label: 'Countries represented by alumni' },
]

export default function WhySamarth({ reducedMotion }) {
  return (
    <section id="why-samarth" className="relative overflow-hidden bg-ink-900 px-6 py-28 sm:py-36">
      <ParallaxLayer
        reducedMotion={reducedMotion}
        speed={0.35}
        className="left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-azure-600/12 blur-[140px]"
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal reducedMotion={reducedMotion}>
          <span className="eyebrow">Why Samarth</span>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-normal leading-tight text-mist-50 sm:text-4xl md:text-5xl">
            We don't measure a school year by the calendar. We measure it by who a
            student becomes.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base font-light text-mist-300 sm:text-lg">
            Every decision on this campus — from class size to lab access to who we hire —
            is made against one question: does this help a student think better?
          </p>
        </Reveal>

        <Reveal reducedMotion={reducedMotion} delay={0.15} className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-white/10 pt-12 sm:grid-cols-4">
          {PILLARS.map((p) => (
            <div key={p.label} className="flex flex-col items-center">
              <div className="font-display text-4xl text-gradient-azure sm:text-5xl">
                <AnimatedCounter value={p.value} suffix={p.suffix} reducedMotion={reducedMotion} />
              </div>
              <div className="mt-3 max-w-[10rem] text-xs font-medium uppercase tracking-wide text-mist-400">
                {p.label}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
