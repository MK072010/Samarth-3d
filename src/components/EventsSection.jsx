import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from '../Reveal.jsx'
import DuotoneImage from '../DuotoneImage.jsx'
import { IconCalendar } from '../icons.jsx'

gsap.registerPlugin(ScrollTrigger)

const EVENTS = [
  { date: 'SEP 12', title: 'Founder\u2019s Day Celebration', desc: 'A campus-wide celebration of Samarth\u2019s founding, with performances from every grade.', seed: 'ev-1' },
  { date: 'OCT 04', title: 'Annual Science Fair', desc: 'Student-led research projects judged by faculty and visiting alumni scientists.', seed: 'ev-2' },
  { date: 'NOV 18', title: 'Inter-House Athletics Meet', desc: 'Track, field and relay events across all four houses on the main athletics ground.', seed: 'ev-3' },
  { date: 'DEC 08', title: 'Winter Arts Showcase', desc: 'Music, drama and visual art from the Grade 6\u201312 arts programme.', seed: 'ev-4' },
  { date: 'JAN 22', title: 'Model United Nations', desc: 'A two-day simulation hosting delegations from twelve partner schools.', seed: 'ev-5' },
  { date: 'MAR 15', title: 'Graduation Ceremony', desc: 'Sending off the Senior Secondary graduating class with family and faculty.', seed: 'ev-6' },
]

export default function EventsSection({ reducedMotion }) {
  const trackRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    if (!trackRef.current || !lineRef.current || reducedMotion) return undefined

    const trigger = ScrollTrigger.create({
      trigger: trackRef.current,
      start: 'top 70%',
      end: 'bottom 60%',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(lineRef.current, { scaleY: self.progress })
      },
    })

    return () => trigger.kill()
  }, [reducedMotion])

  return (
    <section id="events" className="relative bg-ink-950 px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <Reveal reducedMotion={reducedMotion} className="flex max-w-xl items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-azure-300">
            <IconCalendar className="h-4 w-4" />
          </span>
          <span className="eyebrow">Events &amp; Calendar</span>
        </Reveal>

        <Reveal reducedMotion={reducedMotion} delay={0.08} className="mt-5 max-w-xl">
          <h2 className="font-display text-3xl font-normal leading-tight text-mist-50 sm:text-4xl">
            A year on campus, one season at a time.
          </h2>
        </Reveal>

        <div ref={trackRef} className="relative mt-16">
          {/* Base rail + scroll-filled progress line */}
          <div className="absolute left-[15px] top-1 bottom-1 w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2" />
          <div
            ref={lineRef}
            className="absolute left-[15px] top-1 bottom-1 w-px origin-top bg-gradient-to-b from-azure-400 to-brass-500 sm:left-1/2 sm:-translate-x-1/2"
            style={{ transform: 'scaleY(0)' }}
          />

          <div className="flex flex-col gap-12">
            {EVENTS.map((ev, i) => {
              const alignRight = i % 2 === 1
              return (
                <Reveal
                  key={ev.title}
                  reducedMotion={reducedMotion}
                  delay={(i % 3) * 0.07}
                  className={`relative flex items-start gap-6 pl-11 sm:w-1/2 sm:pl-0 ${
                    alignRight ? 'sm:ml-auto sm:pl-12' : 'sm:pr-12 sm:text-right'
                  }`}
                >
                  <span
                    className={`absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-azure-400 bg-ink-950 sm:top-2 ${
                      alignRight ? 'sm:-left-1.5' : 'sm:-right-1.5 sm:left-auto'
                    }`}
                  />
                  <div className="w-full overflow-hidden rounded-2xl border border-white/8 bg-ink-900/70">
                    <div className={`flex flex-col gap-0 sm:flex-row ${alignRight ? '' : 'sm:flex-row-reverse'}`}>
                      <DuotoneImage
                        src={`https://picsum.photos/seed/${ev.seed}/320/220`}
                        alt={ev.title}
                        className="h-32 w-full shrink-0 sm:h-auto sm:w-32"
                      />
                      <div className="p-5">
                        <span className="font-mono text-xs text-azure-300">{ev.date}</span>
                        <h3 className="mt-1.5 font-display text-lg text-mist-50">{ev.title}</h3>
                        <p className="mt-2 text-sm font-light leading-relaxed text-mist-300">{ev.desc}</p>
                      </div>
                    </div>
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
