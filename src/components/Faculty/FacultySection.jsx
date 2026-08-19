import Reveal from '../Reveal.jsx'
import TiltCard from '../TiltCard.jsx'
import DuotoneImage from '../DuotoneImage.jsx'
import { IconUsers } from '../icons.jsx'

const FACULTY = [
  { name: 'Dr. Ananya Rao Kapoor', role: 'Principal & Director', dept: 'Leadership', seed: 'faculty-1' },
  { name: 'Mr. Rohan Mehta', role: 'Vice Principal, Academics', dept: 'Leadership', seed: 'faculty-2' },
  { name: 'Ms. Leela Nair', role: 'Head of Senior Secondary', dept: 'Sciences', seed: 'faculty-3' },
  { name: 'Mr. Arjun Verma', role: 'Head of Mathematics', dept: 'Mathematics', seed: 'faculty-4' },
  { name: 'Dr. Priya Iyer', role: 'Head of Sciences', dept: 'Physics & Chemistry', seed: 'faculty-5' },
  { name: 'Ms. Fatima Sheikh', role: 'Head of Humanities', dept: 'History & Literature', seed: 'faculty-6' },
  { name: 'Mr. Karan Bhatt', role: 'Director of Athletics', dept: 'Sports', seed: 'faculty-7' },
  { name: 'Ms. Diya Kulkarni', role: 'Head of Arts', dept: 'Music, Art & Drama', seed: 'faculty-8' },
]

export default function FacultySection({ reducedMotion }) {
  return (
    <section id="faculty" className="relative bg-ink-900 px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal reducedMotion={reducedMotion} className="flex max-w-xl items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-azure-300">
            <IconUsers className="h-4 w-4" />
          </span>
          <span className="eyebrow">Faculty &amp; Leadership</span>
        </Reveal>

        <Reveal reducedMotion={reducedMotion} delay={0.08} className="mt-5 max-w-xl">
          <h2 className="font-display text-3xl font-normal leading-tight text-mist-50 sm:text-4xl">
            The people students will actually remember.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {FACULTY.map((f, i) => (
            <Reveal key={f.name} reducedMotion={reducedMotion} delay={(i % 4) * 0.06}>
              <TiltCard
                reducedMotion={reducedMotion}
                intensity={0.75}
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-ink-800 transition-shadow duration-500 hover:shadow-glow-sm"
              >
                <DuotoneImage
                  src={`https://picsum.photos/seed/${f.seed}/360/440`}
                  alt={`Portrait of ${f.name}`}
                  className="aspect-[3/4.4] w-full"
                  imgClassName="transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950 via-ink-950/80 to-transparent p-4 sm:p-5">
                  <div className="font-display text-sm text-mist-50 sm:text-base">{f.name}</div>
                  <div className="mt-1 text-[11px] font-medium text-azure-300 sm:text-xs">{f.role}</div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-wide text-mist-400 sm:text-[11px]">
                    {f.dept}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
