import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from '../Reveal.jsx'
import ParallaxLayer from '../ParallaxLayer.jsx'
import TiltCard from '../TiltCard.jsx'
import MagneticButton from '../MagneticButton.jsx'
import {
  IconGraduationCap,
  IconCompass,
  IconFileText,
  IconCalendar,
  IconCheck,
  IconClock,
} from '../icons.jsx'

gsap.registerPlugin(ScrollTrigger)

const CLASSES = [
  { name: 'Pre-Primary', range: 'Nursery – KG', desc: 'Play-based learning in small, closely supervised groups.' },
  { name: 'Primary', range: 'Grades 1 – 5', desc: 'Foundational literacy, numeracy and inquiry-based science.' },
  { name: 'Middle School', range: 'Grades 6 – 8', desc: 'Subject specialisation begins, alongside labs and electives.' },
  { name: 'Secondary', range: 'Grades 9 – 10', desc: 'Board-aligned curriculum with a full science/commerce track.' },
  { name: 'Senior Secondary', range: 'Grades 11 – 12', desc: 'Science, Commerce and Humanities streams with career mentoring.' },
]

const PROCESS = [
  { step: '01', title: 'Enquiry & Tour', desc: 'Submit an enquiry and book a private campus walkthrough.' },
  { step: '02', title: 'Application', desc: 'Complete the application form with the required documents.' },
  { step: '03', title: 'Assessment', desc: 'An age-appropriate interaction or written assessment.' },
  { step: '04', title: 'Offer', desc: 'Admission offers are released within 10 working days.' },
  { step: '05', title: 'Enrollment', desc: 'Confirm your seat with fee payment and orientation scheduling.' },
]

const ELIGIBILITY = [
  { group: 'Nursery', rule: 'Child must turn 3 years by 31st March of the admission year.' },
  { group: 'Grades 1–5', rule: 'Age-appropriate for grade, plus previous school report if applicable.' },
  { group: 'Grades 6–10', rule: 'Transfer certificate and last two years’ academic records required.' },
  { group: 'Grades 11–12', rule: 'Grade 10 board marksheet; stream subject to seat availability.' },
]

const DOCUMENTS = [
  'Birth certificate (original + copy)',
  'Previous school report card',
  'Transfer certificate, if applicable',
  'Passport-size photographs (4)',
  'Proof of residence',
  'Aadhaar / passport copy',
]

const DATES = [
  { label: 'Applications open', date: '15 Sep' },
  { label: 'Campus tours begin', date: '22 Sep' },
  { label: 'Assessment window', date: '10–20 Nov' },
  { label: 'Offers released', date: '01 Dec' },
  { label: 'Session begins', date: '01 Apr' },
]

export default function AdmissionsSection({ reducedMotion }) {
  const railRef = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    if (!railRef.current || !fillRef.current || reducedMotion) return undefined

    const mq = window.matchMedia('(min-width: 1024px)')
    const trigger = ScrollTrigger.create({
      trigger: railRef.current,
      start: 'top 75%',
      end: 'bottom 55%',
      scrub: true,
      onUpdate: (self) => {
        if (mq.matches) {
          gsap.set(fillRef.current, { scaleX: self.progress, scaleY: 1 })
        } else {
          gsap.set(fillRef.current, { scaleY: self.progress, scaleX: 1 })
        }
      },
    })

    return () => trigger.kill()
  }, [reducedMotion])

  return (
    <section id="admissions" className="relative overflow-hidden bg-ink-950 px-6 py-28 sm:py-36">
      <ParallaxLayer
        reducedMotion={reducedMotion}
        speed={0.3}
        className="left-[-8%] top-[5%] h-[420px] w-[420px] rounded-full bg-azure-600/12 blur-[120px]"
      />
      <ParallaxLayer
        reducedMotion={reducedMotion}
        speed={0.22}
        className="right-[-10%] bottom-[0%] h-[380px] w-[380px] rounded-full bg-brass-500/8 blur-[110px]"
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal reducedMotion={reducedMotion}>
          <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-azure-400" />
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wide text-mist-100">
              Admissions Open — Session 2026–27
            </span>
          </span>
        </Reveal>

        <Reveal reducedMotion={reducedMotion} delay={0.08} className="mt-6 max-w-xl">
          <h2 className="font-display text-3xl font-normal leading-tight text-mist-50 sm:text-4xl">
            An admissions process built to be understood, not endured.
          </h2>
          <p className="mt-5 max-w-lg text-base font-light leading-relaxed text-mist-300">
            From your first enquiry to your child’s first day, every step is designed to be
            transparent — clear dates, clear documents, and a real person to talk to.
          </p>
        </Reveal>

        <Reveal reducedMotion={reducedMotion} delay={0.14} className="mt-9 flex flex-wrap gap-4">
          <MagneticButton
            as="a"
            href="#enquiry"
            reducedMotion={reducedMotion}
            className="inline-flex items-center gap-2 rounded-full bg-azure-500 px-8 py-3.5 text-sm font-medium text-ink-950 shadow-glow transition-colors duration-300 hover:bg-azure-400"
          >
            Apply Now
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#enquiry"
            reducedMotion={reducedMotion}
            className="glass inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-mist-100 transition-colors duration-300 hover:border-azure-400/40"
          >
            Enquire Now
          </MagneticButton>
        </Reveal>

        {/* Classes available */}
        <div className="mt-20">
          <Reveal reducedMotion={reducedMotion} className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-azure-300">
              <IconGraduationCap className="h-4 w-4" />
            </span>
            <span className="eyebrow">Classes Available</span>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {CLASSES.map((c, i) => (
              <Reveal key={c.name} reducedMotion={reducedMotion} delay={(i % 5) * 0.06}>
                <TiltCard
                  reducedMotion={reducedMotion}
                  className="h-full rounded-2xl border border-white/8 bg-ink-900 p-6 transition-shadow duration-500 hover:shadow-glow-sm"
                >
                  <h3 className="font-display text-lg text-mist-50">{c.name}</h3>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wide text-azure-300">{c.range}</div>
                  <p className="mt-3 text-sm font-light leading-relaxed text-mist-300">{c.desc}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Process timeline */}
        <div className="mt-24">
          <Reveal reducedMotion={reducedMotion} className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-azure-300">
              <IconCompass className="h-4 w-4" />
            </span>
            <span className="eyebrow">How Admission Works</span>
          </Reveal>

          <div ref={railRef} className="relative mt-12">
            {/* mobile: vertical rail */}
            <div className="absolute left-[19px] top-1 bottom-1 w-px bg-white/10 lg:left-0 lg:right-0 lg:top-[19px] lg:bottom-auto lg:h-px lg:w-auto" />
            <div
              ref={fillRef}
              className="absolute left-[19px] top-1 bottom-1 w-px origin-top bg-gradient-to-b from-azure-400 to-brass-500 lg:left-0 lg:right-0 lg:top-[19px] lg:bottom-auto lg:h-px lg:w-auto lg:origin-left lg:bg-gradient-to-r"
              style={{ transform: 'scaleY(0)' }}
            />

            <div className="flex flex-col gap-8 lg:flex-row lg:gap-6">
              {PROCESS.map((p, i) => (
                <Reveal
                  key={p.step}
                  reducedMotion={reducedMotion}
                  delay={i * 0.08}
                  className="relative flex gap-5 pl-2 lg:flex-1 lg:flex-col lg:gap-0 lg:pl-0"
                >
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-azure-400/50 bg-ink-950 font-mono text-xs text-azure-300">
                    {p.step}
                  </span>
                  <div className="lg:mt-5">
                    <h3 className="font-display text-base text-mist-50 sm:text-lg">{p.title}</h3>
                    <p className="mt-1.5 max-w-[16rem] text-sm font-light leading-relaxed text-mist-300">
                      {p.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Eligibility + Documents */}
        <div className="mt-24 grid gap-5 lg:grid-cols-2">
          <Reveal reducedMotion={reducedMotion}>
            <div className="h-full rounded-2xl border border-white/8 bg-ink-900/70 p-8">
              <span className="eyebrow">Eligibility</span>
              <ul className="mt-6 flex flex-col gap-5">
                {ELIGIBILITY.map((e) => (
                  <li key={e.group} className="flex gap-4">
                    <span className="mt-0.5 shrink-0 font-display text-sm text-azure-300">{e.group}</span>
                    <span className="text-sm font-light leading-relaxed text-mist-300">{e.rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal reducedMotion={reducedMotion} delay={0.1}>
            <div className="h-full rounded-2xl border border-white/8 bg-ink-900/70 p-8">
              <div className="flex items-center gap-2.5">
                <IconFileText className="h-4 w-4 text-azure-300" />
                <span className="eyebrow">Required Documents</span>
              </div>
              <ul className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {DOCUMENTS.map((doc) => (
                  <li key={doc} className="flex items-start gap-2.5 text-sm font-light text-mist-300">
                    <IconCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-azure-400" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Important dates */}
        <div className="mt-8">
          <Reveal reducedMotion={reducedMotion} className="flex items-center gap-3">
            <IconClock className="h-4 w-4 text-brass-400" />
            <span className="eyebrow">Important Dates</span>
          </Reveal>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {DATES.map((d, i) => (
              <Reveal key={d.label} reducedMotion={reducedMotion} delay={(i % 5) * 0.05}>
                <div className="rounded-xl border border-white/8 bg-ink-900 p-5 text-center">
                  <div className="font-mono text-sm text-brass-400">{d.date}</div>
                  <div className="mt-1.5 text-[11px] font-medium uppercase tracking-wide text-mist-400">
                    {d.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
