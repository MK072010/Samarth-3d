import { IconFacebook, IconInstagram, IconYoutube, IconLinkedin, IconMapPin, IconPhone, IconMail } from './icons.jsx'

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Our Identity', href: '#identity' },
  { label: 'Campus', href: '#campus' },
  { label: 'Facilities', href: '#facilities' },
]

const ACADEMICS_LINKS = [
  { label: 'Academics', href: '#academics' },
  { label: 'Faculty', href: '#faculty' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Events', href: '#events' },
]

const ADMISSIONS_LINKS = [
  { label: 'Admissions', href: '#admissions' },
  { label: 'Enquiry Form', href: '#enquiry' },
  { label: 'Apply Now', href: '#enquiry' },
]

const SOCIALS = [
  { icon: IconFacebook, label: 'Facebook', href: 'https://facebook.com' },
  { icon: IconInstagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: IconYoutube, label: 'YouTube', href: 'https://youtube.com' },
  { icon: IconLinkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
]

function LinkColumn({ title, links }) {
  return (
    <div>
      <h4 className="eyebrow !text-mist-400">{title}</h4>
      <ul className="mt-5 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="text-sm text-mist-300 transition-colors duration-300 hover:text-mist-50">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-ink-950 px-6 pb-10 pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <a href="#home" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brass-500/50">
                <span className="h-2 w-2 rounded-full bg-brass-500" />
              </span>
              <span className="font-display text-lg text-mist-50">Samarth School</span>
            </a>
            <p className="mt-5 flex items-start gap-2 text-sm font-light text-mist-400">
              <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-mist-500" />
              Sector 21, Vasant Enclave, New Delhi
            </p>
            <p className="mt-2.5 flex items-center gap-2 text-sm font-light text-mist-400">
              <IconPhone className="h-4 w-4 shrink-0 text-mist-500" />
              +91 98100 22345
            </p>
            <p className="mt-2.5 flex items-center gap-2 text-sm font-light text-mist-400">
              <IconMail className="h-4 w-4 shrink-0 text-mist-500" />
              admissions@samarthschool.edu
            </p>

            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-mist-300 transition-colors duration-300 hover:border-azure-400/50 hover:text-azure-300"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                )
              })}
            </div>
          </div>

          <LinkColumn title="Quick Links" links={QUICK_LINKS} />
          <LinkColumn title="Academics" links={ACADEMICS_LINKS} />
          <LinkColumn title="Admissions" links={ADMISSIONS_LINKS} />
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 text-xs text-mist-400 sm:flex-row">
          <span>© {new Date().getFullYear()} Samarth School. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-mist-100">
              Privacy
            </a>
            <a href="#" className="hover:text-mist-100">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
