import Reveal from '../Reveal.jsx'
import ParallaxLayer from '../ParallaxLayer.jsx'
import AnimatedCounter from '../AnimatedCounter.jsx'

const STATS = [
  { value: 34, suffix: '', label: 'Years shaping students' },
  { value: 8, prefix: '1:', label: 'Faculty to student ratio' },
  { value: 2400, suffix: '+', label: 'Students across three stages' },
  { value: 96, suffix: '%', label: 'Board results above 85th percentile' },
]

export default function AboutSection({ reducedMotion }) {
  return (
    <section id="about" className="relative overflow-hidden bg-ink-900 px-6 py-28 sm:py-36">
      {/* Layered depth — sits behind content, drifts at different rates on scroll */}
      <ParallaxLayer
        reducedMotion={reducedMotion}
        speed={0.25}
        className="left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-azure-600/10 blur-[110px]"
      />
      <ParallaxLayer
        reducedMotion={reducedMotion}
        speed={0.5}
        className="right-[-8%] bottom-[-15%] h-[380px] w-[380px] rounded-full bg-brass-500/8 blur-[100px]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.85fr_1fr] lg:gap-24">
        <Reveal reducedMotion={reducedMotion}>
          <span className="eyebrow">About Samarth</span>
          <h2 className="mt-5 max-w-md font-display text-3xl font-normal leading-tight text-mist-50 sm:text-4xl">
            A school designed the way we ask students to think — with rigor, and with care.
          </h2>
        </Reveal>

        <Reveal reducedMotion={reducedMotion} delay={0.15}>
          <p className="max-w-xl text-base font-light leading-relaxed text-mist-300 sm:text-lg">
            Samarth School was founded on a simple premise: that a student's environment
            teaches as much as their curriculum does. From their first day in Primary
            through their board exams in Senior Secondary, every classroom, laboratory and
            quad on our campus is built to reward curiosity — and every member of our
            faculty is chosen for their ability to meet a student exactly where their
            thinking is.
          </p>

          <a
            href="#academics"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-azure-300 transition-colors duration-300 hover:text-azure-200"
          >
            Read our academic philosophy
            <span>→</span>
          </a>

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/10 pt-8 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl text-mist-50 sm:text-4xl">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    reducedMotion={reducedMotion}
                  />
                </div>
                <div className="mt-1.5 text-xs font-medium uppercase tracking-wide text-mist-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
