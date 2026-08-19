import { useMemo, useState } from 'react'
import Reveal from '../Reveal.jsx'
import TiltCard from '../TiltCard.jsx'
import DuotoneImage from '../DuotoneImage.jsx'
import GalleryLightbox from './GalleryLightbox.jsx'
import { IconExpand } from '../icons.jsx'

const CATEGORIES = ['All', 'Campus', 'Classrooms', 'Labs', 'Sports', 'Events', 'Student Life']

const IMAGES = [
  { title: 'The main quad at dusk', category: 'Campus', seed: 'g-campus-1', tall: true },
  { title: 'North academic block', category: 'Campus', seed: 'g-campus-2', tall: false },
  { title: 'Library reading courtyard', category: 'Campus', seed: 'g-campus-3', tall: false },
  { title: 'Grade 9 literature seminar', category: 'Classrooms', seed: 'g-class-1', tall: false },
  { title: 'A primary classroom in session', category: 'Classrooms', seed: 'g-class-2', tall: true },
  { title: 'Discussion-style senior classroom', category: 'Classrooms', seed: 'g-class-3', tall: false },
  { title: 'Chemistry lab bench work', category: 'Labs', seed: 'g-lab-1', tall: false },
  { title: 'Robotics & electronics lab', category: 'Labs', seed: 'g-lab-2', tall: true },
  { title: 'Biology practicals', category: 'Labs', seed: 'g-lab-3', tall: false },
  { title: 'Inter-house athletics final', category: 'Sports', seed: 'g-sport-1', tall: false },
  { title: 'Swimming squad training', category: 'Sports', seed: 'g-sport-2', tall: true },
  { title: 'Basketball court, evening session', category: 'Sports', seed: 'g-sport-3', tall: false },
  { title: 'Annual Founder\u2019s Day', category: 'Events', seed: 'g-event-1', tall: false },
  { title: 'Model UN opening ceremony', category: 'Events', seed: 'g-event-2', tall: true },
  { title: 'Graduation, Class of 2025', category: 'Events', seed: 'g-event-3', tall: false },
  { title: 'Drama society rehearsal', category: 'Student Life', seed: 'g-life-1', tall: false },
  { title: 'Music room, string ensemble', category: 'Student Life', seed: 'g-life-2', tall: true },
  { title: 'Student council meeting', category: 'Student Life', seed: 'g-life-3', tall: false },
]

export default function GallerySection({ reducedMotion }) {
  const [filter, setFilter] = useState('All')
  const [activeIndex, setActiveIndex] = useState(null)

  const visible = useMemo(
    () => (filter === 'All' ? IMAGES : IMAGES.filter((img) => img.category === filter)),
    [filter]
  )

  const openAt = (item) => setActiveIndex(visible.findIndex((v) => v.seed === item.seed))
  const close = () => setActiveIndex(null)
  const prev = () => setActiveIndex((i) => (i - 1 + visible.length) % visible.length)
  const next = () => setActiveIndex((i) => (i + 1) % visible.length)

  return (
    <section id="gallery" className="relative bg-ink-900 px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal reducedMotion={reducedMotion} className="max-w-xl">
          <span className="eyebrow">Gallery</span>
          <h2 className="mt-5 font-display text-3xl font-normal leading-tight text-mist-50 sm:text-4xl">
            A campus best understood in pictures.
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-5 py-2 text-xs font-medium uppercase tracking-wide transition-colors duration-300 ${
                filter === c
                  ? 'border-azure-400/60 bg-azure-500/15 text-mist-50'
                  : 'border-white/12 text-mist-400 hover:border-white/25 hover:text-mist-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Mosaic — CSS columns give varied heights, not a uniform grid */}
        <div className="mt-12 columns-2 gap-4 sm:columns-3 sm:gap-5 lg:columns-4">
          {visible.map((img, i) => (
            <Reveal
              key={img.seed}
              reducedMotion={reducedMotion}
              delay={(i % 4) * 0.05}
              className="mb-4 break-inside-avoid sm:mb-5"
            >
              <TiltCard reducedMotion={reducedMotion} intensity={0.6}>
                <button
                  onClick={() => openAt(img)}
                  aria-label={`View ${img.title} full screen`}
                  className="group relative block w-full overflow-hidden rounded-2xl border border-white/8 text-left transition-shadow duration-500 hover:shadow-glow-sm"
                >
                  <DuotoneImage
                    src={`https://picsum.photos/seed/${img.seed}/${img.tall ? '480/680' : '480/380'}`}
                    alt={img.title}
                    className="w-full"
                    imgClassName="transition-transform duration-700 group-hover:scale-[1.08]"
                  />
                  <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-ink-950/90 via-ink-950/0 to-transparent p-4 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                    <div>
                      <span className="text-[10px] font-medium uppercase tracking-wide text-azure-300">
                        {img.category}
                      </span>
                      <div className="mt-1 font-display text-sm text-mist-50">{img.title}</div>
                    </div>
                  </div>
                  <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-ink-950/60 text-mist-100 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <IconExpand className="h-4 w-4" />
                  </span>
                </button>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <GalleryLightbox
          items={visible.map((v) => ({ ...v, src: `https://picsum.photos/seed/${v.seed}/1200/900` }))}
          index={activeIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
          reducedMotion={reducedMotion}
        />
      )}
    </section>
  )
}
