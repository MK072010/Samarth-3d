import Reveal from '../Reveal.jsx'
import ParallaxLayer from '../ParallaxLayer.jsx'
import TiltCard from '../TiltCard.jsx'
import { IconMapPin, IconPhone, IconMail, IconClock, IconFacebook, IconInstagram, IconYoutube, IconLinkedin } from '../icons.jsx'

const SOCIALS = [
  { icon: IconFacebook, label: 'Facebook', href: 'https://facebook.com' },
  { icon: IconInstagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: IconYoutube, label: 'YouTube', href: 'https://youtube.com' },
  { icon: IconLinkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
]

const DETAILS = [
  { icon: IconMapPin, label: 'Address', value: 'Sector 21, Vasant Enclave, New Delhi, 110057' },
  { icon: IconPhone, label: 'Phone', value: '+91 98100 22345' },
  { icon: IconMail, label: 'Email', value: 'admissions@samarthschool.edu' },
  { icon: IconClock, label: 'School Timings', value: 'Mon – Sat, 8:00 AM – 2:30 PM' },
]

export default function ContactSection({ reducedMotion }) {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink-950 px-6 py-28 sm:py-36">
      <ParallaxLayer
        reducedMotion={reducedMotion}
        speed={0.28}
        className="right-[-8%] top-[10%] h-[400px] w-[400px] rounded-full bg-azure-600/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal reducedMotion={reducedMotion} className="max-w-xl">
          <span className="eyebrow">Contact</span>
          <h2 className="mt-5 font-display text-3xl font-normal leading-tight text-mist-50 sm:text-4xl">
            Come see the campus for yourself.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Contact details */}
          <Reveal reducedMotion={reducedMotion} delay={0.08}>
            <TiltCard
              reducedMotion={reducedMotion}
              intensity={0.5}
              className="glass flex h-full flex-col justify-between rounded-3xl p-8 sm:p-10"
            >
              <div className="flex flex-col gap-7">
                {DETAILS.map((d) => {
                  const Icon = d.icon
                  return (
                    <div key={d.label} className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-azure-300">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <div>
                        <div className="text-[11px] font-medium uppercase tracking-wide text-mist-400">
                          {d.label}
                        </div>
                        <div className="mt-1 text-sm font-light text-mist-100 sm:text-base">{d.value}</div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-10 flex gap-3 border-t border-white/10 pt-8">
                {SOCIALS.map((s) => {
                  const Icon = s.icon
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-mist-300 transition-colors duration-300 hover:border-azure-400/50 hover:text-azure-300"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  )
                })}
              </div>
            </TiltCard>
          </Reveal>

          {/* Map */}
          <Reveal reducedMotion={reducedMotion} delay={0.16}>
            <TiltCard
              reducedMotion={reducedMotion}
              intensity={0.3}
              className="relative h-full min-h-[320px] overflow-hidden rounded-3xl border border-white/10"
            >
              <iframe
                title="Samarth School location"
                src="https://maps.google.com/maps?q=New+Delhi&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="h-full min-h-[320px] w-full grayscale-[40%] contrast-[1.05] invert-[92%] hue-rotate-180"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10 shadow-[inset_0_0_60px_rgba(10,14,22,0.5)]" />
              <a
                href="https://maps.google.com/?q=Vasant+Enclave+New+Delhi"
                target="_blank"
                rel="noreferrer"
                className="glass absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-mist-100 transition-colors duration-300 hover:border-azure-400/40"
              >
                <IconMapPin className="h-3.5 w-3.5 text-azure-300" />
                Get Directions
              </a>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
