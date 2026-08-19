import Reveal from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'
import { IconBook, IconGraduationCap, IconAward } from './icons.jsx'

const STAGES = [
  {
    icon: IconBook,
    stage: 'Primary',
    grades: 'Classes I – V',
    desc: 'Foundational literacy and numeracy, delivered through inquiry-based, activity-led classrooms.',
    points: ['Play-integrated learning', 'Dedicated reading hour', 'Low student-teacher ratio'],
  },
  {
    icon: IconGraduationCap,
    stage: 'Secondary',
    grades: 'Classes VI – X',
    desc: 'Subject specialization begins, alongside project work that connects the classroom to the real world.',
    points: ['Subject-expert faculty', 'Applied science labs', 'Board-aligned assessment'],
  },
  {
    icon: IconAward,
    stage: 'Senior Secondary',
    grades: 'Classes XI – XII',
    desc: 'Focused streams in Science, Commerce and Humanities, with dedicated mentoring toward board exams.',
    points: ['Stream specialization', 'University counselling', 'Exam-focused mentoring'],
  },
]

export default function AcademicsSection({ reducedMotion }) {
  return (
    <section id="academics" className="relative bg-ink-900 px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal reducedMotion={reducedMotion} className="max-w-xl">
          <span className="eyebrow">Academic Excellence</span>
          <h2 className="mt-5 font-display text-3xl font-normal leading-tight text-mist-50 sm:text-4xl">
            One curriculum, three stages, built to compound.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STAGES.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.stage} reducedMotion={reducedMotion} delay={i * 0.1}>
                <TiltCard
                  reducedMotion={reducedMotion}
                  className="glass group relative flex h-full flex-col rounded-2xl p-8 transition-shadow duration-500 hover:shadow-glow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-azure-400/30 text-azure-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl text-mist-50">{s.stage}</h3>
                  <span className="eyebrow mt-1.5 !text-brass-500">{s.grades}</span>
                  <p className="mt-4 text-sm font-light leading-relaxed text-mist-300">{s.desc}</p>

                  <ul className="mt-6 flex flex-col gap-2.5 border-t border-white/10 pt-6">
                    {s.points.map((point) => (
                      <li key={point} className="flex items-center gap-2.5 text-sm text-mist-300">
                        <span className="h-1 w-1 rounded-full bg-azure-400" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
