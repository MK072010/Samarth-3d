import Reveal from '../Reveal.jsx'
import ParallaxLayer from '../ParallaxLayer.jsx'
import TiltCard from '../TiltCard.jsx'
import DuotoneImage from '../DuotoneImage.jsx'
import AnimatedCounter from '../AnimatedCounter.jsx'
import { IconQuote, IconCompass, IconTarget, IconHeart, IconShield, IconStar, IconUsers } from '../icons.jsx'

const VALUES = [
  { icon: IconHeart, name: 'Integrity', desc: 'We say what we mean, and we do what we say — in a classroom or on a field.' },
  { icon: IconCompass, name: 'Curiosity', desc: 'Every subject is taught as a question worth chasing, not an answer to memorize.' },
  { icon: IconUsers, name: 'Community', desc: 'A school is a shared responsibility between students, faculty and families.' },
  { icon: IconShield, name: 'Resilience', desc: 'We teach students to sit with difficulty long enough to work through it.' },
  { icon: IconStar, name: 'Excellence', desc: 'Good enough is a starting point here, never a destination.' },
  { icon: IconTarget, name: 'Purpose', desc: 'Every student leaves knowing not just what they’re good at, but why it matters.' },
]

const SUCCESS = [
  { value: 98, suffix: '%', label: 'University placement rate' },
  { value: 40, suffix: '+', label: 'National olympiad qualifiers, 2025' },
  { value: 120, suffix: '+', label: 'Alumni-founded ventures' },
]

export default function IdentitySection({ reducedMotion }) {
  return (
    <section id="identity" className="relative overflow-hidden bg-ink-950 px-6 py-28 sm:py-36">
      <ParallaxLayer
        reducedMotion={reducedMotion}
        speed={0.3}
        className="right-[-12%] top-[-8%] h-[440px] w-[440px] rounded-full bg-azure-600/10 blur-[120px]"
      />
      <ParallaxLayer
        reducedMotion={reducedMotion}
        speed={0.2}
        className="left-[-10%] bottom-[10%] h-[360px] w-[360px] rounded-full bg-brass-500/8 blur-[110px]"
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal reducedMotion={reducedMotion} className="max-w-xl">
          <span className="eyebrow">Our Identity</span>
          <h2 className="mt-5 font-display text-3xl font-normal leading-tight text-mist-50 sm:text-4xl">
            The school we are, and the reasons we built it this way.
          </h2>
        </Reveal>

        {/* Principal's message */}
        <Reveal reducedMotion={reducedMotion} delay={0.1} className="mt-16">
          <TiltCard
            reducedMotion={reducedMotion}
            intensity={0.4}
            className="glass relative grid gap-10 overflow-hidden rounded-3xl p-8 sm:p-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:p-14"
          >
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[220px] lg:mx-0">
              <DuotoneImage
                src="https://picsum.photos/seed/samarth-principal/480/640"
                alt="Portrait of the Principal of Samarth School"
                className="h-full w-full rounded-2xl border border-white/10"
              />
              <div className="absolute -bottom-4 -right-4 flex h-16 w-16 items-center justify-center rounded-full border border-brass-500/40 bg-ink-900 text-brass-400">
                <IconQuote className="h-6 w-6" />
              </div>
            </div>

            <div>
              <IconQuote className="h-8 w-8 text-azure-400/60" />
              <p className="mt-4 font-display text-xl font-normal leading-relaxed text-mist-50 sm:text-2xl">
                We are not building a pipeline to an exam. We are building the habits of mind a
                person carries for sixty years — how they question, how they recover from being
                wrong, and how they treat the people around them.
              </p>
              <div className="mt-7 flex items-center gap-4">
                <div className="h-px w-10 bg-azure-400/50" />
                <div>
                  <div className="font-display text-lg text-mist-50">Dr. Ananya Rao Kapoor</div>
                  <div className="text-xs font-medium uppercase tracking-wide text-mist-400">
                    Principal &amp; Director, Samarth School
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </Reveal>

        {/* Vision & Mission */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Reveal reducedMotion={reducedMotion} delay={0.1}>
            <TiltCard
              reducedMotion={reducedMotion}
              className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-azure-700/20 via-ink-800 to-ink-900 bg-blueprint p-8 transition-shadow duration-500 hover:shadow-glow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-mist-100">
                <IconCompass className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-display text-xl text-mist-50">Our Vision</h3>
              <p className="mt-2.5 text-sm font-light leading-relaxed text-mist-300">
                To be the school families point to when they describe what an education should
                feel like — rigorous, humane, and genuinely preparing students for a world that
                hasn’t finished changing yet.
              </p>
            </TiltCard>
          </Reveal>

          <Reveal reducedMotion={reducedMotion} delay={0.18}>
            <TiltCard
              reducedMotion={reducedMotion}
              className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-brass-600/15 via-ink-800 to-ink-900 bg-blueprint p-8 transition-shadow duration-500 hover:shadow-glow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-mist-100">
                <IconTarget className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-display text-xl text-mist-50">Our Mission</h3>
              <p className="mt-2.5 text-sm font-light leading-relaxed text-mist-300">
                To pair a demanding academic core with the studio, lab and playing-field time
                students need to discover what they’re actually capable of — and to do it with
                a faculty who know every student by name.
              </p>
            </TiltCard>
          </Reveal>
        </div>

        {/* Values */}
        <Reveal reducedMotion={reducedMotion} className="mt-20 max-w-xl">
          <span className="eyebrow">What We Hold To</span>
          <h3 className="mt-4 font-display text-2xl font-normal leading-tight text-mist-50 sm:text-3xl">
            Six values, tested against every decision.
          </h3>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => {
            const Icon = v.icon
            return (
              <Reveal key={v.name} reducedMotion={reducedMotion} delay={(i % 3) * 0.08}>
                <TiltCard
                  reducedMotion={reducedMotion}
                  className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-ink-900 p-7 transition-shadow duration-500 hover:shadow-glow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-azure-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="mt-6 font-display text-lg text-mist-50">{v.name}</h4>
                  <p className="mt-2.5 text-sm font-light leading-relaxed text-mist-300">{v.desc}</p>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>

        {/* Student success highlights */}
        <Reveal
          reducedMotion={reducedMotion}
          className="mt-20 grid grid-cols-1 gap-x-6 gap-y-10 rounded-3xl border border-white/8 bg-ink-900/60 px-8 py-12 sm:grid-cols-3 sm:px-12"
        >
          {SUCCESS.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <div className="font-display text-4xl text-gradient-azure sm:text-5xl">
                <AnimatedCounter value={s.value} suffix={s.suffix} reducedMotion={reducedMotion} />
              </div>
              <div className="mt-2 text-xs font-medium uppercase tracking-wide text-mist-400">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
